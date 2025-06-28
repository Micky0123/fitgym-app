// // // // // // // // src/pages/TraineeDashboardPage.tsx
// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import { activeWorkoutApi, traineeApi } from '../lib/api'; // נניח ש-traineeApi קיים
// // // // // // // import { Trainee, PathResult, ActiveTrainingPlanResponse } from '../types'; // ודא ש-ActiveTrainingPlanResponse מיובא
// // // // // // // import { motion } from 'framer-motion';
// // // // // // // import Button from '../components/ui/Button';
// // // // // // // import Select from 'react-select'; // נתקין ספריית בחירה נוחה יותר
// // // // // // // import TraineeWorkoutCard from '../components/TraineeWorkoutCard'; // קומפוננטה חדשה שנבנה בהמשך

// // // // // // // interface SelectOption {
// // // // // // //     value: number;
// // // // // // //     label: string;
// // // // // // // }

// // // // // // // const TraineeDashboardPage: React.FC = () => {
// // // // // // //     const [availableTrainees, setAvailableTrainees] = useState<Trainee[]>([]);
// // // // // // //     // נשנה את Map מ-ActiveTrainingPlanResponse ל-PathResult, כפי שה-getAllActiveWorkouts מחזיר
// // // // // // //     const [activeTraineeWorkouts, setActiveTraineeWorkouts] = useState<Map<number, PathResult>>(new Map());
// // // // // // //     const [selectedTraineeToAdd, setSelectedTraineeToAdd] = useState<SelectOption | null>(null);
// // // // // // //     const [isLoading, setIsLoading] = useState(true);
// // // // // // //     const [error, setError] = useState<string | null>(null);

// // // // // // //     // טעינת רשימת המתאמנים הזמינים בהתחלה
// // // // // // //     useEffect(() => {
// // // // // // //         const fetchTrainees = async () => {
// // // // // // //             try {
// // // // // // //                 // ודאי ש-traineeApi.getAll() מחזיר מערך של Trainee
// // // // // // //                 //const trainees = await traineeApi.getAll();
// // // // // // //                 const trainees = await activeWorkoutApi.GetAllActiveTraineesIds();
// // // // // // //                 setAvailableTrainees(trainees);
// // // // // // //             } catch (err: any) {
// // // // // // //                 setError(err.message || 'שגיאה בטעינת רשימת המתאמנים.');
// // // // // // //             } finally {
// // // // // // //                 setIsLoading(false);
// // // // // // //             }
// // // // // // //         };
// // // // // // //         fetchTrainees();
// // // // // // //     }, []);

// // // // // // //     // טעינת אימונים פעילים קיימים (אם יש)
// // // // // // //     useEffect(() => {
// // // // // // //         const fetchActiveWorkouts = async () => {
// // // // // // //             try {
// // // // // // //                 // ה-API החדש getAllActiveWorkouts מחזיר PathResult[]
// // // // // // //                 const activePlans: PathResult[] = await activeWorkoutApi.getAllActiveWorkouts();
// // // // // // //                 const activeMap = new Map<number, PathResult>(); // המפה תכיל PathResult
// // // // // // //                 activePlans.forEach(plan => {
// // // // // // //                     // ודאי ש-traineeId קיים ב-PathResult
// // // // // // //                     if (plan.trainee.traineeId !== undefined && plan.trainee.traineeId !== null) {
// // // // // // //                         activeMap.set(plan.trainee.traineeId, plan);
// // // // // // //                     }
// // // // // // //                 });
// // // // // // //                 setActiveTraineeWorkouts(activeMap);
// // // // // // //             } catch (err: any) {
// // // // // // //                 console.error("Failed to fetch initial active workouts:", err);
// // // // // // //                 setError("שגיאה בטעינת אימונים פעילים.");
// // // // // // //             }
// // // // // // //         };

// // // // // // //         fetchActiveWorkouts();

// // // // // // //         // הגדרת פולר (Polling) לרענון נתונים כל כמה שניות
// // // // // // //         // const interval = setInterval(fetchActiveWorkouts, 5000); // רענן כל 5 שניות
// // // // // // //         // return () => clearInterval(interval); // נקה את האינטרוול בעת הסרת הקומפוננטה
// // // // // // //     }, []);

// // // // // // //     const handleAddTraineeToDashboard = async () => {
// // // // // // //         if (selectedTraineeToAdd && !activeTraineeWorkouts.has(selectedTraineeToAdd.value)) {
// // // // // // //             setIsLoading(true);
// // // // // // //             setError(null);
// // // // // // //             try {
// // // // // // //                 const traineeId = selectedTraineeToAdd.value;
// // // // // // //                 const traineeDetails = availableTrainees.find(t => t.traineeId === traineeId);

// // // // // // //                 if (traineeDetails) {
// // // // // // //                     // **הערה חשובה:**
// // // // // // //                     // הקוד המקורי כאן הניח שאימון כבר התחיל.
// // // // // // //                     // אם המתאמן עדיין לא באימון, צריך להתחיל לו אימון לפני הוספתו לדאשבורד.
// // // // // // //                     // לשם כך נצטרך את `planDayId` ואולי גם `ExercisePlanDTO[]`.
// // // // // // //                     // מכיוון שאין לנו כאן לוגיקה לבחירת תוכנית אימונים ספציפית,
// // // // // // //                     // נניח בינתיים שקריאה ל-`getUpdatedWorkoutPlan` תספיק אם האימון כבר התחיל
// // // // // // //                     // או שפעולה זו נועדה רק להציג אימונים פעילים קיימים.
// // // // // // //                     // אם רוצים להתחיל אימון מכאן, יש להוסיף כאן לוגיקה מתאימה.

// // // // // // //                     // ננסה להביא את ה-PathResult המעודכן עבור המתאמן
// // // // // // //                     const activePlan: PathResult = await activeWorkoutApi.getUpdatedWorkoutPlan(traineeId);

// // // // // // //                     // ודא ש-activePlan אינו null/undefined ושהוא מכיל את traineeId
// // // // // // //                     if (activePlan && activePlan.trainee.traineeId !== undefined && activePlan.trainee.traineeId !== null) {
// // // // // // //                         setActiveTraineeWorkouts(prev => new Map(prev).set(traineeId, activePlan));
// // // // // // //                     } else {
// // // // // // //                         setError(`לא נמצא אימון פעיל למתאמן ${traineeDetails.traineeName}. ייתכן שצריך להתחיל לו אימון.`);
// // // // // // //                     }
// // // // // // //                 }
// // // // // // //                 setSelectedTraineeToAdd(null);
// // // // // // //             } catch (err: any) {
// // // // // // //                 console.error('Error adding trainee to dashboard:', err);
// // // // // // //                 setError(err.message || 'שגיאה בהוספת מתאמן ללוח המחוונים.');
// // // // // // //             } finally {
// // // // // // //                 setIsLoading(false);
// // // // // // //             }
// // // // // // //         } else if (selectedTraineeToAdd && activeTraineeWorkouts.has(selectedTraineeToAdd.value)) {
// // // // // // //             alert('המתאמן כבר מוצג בלוח המחוונים.');
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const handleRemoveTrainee = (traineeId: number) => {
// // // // // // //         setActiveTraineeWorkouts(prev => {
// // // // // // //             const newMap = new Map(prev);
// // // // // // //             newMap.delete(traineeId);
// // // // // // //             return newMap;
// // // // // // //         });
// // // // // // //     };

// // // // // // //     const traineeOptions: SelectOption[] = availableTrainees
// // // // // // //         .filter(t => !activeTraineeWorkouts.has(t.traineeId)) // סנן מתאמנים שכבר מוצגים
// // // // // // //         .map(trainee => ({
// // // // // // //             value: trainee.traineeId,
// // // // // // //             label: trainee.traineeName || `מתאמן ID: ${trainee.traineeId}`
// // // // // // //         }));

// // // // // // //     if (isLoading && availableTrainees.length === 0) {
// // // // // // //         return <div className="text-center py-8 text-gray-500">טוען רשימת מתאמנים...</div>;
// // // // // // //     }

// // // // // // //     if (error) {
// // // // // // //         return <div className="text-center text-red-500 py-8"><p>{error}</p></div>;
// // // // // // //     }

// // // // // // //     return (
// // // // // // //         <motion.div
// // // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // // //             transition={{ duration: 0.5 }}
// // // // // // //             className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg"
// // // // // // //         >
// // // // // // //             <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">לוח מחוונים - אימונים פעילים</h1>

// // // // // // //             <div className="flex items-center gap-4 mb-8 p-4 border rounded-lg bg-gray-50">
// // // // // // //                 <div className="flex-1">
// // // // // // //                     <label htmlFor="trainee-select" className="block text-gray-700 text-sm font-bold mb-2">
// // // // // // //                         הוסף מתאמן ללוח:
// // // // // // //                     </label>
// // // // // // //                     <Select
// // // // // // //                         id="trainee-select"
// // // // // // //                         options={traineeOptions}
// // // // // // //                         onChange={selectedOption => setSelectedTraineeToAdd(selectedOption)}
// // // // // // //                         value={selectedTraineeToAdd}
// // // // // // //                         placeholder="בחר מתאמן..."
// // // // // // //                         isClearable
// // // // // // //                         className="w-full"
// // // // // // //                         isDisabled={traineeOptions.length === 0}
// // // // // // //                     />
// // // // // // //                 </div>
// // // // // // //                 <Button
// // // // // // //                     onClick={handleAddTraineeToDashboard}
// // // // // // //                     className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
// // // // // // //                     disabled={!selectedTraineeToAdd || isLoading}
// // // // // // //                 >
// // // // // // //                     הוסף
// // // // // // //                 </Button>
// // // // // // //             </div>

// // // // // // //             {activeTraineeWorkouts.size === 0 && (
// // // // // // //                 <p className="text-center text-gray-500 text-lg">אין כרגע אימונים פעילים להצגה.</p>
// // // // // // //             )}

// // // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // // //                 {/* מעבירים PathResult לקומפוננטה TraineeWorkoutCard */}
// // // // // // //                 {Array.from(activeTraineeWorkouts.values()).map(workout => (
// // // // // // //                     <TraineeWorkoutCard
// // // // // // //                         key={workout.trainee.traineeId}
// // // // // // //                         workoutData={workout} // workoutData הוא PathResult
// // // // // // //                         onRemove={handleRemoveTrainee}
// // // // // // //                     />
// // // // // // //                 ))}
// // // // // // //             </div>
// // // // // // //         </motion.div>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default TraineeDashboardPage;

// // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // import { activeWorkoutApi, traineeApi, trainingPlanApi } from '../lib/api'; // ודא ש-traineeApi ו-trainingPlanApi מיובאים
// // // // // // import { Trainee, PathResult, PlanDay } from '../types'; // נצטרך גם PlanDay
// // // // // // import { motion } from 'framer-motion';
// // // // // // import Button from '../components/ui/Button';
// // // // // // import Select from 'react-select';
// // // // // // import TraineeWorkoutCard from '../components/TraineeWorkoutCard'; // קומפוננטה קיימת, אבל נשנה את אופן השימוש בה
// // // // // // import { Loader2, Play } from 'lucide-react'; // אייקון טעינה + Play

// // // // // // interface SelectOption {
// // // // // //     value: number;
// // // // // //     label: string;
// // // // // // }

// // // // // // const TraineeDashboardPage: React.FC = () => {
// // // // // //     const [allTrainees, setAllTrainees] = useState<Trainee[]>([]); // כל המתאמנים
// // // // // //     // נשנה מ-Map<number, PathResult> ל-Map<number, PathResult | null> כדי לציין אם יש אימון פעיל או לא
// // // // // //     const [traineeWorkoutStates, setTraineeWorkoutStates] = useState<Map<number, PathResult | null>>(new Map());
// // // // // //     const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
// // // // // //     const [error, setError] = useState<string | null>(null);

// // // // // //     // לטעינת תוכניות אימונים זמינות כדי שנוכל להתחיל אימון
// // // // // //     const [availablePlansForTrainee, setAvailablePlansForTrainee] = useState<Map<number, PlanDay[]>>(new Map());
// // // // // //     const [isStartingWorkoutForTrainee, setIsStartingWorkoutForTrainee] = useState<number | null>(null);

// // // // // //     // 1. טעינת כל המתאמנים בטעינה ראשונית של הדף
// // // // // //     useEffect(() => {
// // // // // //         const fetchAllTrainees = async () => {
// // // // // //             try {
// // // // // //                 const trainees = await traineeApi.getAll(); // מביא את כל המתאמנים מהשרת
// // // // // //                 setAllTrainees(trainees);

// // // // // //                 // אתחל Map עבור מצב האימונים של כל מתאמן
// // // // // //                 const initialStates = new Map<number, PathResult | null>();
// // // // // //                 trainees.forEach((t: Trainee) => {
// // // // // //                     return initialStates.set(t.traineeId, null);
// // // // // //                 });
// // // // // //                 setTraineeWorkoutStates(initialStates);

// // // // // //                 setIsLoadingInitialData(false);
// // // // // //                 // לאחר טעינת המתאמנים, התחל לרענן את הסטטוס שלהם
// // // // // //                 fetchAllTraineeWorkoutStatuses(trainees.map((t: Trainee) => t.traineeId));
// // // // // //             } catch (err: any) {
// // // // // //                 setError(err.message || 'שגיאה בטעינת רשימת המתאמנים.');
// // // // // //                 setIsLoadingInitialData(false);
// // // // // //             }
// // // // // //         };
// // // // // //         fetchAllTrainees();
// // // // // //     }, []);

// // // // // //     // 2. פונקציה לטעינת סטטוס אימון עבור מתאמן ספציפי
// // // // // //     const fetchTraineeWorkoutStatus = useCallback(async (traineeId: number) => {
// // // // // //         try {
// // // // // //             const updatedPlan: PathResult = await activeWorkoutApi.getUpdatedWorkoutPlan(traineeId);
// // // // // //             setTraineeWorkoutStates(prev => new Map(prev).set(traineeId, updatedPlan));
// // // // // //             // אם יש אימון פעיל, ודא שהתוכניות הזמינות מעודכנות (למקרה של התחלת אימון חדש)
// // // // // //             if (!updatedPlan.isWorkoutComplete) {
// // // // // //                 setAvailablePlansForTrainee(prev => {
// // // // // //                     const newMap = new Map(prev);
// // // // // //                     newMap.delete(traineeId); // הסר את התוכניות הזמינות אם יש אימון פעיל
// // // // // //                     return newMap;
// // // // // //                 });
// // // // // //             }
// // // // // //         } catch (err: any) {
// // // // // //             if (err.response && err.response.status === 404) {
// // // // // //                 // 404 פירושו שאין אימון פעיל, נרצה לאפשר למאמן להתחיל אחד
// // // // // //                 setTraineeWorkoutStates(prev => new Map(prev).set(traineeId, null));
// // // // // //                 fetchAvailablePlansForTrainee(traineeId); // טען תוכניות זמינות להתחלה
// // // // // //             } else {
// // // // // //                 console.error(`Error fetching workout status for trainee ${traineeId}:`, err);
// // // // // //             }
// // // // // //         }
// // // // // //     }, []);

// // // // // //     // 3. פונקציה לטעינת כל הסטטוסים של כל המתאמנים
// // // // // //     const fetchAllTraineeWorkoutStatuses = useCallback(async (traineeIds: number[]) => {
// // // // // //         // הפעל את fetchTraineeWorkoutStatus עבור כל מזהה מתאמן במקביל
// // // // // //         await Promise.all(traineeIds.map(id => fetchTraineeWorkoutStatus(id)));
// // // // // //     }, [fetchTraineeWorkoutStatus]);

// // // // // //     // 4. פולר גלובלי שמרענן את כל הסטטוסים
// // // // // //     useEffect(() => {
// // // // // //         if (allTrainees.length > 0) {
// // // // // //             const interval = setInterval(() => {
// // // // // //                 fetchAllTraineeWorkoutStatuses(allTrainees.map(t => t.traineeId));
// // // // // //             }, 5000); // רענן כל 5 שניות
// // // // // //             return () => clearInterval(interval);
// // // // // //         }
// // // // // //     }, [allTrainees, fetchAllTraineeWorkoutStatuses]);

// // // // // //     // 5. טעינת תוכניות אימון זמינות עבור מתאמן ספציפי (כאשר אין לו אימון פעיל)
// // // // // //     const fetchAvailablePlansForTrainee = useCallback(async (traineeId: number) => {
// // // // // //         try {
// // // // // //             const plansResponse = await trainingPlanApi.getActivePlans(traineeId); // השתמש במתודה הקיימת
// // // // // //             const plansArray = Array.isArray(plansResponse) ? plansResponse : [plansResponse];
// // // // // //             setAvailablePlansForTrainee(prev => new Map(prev).set(traineeId, plansArray.map(p => p.planDays || []).flat()));
// // // // // //         } catch (err) {
// // // // // //             console.error(`Failed to fetch available plans for trainee ${traineeId}:`, err);
// // // // // //         }
// // // // // //     }, []);


// // // // // //     // 6. פונקציה להתחלת אימון למתאמן ספציפי
// // // // // //     const handleStartWorkoutForTrainee = async (traineeId: number, planDayId: number) => {
// // // // // //         setIsStartingWorkoutForTrainee(traineeId);
// // // // // //         try {
// // // // // //             // הקריאה ל-startWorkout צריכה להיות עם ה-payload הנכון
// // // // // //             const requestBody = {
// // // // // //                 Trainee: traineeId,
// // // // // //                 planday: planDayId,
// // // // // //                 StartTime: new Date().toISOString(),
// // // // // //             };
// // // // // //             await activeWorkoutApi.startWorkout(requestBody);
// // // // // //             alert(`אימון התחיל עבור מתאמן ID: ${traineeId}, יום אימון: ${planDayId}`);
// // // // // //             // רענן את הסטטוס של המתאמן הספציפי
// // // // // //             await fetchTraineeWorkoutStatus(traineeId);
// // // // // //         } catch (err: any) {
// // // // // //             console.error('Failed to start workout for trainee:', err);
// // // // // //             setError(err.response?.data?.message || err.message || 'שגיאה בהתחלת האימון.');
// // // // // //         } finally {
// // // // // //             setIsStartingWorkoutForTrainee(null);
// // // // // //         }
// // // // // //     };

// // // // // //     if (isLoadingInitialData) {
// // // // // //         return <div className="text-center py-8 text-gray-500">טוען את כל המתאמנים...</div>;
// // // // // //     }

// // // // // //     if (error) {
// // // // // //         return <div className="text-center text-red-500 py-8"><p>{error}</p></div>;
// // // // // //     }

// // // // // //     return (
// // // // // //         <motion.div
// // // // // //             initial={{ opacity: 0, y: 20 }}
// // // // // //             animate={{ opacity: 1, y: 0 }}
// // // // // //             transition={{ duration: 0.5 }}
// // // // // //             className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg"
// // // // // //         >
// // // // // //             <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">לוח מחוונים - ניהול אימונים</h1>

// // // // // //             {allTrainees.length === 0 && (
// // // // // //                 <p className="text-center text-gray-500 text-lg">אין מתאמנים רשומים במערכת.</p>
// // // // // //             )}

// // // // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // //                 {allTrainees.map(trainee => {
// // // // // //                     const workoutState = traineeWorkoutStates.get(trainee.traineeId);
// // // // // //                     const hasActiveWorkout = workoutState !== undefined && workoutState !== null && !workoutState.isWorkoutComplete;
// // // // // //                     const traineePlans = availablePlansForTrainee.get(trainee.traineeId) || [];

// // // // // //                     return (
// // // // // //                         <motion.div
// // // // // //                             key={trainee.traineeId}
// // // // // //                             initial={{ opacity: 0, scale: 0.9 }}
// // // // // //                             animate={{ opacity: 1, scale: 1 }}
// // // // // //                             transition={{ duration: 0.3 }}
// // // // // //                             className="bg-white border border-gray-200 rounded-lg shadow-md p-5 relative"
// // // // // //                         >
// // // // // //                             <h2 className="text-xl font-bold text-gray-800 mb-3">{trainee.traineeName || `מתאמן ID: ${trainee.traineeId}`}</h2>

// // // // // //                             {isLoadingInitialData ? ( // בדיקה אם עדיין טוען נתונים ראשוניים
// // // // // //                                 <div className="text-center text-gray-500">טוען סטטוס אימון...</div>
// // // // // //                             ) : hasActiveWorkout && workoutState ? (
// // // // // //                                 <TraineeWorkoutCard
// // // // // //                                     workoutData={workoutState}
// // // // // //                                     onRemove={() => { /* אין צורך ב-onRemove כאן כי הכרטיס תמיד מוצג */ }}
// // // // // //                                 />
// // // // // //                             ) : traineePlans.length > 0 ? (
// // // // // //                                 
// // // // // //                                 <div className="mt-4">
// // // // // //                                     <h3 className="text-md font-semibold text-gray-700 mb-2">התחל אימון חדש:</h3>
// // // // // //                                     <Select
// // // // // //                                         options={traineePlans.map(p => ({ value: p.planDayId, label: `יום ${p.dayOrder}: ${p.programName}` }))}
// // // // // //                                         onChange={option => {
// // // // // //                                             // כאן נצטרך לשמור את planDayId שנבחר עבור המתאמן הספציפי
// // // // // //                                             // כרגע הפתרון הפשוט הוא להעביר אותו ישירות לכפתור
// // // // // //                                         }}
// // // // // //                                         placeholder="בחר יום אימון..."
// // // // // //                                         className="mb-2"
// // // // // //                                     />
// // // // // //                                     <Button
// // // // // //                                         onClick={() => {
// // // // // //                                             // לצורך פשטות הדוגמה, נתחיל את יום האימון הראשון הזמין
// // // // // //                                             if (traineePlans.length > 0) {
// // // // // //                                                 handleStartWorkoutForTrainee(trainee.traineeId, traineePlans[0].planDayId);
// // // // // //                                             }
// // // // // //                                         }}
// // // // // //                                         className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md transition-colors w-full"
// // // // // //                                         disabled={isStartingWorkoutForTrainee === trainee.traineeId || traineePlans.length === 0}
// // // // // //                                         icon={isStartingWorkoutForTrainee === trainee.traineeId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
// // // // // //                                     >
// // // // // //                                         {isStartingWorkoutForTrainee === trainee.traineeId ? 'מתחיל אימון...' : 'התחל אימון'}
// // // // // //                                     </Button>
// // // // // //                                 </div>
// // // // // //                             ) : (
// // // // // //                                 <p className="text-gray-500 text-center mt-4">אין תוכניות אימון זמינות למתאמן זה.</p>
// // // // // //                             )}
// // // // // //                         </motion.div>
// // // // // //                     );
// // // // // //                 })}
// // // // // //             </div>
// // // // // //         </motion.div>
// // // // // //     );
// // // // // // };

// // // // // // export default TraineeDashboardPage;


// // // // // // src/pages/TraineeDashboardPage.tsx
// // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // import { activeWorkoutApi, traineeApi, trainingPlanApi, exerciseApi, categoryApi } from '../lib/api';
// // // // // import { Trainee, PathResult, PlanDay, ExercisePlan } from '../types'; // ייבוא PlanExercise
// // // // // import { motion } from 'framer-motion';
// // // // // import Button from '../components/ui/Button';
// // // // // import Select from 'react-select';
// // // // // import TraineeWorkoutCard from '../components/TraineeWorkoutCard';
// // // // // import { Loader2, Play, BookText } from 'lucide-react'; // אייקונים נוספים

// // // // // interface SelectOption {
// // // // //     value: number;
// // // // //     label: string;
// // // // // }

// // // // // const TraineeDashboardPage: React.FC = () => {
// // // // //     const [allTrainees, setAllTrainees] = useState<Trainee[]>([]);
// // // // //     const [traineeWorkoutStates, setTraineeWorkoutStates] = useState<Map<number, PathResult | null>>(new Map());
// // // // //     const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
// // // // //     const [error, setError] = useState<string | null>(null);

// // // // //     const [availablePlansForTrainee, setAvailablePlansForTrainee] = useState<Map<number, PlanDay[]>>(new Map());
// // // // //     const [selectedPlanDayForTrainee, setSelectedPlanDayForTrainee] = useState<Map<number, PlanDay | null>>(new Map()); // לשמירת יום האימון הנבחר לכל מתאמן
// // // // //     const [isStartingWorkoutForTrainee, setIsStartingWorkoutForTrainee] = useState<number | null>(null);

// // // // //     const [exercises, setExercises] = useState<any[]>([]); // Added to fetch all exercises
// // // // //     const [categories, setCategories] = useState<any[]>([]); // Added to fetch all categories


// // // // //     // Helper functions for getting names
// // // // //     const getExerciseName = (exerciseId: number) => {
// // // // //         return exercises.find(e => e.exerciseId === exerciseId)?.exerciseName || `תרגיל ${exerciseId}`;
// // // // //     };

// // // // //     const getCategoryName = (categoryId: number) => {
// // // // //         return categories.find(c => c.categoryId === categoryId)?.categoryName || `קטגוריה ${categoryId}`;
// // // // //     };


// // // // //     // Fetch all trainees and initial workout statuses
// // // // //     useEffect(() => {
// // // // //         const fetchData = async () => {
// // // // //             try {
// // // // //                 const trainees = await traineeApi.getAll();
// // // // //                 setAllTrainees(trainees);

// // // // //                 const initialStates = new Map<number, PathResult | null>();
// // // // //                 trainees.forEach((t: Trainee) => initialStates.set(t.traineeId, null));
// // // // //                 setTraineeWorkoutStates(initialStates);

// // // // //                 // Fetch all exercises and categories for display purposes
// // // // //                 const allExercises = await exerciseApi.getAll();
// // // // //                 setExercises(allExercises);
// // // // //                 const allCategories = await categoryApi.getAll();
// // // // //                 setCategories(allCategories);

// // // // //                 setIsLoadingInitialData(false);
// // // // //                 fetchAllTraineeWorkoutStatuses(trainees.map((t: Trainee) => t.traineeId));
// // // // //             } catch (err: any) {
// // // // //                 setError(err.message || 'שגיאה בטעינת רשימת המתאמנים/נתונים כלליים.');
// // // // //                 setIsLoadingInitialData(false);
// // // // //             }
// // // // //         };
// // // // //         fetchData();
// // // // //     }, []);

// // // // //     // Function to fetch workout status for a specific trainee
// // // // //     const fetchTraineeWorkoutStatus = useCallback(async (traineeId: number) => {
// // // // //         try {
// // // // //             const updatedPlan: PathResult = await activeWorkoutApi.getUpdatedWorkoutPlan(traineeId);
// // // // //             setTraineeWorkoutStates(prev => new Map(prev).set(traineeId, updatedPlan));
// // // // //             if (!updatedPlan.isWorkoutComplete) {
// // // // //                 setAvailablePlansForTrainee(prev => {
// // // // //                     const newMap = new Map(prev);
// // // // //                     newMap.delete(traineeId);
// // // // //                     return newMap;
// // // // //                 });
// // // // //                 setSelectedPlanDayForTrainee(prev => {
// // // // //                     const newMap = new Map(prev);
// // // // //                     newMap.delete(traineeId); // Clear selected plan if workout is active
// // // // //                     return newMap;
// // // // //                 });
// // // // //             }
// // // // //         } catch (err: any) {
// // // // //             if (err.response && err.response.status === 404) {
// // // // //                 setTraineeWorkoutStates(prev => new Map(prev).set(traineeId, null));
// // // // //                 fetchAvailablePlansForTrainee(traineeId);
// // // // //             } else {
// // // // //                 console.error(`Error fetching workout status for trainee ${traineeId}:`, err);
// // // // //             }
// // // // //         }
// // // // //     }, []);

// // // // //     // Function to fetch all trainees' workout statuses
// // // // //     const fetchAllTraineeWorkoutStatuses = useCallback(async (traineeIds: number[]) => {
// // // // //         await Promise.all(traineeIds.map(id => fetchTraineeWorkoutStatus(id)));
// // // // //     }, [fetchTraineeWorkoutStatus]);

// // // // //     // Global poller for refreshing all statuses
// // // // //     useEffect(() => {
// // // // //         if (allTrainees.length > 0) {
// // // // //             const interval = setInterval(() => {
// // // // //                 fetchAllTraineeWorkoutStatuses(allTrainees.map(t => t.traineeId));
// // // // //             }, 5000);
// // // // //             return () => clearInterval(interval);
// // // // //         }
// // // // //     }, [allTrainees, fetchAllTraineeWorkoutStatuses]);

// // // // //     // Fetch available training plans for a specific trainee (when no active workout)
// // // // //     const fetchAvailablePlansForTrainee = useCallback(async (traineeId: number) => {
// // // // //         try {
// // // // //             const plansResponse = await trainingPlanApi.getActivePlans(traineeId);
// // // // //             const plansArray = Array.isArray(plansResponse) ? plansResponse : [plansResponse];
// // // // //             setAvailablePlansForTrainee(prev => {
// // // // //                 const newMap = new Map(prev);
// // // // //                 newMap.set(traineeId, plansArray.map(p => p.planDays || []).flat());
// // // // //                 return newMap;
// // // // //             });
// // // // //         } catch (err) {
// // // // //             console.error(`Failed to fetch available plans for trainee ${traineeId}:`, err);
// // // // //         }
// // // // //     }, []);

// // // // //     // Function to start a workout for a specific trainee
// // // // //     const handleStartWorkoutForTrainee = async (traineeId: number) => {
// // // // //         const selectedPlan = selectedPlanDayForTrainee.get(traineeId);
// // // // //         if (!selectedPlan) {
// // // // //             alert('אנא בחר יום אימון לפני ההתחלה.');
// // // // //             return;
// // // // //         }

// // // // //         setIsStartingWorkoutForTrainee(traineeId);
// // // // //         try {
// // // // //             const requestBody = {
// // // // //                 Trainee: traineeId,
// // // // //                 planday: selectedPlan.planDayId,
// // // // //                 StartTime: new Date().toISOString(),
// // // // //             };
// // // // //             await activeWorkoutApi.startWorkout(requestBody);
// // // // //             alert(`אימון התחיל עבור מתאמן ID: ${traineeId}, יום אימון: ${selectedPlan.programName} (יום ${selectedPlan.dayOrder})`);
// // // // //             await fetchTraineeWorkoutStatus(traineeId);
// // // // //         } catch (err: any) {
// // // // //             console.error('Failed to start workout for trainee:', err);
// // // // //             setError(err.response?.data?.message || err.message || 'שגיאה בהתחלת האימון.');
// // // // //         } finally {
// // // // //             setIsStartingWorkoutForTrainee(null);
// // // // //         }
// // // // //     };

// // // // //     if (isLoadingInitialData) {
// // // // //         return <div className="text-center py-8 text-gray-500">טוען את כל המתאמנים...</div>;
// // // // //     }

// // // // //     if (error) {
// // // // //         return <div className="text-center text-red-500 py-8"><p>{error}</p></div>;
// // // // //     }

// // // // //     return (
// // // // //         <motion.div
// // // // //             initial={{ opacity: 0, y: 20 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ duration: 0.5 }}
// // // // //             className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg"
// // // // //         >
// // // // //             <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">לוח מחוונים - ניהול אימונים</h1>

// // // // //             {allTrainees.length === 0 && (
// // // // //                 <p className="text-center text-gray-500 text-lg">אין מתאמנים רשומים במערכת.</p>
// // // // //             )}

// // // // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //                 {allTrainees.map(trainee => {
// // // // //                     const workoutState = traineeWorkoutStates.get(trainee.traineeId);
// // // // //                     const hasActiveWorkout = workoutState !== undefined && workoutState !== null && !workoutState.isWorkoutComplete;
// // // // //                     const traineePlans = availablePlansForTrainee.get(trainee.traineeId) || [];
// // // // //                     const currentSelectedPlanDay = selectedPlanDayForTrainee.get(trainee.traineeId);

// // // // //                     return (
// // // // //                         <motion.div
// // // // //                             key={trainee.traineeId}
// // // // //                             initial={{ opacity: 0, scale: 0.9 }}
// // // // //                             animate={{ opacity: 1, scale: 1 }}
// // // // //                             transition={{ duration: 0.3 }}
// // // // //                             className="bg-white border border-gray-200 rounded-lg shadow-md p-5 relative"
// // // // //                         >
// // // // //                             <h2 className="text-xl font-bold text-gray-800 mb-3">{trainee.traineeName || `מתאמן ID: ${trainee.traineeId}`}</h2>

// // // // //                             {isLoadingInitialData ? (
// // // // //                                 <div className="text-center text-gray-500">טוען סטטוס אימון...</div>
// // // // //                             ) : hasActiveWorkout && workoutState ? (
// // // // //                                 <TraineeWorkoutCard
// // // // //                                     workoutData={workoutState}
// // // // //                                     onRemove={() => { /* אין צורך ב-onRemove כאן כי הכרטיס תמיד מוצג */ }}
// // // // //                                 />
// // // // //                             ) : (
// // // // //                                 <div className="mt-4">
// // // // //                                     <h3 className="text-md font-semibold text-gray-700 mb-2">התחל אימון חדש:</h3>
// // // // //                                     <Select
// // // // //                                         options={traineePlans.map(p => ({ value: p.planDayId, label: `יום ${p.dayOrder}: ${p.programName}`, data: p }))}
// // // // //                                         onChange={option => {
// // // // //                                             setSelectedPlanDayForTrainee(prev => new Map(prev).set(trainee.traineeId, option?.data || null));
// // // // //                                         }}
// // // // //                                         placeholder="בחר יום אימון..."
// // // // //                                         className="mb-2"
// // // // //                                         value={currentSelectedPlanDay ? { value: currentSelectedPlanDay.planDayId, label: `יום ${currentSelectedPlanDay.dayOrder}: ${currentSelectedPlanDay.programName}` } : null}
// // // // //                                         isClearable
// // // // //                                     />

// // // // //                                     {currentSelectedPlanDay && currentSelectedPlanDay.planExercises && (
// // // // //                                         <div className="mt-4 bg-gray-50 p-3 rounded-md border border-gray-200">
// // // // //                                             <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
// // // // //                                                 <BookText className="h-4 w-4 ml-1" />
// // // // //                                                 תרגילים ליום אימון זה:
// // // // //                                             </h4>
// // // // //                                             <ul className="space-y-1 text-sm text-gray-700">
// // // // //                                                 {currentSelectedPlanDay.planExercises
// // // // //                                                     .sort((a: ExercisePlan, b: ExercisePlan) => a.orderInDay - b.orderInDay)
// // // // //                                                     .map((exercisePlan: ExercisePlan) => (
// // // // //                                                         <li key={exercisePlan.exercisePlanId} className="flex items-center">
// // // // //                                                             <div className="h-2 w-2 bg-gray-400 rounded-full ml-2 flex-shrink-0"></div>
// // // // //                                                             <span>
// // // // //                                                                 <strong className="font-semibold">{getExerciseName(exercisePlan.exerciseId)}</strong>: {exercisePlan.planSets} סטים | {exercisePlan.planRepetitionsMin}-{exercisePlan.planRepetitionsMax} חזרות | {exercisePlan.planWeight} ק"ג
// // // // //                                                             </span>
// // // // //                                                         </li>
// // // // //                                                     ))}
// // // // //                                             </ul>
// // // // //                                         </div>
// // // // //                                     )}

// // // // //                                     <Button
// // // // //                                         onClick={() => handleStartWorkoutForTrainee(trainee.traineeId)}
// // // // //                                         className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md transition-colors w-full mt-3"
// // // // //                                         disabled={isStartingWorkoutForTrainee === trainee.traineeId || !currentSelectedPlanDay}
// // // // //                                         icon={isStartingWorkoutForTrainee === trainee.traineeId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
// // // // //                                     >
// // // // //                                         {isStartingWorkoutForTrainee === trainee.traineeId ? 'מתחיל אימון...' : 'התחל אימון'}
// // // // //                                     </Button>
// // // // //                                 </div>
// // // // //                             )}
// // // // //                         </motion.div>
// // // // //                     );
// // // // //                 })}
// // // // //             </div>
// // // // //         </motion.div>
// // // // //     );
// // // // // };

// // // // // export default TraineeDashboardPage;

// // // // src/pages/TraineeDashboardPage.tsx
// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { activeWorkoutApi, traineeApi, trainingPlanApi, exerciseApi, categoryApi, exercisePlanApi } from '../lib/api';
// // // import { Trainee, PathResult, PlanDay, ExercisePlan, Exercise, Category } from '../types'; // ודא ש-ExercisePlan, Exercise, Category מיובאים
// // // import { motion } from 'framer-motion';
// // // import Button from '../components/ui/Button';
// // // import Select from 'react-select';
// // // import TraineeWorkoutCard from '../components/TraineeWorkoutCard';
// // // import { Loader2, Play, BookText, ChevronDown, ChevronUp } from 'lucide-react';

// // // interface SelectOption {
// // //     value: number;
// // //     label: string;
// // //     data: PlanDay;
// // // }

// // // const TraineeDashboardPage: React.FC = () => {
// // //     const [allTrainees, setAllTrainees] = useState<Trainee[]>([]);
// // //     const [traineeWorkoutStates, setTraineeWorkoutStates] = useState<Map<number, PathResult | null>>(new Map());
// // //     const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
// // //     const [error, setError] = useState<string | null>(null);

// // //     const [availablePlansForTrainee, setAvailablePlansForTrainee] = useState<Map<number, PlanDay[]>>(new Map());
// // //     const [selectedPlanDayForTrainee, setSelectedPlanDayForTrainee] = useState<Map<number, PlanDay | null>>(new Map());
// // //     const [isStartingWorkoutForTrainee, setIsStartingWorkoutForTrainee] = useState<number | null>(null);

// // //     // מצבי State לניהול הרחבת ימי אימון והצגת תרגילים
// // //     const [expandedDayId, setExpandedDayId] = useState<number | null>(null);
// // //     const [isLoadingExercisesForDay, setIsLoadingExercisesForDay] = useState<boolean>(false);
// // //     // זו המפה שתשמור את התרגילים שנטענו עבור כל planDayId.
// // //     // כעת היא מאחסנת מערך של ExercisePlan[]
// // //     const [exercisesByPlanDayId, setExercisesByPlanDayId] = useState<Map<number, ExercisePlan[]>>(new Map());

// // //     const [allExercisesMap, setAllExercisesMap] = useState<Map<number, Exercise>>(new Map()); // מפה לגישה מהירה לתרגילים
// // //     const [categories, setCategories] = useState<Category[]>([]);


// // //     // Helper functions for getting names
// // //     // עכשיו משתמש במפה של כל התרגילים
// // //     const getExerciseName = useCallback((exerciseId: number) => {
// // //         return allExercisesMap.get(exerciseId)?.exerciseName || `תרגיל ${exerciseId}`;
// // //     }, [allExercisesMap]);

// // //     const getCategoryName = useCallback((categoryId: number) => {
// // //         return categories.find(c => c.categoryId === categoryId)?.categoryName || `קטגוריה ${categoryId}`;
// // //     }, [categories]);

// // //     // Fetch all exercises and create a map for quick lookup
// // //     useEffect(() => {
// // //         const fetchAllExercises = async () => {
// // //             try {
// // //                 const exercisesData = await exerciseApi.getAll();
// // //                 const exercisesMap = new Map<number, Exercise>();
// // //                 exercisesData.forEach((ex: Exercise) => exercisesMap.set(ex.exerciseId, ex));
// // //                 setAllExercisesMap(exercisesMap);
// // //             } catch (err) {
// // //                 console.error("Failed to fetch all exercises:", err);
// // //             }
// // //         };
// // //         fetchAllExercises();
// // //     }, []);

// // //     // Fetch all trainees and initial workout statuses
// // //     useEffect(() => {
// // //         const fetchData = async () => {
// // //             try {
// // //                 const trainees = await traineeApi.getAll();
// // //                 setAllTrainees(trainees);

// // //                 const initialStates = new Map<number, PathResult | null>();
// // //                 trainees.forEach((t: Trainee) => initialStates.set(t.traineeId, null));
// // //                 setTraineeWorkoutStates(initialStates);

// // //                 const allCategories = await categoryApi.getAll();
// // //                 setCategories(allCategories);

// // //                 setIsLoadingInitialData(false);
// // //                 fetchAllTraineeWorkoutStatuses(trainees.map((t: Trainee) => t.traineeId));
// // //             } catch (err: any) {
// // //                 setError(err.message || 'שגיאה בטעינת רשימת המתאמנים/נתונים כלליים.');
// // //                 setIsLoadingInitialData(false);
// // //             }
// // //         };
// // //         fetchData();
// // //     }, []);

// // //     // Fetch available training plans for a specific trainee (when no active workout)
// // //     // הפונקציה הזו כעת מקבלת PlanDay ללא exercisePlans מובנים
// // //     const fetchAvailablePlansForTrainee = useCallback(async (traineeId: number) => {
// // //         try {
// // //             const plansResponse = await trainingPlanApi.getActivePlans(traineeId); // מחזיר ActiveTrainingPlanResponse
// // //             const plansArray: PlanDay[] = Array.isArray(plansResponse)
// // //                 ? plansResponse.flatMap((resp: any) => resp.planDays || [])
// // //                 : (plansResponse.planDays || []);
// // //             setAvailablePlansForTrainee(prev => new Map(prev).set(traineeId, plansArray));
// // //         } catch (err) {
// // //             console.error(`Failed to fetch available plans for trainee ${traineeId}:`, err);
// // //         }
// // //     }, []);

// // //     // Function to fetch workout status for a specific trainee
// // //     const fetchTraineeWorkoutStatus = useCallback(async (traineeId: number) => {
// // //         try {
// // //             const updatedPlan: PathResult = await activeWorkoutApi.getUpdatedWorkoutPlan(traineeId);
// // //             setTraineeWorkoutStates(prev => new Map(prev).set(traineeId, updatedPlan));
// // //             if (!updatedPlan.isWorkoutComplete) {
// // //                 setAvailablePlansForTrainee(prev => {
// // //                     const newMap = new Map(prev);
// // //                     newMap.delete(traineeId);
// // //                     return newMap;
// // //                 });
// // //                 setSelectedPlanDayForTrainee(prev => {
// // //                     const newMap = new Map(prev);
// // //                     newMap.delete(traineeId);
// // //                     return newMap;
// // //                 });
// // //             }
// // //         } catch (err: any) {
// // //             if (err.response && err.response.status === 404) {
// // //                 setTraineeWorkoutStates(prev => new Map(prev).set(traineeId, null));
// // //                 fetchAvailablePlansForTrainee(traineeId);
// // //             } else {
// // //                 console.error(`Error fetching workout status for trainee ${traineeId}:`, err);
// // //             }
// // //         }
// // //     }, [fetchAvailablePlansForTrainee]);

// // //     // Function to fetch all trainees' workout statuses
// // //     const fetchAllTraineeWorkoutStatuses = useCallback(async (traineeIds: number[]) => {
// // //         await Promise.all(traineeIds.map(id => fetchTraineeWorkoutStatus(id)));
// // //     }, [fetchTraineeWorkoutStatus]);

// // //     // Global poller for refreshing all statuses
// // //     useEffect(() => {
// // //         if (allTrainees.length > 0) {
// // //             const interval = setInterval(() => {
// // //                 fetchAllTraineeWorkoutStatuses(allTrainees.map(t => t.traineeId));
// // //             }, 5000);
// // //             return () => clearInterval(interval);
// // //         }
// // //     }, [allTrainees, fetchAllTraineeWorkoutStatuses]);

// // //     // פונקציה לטעינת תרגילים עבור יום אימון ספציפי
// // //     const fetchExercisesForDay = useCallback(async (planDayId: number) => {
// // //         setIsLoadingExercisesForDay(true);
// // //         try {
// // //             // קריאה נפרדת ל-API להבאת התרגילים עבור ה-PlanDayId
// // //             const exercisesData: ExercisePlan[] = await exercisePlanApi.getExercisesForPlanDay(planDayId);
// // //             setExercisesByPlanDayId(prev => new Map(prev).set(planDayId, exercisesData));
// // //         } catch (err) {
// // //             console.error(`Failed to fetch exercises for plan day ${planDayId}:`, err);
// // //         } finally {
// // //             setIsLoadingExercisesForDay(false);
// // //         }
// // //     }, []);

// // //     // פונקציית טוגל להרחבת/כיווץ יום אימון
// // //     const toggleDayExpansion = useCallback(async (planDayId: number) => {
// // //         if (expandedDayId === planDayId) {
// // //             setExpandedDayId(null); // כיווץ
// // //         } else {
// // //             setExpandedDayId(planDayId); // הרחבה
// // //             // אם התרגילים עדיין לא נטענו עבור יום זה, נטען אותם
// // //             if (!exercisesByPlanDayId.has(planDayId)) {
// // //                 await fetchExercisesForDay(planDayId);
// // //             }
// // //         }
// // //     }, [expandedDayId, exercisesByPlanDayId, fetchExercisesForDay]);

// // //     // Function to start a workout for a specific trainee
// // //     const handleStartWorkoutForTrainee = async (traineeId: number) => {
// // //         const selectedPlan = selectedPlanDayForTrainee.get(traineeId);
// // //         if (!selectedPlan) {
// // //             alert('אנא בחר יום אימון לפני ההתחלה.');
// // //             return;
// // //         }

// // //         // טען את התרגילים עבור יום האימון שנבחר לפני התחלת האימון, אם הם לא נטענו
// // //         let exercisesToUse: ExercisePlan[] | undefined = exercisesByPlanDayId.get(selectedPlan.planDayId);
// // //         if (!exercisesToUse) {
// // //             // אם לא נטענו, נטען אותם כעת
// // //             setIsStartingWorkoutForTrainee(traineeId); // כדי להראות מצב טעינה
// // //             try {
// // //                 exercisesToUse = await exercisePlanApi.getExercisesForPlanDay(selectedPlan.planDayId);
// // //                 setExercisesByPlanDayId(prev => new Map(prev).set(selectedPlan.planDayId, exercisesToUse!));
// // //             } catch (err) {
// // //                 console.error('Failed to load exercises for selected plan day:', err);
// // //                 setError('שגיאה בטעינת תרגילי האימון הנבחר.');
// // //                 setIsStartingWorkoutForTrainee(null);
// // //                 return;
// // //             }
// // //             setIsStartingWorkoutForTrainee(null);
// // //         }


// // //         setIsStartingWorkoutForTrainee(traineeId);
// // //         try {
// // //             const requestBody = {
// // //                 Trainee: traineeId,
// // //                 planday: selectedPlan.planDayId,
// // //                 StartTime: new Date().toISOString(),
// // //                 // אין צורך לשלוח exercisesPlans, כי ה-backend אמור לדעת לשייך לפי plandayId
// // //             };
// // //             await activeWorkoutApi.startWorkout(requestBody);
// // //             alert(`אימון התחיל עבור מתאמן ID: ${traineeId}, יום אימון: ${selectedPlan.ProgramName} (יום ${selectedPlan.dayOrder})`);
// // //             await fetchTraineeWorkoutStatus(traineeId);
// // //         } catch (err: any) {
// // //             console.error('Failed to start workout for trainee:', err);
// // //             setError(err.response?.data?.message || err.message || 'שגיאה בהתחלת האימון.');
// // //         } finally {
// // //             setIsStartingWorkoutForTrainee(null);
// // //         }
// // //     };

// // //     const renderExercisesList = (exercisePlans: ExercisePlan[]) => (
// // //         <ul className="space-y-1 text-sm text-gray-700 mt-2">
// // //             {exercisePlans
// // //                 .sort((a: ExercisePlan, b: ExercisePlan) => a.orderInDay - b.orderInDay)
// // //                 .map((exercisePlan: ExercisePlan) => (
// // //                     // נשתמש ב-exerciseId מה-ExercisePlan כדי למצוא את השם מהמפה allExercisesMap
// // //                     <li key={exercisePlan.exercisePlanId} className="flex items-center">
// // //                         <div className="h-2 w-2 bg-gray-400 rounded-full ml-2 flex-shrink-0"></div>
// // //                         <span>
// // //                             <strong className="font-semibold">{getExerciseName(exercisePlan.exerciseId)}</strong>
// // //                         </span>
// // //                     </li>
// // //                 ))}
// // //         </ul>
// // //     );

// // //     if (isLoadingInitialData) {
// // //         return <div className="text-center py-8 text-gray-500">טוען את כל המתאמנים...</div>;
// // //     }

// // //     if (error) {
// // //         return <div className="text-center text-red-500 py-8"><p>{error}</p></div>;
// // //     }

// // //     return (
// // //         <motion.div
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.5 }}
// // //             className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg"
// // //         >
// // //             <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">לוח מחוונים - ניהול אימונים</h1>

// // //             {allTrainees.length === 0 && (
// // //                 <p className="text-center text-gray-500 text-lg">אין מתאמנים רשומים במערכת.</p>
// // //             )}

// // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                 {allTrainees.map(trainee => {
// // //                     const workoutState = traineeWorkoutStates.get(trainee.traineeId);
// // //                     const hasActiveWorkout = workoutState !== undefined && workoutState !== null && !workoutState.isWorkoutComplete;
// // //                     const traineePlans = availablePlansForTrainee.get(trainee.traineeId) || [];
// // //                     const currentSelectedPlanDay = selectedPlanDayForTrainee.get(trainee.traineeId);

// // //                     // תרגילים עבור יום האימון שנבחר בסלקט (אם נבחרו)
// // //                     const selectedDayExercises = currentSelectedPlanDay ? exercisesByPlanDayId.get(currentSelectedPlanDay.planDayId) : undefined;

// // //                     return (
// // //                         <motion.div
// // //                             key={trainee.traineeId}
// // //                             initial={{ opacity: 0, scale: 0.9 }}
// // //                             animate={{ opacity: 1, scale: 1 }}
// // //                             transition={{ duration: 0.3 }}
// // //                             className="bg-white border border-gray-200 rounded-lg shadow-md p-5 relative"
// // //                         >
// // //                             <h2 className="text-xl font-bold text-gray-800 mb-3">{trainee.traineeName || `מתאמן ID: ${trainee.traineeId}`}</h2>

// // //                             {hasActiveWorkout && workoutState ? (
// // //                                 <TraineeWorkoutCard
// // //                                     workoutData={workoutState}
// // //                                     onRemove={() => { /* אין צורך ב-onRemove כאן כי הכרטיס תמיד מוצג */ }}
// // //                                 />
// // //                             ) : (
// // //                                 <>
// // //                                     <div className="mt-4">
// // //                                         <h3 className="text-md font-semibold text-gray-700 mb-2">התחל אימון חדש:</h3>
// // //                                         <Select<SelectOption>
// // //                                             options={traineePlans.map(p => ({ value: p.planDayId, label: `יום ${p.dayOrder}: ${p.ProgramName || ''}`, data: p }))}
// // //                                             onChange={async option => { // שינוי ל-async
// // //                                                 setSelectedPlanDayForTrainee(prev => new Map(prev).set(trainee.traineeId, option?.data || null));
// // //                                                 setExpandedDayId(null); // סגור יום מורחב קודם

// // //                                                 // אם נבחר יום, טען את התרגילים שלו מיד
// // //                                                 if (option?.data) {
// // //                                                     await fetchExercisesForDay(option.data.planDayId);
// // //                                                 }
// // //                                             }}
// // //                                             placeholder="בחר יום אימון..."
// // //                                             className="mb-2"
// // //                                             value={currentSelectedPlanDay ? { value: currentSelectedPlanDay.planDayId, label: `יום ${currentSelectedPlanDay.dayOrder}: ${currentSelectedPlanDay.ProgramName || ''}`, data: currentSelectedPlanDay } : null}
// // //                                             isClearable
// // //                                         />

// // //                                         {currentSelectedPlanDay && selectedDayExercises && ( // נשתמש ב-selectedDayExercises
// // //                                             <div className="mt-4 bg-gray-50 p-3 rounded-md border border-gray-200">
// // //                                                 <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
// // //                                                     <BookText className="h-4 w-4 ml-1" />
// // //                                                     תרגילים ליום אימון זה:
// // //                                                 </h4>
// // //                                                 {renderExercisesList(selectedDayExercises)}
// // //                                             </div>
// // //                                         )}
// // //                                         {/* הוספת אינדיקטור טעינה עבור תרגילים שנבחרו בסלקט */}
// // //                                         {currentSelectedPlanDay && isLoadingExercisesForDay && !selectedDayExercises && (
// // //                                             <div className="text-center text-gray-500 flex items-center justify-center py-2">
// // //                                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
// // //                                                 טוען תרגילים עבור היום הנבחר...
// // //                                             </div>
// // //                                         )}

// // //                                         <Button
// // //                                             onClick={() => handleStartWorkoutForTrainee(trainee.traineeId)}
// // //                                             className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md transition-colors w-full mt-3"
// // //                                             disabled={isStartingWorkoutForTrainee === trainee.traineeId || !currentSelectedPlanDay || !selectedDayExercises}
// // //                                             icon={isStartingWorkoutForTrainee === trainee.traineeId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
// // //                                         >
// // //                                             {isStartingWorkoutForTrainee === trainee.traineeId ? 'מתחיל אימון...' : 'התחל אימון'}
// // //                                         </Button>
// // //                                     </div>

                                   

// // //                                     {/* --- הצגת ימי אימון זמינים עם אפשרות הרחבה --- */}
// // //                                     {traineePlans.length > 0 && (
// // //                                         <div className="mt-6 border-t border-gray-200 pt-4">
// // //                                             <h3 className="text-md font-semibold text-gray-700 mb-3">ימי אימון קיימים:</h3>
// // //                                             <div className="space-y-3">
// // //                                                 {traineePlans
// // //                                                     .sort((a, b) => a.dayOrder - b.dayOrder)
// // //                                                     .map(planDay => (
// // //                                                         <div key={planDay.planDayId} className="border border-gray-200 rounded-md p-3">
// // //                                                             <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDayExpansion(planDay.planDayId)}>
// // //                                                                 <h4 className="text-lg font-medium text-gray-800 flex items-center">
// // //                                                                     <BookText className="h-5 w-5 ml-2 text-blue-500" />
// // //                                                                     יום {planDay.dayOrder}: {planDay.ProgramName}
// // //                                                                 </h4>
// // //                                                                 {expandedDayId === planDay.planDayId ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
// // //                                                             </div>
// // //                                                             {expandedDayId === planDay.planDayId && (
// // //                                                                 <motion.div
// // //                                                                     initial={{ opacity: 0, height: 0 }}
// // //                                                                     animate={{ opacity: 1, height: "auto" }}
// // //                                                                     exit={{ opacity: 0, height: 0 }}
// // //                                                                     transition={{ duration: 0.3 }}
// // //                                                                     className="mt-3 overflow-hidden"
// // //                                                                 >
// // //                                                                     {isLoadingExercisesForDay && !exercisesByPlanDayId.has(planDay.planDayId) ? (
// // //                                                                         <div className="text-center text-gray-500 flex items-center justify-center py-2">
// // //                                                                             <Loader2 className="h-4 w-4 animate-spin mr-2" />
// // //                                                                             טוען תרגילים...
// // //                                                                         </div>
// // //                                                                     ) : (
// // //                                                                         exercisesByPlanDayId.get(planDay.planDayId) && exercisesByPlanDayId.get(planDay.planDayId)!.length > 0 ? (
// // //                                                                             <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
// // //                                                                                 <h5 className="font-semibold text-gray-700 mb-2">תרגילים:</h5>
// // //                                                                                 {renderExercisesList(exercisesByPlanDayId.get(planDay.planDayId)!)}
// // //                                                                             </div>
// // //                                                                         ) : (
// // //                                                                             <p className="text-gray-500 text-sm mt-2">אין תרגילים מוגדרים ליום זה.</p>
// // //                                                                         )
// // //                                                                     )}
// // //                                                                 </motion.div>
// // //                                                             )}
// // //                                                         </div>
// // //                                                     ))}
// // //                                             </div>
// // //                                         </div>
// // //                                     )}
// // //                                 </>
// // //                             )}
// // //                         </motion.div>
// // //                     );
// // //                 })}
// // //             </div>
// // //         </motion.div>
// // //     );
// // // };

// // // export default TraineeDashboardPage;

// // // src/pages/TraineeDashboardPage.tsx
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { activeWorkoutApi, traineeApi, trainingPlanApi, exerciseApi, categoryApi, exercisePlanApi } from '../lib/api';
// // import { Trainee, PathResult, PlanDay, ExercisePlan, Exercise, Category, ActiveTrainingPlanResponse } from '../types'; // ודא ש-ActiveTrainingPlanResponse, ExercisePlan, Exercise, Category מיובאים
// // import { motion } from 'framer-motion';
// // import Button from '../components/ui/Button';
// // import Select from 'react-select';
// // import TraineeWorkoutCard from '../components/TraineeWorkoutCard';
// // import { Loader2, Play, BookText, ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react'; // הוסף CheckCircle ו-XCircle

// // interface SelectOption {
// //     value: number;
// //     label: string;
// //     data: PlanDay;
// // }

// // const TraineeDashboardPage: React.FC = () => {
// //     const [allTrainees, setAllTrainees] = useState<Trainee[]>([]);
// //     const [traineeWorkoutStates, setTraineeWorkoutStates] = useState<Map<number, PathResult | null>>(new Map());

// //     // חדש: מפה לאחסון נתוני תוכנית האימון המלאה (כולל isCompletedThisWeek)
// //     const [traineeActiveTrainingPlans, setTraineeActiveTrainingPlans] = useState<Map<number, ActiveTrainingPlanResponse | null>>(new Map());

// //     const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
// //     const [error, setError] = useState<string | null>(null);

// //     const [availablePlansForTrainee, setAvailablePlansForTrainee] = useState<Map<number, PlanDay[]>>(new Map());
// //     const [selectedPlanDayForTrainee, setSelectedPlanDayForTrainee] = useState<Map<number, PlanDay | null>>(new Map());
// //     const [isStartingWorkoutForTrainee, setIsStartingWorkoutForTrainee] = useState<number | null>(null);

// //     // מצבי State לניהול הרחבת ימי אימון והצגת תרגילים
// //     const [expandedDayId, setExpandedDayId] = useState<number | null>(null);
// //     const [isLoadingExercisesForDay, setIsLoadingExercisesForDay] = useState<boolean>(false);
// //     const [exercisesByPlanDayId, setExercisesByPlanDayId] = useState<Map<number, ExercisePlan[]>>(new Map());

// //     const [allExercisesMap, setAllExercisesMap] = useState<Map<number, Exercise>>(new Map()); // מפה לגישה מהירה לתרגילים
// //     const [categories, setCategories] = useState<Category[]>([]);


// //     // Helper functions for getting names
// //     const getExerciseName = useCallback((exerciseId: number) => {
// //         return allExercisesMap.get(exerciseId)?.exerciseName || `תרגיל ${exerciseId}`;
// //     }, [allExercisesMap]);

// //     const getCategoryName = useCallback((categoryId: number) => {
// //         return categories.find(c => c.categoryId === categoryId)?.categoryName || `קטגוריה ${categoryId}`;
// //     }, [categories]);

// //     // Fetch all exercises and create a map for quick lookup
// //     useEffect(() => {
// //         const fetchAllExercises = async () => {
// //             try {
// //                 const exercisesData = await exerciseApi.getAll();
// //                 const exercisesMap = new Map<number, Exercise>();
// //                 exercisesData.forEach((ex: Exercise) => exercisesMap.set(ex.exerciseId, ex));
// //                 setAllExercisesMap(exercisesMap);
// //             } catch (err) {
// //                 console.error("Failed to fetch all exercises:", err);
// //             }
// //         };
// //         fetchAllExercises();
// //     }, []);

// //     // Fetch all trainees and initial workout statuses
// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const trainees = await traineeApi.getAll();
// //                 setAllTrainees(trainees);

// //                 const initialStates = new Map<number, PathResult | null>();
// //                 trainees.forEach((t: Trainee) => initialStates.set(t.traineeId, null));
// //                 setTraineeWorkoutStates(initialStates);

// //                 const allCategories = await categoryApi.getAll();
// //                 setCategories(allCategories);

// //                 setIsLoadingInitialData(false);
// //                 // קרא גם את תוכניות האימון המלאות עבור כל מתאמן
// //                 trainees.forEach((t: Trainee) => fetchActiveTrainingPlanForTrainee(t.traineeId));
// //                 fetchAllTraineeWorkoutStatuses(trainees.map((t: Trainee) => t.traineeId));
// //             } catch (err: any) {
// //                 setError(err.message || 'שגיאה בטעינת רשימת המתאמנים/נתונים כלליים.');
// //                 setIsLoadingInitialData(false);
// //             }
// //         };
// //         fetchData();
// //     }, []);

// //     // חדש: פונקציה לטעינת תוכנית אימון פעילה מלאה (כולל isCompletedThisWeek)
// //     const fetchActiveTrainingPlanForTrainee = useCallback(async (traineeId: number) => {
// //         try {
// //              const activePlan = await activeWorkoutApi.getTraineeActiveTrainingPlan(traineeId);
// //            // const activePlan = await trainingPlanApi.getActivePlans(traineeId);
// //             setTraineeActiveTrainingPlans(prev => new Map(prev).set(traineeId, activePlan));

// //             // עדכן את availablePlansForTrainee עם ימי האימון מהתוכנית המלאה
// //             if (activePlan && activePlan.planDays) {
// //                 setAvailablePlansForTrainee(prev => new Map(prev).set(traineeId, activePlan.planDays));
// //             } else {
// //                 setAvailablePlansForTrainee(prev => {
// //                     const newMap = new Map(prev);
// //                     newMap.delete(traineeId);
// //                     return newMap;
// //                 });
// //             }
// //         } catch (err: any) {
// //             if (err.response && err.response.status === 404) {
// //                 console.log(`No active training plan for trainee ${traineeId}.`);
// //                 setTraineeActiveTrainingPlans(prev => new Map(prev).set(traineeId, null));
// //                 setAvailablePlansForTrainee(prev => {
// //                     const newMap = new Map(prev);
// //                     newMap.delete(traineeId);
// //                     return newMap;
// //                 });
// //             } else {
// //                 console.error(`Error fetching active training plan for trainee ${traineeId}:`, err);
// //             }
// //         }
// //     }, []);


// //     // Function to fetch workout status for a specific trainee
// //     const fetchTraineeWorkoutStatus = useCallback(async (traineeId: number) => {
// //         try {
// //             const updatedPlan: PathResult = await activeWorkoutApi.getUpdatedWorkoutPlan(traineeId);
// //             setTraineeWorkoutStates(prev => new Map(prev).set(traineeId, updatedPlan));
// //             if (!updatedPlan.isWorkoutComplete) {
// //                 // אם יש אימון פעיל, וודא שאין אופציות נוספות בסלקט
// //                 setAvailablePlansForTrainee(prev => {
// //                     const newMap = new Map(prev);
// //                     newMap.delete(traineeId);
// //                     return newMap;
// //                 });
// //                 setSelectedPlanDayForTrainee(prev => {
// //                     const newMap = new Map(prev);
// //                     newMap.delete(traineeId);
// //                     return newMap;
// //                 });
// //             } else {
// //                 // אם האימון הושלם, רענן את רשימת הימים הזמינים
// //                 fetchActiveTrainingPlanForTrainee(traineeId);
// //             }
// //         } catch (err: any) {
// //             if (err.response && err.response.status === 404) {
// //                 setTraineeWorkoutStates(prev => new Map(prev).set(traineeId, null));
// //                 fetchActiveTrainingPlanForTrainee(traineeId); // טען את התוכנית המלאה אם אין אימון פעיל
// //             } else {
// //                 console.error(`Error fetching workout status for trainee ${traineeId}:`, err);
// //             }
// //         }
// //     }, [fetchActiveTrainingPlanForTrainee]); // תלוי בפונקציה החדשה

// //     // Function to fetch all trainees' workout statuses
// //     const fetchAllTraineeWorkoutStatuses = useCallback(async (traineeIds: number[]) => {
// //         await Promise.all(traineeIds.map(id => fetchTraineeWorkoutStatus(id)));
// //     }, [fetchTraineeWorkoutStatus]);

// //     // Global poller for refreshing all statuses
// //     useEffect(() => {
// //         if (allTrainees.length > 0) {
// //             const interval = setInterval(() => {
// //                 fetchAllTraineeWorkoutStatuses(allTrainees.map(t => t.traineeId));
// //             }, 5000);
// //             return () => clearInterval(interval);
// //         }
// //     }, [allTrainees, fetchAllTraineeWorkoutStatuses]);

// //     // פונקציה לטעינת תרגילים עבור יום אימון ספציפי
// //     const fetchExercisesForDay = useCallback(async (planDayId: number) => {
// //         setIsLoadingExercisesForDay(true);
// //         try {
// //             const exercisesData: ExercisePlan[] = await exercisePlanApi.getExercisesForPlanDay(planDayId);
// //             setExercisesByPlanDayId(prev => new Map(prev).set(planDayId, exercisesData));
// //         } catch (err) {
// //             console.error(`Failed to fetch exercises for plan day ${planDayId}:`, err);
// //         } finally {
// //             setIsLoadingExercisesForDay(false);
// //         }
// //     }, []);

// //     // פונקציית טוגל להרחבת/כיווץ יום אימון
// //     const toggleDayExpansion = useCallback(async (planDayId: number) => {
// //         if (expandedDayId === planDayId) {
// //             setExpandedDayId(null); // כיווץ
// //         } else {
// //             setExpandedDayId(planDayId); // הרחבה
// //             // אם התרגילים עדיין לא נטענו עבור יום זה, נטען אותם
// //             if (!exercisesByPlanDayId.has(planDayId)) {
// //                 await fetchExercisesForDay(planDayId);
// //             }
// //         }
// //     }, [expandedDayId, exercisesByPlanDayId, fetchExercisesForDay]);

// //     // Function to start a workout for a specific trainee
// //     const handleStartWorkoutForTrainee = async (traineeId: number) => {
// //         const selectedPlan = selectedPlanDayForTrainee.get(traineeId);
// //         if (!selectedPlan) {
// //             alert('אנא בחר יום אימון לפני ההתחלה.');
// //             return;
// //         }

// //         // הגנה נוספת: בדוק אם האימון כבר בוצע השבוע
// //         const activePlanForTrainee = traineeActiveTrainingPlans.get(traineeId);
// //         const correspondingPlanDayInActivePlan = activePlanForTrainee?.planDays?.find(d => d.planDayId === selectedPlan.planDayId);

// //         if (correspondingPlanDayInActivePlan?.isCompletedThisWeek) {
// //             alert(`לא ניתן להתחיל אימון זה. אימון "${selectedPlan.ProgramName}" כבר בוצע השבוע.`);
// //             return;
// //         }

// //         // טען את התרגילים עבור יום האימון שנבחר לפני התחלת האימון, אם הם לא נטענו
// //         let exercisesToUse: ExercisePlan[] | undefined = exercisesByPlanDayId.get(selectedPlan.planDayId);
// //         if (!exercisesToUse || exercisesToUse.length === 0) { // גם אם המערך ריק - ייתכן שיש בעיה
// //             setIsStartingWorkoutForTrainee(traineeId); // כדי להראות מצב טעינה
// //             try {
// //                 exercisesToUse = await exercisePlanApi.getExercisesForPlanDay(selectedPlan.planDayId);
// //                 setExercisesByPlanDayId(prev => new Map(prev).set(selectedPlan.planDayId, exercisesToUse!));
// //                 if (exercisesToUse.length === 0) {
// //                     alert('אין תרגילים מוגדרים ליום אימון זה. לא ניתן להתחיל.');
// //                     setIsStartingWorkoutForTrainee(null);
// //                     return;
// //                 }
// //             } catch (err: any) {
// //                 console.error('Failed to load exercises for selected plan day:', err);
// //                 setError('שגיאה בטעינת תרגילי האימון הנבחר.');
// //                 setIsStartingWorkoutForTrainee(null);
// //                 return;
// //             }
// //             setIsStartingWorkoutForTrainee(null);
// //         }


// //         setIsStartingWorkoutForTrainee(traineeId);
// //         try {
// //             const requestBody = {
// //                 Trainee: traineeId,
// //                 planday: selectedPlan.planDayId,
// //                 StartTime: new Date().toISOString(),
// //                 // אין צורך לשלוח exercisesPlans, כי ה-backend אמור לדעת לשייך לפי plandayId
// //             };
// //             await activeWorkoutApi.startWorkout(requestBody);
// //             const traineeName = allTrainees.find(t => t.traineeId === traineeId)?.traineeName || `ID: ${traineeId}`;
// //             alert(`אימון התחיל עבור מתאמן: ${traineeName}, יום אימון: ${selectedPlan.ProgramName} (יום ${selectedPlan.dayOrder})`);
            
// //             // רענן את הסטטוסים והתוכניות לאחר התחלת אימון
// //             await fetchTraineeWorkoutStatus(traineeId); 
// //             await fetchActiveTrainingPlanForTrainee(traineeId);

// //             // איפוס הסלקט לאחר התחלת האימון
// //             setSelectedPlanDayForTrainee(prev => {
// //                 const newMap = new Map(prev);
// //                 newMap.delete(traineeId);
// //                 return newMap;
// //             });

// //         } catch (err: any) {
// //             console.error('Failed to start workout for trainee:', err);
// //             setError(err.response?.data?.message || err.message || 'שגיאה בהתחלת האימון.');
// //         } finally {
// //             setIsStartingWorkoutForTrainee(null);
// //         }
// //     };

// //     const renderExercisesList = (exercisePlans: ExercisePlan[]) => (
// //         <ul className="space-y-1 text-sm text-gray-700 mt-2">
// //             {exercisePlans
// //                 .sort((a: ExercisePlan, b: ExercisePlan) => a.orderInDay - b.orderInDay)
// //                 .map((exercisePlan: ExercisePlan) => (
// //                     <li key={exercisePlan.exercisePlanId} className="flex items-center">
// //                         <div className="h-2 w-2 bg-gray-400 rounded-full ml-2 flex-shrink-0"></div>
// //                         <span>
// //                             <strong className="font-semibold">{getExerciseName(exercisePlan.exerciseId)}</strong>
// //                             : {exercisePlan.planSets} סטים | {exercisePlan.planRepetitionsMin}-{exercisePlan.planRepetitionsMax} חזרות | {exercisePlan.planWeight} ק"ג
// //                         </span>
// //                     </li>
// //                 ))}
// //         </ul>
// //     );

// //     if (isLoadingInitialData) {
// //         return <div className="text-center py-8 text-gray-500">טוען את כל המתאמנים...</div>;
// //     }

// //     if (error) {
// //         return <div className="text-center text-red-500 py-8"><p>{error}</p></div>;
// //     }

// //     return (
// //         <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg"
// //         >
// //             <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">לוח מחוונים - ניהול אימונים</h1>

// //             {allTrainees.length === 0 && (
// //                 <p className="text-center text-gray-500 text-lg">אין מתאמנים רשומים במערכת.</p>
// //             )}

// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 {allTrainees.map(trainee => {
// //                     const workoutState = traineeWorkoutStates.get(trainee.traineeId);
// //                     const hasActiveWorkout = workoutState !== undefined && workoutState !== null && !workoutState.isWorkoutComplete;
                    
// //                     // שינוי כאן: קבל את ימי האימון מתוך ה-traineeActiveTrainingPlans,
// //                     // שיש לו את הנתונים המלאים כולל isCompletedThisWeek
// //                     const traineeActivePlan = traineeActiveTrainingPlans.get(trainee.traineeId);
// //                     const traineePlans = traineeActivePlan?.planDays || [];

// //                     const currentSelectedPlanDay = selectedPlanDayForTrainee.get(trainee.traineeId);

// //                     const selectedDayExercises = currentSelectedPlanDay ? exercisesByPlanDayId.get(currentSelectedPlanDay.planDayId) : undefined;

// //                     return (
// //                         <motion.div
// //                             key={trainee.traineeId}
// //                             initial={{ opacity: 0, scale: 0.9 }}
// //                             animate={{ opacity: 1, scale: 1 }}
// //                             transition={{ duration: 0.3 }}
// //                             className="bg-white border border-gray-200 rounded-lg shadow-md p-5 relative"
// //                         >
// //                             <h2 className="text-xl font-bold text-gray-800 mb-3">{trainee.traineeName || `מתאמן ID: ${trainee.traineeId}`}</h2>

// //                             {hasActiveWorkout && workoutState ? (
// //                                 <TraineeWorkoutCard
// //                                     workoutData={workoutState}
// //                                     onRemove={() => { /* אין צורך ב-onRemove כאן כי הכרטיס תמיד מוצג */ }}
// //                                 />
// //                             ) : (
// //                                 <>
// //                                     <div className="mt-4">
// //                                         <h3 className="text-md font-semibold text-gray-700 mb-2">התחל אימון חדש:</h3>
// //                                         <Select<SelectOption>
// //                                             options={traineePlans
// //                                                 .filter(p => !p.isCompletedThisWeek) // **סינון ימי אימון שכבר בוצעו השבוע**
// //                                                 .map(p => ({ value: p.planDayId, label: `יום ${p.dayOrder}: ${p.ProgramName || ''}`, data: p }))}
// //                                             onChange={async option => {
// //                                                 setSelectedPlanDayForTrainee(prev => new Map(prev).set(trainee.traineeId, option?.data || null));
// //                                                 setExpandedDayId(null); 

// //                                                 if (option?.data) {
// //                                                     await fetchExercisesForDay(option.data.planDayId);
// //                                                 }
// //                                             }}
// //                                             placeholder="בחר יום אימון..."
// //                                             className="mb-2"
// //                                             value={currentSelectedPlanDay ? { value: currentSelectedPlanDay.planDayId, label: `יום ${currentSelectedPlanDay.dayOrder}: ${currentSelectedPlanDay.ProgramName || ''}`, data: currentSelectedPlanDay } : null}
// //                                             isClearable
// //                                         />

// //                                         {/* הודעה אם כל האימונים השבוע כבר בוצעו */}
// //                                         {traineePlans.every(p => p.isCompletedThisWeek) && (
// //                                             <p className="text-sm text-green-600 mt-2 flex items-center">
// //                                                 <CheckCircle className="h-4 w-4 ml-1" />
// //                                                 כל האימונים השבוע עבור מתאמן זה בוצעו.
// //                                             </p>
// //                                         )}
// //                                         {traineePlans.length === 0 && (
// //                                              <p className="text-sm text-gray-500 mt-2 flex items-center">
// //                                                 <XCircle className="h-4 w-4 ml-1 text-red-500" />
// //                                                 אין תוכנית אימון פעילה או ימי אימון זמינים למתאמן זה.
// //                                             </p>
// //                                         )}


// //                                         {currentSelectedPlanDay && selectedDayExercises && ( 
// //                                             <div className="mt-4 bg-gray-50 p-3 rounded-md border border-gray-200">
// //                                                 <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
// //                                                     <BookText className="h-4 w-4 ml-1" />
// //                                                     תרגילים ליום אימון זה:
// //                                                 </h4>
// //                                                 {renderExercisesList(selectedDayExercises)}
// //                                             </div>
// //                                         )}
// //                                         {currentSelectedPlanDay && isLoadingExercisesForDay && !selectedDayExercises && (
// //                                             <div className="text-center text-gray-500 flex items-center justify-center py-2">
// //                                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
// //                                                 טוען תרגילים עבור היום הנבחר...
// //                                             </div>
// //                                         )}

// //                                         <Button
// //                                             onClick={() => handleStartWorkoutForTrainee(trainee.traineeId)}
// //                                             className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md transition-colors w-full mt-3"
// //                                             disabled={isStartingWorkoutForTrainee === trainee.traineeId || !currentSelectedPlanDay || (selectedDayExercises && selectedDayExercises.length === 0)}
// //                                             icon={isStartingWorkoutForTrainee === trainee.traineeId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
// //                                         >
// //                                             {isStartingWorkoutForTrainee === trainee.traineeId ? 'מתחיל אימון...' : 'התחל אימון'}
// //                                         </Button>
// //                                     </div>

// //                                     {/* --- הצגת ימי אימון זמינים עם אפשרות הרחבה וסטטוס השלמה --- */}
// //                                     {traineePlans.length > 0 && (
// //                                         <div className="mt-6 border-t border-gray-200 pt-4">
// //                                             <h3 className="text-md font-semibold text-gray-700 mb-3">ימי אימון בתוכנית הפעילה:</h3>
// //                                             <div className="space-y-3">
// //                                                 {traineePlans
// //                                                     .sort((a, b) => a.dayOrder - b.dayOrder)
// //                                                     .map(planDay => (
// //                                                         <div key={planDay.planDayId} className="border border-gray-200 rounded-md p-3">
// //                                                             <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDayExpansion(planDay.planDayId)}>
// //                                                                 <h4 className="text-lg font-medium text-gray-800 flex items-center">
// //                                                                     <BookText className="h-5 w-5 ml-2 text-blue-500" />
// //                                                                     יום {planDay.dayOrder}: {planDay.ProgramName}
// //                                                                 </h4>
// //                                                                 <div className="flex items-center">
// //                                                                     {/* **אינדיקציה לסטטוס השלמה השבוע** */}
// //                                                                     {planDay.isCompletedThisWeek ? (
// //                                                                         <span className="text-green-600 text-sm flex items-center ml-2">
// //                                                                             <CheckCircle className="h-4 w-4 ml-1" />
// //                                                                             בוצע השבוע
// //                                                                         </span>
// //                                                                     ) : (
// //                                                                         <span className="text-gray-500 text-sm flex items-center ml-2">
// //                                                                             <XCircle className="h-4 w-4 ml-1" />
// //                                                                             טרם בוצע השבוע
// //                                                                         </span>
// //                                                                     )}
// //                                                                     {expandedDayId === planDay.planDayId ? <ChevronUp className="h-5 w-5 text-gray-500 ml-2" /> : <ChevronDown className="h-5 w-5 text-gray-500 ml-2" />}
// //                                                                 </div>
// //                                                             </div>
// //                                                             {expandedDayId === planDay.planDayId && (
// //                                                                 <motion.div
// //                                                                     initial={{ opacity: 0, height: 0 }}
// //                                                                     animate={{ opacity: 1, height: "auto" }}
// //                                                                     exit={{ opacity: 0, height: 0 }}
// //                                                                     transition={{ duration: 0.3 }}
// //                                                                     className="mt-3 overflow-hidden"
// //                                                                 >
// //                                                                     {isLoadingExercisesForDay && !exercisesByPlanDayId.has(planDay.planDayId) ? (
// //                                                                         <div className="text-center text-gray-500 flex items-center justify-center py-2">
// //                                                                             <Loader2 className="h-4 w-4 animate-spin mr-2" />
// //                                                                             טוען תרגילים...
// //                                                                         </div>
// //                                                                     ) : (
// //                                                                         exercisesByPlanDayId.get(planDay.planDayId) && exercisesByPlanDayId.get(planDay.planDayId)!.length > 0 ? (
// //                                                                             <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
// //                                                                                 <h5 className="font-semibold text-gray-700 mb-2">תרגילים:</h5>
// //                                                                                 {renderExercisesList(exercisesByPlanDayId.get(planDay.planDayId)!)}
// //                                                                             </div>
// //                                                                         ) : (
// //                                                                             <p className="text-gray-500 text-sm mt-2">אין תרגילים מוגדרים ליום זה.</p>
// //                                                                         )
// //                                                                     )}
// //                                                                 </motion.div>
// //                                                             )}
// //                                                         </div>
// //                                                     ))}
// //                                             </div>
// //                                         </div>
// //                                     )}
// //                                 </>
// //                             )}
// //                         </motion.div>
// //                     );
// //                 })}
// //             </div>
// //         </motion.div>
// //     );
// // };

// // export default TraineeDashboardPage;

// // src/pages/TraineeDashboardPage.tsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom'; // 💡 ודא ש-useNavigate מיובא
// import { activeWorkoutApi, traineeApi, trainingPlanApi, exerciseApi, categoryApi, exercisePlanApi } from '../lib/api';
// import { Trainee, PathResult, PlanDay, ExercisePlan, Exercise, Category, ActiveTrainingPlanResponse } from '../types';
// import { motion } from 'framer-motion';
// import Button from '../components/ui/Button';
// import Select from 'react-select';
// import TraineeWorkoutCard from '../components/TraineeWorkoutCard';
// import { Loader2, Play, BookText, ChevronDown, ChevronUp, CheckCircle, XCircle, Home } from 'lucide-react'; // 💡 הוסף Home אייקון

// interface SelectOption {
//     value: number;
//     label: string;
//     data: PlanDay;
// }

// const TraineeDashboardPage: React.FC = () => {
//     const navigate = useNavigate(); // 💡 אתחול useNavigate

//     const [allTrainees, setAllTrainees] = useState<Trainee[]>([]);
//     const [traineeWorkoutStates, setTraineeWorkoutStates] = useState<Map<number, PathResult | null>>(new Map());

//     const [traineeActiveTrainingPlans, setTraineeActiveTrainingPlans] = useState<Map<number, ActiveTrainingPlanResponse | null>>(new Map());

//     const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const [availablePlansForTrainee, setAvailablePlansForTrainee] = useState<Map<number, PlanDay[]>>(new Map());
//     const [selectedPlanDayForTrainee, setSelectedPlanDayForTrainee] = useState<Map<number, PlanDay | null>>(new Map());
//     const [isStartingWorkoutForTrainee, setIsStartingWorkoutForTrainee] = useState<number | null>(null);

//     const [expandedDayId, setExpandedDayId] = useState<number | null>(null);
//     const [isLoadingExercisesForDay, setIsLoadingExercisesForDay] = useState<boolean>(false);
//     const [exercisesByPlanDayId, setExercisesByPlanDayId] = useState<Map<number, ExercisePlan[]>>(new Map());

//     const [allExercisesMap, setAllExercisesMap] = useState<Map<number, Exercise>>(new Map()); 
//     const [categories, setCategories] = useState<Category[]>([]);

//     const getExerciseName = useCallback((exerciseId: number) => {
//         return allExercisesMap.get(exerciseId)?.exerciseName || `תרגיל ${exerciseId}`;
//     }, [allExercisesMap]);

//     const getCategoryName = useCallback((categoryId: number) => {
//         return categories.find(c => c.categoryId === categoryId)?.categoryName || `קטגוריה ${categoryId}`;
//     }, [categories]);

//     useEffect(() => {
//         const fetchAllExercises = async () => {
//             try {
//                 const exercisesData = await exerciseApi.getAll();
//                 const exercisesMap = new Map<number, Exercise>();
//                 exercisesData.forEach((ex: Exercise) => exercisesMap.set(ex.exerciseId, ex));
//                 setAllExercisesMap(exercisesMap);
//             } catch (err) {
//                 console.error("Failed to fetch all exercises:", err);
//             }
//         };
//         fetchAllExercises();
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const trainees = await traineeApi.getAll();
//                 setAllTrainees(trainees);

//                 const initialStates = new Map<number, PathResult | null>();
//                 trainees.forEach((t: Trainee) => initialStates.set(t.traineeId, null));
//                 setTraineeWorkoutStates(initialStates);

//                 const allCategories = await categoryApi.getAll();
//                 setCategories(allCategories);

//                 setIsLoadingInitialData(false);
//                 trainees.forEach((t: Trainee) => fetchActiveTrainingPlanForTrainee(t.traineeId));
//                 fetchAllTraineeWorkoutStatuses(trainees.map((t: Trainee) => t.traineeId));
//             } catch (err: any) {
//                 setError(err.message || 'שגיאה בטעינת רשימת המתאמנים/נתונים כלליים.');
//                 setIsLoadingInitialData(false);
//             }
//         };
//         fetchData();
//     }, []);

//     const fetchActiveTrainingPlanForTrainee = useCallback(async (traineeId: number) => {
//         try {
//             const activePlan = await activeWorkoutApi.getTraineeActiveTrainingPlan(traineeId);
//             setTraineeActiveTrainingPlans(prev => new Map(prev).set(traineeId, activePlan));

//             if (activePlan && activePlan.planDays) {
//                 setAvailablePlansForTrainee(prev => new Map(prev).set(traineeId, activePlan.planDays));
//             } else {
//                 setAvailablePlansForTrainee(prev => {
//                     const newMap = new Map(prev);
//                     newMap.delete(traineeId);
//                     return newMap;
//                 });
//             }
//         } catch (err: any) {
//             if (err.response && err.response.status === 404) {
//                 console.log(`No active training plan for trainee ${traineeId}.`);
//                 setTraineeActiveTrainingPlans(prev => new Map(prev).set(traineeId, null));
//                 setAvailablePlansForTrainee(prev => {
//                     const newMap = new Map(prev);
//                     newMap.delete(traineeId);
//                     return newMap;
//                 });
//             } else {
//                 console.error(`Error fetching active training plan for trainee ${traineeId}:`, err);
//             }
//         }
//     }, []);

//     const fetchTraineeWorkoutStatus = useCallback(async (traineeId: number) => {
//         try {
//             const updatedPlan: PathResult = await activeWorkoutApi.getUpdatedWorkoutPlan(traineeId);
//             setTraineeWorkoutStates(prev => new Map(prev).set(traineeId, updatedPlan));
//             if (!updatedPlan.isWorkoutComplete) {
//                 setAvailablePlansForTrainee(prev => {
//                     const newMap = new Map(prev);
//                     newMap.delete(traineeId);
//                     return newMap;
//                 });
//                 setSelectedPlanDayForTrainee(prev => {
//                     const newMap = new Map(prev);
//                     newMap.delete(traineeId);
//                     return newMap;
//                 });
//             } else {
//                 fetchActiveTrainingPlanForTrainee(traineeId);
//             }
//         } catch (err: any) {
//             if (err.response && err.response.status === 404) {
//                 setTraineeWorkoutStates(prev => new Map(prev).set(traineeId, null));
//                 fetchActiveTrainingPlanForTrainee(traineeId);
//             } else {
//                 console.error(`Error fetching workout status for trainee ${traineeId}:`, err);
//             }
//         }
//     }, [fetchActiveTrainingPlanForTrainee]); 

//     const fetchAllTraineeWorkoutStatuses = useCallback(async (traineeIds: number[]) => {
//         await Promise.all(traineeIds.map(id => fetchTraineeWorkoutStatus(id)));
//     }, [fetchTraineeWorkoutStatus]);

//     useEffect(() => {
//         if (allTrainees.length > 0) {
//             const interval = setInterval(() => {
//                 fetchAllTraineeWorkoutStatuses(allTrainees.map(t => t.traineeId));
//             }, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [allTrainees, fetchAllTraineeWorkoutStatuses]);

//     const fetchExercisesForDay = useCallback(async (planDayId: number) => {
//         setIsLoadingExercisesForDay(true);
//         try {
//             const exercisesData: ExercisePlan[] = await exercisePlanApi.getExercisesForPlanDay(planDayId);
//             setExercisesByPlanDayId(prev => new Map(prev).set(planDayId, exercisesData));
//         } catch (err) {
//             console.error(`Failed to fetch exercises for plan day ${planDayId}:`, err);
//         } finally {
//             setIsLoadingExercisesForDay(false);
//         }
//     }, []);

//     const toggleDayExpansion = useCallback(async (planDayId: number) => {
//         if (expandedDayId === planDayId) {
//             setExpandedDayId(null);
//         } else {
//             setExpandedDayId(planDayId);
//             if (!exercisesByPlanDayId.has(planDayId)) {
//                 await fetchExercisesForDay(planDayId);
//             }
//         }
//     }, [expandedDayId, exercisesByPlanDayId, fetchExercisesForDay]);

//     const handleStartWorkoutForTrainee = async (traineeId: number) => {
//         const selectedPlan = selectedPlanDayForTrainee.get(traineeId);
//         if (!selectedPlan) {
//             alert('אנא בחר יום אימון לפני ההתחלה.');
//             return;
//         }

//         const activePlanForTrainee = traineeActiveTrainingPlans.get(traineeId);
//         const correspondingPlanDayInActivePlan = activePlanForTrainee?.planDays?.find(d => d.planDayId === selectedPlan.planDayId);

//         if (correspondingPlanDayInActivePlan?.isCompletedThisWeek) {
//             alert(`לא ניתן להתחיל אימון זה. אימון "${selectedPlan.ProgramName}" כבר בוצע השבוע.`);
//             return;
//         }

//         let exercisesToUse: ExercisePlan[] | undefined = exercisesByPlanDayId.get(selectedPlan.planDayId);
//         if (!exercisesToUse || exercisesToUse.length === 0) {
//             setIsStartingWorkoutForTrainee(traineeId);
//             try {
//                 exercisesToUse = await exercisePlanApi.getExercisesForPlanDay(selectedPlan.planDayId);
//                 setExercisesByPlanDayId(prev => new Map(prev).set(selectedPlan.planDayId, exercisesToUse!));
//                 if (exercisesToUse.length === 0) {
//                     alert('אין תרגילים מוגדרים ליום אימון זה. לא ניתן להתחיל.');
//                     setIsStartingWorkoutForTrainee(null);
//                     return;
//                 }
//             } catch (err: any) {
//                 console.error('Failed to load exercises for selected plan day:', err);
//                 setError('שגיאה בטעינת תרגילי האימון הנבחר.');
//                 setIsStartingWorkoutForTrainee(null);
//                 return;
//             }
//             setIsStartingWorkoutForTrainee(null);
//         }

//         setIsStartingWorkoutForTrainee(traineeId);
//         try {
//             const requestBody = {
//                 Trainee: traineeId,
//                 planday: selectedPlan.planDayId,
//                 StartTime: new Date().toISOString(),
//             };
//             await activeWorkoutApi.startWorkout(requestBody);
//             const traineeName = allTrainees.find(t => t.traineeId === traineeId)?.traineeName || `ID: ${traineeId}`;
//             alert(`אימון התחיל עבור מתאמן: ${traineeName}, יום אימון: ${selectedPlan.ProgramName} (יום ${selectedPlan.dayOrder})`);
            
//             await fetchTraineeWorkoutStatus(traineeId); 
//             await fetchActiveTrainingPlanForTrainee(traineeId);

//             setSelectedPlanDayForTrainee(prev => {
//                 const newMap = new Map(prev);
//                 newMap.delete(traineeId);
//                 return newMap;
//             });

//         } catch (err: any) {
//             console.error('Failed to start workout for trainee:', err);
//             setError(err.response?.data?.message || err.message || 'שגיאה בהתחלת האימון.');
//         } finally {
//             setIsStartingWorkoutForTrainee(null);
//         }
//     };

//     const renderExercisesList = (exercisePlans: ExercisePlan[]) => (
//         <ul className="space-y-1 text-sm text-gray-700 mt-2">
//             {exercisePlans
//                 .sort((a: ExercisePlan, b: ExercisePlan) => a.orderInDay - b.orderInDay)
//                 .map((exercisePlan: ExercisePlan) => (
//                     <li key={exercisePlan.exercisePlanId} className="flex items-center">
//                         <div className="h-2 w-2 bg-gray-400 rounded-full ml-2 flex-shrink-0"></div>
//                         <span>
//                             <strong className="font-semibold">{getExerciseName(exercisePlan.exerciseId)}</strong>
//                             : {exercisePlan.planSets} סטים | {exercisePlan.planRepetitionsMin}-{exercisePlan.planRepetitionsMax} חזרות | {exercisePlan.planWeight} ק"ג
//                         </span>
//                     </li>
//                 ))}
//         </ul>
//     );

//     // 💡 פונקציה לניווט לדף הבית
//     const handleGoHome = () => {
//         navigate('/');
//     };

//     if (isLoadingInitialData) {
//         return <div className="text-center py-8 text-gray-500">טוען את כל המתאמנים...</div>;
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
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold text-gray-800">לוח מחוונים - ניהול אימונים</h1>
//                 {/* 💡 כפתור חזרה לדף הבית */}
//                 <Button 
//                     onClick={handleGoHome} 
//                     variant="outline" 
//                     icon={<Home className="h-4 w-4" />}
//                 >
//                     חזור לדף הבית
//                 </Button>
//             </div>

//             {allTrainees.length === 0 && (
//                 <p className="text-center text-gray-500 text-lg">אין מתאמנים רשומים במערכת.</p>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {allTrainees.map(trainee => {
//                     const workoutState = traineeWorkoutStates.get(trainee.traineeId);
//                     const hasActiveWorkout = workoutState !== undefined && workoutState !== null && !workoutState.isWorkoutComplete;
                    
//                     const traineeActivePlan = traineeActiveTrainingPlans.get(trainee.traineeId);
//                     const traineePlans = traineeActivePlan?.planDays || [];

//                     const currentSelectedPlanDay = selectedPlanDayForTrainee.get(trainee.traineeId);

//                     const selectedDayExercises = currentSelectedPlanDay ? exercisesByPlanDayId.get(currentSelectedPlanDay.planDayId) : undefined;

//                     return (
//                         <motion.div
//                             key={trainee.traineeId}
//                             initial={{ opacity: 0, scale: 0.9 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 0.3 }}
//                             className="bg-white border border-gray-200 rounded-lg shadow-md p-5 relative"
//                         >
//                             <h2 className="text-xl font-bold text-gray-800 mb-3">{trainee.traineeName || `מתאמן ID: ${trainee.traineeId}`}</h2>

//                             {hasActiveWorkout && workoutState ? (
//                                 <TraineeWorkoutCard
//                                     workoutData={workoutState}
//                                     onRemove={() => { /* אין צורך ב-onRemove כאן כי הכרטיס תמיד מוצג */ }}
//                                 />
//                             ) : (
//                                 <>
//                                     <div className="mt-4">
//                                         <h3 className="text-md font-semibold text-gray-700 mb-2">התחל אימון חדש</h3>
//                                         <Select<SelectOption>
//                                             options={traineePlans
//                                                 .filter(p => !p.isCompletedThisWeek) 
//                                                 .map(p => ({ value: p.planDayId, label: `יום ${p.dayOrder} ${p.ProgramName || ''}`, data: p }))}
//                                             onChange={async option => {
//                                                 setSelectedPlanDayForTrainee(prev => new Map(prev).set(trainee.traineeId, option?.data || null));
//                                                 setExpandedDayId(null); 

//                                                 if (option?.data) {
//                                                     await fetchExercisesForDay(option.data.planDayId);
//                                                 }
//                                             }}
//                                             placeholder="בחר יום אימון..."
//                                             className="mb-2"
//                                             value={currentSelectedPlanDay ? { value: currentSelectedPlanDay.planDayId, label: `יום ${currentSelectedPlanDay.dayOrder}: ${currentSelectedPlanDay.ProgramName || ''}`, data: currentSelectedPlanDay } : null}
//                                             isClearable
//                                         />

//                                         {traineePlans.every(p => p.isCompletedThisWeek) && (
//                                             <p className="text-sm text-green-600 mt-2 flex items-center">
//                                                 <CheckCircle className="h-4 w-4 ml-1" />
//                                                 כל האימונים השבוע עבור מתאמן זה בוצעו.
//                                             </p>
//                                         )}
//                                         {traineePlans.length === 0 && (
//                                              <p className="text-sm text-gray-500 mt-2 flex items-center">
//                                                 <XCircle className="h-4 w-4 ml-1 text-red-500" />
//                                                 אין תוכנית אימון פעילה או ימי אימון זמינים למתאמן זה.
//                                             </p>
//                                         )}

//                                         {currentSelectedPlanDay && selectedDayExercises && ( 
//                                             <div className="mt-4 bg-gray-50 p-3 rounded-md border border-gray-200">
//                                                 <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
//                                                     <BookText className="h-4 w-4 ml-1" />
//                                                     תרגילים ליום אימון זה
//                                                 </h4>
//                                                 {renderExercisesList(selectedDayExercises)}
//                                             </div>
//                                         )}
//                                         {currentSelectedPlanDay && isLoadingExercisesForDay && !selectedDayExercises && (
//                                             <div className="text-center text-gray-500 flex items-center justify-center py-2">
//                                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                                 טוען תרגילים עבור היום הנבחר...
//                                             </div>
//                                         )}

//                                         <Button
//                                             onClick={() => handleStartWorkoutForTrainee(trainee.traineeId)}
//                                             className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md transition-colors w-full mt-3"
//                                             disabled={isStartingWorkoutForTrainee === trainee.traineeId || !currentSelectedPlanDay || (selectedDayExercises && selectedDayExercises.length === 0)}
//                                             icon={isStartingWorkoutForTrainee === trainee.traineeId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
//                                         >
//                                             {isStartingWorkoutForTrainee === trainee.traineeId ? 'מתחיל אימון...' : 'התחל אימון'}
//                                         </Button>
//                                     </div>

//                                     {traineePlans.length > 0 && (
//                                         <div className="mt-6 border-t border-gray-200 pt-4">
//                                             <h3 className="text-md font-semibold text-gray-700 mb-3">ימי אימון בתוכנית הפעילה</h3>
//                                             <div className="space-y-3">
//                                                 {traineePlans
//                                                     .sort((a, b) => a.dayOrder - b.dayOrder)
//                                                     .map(planDay => (
//                                                         <div key={planDay.planDayId} className="border border-gray-200 rounded-md p-3">
//                                                             <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDayExpansion(planDay.planDayId)}>
//                                                                 <h4 className="text-lg font-medium text-gray-800 flex items-center">
//                                                                     <BookText className="h-5 w-5 ml-2 text-blue-500" />
//                                                                     יום {planDay.dayOrder} {planDay.ProgramName}
//                                                                 </h4>
//                                                                 <div className="flex items-center">
//                                                                     {planDay.isCompletedThisWeek ? (
//                                                                         <span className="text-green-600 text-sm flex items-center ml-2">
//                                                                             <CheckCircle className="h-4 w-4 ml-1" />
//                                                                             בוצע השבוע
//                                                                         </span>
//                                                                     ) : (
//                                                                         <span className="text-gray-500 text-sm flex items-center ml-2">
//                                                                             <XCircle className="h-4 w-4 ml-1" />
//                                                                             טרם בוצע השבוע
//                                                                         </span>
//                                                                     )}
//                                                                     {expandedDayId === planDay.planDayId ? <ChevronUp className="h-5 w-5 text-gray-500 ml-2" /> : <ChevronDown className="h-5 w-5 text-gray-500 ml-2" />}
//                                                                 </div>
//                                                             </div>
//                                                             {expandedDayId === planDay.planDayId && (
//                                                                 <motion.div
//                                                                     initial={{ opacity: 0, height: 0 }}
//                                                                     animate={{ opacity: 1, height: "auto" }}
//                                                                     exit={{ opacity: 0, height: 0 }}
//                                                                     transition={{ duration: 0.3 }}
//                                                                     className="mt-3 overflow-hidden"
//                                                                 >
//                                                                     {isLoadingExercisesForDay && !exercisesByPlanDayId.has(planDay.planDayId) ? (
//                                                                         <div className="text-center text-gray-500 flex items-center justify-center py-2">
//                                                                             <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                                                             טוען תרגילים...
//                                                                         </div>
//                                                                     ) : (
//                                                                         exercisesByPlanDayId.get(planDay.planDayId) && exercisesByPlanDayId.get(planDay.planDayId)!.length > 0 ? (
//                                                                             <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
//                                                                                 <h5 className="font-semibold text-gray-700 mb-2">תרגילים:</h5>
//                                                                                 {renderExercisesList(exercisesByPlanDayId.get(planDay.planDayId)!)}
//                                                                             </div>
//                                                                         ) : (
//                                                                             <p className="text-gray-500 text-sm mt-2">אין תרגילים מוגדרים ליום זה.</p>
//                                                                         )
//                                                                     )}
//                                                                 </motion.div>
//                                                             )}
//                                                         </div>
//                                                     ))}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </>
//                             )}
//                         </motion.div>
//                     );
//                 })}
//             </div>
//         </motion.div>
//     );
// };

// export default TraineeDashboardPage;

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