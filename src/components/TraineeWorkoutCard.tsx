// // src/components/TraineeWorkoutCard.tsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { PathResult, ExerciseEntry, NextExerciseResponse, Exercise, Category } from '../types'; // ודא ש-PathResult קיים ומוגדר נכון
// import { activeWorkoutApi, exerciseApi, categoryApi } from '../lib/api';
// import Button from './ui/Button';
// import { motion } from 'framer-motion';

// interface TraineeWorkoutCardProps {
//     workoutData: PathResult; // הפעם ה-prop הוא PathResult
//     onRemove: (traineeId: number) => void;
// }

// const TraineeWorkoutCard: React.FC<TraineeWorkoutCardProps> = ({ workoutData: initialWorkoutData, onRemove }) => {
//     // השתמש ב-PathResult כטיפוס ה-state
//     const [workoutData, setWorkoutData] = useState<PathResult>(initialWorkoutData);
//     const [currentExercise, setCurrentExercise] = useState<ExerciseEntry | null>(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     // isWorkoutComplete כעת מגיע ישירות מ-PathResult
//     const [isWorkoutComplete, setIsWorkoutComplete] = useState(initialWorkoutData.isWorkoutComplete || false);
//     const [exercises, setExercises] = useState<Exercise[]>([]);
//     const [categories, setCategories] = useState<Category[]>([]);

//     // traineeId ו-traineeName מגיעים כעת מ-workoutData (שהוא PathResult)
//     const traineeId = workoutData.trainee.traineeId;
//     const traineeName = workoutData.trainee.traineeName || `מתאמן ID: ${traineeId}`;

//     // Helper to get exercise name
//     const getExerciseName = (exerciseId: number | undefined) => {
//         if (exerciseId === undefined) return 'תרגיל לא ידוע';
//         return exercises.find(e => e.exerciseId === exerciseId)?.exerciseName || `תרגיל ${exerciseId}`;
//     };

//     // Helper to get category name
//     const getCategoryName = (categoryId: number | undefined) => {
//         if (categoryId === undefined) return 'קטגוריה לא ידועה';
//         return categories.find(c => c.categoryId === categoryId)?.categoryName || `קטגוריה ${categoryId}`;
//     };

//     const fetchExerciseAndCategoryData = async () => {
//         try {
//             const allExercises = await exerciseApi.getAll(); // ודא ש-exerciseApi.getAll() מחזיר Exercise[]
//             setExercises(allExercises);
//             const allCategories = await categoryApi.getAll(); // ודא ש-categoryApi.getAll() מחזיר Category[]
//             setCategories(allCategories);
//         } catch (err: any) {
//             console.error("Failed to load exercises/categories:", err);
//             setError("שגיאה בטעינת נתוני תרגילים/קטגוריות.");
//         }
//     };

//     const fetchWorkoutStatus = useCallback(async () => {
//         if (traineeId === undefined || traineeId === null) return; // ודא ש-traineeId קיים

//         try {
//             setIsLoading(true);
//             setError(null);
//             // קריאה ל-getUpdatedWorkoutPlan שמחזירה PathResult
//             const updatedPlan: PathResult = await activeWorkoutApi.getUpdatedWorkoutPlan(traineeId);
//             setWorkoutData(updatedPlan);
//             setIsWorkoutComplete(updatedPlan.isWorkoutComplete);

//             if (!updatedPlan.isWorkoutComplete) {
//                 // קריאה ל-getNextExerciseInWorkout שמחזירה NextExerciseResponse
//                 const nextExerciseRes: NextExerciseResponse = await activeWorkoutApi.getNextExerciseInWorkout(traineeId);
//                 // ודא ש-nextExerciseRes.isWorkoutComplete מתייחס לסיום האימון הכולל
//                 if (nextExerciseRes.isWorkoutComplete) {
//                     setIsWorkoutComplete(true);
//                     setCurrentExercise(null);
//                 } else {
//                     // nextExerciseRes.nextExercise הוא מסוג ExerciseEntry
//                     setCurrentExercise(nextExerciseRes.nextExercise || null);
//                 }
//             } else {
//                 setCurrentExercise(null);
//             }
//         } catch (err: any) {
//             console.error(`Error fetching workout status for ${traineeName}:`, err);
//             // אם המתאמן לא נמצא או אין לו אימון פעיל, אפשר להניח שהאימון הושלם או לא קיים
//             if (err.response && err.response.status === 404) {
//                 setIsWorkoutComplete(true); // Treat 404 as workout completed
//                 setCurrentExercise(null);
//             } else {
//                 setError(err.response?.data?.message || err.message || 'שגיאה בטעינת סטטוס האימון.');
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     }, [traineeId, traineeName]); // תלויות

//     useEffect(() => {
//         fetchExerciseAndCategoryData();
//         fetchWorkoutStatus(); // Initial fetch

//         // Refresh interval for this specific card
//         const interval = setInterval(fetchWorkoutStatus, 3000); // Refresh every 3 seconds
//         return () => clearInterval(interval);
//     }, [fetchWorkoutStatus]); // תלויות

//     const handleStartExercise = async (exerciseId: number) => {
//         if (traineeId === undefined || traineeId === null || !currentExercise) return;
//         try {
//             // ה-API מצפה ל-traineeId, exerciseId, startTime
//             await activeWorkoutApi.startExercise(traineeId, exerciseId, new Date());
//             alert(`מתאמן ${traineeName}: התרגיל התחיל!`);
//             await fetchWorkoutStatus(); // רענן סטטוס לאחר הפעולה
//         } catch (err: any) {
//             console.error('Failed to start exercise:', err);
//             alert(`שגיאה בהתחלת תרגיל עבור ${traineeName}: ${err.response?.data?.message || err.message}`);
//         }
//     };

//     const handleCompleteExercise = async (exerciseId: number) => {
//         if (traineeId === undefined || traineeId === null || !currentExercise) return;
//         try {
//             // ה-API מצפה ל-traineeId, exerciseId, endTime
//             await activeWorkoutApi.completeExercise(traineeId, exerciseId, new Date());
//             alert(`מתאמן ${traineeName}: התרגיל הסתיים!`);
//             await fetchWorkoutStatus(); // רענן סטטוס לאחר הפעולה
//         } catch (err: any) {
//             console.error('Failed to complete exercise:', err);
//             alert(`שגיאה בסיום תרגיל עבור ${traineeName}: ${err.response?.data?.message || err.message}`);
//         }
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white border border-gray-200 rounded-lg shadow-md p-5 relative"
//         >
//             <button
//                 onClick={() => onRemove(traineeId!)} // ודאי ש-traineeId קיים
//                 className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition-colors"
//                 title="הסר מתאמן מלוח המחוונים"
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//             </button>

//             <h2 className="text-xl font-bold text-gray-800 mb-3">{traineeName}</h2>

//             {isLoading ? (
//                 <div className="text-center text-gray-500">טוען...</div>
//             ) : error ? (
//                 <div className="text-red-500 text-sm">{error}</div>
//             ) : isWorkoutComplete ? (
//                 <div className="text-center text-green-600 font-semibold mt-4">האימון הושלם!</div>
//             ) : currentExercise ? (
//                 <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
//                     <h3 className="text-lg font-semibold text-blue-800 mb-1">
//                         תרגיל נוכחי: {getExerciseName(currentExercise.exerciseId)}
//                     </h3>
//                     <p className="text-gray-700 text-sm">
//                         סדר: {currentExercise.orderInList} מתוך {workoutData.exerciseIdsInPath ? Object.keys(workoutData.exerciseIdsInPath).length : '?'}
//                     </p>
//                     {currentExercise.exerciseDetails && (
//                         <>
//                             <p className="text-gray-700 text-sm">קטגוריה: {getCategoryName(currentExercise.exerciseDetails.categoryId)}</p>
//                             <p className="text-gray-700 text-sm">סטים: {currentExercise.exerciseDetails.planSets}</p>
//                             <p className="text-gray-700 text-sm">חזרות: {currentExercise.exerciseDetails.planRepetitionsMin} - {currentExercise.exerciseDetails.planRepetitionsMax}</p>
//                             {currentExercise.exerciseDetails.planWeight !== undefined && (
//                                 <p className="text-gray-700 text-sm">משקל: {currentExercise.exerciseDetails.planWeight} ק"ג</p>
//                             )}
//                             {currentExercise.exerciseDetails.timesMin !== undefined && currentExercise.exerciseDetails.timesMax !== undefined ? (
//                                 <p className="text-gray-700 text-sm">זמן משוער: {currentExercise.exerciseDetails.timesMin}-{currentExercise.exerciseDetails.timesMax} דקות</p>
//                             ) : currentExercise.exerciseDetails.timesMax !== undefined ? (
//                                 <p className="text-gray-700 text-sm">זמן מקסימלי: {currentExercise.exerciseDetails.timesMax} דקות</p>
//                             ) : currentExercise.exerciseDetails.timesMin !== undefined ? (
//                                 <p className="text-gray-700 text-sm">זמן מינימלי: {currentExercise.exerciseDetails.timesMin} דקות</p>
//                             ) : null}
//                         </>
//                     )}
//                     <div className="mt-3 flex gap-2">
//                         {/* בדוק אם startTime ריק או תאריך ברירת מחדל */}
//                         {!currentExercise.startTime || currentExercise.startTime === "0001-01-01T00:00:00" ? (
//                             <Button onClick={() => handleStartExercise(currentExercise.exerciseId)} className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1">
//                                 התחל
//                             </Button>
//                         ) : (
//                             <Button onClick={() => handleCompleteExercise(currentExercise.exerciseId)} className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-3 py-1">
//                                 סיים
//                             </Button>
//                         )}
//                     </div>
//                 </div>
//             ) : (
//                 <p className="text-gray-500 text-center mt-4">אין תרגיל פעיל כרגע.</p>
//             )}

//             <h3 className="text-md font-semibold text-gray-800 mt-5 mb-2">סטטוס תרגילים:</h3>
//             <div className="max-h-40 overflow-y-auto space-y-2 text-sm">
//                 {/* ודא ש-exerciseIdsInPath הוא אובייקט ולא מערך */}
//                 {workoutData.exerciseIdsInPath && Object.values(workoutData.exerciseIdsInPath)
//                     .sort((a, b) => (a as ExerciseEntry).orderInList - (b as ExerciseEntry).orderInList)
//                     .map((exercise, index) => {
//                         const ex = exercise as ExerciseEntry; // ודא שאתה מטפל בזה כ-ExerciseEntry
//                         return (
//                             <div
//                                 key={ex.exerciseId + '-' + index}
//                                 className={`flex items-center justify-between p-2 rounded-md ${
//                                     ex.isDone ? 'bg-green-100 text-green-800' :
//                                     (currentExercise && ex.exerciseId === currentExercise.exerciseId && ex.orderInList === currentExercise.orderInList) ? 'bg-blue-100 text-blue-800 font-medium' :
//                                     'bg-gray-50 text-gray-700'
//                                 }`}
//                             >
//                                 <span>{getExerciseName(ex.exerciseId)} (סדר: {ex.orderInList})</span>
//                                 {ex.isDone ? (
//                                     <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white">בוצע</span>
//                                 ) : (currentExercise && ex.exerciseId === currentExercise.exerciseId && ex.orderInList === currentExercise.orderInList) ? (
//                                     <span className="text-xs px-2 py-1 rounded-full bg-blue-500 text-white">נוכחי</span>
//                                 ) : (
//                                     <span className="text-xs px-2 py-1 rounded-full bg-gray-300 text-gray-800">ממתין</span>
//                                 )}
//                             </div>
//                         );
//                     })}
//             </div>
//         </motion.div>
//     );
// };

// export default TraineeWorkoutCard;

// src/components/TraineeWorkoutCard.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { PathResult, ExerciseEntry, NextExerciseResponse, Exercise, Category } from '../types';
import { activeWorkoutApi, exerciseApi, categoryApi } from '../lib/api';
import Button from './ui/Button';
import { motion } from 'framer-motion';

interface TraineeWorkoutCardProps {
    workoutData: PathResult; // הפעם ה-prop הוא PathResult
    // onRemove נשאר אם רוצים יכולת להסיר כרטיס ספציפי מהתצוגה,
    // אבל במודל החדש (כל המתאמנים מוצגים תמיד), אולי הוא מיותר. נשאיר אותו לבינתיים.
    onRemove: (traineeId: number) => void;
}

const TraineeWorkoutCard: React.FC<TraineeWorkoutCardProps> = ({ workoutData, onRemove }) => {
    // השתמש ב-workoutData מ-props ישירות, ללא state מקומי לרענון עצמי
    // const [workoutData, setWorkoutData] = useState<PathResult>(initialWorkoutData); // נמחק
    const [currentExercise, setCurrentExercise] = useState<ExerciseEntry | null>(null);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingStaticData, setIsLoadingStaticData] = useState(true); // לטעינת תרגילים/קטגוריות
    const [errorStaticData, setErrorStaticData] = useState<string | null>(null);

    // traineeId ו-traineeName מגיעים כעת מ-workoutData (שהוא PathResult)
    const traineeId = workoutData.trainee.traineeId;
    const traineeName = workoutData.trainee.traineeName || `מתאמן ID: ${traineeId}`;

    // helper functions (unchanged)
    const getExerciseName = (exerciseId: number | undefined) => {
        if (exerciseId === undefined) return 'תרגיל לא ידוע';
        return exercises.find(e => e.exerciseId === exerciseId)?.exerciseName || `תרגיל ${exerciseId}`;
    };

    const getCategoryName = (categoryId: number | undefined) => {
        if (categoryId === undefined) return 'קטגוריה לא ידועה';
        return categories.find(c => c.categoryId === categoryId)?.categoryName || `קטגוריה ${categoryId}`;
    };

    // טעינת נתוני תרגילים וקטגוריות (פעם אחת בלבד)
    useEffect(() => {
        const fetchExerciseAndCategoryData = async () => {
            try {
                const allExercises = await exerciseApi.getAll();
                setExercises(allExercises);
                const allCategories = await categoryApi.getAll();
                setCategories(allCategories);
            } catch (err: any) {
                console.error("Failed to load exercises/categories:", err);
                setErrorStaticData("שגיאה בטעינת נתוני תרגילים/קטגוריות.");
            } finally {
                setIsLoadingStaticData(false);
            }
        };
        fetchExerciseAndCategoryData();
    }, []);


    // עדכן את התרגיל הנוכחי כשאובייקט workoutData משתנה (מגיע מ-props)
    useEffect(() => {
        if (workoutData && !workoutData.isWorkoutComplete) {
            // צריך למצוא את התרגיל הנוכחי מתוך ה-workoutData.exerciseIdsInPath
            if (workoutData.exerciseIdsInPath) {
                // זה דורש לוגיקה שתמצא את התרגיל עם isDone: false וה-orderInList הנמוך ביותר
                const nextUncompletedExercise = Object.values(workoutData.exerciseIdsInPath)
                    .map(e => e as ExerciseEntry) // ודא טיפוס
                    .filter(e => !e.isDone)
                    .sort((a, b) => a.orderInList - b.orderInList)[0];

                setCurrentExercise(nextUncompletedExercise || null);
            } else {
                setCurrentExercise(null);
            }
        } else {
            setCurrentExercise(null);
        }
    }, [workoutData]);

    const handleStartExercise = async (exerciseId: number) => {
        if (traineeId === undefined || traineeId === null || !currentExercise) return;
        try {
            await activeWorkoutApi.startExercise(traineeId, exerciseId, new Date());
            alert(`מתאמן ${traineeName}: התרגיל התחיל!`);
            // לא קוראים ל-fetchWorkoutStatus, אלא מסתמכים על הפולר החיצוני
        } catch (err: any) {
            console.error('Failed to start exercise:', err);
            alert(`שגיאה בהתחלת תרגיל עבור ${traineeName}: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleCompleteExercise = async (exerciseId: number) => {
        if (traineeId === undefined || traineeId === null || !currentExercise) return;
        try {
            await activeWorkoutApi.completeExercise(traineeId, exerciseId, new Date());
            alert(`מתאמן ${traineeName}: התרגיל הסתיים!`);
            // לא קוראים ל-fetchWorkoutStatus, אלא מסתמכים על הפולר החיצוני
        } catch (err: any) {
            console.error('Failed to complete exercise:', err);
            alert(`שגיאה בסיום תרגיל עבור ${traineeName}: ${err.response?.data?.message || err.message}`);
        }
    };

    if (isLoadingStaticData) {
        return <div className="text-center text-gray-500">טוען נתוני עזר...</div>;
    }
    if (errorStaticData) {
        return <div className="text-red-500 text-sm">{errorStaticData}</div>;
    }


    return (
        <motion.div
            // אין צורך ב-initial/animate כאן כי הם כבר נעשים ברמת הדאשבורד
            className="bg-white border border-gray-200 rounded-lg shadow-md p-5 relative"
        >
            {/* כפתור הסרה (אם רלוונטי):
            <button
                onClick={() => onRemove(traineeId!)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition-colors"
                title="הסר מתאמן מלוח המחוונים"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            */}

            <h2 className="text-xl font-bold text-gray-800 mb-3">{traineeName}</h2>

            {workoutData.isWorkoutComplete ? (
                <div className="text-center text-green-600 font-semibold mt-4">האימון הושלם!</div>
            ) : currentExercise ? (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <h3 className="text-lg font-semibold text-blue-800 mb-1">
                        תרגיל נוכחי: {getExerciseName(currentExercise.exerciseId)}
                    </h3>
                    <p className="text-gray-700 text-sm">
                        סדר: {currentExercise.orderInList} מתוך {workoutData.exerciseIdsInPath ? Object.keys(workoutData.exerciseIdsInPath).length : '?'}
                    </p>
                    {currentExercise.exerciseDetails && (
                        <>
                            <p className="text-gray-700 text-sm">קטגוריה: {getCategoryName(currentExercise.exerciseDetails.categoryId)}</p>
                            <p className="text-gray-700 text-sm">סטים: {currentExercise.exerciseDetails.planSets}</p>
                            <p className="text-gray-700 text-sm">חזרות: {currentExercise.exerciseDetails.planRepetitionsMin} - {currentExercise.exerciseDetails.planRepetitionsMax}</p>
                            {currentExercise.exerciseDetails.planWeight !== undefined && (
                                <p className="text-gray-700 text-sm">משקל: {currentExercise.exerciseDetails.planWeight} ק"ג</p>
                            )}
                            {currentExercise.exerciseDetails.timesMin !== undefined && currentExercise.exerciseDetails.timesMax !== undefined ? (
                                <p className="text-gray-700 text-sm">זמן משוער: {currentExercise.exerciseDetails.timesMin}-{currentExercise.exerciseDetails.timesMax} דקות</p>
                            ) : currentExercise.exerciseDetails.timesMax !== undefined ? (
                                <p className="text-gray-700 text-sm">זמן מקסימלי: {currentExercise.exerciseDetails.timesMax} דקות</p>
                            ) : currentExercise.exerciseDetails.timesMin !== undefined ? (
                                <p className="text-gray-700 text-sm">זמן מינימלי: {currentExercise.exerciseDetails.timesMin} דקות</p>
                            ) : null}
                        </>
                    )}
                    <div className="mt-3 flex gap-2">
                        {!currentExercise.startTime || currentExercise.startTime === "0001-01-01T00:00:00" ? (
                            <Button onClick={() => handleStartExercise(currentExercise.exerciseId)} className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1">
                                התחל
                            </Button>
                        ) : (
                            <Button onClick={() => handleCompleteExercise(currentExercise.exerciseId)} className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-3 py-1">
                                סיים
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 text-center mt-4">אין תרגיל פעיל כרגע.</p>
            )}

            <h3 className="text-md font-semibold text-gray-800 mt-5 mb-2">סטטוס תרגילים:</h3>
            <div className="max-h-40 overflow-y-auto space-y-2 text-sm">
                {workoutData.exerciseIdsInPath && Object.values(workoutData.exerciseIdsInPath)
                    .sort((a, b) => (a as ExerciseEntry).orderInList - (b as ExerciseEntry).orderInList)
                    .map((exercise, index) => {
                        const ex = exercise as ExerciseEntry;
                        return (
                            <div
                                key={ex.exerciseId + '-' + index}
                                className={`flex items-center justify-between p-2 rounded-md ${
                                    ex.isDone ? 'bg-green-100 text-green-800' :
                                    (currentExercise && ex.exerciseId === currentExercise.exerciseId && ex.orderInList === currentExercise.orderInList) ? 'bg-blue-100 text-blue-800 font-medium' :
                                    'bg-gray-50 text-gray-700'
                                }`}
                            >
                                <span>{getExerciseName(ex.exerciseId)} (סדר: {ex.orderInList})</span>
                                {ex.isDone ? (
                                    <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white">בוצע</span>
                                ) : (currentExercise && ex.exerciseId === currentExercise.exerciseId && ex.orderInList === currentExercise.orderInList) ? (
                                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500 text-white">נוכחי</span>
                                ) : (
                                    <span className="text-xs px-2 py-1 rounded-full bg-gray-300 text-gray-800">ממתין</span>
                                )}
                            </div>
                        );
                    })}
            </div>
        </motion.div>
    );
};

export default TraineeWorkoutCard;