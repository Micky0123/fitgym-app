
// src/pages/TraineeDashboardPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { activeWorkoutApi, traineeApi, trainingPlanApi, exerciseApi, categoryApi, exercisePlanApi } from '../lib/api';
import { Trainee, PathResult, PlanDay, ExercisePlan, Exercise, Category, ActiveTrainingPlanResponse } from '../types';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Select from 'react-select';
import TraineeWorkoutCard from '../components/TraineeWorkoutCard';
import { Loader2, Play, BookText, ChevronDown, ChevronUp, CheckCircle, XCircle, Home } from 'lucide-react';

interface SelectOption {
    value: number;
    label: string;
    data: PlanDay;
}

const TraineeDashboardPage: React.FC = () => {
    const navigate = useNavigate();

    const [allTrainees, setAllTrainees] = useState<Trainee[]>([]);
    const [traineeWorkoutStates, setTraineeWorkoutStates] = useState<Map<number, PathResult | null>>(new Map());

    const [traineeActiveTrainingPlans, setTraineeActiveTrainingPlans] = useState<Map<number, ActiveTrainingPlanResponse | null>>(new Map());

    const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // Add a new state for specific trainee errors
    const [traineeSpecificErrors, setTraineeSpecificErrors] = useState<Map<number, string | null>>(new Map());


    const [availablePlansForTrainee, setAvailablePlansForTrainee] = useState<Map<number, PlanDay[]>>(new Map());
    const [selectedPlanDayForTrainee, setSelectedPlanDayForTrainee] = useState<Map<number, PlanDay | null>>(new Map());
    const [isStartingWorkoutForTrainee, setIsStartingWorkoutForTrainee] = useState<number | null>(null);

    const [expandedDayId, setExpandedDayId] = useState<number | null>(null);
    const [isLoadingExercisesForDay, setIsLoadingExercisesForDay] = useState<boolean>(false);
    const [exercisesByPlanDayId, setExercisesByPlanDayId] = useState<Map<number, ExercisePlan[]>>(new Map());

    const [allExercisesMap, setAllExercisesMap] = useState<Map<number, Exercise>>(new Map());
    const [categories, setCategories] = useState<Category[]>([]);

    const getExerciseName = useCallback((exerciseId: number) => {
        return allExercisesMap.get(exerciseId)?.exerciseName || `תרגיל ${exerciseId}`;
    }, [allExercisesMap]);

    const getCategoryName = useCallback((categoryId: number) => {
        return categories.find(c => c.categoryId === categoryId)?.categoryName || `קטגוריה ${categoryId}`;
    }, [categories]);

    useEffect(() => {
        const fetchAllExercises = async () => {
            try {
                const exercisesData = await exerciseApi.getAll();
                const exercisesMap = new Map<number, Exercise>();
                exercisesData.forEach((ex: Exercise) => exercisesMap.set(ex.exerciseId, ex));
                setAllExercisesMap(exercisesMap);
            } catch (err) {
                console.error("Failed to fetch all exercises:", err);
            }
        };
        fetchAllExercises();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trainees = await traineeApi.getAll();
                setAllTrainees(trainees);

                const initialStates = new Map<number, PathResult | null>();
                const initialErrors = new Map<number, string | null>(); // Initialize errors map
                trainees.forEach((t: Trainee) => {
                    initialStates.set(t.traineeId, null);
                    initialErrors.set(t.traineeId, null); // Set initial error to null for each trainee
                });
                setTraineeWorkoutStates(initialStates);
                setTraineeSpecificErrors(initialErrors); // Set the errors map

                const allCategories = await categoryApi.getAll();
                setCategories(allCategories);

                setIsLoadingInitialData(false);
                trainees.forEach((t: Trainee) => fetchActiveTrainingPlanForTrainee(t.traineeId));
                fetchAllTraineeWorkoutStatuses(trainees.map((t: Trainee) => t.traineeId));
            } catch (err: any) {
                setError(err.message || 'שגיאה בטעינת רשימת המתאמנים/נתונים כלליים.');
                setIsLoadingInitialData(false);
            }
        };
        fetchData();
    }, []);

    const fetchActiveTrainingPlanForTrainee = useCallback(async (traineeId: number) => {
        try {
            const activePlan = await activeWorkoutApi.getTraineeActiveTrainingPlan(traineeId);
            setTraineeActiveTrainingPlans(prev => new Map(prev).set(traineeId, activePlan));

            if (activePlan && activePlan.planDays) {
                setAvailablePlansForTrainee(prev => new Map(prev).set(traineeId, activePlan.planDays));
            } else {
                setAvailablePlansForTrainee(prev => {
                    const newMap = new Map(prev);
                    newMap.delete(traineeId);
                    return newMap;
                });
            }
        } catch (err: any) {
            if (err.response && err.response.status === 404) {
                console.log(`No active training plan for trainee ${traineeId}.`);
                setTraineeActiveTrainingPlans(prev => new Map(prev).set(traineeId, null));
                setAvailablePlansForTrainee(prev => {
                    const newMap = new Map(prev);
                    newMap.delete(traineeId);
                    return newMap;
                });
            } else {
                console.error(`Error fetching active training plan for trainee ${traineeId}:`, err);
            }
        }
    }, []);

    const fetchTraineeWorkoutStatus = useCallback(async (traineeId: number) => {
        try {
            const updatedPlan: PathResult = await activeWorkoutApi.getUpdatedWorkoutPlan(traineeId);
            setTraineeWorkoutStates(prev => new Map(prev).set(traineeId, updatedPlan));
            // Clear any specific error for this trainee if workout status is fetched successfully
            setTraineeSpecificErrors(prev => new Map(prev).set(traineeId, null));
            if (!updatedPlan.isWorkoutComplete) {
                setAvailablePlansForTrainee(prev => {
                    const newMap = new Map(prev);
                    newMap.delete(traineeId);
                    return newMap;
                });
                setSelectedPlanDayForTrainee(prev => {
                    const newMap = new Map(prev);
                    newMap.delete(traineeId);
                    return newMap;
                });
            } else {
                fetchActiveTrainingPlanForTrainee(traineeId);
            }
        } catch (err: any) {
            if (err.response && err.response.status === 404) {
                setTraineeWorkoutStates(prev => new Map(prev).set(traineeId, null));
                fetchActiveTrainingPlanForTrainee(traineeId);
                setTraineeSpecificErrors(prev => new Map(prev).set(traineeId, null)); // Clear error if no active workout
            } else {
                console.error(`Error fetching workout status for trainee ${traineeId}:`, err);
                setTraineeSpecificErrors(prev => new Map(prev).set(traineeId, err.response?.data?.detail || err.message || 'שגיאה בטעינת סטטוס אימון.'));
            }
        }
    }, [fetchActiveTrainingPlanForTrainee]);

    const fetchAllTraineeWorkoutStatuses = useCallback(async (traineeIds: number[]) => {
        await Promise.all(traineeIds.map(id => fetchTraineeWorkoutStatus(id)));
    }, [fetchTraineeWorkoutStatus]);

    useEffect(() => {
        if (allTrainees.length > 0) {
            const interval = setInterval(() => {
                fetchAllTraineeWorkoutStatuses(allTrainees.map(t => t.traineeId));
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [allTrainees, fetchAllTraineeWorkoutStatuses]);

    const fetchExercisesForDay = useCallback(async (planDayId: number) => {
        setIsLoadingExercisesForDay(true);
        try {
            const exercisesData: ExercisePlan[] = await exercisePlanApi.getExercisesForPlanDay(planDayId);
            setExercisesByPlanDayId(prev => new Map(prev).set(planDayId, exercisesData));
        } catch (err) {
            console.error(`Failed to fetch exercises for plan day ${planDayId}:`, err);
        } finally {
            setIsLoadingExercisesForDay(false);
        }
    }, []);

    const toggleDayExpansion = useCallback(async (planDayId: number) => {
        if (expandedDayId === planDayId) {
            setExpandedDayId(null);
        } else {
            setExpandedDayId(planDayId);
            if (!exercisesByPlanDayId.has(planDayId)) {
                await fetchExercisesForDay(planDayId);
            }
        }
    }, [expandedDayId, exercisesByPlanDayId, fetchExercisesForDay]);

    const handleStartWorkoutForTrainee = async (traineeId: number) => {
        const selectedPlan = selectedPlanDayForTrainee.get(traineeId);
        if (!selectedPlan) {
            alert('אנא בחר יום אימון לפני ההתחלה.');
            return;
        }

        const activePlanForTrainee = traineeActiveTrainingPlans.get(traineeId);
        const correspondingPlanDayInActivePlan = activePlanForTrainee?.planDays?.find(d => d.planDayId === selectedPlan.planDayId);

        if (correspondingPlanDayInActivePlan?.isCompletedThisWeek) {
            alert(`לא ניתן להתחיל אימון זה. אימון "${selectedPlan.ProgramName}" כבר בוצע השבוע.`);
            return;
        }

        let exercisesToUse: ExercisePlan[] | undefined = exercisesByPlanDayId.get(selectedPlan.planDayId);
        if (!exercisesToUse || exercisesToUse.length === 0) {
            setIsStartingWorkoutForTrainee(traineeId);
            try {
                exercisesToUse = await exercisePlanApi.getExercisesForPlanDay(selectedPlan.planDayId);
                setExercisesByPlanDayId(prev => new Map(prev).set(selectedPlan.planDayId, exercisesToUse!));
                if (exercisesToUse.length === 0) {
                    alert('אין תרגילים מוגדרים ליום אימון זה. לא ניתן להתחיל.');
                    setIsStartingWorkoutForTrainee(null);
                    return;
                }
            } catch (err: any) {
                console.error('Failed to load exercises for selected plan day:', err);
                setError('שגיאה בטעינת תרגילי האימון הנבחר.');
                setIsStartingWorkoutForTrainee(null);
                return;
            }
            setIsStartingWorkoutForTrainee(null);
        }

        setIsStartingWorkoutForTrainee(traineeId);
        // Clear previous error for this trainee before attempting to start workout
        setTraineeSpecificErrors(prev => new Map(prev).set(traineeId, null));

        try {
            const requestBody = {
                Trainee: traineeId,
                planday: selectedPlan.planDayId,
                StartTime: new Date().toISOString(),
            };
            await activeWorkoutApi.startWorkout(requestBody);
            const traineeName = allTrainees.find(t => t.traineeId === traineeId)?.traineeName || `ID: ${traineeId}`;
            alert(`אימון התחיל עבור מתאמן: ${traineeName}, יום אימון: ${selectedPlan.ProgramName} (יום ${selectedPlan.dayOrder})`);

            await fetchTraineeWorkoutStatus(traineeId);
            await fetchActiveTrainingPlanForTrainee(traineeId);

            setSelectedPlanDayForTrainee(prev => {
                const newMap = new Map(prev);
                newMap.delete(traineeId);
                return newMap;
            });

        } catch (err: any) {
            console.error('Failed to start workout for trainee:', err);
            // Check if the error is the specific "no path found" message
            const errorMessage = err.response?.data?.detail || err.message || 'שגיאה בהתחלת האימון.';
            if (errorMessage.includes("לא נמצא מסלול מתאים עבור מתאמן זה.")) {
                // Set the specific error for this trainee
                setTraineeSpecificErrors(prev => new Map(prev).set(traineeId, errorMessage));
            } else {
                // For other errors, set the general error
                setError(errorMessage);
            }
        } finally {
            setIsStartingWorkoutForTrainee(null);
        }
    };

    const renderExercisesList = (exercisePlans: ExercisePlan[]) => (
        <ul className="space-y-1 text-sm text-gray-700 mt-2">
            {exercisePlans
                .sort((a: ExercisePlan, b: ExercisePlan) => a.orderInDay - b.orderInDay)
                .map((exercisePlan: ExercisePlan) => (
                    <li key={exercisePlan.exercisePlanId} className="flex items-center">
                        <div className="h-2 w-2 bg-gray-400 rounded-full ml-2 flex-shrink-0"></div>
                        <span>
                            <strong className="font-semibold">{getExerciseName(exercisePlan.exerciseId)}</strong>
                            : {exercisePlan.planSets} סטים | {exercisePlan.planRepetitionsMin}-{exercisePlan.planRepetitionsMax} חזרות | {exercisePlan.planWeight} ק"ג
                        </span>
                    </li>
                ))}
        </ul>
    );

    const handleGoHome = () => {
        navigate('/');
    };

    if (isLoadingInitialData) {
        return <div className="text-center py-8 text-gray-500">טוען את כל המתאמנים...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-8"><p>{error}</p></div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg"
        >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">לוח מחוונים - ניהול אימונים</h1>
                <Button
                    onClick={handleGoHome}
                    variant="outline"
                    icon={<Home className="h-4 w-4" />}
                >
                    חזור לדף הבית
                </Button>
            </div>

            {allTrainees.length === 0 && (
                <p className="text-center text-gray-500 text-lg">אין מתאמנים רשומים במערכת.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTrainees.map(trainee => {
                    const workoutState = traineeWorkoutStates.get(trainee.traineeId);
                    const hasActiveWorkout = workoutState !== undefined && workoutState !== null && !workoutState.isWorkoutComplete;

                    const traineeActivePlan = traineeActiveTrainingPlans.get(trainee.traineeId);
                    const traineePlans = traineeActivePlan?.planDays || [];

                    const currentSelectedPlanDay = selectedPlanDayForTrainee.get(trainee.traineeId);

                    const selectedDayExercises = currentSelectedPlanDay ? exercisesByPlanDayId.get(currentSelectedPlanDay.planDayId) : undefined;
                    const traineeError = traineeSpecificErrors.get(trainee.traineeId); // Get the specific error for this trainee


                    return (
                        <motion.div
                            key={trainee.traineeId}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white border border-gray-200 rounded-lg shadow-md p-5 relative"
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-3">{trainee.traineeName || `מתאמן ID: ${trainee.traineeId}`}</h2>

                            {hasActiveWorkout && workoutState ? (
                                <TraineeWorkoutCard
                                    workoutData={workoutState}
                                    onRemove={() => { /* אין צורך ב-onRemove כאן כי הכרטיס תמיד מוצג */ }}
                                />
                            ) : (
                                <>
                                    <div className="mt-4">
                                        <h3 className="text-md font-semibold text-gray-700 mb-2">התחל אימון חדש</h3>
                                        <Select<SelectOption>
                                            options={traineePlans
                                                .filter(p => !p.isCompletedThisWeek)
                                                .map(p => ({ value: p.planDayId, label: `יום ${p.dayOrder} ${p.ProgramName || ''}`, data: p }))}
                                            onChange={async option => {
                                                setSelectedPlanDayForTrainee(prev => new Map(prev).set(trainee.traineeId, option?.data || null));
                                                setExpandedDayId(null);

                                                // Clear the specific error when a new plan day is selected
                                                setTraineeSpecificErrors(prev => new Map(prev).set(trainee.traineeId, null));


                                                if (option?.data) {
                                                    await fetchExercisesForDay(option.data.planDayId);
                                                }
                                            }}
                                            placeholder="בחר יום אימון..."
                                            className="mb-2"
                                            value={currentSelectedPlanDay ? { value: currentSelectedPlanDay.planDayId, label: `יום ${currentSelectedPlanDay.dayOrder}: ${currentSelectedPlanDay.ProgramName || ''}`, data: currentSelectedPlanDay } : null}
                                            isClearable
                                        />

                                        {traineePlans.every(p => p.isCompletedThisWeek) && (
                                            <p className="text-sm text-green-600 mt-2 flex items-center">
                                                <CheckCircle className="h-4 w-4 ml-1" />
                                                כל האימונים השבוע עבור מתאמן זה בוצעו.
                                            </p>
                                        )}
                                        {traineePlans.length === 0 && (
                                            <p className="text-sm text-gray-500 mt-2 flex items-center">
                                                <XCircle className="h-4 w-4 ml-1 text-red-500" />
                                                אין תוכנית אימון פעילה או ימי אימון זמינים למתאמן זה.
                                            </p>
                                        )}

                                        {currentSelectedPlanDay && selectedDayExercises && (
                                            <div className="mt-4 bg-gray-50 p-3 rounded-md border border-gray-200">
                                                <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                                                    <BookText className="h-4 w-4 ml-1" />
                                                    תרגילים ליום אימון זה
                                                </h4>
                                                {renderExercisesList(selectedDayExercises)}
                                            </div>
                                        )}
                                        {currentSelectedPlanDay && isLoadingExercisesForDay && !selectedDayExercises && (
                                            <div className="text-center text-gray-500 flex items-center justify-center py-2">
                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                טוען תרגילים עבור היום הנבחר...
                                            </div>
                                        )}

                                        <Button
                                            onClick={() => handleStartWorkoutForTrainee(trainee.traineeId)}
                                            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md transition-colors w-full mt-3"
                                            disabled={isStartingWorkoutForTrainee === trainee.traineeId || !currentSelectedPlanDay || (selectedDayExercises && selectedDayExercises.length === 0)}
                                            icon={isStartingWorkoutForTrainee === trainee.traineeId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                                        >
                                            {isStartingWorkoutForTrainee === trainee.traineeId ? 'מתחיל אימון...' : 'התחל אימון'}
                                        </Button>

                                        {/* Display specific error for this trainee */}
                                        {traineeError && (
                                            <div className="mt-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                                <p className="text-sm text-right flex items-center justify-end">
                                                    <XCircle className="h-4 w-4 ml-2" />
                                                    {traineeError}
                                                </p>
                                                <Button
                                                    onClick={() => setTraineeSpecificErrors(prev => new Map(prev).set(trainee.traineeId, null))}
                                                    variant="ghost"
                                                    className="mt-2 text-red-600 hover:bg-red-200"
                                                >
                                                    אשר והמשך
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {traineePlans.length > 0 && (
                                        <div className="mt-6 border-t border-gray-200 pt-4">
                                            <h3 className="text-md font-semibold text-gray-700 mb-3">ימי אימון בתוכנית הפעילה</h3>
                                            <div className="space-y-3">
                                                {traineePlans
                                                    .sort((a, b) => a.dayOrder - b.dayOrder)
                                                    .map(planDay => (
                                                        <div key={planDay.planDayId} className="border border-gray-200 rounded-md p-3">
                                                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDayExpansion(planDay.planDayId)}>
                                                                <h4 className="text-lg font-medium text-gray-800 flex items-center">
                                                                    <BookText className="h-5 w-5 ml-2 text-blue-500" />
                                                                    יום {planDay.dayOrder} {planDay.ProgramName}
                                                                </h4>
                                                                <div className="flex items-center">
                                                                    {planDay.isCompletedThisWeek ? (
                                                                        <span className="text-green-600 text-sm flex items-center ml-2">
                                                                            <CheckCircle className="h-4 w-4 ml-1" />
                                                                            בוצע השבוע
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-gray-500 text-sm flex items-center ml-2">
                                                                            <XCircle className="h-4 w-4 ml-1" />
                                                                            טרם בוצע השבוע
                                                                        </span>
                                                                    )}
                                                                    {expandedDayId === planDay.planDayId ? <ChevronUp className="h-5 w-5 text-gray-500 ml-2" /> : <ChevronDown className="h-5 w-5 text-gray-500 ml-2" />}
                                                                </div>
                                                            </div>
                                                            {expandedDayId === planDay.planDayId && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: "auto" }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    transition={{ duration: 0.3 }}
                                                                    className="mt-3 overflow-hidden"
                                                                >
                                                                    {isLoadingExercisesForDay && !exercisesByPlanDayId.has(planDay.planDayId) ? (
                                                                        <div className="text-center text-gray-500 flex items-center justify-center py-2">
                                                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                                            טוען תרגילים...
                                                                        </div>
                                                                    ) : (
                                                                        exercisesByPlanDayId.get(planDay.planDayId) && exercisesByPlanDayId.get(planDay.planDayId)!.length > 0 ? (
                                                                            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                                                                                <h5 className="font-semibold text-gray-700 mb-2">תרגילים:</h5>
                                                                                {renderExercisesList(exercisesByPlanDayId.get(planDay.planDayId)!)}
                                                                            </div>
                                                                        ) : (
                                                                            <p className="text-gray-500 text-sm mt-2">אין תרגילים מוגדרים ליום זה.</p>
                                                                        )
                                                                    )}
                                                                </motion.div>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default TraineeDashboardPage;