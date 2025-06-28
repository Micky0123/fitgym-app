// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Calendar, History, Edit, ChevronUp, ChevronDown, Loader2, LayoutDashboard, List, CircleDotDashed } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { getImageUrl } from '../lib/utils';
import { trainingPlanApi, authApi, activeWorkoutApi, exercisePlanApi, exerciseApi } from '../lib/api';
import { formatApiError } from '../lib/utils';
import axios from 'axios';

import {
    FitnessLevel,
    Goal,
    TrainingDuration,
    PlanDay,
    ActiveTrainingPlanResponse,
    MultiplePlansResponseItem,
    ExercisePlan,
    Exercise,
} from '../types';
import type { TrainingPlan } from '../types';


const HomePage: React.FC = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState<'current' | 'history'>('current');
    const [activePlanData, setActivePlanData] = useState<ActiveTrainingPlanResponse | null>(null);
    const [historyPlansData, setHistoryPlansData] = useState<MultiplePlansResponseItem[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isStartingWorkout, setIsStartingWorkout] = useState<boolean>(false);
    const [startingWorkoutPlanDayId, setStartingWorkoutPlanDayId] = useState<number | null>(null);

    const [fitnessLevels, setFitnessLevels] = useState<FitnessLevel[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [durations, setDurations] = useState<TrainingDuration[]>([]);

    const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null);
    const [expandedDayId, setExpandedDayId] = useState<number | null>(null);
    const [isLoadingExercisesForDay, setIsLoadingExercisesForDay] = useState<number | null>(null);
    const [exercisesByPlanDayId, setExercisesByPlanDayId] = useState<Record<number, ExercisePlan[]>>({});

    const [allExercisesMap, setAllExercisesMap] = useState<Map<number, Exercise>>(new Map());
    const [isLoadingAllExercises, setIsLoadingAllExercises] = useState(true);


    // Effect לטעינת כל התרגילים בפעם אחת
    useEffect(() => {
        const fetchAllExercises = async () => {
            try {
                setIsLoadingAllExercises(true);
                const exercises = await exerciseApi.getAll();
                const exercisesMap = new Map<number, Exercise>();
                exercises.forEach((ex: Exercise) => exercisesMap.set(ex.exerciseId, ex));
                setAllExercisesMap(exercisesMap);
            } catch (err) {
                console.error("Error fetching all exercises:", err);
                // ניתן לטפל בשגיאה בצורה ידידותית למשתמש
            } finally {
                setIsLoadingAllExercises(false);
            }
        };

        fetchAllExercises();
    }, []);

    const fetchPlans = async () => {
        if (!user?.traineeId) {
            setError("שגיאה: מזהה מתאמן לא נמצא. אנא התחבר מחדש.");
            setIsLoading(false);
            return;
        }
        try {
            setIsLoading(true);
            setError(null);

            let activePlanResult: ActiveTrainingPlanResponse | null = null;
            try {
                activePlanResult = await activeWorkoutApi.getTraineeActiveTrainingPlan(user.traineeId);
            } catch (activeErr: any) {
                if (axios.isAxiosError(activeErr) && activeErr.response && activeErr.response.status === 404) {
                    console.log("No active training plan found (HTTP 404). This is expected behavior.");
                    activePlanResult = null;
                } else {
                    console.error("Error fetching active plan:", activeErr);
                    setError(formatApiError(activeErr));
                    activePlanResult = null;
                }
            }

            const historyResponse = await trainingPlanApi.getHistoryPlans(user.traineeId);

            // לוגיקה למיון ימי האימון בתוכניות ההיסטוריות
            const processedHistoryPlans = historyResponse.map(planItem => {
                // ודא ש-trainingPlan ו-planDays קיימים לפני סינון ומיון
                const daysInPlan = planItem.trainingPlan?.planDays || [];

                const regularDays = daysInPlan.filter(day => !day.isHistoricalProgram)
                                                .sort((a, b) => a.dayOrder - b.dayOrder);
                const historicalDays = daysInPlan.filter(day => day.isHistoricalProgram)
                                                    .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()); // ממיין מהחדש לישן

                return {
                    ...planItem,
                    // שימו לב: אנחנו מעדכנים את ה-planDays של אובייקט ה-trainingPlan הפנימי
                    trainingPlan: {
                        ...planItem.trainingPlan,
                        planDays: [...regularDays, ...historicalDays]
                    }
                };
            });

            setActivePlanData(activePlanResult);
            setHistoryPlansData(processedHistoryPlans || []); // השתמש בתוכניות המעובדות

        } catch (err: any) {
            console.error("General error fetching plans:", err);
            setError(formatApiError(err));
            setActivePlanData(null);
            setHistoryPlansData([]);
        } finally {
            setIsLoading(false);
        }
    };

    // פונקציה חדשה לטעינת תרגילים עבור יום אימון
    const fetchExercisesForDay = async (planDayId: number) => {
        // אם היום כבר מורחב, צמצם אותו.
        if (expandedDayId === planDayId) {
            setExpandedDayId(null);
            return;
        }

        // אם התרגילים כבר נטענו בעבר ורק צומצמו, פשוט הרחב שוב בלי טעינה מחדש
        if (exercisesByPlanDayId[planDayId]) {
            setExpandedDayId(planDayId);
            return;
        }

        setIsLoadingExercisesForDay(planDayId);
        try {
            const exercises: ExercisePlan[] = await exercisePlanApi.getExercisesForPlanDay(planDayId);

            setExercisesByPlanDayId(prev => ({
                ...prev,
                [planDayId]: exercises
            }));

            setExpandedDayId(planDayId); // פתח את הרשימה החדשה
        } catch (err: any) {
            console.error(`Error fetching exercises for plan day ${planDayId}:`, err);
            alert(`שגיאה בטעינת התרגילים: ${formatApiError(err)}`);
        } finally {
            setIsLoadingExercisesForDay(null);
        }
    };

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [levels, goals, durations] = await Promise.all([
                    authApi.getFitnessLevels(),
                    authApi.getGoals(),
                    authApi.getTrainingDurations()
                ]);
                setFitnessLevels(levels);
                setGoals(goals);
                setDurations(durations);
            } catch (err: any) {
                console.error("Error fetching options:", err);
                alert(`שגיאה בטעינת אפשרויות: ${formatApiError(err)}`);
            }
        };
        fetchOptions();
    }, []);

    useEffect(() => {
        fetchPlans();
    }, [user?.traineeId]);

    const getLevelName = (id: number) =>
        fitnessLevels.find((l) => l.fitnessLevelId === id)?.fitnessLevelName || '';
    const getGoalName = (id: number) =>
        goals.find((g) => g.goalId === id)?.goalName || '';
    const getDurationName = (id: number) => {
        const duration = durations.find((d) => d.trainingDurationId === id);
        return duration ? `${duration.timeTrainingDuration} דקות` : '';
    };

    const startWorkout = async (planDayId: number) => {
        if (!user?.traineeId) {
            alert('שגיאה: מזהה מתאמן לא נמצא. אנא התחבר מחדש.');
            return;
        }

        const currentPlanDays = activePlanData?.planDays;
        const selectedPlanDay = currentPlanDays?.find(day => day.planDayId === planDayId);

        if (!selectedPlanDay) {
            alert('שגיאה: פרטי יום האימון לא נמצאו.');
            return;
        }

        if (selectedPlanDay.isCompletedThisWeek) {
            alert(`לא ניתן להתחיל אימון זה. אימון "${selectedPlanDay.programName}" כבר בוצע השבוע.`);
            return;
        }

        setIsStartingWorkout(true);
        setStartingWorkoutPlanDayId(planDayId);

        try {
            const requestBodyForStartWorkout = {
                Trainee: user.traineeId,
                planday: planDayId,
                StartTime: new Date().toISOString(),
            };

            await activeWorkoutApi.startWorkout(requestBodyForStartWorkout);

            navigate(`/WorkoutPage/${planDayId}`);
            // Small delay before refetching to ensure backend updates
            setTimeout(() => fetchPlans(), 500);
        } catch (err: any) {
            console.error('Failed to start workout:', err);
            console.error('Server error details:', err.response?.data);

            let userMessage = 'שגיאה לא ידועה בהתחלת הפעולה.';
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if (err.response.status === 429 || err.response.status === 503) {
                        const serverDetail = (err.response.data && typeof err.response.data === 'object' && err.response.data.detail)
                            ? err.response.data.detail
                            : (typeof err.response.data === 'string' ? err.response.data : 'השרת עמוס כרגע. אנא המתן מספר רגעים ונסה שוב.');
                        userMessage = serverDetail;
                    } else {
                        userMessage = formatApiError(err);
                    }
                } else if (err.request) {
                    if (err.code === 'ECONNABORTED') {
                        userMessage = 'הפעולה נכשלה עקב עומס בשרת או חיבור איטי. אנא נסה שוב בעוד רגע.';
                    } else {
                        userMessage = 'שגיאת רשת: לא ניתן להתחבר לשרת. אנא בדוק את חיבור האינטרנט שלך.';
                    }
                } else {
                    userMessage = `שגיאת בקשה: ${err.message}`;
                }
            } else if (err instanceof Error) {
                userMessage = err.message;
            }
            alert(`שגיאה בהתחלת האימון: ${userMessage}`);
        } finally {
            setIsStartingWorkout(false);
            setStartingWorkoutPlanDayId(null);
        }
    };

    const togglePlanExpansion = (planId: number) => {
        setExpandedPlanId(expandedPlanId === planId ? null : planId);
        // כאשר סוגרים או פותחים תוכנית, נסגור את כל ימי האימון שהורחבו
        setExpandedDayId(null);
        setExercisesByPlanDayId({}); // נאפס את התרגילים שנשמרו כדי לטעון מחדש אם נדרש
    };

    // פונקציה עזר לקבלת שם התרגיל
    const getExerciseName = (exerciseId: number): string => {
        // בודק במפה שנטענה מראש
        const exercise = allExercisesMap.get(exerciseId);
        return exercise?.exerciseName || 'שם תרגיל לא ידוע';
    };


    // פונקציה חדשה לרינדור כפתור יום אימון עבור תוכניות היסטוריות
    const renderHistoryPlanDayButton = (day: PlanDay, trainingPlan: TrainingPlan) => {
        const isCurrentlyLoadingExercises = isLoadingExercisesForDay === day.planDayId;
        const isExpanded = expandedDayId === day.planDayId;
        const dayExercises = exercisesByPlanDayId[day.planDayId];

        // הצגת שם התוכנית והתאריך עבור ימי היסטוריה
        const displayTitle = day.isHistoricalProgram
            ? `אימון מ-${new Date(day.creationDate).toLocaleDateString('he-IL')} (${day.programName.replace('Workout History: ', '')})`
            : `יום ${day.dayOrder} - ${day.programName}`;

        return (
            <div key={day.planDayId} className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center justify-between">
                    <span className="text-gray-700">{displayTitle}</span>
                    <Button
                        onClick={() => fetchExercisesForDay(day.planDayId)}
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700"
                        icon={isCurrentlyLoadingExercises ? <Loader2 className="h-4 w-4 animate-spin" /> : isExpanded ? <ChevronUp className="h-4 w-4" /> : <List className="h-4 w-4" />}
                        disabled={isCurrentlyLoadingExercises}
                    >
                        {isCurrentlyLoadingExercises ? 'טוען...' : isExpanded ? 'הסתר תרגילים' : 'הצג תרגילים'}
                    </Button>
                </div>
                {isExpanded && dayExercises && dayExercises.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 pr-4 border-r-2 border-gray-200"
                    >
                        <h5 className="font-semibold text-gray-700 mb-2 text-right">תרגילים:</h5>
                        <ul className="space-y-2">
                            {dayExercises.map((exercisePlan) => (
                                <li key={exercisePlan.exercisePlanId} className="flex items-center text-sm text-gray-800">
                                    <CircleDotDashed className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
                                    <span>
                                        <strong className="font-semibold">{getExerciseName(exercisePlan.exerciseId)}</strong>: {exercisePlan.planSets} סטים | {exercisePlan.planRepetitionsMin}-{exercisePlan.planRepetitionsMax} חזרות | {exercisePlan.planWeight} ק"ג
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
                {isExpanded && (!dayExercises || dayExercises.length === 0) && !isCurrentlyLoadingExercises && (
                    <div className="mt-3 text-sm text-gray-500 text-center">אין תרגילים ליום אימון זה.</div>
                )}
            </div>
        );
    };


    const renderActivePlanDayButton = (day: PlanDay) => {
        const isWorkoutStarting = isStartingWorkout && startingWorkoutPlanDayId === day.planDayId;
        const isDisabled = isWorkoutStarting || day.isCompletedThisWeek;
        const buttonText = isWorkoutStarting ? 'מכין אימון...' : 'התחל';
        const isCurrentlyLoadingExercises = isLoadingExercisesForDay === day.planDayId;
        const isExpanded = expandedDayId === day.planDayId;
        const dayExercises = exercisesByPlanDayId[day.planDayId];

        const startButtonColor = day.isCompletedThisWeek ? '#ccc' : '#4CAF50';
        const startButtonCursor = isDisabled ? 'not-allowed' : 'pointer';

        return (
            <div key={day.planDayId} className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center justify-between">
                    <span className="text-gray-700">{`יום ${day.dayOrder} - ${day.programName}`}</span>
                    <div className="flex items-center gap-2">
                        {day.isCompletedThisWeek && (
                            <span className="text-red-500 text-xs">(בוצע השבוע)</span>
                        )}
                        <Button
                            onClick={() => fetchExercisesForDay(day.planDayId)}
                            size="sm"
                            variant="ghost"
                            className="text-blue-600 hover:text-blue-700"
                            icon={isCurrentlyLoadingExercises ? <Loader2 className="h-4 w-4 animate-spin" /> : isExpanded ? <ChevronUp className="h-4 w-4" /> : <List className="h-4 w-4" />}
                            disabled={isCurrentlyLoadingExercises || isWorkoutStarting}
                        >
                            {isCurrentlyLoadingExercises ? 'טוען...' : isExpanded ? 'הסתר תרגילים' : 'הצג תרגילים'}
                        </Button>
                        <Button
                            onClick={() => startWorkout(day.planDayId)}
                            size="sm"
                            disabled={isDisabled}
                            style={{ cursor: startButtonCursor, backgroundColor: startButtonColor, color: 'white' }}
                            icon={
                                isWorkoutStarting && startingWorkoutPlanDayId === day.planDayId ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Play className="h-4 w-4" />
                                )
                            }
                        >
                            {buttonText}
                        </Button>
                    </div>
                </div>
                {isExpanded && dayExercises && dayExercises.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 pr-4 border-r-2 border-gray-200"
                    >
                        <h5 className="font-semibold text-gray-700 mb-2 text-right">תרגילים:</h5>
                        <ul className="space-y-2">
                            {dayExercises.map((exercisePlan) => (
                                <li key={exercisePlan.exercisePlanId} className="flex items-center text-sm text-gray-800">
                                    <CircleDotDashed className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
                                    <span>
                                        <strong className="font-semibold">{getExerciseName(exercisePlan.exerciseId)}</strong>: {exercisePlan.planSets} סטים | {exercisePlan.planRepetitionsMin}-{exercisePlan.planRepetitionsMax} חזרות | {exercisePlan.planWeight} ק"ג
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
                {isExpanded && (!dayExercises || dayExercises.length === 0) && !isCurrentlyLoadingExercises && (
                    <div className="mt-3 text-sm text-gray-500 text-center">אין תרגילים ליום אימון זה.</div>
                )}
            </div>
        );
    };

    const renderPlanCard = (
        planData: ActiveTrainingPlanResponse | TrainingPlan,
        planDays: PlanDay[],
        isCurrent: boolean
    ) => {
        const planInfo = planData as TrainingPlan; // Ensure it's treated as TrainingPlan for common properties

        // מיון ימי האימון בתוך ה-render
        // הפרדה בין ימי התוכנית הרגילים (isHistoricalProgram: false) לבין ימי היסטוריית האימונים (isHistoricalProgram: true)
        const regularPlanDays = planDays.filter(day => !day.isHistoricalProgram)
                                        .sort((a, b) => a.dayOrder - b.dayOrder);
        const historicalWorkoutDays = planDays.filter(day => day.isHistoricalProgram)
                                              .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());

        return (
            <motion.div
                key={planInfo.trainingPlanId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
                <div
                    className="h-40 bg-cover bg-center"
                    style={{ backgroundImage: `url(${getImageUrl('default')})` }}
                ></div>
                <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        {`תוכנית ל-${getGoalName(planInfo.goalId)}`}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {`אימון ל-${planInfo.trainingDays} ימים בשבוע`}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
                        <div>
                            <span className="font-medium">רמה:</span> {getLevelName(planInfo.fitnessLevelId)}
                        </div>
                        <div>
                            <span className="font-medium">זמן:</span> {getDurationName(planInfo.trainingDurationId)}
                        </div>
                        <div>
                            <span className="font-medium">התחלה:</span> {new Date(planInfo.startDate).toLocaleDateString('he-IL')}
                        </div>
                        {planInfo.endDate && (
                                <div>
                                    <span className="font-medium">סיום:</span> {new Date(planInfo.endDate).toLocaleDateString('he-IL')}
                                </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <Button
                            onClick={() => togglePlanExpansion(planInfo.trainingPlanId)}
                            variant="ghost"
                            fullWidth
                            className="justify-between text-blue-600 hover:text-blue-700"
                            icon={expandedPlanId === planInfo.trainingPlanId ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                        >
                            {expandedPlanId === planInfo.trainingPlanId ? 'הסתר ימי אימון' : 'הצג ימי אימון'}
                        </Button>
                    </div>

                    {expandedPlanId === planInfo.trainingPlanId && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 border-t pt-4"
                        >
                            <h4 className="font-medium text-gray-800 mb-2">ימי אימון:</h4>
                            <div className="space-y-2">
                                {/* הצגת ימי אימון רגילים (לא היסטוריים) */}
                                {regularPlanDays.length > 0 ? (
                                    <>
                                        <h5 className="font-semibold text-gray-700 mb-2 text-right">ימי תוכנית קבועים:</h5>
                                        {regularPlanDays.map((day) =>
                                            isCurrent ? renderActivePlanDayButton(day) : renderHistoryPlanDayButton(day, planInfo)
                                        )}
                                    </>
                                ) : (
                                    isCurrent && historicalWorkoutDays.length === 0 && (
                                        <div className="text-center text-gray-500">אין ימי אימון מוגדרים לתוכנית זו.</div>
                                    )
                                )}

                                {/* הצגת ימי אימון היסטוריים */}
                                {historicalWorkoutDays.length > 0 && (
                                    <>
                                        <h5 className="font-semibold text-gray-700 mb-2 text-right">היסטוריית אימונים ספציפיים:</h5>
                                        {historicalWorkoutDays.map((day) => renderHistoryPlanDayButton(day, planInfo))}
                                    </>
                                )}

                                {/* הודעה אם אין ימי אימון כלל */}
                                {regularPlanDays.length === 0 && historicalWorkoutDays.length === 0 && (
                                    <div className="text-center text-gray-500">אין ימי אימון בתוכנית זו.</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        );
    };


    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* User welcome section */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                    <div className="px-4 py-5 sm:px-6">
                        <h2 className="text-xl font-medium text-gray-900">
                            שלום, {user?.traineeName}
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            ברוך הבא למערכת האימונים שלך
                        </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                        <div className="flex space-x-4 space-x-reverse">
                            <Button
                                variant="outline"
                                onClick={() => navigate('/profile')}
                                icon={<Edit className="h-4 w-4" />}
                                disabled={isStartingWorkout || isLoadingAllExercises}
                            >
                                עדכון פרטים אישיים
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate('/trainee-dashboard')}
                                icon={<LayoutDashboard className="h-4 w-4" />}
                                disabled={isStartingWorkout || isLoadingAllExercises}
                            >
                                לוח מחוונים - אימונים פעילים
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Plans display section */}
                <div className="bg-white shadow sm:rounded-lg overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button
                                onClick={() => setActiveSection('current')}
                                className={`flex-1 px-6 py-4 text-center text-sm font-medium ${
                                    activeSection === 'current'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                                disabled={isStartingWorkout || isLoadingAllExercises}
                            >
                                <div className="flex items-center justify-center">
                                    <Calendar className="h-4 w-4 ml-2" />
                                    <span>תוכנית אימון נוכחית</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveSection('history')}
                                className={`flex-1 px-6 py-4 text-center text-sm font-medium ${
                                    activeSection === 'history'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                                disabled={isStartingWorkout || isLoadingAllExercises}
                            >
                                <div className="flex items-center justify-center">
                                    <History className="h-4 w-4 ml-2" />
                                    <span>היסטוריית אימונים</span>
                                </div>
                            </button>
                        </nav>
                    </div>

                    <div className="p-4 sm:p-6">
                        {isLoading || isLoadingAllExercises ? (
                            <div className="text-center py-8 text-gray-500">טוען...</div>
                        ) : error ? (
                            <div className="text-center text-red-500 py-8">{error}</div>
                        ) : activeSection === 'current' ? (
                            activePlanData ? (
                                renderPlanCard(activePlanData, activePlanData.planDays, true)
                            ) : (
                                <div className="text-center py-8 text-gray-500">לא נמצאה תוכנית אימון פעילה.</div>
                            )
                        ) : (
                            historyPlansData.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">לא נמצאו תוכניות אימון היסטוריות.</div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {historyPlansData.map((planData) =>
                                        renderPlanCard(planData.trainingPlan, planData.trainingPlan.planDays, false)
                                    )}
                                </div>
                            )
                        )}
                        {/* Global loading overlay for workout start */}
                        {isStartingWorkout && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                            >
                                <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
                                    <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                                    <p className="text-lg font-semibold text-gray-800">
                                        המערכת מכינה את האימון שלך...
                                    </p>
                                    <p className="text-sm text-gray-600">אנא המתן מספר רגעים.</p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HomePage;