
// src/components/TraineeWorkoutCard.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { PathResult, ExerciseEntry, NextExerciseResponse, Exercise, Category, ExercisePlan } from '../types';
import { activeWorkoutApi, exerciseApi, categoryApi } from '../lib/api';
import Button from './ui/Button';
import { motion } from 'framer-motion';
import { CircleDotDashed } from 'lucide-react';
import { useWorkoutRefresh } from '../context/WorkoutRefreshContext'; // ייבוא ה-Hook החדש

interface TraineeWorkoutCardProps {
    workoutData: PathResult;
    onRemove: (traineeId: number) => void;
}

const TraineeWorkoutCard: React.FC<TraineeWorkoutCardProps> = ({ workoutData, onRemove }) => {
    const [currentExercise, setCurrentExercise] = useState<ExerciseEntry | null>(null);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingStaticData, setIsLoadingStaticData] = useState(true);
    const [errorStaticData, setErrorStaticData] = useState<string | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    // השתמש ב-Hook החדש כדי לקבל גישה ל-triggerRefresh
    const { triggerRefresh } = useWorkoutRefresh(); 

    const traineeId = workoutData.trainee.traineeId;
    const traineeName = workoutData.trainee.traineeName || `מתאמן ID: ${traineeId}`;

    const getExerciseName = (exerciseId: number | undefined) => {
        if (exerciseId === undefined) return 'תרגיל לא ידוע';
        return exercises.find(e => e.exerciseId === exerciseId)?.exerciseName || `תרגיל ${exerciseId}`;
    };

    const getCategoryName = (categoryId: number | undefined) => {
        if (categoryId === undefined) return 'קטגוריה לא ידועה';
        return categories.find(c => c.categoryId === categoryId)?.categoryName || `קטגוריה ${categoryId}`;
    };

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

    useEffect(() => {
        if (workoutData && !workoutData.isWorkoutComplete) {
            if (workoutData.exerciseIdsInPath) {
                const nextUncompletedExercise = Object.values(workoutData.exerciseIdsInPath)
                    .map(e => e as ExerciseEntry)
                    .filter(e => !e.isDone)
                    .sort((a, b) => a.orderInList - b.orderInList)[0];

                setCurrentExercise(nextUncompletedExercise || null);
            } else {
                setCurrentExercise(null);
            }
        } else {
            setCurrentExercise(null);
        }
        setIsButtonDisabled(false); 
    }, [workoutData]);

    const handleStartExercise = async (exerciseId: number) => {
        if (traineeId === undefined || traineeId === null || !currentExercise || isButtonDisabled) return; 
        
        setIsButtonDisabled(true); 
        try {
            await activeWorkoutApi.startExercise(traineeId, exerciseId, new Date());
            //alert(`מתאמן ${traineeName}: התרגיל התחיל!`);
            // **חדש: הפעל טריגר רענון גלובלי**
            triggerRefresh(); 
        } catch (err: any) {
            console.error('Failed to start exercise:', err);
            alert(`שגיאה בהתחלת תרגיל עבור ${traineeName}: ${err.response?.data?.message || err.message}`);
        } finally {
            setIsButtonDisabled(false); // שחרר תמיד, בין אם הצליח ובין אם נכשל
        }
    };

    const handleCompleteExercise = async (exerciseId: number) => {
        if (traineeId === undefined || traineeId === null || !currentExercise || isButtonDisabled) return; 

        setIsButtonDisabled(true); 
        try {
            await activeWorkoutApi.completeExercise(traineeId, exerciseId, new Date());
           // alert(`מתאמן ${traineeName}: התרגיל הסתיים!`);
            // **חדש: הפעל טריגר רענון גלובלי**
            triggerRefresh(); 
        } catch (err: any) {
            console.error('Failed to complete exercise:', err);
            alert(`שגיאה בסיום תרגיל עבור ${traineeName}: ${err.response?.data?.message || err.message}`);
        } finally {
            setIsButtonDisabled(false); // שחרר תמיד, בין אם הצליח ובין אם נכשל
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
            className="bg-white border border-gray-200 rounded-lg shadow-md p-5 relative"
        >
            <h2 className="text-xl font-bold text-gray-800 mb-3">{traineeName}</h2>

            {workoutData.isWorkoutComplete ? (
                <div className="text-center text-pink-600 font-semibold mt-4">האימון הושלם!</div>
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
                            <Button
                                onClick={() => handleStartExercise(currentExercise.exerciseId)}
                                className="bg-pink-500 hover:bg-pink-600 text-white text-xs px-3 py-1"
                                disabled={isButtonDisabled}
                            >
                                התחל
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handleCompleteExercise(currentExercise.exerciseId)}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs px-3 py-1"
                                disabled={isButtonDisabled}
                            >
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
                                <span><strong className="font-semibold">{getExerciseName(ex.exerciseId)}</strong> (סדר: {ex.orderInList})</span>
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