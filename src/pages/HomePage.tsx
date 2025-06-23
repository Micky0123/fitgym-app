// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { motion } from 'framer-motion';
// // // // // import { Play, Calendar, History, Edit, ChevronUp, ChevronDown } from 'lucide-react';
// // // // // import Button from '../components/ui/Button';
// // // // // import { useAuthStore } from '../store/authStore';
// // // // // import { getImageUrl } from '../lib/utils';
// // // // // import { trainingPlanApi, authApi } from '../lib/api';
// // // // // import { activeWorkoutApi } from '../lib/api'; // <--- ייבוא חדש
// // // // // // Import ALL necessary types from your types.ts file
// // // // // import {PathResult, TrainingPlan, FitnessLevel, Goal, TrainingDuration, PlanDay, ActiveTrainingPlanResponse, MultiplePlansResponseItem, Trainee } from '../types';

// // // // // // REMOVE these duplicate type definitions, they belong in types.ts
// // // // // // type SingleTrainingPlanResponse = {
// // // // // //   trainingPlan: TrainingPlan | null;
// // // // // //   planDays: PlanDay[];
// // // // // // };
// // // // // // type MultiplePlansResponseItem = {
// // // // // //   trainingPlan: TrainingPlan;
// // // // // //   planDays: PlanDay[];
// // // // // // };

// // // // // const HomePage: React.FC = () => {
// // // // //   const { user } = useAuthStore();
// // // // //   const navigate = useNavigate();

// // // // //   // Primary states
// // // // //   const [activeSection, setActiveSection] = useState<'current' | 'history'>('current');
// // // // //   // activePlanData will directly hold the TrainingPlan object (including PlanDays) or null
// // // // //   // This type is now correct: it expects what the API function promises.
// // // // //   const [activePlanData, setActivePlanData] = useState<ActiveTrainingPlanResponse>(null); // <-- Corrected type!
// // // // //   // historyPlans will hold a list of wrapper objects
// // // // //   const [historyPlansData, setHistoryPlansData] = useState<MultiplePlansResponseItem[]>([]);

// // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // //   const [error, setError] = useState<string | null>(null);

// // // // //   // States for dynamic options from API (no change here)
// // // // //   const [fitnessLevels, setFitnessLevels] = useState<FitnessLevel[]>([]);
// // // // //   const [goals, setGoals] = useState<Goal[]>([]);
// // // // //   const [durations, setDurations] = useState<TrainingDuration[]>([]);

// // // // //   // State for managing expanded plan (to show plan days)
// // // // //   const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null);

// // // // //   // Fetch plans (active and historical)
// // // // //   const fetchPlans = async () => {
// // // // //     if (!user?.traineeId) return;
// // // // //     try {
// // // // //       setIsLoading(true);
// // // // //       setError(null);

// // // // //       // Fetch active plan:
// // // // //       // We need a specific try-catch for the active plan because a 404 (Not Found)
// // // // //       // from the backend means "no active plan," which is not an error we want to
// // // // //       // display as a general fetch error.
// // // // //       let activePlanResult: ActiveTrainingPlanResponse = null;
// // // // //       try {
// // // // //         activePlanResult = await trainingPlanApi.getActivePlans(user.traineeId);
// // // // //       } catch (activeErr: any) {
// // // // //         // If the backend returns 404, it means no active plan was found.
// // // // //         // We catch this specifically and set activePlanResult to null,
// // // // //         // which will trigger the "No active plan found" message.
// // // // //         if (activeErr.response && activeErr.response.status === 404) {
// // // // //           console.log("No active training plan found (HTTP 404). This is expected behavior.");
// // // // //           activePlanResult = null; // Successfully handled "no plan found" scenario
// // // // //         } else {
// // // // //           // For other types of errors (e.g., network issues, 500 server error),
// // // // //           // we'll log it and let the general error state handle it.
// // // // //           console.error("Error fetching active plan:", activeErr);
// // // // //           setError(activeErr?.message || 'שגיאה בטעינת התוכנית הפעילה');
// // // // //           activePlanResult = null; // Ensure null state for rendering
// // // // //         }
// // // // //       }

// // // // //       // Fetch history plans:
// // // // //       // This is generally less prone to a "not found" scenario resulting in a 404,
// // // // //       // as an empty array is a valid response for no history.
// // // // //       const historyResponse = await trainingPlanApi.getHistoryPlans(user.traineeId);

// // // // //       // Now set the states with the correctly fetched/handled data
// // // // //       setActivePlanData(activePlanResult); // activePlanResult is already TrainingPlan or null
// // // // //       setHistoryPlansData(historyResponse || []); // Ensure it's always an array

// // // // //     } catch (err: any) { // This catch block will handle general errors or errors from historyPromise
// // // // //       console.error("General error fetching plans:", err);
// // // // //       setError(err?.message || 'שגיאה כללית בטעינת התוכניות');
// // // // //       setActivePlanData(null);
// // // // //       setHistoryPlansData([]);
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // ... (fetchOptions, useEffects, getLevelName, getGoalName, getDurationName remain unchanged)
// // // // //   useEffect(() => {
// // // // //     const fetchOptions = async () => {
// // // // //       try {
// // // // //         const [levels, goals, durations] = await Promise.all([
// // // // //           authApi.getFitnessLevels(),
// // // // //           authApi.getGoals(),
// // // // //           authApi.getTrainingDurations()
// // // // //         ]);
// // // // //         setFitnessLevels(levels);
// // // // //         setGoals(goals);
// // // // //         setDurations(durations);
// // // // //       } catch (err) {
// // // // //         console.error("Error fetching options:", err);
// // // // //       }
// // // // //     };
// // // // //     fetchOptions();
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     fetchPlans();
// // // // //   }, [user?.traineeId]);


// // // // //   const getLevelName = (id: number) =>
// // // // //     fitnessLevels.find((l) => l.fitnessLevelId === id)?.fitnessLevelName || '';
// // // // //   const getGoalName = (id: number) =>
// // // // //     goals.find((g) => g.goalId === id)?.goalName || '';
// // // // //   const getDurationName = (id: number) => {
// // // // //     const duration = durations.find((d) => d.trainingDurationId === id);
// // // // //     return duration ? `${duration.timeTrainingDuration} דקות` : '';
// // // // //   };

// // // // //   // const startWorkout = (planDayId: number) => {
// // // // //   //   navigate(`/workout/${planDayId}`);
// // // // //   // };

// // // // //   //   // --- שינוי כאן: הפעלת אימון דרך ה-API ---
// // // // //   // const startWorkout = async (planDayId: number) => {
// // // // //   //   if (!user?.traineeId) {
// // // // //   //     alert('שגיאה: מזהה מתאמן לא נמצא.');
// // // // //   //     return;
// // // // //   //   }

// // // // //   //   try {
// // // // //   //     // קודם כל, נביא את פרטי המתאמן כדי לשלוח אותם ל-API
// // // // //   //     const traineeDetails: Trainee = await activeWorkoutApi.getTraineeById(user.traineeId);
      
// // // // //   //     const requestBody = {
// // // // //   //       Trainee: traineeDetails.traineeId, // ה-API מצפה ל-TraineeDTO מלא
// // // // //   //       planday: planDayId,
// // // // //   //       //StartTime: new Date().toISOString(), // זמן נוכחי בפורמט ISO
// // // // //   //       StartTime: "2025-06-15T07:16:03.889Z", // זמן נוכחי בפורמט ISO
// // // // //   //     };
      
// // // // //   //     await activeWorkoutApi.startWorkout(requestBody);
// // // // //   //     // אם הצליח, נווט לדף האימון עם ה-planDayId
// // // // //   //     navigate(`/WorkoutPage/${planDayId}`);
// // // // //   //   }  catch (err: any) {
// // // // //   //   console.error('Failed to start workout:', err);
// // // // //   //   if (err.response) {
// // // // //   //       // הדפס את תגובת השגיאה המלאה מהשרת
// // // // //   //       console.error('Server error details:', err.response.data);
// // // // //   //       alert(`שגיאה בהתחלת האימון: ${JSON.stringify(err.response.data)}`);
// // // // //   //   } else {
// // // // //   //       alert(`שגיאה בהתחלת האימון: ${err.message}`);
// // // // //   //   }
// // // // //   // }
// // // // //  // };

// // // // //   const startWorkout = async (planDayId: number) => {
// // // // //     if (!user?.traineeId) {
// // // // //       alert('שגיאה: מזהה מתאמן לא נמצא. אנא התחבר מחדש.');
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       // 1. נביא את פרטי המתאמן המלאים מה-Backend
// // // // //       // זה חשוב כי ה-Backend מצפה ל-TraineeDTO מלא, לא רק ל-ID
// // // // //       const traineeDetails: Trainee = await activeWorkoutApi.getTraineeById(user.traineeId);

// // // // //       // 2. נגדיר את ה-requestBody כפי שה-Backend מצפה ב-StartWorkout
// // // // //       // ה-Backend שלך מצפה ל-TraineeDTO, לרשימת ExercisePlanDTO, לזמן התחלה ול-planDayId
// // // // //       // נצטרך לשלוף את ה-ExercisePlanDTOs מתוך ה-planDay שהתקבל ב-activePlanData
// // // // //       const selectedPlanDay = activePlanData?.planDays.find(day => day.planDayId === planDayId);

// // // // //       if (!selectedPlanDay) {
// // // // //         throw new Error('פרטי יום האימון לא נמצאו עבור התוכנית הפעילה.');
// // // // //       }

// // // // //       // נמיר את ה-PlanDayDTO ואת רשימת ה-ExercisePlanDTOs שלו לפורמט שה-Backend מצפה
// // // // //       // שימי לב: הקוד ב-C# שלך ל-StartWorkoutAsync מצפה ל-TraineeDTO, List<ExercisePlanDTO>, DateTime, int
// // // // //       // אנחנו צריכים לוודא שה-Frontend שולח את זה נכון.
// // // // //       // אם ה-ExercisePlanDTO כבר נמצא בתוך ה-PlanDayDTO, צריך לשלוף אותו משם.
// // // // //       // מתוך ה-Backend: public async Task<PathResult> StartWorkoutAsync(TraineeDTO trainee, List<ExercisePlanDTO> exerciseOrder, DateTime startTime, int planDayId)
// // // // //       const requestBodyForStartWorkout = {
// // // // //         Trainee: traineeDetails.traineeId, // רק ה-ID של המתאמן
// // // // //         planday: planDayId,
// // // // //         StartTime: new Date().toISOString(), // זמן נוכחי בפורמט ISO 8601
// // // // //       };

// // // // //       // 3. קריאה ל-API של התחלת אימון
// // // // //       // הפונקציה startWorkout ב-API הלקוח שלך צריכה לקבל את requestBody הזה.
// // // // //       const pathResult: PathResult = await activeWorkoutApi.startWorkout(requestBodyForStartWorkout);

// // // // //       // 4. אם הצליח, נווט לדף האימון עם ה-planDayId
// // // // //       // או אולי עם ה-traineeId אם דף האימון מסתמך על זה
// // // // //       navigate(`/workoutpage/${planDayId}`); // או `/workoutpage/${user.traineeId}` אם תצוגת האימון תלויה בזה
// // // // //     } catch (err: any) {
// // // // //       console.error('Failed to start workout:', err);
// // // // //       if (err.response) {
// // // // //         console.error('Server error details:', err.response.data);
// // // // //         alert(`שגיאה בהתחלת האימון: ${typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data)}`);
// // // // //       } else {
// // // // //         alert(`שגיאה בהתחלת האימון: ${err.message || 'שגיאה לא ידועה'}`);
// // // // //       }
// // // // //     }
// // // // //   // --- סוף שינוי ---

// // // // //   const togglePlanExpansion = (planId: number) => {
// // // // //     setExpandedPlanId(expandedPlanId === planId ? null : planId);
// // // // //   };

// // // // //   // Render a single plan card (reusable function)
// // // // //   // This function is still good, as it expects a plan and planDays separately.
// // // // //   const renderPlanCard = (plan: TrainingPlan, planDays: PlanDay[], isCurrent: boolean) => (
// // // // //     <motion.div
// // // // //       key={plan.trainingPlanId}
// // // // //       initial={{ opacity: 0, scale: 0.9 }}
// // // // //       animate={{ opacity: 1, scale: 1 }}
// // // // //       transition={{ duration: 0.3 }}
// // // // //       className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
// // // // //     >
// // // // //       <div
// // // // //         className="h-40 bg-cover bg-center"
// // // // //         style={{ backgroundImage: `url(${getImageUrl('default')})` }}
// // // // //       ></div>
// // // // //       <div className="p-4">
// // // // //         <h3 className="text-lg font-medium text-gray-900">
// // // // //           {`תוכנית ל-${getGoalName(plan.goalId)}`}
// // // // //         </h3>
// // // // //         <p className="text-sm text-gray-500 mt-1">
// // // // //           {`אימון ל-${plan.trainingDays} ימים בשבוע`}
// // // // //         </p>
// // // // //         <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
// // // // //           <div>
// // // // //             <span className="font-medium">רמה:</span> {getLevelName(plan.fitnessLevelId)}
// // // // //           </div>
// // // // //           <div>
// // // // //             <span className="font-medium">זמן:</span> {getDurationName(plan.trainingDurationId)}
// // // // //           </div>
// // // // //           <div>
// // // // //             <span className="font-medium">התחלה:</span> {new Date(plan.startDate).toLocaleDateString('he-IL')}
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="mt-4">
// // // // //           <Button
// // // // //             onClick={() => togglePlanExpansion(plan.trainingPlanId)}
// // // // //             variant="ghost"
// // // // //             fullWidth
// // // // //             className="justify-between text-blue-600 hover:text-blue-700"
// // // // //             icon={expandedPlanId === plan.trainingPlanId ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
// // // // //           >
// // // // //             {expandedPlanId === plan.trainingPlanId ? 'הסתר ימי אימון' : 'הצג ימי אימון'}
// // // // //           </Button>
// // // // //         </div>

// // // // //         {expandedPlanId === plan.trainingPlanId && planDays && planDays.length > 0 && (
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, height: 0 }}
// // // // //             animate={{ opacity: 1, height: 'auto' }}
// // // // //             transition={{ duration: 0.3 }}
// // // // //             className="mt-4 border-t pt-4"
// // // // //           >
// // // // //             <h4 className="font-medium text-gray-800 mb-2">ימי אימון:</h4>
// // // // //             <div className="space-y-2">
// // // // //               {planDays
// // // // //                 .sort((a, b) => a.dayOrder - b.dayOrder)
// // // // //                 .map((day) => (
// // // // //                   <div key={day.planDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
// // // // //                     <span className="text-gray-700">{`יום ${day.dayOrder}: ${day.programName}`}</span>
// // // // //                     {isCurrent && (
// // // // //                       <Button
// // // // //                         onClick={() => startWorkout(day.planDayId)}
// // // // //                         size="sm"
// // // // //                         icon={<Play className="h-4 w-4" />}
// // // // //                       >
// // // // //                         התחל
// // // // //                       </Button>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 ))}
// // // // //             </div>
// // // // //           </motion.div>
// // // // //         )}
// // // // //       </div>
// // // // //     </motion.div>
// // // // //   );
  
// // // // //   return (
// // // // //     <div className="space-y-8">
// // // // //       <motion.div
// // // // //         initial={{ opacity: 0, y: 20 }}
// // // // //         animate={{ opacity: 1, y: 0 }}
// // // // //         transition={{ duration: 0.5 }}
// // // // //       >
// // // // //         {/* User welcome section */}
// // // // //         <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
// // // // //           <div className="px-4 py-5 sm:px-6">
// // // // //             <h2 className="text-xl font-medium text-gray-900">
// // // // //               שלום, {user?.traineeName}
// // // // //             </h2>
// // // // //             <p className="mt-1 max-w-2xl text-sm text-gray-500">
// // // // //               ברוך הבא למערכת האימונים שלך
// // // // //             </p>
// // // // //           </div>
// // // // //           <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
// // // // //             <div className="flex space-x-4 space-x-reverse">
// // // // //               <Button
// // // // //                 variant="outline"
// // // // //                 onClick={() => navigate('/profile')}
// // // // //                 icon={<Edit className="h-4 w-4" />}
// // // // //               >
// // // // //                 עדכון פרטים אישיים
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Plans display section */}
// // // // //         <div className="bg-white shadow sm:rounded-lg overflow-hidden">
// // // // //           <div className="border-b border-gray-200">
// // // // //             <nav className="flex">
// // // // //               <button
// // // // //                 onClick={() => setActiveSection('current')}
// // // // //                 className={`px-6 py-4 text-center text-sm font-medium ${
// // // // //                   activeSection === 'current'
// // // // //                     ? 'border-b-2 border-blue-500 text-blue-600'
// // // // //                     : 'text-gray-500 hover:text-gray-700'
// // // // //                 }`}
// // // // //               >
// // // // //                 <div className="flex items-center">
// // // // //                   <Calendar className="h-4 w-4 ml-2" />
// // // // //                   <span>תוכנית אימון נוכחית</span>
// // // // //                 </div>
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={() => setActiveSection('history')}
// // // // //                 className={`px-6 py-4 text-center text-sm font-medium ${
// // // // //                   activeSection === 'history'
// // // // //                     ? 'border-b-2 border-blue-500 text-blue-600'
// // // // //                     : 'text-gray-500 hover:text-gray-700'
// // // // //                 }`}
// // // // //               >
// // // // //                 <div className="flex items-center">
// // // // //                   <History className="h-4 w-4 ml-2" />
// // // // //                   <span>היסטוריית אימונים</span>
// // // // //                 </div>
// // // // //               </button>
// // // // //             </nav>
// // // // //           </div>

// // // // //           <div className="p-4 sm:p-6">
// // // // //             {isLoading ? (
// // // // //               <div className="text-center py-8 text-gray-500">טוען...</div>
// // // // //             ) : error ? (
// // // // //               <div className="text-center text-red-500 py-8">{error}</div>
// // // // //             ) : activeSection === 'current' ? (
// // // // //               // Render active plan
// // // // //               // activePlanData is directly TrainingPlan | null now
// // // // //               activePlanData ? (
// // // // //                 // If activePlanData exists, it's a TrainingPlan object
// // // // //                 renderPlanCard(activePlanData, activePlanData.planDays, true)
// // // // //               ) : (
// // // // //                 <div className="text-center py-8 text-gray-500">לא נמצאה תוכנית אימון פעילה.</div>
// // // // //               )
// // // // //             ) : (
// // // // //               // Render historical plans
// // // // //               historyPlansData.length === 0 ? (
// // // // //                 <div className="text-center py-8 text-gray-500">לא נמצאו תוכניות אימון היסטוריות.</div>
// // // // //               ) : (
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //                   {historyPlansData.map((planData) =>
// // // // //                     renderPlanCard(planData.trainingPlan, planData.planDays, false)
// // // // //                   )}
// // // // //                 </div>
// // // // //               )
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </motion.div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default HomePage;



// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { motion } from 'framer-motion';
// // // // // import { Play, Calendar, History, Edit, ChevronUp, ChevronDown } from 'lucide-react';
// // // // // import Button from '../components/ui/Button';
// // // // // import { useAuthStore } from '../store/authStore';
// // // // // import { getImageUrl } from '../lib/utils';
// // // // // import { trainingPlanApi, authApi } from '../lib/api';
// // // // // import { activeWorkoutApi } from '../lib/api';
// // // // // // Import ALL necessary types from your types.ts file
// // // // // import { TrainingPlan, FitnessLevel, Goal, TrainingDuration, PlanDay, ActiveTrainingPlanResponse, MultiplePlansResponseItem, Trainee } from '../types';


// // // // // const HomePage: React.FC = () => {
// // // // //   const { user } = useAuthStore();
// // // // //   const navigate = useNavigate();

// // // // //   // Primary states
// // // // //   const [activeSection, setActiveSection] = useState<'current' | 'history'>('current');
// // // // //   const [activePlanData, setActivePlanData] = useState<ActiveTrainingPlanResponse>(null);
// // // // //   const [historyPlansData, setHistoryPlansData] = useState<MultiplePlansResponseItem[]>([]);

// // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // //   const [error, setError] = useState<string | null>(null);

// // // // //   // States for dynamic options from API
// // // // //   const [fitnessLevels, setFitnessLevels] = useState<FitnessLevel[]>([]);
// // // // //   const [goals, setGoals] = useState<Goal[]>([]);
// // // // //   const [durations, setDurations] = useState<TrainingDuration[]>([]);

// // // // //   // State for managing expanded plan (to show plan days)
// // // // //   const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null);

// // // // //   // Fetch plans (active and historical)
// // // // //   const fetchPlans = async () => {
// // // // //     if (!user?.traineeId) return;
// // // // //     try {
// // // // //       setIsLoading(true);
// // // // //       setError(null);

// // // // //       let activePlanResult: ActiveTrainingPlanResponse = null;
// // // // //       try {
// // // // //         activePlanResult = await trainingPlanApi.getActivePlans(user.traineeId);
// // // // //       } catch (activeErr: any) {
// // // // //         if (activeErr.response && activeErr.response.status === 404) {
// // // // //           console.log("No active training plan found (HTTP 404). This is expected behavior.");
// // // // //           activePlanResult = null;
// // // // //         } else {
// // // // //           console.error("Error fetching active plan:", activeErr);
// // // // //           setError(activeErr?.message || 'שגיאה בטעינת התוכנית הפעילה');
// // // // //           activePlanResult = null;
// // // // //         }
// // // // //       }

// // // // //       const historyResponse = await trainingPlanApi.getHistoryPlans(user.traineeId);

// // // // //       setActivePlanData(activePlanResult);
// // // // //       setHistoryPlansData(historyResponse || []);

// // // // //     } catch (err: any) {
// // // // //       console.error("General error fetching plans:", err);
// // // // //       setError(err?.message || 'שגיאה כללית בטעינת התוכניות');
// // // // //       setActivePlanData(null);
// // // // //       setHistoryPlansData([]);
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     const fetchOptions = async () => {
// // // // //       try {
// // // // //         const [levels, goals, durations] = await Promise.all([
// // // // //           authApi.getFitnessLevels(),
// // // // //           authApi.getGoals(),
// // // // //           authApi.getTrainingDurations()
// // // // //         ]);
// // // // //         setFitnessLevels(levels);
// // // // //         setGoals(goals);
// // // // //         setDurations(durations);
// // // // //       } catch (err) {
// // // // //         console.error("Error fetching options:", err);
// // // // //       }
// // // // //     };
// // // // //     fetchOptions();
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     fetchPlans();
// // // // //   }, [user?.traineeId]);


// // // // //   const getLevelName = (id: number) =>
// // // // //     fitnessLevels.find((l) => l.fitnessLevelId === id)?.fitnessLevelName || '';
// // // // //   const getGoalName = (id: number) =>
// // // // //     goals.find((g) => g.goalId === id)?.goalName || '';
// // // // //   const getDurationName = (id: number) => {
// // // // //     const duration = durations.find((d) => d.trainingDurationId === id);
// // // // //     return duration ? `${duration.timeTrainingDuration} דקות` : '';
// // // // //   };

// // // // //   const startWorkout = async (planDayId: number) => {
// // // // //     if (!user?.traineeId) {
// // // // //       alert('שגיאה: מזהה מתאמן לא נמצא. אנא התחבר מחדש.');
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       const traineeDetails: Trainee = await activeWorkoutApi.getTraineeById(user.traineeId);

// // // // //       // וודא ש-activePlanData אינו null ושיש לו planDays
// // // // //       if (!activePlanData || !activePlanData.planDays) {
// // // // //         throw new Error('לא נמצאו פרטי תוכנית אימון פעילה או ימי אימון.');
// // // // //       }

// // // // //       const selectedPlanDay = activePlanData.planDays.find(day => day.planDayId === planDayId);

// // // // //       if (!selectedPlanDay) {
// // // // //         throw new Error('פרטי יום האימון לא נמצאו עבור התוכנית הפעילה.');
// // // // //       }

// // // // //       // ה-Backend שלך מצפה ל-TraineeDTO, לרשימת ExercisePlanDTO, לזמן התחלה ול-planDayId
// // // // //       const requestBodyForStartWorkout = {
// // // // //         Trainee: traineeDetails.traineeId, // רק ה-ID של המתאמן
// // // // //         planday: planDayId,
// // // // //         StartTime: new Date().toISOString(), // זמן נוכחי בפורמט ISO 8601
// // // // //       };

// // // // //       await activeWorkoutApi.startWorkout(requestBodyForStartWorkout);

// // // // //       navigate(`/WorkoutPage/${planDayId}`);
// // // // //     } catch (err: any) {
// // // // //       console.error('Failed to start workout:', err);
// // // // //       if (err.response) {
// // // // //         console.error('Server error details:', err.response.data);
// // // // //         alert(`שגיאה בהתחלת האימון: ${typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data)}`);
// // // // //       } else {
// // // // //         alert(`שגיאה בהתחלת האימון: ${err.message || 'שגיאה לא ידועה'}`);
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const togglePlanExpansion = (planId: number) => {
// // // // //     setExpandedPlanId(expandedPlanId === planId ? null : planId);
// // // // //   };

// // // // //   const renderPlanCard = (plan: TrainingPlan, planDays: PlanDay[], isCurrent: boolean) => (
// // // // //     <motion.div
// // // // //       key={plan.trainingPlanId}
// // // // //       initial={{ opacity: 0, scale: 0.9 }}
// // // // //       animate={{ opacity: 1, scale: 1 }}
// // // // //       transition={{ duration: 0.3 }}
// // // // //       className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
// // // // //     >
// // // // //       <div
// // // // //         className="h-40 bg-cover bg-center"
// // // // //         style={{ backgroundImage: `url(${getImageUrl('default')})` }}
// // // // //       ></div>
// // // // //       <div className="p-4">
// // // // //         <h3 className="text-lg font-medium text-gray-900">
// // // // //           {`תוכנית ל-${getGoalName(plan.goalId)}`}
// // // // //         </h3>
// // // // //         <p className="text-sm text-gray-500 mt-1">
// // // // //           {`אימון ל-${plan.trainingDays} ימים בשבוע`}
// // // // //         </p>
// // // // //         <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
// // // // //           <div>
// // // // //             <span className="font-medium">רמה:</span> {getLevelName(plan.fitnessLevelId)}
// // // // //           </div>
// // // // //           <div>
// // // // //             <span className="font-medium">זמן:</span> {getDurationName(plan.trainingDurationId)}
// // // // //           </div>
// // // // //           <div>
// // // // //             <span className="font-medium">התחלה:</span> {new Date(plan.startDate).toLocaleDateString('he-IL')}
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="mt-4">
// // // // //           <Button
// // // // //             onClick={() => togglePlanExpansion(plan.trainingPlanId)}
// // // // //             variant="ghost"
// // // // //             fullWidth
// // // // //             className="justify-between text-blue-600 hover:text-blue-700"
// // // // //             icon={expandedPlanId === plan.trainingPlanId ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
// // // // //           >
// // // // //             {expandedPlanId === plan.trainingPlanId ? 'הסתר ימי אימון' : 'הצג ימי אימון'}
// // // // //           </Button>
// // // // //         </div>

// // // // //         {expandedPlanId === plan.trainingPlanId && planDays && planDays.length > 0 && (
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, height: 0 }}
// // // // //             animate={{ opacity: 1, height: 'auto' }}
// // // // //             transition={{ duration: 0.3 }}
// // // // //             className="mt-4 border-t pt-4"
// // // // //           >
// // // // //             <h4 className="font-medium text-gray-800 mb-2">ימי אימון:</h4>
// // // // //             <div className="space-y-2">
// // // // //               {planDays
// // // // //                 .sort((a, b) => a.dayOrder - b.dayOrder)
// // // // //                 .map((day) => (
// // // // //                   <div key={day.planDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
// // // // //                     <span className="text-gray-700">{`יום ${day.dayOrder}: ${day.programName}`}</span>
// // // // //                     {isCurrent && (
// // // // //                       <Button
// // // // //                         onClick={() => startWorkout(day.planDayId)}
// // // // //                         size="sm"
// // // // //                         icon={<Play className="h-4 w-4" />}
// // // // //                       >
// // // // //                         התחל
// // // // //                       </Button>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 ))}
// // // // //             </div>
// // // // //           </motion.div>
// // // // //         )}
// // // // //       </div>
// // // // //     </motion.div>
// // // // //   );

// // // // //   return (
// // // // //     <div className="space-y-8">
// // // // //       <motion.div
// // // // //         initial={{ opacity: 0, y: 20 }}
// // // // //         animate={{ opacity: 1, y: 0 }}
// // // // //         transition={{ duration: 0.5 }}
// // // // //       >
// // // // //         {/* User welcome section */}
// // // // //         <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
// // // // //           <div className="px-4 py-5 sm:px-6">
// // // // //             <h2 className="text-xl font-medium text-gray-900">
// // // // //               שלום, {user?.traineeName}
// // // // //             </h2>
// // // // //             <p className="mt-1 max-w-2xl text-sm text-gray-500">
// // // // //               ברוך הבא למערכת האימונים שלך
// // // // //             </p>
// // // // //           </div>
// // // // //           <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
// // // // //             <div className="flex space-x-4 space-x-reverse">
// // // // //               <Button
// // // // //                 variant="outline"
// // // // //                 onClick={() => navigate('/profile')}
// // // // //                 icon={<Edit className="h-4 w-4" />}
// // // // //               >
// // // // //                 עדכון פרטים אישיים
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Plans display section */}
// // // // //         <div className="bg-white shadow sm:rounded-lg overflow-hidden">
// // // // //           <div className="border-b border-gray-200">
// // // // //             <nav className="flex">
// // // // //               <button
// // // // //                 onClick={() => setActiveSection('current')}
// // // // //                 className={`px-6 py-4 text-center text-sm font-medium ${
// // // // //                   activeSection === 'current'
// // // // //                     ? 'border-b-2 border-blue-500 text-blue-600'
// // // // //                     : 'text-gray-500 hover:text-gray-700'
// // // // //                 }`}
// // // // //               >
// // // // //                 <div className="flex items-center">
// // // // //                   <Calendar className="h-4 w-4 ml-2" />
// // // // //                   <span>תוכנית אימון נוכחית</span>
// // // // //                 </div>
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={() => setActiveSection('history')}
// // // // //                 className={`px-6 py-4 text-center text-sm font-medium ${
// // // // //                   activeSection === 'history'
// // // // //                     ? 'border-b-2 border-blue-500 text-blue-600'
// // // // //                     : 'text-gray-500 hover:text-gray-700'
// // // // //                 }`}
// // // // //               >
// // // // //                 <div className="flex items-center">
// // // // //                   <History className="h-4 w-4 ml-2" />
// // // // //                   <span>היסטוריית אימונים</span>
// // // // //                 </div>
// // // // //               </button>
// // // // //             </nav>
// // // // //           </div>

// // // // //           <div className="p-4 sm:p-6">
// // // // //             {isLoading ? (
// // // // //               <div className="text-center py-8 text-gray-500">טוען...</div>
// // // // //             ) : error ? (
// // // // //               <div className="text-center text-red-500 py-8">{error}</div>
// // // // //             ) : activeSection === 'current' ? (
// // // // //               activePlanData ? (
// // // // //                 renderPlanCard(activePlanData, activePlanData.planDays, true)
// // // // //               ) : (
// // // // //                 <div className="text-center py-8 text-gray-500">לא נמצאה תוכנית אימון פעילה.</div>
// // // // //               )
// // // // //             ) : (
// // // // //               historyPlansData.length === 0 ? (
// // // // //                 <div className="text-center py-8 text-gray-500">לא נמצאו תוכניות אימון היסטוריות.</div>
// // // // //               ) : (
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //                   {historyPlansData.map((planData) =>
// // // // //                     renderPlanCard(planData.trainingPlan, planData.planDays, false)
// // // // //                   )}
// // // // //                 </div>
// // // // //               )
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </motion.div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default HomePage;




// // // // import React, { useState, useEffect } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { motion } from 'framer-motion';
// // // // import { Play, Calendar, History, Edit, ChevronUp, ChevronDown } from 'lucide-react';
// // // // import Button from '../components/ui/Button';
// // // // import { useAuthStore } from '../store/authStore';
// // // // import { getImageUrl } from '../lib/utils';
// // // // import { trainingPlanApi, authApi } from '../lib/api';
// // // // import { activeWorkoutApi } from '../lib/api';
// // // // // Import ALL necessary types from your types.ts file
// // // // import { TrainingPlan, FitnessLevel, Goal, TrainingDuration, PlanDay, ActiveTrainingPlanResponse, MultiplePlansResponseItem, Trainee } from '../types';

// // // // // **ייבוא חדש נדרש:**
// // // // import { formatApiError } from '../lib/utils'; // ודא שפונקציה זו קיימת ב-utils.ts
// // // // import axios from 'axios'; // ייבוא ספריית Axios לזיהוי שגיאות Axios

// // // // const HomePage: React.FC = () => {
// // // //   const { user } = useAuthStore();
// // // //   const navigate = useNavigate();

// // // //   // Primary states
// // // //   const [activeSection, setActiveSection] = useState<'current' | 'history'>('current');
// // // //   const [activePlanData, setActivePlanData] = useState<ActiveTrainingPlanResponse | null>(null); // שינוי ל-null
// // // //   const [historyPlansData, setHistoryPlansData] = useState<MultiplePlansResponseItem[]>([]);

// // // //   const [isLoading, setIsLoading] = useState(true);
// // // //   const [error, setError] = useState<string | null>(null);

// // // //   // States for dynamic options from API
// // // //   const [fitnessLevels, setFitnessLevels] = useState<FitnessLevel[]>([]);
// // // //   const [goals, setGoals] = useState<Goal[]>([]);
// // // //   const [durations, setDurations] = useState<TrainingDuration[]>([]);

// // // //   // State for managing expanded plan (to show plan days)
// // // //   const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null);

// // // //   // Fetch plans (active and historical)
// // // //   const fetchPlans = async () => {
// // // //     if (!user?.traineeId) return;
// // // //     try {
// // // //       setIsLoading(true);
// // // //       setError(null);

// // // //       let activePlanResult: ActiveTrainingPlanResponse | null = null; // שינוי ל-null
// // // //       try {
// // // //         activePlanResult = await trainingPlanApi.getActivePlans(user.traineeId);
// // // //       } catch (activeErr: any) {
// // // //         if (activeErr.response && activeErr.response.status === 404) {
// // // //           console.log("No active training plan found (HTTP 404). This is expected behavior.");
// // // //           activePlanResult = null;
// // // //         } else {
// // // //           console.error("Error fetching active plan:", activeErr);
// // // //           // השתמש ב-formatApiError גם כאן לטיפול עקבי
// // // //           setError(formatApiError(activeErr));
// // // //           activePlanResult = null;
// // // //         }
// // // //       }

// // // //       const historyResponse = await trainingPlanApi.getHistoryPlans(user.traineeId);

// // // //       setActivePlanData(activePlanResult);
// // // //       setHistoryPlansData(historyResponse || []);

// // // //     } catch (err: any) {
// // // //       console.error("General error fetching plans:", err);
// // // //       // השתמש ב-formatApiError גם כאן לטיפול עקבי
// // // //       setError(formatApiError(err));
// // // //       setActivePlanData(null);
// // // //       setHistoryPlansData([]);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     const fetchOptions = async () => {
// // // //       try {
// // // //         const [levels, goals, durations] = await Promise.all([
// // // //           authApi.getFitnessLevels(),
// // // //           authApi.getGoals(),
// // // //           authApi.getTrainingDurations()
// // // //         ]);
// // // //         setFitnessLevels(levels);
// // // //         setGoals(goals);
// // // //         setDurations(durations);
// // // //       } catch (err: any) { // שנה ל-any כדי לטפל בשגיאות Axios
// // // //         console.error("Error fetching options:", err);
// // // //         // שקול להציג הודעת שגיאה גם כאן אם הנתונים הקריטיים האלה נכשלים
// // // //         alert(`שגיאה בטעינת אפשרויות: ${formatApiError(err)}`);
// // // //       }
// // // //     };
// // // //     fetchOptions();
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     fetchPlans();
// // // //   }, [user?.traineeId]);


// // // //   const getLevelName = (id: number) =>
// // // //     fitnessLevels.find((l) => l.fitnessLevelId === id)?.fitnessLevelName || '';
// // // //   const getGoalName = (id: number) =>
// // // //     goals.find((g) => g.goalId === id)?.goalName || '';
// // // //   const getDurationName = (id: number) => {
// // // //     const duration = durations.find((d) => d.trainingDurationId === id);
// // // //     return duration ? `${duration.timeTrainingDuration} דקות` : '';
// // // //   };

// // // //   const startWorkout = async (planDayId: number) => {
// // // //     if (!user?.traineeId) {
// // // //       alert('שגיאה: מזהה מתאמן לא נמצא. אנא התחבר מחדש.');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const traineeDetails: Trainee = await activeWorkoutApi.getTraineeById(user.traineeId);

// // // //       // וודא ש-activePlanData אינו null ושיש לו planDays
// // // //       if (!activePlanData || !activePlanData.planDays) {
// // // //         throw new Error('לא נמצאו פרטי תוכנית אימון פעילה או ימי אימון.');
// // // //       }

// // // //       const selectedPlanDay = activePlanData.planDays.find(day => day.planDayId === planDayId);

// // // //       if (!selectedPlanDay) {
// // // //         throw new Error('פרטי יום האימון לא נמצאו עבור התוכנית הפעילה.');
// // // //       }

// // // //       // ה-Backend שלך מצפה ל-TraineeDTO, לרשימת ExercisePlanDTO, לזמן התחלה ול-planDayId
// // // //       const requestBodyForStartWorkout = {
// // // //         Trainee: traineeDetails.traineeId, // רק ה-ID של המתאמן
// // // //         planday: planDayId,
// // // //         StartTime: new Date().toISOString(), // זמן נוכחי בפורמט ISO 8601
// // // //       };

// // // //       await activeWorkoutApi.startWorkout(requestBodyForStartWorkout);

// // // //       navigate(`/WorkoutPage/${planDayId}`);
// // // //     } catch (err: any) {
// // // //       console.error('Failed to start workout:', err); // נשמור את שגיאת המקור המלאה
// // // //       console.error('Server error details:', err.response?.data); // נדפיס את פרטי התגובה מהשרת

// // // //       let userMessage = 'שגיאה לא ידועה בהתחלת הפעולה.'; // הודעת ברירת מחדל למשתמש

// // // //       if (axios.isAxiosError(err)) { // בדיקה אם זו שגיאת Axios
// // // //         if (err.response) {
// // // //           // הבקשה הגיעה לשרת והשרת החזיר תגובת שגיאה
// // // //           if (err.response.status === 429 || err.response.status === 503) {
// // // //             // זהו המצב של "שרת עמוס" שטיפלנו בו בשרת עם ProblemDetails
// // // //             const serverDetail = (err.response.data && typeof err.response.data === 'object' && err.response.data.detail)
// // // //                                  ? err.response.data.detail // אם זה ProblemDetails, קח את ה-detail
// // // //                                  : (typeof err.response.data === 'string' ? err.response.data : 'השרת עמוס כרגע. אנא המתן מספר רגעים ונסה שוב.'); // אם זה סטרינג או אחר, השתמש בהודעת ברירת מחדל

// // // //             userMessage = serverDetail; // נשתמש בהודעה המפורטת מהשרת
// // // //           } else {
// // // //             // שגיאות HTTP אחרות (400, 401, 500 וכו')
// // // //             userMessage = formatApiError(err); // השתמש בפונקציה formatApiError כדי לטפל בזה
// // // //           }
// // // //         } else if (err.request) {
// // // //           // הבקשה נשלחה, אך לא התקבלה תגובה מהשרת (כנראה בעיית רשת או Timeout)
// // // //           if (err.code === 'ECONNABORTED') { // קוד שגיאה ספציפי של Axios ל-Timeout
// // // //             userMessage = 'הפעולה נכשלה עקב עומס בשרת או חיבור איטי. אנא נסה שוב בעוד רגע.';
// // // //           } else {
// // // //             userMessage = 'שגיאת רשת: לא ניתן להתחבר לשרת. אנא בדוק את חיבור האינטרנט שלך.';
// // // //           }
// // // //         } else {
// // // //           // משהו קרה בהגדרת הבקשה לפני שהיא נשלחה
// // // //           userMessage = `שגיאת בקשה: ${err.message}`;
// // // //         }
// // // //       } else if (err instanceof Error) {
// // // //         // שגיאת JavaScript כללית (לדוגמה, ה-`throw new Error(...)` שכתבת)
// // // //         userMessage = err.message;
// // // //       }

// // // //       alert(`שגיאה בהתחלת האימון: ${userMessage}`);
// // // //     }
// // // //   };

// // // //   const togglePlanExpansion = (planId: number) => {
// // // //     setExpandedPlanId(expandedPlanId === planId ? null : planId);
// // // //   };

// // // //   const renderPlanCard = (plan: TrainingPlan, planDays: PlanDay[], isCurrent: boolean) => (
// // // //     <motion.div
// // // //       key={plan.trainingPlanId}
// // // //       initial={{ opacity: 0, scale: 0.9 }}
// // // //       animate={{ opacity: 1, scale: 1 }}
// // // //       transition={{ duration: 0.3 }}
// // // //       className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
// // // //     >
// // // //       <div
// // // //         className="h-40 bg-cover bg-center"
// // // //         style={{ backgroundImage: `url(${getImageUrl('default')})` }}
// // // //       ></div>
// // // //       <div className="p-4">
// // // //         <h3 className="text-lg font-medium text-gray-900">
// // // //           {`תוכנית ל-${getGoalName(plan.goalId)}`}
// // // //         </h3>
// // // //         <p className="text-sm text-gray-500 mt-1">
// // // //           {`אימון ל-${plan.trainingDays} ימים בשבוע`}
// // // //         </p>
// // // //         <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
// // // //           <div>
// // // //             <span className="font-medium">רמה:</span> {getLevelName(plan.fitnessLevelId)}
// // // //           </div>
// // // //           <div>
// // // //             <span className="font-medium">זמן:</span> {getDurationName(plan.trainingDurationId)}
// // // //           </div>
// // // //           <div>
// // // //             <span className="font-medium">התחלה:</span> {new Date(plan.startDate).toLocaleDateString('he-IL')}
// // // //           </div>
// // // //         </div>

// // // //         <div className="mt-4">
// // // //           <Button
// // // //             onClick={() => togglePlanExpansion(plan.trainingPlanId)}
// // // //             variant="ghost"
// // // //             fullWidth
// // // //             className="justify-between text-blue-600 hover:text-blue-700"
// // // //             icon={expandedPlanId === plan.trainingPlanId ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
// // // //           >
// // // //             {expandedPlanId === plan.trainingPlanId ? 'הסתר ימי אימון' : 'הצג ימי אימון'}
// // // //           </Button>
// // // //         </div>

// // // //         {expandedPlanId === plan.trainingPlanId && planDays && planDays.length > 0 && (
// // // //           <motion.div
// // // //             initial={{ opacity: 0, height: 0 }}
// // // //             animate={{ opacity: 1, height: 'auto' }}
// // // //             transition={{ duration: 0.3 }}
// // // //             className="mt-4 border-t pt-4"
// // // //           >
// // // //             <h4 className="font-medium text-gray-800 mb-2">ימי אימון:</h4>
// // // //             <div className="space-y-2">
// // // //               {planDays
// // // //                 .sort((a, b) => a.dayOrder - b.dayOrder)
// // // //                 .map((day) => (
// // // //                   <div key={day.planDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
// // // //                     <span className="text-gray-700">{`יום ${day.dayOrder}: ${day.programName}`}</span>
// // // //                     {isCurrent && (
// // // //                       <Button
// // // //                         onClick={() => startWorkout(day.planDayId)}
// // // //                         size="sm"
// // // //                         icon={<Play className="h-4 w-4" />}
// // // //                       >
// // // //                         התחל
// // // //                       </Button>
// // // //                     )}
// // // //                   </div>
// // // //                 ))}
// // // //             </div>
// // // //           </motion.div>
// // // //         )}
// // // //       </div>
// // // //     </motion.div>
// // // //   );

// // // //   return (
// // // //     <div className="space-y-8">
// // // //       <motion.div
// // // //         initial={{ opacity: 0, y: 20 }}
// // // //         animate={{ opacity: 1, y: 0 }}
// // // //         transition={{ duration: 0.5 }}
// // // //       >
// // // //         {/* User welcome section */}
// // // //         <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
// // // //           <div className="px-4 py-5 sm:px-6">
// // // //             <h2 className="text-xl font-medium text-gray-900">
// // // //               שלום, {user?.traineeName}
// // // //             </h2>
// // // //             <p className="mt-1 max-w-2xl text-sm text-gray-500">
// // // //               ברוך הבא למערכת האימונים שלך
// // // //             </p>
// // // //           </div>
// // // //           <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
// // // //             <div className="flex space-x-4 space-x-reverse">
// // // //               <Button
// // // //                 variant="outline"
// // // //                 onClick={() => navigate('/profile')}
// // // //                 icon={<Edit className="h-4 w-4" />}
// // // //               >
// // // //                 עדכון פרטים אישיים
// // // //               </Button>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Plans display section */}
// // // //         <div className="bg-white shadow sm:rounded-lg overflow-hidden">
// // // //           <div className="border-b border-gray-200">
// // // //             <nav className="flex">
// // // //               <button
// // // //                 onClick={() => setActiveSection('current')}
// // // //                 className={`px-6 py-4 text-center text-sm font-medium ${
// // // //                   activeSection === 'current'
// // // //                     ? 'border-b-2 border-blue-500 text-blue-600'
// // // //                     : 'text-gray-500 hover:text-gray-700'
// // // //                 }`}
// // // //               >
// // // //                 <div className="flex items-center">
// // // //                   <Calendar className="h-4 w-4 ml-2" />
// // // //                   <span>תוכנית אימון נוכחית</span>
// // // //                 </div>
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => setActiveSection('history')}
// // // //                 className={`px-6 py-4 text-center text-sm font-medium ${
// // // //                   activeSection === 'history'
// // // //                     ? 'border-b-2 border-blue-500 text-blue-600'
// // // //                     : 'text-gray-500 hover:text-gray-700'
// // // //                 }`}
// // // //               >
// // // //                 <div className="flex items-center">
// // // //                   <History className="h-4 w-4 ml-2" />
// // // //                   <span>היסטוריית אימונים</span>
// // // //                 </div>
// // // //               </button>
// // // //             </nav>
// // // //           </div>

// // // //           <div className="p-4 sm:p-6">
// // // //             {isLoading ? (
// // // //               <div className="text-center py-8 text-gray-500">טוען...</div>
// // // //             ) : error ? (
// // // //               <div className="text-center text-red-500 py-8">{error}</div>
// // // //             ) : activeSection === 'current' ? (
// // // //               activePlanData ? (
// // // //                 renderPlanCard(activePlanData, activePlanData.planDays, true)
// // // //               ) : (
// // // //                 <div className="text-center py-8 text-gray-500">לא נמצאה תוכנית אימון פעילה.</div>
// // // //               )
// // // //             ) : (
// // // //               historyPlansData.length === 0 ? (
// // // //                 <div className="text-center py-8 text-gray-500">לא נמצאו תוכניות אימון היסטוריות.</div>
// // // //               ) : (
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //                   {historyPlansData.map((planData) =>
// // // //                     renderPlanCard(planData.trainingPlan, planData.planDays, false)
// // // //                   )}
// // // //                 </div>
// // // //               )
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </motion.div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default HomePage;

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { motion } from 'framer-motion';
// // // // // import { Play, Calendar, History, Edit, ChevronUp, ChevronDown } from 'lucide-react';
// // // // // import Button from '../components/ui/Button';
// // // // // import { useAuthStore } from '../store/authStore';
// // // // // import { getImageUrl } from '../lib/utils';
// // // // // import { trainingPlanApi, authApi } from '../lib/api'; 
// // // // // import { TrainingPlan, FitnessLevel, Goal, TrainingDuration, PlanDay } from '../types';

// // // // // // Type for the response of getActivePlans (single plan + its days)
// // // // // type SingleTrainingPlanResponse = {
// // // // //   trainingPlan: TrainingPlan | null;
// // // // //   planDays: PlanDay[];
// // // // // };

// // // // // // Type for the response of getHistoryPlans (array of plans + their days)
// // // // // type MultiplePlansResponseItem = {
// // // // //   trainingPlan: TrainingPlan;
// // // // //   planDays: PlanDay[];
// // // // // };


// // // // // const HomePage: React.FC = () => {
// // // // //   const { user } = useAuthStore();
// // // // //   const navigate = useNavigate();

// // // // //   // סטייטים עיקריים
// // // // //   const [activeSection, setActiveSection] = useState<'current' | 'history'>('current');
// // // // //   // activePlan יכיל את ה-TrainingPlan הראשי ואת ימי האימון שלו
// // // // //   const [activePlanData, setActivePlanData] = useState<TrainingPlan | null>(null);
// // // // //   // historyPlans יכיל רשימה של אובייקטים, כל אחד עם TrainingPlan ו-PlanDays
// // // // //   const [historyPlansData, setHistoryPlansData] = useState<MultiplePlansResponseItem[]>([]);

// // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // //   const [error, setError] = useState<string | null>(null);

// // // // //   // סטייטים לאפשרויות דינאמיות מה-API (לא שינוי כאן)
// // // // //   const [fitnessLevels, setFitnessLevels] = useState<FitnessLevel[]>([]);
// // // // //   const [goals, setGoals] = useState<Goal[]>([]);
// // // // //   const [durations, setDurations] = useState<TrainingDuration[]>([]);

// // // // //   // סטייט לניהול תוכנית מורחבת (להצגת ימי האימון)
// // // // //   const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null);

// // // // //   // קבלת תוכניות (פעילות והיסטוריות)
// // // // //   const fetchPlans = async () => {
// // // // //     if (!user?.traineeId) return;
// // // // //     try {
// // // // //       setIsLoading(true);
// // // // //       setError(null);
      
// // // // //       const [activeResponse, historyResponse] = await Promise.all([
// // // // //         trainingPlanApi.getActivePlans(user.traineeId), // מחזיר TrainingPlan או null
// // // // //         trainingPlanApi.getHistoryPlans(user.traineeId)  // מצפה ל-MultiplePlansResponseItem[]
// // // // //       ]);

// // // // //       // ודא ש-activeResponse הוא TrainingPlan או null, ו-planDays הוא מערך ריק אם אין
// // // // //       setActivePlanData({
// // // // //         trainingPlan: activeResponse?.trainingPlan ?? null,
// // // // //         planDays: activeResponse?.planDays ?? [],
// // // // //       });
// // // // //       setHistoryPlansData(historyResponse || []); // לוודא שזו תמיד רשימה
// // // // //     } catch (err: any) {
// // // // //       console.error("Error fetching plans:", err);
// // // // //       setError(err?.message || 'שגיאה בטעינת התוכניות');
// // // // //       setActivePlanData(null);
// // // // //       setHistoryPlansData([]);
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // ... (הקוד של fetchOptions, useEffect for fetchOptions, useEffect for fetchPlans נשאר כמעט זהה)
// // // // //   useEffect(() => {
// // // // //     const fetchOptions = async () => {
// // // // //       try {
// // // // //         const [levels, goals, durations] = await Promise.all([
// // // // //           authApi.getFitnessLevels(),
// // // // //           authApi.getGoals(),
// // // // //           authApi.getTrainingDurations()
// // // // //         ]);
// // // // //         setFitnessLevels(levels);
// // // // //         setGoals(goals);
// // // // //         setDurations(durations);
// // // // //       } catch (err) {
// // // // //         console.error("Error fetching options:", err);
// // // // //       }
// // // // //     };
// // // // //     fetchOptions();
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     fetchPlans();
// // // // //   }, [user?.traineeId]);

// // // // //   // פונקציות תרגום מזהים לשמות
// // // // //   const getLevelName = (id: number) =>
// // // // //     fitnessLevels.find((l) => l.fitnessLevelId === id)?.fitnessLevelName || '';
// // // // //   const getGoalName = (id: number) =>
// // // // //     goals.find((g) => g.goalId === id)?.goalName || '';
// // // // //   const getDurationName = (id: number) => {
// // // // //     const duration = durations.find((d) => d.trainingDurationId === id);
// // // // //     return duration ? `${duration.timeTrainingDuration} דקות` : '';
// // // // //   };

// // // // //   const startWorkout = (planDayId: number) => {
// // // // //     navigate(`/workout/${planDayId}`);
// // // // //   };

// // // // //   const togglePlanExpansion = (planId: number) => {
// // // // //     setExpandedPlanId(expandedPlanId === planId ? null : planId);
// // // // //   };

// // // // //   // רנדור כרטיס תוכנית אימון בודדת (לשימוש חוזר)
// // // // //   const renderPlanCard = (plan: TrainingPlan, planDays: PlanDay[], isCurrent: boolean) => (
// // // // //     <motion.div
// // // // //       key={plan.trainingPlanId}
// // // // //       initial={{ opacity: 0, scale: 0.9 }}
// // // // //       animate={{ opacity: 1, scale: 1 }}
// // // // //       transition={{ duration: 0.3 }}
// // // // //       className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
// // // // //     >
// // // // //       <div
// // // // //         className="h-40 bg-cover bg-center"
// // // // //         style={{ backgroundImage: `url(${getImageUrl('default')})` }}
// // // // //       ></div>
// // // // //       <div className="p-4">
// // // // //         {/* נניח של-TrainingPlan יש גם 'PlanName' או שאתה רוצה להציג את ה-Goal */}
// // // // //         <h3 className="text-lg font-medium text-gray-900">
// // // // //           {`תוכנית ל-${getGoalName(plan.goalId)}`} {/* הצג את שם המטרה */}
// // // // //         </h3>
// // // // //         <p className="text-sm text-gray-500 mt-1">
// // // // //           {`אימון ל-${plan.trainingDays} ימים בשבוע`}
// // // // //         </p>
// // // // //         <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
// // // // //           <div>
// // // // //             <span className="font-medium">רמה:</span> {getLevelName(plan.fitnessLevelId)}
// // // // //           </div>
// // // // //           <div>
// // // // //             <span className="font-medium">זמן:</span> {getDurationName(plan.trainingDurationId)}
// // // // //           </div>
// // // // //           <div>
// // // // //             <span className="font-medium">התחלה:</span> {new Date(plan.startDate).toLocaleDateString('he-IL')}
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* כפתור להרחבה/כיווץ ימי האימון */}
// // // // //         <div className="mt-4">
// // // // //           <Button
// // // // //             onClick={() => togglePlanExpansion(plan.trainingPlanId)}
// // // // //             variant="ghost"
// // // // //             fullWidth
// // // // //             className="justify-between text-blue-600 hover:text-blue-700"
// // // // //             icon={expandedPlanId === plan.trainingPlanId ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
// // // // //           >
// // // // //             {expandedPlanId === plan.trainingPlanId ? 'הסתר ימי אימון' : 'הצג ימי אימון'}
// // // // //           </Button>
// // // // //         </div>

// // // // //         {/* הצגת ימי האימון אם התוכנית מורחבת */}
// // // // //         {expandedPlanId === plan.trainingPlanId && planDays && planDays.length > 0 && (
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, height: 0 }}
// // // // //             animate={{ opacity: 1, height: 'auto' }}
// // // // //             transition={{ duration: 0.3 }}
// // // // //             className="mt-4 border-t pt-4"
// // // // //           >
// // // // //             <h4 className="font-medium text-gray-800 mb-2">ימי אימון:</h4>
// // // // //             <div className="space-y-2">
// // // // //               {planDays
// // // // //                 .sort((a, b) => a.dayOrder - b.dayOrder) // מיין לפי סדר יום
// // // // //                 .map((day) => (
// // // // //                   <div key={day.planDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
// // // // //                     <span className="text-gray-700">{`יום ${day.dayOrder}: ${day.programName}`}</span>
// // // // //                     {isCurrent && ( // הצג כפתור "התחל אימון" רק עבור ימי התוכנית הפעילה הנוכחית
// // // // //                       <Button
// // // // //                         onClick={() => startWorkout(day.planDayId)} // העבר את planDayId
// // // // //                         size="sm"
// // // // //                         icon={<Play className="h-4 w-4" />}
// // // // //                       >
// // // // //                         התחל
// // // // //                       </Button>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 ))}
// // // // //             </div>
// // // // //           </motion.div>
// // // // //         )}
// // // // //       </div>
// // // // //     </motion.div>
// // // // //   );

// // // // //   return (
// // // // //     <div className="space-y-8">
// // // // //       <motion.div
// // // // //         initial={{ opacity: 0, y: 20 }}
// // // // //         animate={{ opacity: 1, y: 0 }}
// // // // //         transition={{ duration: 0.5 }}
// // // // //       >
// // // // //         {/* קטע קבלת פנים למשתמש (ללא שינוי) */}
// // // // //         <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
// // // // //           <div className="px-4 py-5 sm:px-6">
// // // // //             <h2 className="text-xl font-medium text-gray-900">
// // // // //               שלום, {user?.traineeName}
// // // // //             </h2>
// // // // //             <p className="mt-1 max-w-2xl text-sm text-gray-500">
// // // // //               ברוך הבא למערכת האימונים שלך
// // // // //             </p>
// // // // //           </div>
// // // // //           <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
// // // // //             <div className="flex space-x-4 space-x-reverse">
// // // // //               <Button
// // // // //                 variant="outline"
// // // // //                 onClick={() => navigate('/profile')}
// // // // //                 icon={<Edit className="h-4 w-4" />}
// // // // //               >
// // // // //                 עדכון פרטים אישיים
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* קטע תצוגת התוכניות */}
// // // // //         <div className="bg-white shadow sm:rounded-lg overflow-hidden">
// // // // //           <div className="border-b border-gray-200">
// // // // //             <nav className="flex">
// // // // //               <button
// // // // //                 onClick={() => setActiveSection('current')}
// // // // //                 className={`px-6 py-4 text-center text-sm font-medium ${
// // // // //                   activeSection === 'current'
// // // // //                     ? 'border-b-2 border-blue-500 text-blue-600'
// // // // //                     : 'text-gray-500 hover:text-gray-700'
// // // // //                 }`}
// // // // //               >
// // // // //                 <div className="flex items-center">
// // // // //                   <Calendar className="h-4 w-4 ml-2" />
// // // // //                   <span>תוכנית אימון נוכחית</span>
// // // // //                 </div>
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={() => setActiveSection('history')}
// // // // //                 className={`px-6 py-4 text-center text-sm font-medium ${
// // // // //                   activeSection === 'history'
// // // // //                     ? 'border-b-2 border-blue-500 text-blue-600'
// // // // //                     : 'text-gray-500 hover:text-gray-700'
// // // // //                 }`}
// // // // //               >
// // // // //                 <div className="flex items-center">
// // // // //                   <History className="h-4 w-4 ml-2" />
// // // // //                   <span>היסטוריית אימונים</span>
// // // // //                 </div>
// // // // //               </button>
// // // // //             </nav>
// // // // //           </div>

// // // // //           <div className="p-4 sm:p-6">
// // // // //             {isLoading ? (
// // // // //               <div className="text-center py-8 text-gray-500">טוען...</div>
// // // // //             ) : error ? (
// // // // //               <div className="text-center text-red-500 py-8">{error}</div>
// // // // //             ) : activeSection === 'current' ? (
// // // // //               // רנדור תוכנית פעילה
// // // // //               // activePlanData?.trainingPlan ? (
// // // // //               //   renderPlanCard(activePlanData.trainingPlan, activePlanData.planDays, true)
// // // // //               // ) : (
// // // // //               //   <div className="text-center py-8 text-gray-500">לא נמצאה תוכנית אימון פעילה.</div>
// // // // //               // )
// // // // //                   // רנדור תוכנית פעילה
// // // // //                   activePlanData && activePlanData.trainingPlan ? (
// // // // //                     renderPlanCard(activePlanData.trainingPlan, activePlanData.planDays, true)
// // // // //                   ) : (
// // // // //                     <div className="text-center py-8 text-gray-500">לא נמצאה תוכנית אימון פעילה.</div>
// // // // //                   )

// // // // //             ) : (
// // // // //               // רנדור תוכניות היסטוריות
// // // // //               historyPlansData.length === 0 ? (
// // // // //                 <div className="text-center py-8 text-gray-500">לא נמצאו תוכניות אימון היסטוריות.</div>
// // // // //               ) : (
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //                   {historyPlansData.map((planData) => 
// // // // //                     renderPlanCard(planData.trainingPlan, planData.planDays, false)
// // // // //                   )}
// // // // //                 </div>
// // // // //               )
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </motion.div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default HomePage;










// // // // // const HomePage: React.FC = () => {
// // // // //   const { user } = useAuthStore();
// // // // //   const navigate = useNavigate();

// // // // //   // סטייטים עיקריים
// // // // //   const [activeSection, setActiveSection] = useState<'current' | 'history'>('current');
// // // // //   const [activePlans, setActivePlans] = useState<PlanDay[]>([]);
// // // // //   const [historyPlans, setHistoryPlans] = useState<PlanDay[]>([]);

// // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // //   const [error, setError] = useState<string | null>(null);

// // // // //   // סטייטים לאפשרויות דינאמיות מה-API
// // // // //   const [fitnessLevels, setFitnessLevels] = useState<FitnessLevel[]>([]);
// // // // //   const [goals, setGoals] = useState<Goal[]>([]);
// // // // //   const [durations, setDurations] = useState<TrainingDuration[]>([]);

// // // // //   // קבלת תוכניות
// // // // //   const fetchPlans = async () => {
// // // // //     if (!user?.traineeId) return;
// // // // //     try {
// // // // //       setIsLoading(true);
// // // // //       setError(null);
// // // // //       const [active, history] = await Promise.all([
// // // // //         trainingPlanApi.getActivePlans(user.traineeId),
// // // // //         trainingPlanApi.getHistoryPlans(user.traineeId)
// // // // //       ]);
// // // // //       setActivePlans(active);
// // // // //       setHistoryPlans(history);
// // // // //     } catch (err: any) {
// // // // //       setError(err?.message || 'שגיאה בטעינת התוכניות');
// // // // //       setActivePlans([]);
// // // // //       setHistoryPlans([]);
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // קבלת אפשרויות (רמות/מטרות/משך) בטעינת העמוד
// // // // //   useEffect(() => {
// // // // //     const fetchOptions = async () => {
// // // // //       try {
// // // // //         const [levels, goals, durations] = await Promise.all([
// // // // //           authApi.getFitnessLevels(),
// // // // //           authApi.getGoals(),
// // // // //           authApi.getTrainingDurations()
// // // // //         ]);
// // // // //         setFitnessLevels(levels);
// // // // //         setGoals(goals);
// // // // //         setDurations(durations);
// // // // //       } catch (err) {
// // // // //         // אפשר להציג שגיאה אם צריך
// // // // //       }
// // // // //     };
// // // // //     fetchOptions();
// // // // //   }, []);

// // // // //   // קבלת תוכניות כאשר המשתמש נטען
// // // // //   useEffect(() => {
// // // // //     fetchPlans();
// // // // //     // eslint-disable-next-line
// // // // //   }, [user?.traineeId]);

// // // // //   // פונקציות תרגום מזהים לשמות מהאפשרויות הדינאמיות
// // // // //   const getLevelName = (id: number) =>
// // // // //     fitnessLevels.find((l) => l.fitnessLevelId === id)?.fitnessLevelName || '';
// // // // //   const getGoalName = (id: number) =>
// // // // //     goals.find((g) => g.goalId === id)?.goalName || '';
// // // // //   // const getDurationName = (id: number) =>
// // // // //   //   durations.find((d) => d.TimeTrainingDuration === id)?.TimeTrainingDuration || '';
// // // // //   // const getDurationName = (id: number) => {
// // // // //   //   const dur = durations.find((d) => d.TrainingDurationId === id);
// // // // //   //   return dur ? `${dur.TimeTrainingDuration} דקות` : '';
// // // // //   // };
// // // // //   const getDurationName = (id: number) => {
// // // // //   const duration = durations.find((d) => d.TrainingDurationId === id);
// // // // //   return duration ? duration.TimeTrainingDuration + " דקות" : '';
// // // // //   };
// // // // //   const startWorkout = (programId: number) => {
// // // // //     navigate(`/workout/${programId}`);
// // // // //   };

// // // // //   const renderPlans = (plans: PlanDay[]) => (
// // // // //     plans.length === 0 ? (
// // // // //       <div className="text-center py-8 text-gray-500">לא נמצאו תוכניות אימון.</div>
// // // // //     ) : (
// // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //         {plans.map((program) => (
// // // // //           <motion.div
// // // // //             key={program.trainingPlanId}
// // // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // //             transition={{ duration: 0.3 }}
// // // // //             className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
// // // // //           >
// // // // //             <div
// // // // //               className="h-40 bg-cover bg-center"
// // // // //               style={{ backgroundImage: `url(${getImageUrl('default')})` }}
// // // // //             ></div>
// // // // //             <div className="p-4">
// // // // //               {/* <h3 className="text-lg font-medium text-gray-900">
// // // // //                 {getGoalName(program.goalId)}
// // // // //               </h3>
// // // // //               <p className="text-sm text-gray-500 mt-1">
// // // // //                 {`תוכנית ל-${program.trainingDays} ימים בשבוע`}
// // // // //               </p> */}
// // // // //               {/* <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4 space-x-reverse">
// // // // //                 <div>
// // // // //                   <span className="font-medium">רמה:</span> {getLevelName(program.fitnessLevelId)}
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <span className="font-medium">זמן:</span> {getDurationName(program.trainingDurationId)} */}
// // // // //                   {/* console.log('durationId from plan:', program.trainingDurationId, 'durations:', durations); */}
// // // // //                 {/* </div>
// // // // //                 <div>
// // // // //                   <span className="font-medium">התחלה:</span> {new Date(program.startDate).toLocaleDateString('he-IL')}
// // // // //                 </div>
// // // // //               </div> */}
// // // // //               {/* {program.isActive && (
// // // // //                 <div className="mt-4">
// // // // //                   <Button
// // // // //                     onClick={() => startWorkout(program.trainingPlanId)}
// // // // //                     fullWidth
// // // // //                     icon={<Play className="h-4 w-4" />}
// // // // //                   >
// // // // //                     התחל אימון
// // // // //                   </Button>
// // // // //                 </div>
// // // // //               )} */}
// // // // //             </div>
// // // // //           </motion.div>
// // // // //         ))}
// // // // //       </div>
// // // // //     )
// // // // //   );

// // // // //   return (
// // // // //     <div className="space-y-8">
// // // // //       <motion.div
// // // // //         initial={{ opacity: 0, y: 20 }}
// // // // //         animate={{ opacity: 1, y: 0 }}
// // // // //         transition={{ duration: 0.5 }}
// // // // //       >
// // // // //         <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
// // // // //           <div className="px-4 py-5 sm:px-6">
// // // // //             <h2 className="text-xl font-medium text-gray-900">
// // // // //               שלום, {user?.traineeName}
// // // // //             </h2>
// // // // //             <p className="mt-1 max-w-2xl text-sm text-gray-500">
// // // // //               ברוך הבא למערכת האימונים שלך
// // // // //             </p>
// // // // //           </div>
// // // // //           <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
// // // // //             <div className="flex space-x-4 space-x-reverse">
// // // // //               <Button
// // // // //                 variant="outline"
// // // // //                 onClick={() => navigate('/profile')}
// // // // //                 icon={<Edit className="h-4 w-4" />}
// // // // //               >
// // // // //                 עדכון פרטים אישיים
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="bg-white shadow sm:rounded-lg overflow-hidden">
// // // // //           <div className="border-b border-gray-200">
// // // // //             <nav className="flex">
// // // // //               <button
// // // // //                 onClick={() => setActiveSection('current')}
// // // // //                 className={`px-6 py-4 text-center text-sm font-medium ${
// // // // //                   activeSection === 'current'
// // // // //                     ? 'border-b-2 border-blue-500 text-blue-600'
// // // // //                     : 'text-gray-500 hover:text-gray-700'
// // // // //                 }`}
// // // // //               >
// // // // //                 <div className="flex items-center">
// // // // //                   <Calendar className="h-4 w-4 ml-2" />
// // // // //                   <span>תוכניות אימון נוכחיות</span>
// // // // //                 </div>
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={() => setActiveSection('history')}
// // // // //                 className={`px-6 py-4 text-center text-sm font-medium ${
// // // // //                   activeSection === 'history'
// // // // //                     ? 'border-b-2 border-blue-500 text-blue-600'
// // // // //                     : 'text-gray-500 hover:text-gray-700'
// // // // //                 }`}
// // // // //               >
// // // // //                 <div className="flex items-center">
// // // // //                   <History className="h-4 w-4 ml-2" />
// // // // //                   <span>היסטוריית אימונים</span>
// // // // //                 </div>
// // // // //               </button>
// // // // //             </nav>
// // // // //           </div>

// // // // //           <div className="p-4 sm:p-6">
// // // // //             {isLoading ? (
// // // // //               <div className="text-center py-8 text-gray-500">טוען...</div>
// // // // //             ) : error ? (
// // // // //               <div className="text-center text-red-500 py-8">{error}</div>
// // // // //             ) : activeSection === 'current' ? (
// // // // //               renderPlans(activePlans)
// // // // //             ) : (
// // // // //               renderPlans(historyPlans)
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </motion.div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default HomePage;


// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { motion } from 'framer-motion';
// // // import { Play, Calendar, History, Edit, ChevronUp, ChevronDown, Loader2 } from 'lucide-react'; // ייבוא Loader2 לאייקון טעינה
// // // import Button from '../components/ui/Button';
// // // import { useAuthStore } from '../store/authStore';
// // // import { getImageUrl } from '../lib/utils';
// // // import { trainingPlanApi, authApi } from '../lib/api';
// // // import { activeWorkoutApi } from '../lib/api';
// // // // Import ALL necessary types from your types.ts file
// // // import { TrainingPlan, FitnessLevel, Goal, TrainingDuration, PlanDay, ActiveTrainingPlanResponse, MultiplePlansResponseItem, Trainee,PlanDayResponseForFrontend } from '../types';

// // // import { formatApiError } from '../lib/utils';
// // // import axios from 'axios';

// // // const HomePage: React.FC = () => {
// // //   const { user } = useAuthStore();
// // //   const navigate = useNavigate();

// // //   // Primary states
// // //   const [activeSection, setActiveSection] = useState<'current' | 'history'>('current');
// // //   const [activePlanData, setActivePlanData] = useState<ActiveTrainingPlanResponse | null>(null);
// // //   const [historyPlansData, setHistoryPlansData] = useState<MultiplePlansResponseItem[]>([]);

// // //   const [isLoading, setIsLoading] = useState(true); // לטעינת התוכניות הכללית
// // //   const [error, setError] = useState<string | null>(null);

// // //   // **מצב חדש לטיפול בטעינה של התחלת אימון ספציפי**
// // //   const [isStartingWorkout, setIsStartingWorkout] = useState<boolean>(false);
// // //   const [startingWorkoutPlanDayId, setStartingWorkoutPlanDayId] = useState<number | null>(null);


// // //   // States for dynamic options from API
// // //   const [fitnessLevels, setFitnessLevels] = useState<FitnessLevel[]>([]);
// // //   const [goals, setGoals] = useState<Goal[]>([]);
// // //   const [durations, setDurations] = useState<TrainingDuration[]>([]);

// // //   // State for managing expanded plan (to show plan days)
// // //   const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null);

// // //   // Fetch plans (active and historical)
// // //   const fetchPlans = async () => {
// // //     if (!user?.traineeId) return;
// // //     try {
// // //       setIsLoading(true);
// // //       setError(null);

// //   //     let activePlanResult: ActiveTrainingPlanResponse | null = null;
// // //       try {
// // //         activePlanResult = await trainingPlanApi.getActivePlans(user.traineeId);
// // //       } catch (activeErr: any) {
// // //         if (activeErr.response && activeErr.response.status === 404) {
// // //           console.log("No active training plan found (HTTP 404). This is expected behavior.");
// // //           activePlanResult = null;
// // //         } else {
// // //           console.error("Error fetching active plan:", activeErr);
// // //           setError(formatApiError(activeErr));
// // //           activePlanResult = null;
// // //         }
// // //       }

// // //       const historyResponse = await trainingPlanApi.getHistoryPlans(user.traineeId);

// // //       setActivePlanData(activePlanResult);
// // //       setHistoryPlansData(historyResponse || []);

// // //     } catch (err: any) {
// // //       console.error("General error fetching plans:", err);
// // //       setError(formatApiError(err));
// // //       setActivePlanData(null);
// // //       setHistoryPlansData([]);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     const fetchOptions = async () => {
// // //       try {
// // //         const [levels, goals, durations] = await Promise.all([
// // //           authApi.getFitnessLevels(),
// // //           authApi.getGoals(),
// // //           authApi.getTrainingDurations()
// // //         ]);
// // //         setFitnessLevels(levels);
// // //         setGoals(goals);
// // //         setDurations(durations);
// // //       } catch (err: any) {
// // //         console.error("Error fetching options:", err);
// // //         alert(`שגיאה בטעינת אפשרויות: ${formatApiError(err)}`);
// // //       }
// // //     };
// // //     fetchOptions();
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchPlans();
// // //   }, [user?.traineeId]);


// // //   const getLevelName = (id: number) =>
// // //     fitnessLevels.find((l) => l.fitnessLevelId === id)?.fitnessLevelName || '';
// // //   const getGoalName = (id: number) =>
// // //     goals.find((g) => g.goalId === id)?.goalName || '';
// // //   const getDurationName = (id: number) => {
// // //     const duration = durations.find((d) => d.trainingDurationId === id);
// // //     return duration ? `${duration.timeTrainingDuration} דקות` : '';
// // //   };

// // //   // const startWorkout = async (planDayId: number) => {
// // //   //   if (!user?.traineeId) {
// // //   //     alert('שגיאה: מזהה מתאמן לא נמצא. אנא התחבר מחדש.');
// // //   //     return;
// // //   //   }

// // //   //   // **הפעלת מצב טעינה**
// // //   //   setIsStartingWorkout(true);
// // //   //   setStartingWorkoutPlanDayId(planDayId); // שומרים איזה יום אימון נטען

// // //   //   try {
// // //   //     const traineeDetails: Trainee = await activeWorkoutApi.getTraineeById(user.traineeId);

// // //   //     if (!activePlanData || !activePlanData.planDays) {
// // //   //       throw new Error('לא נמצאו פרטי תוכנית אימון פעילה או ימי אימון.');
// // //   //     }

// // //   //     const selectedPlanDay = activePlanData.planDays.find(day => day.planDayId === planDayId);

// // //   //     if (!selectedPlanDay) {
// // //   //       throw new Error('פרטי יום האימון לא נמצאו עבור התוכנית הפעילה.');
// // //   //     }

// // //   //     const requestBodyForStartWorkout = {
// // //   //       Trainee: traineeDetails.traineeId,
// // //   //       planday: planDayId,
// // //   //       StartTime: new Date().toISOString(),
// // //   //     };

// // //   //     await activeWorkoutApi.startWorkout(requestBodyForStartWorkout);

// // //   //     navigate(`/WorkoutPage/${planDayId}`);
// // //   //   } catch (err: any) {
// // //   //     console.error('Failed to start workout:', err);
// // //   //     console.error('Server error details:', err.response?.data);

// // //   //     let userMessage = 'שגיאה לא ידועה בהתחלת הפעולה.';

// // //   //     if (axios.isAxiosError(err)) {
// // //   //       if (err.response) {
// // //   //         if (err.response.status === 429 || err.response.status === 503) {
// // //   //           const serverDetail = (err.response.data && typeof err.response.data === 'object' && err.response.data.detail)
// // //   //                                ? err.response.data.detail
// // //   //                                : (typeof err.response.data === 'string' ? err.response.data : 'השרת עמוס כרגע. אנא המתן מספר רגעים ונסה שוב.');
// // //   //           userMessage = serverDetail;
// // //   //         } else {
// // //   //           userMessage = formatApiError(err);
// // //   //         }
// // //   //       } else if (err.request) {
// // //   //         if (err.code === 'ECONNABORTED') {
// // //   //           userMessage = 'הפעולה נכשלה עקב עומס בשרת או חיבור איטי. אנא נסה שוב בעוד רגע.';
// // //   //         } else {
// // //   //           userMessage = 'שגיאת רשת: לא ניתן להתחבר לשרת. אנא בדוק את חיבור האינטרנט שלך.';
// // //   //         }
// // //   //       } else {
// // //   //         userMessage = `שגיאת בקשה: ${err.message}`;
// // //   //       }
// // //   //     } else if (err instanceof Error) {
// // //   //       userMessage = err.message;
// // //   //     }

// // //   //     alert(`שגיאה בהתחלת האימון: ${userMessage}`);
// // //   //   } finally {
// // //   //     // **כיבוי מצב טעינה בכל מקרה**
// // //   //     setIsStartingWorkout(false);
// // //   //     setStartingWorkoutPlanDayId(null);
// // //   //   }
// // //   // };
// // //     const startWorkout = async (planDayId: number) => {
// // //     if (!user?.traineeId) {
// // //       alert('שגיאה: מזהה מתאמן לא נמצא. אנא התחבר מחדש.');
// // //       return;
// // //     }

// // //     // **בדיקה חדשה: האם האימון כבר הושלם השבוע?**
// // //     const selectedPlanDay = activePlanData?.PlanDays?.find(day => day.PlanDayId === planDayId);

// // //     if (!selectedPlanDay) {
// // //       alert('שגיאה: פרטי יום האימון לא נמצאו.');
// // //       return;
// // //     }

// // //     // **הלוגיקה המרכזית:**
// // //     if (selectedPlanDay.IsCompletedThisWeek) {
// // //       alert(`לא ניתן להתחיל אימון זה. אימון "${selectedPlanDay.ProgramName}" כבר בוצע השבוע.`);
// // //       return; // עצור את הפעולה
// // //     }

// // //     setIsStartingWorkout(true);
// // //     setStartingWorkoutPlanDayId(planDayId);

// // //     try {
// // //       // אין צורך ב-getTraineeById אם ה-API כבר מקבל traineeId.
// // //       // ה-`requestBodyForStartWorkout.Trainee` צריך להיות `user.traineeId`.
// // //       // const traineeDetails: Trainee = await activeWorkoutApi.getTraineeById(user.traineeId); // זה כנראה מיותר כאן

// // //       const requestBodyForStartWorkout = {
// // //         Trainee: user.traineeId, // מזהה המתאמן
// // //         planday: planDayId,
// // //         StartTime: new Date().toISOString(),
// // //       };

// // //       await activeWorkoutApi.startWorkout(requestBodyForStartWorkout);

// // //       navigate(`/WorkoutPage/${planDayId}`);
// // //     } catch (err: any) {
// // //       console.error('Failed to start workout:', err);
// // //       console.error('Server error details:', err.response?.data);

// // //       let userMessage = 'שגיאה לא ידועה בהתחלת הפעולה.';

// // //       // הטיפול בשגיאות Axios
// // //       if (axios.isAxiosError(err)) {
// // //         if (err.response) {
// // //           // עבור שגיאות ספציפיות מהשרת (כגון 429 או 500 כלליות)
// // //           if (err.response.status === 429 || err.response.status === 503) {
// // //             const serverDetail = (err.response.data && typeof err.response.data === 'object' && err.response.data.detail)
// // //                                  ? err.response.data.detail
// // //                                  : (typeof err.response.data === 'string' ? err.response.data : 'השרת עמוס כרגע. אנא המתן מספר רגעים ונסה שוב.');
// // //             userMessage = serverDetail;
// // //           } else {
// // //             userMessage = formatApiError(err);
// // //           }
// // //         } else if (err.request) {
// // //           if (err.code === 'ECONNABORTED') {
// // //             userMessage = 'הפעולה נכשלה עקב עומס בשרת או חיבור איטי. אנא נסה שוב בעוד רגע.';
// // //           } else {
// // //             userMessage = 'שגיאת רשת: לא ניתן להתחבר לשרת. אנא בדוק את חיבור האינטרנט שלך.';
// // //           }
// // //         } else {
// // //           userMessage = `שגיאת בקשה: ${err.message}`;
// // //         }
// // //       } else if (err instanceof Error) {
// // //         userMessage = err.message;
// // //       }

// // //       alert(`שגיאה בהתחלת האימון: ${userMessage}`);
// // //     } finally {
// // //       setIsStartingWorkout(false);
// // //       setStartingWorkoutPlanDayId(null);
// // //     }
// // //   };

// // //   const togglePlanExpansion = (planId: number) => {
// // //     setExpandedPlanId(expandedPlanId === planId ? null : planId);
// // //   };

// // //   const renderPlanCard = (plan: TrainingPlan, planDays: PlanDay[], isCurrent: boolean) => (
// // //     <motion.div
// // //       key={plan.trainingPlanId}
// // //       initial={{ opacity: 0, scale: 0.9 }}
// // //       animate={{ opacity: 1, scale: 1 }}
// // //       transition={{ duration: 0.3 }}
// // //       className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
// // //     >
// // //       <div
// // //         className="h-40 bg-cover bg-center"
// // //         style={{ backgroundImage: `url(${getImageUrl('default')})` }}
// // //       ></div>
// // //       <div className="p-4">
// // //         <h3 className="text-lg font-medium text-gray-900">
// // //           {`תוכנית ל-${getGoalName(plan.goalId)}`}
// // //         </h3>
// // //         <p className="text-sm text-gray-500 mt-1">
// // //           {`אימון ל-${plan.trainingDays} ימים בשבוע`}
// // //         </p>
// // //         <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
// // //           <div>
// // //             <span className="font-medium">רמה:</span> {getLevelName(plan.fitnessLevelId)}
// // //           </div>
// // //           <div>
// // //             <span className="font-medium">זמן:</span> {getDurationName(plan.trainingDurationId)}
// // //           </div>
// // //           <div>
// // //             <span className="font-medium">התחלה:</span> {new Date(plan.startDate).toLocaleDateString('he-IL')}
// // //           </div>
// // //         </div>

// // //         <div className="mt-4">
// // //           <Button
// // //             onClick={() => togglePlanExpansion(plan.trainingPlanId)}
// // //             variant="ghost"
// // //             fullWidth
// // //             className="justify-between text-blue-600 hover:text-blue-700"
// // //             icon={expandedPlanId === plan.trainingPlanId ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
// // //           >
// // //             {expandedPlanId === plan.trainingPlanId ? 'הסתר ימי אימון' : 'הצג ימי אימון'}
// // //           </Button>
// // //         </div>

// // //         {expandedPlanId === plan.trainingPlanId && planDays && planDays.length > 0 && (
// // //           <motion.div
// // //             initial={{ opacity: 0, height: 0 }}
// // //             animate={{ opacity: 1, height: 'auto' }}
// // //             transition={{ duration: 0.3 }}
// // //             className="mt-4 border-t pt-4"
// // //           >
// // //             <h4 className="font-medium text-gray-800 mb-2">ימי אימון:</h4>
// // //             <div className="space-y-2">
// // //               {planDays
// // //                 .sort((a, b) => a.dayOrder - b.dayOrder)
// // //                 .map((day) => (
// // //                   <div key={day.planDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
// // //                     <span className="text-gray-700">{`יום ${day.dayOrder}: ${day.programName}`}</span>
// // //                     {isCurrent && (
// // //                       <Button
// // //                         onClick={() => startWorkout(day.planDayId)}
// // //                         size="sm"
// // //                         // **נטרול הכפתור והצגת טעינה**
// // //                         disabled={isStartingWorkout} // נטרל את הכפתור בזמן טעינה
// // //                         icon={
// // //                           isStartingWorkout && startingWorkoutPlanDayId === day.planDayId ? (
// // //                             <Loader2 className="h-4 w-4 animate-spin" /> // אייקון טעינה
// // //                           ) : (
// // //                             <Play className="h-4 w-4" />
// // //                           )
// // //                         }
// // //                       >
// // //                         {isStartingWorkout && startingWorkoutPlanDayId === day.planDayId
// // //                           ? 'מכין אימון...' // הודעת טעינה
// // //                           : 'התחל'}
// // //                       </Button>
// // //                     )}
// // //                   </div>
// // //                 ))}
// // //             </div>
// // //           </motion.div>
// // //         )}
// // //       </div>
// // //     </motion.div>
// // //   );

// // //   return (
// // //     <div className="space-y-8">
// // //       <motion.div
// // //         initial={{ opacity: 0, y: 20 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.5 }}
// // //       >
// // //         {/* User welcome section */}
// // //         <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
// // //           <div className="px-4 py-5 sm:px-6">
// // //             <h2 className="text-xl font-medium text-gray-900">
// // //               שלום, {user?.traineeName}
// // //             </h2>
// // //             <p className="mt-1 max-w-2xl text-sm text-gray-500">
// // //               ברוך הבא למערכת האימונים שלך
// // //             </p>
// // //           </div>
// // //           <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
// // //             <div className="flex space-x-4 space-x-reverse">
// // //               <Button
// // //                 variant="outline"
// // //                 onClick={() => navigate('/profile')}
// // //                 icon={<Edit className="h-4 w-4" />}
// // //                 disabled={isStartingWorkout} // נטרל גם את זה בזמן טעינה של אימון
// // //               >
// // //                 עדכון פרטים אישיים
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Plans display section */}
// // //         <div className="bg-white shadow sm:rounded-lg overflow-hidden">
// // //           <div className="border-b border-gray-200">
// // //             <nav className="flex">
// // //               <button
// // //                 onClick={() => setActiveSection('current')}
// // //                 className={`px-6 py-4 text-center text-sm font-medium ${
// // //                   activeSection === 'current'
// // //                     ? 'border-b-2 border-blue-500 text-blue-600'
// // //                     : 'text-gray-500 hover:text-gray-700'
// // //                 }`}
// // //                 disabled={isStartingWorkout} // נטרל בזמן טעינה של אימון
// // //               >
// // //                 <div className="flex items-center">
// // //                   <Calendar className="h-4 w-4 ml-2" />
// // //                   <span>תוכנית אימון נוכחית</span>
// // //                 </div>
// // //               </button>
// // //               <button
// // //                 onClick={() => setActiveSection('history')}
// // //                 className={`px-6 py-4 text-center text-sm font-medium ${
// // //                   activeSection === 'history'
// // //                     ? 'border-b-2 border-blue-500 text-blue-600'
// // //                     : 'text-gray-500 hover:text-gray-700'
// // //                 }`}
// // //                 disabled={isStartingWorkout} // נטרל בזמן טעינה של אימון
// // //               >
// // //                 <div className="flex items-center">
// // //                   <History className="h-4 w-4 ml-2" />
// // //                   <span>היסטוריית אימונים</span>
// // //                 </div>
// // //               </button>
// // //             </nav>
// // //           </div>

// // //           <div className="p-4 sm:p-6">
// // //             {isLoading ? (
// // //               <div className="text-center py-8 text-gray-500">טוען...</div>
// // //             ) : error ? (
// // //               <div className="text-center text-red-500 py-8">{error}</div>
// // //             ) : activeSection === 'current' ? (
// // //               activePlanData ? (
// // //                 renderPlanCard(activePlanData, activePlanData.PlanDays, true)
// // //               ) : (
// // //                 <div className="text-center py-8 text-gray-500">לא נמצאה תוכנית אימון פעילה.</div>
// // //               )
// // //             ) : (
// // //               historyPlansData.length === 0 ? (
// // //                 <div className="text-center py-8 text-gray-500">לא נמצאו תוכניות אימון היסטוריות.</div>
// // //               ) : (
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                   {historyPlansData.map((planData) =>
// // //                     renderPlanCard(planData.trainingPlan, planData.planDays, false)
// // //                   )}
// // //                 </div>
// // //               )
// // //             )}
// // //             {/* **הודעת טעינה מרכזית כאשר מתחילים אימון** */}
// // //             {isStartingWorkout && (
// // //               <motion.div
// // //                 initial={{ opacity: 0 }}
// // //                 animate={{ opacity: 1 }}
// // //                 className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
// // //               >
// // //                 <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
// // //                   <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
// // //                   <p className="text-lg font-semibold text-gray-800">
// // //                     המערכת מכינה את האימון שלך...
// // //                   </p>
// // //                   <p className="text-sm text-gray-600">אנא המתן מספר רגעים.</p>
// // //                 </div>
// // //               </motion.div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // };

// // // export default HomePage;

// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { Play, Calendar, History, Edit, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
// // import Button from '../components/ui/Button';
// // import { useAuthStore } from '../store/authStore';
// // import { getImageUrl } from '../lib/utils';
// // import { trainingPlanApi, authApi } from '../lib/api';
// // import { activeWorkoutApi } from '../lib/api';
// // import { formatApiError } from '../lib/utils';
// // import axios from 'axios';

// // // Import ALL necessary types from your types.ts file
// // // Ensure these types are correctly defined in your 'types.ts' file.
// // // The key here is the distinction between PlanDay and PlanDayResponseForFrontend
// // import {
// //   TrainingPlan, // Basic training plan structure for history
// //   FitnessLevel,
// //   Goal,
// //   TrainingDuration,
// //   PlanDay, // Generic PlanDay structure (e.g., for historical plans)
// //   ActiveTrainingPlanResponse, // Specific DTO for the active plan (includes PlanDaysResponseForFrontend)
// //   MultiplePlansResponseItem, // For history plans
// //   Trainee, // If still used somewhere
// //   PlanDayResponseForFrontend, // Specific PlanDay DTO for the frontend, with IsCompletedThisWeek
// // } from '../types';

// // const HomePage: React.FC = () => {
// //   const { user } = useAuthStore();
// //   const navigate = useNavigate();

// //   // Primary states
// //   const [activeSection, setActiveSection] = useState<'current' | 'history'>('current');
// //   const [activePlanData, setActivePlanData] = useState<ActiveTrainingPlanResponse | null>(null);
// //   const [historyPlansData, setHistoryPlansData] = useState<MultiplePlansResponseItem[]>([]);

// //   const [isLoading, setIsLoading] = useState(true); // For general plan loading
// //   const [error, setError] = useState<string | null>(null);

// //   // State for specific workout start loading
// //   const [isStartingWorkout, setIsStartingWorkout] = useState<boolean>(false);
// //   const [startingWorkoutPlanDayId, setStartingWorkoutPlanDayId] = useState<number | null>(null);

// //   // States for dynamic options from API
// //   const [fitnessLevels, setFitnessLevels] = useState<FitnessLevel[]>([]);
// //   const [goals, setGoals] = useState<Goal[]>([]);
// //   const [durations, setDurations] = useState<TrainingDuration[]>([]);

// //   // State for managing expanded plan (to show plan days)
// //   const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null);


// //   // Fetch plans (active and historical)
// //   const fetchPlans = async () => {
// //     if (!user?.traineeId) {
// //       setError("שגיאה: מזהה מתאמן לא נמצא. אנא התחבר מחדש.");
// //       setIsLoading(false);
// //       return;
// //     }
// //     try {
// //       setIsLoading(true);
// //       setError(null);

// //       let activePlanResult: ActiveTrainingPlanResponse | null = null;
// //       try {
// //         // This call should fetch ActiveTrainingPlanResponse with PlanDayResponseForFrontend[]
// //         //activePlanResult = await activeWorkoutApi.getActivePlans(user.traineeId); // Changed to activeWorkoutApi
// //         activePlanResult = await activeWorkoutApi.getTraineeActiveTrainingPlan(user.traineeId); // Changed to activeWorkoutApi
// //       } catch (activeErr: any) {

// //         if (activeErr.response && activeErr.response.status === 404) {
// //           console.log("No active training plan found (HTTP 404). This is expected behavior.");
// //           activePlanResult = null;
// //         } else {
// //           console.error("Error fetching active plan:", activeErr);
// //           setError(formatApiError(activeErr));
// //           activePlanResult = null;
// //         }
// //       }

// //       // This should fetch MultiplePlansResponseItem which has TrainingPlan and PlanDay[]
// //       const historyResponse = await trainingPlanApi.getHistoryPlans(user.traineeId);

// //       setActivePlanData(activePlanResult);
// //       setHistoryPlansData(historyResponse || []);

// //     } catch (err: any) {
// //       console.error("General error fetching plans:", err);
// //       setError(formatApiError(err));
// //       setActivePlanData(null);
// //       setHistoryPlansData([]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const fetchOptions = async () => {
// //       try {
// //         const [levels, goals, durations] = await Promise.all([
// //           authApi.getFitnessLevels(),
// //           authApi.getGoals(),
// //           authApi.getTrainingDurations()
// //         ]);
// //         setFitnessLevels(levels);
// //         setGoals(goals);
// //         setDurations(durations);
// //       } catch (err: any) {
// //         console.error("Error fetching options:", err);
// //         alert(`שגיאה בטעינת אפשרויות: ${formatApiError(err)}`);
// //       }
// //     };
// //     fetchOptions();
// //   }, []);

// //   useEffect(() => {
// //     fetchPlans();
// //   }, [user?.traineeId]);


// //   const getLevelName = (id: number) =>
// //     fitnessLevels.find((l) => l.fitnessLevelId === id)?.fitnessLevelName || '';
// //   const getGoalName = (id: number) =>
// //     goals.find((g) => g.goalId === id)?.goalName || '';
// //   const getDurationName = (id: number) => {
// //     const duration = durations.find((d) => d.trainingDurationId === id);
// //     return duration ? `${duration.timeTrainingDuration} דקות` : '';
// //   };

// //   const startWorkout = async (planDayId: number) => {
// //     if (!user?.traineeId) {
// //       alert('שגיאה: מזהה מתאמן לא נמצא. אנא התחבר מחדש.');
// //       return;
// //     }

// //     // IMPORTANT: activePlanData.PlanDays contains PlanDayResponseForFrontend
// //     const selectedPlanDay = activePlanData?.PlanDays?.find(day => day.PlanDayId === planDayId);
  
// //     if (!selectedPlanDay) {
// //       alert('שגיאה: פרטי יום האימון לא נמצאו.');
// //       return;
// //     }

// //     // **The core logic: check IsCompletedThisWeek**
// //     if (selectedPlanDay.IsCompletedThisWeek) {
// //       alert(`לא ניתן להתחיל אימון זה. אימון "${selectedPlanDay.ProgramName}" כבר בוצע השבוע.`);
// //       // Optionally, you might want to fetch plans again to ensure the UI is up-to-date
// //       // if for some reason, the state was stale (though unlikely if fetchPlans is robust)
// //       // fetchPlans();
// //       return; // Stop the action
// //     }

// //     setIsStartingWorkout(true);
// //     setStartingWorkoutPlanDayId(planDayId);

// //     try {
// //       const requestBodyForStartWorkout = {
// //         Trainee: user.traineeId, // TraineeId from authenticated user
// //         planday: planDayId,
// //         StartTime: new Date().toISOString(),
// //       };

// //       await activeWorkoutApi.startWorkout(requestBodyForStartWorkout);

// //       // After successful start, navigate and then refresh the plans
// //       navigate(`/WorkoutPage/${planDayId}`);
// //       // Consider adding a slight delay or navigate first, then refresh plans in WorkoutPage
// //       // For now, let's refresh here after a small timeout to allow navigation to start
// //       setTimeout(() => fetchPlans(), 500); // Refresh plans to update IsCompletedThisWeek status
// //                                            // for the just started workout, or if it completes quickly.

// //     } catch (err: any) {
// //       console.error('Failed to start workout:', err);
// //       console.error('Server error details:', err.response?.data);

// //       let userMessage = 'שגיאה לא ידועה בהתחלת הפעולה.';
// //       if (axios.isAxiosError(err)) {
// //         if (err.response) {
// //           if (err.response.status === 429 || err.response.status === 503) {
// //             const serverDetail = (err.response.data && typeof err.response.data === 'object' && err.response.data.detail)
// //                                  ? err.response.data.detail
// //                                  : (typeof err.response.data === 'string' ? err.response.data : 'השרת עמוס כרגע. אנא המתן מספר רגעים ונסה שוב.');
// //             userMessage = serverDetail;
// //           } else {
// //             userMessage = formatApiError(err);
// //           }
// //         } else if (err.request) {
// //           if (err.code === 'ECONNABORTED') {
// //             userMessage = 'הפעולה נכשלה עקב עומס בשרת או חיבור איטי. אנא נסה שוב בעוד רגע.';
// //           } else {
// //             userMessage = 'שגיאת רשת: לא ניתן להתחבר לשרת. אנא בדוק את חיבור האינטרנט שלך.';
// //           }
// //         } else {
// //           userMessage = `שגיאת בקשה: ${err.message}`;
// //         }
// //       } else if (err instanceof Error) {
// //         userMessage = err.message;
// //       }
// //       alert(`שגיאה בהתחלת האימון: ${userMessage}`);
// //     } finally {
// //       setIsStartingWorkout(false);
// //       setStartingWorkoutPlanDayId(null);
// //     }
// //   };

// //   const togglePlanExpansion = (planId: number) => {
// //     setExpandedPlanId(expandedPlanId === planId ? null : planId);
// //   };

// //   // Helper function to render a single PlanDay button for the ACTIVE plan
// //   // This will handle the IsCompletedThisWeek logic
// //   const renderActivePlanDayButton = (day: PlanDayResponseForFrontend) => {
// //     const isWorkoutStarting = isStartingWorkout && startingWorkoutPlanDayId === day.PlanDayId;
// //     const isDisabled = isWorkoutStarting || day.IsCompletedThisWeek;
// //     const buttonText = isWorkoutStarting ? 'מכין אימון...' : 'התחל';

// //     const buttonStyle: React.CSSProperties = {
// //       cursor: isDisabled ? 'not-allowed' : 'pointer',
// //       backgroundColor: day.IsCompletedThisWeek ? '#ccc' : '#4CAF50', // Gray if completed, green otherwise
// //       color: 'white',
// //     };

// //     return (
// //       <div key={day.PlanDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
// //         <span className="text-gray-700">{`יום ${day.DayOrder}: ${day.ProgramName}`}</span>
// //         <div className="flex items-center gap-2">
// //           {day.IsCompletedThisWeek && (
// //             <span className="text-red-500 text-xs">(בוצע השבוע)</span>
// //           )}
// //           <Button
// //             onClick={() => startWorkout(day.PlanDayId)}
// //             size="sm"
// //             disabled={isDisabled}
// //             style={buttonStyle}
// //             icon={
// //               isWorkoutStarting && startingWorkoutPlanDayId === day.PlanDayId ? (
// //                 <Loader2 className="h-4 w-4 animate-spin" />
// //               ) : (
// //                 <Play className="h-4 w-4" />
// //               )
// //             }
// //           >
// //             {buttonText}
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // The renderPlanCard function needs to be adapted to handle both types of plan data
// //   const renderPlanCard = (
// //     planData: TrainingPlan | ActiveTrainingPlanResponse, // Can be either type
// //     planDays: PlanDay[] | PlanDayResponseForFrontend[], // Can be either type
// //     isCurrent: boolean
// //   ) => {
// //     // Type guard to determine which properties to access for the main plan info
// //     const planInfo = planData as TrainingPlan; // Use TrainingPlan for common properties

// //     return (
// //       <motion.div
// //         key={planInfo.trainingPlanId} // Use common ID
// //         initial={{ opacity: 0, scale: 0.9 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ duration: 0.3 }}
// //         className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
// //       >
// //         <div
// //           className="h-40 bg-cover bg-center"
// //           style={{ backgroundImage: `url(${getImageUrl('default')})` }}
// //         ></div>
// //         <div className="p-4">
// //           <h3 className="text-lg font-medium text-gray-900">
// //             {`תוכנית ל-${getGoalName(planInfo.goalId)}`}
// //           </h3>
// //           <p className="text-sm text-gray-500 mt-1">
// //             {`אימון ל-${planInfo.trainingDays} ימים בשבוע`}
// //           </p>
// //           <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
// //             <div>
// //               <span className="font-medium">רמה:</span> {getLevelName(planInfo.fitnessLevelId)}
// //             </div>
// //             <div>
// //               <span className="font-medium">זמן:</span> {getDurationName(planInfo.trainingDurationId)}
// //             </div>
// //             <div>
// //               <span className="font-medium">התחלה:</span> {new Date(planInfo.startDate).toLocaleDateString('he-IL')}
// //             </div>
// //           </div>

// //           <div className="mt-4">
// //             <Button
// //               onClick={() => togglePlanExpansion(planInfo.trainingPlanId)}
// //               variant="ghost"
// //               fullWidth
// //               className="justify-between text-blue-600 hover:text-blue-700"
// //               icon={expandedPlanId === planInfo.trainingPlanId ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
// //             >
// //               {expandedPlanId === planInfo.trainingPlanId ? 'הסתר ימי אימון' : 'הצג ימי אימון'}
// //             </Button>
// //           </div>

// //           {/* {expandedPlanId === planInfo.trainingPlanId && planDays && planDays.length > 0 && (
// //             <motion.div
// //               initial={{ opacity: 0, height: 0 }}
// //               animate={{ opacity: 1, height: 'auto' }}
// //               transition={{ duration: 0.3 }}
// //               className="mt-4 border-t pt-4"
// //             >
// //               <h4 className="font-medium text-gray-800 mb-2">ימי אימון:</h4>
// //               <div className="space-y-2">
// //                 {planDays
// //                   .sort((a, b) => {
                   
// //                     const aOrder = 'DayOrder' in a ? a.DayOrder : (a as PlanDay).dayOrder;
// //                     const bOrder = 'DayOrder' in b ? b.DayOrder : (b as PlanDay).dayOrder;
// //                     return aOrder - bOrder;
// //                   })
// //                   .map((day) => {
// //                     if (isCurrent) {
// //                       return renderActivePlanDayButton(day as PlanDayResponseForFrontend);
// //                     } else {
// //                       return (
// //                         <div key={'PlanDayId' in day ? day.PlanDayId : (day as PlanDay).planDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
// //                           <span className="text-gray-700">{`יום ${'DayOrder' in day ? day.DayOrder : (day as PlanDay).dayOrder}: ${'ProgramName' in day ? day.ProgramName : (day as PlanDay).programName}`}</span>
                        
// //                         </div>
// //                       );
// //                     }
// //                   })}
// //               </div>
// //             </motion.div>
// //           )} */}

// //         {expandedPlanId === planInfo.trainingPlanId && planDays && planDays.length > 0 && (
// //           <motion.div
// //             initial={{ opacity: 0, height: 0 }}
// //             animate={{ opacity: 1, height: 'auto' }}
// //             transition={{ duration: 0.3 }}
// //             className="mt-4 border-t pt-4"
// //           >
// //             <h4 className="font-medium text-gray-800 mb-2">ימי אימון:</h4>
// //             <div className="space-y-2">
// //               {planDays
// //                 .sort((a, b) => {
// //                   const aOrder = 'DayOrder' in a ? a.DayOrder : (a as any).dayOrder;
// //                   const bOrder = 'DayOrder' in b ? b.DayOrder : (b as any).dayOrder;
// //                   return aOrder - bOrder;
// //                 })
// //                 .map((day) => (
// //                   <div key={'PlanDayId' in day ? day.PlanDayId : (day as any).planDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
// //                     <span className="text-gray-700">{`יום ${'DayOrder' in day ? day.DayOrder : (day as any).dayOrder}: ${'ProgramName' in day ? day.ProgramName : (day as any).programName}`}</span>
// //                     {isCurrent && (
// //                       <Button
// //                         onClick={() => startWorkout('PlanDayId' in day ? day.PlanDayId : (day as any).planDayId)}
// //                         size="sm"
// //                         icon={<Play className="h-4 w-4" />}
// //                       >
// //                         התחל
// //                       </Button>
// //                     )}
// //                   </div>
// //                 ))}
// //             </div>
// //           </motion.div>
// //         )}

// //         </div>
// //       </motion.div>
// //     );
// //   };

// //   return (
// //     <div className="space-y-8">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //       >
// //         {/* User welcome section */}
// //         <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
// //           <div className="px-4 py-5 sm:px-6">
// //             <h2 className="text-xl font-medium text-gray-900">
// //               שלום, {user?.traineeName}
// //             </h2>
// //             <p className="mt-1 max-w-2xl text-sm text-gray-500">
// //               ברוך הבא למערכת האימונים שלך
// //             </p>
// //           </div>
// //           <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
// //             <div className="flex space-x-4 space-x-reverse">
// //               <Button
// //                 variant="outline"
// //                 onClick={() => navigate('/profile')}
// //                 icon={<Edit className="h-4 w-4" />}
// //                 disabled={isStartingWorkout}
// //               >
// //                 עדכון פרטים אישיים
// //               </Button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Plans display section */}
// //         <div className="bg-white shadow sm:rounded-lg overflow-hidden">
// //           <div className="border-b border-gray-200">
// //             <nav className="flex">
// //               <button
// //                 onClick={() => setActiveSection('current')}
// //                 className={`flex-1 px-6 py-4 text-center text-sm font-medium ${
// //                   activeSection === 'current'
// //                     ? 'border-b-2 border-blue-500 text-blue-600'
// //                     : 'text-gray-500 hover:text-gray-700'
// //                 }`}
// //                 disabled={isStartingWorkout}
// //               >
// //                 <div className="flex items-center justify-center">
// //                   <Calendar className="h-4 w-4 ml-2" />
// //                   <span>תוכנית אימון נוכחית</span>
// //                 </div>
// //               </button>
// //               <button
// //                 onClick={() => setActiveSection('history')}
// //                 className={`flex-1 px-6 py-4 text-center text-sm font-medium ${
// //                   activeSection === 'history'
// //                     ? 'border-b-2 border-blue-500 text-blue-600'
// //                     : 'text-gray-500 hover:text-gray-700'
// //                 }`}
// //                 disabled={isStartingWorkout}
// //               >
// //                 <div className="flex items-center justify-center">
// //                   <History className="h-4 w-4 ml-2" />
// //                   <span>היסטוריית אימונים</span>
// //                 </div>
// //               </button>
// //             </nav>
// //           </div>

// //           <div className="p-4 sm:p-6">
// //             {isLoading ? (
// //               <div className="text-center py-8 text-gray-500">טוען...</div>
// //             ) : error ? (
// //               <div className="text-center text-red-500 py-8">{error}</div>
// //             ) : activeSection === 'current' ? (
// //               activePlanData ? (
// //                 // For the current plan, pass activePlanData directly
// //                 renderPlanCard(activePlanData, activePlanData.PlanDays, true)
// //               ) : (
// //                 <div className="text-center py-8 text-gray-500">לא נמצאה תוכנית אימון פעילה.</div>
// //               )
// //             ) : (
// //               historyPlansData.length === 0 ? (
// //                 <div className="text-center py-8 text-gray-500">לא נמצאו תוכניות אימון היסטוריות.</div>
// //               ) : (
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                   {historyPlansData.map((planData) =>
// //                     // For history plans, pass the TrainingPlan and generic PlanDay[]
// //                     renderPlanCard(planData.trainingPlan, planData.planDays, false)
// //                   )}
// //                 </div>
// //               )
// //             )}
// //             {/* Global loading overlay for workout start */}
// //             {isStartingWorkout && (
// //               <motion.div
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
// //               >
// //                 <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
// //                   <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
// //                   <p className="text-lg font-semibold text-gray-800">
// //                     המערכת מכינה את האימון שלך...
// //                   </p>
// //                   <p className="text-sm text-gray-600">אנא המתן מספר רגעים.</p>
// //                 </div>
// //               </motion.div>
// //             )}
// //           </div>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default HomePage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Play, Calendar, History, Edit, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
// import Button from '../components/ui/Button';
// import { useAuthStore } from '../store/authStore';
// import { getImageUrl } from '../lib/utils';
// import { trainingPlanApi, authApi } from '../lib/api';
// import { activeWorkoutApi } from '../lib/api';
// import { formatApiError } from '../lib/utils';
// import axios from 'axios';

// // Import ALL necessary types from your types.ts file
// import {
//   //TrainingPlanForHistory, // Renamed type for clarity (history plans)
//   FitnessLevel,
//   Goal,
//   TrainingDuration,
//   PlanDay, // Now the camelCase PlanDay type
//   ActiveTrainingPlanResponse, // The camelCase active plan response
//   MultiplePlansResponseItem, // For history plans
//   // Trainee, // You don't seem to use Trainee directly as a type here, can be removed if not needed
// } from '../types';
// import type { TrainingPlan } from '../types';


// const HomePage: React.FC = () => {
//   const { user } = useAuthStore();
//   const navigate = useNavigate();

//   const [activeSection, setActiveSection] = useState<'current' | 'history'>('current');
//   const [activePlanData, setActivePlanData] = useState<ActiveTrainingPlanResponse | null>(null);
//   const [historyPlansData, setHistoryPlansData] = useState<MultiplePlansResponseItem[]>([]);

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [isStartingWorkout, setIsStartingWorkout] = useState<boolean>(false);
//   const [startingWorkoutPlanDayId, setStartingWorkoutPlanDayId] = useState<number | null>(null);

//   const [fitnessLevels, setFitnessLevels] = useState<FitnessLevel[]>([]);
//   const [goals, setGoals] = useState<Goal[]>([]);
//   const [durations, setDurations] = useState<TrainingDuration[]>([]);

//   const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null);

//   const fetchPlans = async () => {
//     if (!user?.traineeId) {
//       setError("שגיאה: מזהה מתאמן לא נמצא. אנא התחבר מחדש.");
//       setIsLoading(false);
//       return;
//     }
//     try {
//       setIsLoading(true);
//       setError(null);

//       let activePlanResult: ActiveTrainingPlanResponse | null = null;
//       try {
//         // This call should fetch ActiveTrainingPlanResponse with PlanDay[] in camelCase
//         activePlanResult = await activeWorkoutApi.getTraineeActiveTrainingPlan(user.traineeId);
//       } catch (activeErr: any) {
//         if (activeErr.response && activeErr.response.status === 404) {
//           console.log("No active training plan found (HTTP 404). This is expected behavior.");
//           activePlanResult = null;
//         } else {
//           console.error("Error fetching active plan:", activeErr);
//           setError(formatApiError(activeErr));
//           activePlanResult = null;
//         }
//       }

//       const historyResponse = await trainingPlanApi.getHistoryPlans(user.traineeId);

//       setActivePlanData(activePlanResult);
//       setHistoryPlansData(historyResponse || []);

//     } catch (err: any) {
//       console.error("General error fetching plans:", err);
//       setError(formatApiError(err));
//       setActivePlanData(null);
//       setHistoryPlansData([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         const [levels, goals, durations] = await Promise.all([
//           authApi.getFitnessLevels(),
//           authApi.getGoals(),
//           authApi.getTrainingDurations()
//         ]);
//         setFitnessLevels(levels);
//         setGoals(goals);
//         setDurations(durations);
//       } catch (err: any) {
//         console.error("Error fetching options:", err);
//         alert(`שגיאה בטעינת אפשרויות: ${formatApiError(err)}`);
//       }
//     };
//     fetchOptions();
//   }, []);

//   useEffect(() => {
//     fetchPlans();
//   }, [user?.traineeId]);

//   const getLevelName = (id: number) =>
//     fitnessLevels.find((l) => l.fitnessLevelId === id)?.fitnessLevelName || '';
//   const getGoalName = (id: number) =>
//     goals.find((g) => g.goalId === id)?.goalName || '';
//   const getDurationName = (id: number) => {
//     const duration = durations.find((d) => d.trainingDurationId === id);
//     return duration ? `${duration.timeTrainingDuration} דקות` : '';
//   };

//   const startWorkout = async (planDayId: number) => {
//     if (!user?.traineeId) {
//       alert('שגיאה: מזהה מתאמן לא נמצא. אנא התחבר מחדש.');
//       return;
//     }

//     // IMPORTANT: activePlanData.planDays contains PlanDay[] (camelCase)
//     const selectedPlanDay = activePlanData?.planDays?.find(day => day.planDayId === planDayId);

//     if (!selectedPlanDay) {
//       alert('שגיאה: פרטי יום האימון לא נמצאו.');
//       return;
//     }

//     // **The core logic: check isCompletedThisWeek**
//     if (selectedPlanDay.isCompletedThisWeek) { // Changed to camelCase
//       alert(`לא ניתן להתחיל אימון זה. אימון "${selectedPlanDay.programName}" כבר בוצע השבוע.`); // Changed to camelCase
//       return;
//     }

//     setIsStartingWorkout(true);
//     setStartingWorkoutPlanDayId(planDayId);

//     try {
//       // Ensure the request body uses PascalCase if your backend expects it for the request DTO
//       // const requestBodyForStartWorkout = {
//       //   TraineeId: user.traineeId, // Assuming backend expects TraineeId (PascalCase) for request
//       //   PlanDayId: planDayId,    // Assuming backend expects PlanDayId (PascalCase) for request
//       //   StartTime: new Date().toISOString(), // Assuming backend expects StartTime (PascalCase) for request
//       // };
//       const requestBodyForStartWorkout = {
//         Trainee: user.traineeId,
//         planday: planDayId,
//         StartTime: new Date().toISOString(),
//       };

//       await activeWorkoutApi.startWorkout(requestBodyForStartWorkout);

//       navigate(`/WorkoutPage/${planDayId}`);
//       setTimeout(() => fetchPlans(), 500);
//     } catch (err: any) {
//       console.error('Failed to start workout:', err);
//       console.error('Server error details:', err.response?.data);

//       let userMessage = 'שגיאה לא ידועה בהתחלת הפעולה.';
//       if (axios.isAxiosError(err)) {
//         if (err.response) {
//           if (err.response.status === 429 || err.response.status === 503) {
//             const serverDetail = (err.response.data && typeof err.response.data === 'object' && err.response.data.detail)
//                                  ? err.response.data.detail
//                                  : (typeof err.response.data === 'string' ? err.response.data : 'השרת עמוס כרגע. אנא המתן מספר רגעים ונסה שוב.');
//             userMessage = serverDetail;
//           } else {
//             userMessage = formatApiError(err);
//           }
//         } else if (err.request) {
//           if (err.code === 'ECONNABORTED') {
//             userMessage = 'הפעולה נכשלה עקב עומס בשרת או חיבור איטי. אנא נסה שוב בעוד רגע.';
//           } else {
//             userMessage = 'שגיאת רשת: לא ניתן להתחבר לשרת. אנא בדוק את חיבור האינטרנט שלך.';
//           }
//         } else {
//           userMessage = `שגיאת בקשה: ${err.message}`;
//         }
//       } else if (err instanceof Error) {
//         userMessage = err.message;
//       }
//       alert(`שגיאה בהתחלת האימון: ${userMessage}`);
//     } finally {
//       setIsStartingWorkout(false);
//       setStartingWorkoutPlanDayId(null);
//     }
//   };

//   const togglePlanExpansion = (planId: number) => {
//     setExpandedPlanId(expandedPlanId === planId ? null : planId);
//   };

//   // Helper function to render a single PlanDay button for the ACTIVE plan
//   // This will handle the isCompletedThisWeek logic
//   const renderActivePlanDayButton = (day: PlanDay) => { // Type is now PlanDay (camelCase)
//     const isWorkoutStarting = isStartingWorkout && startingWorkoutPlanDayId === day.planDayId; // camelCase
//     const isDisabled = isWorkoutStarting || day.isCompletedThisWeek; // camelCase
//     const buttonText = isWorkoutStarting ? 'מכין אימון...' : 'התחל';

//     const buttonStyle: React.CSSProperties = {
//       cursor: isDisabled ? 'not-allowed' : 'pointer',
//       backgroundColor: day.isCompletedThisWeek ? '#ccc' : '#4CAF50', // camelCase
//       color: 'white',
//     };

//     return (
//       <div key={day.planDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
//         <span className="text-gray-700">{`יום ${day.dayOrder}: ${day.programName}`}</span> {/* camelCase */}
//         <div className="flex items-center gap-2">
//           {day.isCompletedThisWeek && ( // camelCase
//             <span className="text-red-500 text-xs">(בוצע השבוע)</span>
//           )}
//           <Button
//             onClick={() => startWorkout(day.planDayId)} // camelCase
//             size="sm"
//             disabled={isDisabled}
//             style={buttonStyle}
//             icon={
//               isWorkoutStarting && startingWorkoutPlanDayId === day.planDayId ? ( // camelCase
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Play className="h-4 w-4" />
//               )
//             }
//           >
//             {buttonText}
//           </Button>
//         </div>
//       </div>
//     );
//   };

//   // The renderPlanCard function needs to be adapted to handle both types of plan data
//   // Accept both ActiveTrainingPlanResponse and TrainingPlan for planData
  
//   const renderPlanCard = (
//     planData: ActiveTrainingPlanResponse | TrainingPlan,
//     planDays: PlanDay[],
//     isCurrent: boolean
//   ) => {
//     // Type guard: if planData has 'traineeName', it's ActiveTrainingPlanResponse, else TrainingPlan
//     const planInfo = planData as TrainingPlan;

//     return (
//       <motion.div
//         key={planInfo.trainingPlanId}
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//       >
//         <div
//           className="h-40 bg-cover bg-center"
//           style={{ backgroundImage: `url(${getImageUrl('default')})` }}
//         ></div>
//         <div className="p-4">
//           <h3 className="text-lg font-medium text-gray-900">
//             {/* {`תוכנית ל-${getGoalName(planInfo.goalId)}`}
//           </h3>
//           <p className="text-sm text-gray-500 mt-1">
//             {`אימון ל-${planInfo.trainingDays} ימים בשבוע`}
//           </p>
//           <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
//             <div>
//               <span className="font-medium">רמה:</span> {getLevelName(planInfo.fitnessLevelId)}
//             </div>
//             <div>
//               <span className="font-medium">זמן:</span> {getDurationName(planInfo.trainingDurationId)}
//             </div>
//             <div>
//               <span className="font-medium">התחלה:</span> {new Date(planInfo.startDate).toLocaleDateString('he-IL')}
//             </div>
//           </div>

//           <div className="mt-4">
//             <Button
//               onClick={() => togglePlanExpansion(planInfo.trainingPlanId)}
//               variant="ghost"
//               fullWidth
//               className="justify-between text-blue-600 hover:text-blue-700"
//               icon={expandedPlanId === planInfo.trainingPlanId ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
//             >
//               {expandedPlanId === planInfo.trainingPlanId ? 'הסתר ימי אימון' : 'הצג ימי אימון'}
//             </Button>
//           </div>

//           {expandedPlanId === planInfo.trainingPlanId && planDays && planDays.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               transition={{ duration: 0.3 }}
//               className="mt-4 border-t pt-4"
//             >
//               <h4 className="font-medium text-gray-800 mb-2">ימי אימון:</h4>
//               <div className="space-y-2">
//                 {planDays
//                   .sort((a, b) => a.dayOrder - b.dayOrder)
//                   .map((day) => {
//                     if (isCurrent) {
//                       return renderActivePlanDayButton(day);
//                     } else { */}
//                      {`תוכנית ל-${getGoalName(planInfo.goalId)}`}
//           </h3>
//           <p className="text-sm text-gray-500 mt-1">
//             {`אימון ל-${planInfo.trainingDays} ימים בשבוע`}
//           </p>
//           <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
//             <div>
//               <span className="font-medium">רמה:</span> {getLevelName(planInfo.fitnessLevelId)}
//             </div>
//             <div>
//               <span className="font-medium">זמן:</span> {getDurationName(planInfo.trainingDurationId)}
//             </div>
//             <div>
//               <span className="font-medium">התחלה:</span> {new Date(planInfo.startDate).toLocaleDateString('he-IL')}
//             </div>
//           </div>

//           <div className="mt-4">
//             <Button
//               onClick={() => togglePlanExpansion(planInfo.trainingPlanId)}
//               variant="ghost"
//               fullWidth
//               className="justify-between text-blue-600 hover:text-blue-700"
//               icon={expandedPlanId === planInfo.trainingPlanId ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
//             >
//               {expandedPlanId === planInfo.trainingPlanId ? 'הסתר ימי אימון' : 'הצג ימי אימון'}
//             </Button>
//           </div>

//           {expandedPlanId === planInfo.trainingPlanId && planDays && planDays.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               transition={{ duration: 0.3 }}
//               className="mt-4 border-t pt-4"
//             >
//               <h4 className="font-medium text-gray-800 mb-2">ימי אימון:</h4>
//               <div className="space-y-2">
//                 {planDays
//                   .sort((a, b) => a.dayOrder - b.dayOrder)
//                   .map((day) => {
//                     if (isCurrent) {
//                       return renderActivePlanDayButton(day);
//                     } else {

//                       return (
//                         <div key={day.planDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
//                           <span className="text-gray-700">{`יום ${day.dayOrder}: ${day.programName}`}</span>
//                         </div>
//                       );
//                     }
//                   })}
//               </div>
//             </motion.div>
//           )}

//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="space-y-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* User welcome section */}
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
//           <div className="px-4 py-5 sm:px-6">
//             <h2 className="text-xl font-medium text-gray-900">
//               שלום, {user?.traineeName}
//             </h2>
//             <p className="mt-1 max-w-2xl text-sm text-gray-500">
//               ברוך הבא למערכת האימונים שלך
//             </p>
//           </div>
//           <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
//             <div className="flex space-x-4 space-x-reverse">
//               <Button
//                 variant="outline"
//                 onClick={() => navigate('/profile')}
//                 icon={<Edit className="h-4 w-4" />}
//                 disabled={isStartingWorkout}
//               >
//                 עדכון פרטים אישיים
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Plans display section */}
//         <div className="bg-white shadow sm:rounded-lg overflow-hidden">
//           <div className="border-b border-gray-200">
//             <nav className="flex">
//               <button
//                 onClick={() => setActiveSection('current')}
//                 className={`flex-1 px-6 py-4 text-center text-sm font-medium ${
//                   activeSection === 'current'
//                     ? 'border-b-2 border-blue-500 text-blue-600'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//                 disabled={isStartingWorkout}
//               >
//                 <div className="flex items-center justify-center">
//                   <Calendar className="h-4 w-4 ml-2" />
//                   <span>תוכנית אימון נוכחית</span>
//                 </div>
//               </button>
//               <button
//                 onClick={() => setActiveSection('history')}
//                 className={`flex-1 px-6 py-4 text-center text-sm font-medium ${
//                   activeSection === 'history'
//                     ? 'border-b-2 border-blue-500 text-blue-600'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//                 disabled={isStartingWorkout}
//               >
//                 <div className="flex items-center justify-center">
//                   <History className="h-4 w-4 ml-2" />
//                   <span>היסטוריית אימונים</span>
//                 </div>
//               </button>
//             </nav>
//           </div>

//           <div className="p-4 sm:p-6">
//             {isLoading ? (
//               <div className="text-center py-8 text-gray-500">טוען...</div>
//             ) : error ? (
//               <div className="text-center text-red-500 py-8">{error}</div>
//             ) : activeSection === 'current' ? (
//               activePlanData ? (
//                 // For the current plan, pass activePlanData directly
//                 renderPlanCard(activePlanData, activePlanData.planDays, true) // camelCase
//               ) : (
//                 <div className="text-center py-8 text-gray-500">לא נמצאה תוכנית אימון פעילה.</div>
//               )
//             ) : (
//               historyPlansData.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">לא נמצאו תוכניות אימון היסטוריות.</div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {historyPlansData.map((planData) =>
//                     // For history plans, pass the TrainingPlanForHistory and generic PlanDay[]
//                     renderPlanCard(planData.trainingPlan, planData.planDays, false) // camelCase
//                   )}
//                 </div>
//               )
//             )}
//             {/* Global loading overlay for workout start */}
//             {isStartingWorkout && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//               >
//                 <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
//                   <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
//                   <p className="text-lg font-semibold text-gray-800">
//                     המערכת מכינה את האימון שלך...
//                   </p>
//                   <p className="text-sm text-gray-600">אנא המתן מספר רגעים.</p>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default HomePage;

// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Calendar, History, Edit, ChevronUp, ChevronDown, Loader2, LayoutDashboard } from 'lucide-react'; // ייבא גם LayoutDashboard
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { getImageUrl } from '../lib/utils';
import { trainingPlanApi, authApi } from '../lib/api';
import { activeWorkoutApi } from '../lib/api';
import { formatApiError } from '../lib/utils';
import axios from 'axios';

// Import ALL necessary types from your types.ts file
import {
    FitnessLevel,
    Goal,
    TrainingDuration,
    PlanDay,
    ActiveTrainingPlanResponse,
    MultiplePlansResponseItem,
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
                if (activeErr.response && activeErr.response.status === 404) {
                    console.log("No active training plan found (HTTP 404). This is expected behavior.");
                    activePlanResult = null;
                } else {
                    console.error("Error fetching active plan:", activeErr);
                    setError(formatApiError(activeErr));
                    activePlanResult = null;
                }
            }

            const historyResponse = await trainingPlanApi.getHistoryPlans(user.traineeId);

            setActivePlanData(activePlanResult);
            setHistoryPlansData(historyResponse || []);

        } catch (err: any) {
            console.error("General error fetching plans:", err);
            setError(formatApiError(err));
            setActivePlanData(null);
            setHistoryPlansData([]);
        } finally {
            setIsLoading(false);
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

        const selectedPlanDay = activePlanData?.planDays?.find(day => day.planDayId === planDayId);

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
    };

    const renderActivePlanDayButton = (day: PlanDay) => {
        const isWorkoutStarting = isStartingWorkout && startingWorkoutPlanDayId === day.planDayId;
        const isDisabled = isWorkoutStarting || day.isCompletedThisWeek;
        const buttonText = isWorkoutStarting ? 'מכין אימון...' : 'התחל';

        const buttonStyle: React.CSSProperties = {
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            backgroundColor: day.isCompletedThisWeek ? '#ccc' : '#4CAF50',
            color: 'white',
        };

        return (
            <div key={day.planDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <span className="text-gray-700">{`יום ${day.dayOrder}: ${day.programName}`}</span>
                <div className="flex items-center gap-2">
                    {day.isCompletedThisWeek && (
                        <span className="text-red-500 text-xs">(בוצע השבוע)</span>
                    )}
                    <Button
                        onClick={() => startWorkout(day.planDayId)}
                        size="sm"
                        disabled={isDisabled}
                        style={buttonStyle}
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
        );
    };

    const renderPlanCard = (
        planData: ActiveTrainingPlanResponse | TrainingPlan,
        planDays: PlanDay[],
        isCurrent: boolean
    ) => {
        const planInfo = planData as TrainingPlan; // For common properties like trainingPlanId, goalId etc.

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
                    </div>

                    <div className="mt-4">
                        <Button
                            onClick={() => togglePlanExpansion(planInfo.trainingPlanId)}
                            variant="ghost"
                            fullWidth
                            className="justify-between text-blue-600 hover:text-blue-700"
                            icon={expandedPlanId === planInfo.trainingPlanId ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
                        >
                            {expandedPlanId === planInfo.trainingPlanId ? 'הסתר ימי אימון' : 'הצג ימי אימון'}
                        </Button>
                    </div>

                    {expandedPlanId === planInfo.trainingPlanId && planDays && planDays.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 border-t pt-4"
                        >
                            <h4 className="font-medium text-gray-800 mb-2">ימי אימון:</h4>
                            <div className="space-y-2">
                                {planDays
                                    .sort((a, b) => a.dayOrder - b.dayOrder)
                                    .map((day) => {
                                        if (isCurrent) {
                                            return renderActivePlanDayButton(day);
                                        } else {
                                            return (
                                                <div key={day.planDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                                                    <span className="text-gray-700">{`יום ${day.dayOrder}: ${day.programName}`}</span>
                                                </div>
                                            );
                                        }
                                    })}
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
                                disabled={isStartingWorkout}
                            >
                                עדכון פרטים אישיים
                            </Button>
                            {/* ** הוספת כפתור ללוח המחוונים של המתאמן ** */}
                            <Button
                                variant="outline"
                                onClick={() => navigate('/trainee-dashboard')} 
                                icon={<LayoutDashboard className="h-4 w-4" />}
                                disabled={isStartingWorkout}
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
                                disabled={isStartingWorkout}
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
                                disabled={isStartingWorkout}
                            >
                                <div className="flex items-center justify-center">
                                    <History className="h-4 w-4 ml-2" />
                                    <span>היסטוריית אימונים</span>
                                </div>
                            </button>
                        </nav>
                    </div>

                    <div className="p-4 sm:p-6">
                        {isLoading ? (
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
                                        renderPlanCard(planData.trainingPlan, planData.planDays, false)
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