// src/pages/WorkoutPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { activeWorkoutApi, categoryApi, exerciseApi } from '../lib/api';
import { useAuthStore } from '../store/authStore';
import { PathResult, ExerciseEntry, NextExerciseResponse, Exercise, Category } from '../types';
import { useWorkoutRefresh } from '../context/WorkoutRefreshContext'; // ייבוא ה-Hook החדש

const WorkoutPage: React.FC = () => {
    const { planDayId: planDayIdString } = useParams<{ planDayId: string }>();
    const planDayId = parseInt(planDayIdString || '0'); 
    
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const traineeId = user?.traineeId;

    const [workoutData, setWorkoutData] = useState<PathResult | null>(null);
    const [currentExercise, setCurrentExercise] = useState<ExerciseEntry | null>(null);
    const [isLoadingInitialData, setIsLoadingInitialData] = useState(true); // מצב טעינה ראשוני בלבד
    const [error, setError] = useState<string | null>(null);
    const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
    const [showWorkoutCompleteModal, setShowWorkoutCompleteModal] = useState(false); 
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [categories, setCategories] = useState<Category[]>([]); 

    const { refreshCounter } = useWorkoutRefresh(); 

    // פונקציות טעינת נתונים סטטיים (לא אמורות לגרום לקפיצות, טעינה חד פעמית)
    const fetchExercises = useCallback(async () => {
        try {
            const data = await exerciseApi.getAll();
            setExercises(data);
        } catch (error) {
            console.error("Failed to fetch exercises:", error);
            // אם יש שגיאה בטעינת תרגילים/קטגוריות, אנחנו לא רוצים שהדף יקרוס לגמרי.
            // רק נציג הודעה בקונסול. השגיאה הראשית תטופל ב-fetchWorkoutStatus.
        }
    }, []); // תלויות ריקות כי הנתונים סטטיים

    const fetchCategories = useCallback(async () => { 
        try {
            const data = await categoryApi.getAll();
            setCategories(data); 
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    }, []); // תלויות ריקות כי הנתונים סטטיים

    // פונקציה לטעינת סטטוס האימון - קריאה זו תבוצע גם בפולינג
    const fetchWorkoutStatus = useCallback(async (initialLoad = false) => {
        if (!traineeId || !planDayId || planDayId === 0) {
            if (initialLoad) { // רק בטעינה ראשונית נציג שגיאה גלובלית
                setError('שגיאה: מזהה מתאמן או מזהה יום אימון חסר/לא חוקי.');
            }
            return;
        }

        try {
            // אין צורך ב-setIsLoading(true) כאן בפולינג, רק בטעינה ראשונית
            const updatedWorkout: PathResult = await activeWorkoutApi.getUpdatedWorkoutPlan(traineeId);
            setWorkoutData(updatedWorkout);
            setIsWorkoutComplete(updatedWorkout.isWorkoutComplete);

            if (updatedWorkout.isWorkoutComplete) {
                setShowWorkoutCompleteModal(true);
                setCurrentExercise(null); 
            } else {
                const nextExerciseRes: NextExerciseResponse = await activeWorkoutApi.getNextExerciseInWorkout(traineeId);
                
                if (nextExerciseRes.isWorkoutComplete) {
                    setIsWorkoutComplete(true);
                    setShowWorkoutCompleteModal(true); 
                    setCurrentExercise(null);
                } else {
                    setCurrentExercise(nextExerciseRes.nextExercise || null);
                }
            }
            setError(null); // ננקה שגיאות קודמות אם הטעינה הצליחה

        } catch (err: any) {
            console.error('Error fetching workout status:', err);
            if (err.response && err.response.status === 404) {
                // האימון לא נמצא (לדוגמה, המאמן הפסיק אותו)
                setIsWorkoutComplete(true);
                setShowWorkoutCompleteModal(true); 
                setCurrentExercise(null);
                setError('האימון הנוכחי הסתיים או הופסק על ידי המאמן.');
            } else {
                // נציג שגיאה רק אם זו שגיאה חמורה ולא חוסר באימון
                // נמנע מלהחליף הודעת שגיאה על חוסר אימון אם כבר הוצגה
                if (!isWorkoutComplete) { // אם האימון לא הוגדר כהושלם
                    setError(err.response?.data?.message || err.message || 'שגיאה בטעינת סטטוס האימון.');
                }
            }
        }
    }, [traineeId, planDayId, isWorkoutComplete]); // isWorkoutComplete הוסף כתלות כדי למנוע לולאה אינסופית

    // טעינת נתונים ראשונית של הדף
    useEffect(() => {
        const initialLoad = async () => {
            setIsLoadingInitialData(true);
            // טען נתונים סטטיים
            await Promise.all([
                fetchExercises(),
                fetchCategories() 
            ]);
            // טען את סטטוס האימון (פעם ראשונה)
            await fetchWorkoutStatus(true); // העבר true לציון טעינה ראשונית
            setIsLoadingInitialData(false);
        };
        initialLoad();
    }, [fetchExercises, fetchCategories, fetchWorkoutStatus]); // תלויות לפונקציות useCallback

    // מנגנון פולינג לריענון שוטף של סטטוס האימון
    useEffect(() => {
        if (traineeId && planDayId && planDayId !== 0 && !isWorkoutComplete) {
            const interval = setInterval(() => {
                // קריאה ל-fetchWorkoutStatus בלי לשנות את מצב הטעינה
                fetchWorkoutStatus(); 
            }, 5000); // רענן כל 5 שניות

            return () => clearInterval(interval); // נקה את האינטרוול ביציאה מהרכיב
        }
        // אם האימון הושלם, אין צורך להמשיך בפולינג
    }, [traineeId, planDayId, fetchWorkoutStatus, isWorkoutComplete, refreshCounter]); 

    // הפונקציות handleStartExercise ו-handleCompleteExercise
    const handleStartExercise = async (exerciseId: number) => {
        if (!traineeId || !currentExercise) return;
        try {
            await activeWorkoutApi.startExercise(traineeId, exerciseId, new Date());
            await fetchWorkoutStatus(); // עדכן את המצב בדף זה מיד
        } catch (err: any) {
            console.error('Failed to start exercise:', err);
            alert(`שגיאה בהתחלת תרגיל: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleCompleteExercise = async (exerciseId: number) => {
        if (!traineeId || !currentExercise) return;
        try {
            await activeWorkoutApi.completeExercise(traineeId, exerciseId, new Date());
            await fetchWorkoutStatus(); // עדכן את המצב בדף זה מיד
        } catch (err: any) {
            console.error('Failed to complete exercise:', err);
            alert(`שגיאה בסיום תרגיל: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleGoHome = () => {
        setShowWorkoutCompleteModal(false); 
        navigate('/'); 
    };

    if (isLoadingInitialData) {
        return <div className="text-center py-8 text-gray-500">טוען נתוני אימון...</div>;
    }

    if (error && (!workoutData || !traineeId)) { // הצג שגיאה רק אם אין נתוני אימון כלל או אין traineeId
        return (
            <div className="text-center text-red-500 py-8">
                <p>{error}</p>
                <Button onClick={() => navigate('/')} className="mt-4">חזור לדף הבית</Button>
            </div>
        );
    }

    // אם אין נתוני אימון פעיל וגם האימון לא הושלם, זה אומר שאין מה להציג
    if (!workoutData && !isWorkoutComplete) { 
        return (
            <div className="text-center py-8 text-gray-500">
                לא נמצא אימון פעיל או שהאימון הסתיים.
                <Button onClick={() => navigate('/')} className="mt-4">חזור לדף הבית</Button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
        >
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                אימון פעיל: {workoutData?.trainee?.traineeName || 'מתאמן לא ידוע'}
            </h1>

            {/* אזור התרגיל הנוכחי - עם min-height קבוע למניעת קפיצות */}
            <div 
                className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-md"
                // הגדר גובה מינימלי קבוע כדי למנוע קפיצות כשהתוכן נעלם או מופיע
                style={{ minHeight: '220px' }} 
            >
                {currentExercise ? (
                    <>
                        <h2 className="text-xl font-semibold text-blue-800 mb-2">
                            תרגיל נוכחי: {exercises.find(e => e.exerciseId === currentExercise.exerciseDetails?.exerciseId)?.exerciseName || 'שם תרגיל לא ידוע'}
                        </h2>
                        <p className="text-gray-700">
                            סדר בתרגילים: {currentExercise.orderInList} מתוך {workoutData?.exerciseIdsInPath ? Object.keys(workoutData.exerciseIdsInPath).length : '?'}
                        </p>

                        {(() => {
                            const currentExercisePlan = currentExercise.exerciseDetails;
                            if (currentExercisePlan) {
                                return (
                                    <>
                                        <p className="text-gray-700">id: {currentExercisePlan.exerciseId}</p>
                                        <p className='text-gray-700'>קטגוריה: {categories.find(e => e.categoryId === currentExercisePlan.categoryId)?.categoryName} </p>
                                        <p className="text-gray-700">סטים: {currentExercisePlan.planSets}</p>
                                        <p className="text-gray-700">חזרות: {currentExercisePlan.planRepetitionsMin} - {currentExercisePlan.planRepetitionsMax}</p>
                                        {currentExercisePlan.planWeight !== undefined && (
                                            <p className="text-gray-700">משקל: {currentExercisePlan.planWeight} ק"ג</p>
                                        )}
                                        {currentExercisePlan.timesMin !== undefined && currentExercisePlan.timesMax !== undefined ? (
                                            <p className="text-gray-700">זמן משוער: {currentExercisePlan.timesMin}-{currentExercisePlan.timesMax} דקות</p>
                                        ) : currentExercisePlan.timesMax !== undefined ? (
                                            <p className="text-gray-700">זמן מקסימלי: {currentExercisePlan.timesMax} דקות</p>
                                        ) : currentExercisePlan.timesMin !== undefined ? (
                                            <p className="text-gray-700">זמן מינימלי: {currentExercisePlan.timesMin} דקות</p>
                                        ) : null}
                                    </>
                                );
                            }
                            return null;
                        })()}

                        <div className="mt-4 flex gap-4">
                            {!currentExercise.startTime || currentExercise.startTime === "0001-01-01T00:00:00" ? (
                                <Button onClick={() => handleStartExercise(currentExercise.exerciseId)} className="bg-green-500 hover:bg-green-600">
                                    התחל תרגיל
                                </Button>
                            ) : (
                                <Button onClick={() => handleCompleteExercise(currentExercise.exerciseId)} className="bg-indigo-500 hover:bg-indigo-600">
                                    סיים תרגיל
                                </Button>
                            )}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500 py-8">אין תרגיל פעיל כרגע. ייתכן שהאימון הסתיים או טרם החל.</p>
                )}
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">סטטוס תרגילים:</h3>
            <div className="space-y-3">
                {workoutData?.exerciseIdsInPath && Object.values(workoutData.exerciseIdsInPath)
                    .sort((a, b) => a.orderInList - b.orderInList)
                    .map((exercise, index) => (
                        <div
                            key={exercise.exerciseId + '-' + index}
                            className={`flex items-center justify-between p-3 rounded-md ${
                                exercise.isDone ? 'bg-green-100 text-green-800' :
                                (currentExercise && exercise.exerciseId === currentExercise.exerciseId && exercise.orderInList === currentExercise.orderInList) ? 'bg-blue-100 text-blue-800 font-medium' :
                                'bg-gray-50 text-gray-700'
                            }`}
                        >
                            <span>
                                {exercises.find(e => e.exerciseId === exercise.exerciseDetails?.exerciseId)?.exerciseName || 'שם תרגיל לא ידוע'} (סדר: {exercise.orderInList })
                            </span>
                            {exercise.isDone ? (
                                <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white">בוצע</span>
                            ) : (currentExercise && exercise.exerciseId === currentExercise.exerciseId && exercise.orderInList === currentExercise.orderInList) ? (
                                <span className="text-xs px-2 py-1 rounded-full bg-blue-500 text-white">נוכחי</span>
                            ) : (
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-300 text-gray-800">ממתין</span>
                            )}
                        </div>
                    ))}
            </div>

            <AnimatePresence>
                {showWorkoutCompleteModal && (
                    <motion.div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ type: "spring", damping: 15, stiffness: 300 }}
                        >
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">כל הכבוד! האימון הושלם בהצלחה!</h3>
                            <p className="text-gray-600 mb-6">
                                סיימת את כל התרגילים בתוכנית האימון של היום.
                            </p>
                            <Button 
                                onClick={handleGoHome} 
                                size="lg" 
                                fullWidth
                            >
                                חזור לדף הבית
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default WorkoutPage;