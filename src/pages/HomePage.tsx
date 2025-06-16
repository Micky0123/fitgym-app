// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Play, Calendar, History, Edit, ChevronUp, ChevronDown } from 'lucide-react';
// import Button from '../components/ui/Button';
// import { useAuthStore } from '../store/authStore';
// import { getImageUrl } from '../lib/utils';
// import { trainingPlanApi, authApi } from '../lib/api';
// import { activeWorkoutApi } from '../lib/api'; // <--- ייבוא חדש
// // Import ALL necessary types from your types.ts file
// import {PathResult, TrainingPlan, FitnessLevel, Goal, TrainingDuration, PlanDay, ActiveTrainingPlanResponse, MultiplePlansResponseItem, Trainee } from '../types';

// // REMOVE these duplicate type definitions, they belong in types.ts
// // type SingleTrainingPlanResponse = {
// //   trainingPlan: TrainingPlan | null;
// //   planDays: PlanDay[];
// // };
// // type MultiplePlansResponseItem = {
// //   trainingPlan: TrainingPlan;
// //   planDays: PlanDay[];
// // };

// const HomePage: React.FC = () => {
//   const { user } = useAuthStore();
//   const navigate = useNavigate();

//   // Primary states
//   const [activeSection, setActiveSection] = useState<'current' | 'history'>('current');
//   // activePlanData will directly hold the TrainingPlan object (including PlanDays) or null
//   // This type is now correct: it expects what the API function promises.
//   const [activePlanData, setActivePlanData] = useState<ActiveTrainingPlanResponse>(null); // <-- Corrected type!
//   // historyPlans will hold a list of wrapper objects
//   const [historyPlansData, setHistoryPlansData] = useState<MultiplePlansResponseItem[]>([]);

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // States for dynamic options from API (no change here)
//   const [fitnessLevels, setFitnessLevels] = useState<FitnessLevel[]>([]);
//   const [goals, setGoals] = useState<Goal[]>([]);
//   const [durations, setDurations] = useState<TrainingDuration[]>([]);

//   // State for managing expanded plan (to show plan days)
//   const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null);

//   // Fetch plans (active and historical)
//   const fetchPlans = async () => {
//     if (!user?.traineeId) return;
//     try {
//       setIsLoading(true);
//       setError(null);

//       // Fetch active plan:
//       // We need a specific try-catch for the active plan because a 404 (Not Found)
//       // from the backend means "no active plan," which is not an error we want to
//       // display as a general fetch error.
//       let activePlanResult: ActiveTrainingPlanResponse = null;
//       try {
//         activePlanResult = await trainingPlanApi.getActivePlans(user.traineeId);
//       } catch (activeErr: any) {
//         // If the backend returns 404, it means no active plan was found.
//         // We catch this specifically and set activePlanResult to null,
//         // which will trigger the "No active plan found" message.
//         if (activeErr.response && activeErr.response.status === 404) {
//           console.log("No active training plan found (HTTP 404). This is expected behavior.");
//           activePlanResult = null; // Successfully handled "no plan found" scenario
//         } else {
//           // For other types of errors (e.g., network issues, 500 server error),
//           // we'll log it and let the general error state handle it.
//           console.error("Error fetching active plan:", activeErr);
//           setError(activeErr?.message || 'שגיאה בטעינת התוכנית הפעילה');
//           activePlanResult = null; // Ensure null state for rendering
//         }
//       }

//       // Fetch history plans:
//       // This is generally less prone to a "not found" scenario resulting in a 404,
//       // as an empty array is a valid response for no history.
//       const historyResponse = await trainingPlanApi.getHistoryPlans(user.traineeId);

//       // Now set the states with the correctly fetched/handled data
//       setActivePlanData(activePlanResult); // activePlanResult is already TrainingPlan or null
//       setHistoryPlansData(historyResponse || []); // Ensure it's always an array

//     } catch (err: any) { // This catch block will handle general errors or errors from historyPromise
//       console.error("General error fetching plans:", err);
//       setError(err?.message || 'שגיאה כללית בטעינת התוכניות');
//       setActivePlanData(null);
//       setHistoryPlansData([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ... (fetchOptions, useEffects, getLevelName, getGoalName, getDurationName remain unchanged)
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
//       } catch (err) {
//         console.error("Error fetching options:", err);
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

//   // const startWorkout = (planDayId: number) => {
//   //   navigate(`/workout/${planDayId}`);
//   // };

//   //   // --- שינוי כאן: הפעלת אימון דרך ה-API ---
//   // const startWorkout = async (planDayId: number) => {
//   //   if (!user?.traineeId) {
//   //     alert('שגיאה: מזהה מתאמן לא נמצא.');
//   //     return;
//   //   }

//   //   try {
//   //     // קודם כל, נביא את פרטי המתאמן כדי לשלוח אותם ל-API
//   //     const traineeDetails: Trainee = await activeWorkoutApi.getTraineeById(user.traineeId);
      
//   //     const requestBody = {
//   //       Trainee: traineeDetails.traineeId, // ה-API מצפה ל-TraineeDTO מלא
//   //       planday: planDayId,
//   //       //StartTime: new Date().toISOString(), // זמן נוכחי בפורמט ISO
//   //       StartTime: "2025-06-15T07:16:03.889Z", // זמן נוכחי בפורמט ISO
//   //     };
      
//   //     await activeWorkoutApi.startWorkout(requestBody);
//   //     // אם הצליח, נווט לדף האימון עם ה-planDayId
//   //     navigate(`/WorkoutPage/${planDayId}`);
//   //   }  catch (err: any) {
//   //   console.error('Failed to start workout:', err);
//   //   if (err.response) {
//   //       // הדפס את תגובת השגיאה המלאה מהשרת
//   //       console.error('Server error details:', err.response.data);
//   //       alert(`שגיאה בהתחלת האימון: ${JSON.stringify(err.response.data)}`);
//   //   } else {
//   //       alert(`שגיאה בהתחלת האימון: ${err.message}`);
//   //   }
//   // }
//  // };

//   const startWorkout = async (planDayId: number) => {
//     if (!user?.traineeId) {
//       alert('שגיאה: מזהה מתאמן לא נמצא. אנא התחבר מחדש.');
//       return;
//     }

//     try {
//       // 1. נביא את פרטי המתאמן המלאים מה-Backend
//       // זה חשוב כי ה-Backend מצפה ל-TraineeDTO מלא, לא רק ל-ID
//       const traineeDetails: Trainee = await activeWorkoutApi.getTraineeById(user.traineeId);

//       // 2. נגדיר את ה-requestBody כפי שה-Backend מצפה ב-StartWorkout
//       // ה-Backend שלך מצפה ל-TraineeDTO, לרשימת ExercisePlanDTO, לזמן התחלה ול-planDayId
//       // נצטרך לשלוף את ה-ExercisePlanDTOs מתוך ה-planDay שהתקבל ב-activePlanData
//       const selectedPlanDay = activePlanData?.planDays.find(day => day.planDayId === planDayId);

//       if (!selectedPlanDay) {
//         throw new Error('פרטי יום האימון לא נמצאו עבור התוכנית הפעילה.');
//       }

//       // נמיר את ה-PlanDayDTO ואת רשימת ה-ExercisePlanDTOs שלו לפורמט שה-Backend מצפה
//       // שימי לב: הקוד ב-C# שלך ל-StartWorkoutAsync מצפה ל-TraineeDTO, List<ExercisePlanDTO>, DateTime, int
//       // אנחנו צריכים לוודא שה-Frontend שולח את זה נכון.
//       // אם ה-ExercisePlanDTO כבר נמצא בתוך ה-PlanDayDTO, צריך לשלוף אותו משם.
//       // מתוך ה-Backend: public async Task<PathResult> StartWorkoutAsync(TraineeDTO trainee, List<ExercisePlanDTO> exerciseOrder, DateTime startTime, int planDayId)
//       const requestBodyForStartWorkout = {
//         Trainee: traineeDetails.traineeId, // רק ה-ID של המתאמן
//         planday: planDayId,
//         StartTime: new Date().toISOString(), // זמן נוכחי בפורמט ISO 8601
//       };

//       // 3. קריאה ל-API של התחלת אימון
//       // הפונקציה startWorkout ב-API הלקוח שלך צריכה לקבל את requestBody הזה.
//       const pathResult: PathResult = await activeWorkoutApi.startWorkout(requestBodyForStartWorkout);

//       // 4. אם הצליח, נווט לדף האימון עם ה-planDayId
//       // או אולי עם ה-traineeId אם דף האימון מסתמך על זה
//       navigate(`/workoutpage/${planDayId}`); // או `/workoutpage/${user.traineeId}` אם תצוגת האימון תלויה בזה
//     } catch (err: any) {
//       console.error('Failed to start workout:', err);
//       if (err.response) {
//         console.error('Server error details:', err.response.data);
//         alert(`שגיאה בהתחלת האימון: ${typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data)}`);
//       } else {
//         alert(`שגיאה בהתחלת האימון: ${err.message || 'שגיאה לא ידועה'}`);
//       }
//     }
//   // --- סוף שינוי ---

//   const togglePlanExpansion = (planId: number) => {
//     setExpandedPlanId(expandedPlanId === planId ? null : planId);
//   };

//   // Render a single plan card (reusable function)
//   // This function is still good, as it expects a plan and planDays separately.
//   const renderPlanCard = (plan: TrainingPlan, planDays: PlanDay[], isCurrent: boolean) => (
//     <motion.div
//       key={plan.trainingPlanId}
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//     >
//       <div
//         className="h-40 bg-cover bg-center"
//         style={{ backgroundImage: `url(${getImageUrl('default')})` }}
//       ></div>
//       <div className="p-4">
//         <h3 className="text-lg font-medium text-gray-900">
//           {`תוכנית ל-${getGoalName(plan.goalId)}`}
//         </h3>
//         <p className="text-sm text-gray-500 mt-1">
//           {`אימון ל-${plan.trainingDays} ימים בשבוע`}
//         </p>
//         <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
//           <div>
//             <span className="font-medium">רמה:</span> {getLevelName(plan.fitnessLevelId)}
//           </div>
//           <div>
//             <span className="font-medium">זמן:</span> {getDurationName(plan.trainingDurationId)}
//           </div>
//           <div>
//             <span className="font-medium">התחלה:</span> {new Date(plan.startDate).toLocaleDateString('he-IL')}
//           </div>
//         </div>

//         <div className="mt-4">
//           <Button
//             onClick={() => togglePlanExpansion(plan.trainingPlanId)}
//             variant="ghost"
//             fullWidth
//             className="justify-between text-blue-600 hover:text-blue-700"
//             icon={expandedPlanId === plan.trainingPlanId ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
//           >
//             {expandedPlanId === plan.trainingPlanId ? 'הסתר ימי אימון' : 'הצג ימי אימון'}
//           </Button>
//         </div>

//         {expandedPlanId === plan.trainingPlanId && planDays && planDays.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             transition={{ duration: 0.3 }}
//             className="mt-4 border-t pt-4"
//           >
//             <h4 className="font-medium text-gray-800 mb-2">ימי אימון:</h4>
//             <div className="space-y-2">
//               {planDays
//                 .sort((a, b) => a.dayOrder - b.dayOrder)
//                 .map((day) => (
//                   <div key={day.planDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
//                     <span className="text-gray-700">{`יום ${day.dayOrder}: ${day.programName}`}</span>
//                     {isCurrent && (
//                       <Button
//                         onClick={() => startWorkout(day.planDayId)}
//                         size="sm"
//                         icon={<Play className="h-4 w-4" />}
//                       >
//                         התחל
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
  
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
//                 className={`px-6 py-4 text-center text-sm font-medium ${
//                   activeSection === 'current'
//                     ? 'border-b-2 border-blue-500 text-blue-600'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <Calendar className="h-4 w-4 ml-2" />
//                   <span>תוכנית אימון נוכחית</span>
//                 </div>
//               </button>
//               <button
//                 onClick={() => setActiveSection('history')}
//                 className={`px-6 py-4 text-center text-sm font-medium ${
//                   activeSection === 'history'
//                     ? 'border-b-2 border-blue-500 text-blue-600'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <div className="flex items-center">
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
//               // Render active plan
//               // activePlanData is directly TrainingPlan | null now
//               activePlanData ? (
//                 // If activePlanData exists, it's a TrainingPlan object
//                 renderPlanCard(activePlanData, activePlanData.planDays, true)
//               ) : (
//                 <div className="text-center py-8 text-gray-500">לא נמצאה תוכנית אימון פעילה.</div>
//               )
//             ) : (
//               // Render historical plans
//               historyPlansData.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">לא נמצאו תוכניות אימון היסטוריות.</div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {historyPlansData.map((planData) =>
//                     renderPlanCard(planData.trainingPlan, planData.planDays, false)
//                   )}
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default HomePage;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Calendar, History, Edit, ChevronUp, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { getImageUrl } from '../lib/utils';
import { trainingPlanApi, authApi } from '../lib/api';
import { activeWorkoutApi } from '../lib/api';
// Import ALL necessary types from your types.ts file
import { TrainingPlan, FitnessLevel, Goal, TrainingDuration, PlanDay, ActiveTrainingPlanResponse, MultiplePlansResponseItem, Trainee } from '../types';


const HomePage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Primary states
  const [activeSection, setActiveSection] = useState<'current' | 'history'>('current');
  const [activePlanData, setActivePlanData] = useState<ActiveTrainingPlanResponse>(null);
  const [historyPlansData, setHistoryPlansData] = useState<MultiplePlansResponseItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // States for dynamic options from API
  const [fitnessLevels, setFitnessLevels] = useState<FitnessLevel[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [durations, setDurations] = useState<TrainingDuration[]>([]);

  // State for managing expanded plan (to show plan days)
  const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null);

  // Fetch plans (active and historical)
  const fetchPlans = async () => {
    if (!user?.traineeId) return;
    try {
      setIsLoading(true);
      setError(null);

      let activePlanResult: ActiveTrainingPlanResponse = null;
      try {
        activePlanResult = await trainingPlanApi.getActivePlans(user.traineeId);
      } catch (activeErr: any) {
        if (activeErr.response && activeErr.response.status === 404) {
          console.log("No active training plan found (HTTP 404). This is expected behavior.");
          activePlanResult = null;
        } else {
          console.error("Error fetching active plan:", activeErr);
          setError(activeErr?.message || 'שגיאה בטעינת התוכנית הפעילה');
          activePlanResult = null;
        }
      }

      const historyResponse = await trainingPlanApi.getHistoryPlans(user.traineeId);

      setActivePlanData(activePlanResult);
      setHistoryPlansData(historyResponse || []);

    } catch (err: any) {
      console.error("General error fetching plans:", err);
      setError(err?.message || 'שגיאה כללית בטעינת התוכניות');
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
      } catch (err) {
        console.error("Error fetching options:", err);
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

    try {
      const traineeDetails: Trainee = await activeWorkoutApi.getTraineeById(user.traineeId);

      // וודא ש-activePlanData אינו null ושיש לו planDays
      if (!activePlanData || !activePlanData.planDays) {
        throw new Error('לא נמצאו פרטי תוכנית אימון פעילה או ימי אימון.');
      }

      const selectedPlanDay = activePlanData.planDays.find(day => day.planDayId === planDayId);

      if (!selectedPlanDay) {
        throw new Error('פרטי יום האימון לא נמצאו עבור התוכנית הפעילה.');
      }

      // ה-Backend שלך מצפה ל-TraineeDTO, לרשימת ExercisePlanDTO, לזמן התחלה ול-planDayId
      const requestBodyForStartWorkout = {
        Trainee: traineeDetails.traineeId, // רק ה-ID של המתאמן
        planday: planDayId,
        StartTime: new Date().toISOString(), // זמן נוכחי בפורמט ISO 8601
      };

      await activeWorkoutApi.startWorkout(requestBodyForStartWorkout);

      navigate(`/WorkoutPage/${planDayId}`);
    } catch (err: any) {
      console.error('Failed to start workout:', err);
      if (err.response) {
        console.error('Server error details:', err.response.data);
        alert(`שגיאה בהתחלת האימון: ${typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data)}`);
      } else {
        alert(`שגיאה בהתחלת האימון: ${err.message || 'שגיאה לא ידועה'}`);
      }
    }
  };

  const togglePlanExpansion = (planId: number) => {
    setExpandedPlanId(expandedPlanId === planId ? null : planId);
  };

  const renderPlanCard = (plan: TrainingPlan, planDays: PlanDay[], isCurrent: boolean) => (
    <motion.div
      key={plan.trainingPlanId}
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
          {`תוכנית ל-${getGoalName(plan.goalId)}`}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {`אימון ל-${plan.trainingDays} ימים בשבוע`}
        </p>
        <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
          <div>
            <span className="font-medium">רמה:</span> {getLevelName(plan.fitnessLevelId)}
          </div>
          <div>
            <span className="font-medium">זמן:</span> {getDurationName(plan.trainingDurationId)}
          </div>
          <div>
            <span className="font-medium">התחלה:</span> {new Date(plan.startDate).toLocaleDateString('he-IL')}
          </div>
        </div>

        <div className="mt-4">
          <Button
            onClick={() => togglePlanExpansion(plan.trainingPlanId)}
            variant="ghost"
            fullWidth
            className="justify-between text-blue-600 hover:text-blue-700"
            icon={expandedPlanId === plan.trainingPlanId ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
          >
            {expandedPlanId === plan.trainingPlanId ? 'הסתר ימי אימון' : 'הצג ימי אימון'}
          </Button>
        </div>

        {expandedPlanId === plan.trainingPlanId && planDays && planDays.length > 0 && (
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
                .map((day) => (
                  <div key={day.planDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <span className="text-gray-700">{`יום ${day.dayOrder}: ${day.programName}`}</span>
                    {isCurrent && (
                      <Button
                        onClick={() => startWorkout(day.planDayId)}
                        size="sm"
                        icon={<Play className="h-4 w-4" />}
                      >
                        התחל
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

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
              >
                עדכון פרטים אישיים
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
                className={`px-6 py-4 text-center text-sm font-medium ${
                  activeSection === 'current'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 ml-2" />
                  <span>תוכנית אימון נוכחית</span>
                </div>
              </button>
              <button
                onClick={() => setActiveSection('history')}
                className={`px-6 py-4 text-center text-sm font-medium ${
                  activeSection === 'history'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center">
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
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Play, Calendar, History, Edit, ChevronUp, ChevronDown } from 'lucide-react';
// import Button from '../components/ui/Button';
// import { useAuthStore } from '../store/authStore';
// import { getImageUrl } from '../lib/utils';
// import { trainingPlanApi, authApi } from '../lib/api'; 
// import { TrainingPlan, FitnessLevel, Goal, TrainingDuration, PlanDay } from '../types';

// // Type for the response of getActivePlans (single plan + its days)
// type SingleTrainingPlanResponse = {
//   trainingPlan: TrainingPlan | null;
//   planDays: PlanDay[];
// };

// // Type for the response of getHistoryPlans (array of plans + their days)
// type MultiplePlansResponseItem = {
//   trainingPlan: TrainingPlan;
//   planDays: PlanDay[];
// };


// const HomePage: React.FC = () => {
//   const { user } = useAuthStore();
//   const navigate = useNavigate();

//   // סטייטים עיקריים
//   const [activeSection, setActiveSection] = useState<'current' | 'history'>('current');
//   // activePlan יכיל את ה-TrainingPlan הראשי ואת ימי האימון שלו
//   const [activePlanData, setActivePlanData] = useState<TrainingPlan | null>(null);
//   // historyPlans יכיל רשימה של אובייקטים, כל אחד עם TrainingPlan ו-PlanDays
//   const [historyPlansData, setHistoryPlansData] = useState<MultiplePlansResponseItem[]>([]);

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // סטייטים לאפשרויות דינאמיות מה-API (לא שינוי כאן)
//   const [fitnessLevels, setFitnessLevels] = useState<FitnessLevel[]>([]);
//   const [goals, setGoals] = useState<Goal[]>([]);
//   const [durations, setDurations] = useState<TrainingDuration[]>([]);

//   // סטייט לניהול תוכנית מורחבת (להצגת ימי האימון)
//   const [expandedPlanId, setExpandedPlanId] = useState<number | null>(null);

//   // קבלת תוכניות (פעילות והיסטוריות)
//   const fetchPlans = async () => {
//     if (!user?.traineeId) return;
//     try {
//       setIsLoading(true);
//       setError(null);
      
//       const [activeResponse, historyResponse] = await Promise.all([
//         trainingPlanApi.getActivePlans(user.traineeId), // מחזיר TrainingPlan או null
//         trainingPlanApi.getHistoryPlans(user.traineeId)  // מצפה ל-MultiplePlansResponseItem[]
//       ]);

//       // ודא ש-activeResponse הוא TrainingPlan או null, ו-planDays הוא מערך ריק אם אין
//       setActivePlanData({
//         trainingPlan: activeResponse?.trainingPlan ?? null,
//         planDays: activeResponse?.planDays ?? [],
//       });
//       setHistoryPlansData(historyResponse || []); // לוודא שזו תמיד רשימה
//     } catch (err: any) {
//       console.error("Error fetching plans:", err);
//       setError(err?.message || 'שגיאה בטעינת התוכניות');
//       setActivePlanData(null);
//       setHistoryPlansData([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ... (הקוד של fetchOptions, useEffect for fetchOptions, useEffect for fetchPlans נשאר כמעט זהה)
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
//       } catch (err) {
//         console.error("Error fetching options:", err);
//       }
//     };
//     fetchOptions();
//   }, []);

//   useEffect(() => {
//     fetchPlans();
//   }, [user?.traineeId]);

//   // פונקציות תרגום מזהים לשמות
//   const getLevelName = (id: number) =>
//     fitnessLevels.find((l) => l.fitnessLevelId === id)?.fitnessLevelName || '';
//   const getGoalName = (id: number) =>
//     goals.find((g) => g.goalId === id)?.goalName || '';
//   const getDurationName = (id: number) => {
//     const duration = durations.find((d) => d.trainingDurationId === id);
//     return duration ? `${duration.timeTrainingDuration} דקות` : '';
//   };

//   const startWorkout = (planDayId: number) => {
//     navigate(`/workout/${planDayId}`);
//   };

//   const togglePlanExpansion = (planId: number) => {
//     setExpandedPlanId(expandedPlanId === planId ? null : planId);
//   };

//   // רנדור כרטיס תוכנית אימון בודדת (לשימוש חוזר)
//   const renderPlanCard = (plan: TrainingPlan, planDays: PlanDay[], isCurrent: boolean) => (
//     <motion.div
//       key={plan.trainingPlanId}
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//     >
//       <div
//         className="h-40 bg-cover bg-center"
//         style={{ backgroundImage: `url(${getImageUrl('default')})` }}
//       ></div>
//       <div className="p-4">
//         {/* נניח של-TrainingPlan יש גם 'PlanName' או שאתה רוצה להציג את ה-Goal */}
//         <h3 className="text-lg font-medium text-gray-900">
//           {`תוכנית ל-${getGoalName(plan.goalId)}`} {/* הצג את שם המטרה */}
//         </h3>
//         <p className="text-sm text-gray-500 mt-1">
//           {`אימון ל-${plan.trainingDays} ימים בשבוע`}
//         </p>
//         <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
//           <div>
//             <span className="font-medium">רמה:</span> {getLevelName(plan.fitnessLevelId)}
//           </div>
//           <div>
//             <span className="font-medium">זמן:</span> {getDurationName(plan.trainingDurationId)}
//           </div>
//           <div>
//             <span className="font-medium">התחלה:</span> {new Date(plan.startDate).toLocaleDateString('he-IL')}
//           </div>
//         </div>

//         {/* כפתור להרחבה/כיווץ ימי האימון */}
//         <div className="mt-4">
//           <Button
//             onClick={() => togglePlanExpansion(plan.trainingPlanId)}
//             variant="ghost"
//             fullWidth
//             className="justify-between text-blue-600 hover:text-blue-700"
//             icon={expandedPlanId === plan.trainingPlanId ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
//           >
//             {expandedPlanId === plan.trainingPlanId ? 'הסתר ימי אימון' : 'הצג ימי אימון'}
//           </Button>
//         </div>

//         {/* הצגת ימי האימון אם התוכנית מורחבת */}
//         {expandedPlanId === plan.trainingPlanId && planDays && planDays.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             transition={{ duration: 0.3 }}
//             className="mt-4 border-t pt-4"
//           >
//             <h4 className="font-medium text-gray-800 mb-2">ימי אימון:</h4>
//             <div className="space-y-2">
//               {planDays
//                 .sort((a, b) => a.dayOrder - b.dayOrder) // מיין לפי סדר יום
//                 .map((day) => (
//                   <div key={day.planDayId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
//                     <span className="text-gray-700">{`יום ${day.dayOrder}: ${day.programName}`}</span>
//                     {isCurrent && ( // הצג כפתור "התחל אימון" רק עבור ימי התוכנית הפעילה הנוכחית
//                       <Button
//                         onClick={() => startWorkout(day.planDayId)} // העבר את planDayId
//                         size="sm"
//                         icon={<Play className="h-4 w-4" />}
//                       >
//                         התחל
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="space-y-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* קטע קבלת פנים למשתמש (ללא שינוי) */}
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
//               >
//                 עדכון פרטים אישיים
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* קטע תצוגת התוכניות */}
//         <div className="bg-white shadow sm:rounded-lg overflow-hidden">
//           <div className="border-b border-gray-200">
//             <nav className="flex">
//               <button
//                 onClick={() => setActiveSection('current')}
//                 className={`px-6 py-4 text-center text-sm font-medium ${
//                   activeSection === 'current'
//                     ? 'border-b-2 border-blue-500 text-blue-600'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <Calendar className="h-4 w-4 ml-2" />
//                   <span>תוכנית אימון נוכחית</span>
//                 </div>
//               </button>
//               <button
//                 onClick={() => setActiveSection('history')}
//                 className={`px-6 py-4 text-center text-sm font-medium ${
//                   activeSection === 'history'
//                     ? 'border-b-2 border-blue-500 text-blue-600'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <div className="flex items-center">
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
//               // רנדור תוכנית פעילה
//               // activePlanData?.trainingPlan ? (
//               //   renderPlanCard(activePlanData.trainingPlan, activePlanData.planDays, true)
//               // ) : (
//               //   <div className="text-center py-8 text-gray-500">לא נמצאה תוכנית אימון פעילה.</div>
//               // )
//                   // רנדור תוכנית פעילה
//                   activePlanData && activePlanData.trainingPlan ? (
//                     renderPlanCard(activePlanData.trainingPlan, activePlanData.planDays, true)
//                   ) : (
//                     <div className="text-center py-8 text-gray-500">לא נמצאה תוכנית אימון פעילה.</div>
//                   )

//             ) : (
//               // רנדור תוכניות היסטוריות
//               historyPlansData.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">לא נמצאו תוכניות אימון היסטוריות.</div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {historyPlansData.map((planData) => 
//                     renderPlanCard(planData.trainingPlan, planData.planDays, false)
//                   )}
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default HomePage;










// const HomePage: React.FC = () => {
//   const { user } = useAuthStore();
//   const navigate = useNavigate();

//   // סטייטים עיקריים
//   const [activeSection, setActiveSection] = useState<'current' | 'history'>('current');
//   const [activePlans, setActivePlans] = useState<PlanDay[]>([]);
//   const [historyPlans, setHistoryPlans] = useState<PlanDay[]>([]);

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // סטייטים לאפשרויות דינאמיות מה-API
//   const [fitnessLevels, setFitnessLevels] = useState<FitnessLevel[]>([]);
//   const [goals, setGoals] = useState<Goal[]>([]);
//   const [durations, setDurations] = useState<TrainingDuration[]>([]);

//   // קבלת תוכניות
//   const fetchPlans = async () => {
//     if (!user?.traineeId) return;
//     try {
//       setIsLoading(true);
//       setError(null);
//       const [active, history] = await Promise.all([
//         trainingPlanApi.getActivePlans(user.traineeId),
//         trainingPlanApi.getHistoryPlans(user.traineeId)
//       ]);
//       setActivePlans(active);
//       setHistoryPlans(history);
//     } catch (err: any) {
//       setError(err?.message || 'שגיאה בטעינת התוכניות');
//       setActivePlans([]);
//       setHistoryPlans([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // קבלת אפשרויות (רמות/מטרות/משך) בטעינת העמוד
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
//       } catch (err) {
//         // אפשר להציג שגיאה אם צריך
//       }
//     };
//     fetchOptions();
//   }, []);

//   // קבלת תוכניות כאשר המשתמש נטען
//   useEffect(() => {
//     fetchPlans();
//     // eslint-disable-next-line
//   }, [user?.traineeId]);

//   // פונקציות תרגום מזהים לשמות מהאפשרויות הדינאמיות
//   const getLevelName = (id: number) =>
//     fitnessLevels.find((l) => l.fitnessLevelId === id)?.fitnessLevelName || '';
//   const getGoalName = (id: number) =>
//     goals.find((g) => g.goalId === id)?.goalName || '';
//   // const getDurationName = (id: number) =>
//   //   durations.find((d) => d.TimeTrainingDuration === id)?.TimeTrainingDuration || '';
//   // const getDurationName = (id: number) => {
//   //   const dur = durations.find((d) => d.TrainingDurationId === id);
//   //   return dur ? `${dur.TimeTrainingDuration} דקות` : '';
//   // };
//   const getDurationName = (id: number) => {
//   const duration = durations.find((d) => d.TrainingDurationId === id);
//   return duration ? duration.TimeTrainingDuration + " דקות" : '';
//   };
//   const startWorkout = (programId: number) => {
//     navigate(`/workout/${programId}`);
//   };

//   const renderPlans = (plans: PlanDay[]) => (
//     plans.length === 0 ? (
//       <div className="text-center py-8 text-gray-500">לא נמצאו תוכניות אימון.</div>
//     ) : (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {plans.map((program) => (
//           <motion.div
//             key={program.trainingPlanId}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//           >
//             <div
//               className="h-40 bg-cover bg-center"
//               style={{ backgroundImage: `url(${getImageUrl('default')})` }}
//             ></div>
//             <div className="p-4">
//               {/* <h3 className="text-lg font-medium text-gray-900">
//                 {getGoalName(program.goalId)}
//               </h3>
//               <p className="text-sm text-gray-500 mt-1">
//                 {`תוכנית ל-${program.trainingDays} ימים בשבוע`}
//               </p> */}
//               {/* <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4 space-x-reverse">
//                 <div>
//                   <span className="font-medium">רמה:</span> {getLevelName(program.fitnessLevelId)}
//                 </div>
//                 <div>
//                   <span className="font-medium">זמן:</span> {getDurationName(program.trainingDurationId)} */}
//                   {/* console.log('durationId from plan:', program.trainingDurationId, 'durations:', durations); */}
//                 {/* </div>
//                 <div>
//                   <span className="font-medium">התחלה:</span> {new Date(program.startDate).toLocaleDateString('he-IL')}
//                 </div>
//               </div> */}
//               {/* {program.isActive && (
//                 <div className="mt-4">
//                   <Button
//                     onClick={() => startWorkout(program.trainingPlanId)}
//                     fullWidth
//                     icon={<Play className="h-4 w-4" />}
//                   >
//                     התחל אימון
//                   </Button>
//                 </div>
//               )} */}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     )
//   );

//   return (
//     <div className="space-y-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
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
//               >
//                 עדכון פרטים אישיים
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white shadow sm:rounded-lg overflow-hidden">
//           <div className="border-b border-gray-200">
//             <nav className="flex">
//               <button
//                 onClick={() => setActiveSection('current')}
//                 className={`px-6 py-4 text-center text-sm font-medium ${
//                   activeSection === 'current'
//                     ? 'border-b-2 border-blue-500 text-blue-600'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <Calendar className="h-4 w-4 ml-2" />
//                   <span>תוכניות אימון נוכחיות</span>
//                 </div>
//               </button>
//               <button
//                 onClick={() => setActiveSection('history')}
//                 className={`px-6 py-4 text-center text-sm font-medium ${
//                   activeSection === 'history'
//                     ? 'border-b-2 border-blue-500 text-blue-600'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <div className="flex items-center">
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
//               renderPlans(activePlans)
//             ) : (
//               renderPlans(historyPlans)
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default HomePage;
