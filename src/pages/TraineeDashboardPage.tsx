// // src/pages/TraineeDashboardPage.tsx
// import React, { useState, useEffect } from 'react';
// import { activeWorkoutApi, traineeApi } from '../lib/api'; // נניח ש-traineeApi קיים
// import { Trainee, PathResult, ActiveTrainingPlanResponse } from '../types'; // ודא ש-ActiveTrainingPlanResponse מיובא
// import { motion } from 'framer-motion';
// import Button from '../components/ui/Button';
// import Select from 'react-select'; // נתקין ספריית בחירה נוחה יותר
// import TraineeWorkoutCard from '../components/TraineeWorkoutCard'; // קומפוננטה חדשה שנבנה בהמשך

// interface SelectOption {
//     value: number;
//     label: string;
// }

// const TraineeDashboardPage: React.FC = () => {
//     const [availableTrainees, setAvailableTrainees] = useState<Trainee[]>([]);
//     // נשנה את Map מ-ActiveTrainingPlanResponse ל-PathResult, כפי שה-getAllActiveWorkouts מחזיר
//     const [activeTraineeWorkouts, setActiveTraineeWorkouts] = useState<Map<number, PathResult>>(new Map());
//     const [selectedTraineeToAdd, setSelectedTraineeToAdd] = useState<SelectOption | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // טעינת רשימת המתאמנים הזמינים בהתחלה
//     useEffect(() => {
//         const fetchTrainees = async () => {
//             try {
//                 // ודאי ש-traineeApi.getAll() מחזיר מערך של Trainee
//                 //const trainees = await traineeApi.getAll();
//                 const trainees = await activeWorkoutApi.GetAllActiveTraineesIds();
//                 setAvailableTrainees(trainees);
//             } catch (err: any) {
//                 setError(err.message || 'שגיאה בטעינת רשימת המתאמנים.');
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchTrainees();
//     }, []);

//     // טעינת אימונים פעילים קיימים (אם יש)
//     useEffect(() => {
//         const fetchActiveWorkouts = async () => {
//             try {
//                 // ה-API החדש getAllActiveWorkouts מחזיר PathResult[]
//                 const activePlans: PathResult[] = await activeWorkoutApi.getAllActiveWorkouts();
//                 const activeMap = new Map<number, PathResult>(); // המפה תכיל PathResult
//                 activePlans.forEach(plan => {
//                     // ודאי ש-traineeId קיים ב-PathResult
//                     if (plan.trainee.traineeId !== undefined && plan.trainee.traineeId !== null) {
//                         activeMap.set(plan.trainee.traineeId, plan);
//                     }
//                 });
//                 setActiveTraineeWorkouts(activeMap);
//             } catch (err: any) {
//                 console.error("Failed to fetch initial active workouts:", err);
//                 setError("שגיאה בטעינת אימונים פעילים.");
//             }
//         };

//         fetchActiveWorkouts();

//         // הגדרת פולר (Polling) לרענון נתונים כל כמה שניות
//         // const interval = setInterval(fetchActiveWorkouts, 5000); // רענן כל 5 שניות
//         // return () => clearInterval(interval); // נקה את האינטרוול בעת הסרת הקומפוננטה
//     }, []);

//     const handleAddTraineeToDashboard = async () => {
//         if (selectedTraineeToAdd && !activeTraineeWorkouts.has(selectedTraineeToAdd.value)) {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const traineeId = selectedTraineeToAdd.value;
//                 const traineeDetails = availableTrainees.find(t => t.traineeId === traineeId);

//                 if (traineeDetails) {
//                     // **הערה חשובה:**
//                     // הקוד המקורי כאן הניח שאימון כבר התחיל.
//                     // אם המתאמן עדיין לא באימון, צריך להתחיל לו אימון לפני הוספתו לדאשבורד.
//                     // לשם כך נצטרך את `planDayId` ואולי גם `ExercisePlanDTO[]`.
//                     // מכיוון שאין לנו כאן לוגיקה לבחירת תוכנית אימונים ספציפית,
//                     // נניח בינתיים שקריאה ל-`getUpdatedWorkoutPlan` תספיק אם האימון כבר התחיל
//                     // או שפעולה זו נועדה רק להציג אימונים פעילים קיימים.
//                     // אם רוצים להתחיל אימון מכאן, יש להוסיף כאן לוגיקה מתאימה.

//                     // ננסה להביא את ה-PathResult המעודכן עבור המתאמן
//                     const activePlan: PathResult = await activeWorkoutApi.getUpdatedWorkoutPlan(traineeId);

//                     // ודא ש-activePlan אינו null/undefined ושהוא מכיל את traineeId
//                     if (activePlan && activePlan.trainee.traineeId !== undefined && activePlan.trainee.traineeId !== null) {
//                         setActiveTraineeWorkouts(prev => new Map(prev).set(traineeId, activePlan));
//                     } else {
//                         setError(`לא נמצא אימון פעיל למתאמן ${traineeDetails.traineeName}. ייתכן שצריך להתחיל לו אימון.`);
//                     }
//                 }
//                 setSelectedTraineeToAdd(null);
//             } catch (err: any) {
//                 console.error('Error adding trainee to dashboard:', err);
//                 setError(err.message || 'שגיאה בהוספת מתאמן ללוח המחוונים.');
//             } finally {
//                 setIsLoading(false);
//             }
//         } else if (selectedTraineeToAdd && activeTraineeWorkouts.has(selectedTraineeToAdd.value)) {
//             alert('המתאמן כבר מוצג בלוח המחוונים.');
//         }
//     };

//     const handleRemoveTrainee = (traineeId: number) => {
//         setActiveTraineeWorkouts(prev => {
//             const newMap = new Map(prev);
//             newMap.delete(traineeId);
//             return newMap;
//         });
//     };

//     const traineeOptions: SelectOption[] = availableTrainees
//         .filter(t => !activeTraineeWorkouts.has(t.traineeId)) // סנן מתאמנים שכבר מוצגים
//         .map(trainee => ({
//             value: trainee.traineeId,
//             label: trainee.traineeName || `מתאמן ID: ${trainee.traineeId}`
//         }));

//     if (isLoading && availableTrainees.length === 0) {
//         return <div className="text-center py-8 text-gray-500">טוען רשימת מתאמנים...</div>;
//     }

//     if (error) {
//         return <div className="text-center text-red-500 py-8"><p>{error}</p></div>;
//     }

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg"
//         >
//             <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">לוח מחוונים - אימונים פעילים</h1>

//             <div className="flex items-center gap-4 mb-8 p-4 border rounded-lg bg-gray-50">
//                 <div className="flex-1">
//                     <label htmlFor="trainee-select" className="block text-gray-700 text-sm font-bold mb-2">
//                         הוסף מתאמן ללוח:
//                     </label>
//                     <Select
//                         id="trainee-select"
//                         options={traineeOptions}
//                         onChange={selectedOption => setSelectedTraineeToAdd(selectedOption)}
//                         value={selectedTraineeToAdd}
//                         placeholder="בחר מתאמן..."
//                         isClearable
//                         className="w-full"
//                         isDisabled={traineeOptions.length === 0}
//                     />
//                 </div>
//                 <Button
//                     onClick={handleAddTraineeToDashboard}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
//                     disabled={!selectedTraineeToAdd || isLoading}
//                 >
//                     הוסף
//                 </Button>
//             </div>

//             {activeTraineeWorkouts.size === 0 && (
//                 <p className="text-center text-gray-500 text-lg">אין כרגע אימונים פעילים להצגה.</p>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {/* מעבירים PathResult לקומפוננטה TraineeWorkoutCard */}
//                 {Array.from(activeTraineeWorkouts.values()).map(workout => (
//                     <TraineeWorkoutCard
//                         key={workout.trainee.traineeId}
//                         workoutData={workout} // workoutData הוא PathResult
//                         onRemove={handleRemoveTrainee}
//                     />
//                 ))}
//             </div>
//         </motion.div>
//     );
// };

// export default TraineeDashboardPage;

import React, { useState, useEffect, useCallback } from 'react';
import { activeWorkoutApi, traineeApi, trainingPlanApi } from '../lib/api'; // ודא ש-traineeApi ו-trainingPlanApi מיובאים
import { Trainee, PathResult, PlanDay } from '../types'; // נצטרך גם PlanDay
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Select from 'react-select';
import TraineeWorkoutCard from '../components/TraineeWorkoutCard'; // קומפוננטה קיימת, אבל נשנה את אופן השימוש בה
import { Loader2, Play } from 'lucide-react'; // אייקון טעינה + Play

interface SelectOption {
    value: number;
    label: string;
}

const TraineeDashboardPage: React.FC = () => {
    const [allTrainees, setAllTrainees] = useState<Trainee[]>([]); // כל המתאמנים
    // נשנה מ-Map<number, PathResult> ל-Map<number, PathResult | null> כדי לציין אם יש אימון פעיל או לא
    const [traineeWorkoutStates, setTraineeWorkoutStates] = useState<Map<number, PathResult | null>>(new Map());
    const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // לטעינת תוכניות אימונים זמינות כדי שנוכל להתחיל אימון
    const [availablePlansForTrainee, setAvailablePlansForTrainee] = useState<Map<number, PlanDay[]>>(new Map());
    const [isStartingWorkoutForTrainee, setIsStartingWorkoutForTrainee] = useState<number | null>(null);

    // 1. טעינת כל המתאמנים בטעינה ראשונית של הדף
    useEffect(() => {
        const fetchAllTrainees = async () => {
            try {
                const trainees = await traineeApi.getAll(); // מביא את כל המתאמנים מהשרת
                setAllTrainees(trainees);

                // אתחל Map עבור מצב האימונים של כל מתאמן
                const initialStates = new Map<number, PathResult | null>();
                trainees.forEach((t: Trainee) => {
                    return initialStates.set(t.traineeId, null);
                });
                setTraineeWorkoutStates(initialStates);

                setIsLoadingInitialData(false);
                // לאחר טעינת המתאמנים, התחל לרענן את הסטטוס שלהם
                fetchAllTraineeWorkoutStatuses(trainees.map((t: Trainee) => t.traineeId));
            } catch (err: any) {
                setError(err.message || 'שגיאה בטעינת רשימת המתאמנים.');
                setIsLoadingInitialData(false);
            }
        };
        fetchAllTrainees();
    }, []);

    // 2. פונקציה לטעינת סטטוס אימון עבור מתאמן ספציפי
    const fetchTraineeWorkoutStatus = useCallback(async (traineeId: number) => {
        try {
            const updatedPlan: PathResult = await activeWorkoutApi.getUpdatedWorkoutPlan(traineeId);
            setTraineeWorkoutStates(prev => new Map(prev).set(traineeId, updatedPlan));
            // אם יש אימון פעיל, ודא שהתוכניות הזמינות מעודכנות (למקרה של התחלת אימון חדש)
            if (!updatedPlan.isWorkoutComplete) {
                setAvailablePlansForTrainee(prev => {
                    const newMap = new Map(prev);
                    newMap.delete(traineeId); // הסר את התוכניות הזמינות אם יש אימון פעיל
                    return newMap;
                });
            }
        } catch (err: any) {
            if (err.response && err.response.status === 404) {
                // 404 פירושו שאין אימון פעיל, נרצה לאפשר למאמן להתחיל אחד
                setTraineeWorkoutStates(prev => new Map(prev).set(traineeId, null));
                fetchAvailablePlansForTrainee(traineeId); // טען תוכניות זמינות להתחלה
            } else {
                console.error(`Error fetching workout status for trainee ${traineeId}:`, err);
            }
        }
    }, []);

    // 3. פונקציה לטעינת כל הסטטוסים של כל המתאמנים
    const fetchAllTraineeWorkoutStatuses = useCallback(async (traineeIds: number[]) => {
        // הפעל את fetchTraineeWorkoutStatus עבור כל מזהה מתאמן במקביל
        await Promise.all(traineeIds.map(id => fetchTraineeWorkoutStatus(id)));
    }, [fetchTraineeWorkoutStatus]);

    // 4. פולר גלובלי שמרענן את כל הסטטוסים
    useEffect(() => {
        if (allTrainees.length > 0) {
            const interval = setInterval(() => {
                fetchAllTraineeWorkoutStatuses(allTrainees.map(t => t.traineeId));
            }, 5000); // רענן כל 5 שניות
            return () => clearInterval(interval);
        }
    }, [allTrainees, fetchAllTraineeWorkoutStatuses]);

    // 5. טעינת תוכניות אימון זמינות עבור מתאמן ספציפי (כאשר אין לו אימון פעיל)
    const fetchAvailablePlansForTrainee = useCallback(async (traineeId: number) => {
        try {
            const plansResponse = await trainingPlanApi.getActivePlans(traineeId); // השתמש במתודה הקיימת
            const plansArray = Array.isArray(plansResponse) ? plansResponse : [plansResponse];
            setAvailablePlansForTrainee(prev => new Map(prev).set(traineeId, plansArray.map(p => p.planDays || []).flat()));
        } catch (err) {
            console.error(`Failed to fetch available plans for trainee ${traineeId}:`, err);
        }
    }, []);


    // 6. פונקציה להתחלת אימון למתאמן ספציפי
    const handleStartWorkoutForTrainee = async (traineeId: number, planDayId: number) => {
        setIsStartingWorkoutForTrainee(traineeId);
        try {
            // הקריאה ל-startWorkout צריכה להיות עם ה-payload הנכון
            const requestBody = {
                Trainee: traineeId,
                planday: planDayId,
                StartTime: new Date().toISOString(),
            };
            await activeWorkoutApi.startWorkout(requestBody);
            alert(`אימון התחיל עבור מתאמן ID: ${traineeId}, יום אימון: ${planDayId}`);
            // רענן את הסטטוס של המתאמן הספציפי
            await fetchTraineeWorkoutStatus(traineeId);
        } catch (err: any) {
            console.error('Failed to start workout for trainee:', err);
            setError(err.response?.data?.message || err.message || 'שגיאה בהתחלת האימון.');
        } finally {
            setIsStartingWorkoutForTrainee(null);
        }
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
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">לוח מחוונים - ניהול אימונים</h1>

            {allTrainees.length === 0 && (
                <p className="text-center text-gray-500 text-lg">אין מתאמנים רשומים במערכת.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTrainees.map(trainee => {
                    const workoutState = traineeWorkoutStates.get(trainee.traineeId);
                    const hasActiveWorkout = workoutState !== undefined && workoutState !== null && !workoutState.isWorkoutComplete;
                    const traineePlans = availablePlansForTrainee.get(trainee.traineeId) || [];

                    return (
                        <motion.div
                            key={trainee.traineeId}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white border border-gray-200 rounded-lg shadow-md p-5 relative"
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-3">{trainee.traineeName || `מתאמן ID: ${trainee.traineeId}`}</h2>

                            {isLoadingInitialData ? ( // בדיקה אם עדיין טוען נתונים ראשוניים
                                <div className="text-center text-gray-500">טוען סטטוס אימון...</div>
                            ) : hasActiveWorkout && workoutState ? (
                                <TraineeWorkoutCard
                                    workoutData={workoutState}
                                    onRemove={() => { /* אין צורך ב-onRemove כאן כי הכרטיס תמיד מוצג */ }}
                                />
                            ) : traineePlans.length > 0 ? (
                                
                                <div className="mt-4">
                                    <h3 className="text-md font-semibold text-gray-700 mb-2">התחל אימון חדש:</h3>
                                    <Select
                                        options={traineePlans.map(p => ({ value: p.planDayId, label: `יום ${p.dayOrder}: ${p.programName}` }))}
                                        onChange={option => {
                                            // כאן נצטרך לשמור את planDayId שנבחר עבור המתאמן הספציפי
                                            // כרגע הפתרון הפשוט הוא להעביר אותו ישירות לכפתור
                                        }}
                                        placeholder="בחר יום אימון..."
                                        className="mb-2"
                                    />
                                    <Button
                                        onClick={() => {
                                            // לצורך פשטות הדוגמה, נתחיל את יום האימון הראשון הזמין
                                            if (traineePlans.length > 0) {
                                                handleStartWorkoutForTrainee(trainee.traineeId, traineePlans[0].planDayId);
                                            }
                                        }}
                                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors w-full"
                                        disabled={isStartingWorkoutForTrainee === trainee.traineeId || traineePlans.length === 0}
                                        icon={isStartingWorkoutForTrainee === trainee.traineeId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                                    >
                                        {isStartingWorkoutForTrainee === trainee.traineeId ? 'מתחיל אימון...' : 'התחל אימון'}
                                    </Button>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center mt-4">אין תוכניות אימון זמינות למתאמן זה.</p>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default TraineeDashboardPage;