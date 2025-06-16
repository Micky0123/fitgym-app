// // // // import React, { useState, useEffect } from 'react';
// // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { Play, CheckCircle, Home, List, ArrowRight, X, AlertTriangle } from 'lucide-react';
// // // // import Button from '../components/ui/Button';
// // // // import { getImageUrl } from '../lib/utils';

// // // // // Mock workout data - in a real app, fetch this from the API
// // // // const mockExercises = [
// // // //   { id: 1, name: 'לחיצת חזה', sets: 3, reps: 12, weight: 60, image: getImageUrl('chest'), restTime: 60, muscleGroup: 'חזה' },
// // // //   { id: 2, name: 'פולאובר', sets: 3, reps: 10, weight: 50, image: getImageUrl('back'), restTime: 60, muscleGroup: 'גב' },
// // // //   { id: 3, name: 'סקוואט', sets: 4, reps: 12, weight: 80, image: getImageUrl('legs'), restTime: 90, muscleGroup: 'רגליים' },
// // // //   { id: 4, name: 'מקבילים', sets: 3, reps: 12, image: getImageUrl('arms'), restTime: 60, muscleGroup: 'טרייספס' },
// // // //   { id: 5, name: 'כפיפות בטן', sets: 3, reps: 15, image: getImageUrl('default'), restTime: 45, muscleGroup: 'בטן' },
// // // // ];

// // // // const WorkoutPage: React.FC = () => {
// // // //   const { programId } = useParams<{ programId: string }>();
// // // //   const navigate = useNavigate();
// // // //   const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
// // // //   const [isResting, setIsResting] = useState(false);
// // // //   const [restTimeRemaining, setRestTimeRemaining] = useState(0);
// // // //   const [completedSets, setCompletedSets] = useState<number[]>([]);
// // // //   const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
// // // //   const [showAllExercises, setShowAllExercises] = useState(false);
// // // //   const [showMachineOccupiedModal, setShowMachineOccupiedModal] = useState(false);
// // // //   const [waitTime, setWaitTime] = useState(0);
  
// // // //   const currentExercise = mockExercises[currentExerciseIndex];

// // // //   useEffect(() => {
// // // //     // In a real app, fetch the workout program using programId from API
// // // //     console.log('Fetching program:', programId);
    
// // // //     // Simulating a random event where a machine is occupied
// // // //     const randomOccupied = Math.random() < 0.3; // 30% chance the machine is occupied
// // // //     if (randomOccupied && currentExerciseIndex < mockExercises.length) {
// // // //       setWaitTime(Math.floor(Math.random() * 10) + 5); // Random wait time between 5-15 minutes
// // // //       setShowMachineOccupiedModal(true);
// // // //     }
// // // //   }, [programId, currentExerciseIndex]);
  
// // // //   useEffect(() => {
// // // //     let timer: ReturnType<typeof setTimeout>;
    
// // // //     if (isResting && restTimeRemaining > 0) {
// // // //       timer = setTimeout(() => {
// // // //         setRestTimeRemaining(restTimeRemaining - 1);
// // // //       }, 1000);
// // // //     } else if (isResting && restTimeRemaining === 0) {
// // // //       setIsResting(false);
// // // //     }
    
// // // //     return () => clearTimeout(timer);
// // // //   }, [isResting, restTimeRemaining]);
  
// // // //   const startExercise = () => {
// // // //     // Start the exercise
// // // //   };
  
// // // //   const completeSet = () => {
// // // //     setCompletedSets([...completedSets, completedSets.length + 1]);
    
// // // //     if (completedSets.length + 1 === currentExercise.sets) {
// // // //       // All sets of the current exercise are completed
// // // //       if (currentExerciseIndex === mockExercises.length - 1) {
// // // //         // This was the last exercise
// // // //         setIsWorkoutComplete(true);
// // // //       } else {
// // // //         // Move to rest period before next exercise
// // // //         setIsResting(true);
// // // //         setRestTimeRemaining(currentExercise.restTime);
// // // //         setCompletedSets([]);
// // // //       }
// // // //     }
// // // //   };
  
// // // //   const nextExercise = () => {
// // // //     setCurrentExerciseIndex(currentExerciseIndex + 1);
// // // //     setCompletedSets([]);
// // // //     setIsResting(false);
// // // //   };
  
// // // //   const waitForMachine = () => {
// // // //     // In a real app, you would add the user to a queue
// // // //     setShowMachineOccupiedModal(false);
// // // //   };
  
// // // //   const skipExercise = () => {
// // // //     setShowMachineOccupiedModal(false);
// // // //     nextExercise();
// // // //   };

// // // //   if (isWorkoutComplete) {
// // // //     return (
// // // //       <motion.div
// // // //         initial={{ opacity: 0 }}
// // // //         animate={{ opacity: 1 }}
// // // //         className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
// // // //       >
// // // //         <div className="p-8 text-center">
// // // //           <motion.div
// // // //             initial={{ scale: 0.8 }}
// // // //             animate={{ scale: 1 }}
// // // //             transition={{ duration: 0.5, type: 'spring' }}
// // // //           >
// // // //             <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
// // // //           </motion.div>
// // // //           <h2 className="text-2xl font-bold text-gray-900 mb-2">סיימת את האימון!</h2>
// // // //           <p className="text-gray-600 mb-6">כל הכבוד! השלמת את כל התרגילים בהצלחה.</p>
// // // //           <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse justify-center">
// // // //             <Button
// // // //               variant="primary"
// // // //               icon={<Home className="h-4 w-4" />}
// // // //               onClick={() => navigate('/')}
// // // //             >
// // // //               חזרה לדף הבית
// // // //             </Button>
// // // //             <Button
// // // //               variant="outline"
// // // //               onClick={() => navigate('/login')}
// // // //             >
// // // //               יציאה
// // // //             </Button>
// // // //           </div>
// // // //         </div>
// // // //       </motion.div>
// // // //     );
// // // //   }

// // // //   if (showAllExercises) {
// // // //     return (
// // // //       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
// // // //         <div className="flex justify-between items-center p-4 border-b">
// // // //           <h2 className="text-xl font-bold">רשימת תרגילים באימון</h2>
// // // //           <Button
// // // //             variant="ghost"
// // // //             onClick={() => setShowAllExercises(false)}
// // // //             icon={<X className="h-4 w-4" />}
// // // //           >
// // // //             סגור
// // // //           </Button>
// // // //         </div>
// // // //         <div className="p-4">
// // // //           <ul className="divide-y">
// // // //             {mockExercises.map((exercise, index) => (
// // // //               <li 
// // // //                 key={exercise.id} 
// // // //                 className={`py-4 flex items-center ${index === currentExerciseIndex ? 'bg-blue-50 rounded' : ''}`}
// // // //               >
// // // //                 <div className="flex-shrink-0 ml-4">
// // // //                   <div 
// // // //                     className="h-16 w-16 rounded bg-cover bg-center" 
// // // //                     style={{ backgroundImage: `url(${exercise.image})` }}
// // // //                   ></div>
// // // //                 </div>
// // // //                 <div className="flex-1">
// // // //                   <h3 className="text-lg font-medium">{exercise.name}</h3>
// // // //                   <p className="text-sm text-gray-500">{exercise.sets} סטים × {exercise.reps} חזרות</p>
// // // //                 </div>
// // // //                 {index === currentExerciseIndex && (
// // // //                   <div className="text-blue-600 font-medium">תרגיל נוכחי</div>
// // // //                 )}
// // // //               </li>
// // // //             ))}
// // // //           </ul>
// // // //         </div>
// // // //         <div className="p-4 border-t">
// // // //           <Button
// // // //             fullWidth
// // // //             onClick={() => setShowAllExercises(false)}
// // // //           >
// // // //             חזרה לאימון
// // // //           </Button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="max-w-4xl mx-auto">
// // // //       <AnimatePresence>
// // // //         {showMachineOccupiedModal && (
// // // //           <motion.div
// // // //             initial={{ opacity: 0 }}
// // // //             animate={{ opacity: 1 }}
// // // //             exit={{ opacity: 0 }}
// // // //             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
// // // //           >
// // // //             <motion.div
// // // //               initial={{ scale: 0.9 }}
// // // //               animate={{ scale: 1 }}
// // // //               exit={{ scale: 0.9 }}
// // // //               className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
// // // //             >
// // // //               <div className="flex items-center justify-center text-amber-500 mb-4">
// // // //                 <AlertTriangle size={40} />
// // // //               </div>
// // // //               <h3 className="text-xl font-bold text-center mb-2">המכשיר תפוס</h3>
// // // //               <p className="text-gray-600 mb-6 text-center">
// // // //                 המכשיר לתרגיל {currentExercise.name} תפוס כרגע. זמן המתנה משוער: {waitTime} דקות.
// // // //               </p>
// // // //               <div className="flex flex-col sm:flex-row sm:space-x-3 sm:space-x-reverse space-y-3 sm:space-y-0">
// // // //                 <Button
// // // //                   variant="primary"
// // // //                   fullWidth
// // // //                   onClick={waitForMachine}
// // // //                 >
// // // //                   המתן בתור
// // // //                 </Button>
// // // //                 <Button
// // // //                   variant="outline"
// // // //                   fullWidth
// // // //                   onClick={skipExercise}
// // // //                 >
// // // //                   דלג על תרגיל זה
// // // //                 </Button>
// // // //               </div>
// // // //             </motion.div>
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>

// // // //       <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
// // // //         <div className="p-4 border-b flex justify-between items-center">
// // // //           <h2 className="text-xl font-bold">תרגיל {currentExerciseIndex + 1} מתוך {mockExercises.length}</h2>
// // // //           <Button
// // // //             variant="ghost"
// // // //             size="sm"
// // // //             onClick={() => setShowAllExercises(true)}
// // // //             icon={<List className="h-4 w-4" />}
// // // //           >
// // // //             כל התרגילים
// // // //           </Button>
// // // //         </div>
        
// // // //         {isResting ? (
// // // //           <motion.div
// // // //             initial={{ opacity: 0 }}
// // // //             animate={{ opacity: 1 }}
// // // //             className="p-8 text-center"
// // // //           >
// // // //             <h3 className="text-xl font-bold mb-4">זמן מנוחה</h3>
// // // //             <div className="mb-6">
// // // //               <div className="text-4xl font-bold text-blue-600 mb-2">
// // // //                 {Math.floor(restTimeRemaining / 60)}:{restTimeRemaining % 60 < 10 ? '0' : ''}{restTimeRemaining % 60}
// // // //               </div>
// // // //               <p className="text-gray-500">המשך לנשום ותתכונן לתרגיל הבא</p>
// // // //             </div>
// // // //             <Button
// // // //               onClick={nextExercise}
// // // //               icon={<ArrowRight className="h-4 w-4" />}
// // // //             >
// // // //               דלג למנוחה והמשך לתרגיל הבא
// // // //             </Button>
// // // //           </motion.div>
// // // //         ) : (
// // // //           <div>
// // // //             <div
// // // //               className="h-64 bg-cover bg-center"
// // // //               style={{ backgroundImage: `url(${currentExercise.image})` }}
// // // //             ></div>
            
// // // //             <div className="p-6">
// // // //               <h3 className="text-2xl font-bold mb-2">{currentExercise.name}</h3>
// // // //               <div className="flex flex-wrap gap-4 mb-4">
// // // //                 <div className="bg-blue-50 p-2 rounded text-blue-700">
// // // //                   <span className="font-medium">קבוצת שרירים:</span> {currentExercise.muscleGroup}
// // // //                 </div>
// // // //                 <div className="bg-blue-50 p-2 rounded text-blue-700">
// // // //                   <span className="font-medium">סטים:</span> {currentExercise.sets}
// // // //                 </div>
// // // //                 <div className="bg-blue-50 p-2 rounded text-blue-700">
// // // //                   <span className="font-medium">חזרות:</span> {currentExercise.reps}
// // // //                 </div>
// // // //                 {currentExercise.weight && (
// // // //                   <div className="bg-blue-50 p-2 rounded text-blue-700">
// // // //                     <span className="font-medium">משקל:</span> {currentExercise.weight} ק"ג
// // // //                   </div>
// // // //                 )}
// // // //               </div>
              
// // // //               <div className="mb-6">
// // // //                 <h4 className="text-lg font-medium mb-2">התקדמות</h4>
// // // //                 <div className="flex space-x-2 space-x-reverse">
// // // //                   {Array.from({ length: currentExercise.sets }).map((_, index) => (
// // // //                     <div
// // // //                       key={index}
// // // //                       className={`h-3 flex-1 rounded ${
// // // //                         completedSets.includes(index + 1)
// // // //                           ? 'bg-green-500'
// // // //                           : 'bg-gray-200'
// // // //                       }`}
// // // //                     ></div>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
              
// // // //               <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
// // // //                 {completedSets.length === 0 ? (
// // // //                   <Button
// // // //                     fullWidth
// // // //                     onClick={startExercise}
// // // //                     icon={<Play className="h-4 w-4" />}
// // // //                   >
// // // //                     התחל תרגיל
// // // //                   </Button>
// // // //                 ) : completedSets.length < currentExercise.sets ? (
// // // //                   <Button
// // // //                     fullWidth
// // // //                     onClick={completeSet}
// // // //                     variant="primary"
// // // //                   >
// // // //                     סיימתי סט {completedSets.length + 1}
// // // //                   </Button>
// // // //                 ) : (
// // // //                   <Button
// // // //                     fullWidth
// // // //                     onClick={nextExercise}
// // // //                     variant="primary"
// // // //                     icon={<ArrowRight className="h-4 w-4" />}
// // // //                   >
// // // //                     המשך לתרגיל הבא
// // // //                   </Button>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default WorkoutPage;

// // // // // // קובץ React מלא שמתממשק עם ה־API שתיארת

// // // // // import { useState, useEffect } from 'react';
// // // // // import Button from '../components/ui/Button';

// // // // // const WorkoutPage = ({ traineeId, planDayId }: { traineeId: number, planDayId: number }) => {
// // // // //   const [exercises, setExercises] = useState<any[]>([]);
// // // // //   const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
// // // // //   const [completedSets, setCompletedSets] = useState<number[]>([]);
// // // // //   const [isResting, setIsResting] = useState(false);
// // // // //   const [restTimeRemaining, setRestTimeRemaining] = useState(0);
// // // // //   const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);

// // // // //   const currentExercise = exercises[currentExerciseIndex];

// // // // //   useEffect(() => {
// // // // //     const startWorkout = async () => {
// // // // //       try {
// // // // //         const now = new Date().toISOString();

// // // // //         await fetch('/api/ActiveWorkout/start-workout', {
// // // // //           method: 'POST',
// // // // //           headers: { 'Content-Type': 'application/json' },
// // // // //           body: JSON.stringify({
// // // // //             trainee: traineeId,
// // // // //             planday: planDayId,
// // // // //             startTime: now
// // // // //           })
// // // // //         });

// // // // //         const res = await fetch(`/api/planDay/${planDayId}/exercises`);
// // // // //         const data = await res.json();
// // // // //         setExercises(data);
// // // // //       } catch (err) {
// // // // //         console.error('שגיאה באתחול אימון', err);
// // // // //       }
// // // // //     };

// // // // //     startWorkout();
// // // // //   }, [traineeId, planDayId]);

// // // // //   useEffect(() => {
// // // // //     let timer: any;
// // // // //     if (isResting && restTimeRemaining > 0) {
// // // // //       timer = setInterval(() => {
// // // // //         setRestTimeRemaining(prev => {
// // // // //           if (prev === 1) setIsResting(false);
// // // // //           return prev - 1;
// // // // //         });
// // // // //       }, 1000);
// // // // //     }
// // // // //     return () => clearInterval(timer);
// // // // //   }, [isResting, restTimeRemaining]);

// // // // //   const handleStartExercise = async () => {
// // // // //     try {
// // // // //       await fetch('/api/ActiveWorkout/start-exercise', {
// // // // //         method: 'POST',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify({
// // // // //           traineeId,
// // // // //           exerciseId: currentExercise.exerciseId,
// // // // //           startTime: new Date().toISOString()
// // // // //         })
// // // // //       });
// // // // //     } catch (err) {
// // // // //       console.error('שגיאה בהתחלת תרגיל', err);
// // // // //     }
// // // // //   };

// // // // //   const handleCompleteSet = async () => {
// // // // //     const nextSet = completedSets.length + 1;
// // // // //     setCompletedSets([...completedSets, nextSet]);

// // // // //     if (nextSet === currentExercise.sets) {
// // // // //       try {
// // // // //         await fetch('/api/ActiveWorkout/complete-exercise', {
// // // // //           method: 'POST',
// // // // //           headers: { 'Content-Type': 'application/json' },
// // // // //           body: JSON.stringify({
// // // // //             traineeId,
// // // // //             exerciseId: currentExercise.exerciseId,
// // // // //             startTime: new Date().toISOString()
// // // // //           })
// // // // //         });

// // // // //         if (currentExerciseIndex === exercises.length - 1) {
// // // // //           setIsWorkoutComplete(true);
// // // // //         } else {
// // // // //           setIsResting(true);
// // // // //           setRestTimeRemaining(currentExercise.restTime);
// // // // //           setCompletedSets([]);
// // // // //           setCurrentExerciseIndex(prev => prev + 1);
// // // // //         }
// // // // //       } catch (err) {
// // // // //         console.error('שגיאה בסיום תרגיל', err);
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   if (isWorkoutComplete) return <div>האימון הושלם! כל הכבוד 🎉</div>;

// // // // //   if (!currentExercise) return <div>טוען תרגילים...</div>;

// // // // //   return (
// // // // //     <div className="p-4 space-y-4">
// // // // //       <h2 className="text-xl font-bold">{currentExercise.name}</h2>
// // // // //       <p>סטים: {currentExercise.sets}</p>
// // // // //       <p>סטים שבוצעו: {completedSets.length}</p>
// // // // //       {isResting ? (
// // // // //         <div>זמן מנוחה: {restTimeRemaining} שניות</div>
// // // // //       ) : (
// // // // //         <>
// // // // //           {completedSets.length === 0 && (
// // // // //             <Button onClick={handleStartExercise}>התחל תרגיל</Button>
// // // // //           )}
// // // // //           <Button onClick={handleCompleteSet}>סיים סט</Button>
// // // // //         </>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default WorkoutPage;


// // // // src/pages/WorkoutPage.tsx
// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { Play, CheckCircle, Home, List, ArrowRight, X, AlertTriangle } from 'lucide-react';
// // // import Button from '../components/ui/Button';
// // // import { getImageUrl } from '../lib/utils';
// // // import { activeWorkoutApi } from '../lib/api'; // ייבוא חדש
// // // import { ExercisePlan, Exercise } from '../types'; // ייבוא DTOs
// // // import { useAuthStore } from '../store/authStore'; // ייבוא store לאימון

// // // // הגדרת טיפוס עבור תרגיל באימון שכולל את פרטי התרגיל המלאים
// // // // נניח ש-ExercisePlanDTO מה-API מכיל את ExerciseDTO בתוכו
// // // interface WorkoutExercise extends ExercisePlan {
// // //     exercise: Exercise;
// // // }

// // // const WorkoutPage: React.FC = () => {
// // //   const { programId } = useParams<{ programId: string }>(); // זה planDayId
// // //   const navigate = useNavigate();
// // //   const { user } = useAuthStore(); // קבלת פרטי המשתמש המחובר

// // //   const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
// // //   const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
// // //   const [isResting, setIsResting] = useState(false);
// // //   const [restTimeRemaining, setRestTimeRemaining] = useState(0);
// // //   const [completedSets, setCompletedSets] = useState<number[]>([]);
// // //   const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
// // //   const [showAllExercises, setShowAllExercises] = useState(false);
// // //   const [showMachineOccupiedModal, setShowMachineOccupiedModal] = useState(false);
// // //   const [waitTime, setWaitTime] = useState(0);

// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);

// // //   // מצב עבור ID של הפעלת תרגיל נוכחית (אם ה-API היה מחזיר אחד כזה)
// // //   // כרגע ה-API מחזיר true/false אז נסתמך על זה
// // //   // const [currentExerciseSessionId, setCurrentExerciseSessionId] = useState<string | null>(null);

// // //   const currentExercise = workoutExercises[currentExerciseIndex];

// // //   // --- useEffect לאחזור נתוני האימון מה-API ---
// // //   useEffect(() => {
// // //     const fetchWorkoutData = async () => {
// // //       if (!programId || !user?.traineeId) {
// // //         setError('נתונים חסרים להתחלת אימון.');
// // //         setIsLoading(false);
// // //         return;
// // //       }

// // //       setIsLoading(true);
// // //       setError(null);
// // //       try {
// // //         // programId הוא למעשה planDayId
// // //         const exercises = await activeWorkoutApi.getExercisesForPlanDay(parseInt(programId));
        
// // //         // נניח ש-ExercisePlanDTO שמגיע מה-API מכיל בתוכו את פרטי ה-ExerciseDTO
// // //         // אם לא, תצטרך לבצע כאן קריאות נוספות לאחזור פרטי התרגילים
// // //         setWorkoutExercises(exercises as WorkoutExercise[]);
// // //         setIsLoading(false);

// // //         // סימולציה של מכונה תפוסה - נשאר רנדומלי אבל נשים אותו בתוך הלוגיקה
// // //         // של תחילת תרגיל, ולא ב-useEffect כללי.
// // //         // const randomOccupied = Math.random() < 0.3; // 30% chance the machine is occupied
// // //         // if (randomOccupied && exercises.length > 0) {
// // //         //   setWaitTime(Math.floor(Math.random() * 10) + 5); // Random wait time between 5-15 minutes
// // //         //   setShowMachineOccupiedModal(true);
// // //         // }

// // //       } catch (err: any) {
// // //         console.error('Error fetching workout data:', err);
// // //         setError(err.response?.data || err.message || 'שגיאה בטעינת נתוני האימון.');
// // //         setIsLoading(false);
// // //       }
// // //     };

// // //     fetchWorkoutData();
// // //   }, [programId, user?.traineeId]); // תלויות ב-programId וב-traineeId


// // //   useEffect(() => {
// // //     let timer: ReturnType<typeof setTimeout>;

// // //     if (isResting && restTimeRemaining > 0) {
// // //       timer = setTimeout(() => {
// // //         setRestTimeRemaining(restTimeRemaining - 1);
// // //       }, 1000);
// // //     } else if (isResting && restTimeRemaining === 0) {
// // //       setIsResting(false);
// // //       // אם הסתיימה המנוחה, נתכונן אוטומטית לתרגיל הבא אם הוא לא האחרון
// // //       if (currentExerciseIndex < workoutExercises.length - 1) {
// // //         // אין צורך לקרוא ל-nextExercise כאן, זה יקרה בלחיצת כפתור "המשך"
// // //       } else {
// // //         // אם זה היה התרגיל האחרון והמנוחה הסתיימה, אז האימון נגמר
// // //         setIsWorkoutComplete(true);
// // //       }
// // //     }

// // //     return () => clearTimeout(timer);
// // //   }, [isResting, restTimeRemaining, currentExerciseIndex, workoutExercises.length]);

// // //   // --- לוגיקת API: התחלת תרגיל ---
// // //   const handleStartExercise = async () => {
// // //     if (!user?.traineeId || !currentExercise) return;

// // //     // סימולציה של מכונה תפוסה (מועבר לכאן)
// // //     const randomOccupied = Math.random() < 0.3; // 30% chance the machine is occupied
// // //     if (randomOccupied) {
// // //       setWaitTime(Math.floor(Math.random() * 10) + 5); // Random wait time between 5-15 minutes
// // //       setShowMachineOccupiedModal(true);
// // //       return; // אל תתחיל תרגיל אם המכונה תפוסה
// // //     }

// // //     try {
// // //       const success = await activeWorkoutApi.startExercise({
// // //         traineeId: user.traineeId,
// // //         exerciseId: currentExercise.exerciseId,
// // //         startTime: new Date().toISOString(),
// // //       });

// // //       if (success) {
// // //         console.log(`תרגיל ${currentExercise.exercise.exerciseName} התחיל בהצלחה.`);
// // //         // כאן היית יכול לשמור currentExerciseSessionId אם ה-API היה מחזיר כזה
// // //         // setCurrentExerciseSessionId(response.sessionId);
// // //         // נתח את הפונקציה startExercise המקורית שלך
// // //         // כרגע אין לה לוגיקה מלבד הדפסה, אז נתמקד רק ב-API
// // //       } else {
// // //         alert('שגיאה בהתחלת התרגיל. נסה שוב.');
// // //       }
// // //     } catch (err: any) {
// // //       console.error('Failed to start exercise:', err);
// // //       alert(`שגיאה בהתחלת התרגיל: ${err.response?.data || err.message}`);
// // //     }
// // //   };

// // //   // --- לוגיקת API: סיום סט והתקדמות לתרגיל הבא ---
// // //   const completeSet = async () => {
// // //     const nextCompletedSets = [...completedSets, completedSets.length + 1];
// // //     setCompletedSets(nextCompletedSets);

// // //     if (nextCompletedSets.length === currentExercise.sets) {
// // //       // כל הסטים לתרגיל הנוכחי הושלמו
// // //       if (!user?.traineeId || !currentExercise) return;

// // //       try {
// // //         const success = await activeWorkoutApi.completeExercise({
// // //           traineeId: user.traineeId,
// // //           exerciseId: currentExercise.exerciseId,
// // //           startTime: new Date().toISOString(), // ***תזכור לבדוק אם ה-backend מצפה ל-endTime בשם startTime***
// // //         });

// // //         if (success) {
// // //           console.log(`תרגיל ${currentExercise.exercise.exerciseName} הושלם בהצלחה.`);
// // //           // אם זה התרגיל האחרון, סמן אימון כהושלם
// // //           if (currentExerciseIndex === workoutExercises.length - 1) {
// // //             setIsWorkoutComplete(true);
// // //           } else {
// // //             // עבור למצב מנוחה לפני התרגיל הבא
// // //             setIsResting(true);
// // //             setRestTimeRemaining(currentExercise.restTime || 0); // לוודא ש-restTime מגיע מה-API
// // //             setCompletedSets([]); // איפוס סטים לתרגיל הבא
// // //           }
// // //         } else {
// // //           alert('שגיאה בסיום התרגיל. נסה שוב.');
// // //         }
// // //       } catch (err: any) {
// // //         console.error('Failed to complete exercise:', err);
// // //         alert(`שגיאה בסיום התרגיל: ${err.response?.data || err.message}`);
// // //       }
// // //     }
// // //   };

// // //   const nextExercise = useCallback(() => {
// // //     setCompletedSets([]);
// // //     setIsResting(false);

// // //     if (currentExerciseIndex < workoutExercises.length - 1) {
// // //       setCurrentExerciseIndex(prevIndex => prevIndex + 1);
// // //     } else {
// // //       setIsWorkoutComplete(true); // זהו התרגיל האחרון והושלם
// // //     }
// // //   }, [currentExerciseIndex, workoutExercises.length]);


// // //   const waitForMachine = () => {
// // //     setShowMachineOccupiedModal(false);
// // //     // לוגיקה נוספת: אולי להוסיף את המשתמש לתור ב-API אם יש כזה
// // //   };

// // //   const skipExercise = () => {
// // //     setShowMachineOccupiedModal(false);
// // //     // נדלג על התרגיל הנוכחי ונסיים אותו מבחינת ה-API כ"לא הושלם" או סטטוס אחר אם יש
// // //     // לדוגמה, קריאה ל-API כדי לסמן תרגיל כ"מדלג"
// // //     console.log(`Skipping exercise ${currentExercise?.exercise.exerciseName}`);
// // //     nextExercise();
// // //   };

// // //   if (isLoading) {
// // //     return <div className="text-center py-8 text-gray-500">טוען אימון...</div>;
// // //   }

// // //   if (error) {
// // //     return <div className="text-center py-8 text-red-500">{error}</div>;
// // //   }

// // //   if (!currentExercise && !isWorkoutComplete) {
// // //     return <div className="text-center py-8 text-gray-500">לא נמצאו תרגילים לאימון זה.</div>;
// // //   }

// // //   if (isWorkoutComplete) {
// // //     return (
// // //       <motion.div
// // //         initial={{ opacity: 0 }}
// // //         animate={{ opacity: 1 }}
// // //         className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
// // //       >
// // //         <div className="p-8 text-center">
// // //           <motion.div
// // //             initial={{ scale: 0.8 }}
// // //             animate={{ scale: 1 }}
// // //             transition={{ duration: 0.5, type: 'spring' }}
// // //           >
// // //             <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
// // //           </motion.div>
// // //           <h2 className="text-2xl font-bold text-gray-900 mb-2">סיימת את האימון!</h2>
// // //           <p className="text-gray-600 mb-6">כל הכבוד! השלמת את כל התרגילים בהצלחה.</p>
// // //           <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse justify-center">
// // //             <Button
// // //               variant="primary"
// // //               icon={<Home className="h-4 w-4" />}
// // //               onClick={() => navigate('/')}
// // //             >
// // //               חזרה לדף הבית
// // //             </Button>
// // //             <Button
// // //               variant="outline"
// // //               onClick={() => navigate('/login')} // או ניווט לדף יציאה אחר
// // //             >
// // //               יציאה
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       </motion.div>
// // //     );
// // //   }

// // //   if (showAllExercises) {
// // //     return (
// // //       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
// // //         <div className="flex justify-between items-center p-4 border-b">
// // //           <h2 className="text-xl font-bold">רשימת תרגילים באימון</h2>
// // //           <Button
// // //             variant="ghost"
// // //             onClick={() => setShowAllExercises(false)}
// // //             icon={<X className="h-4 w-4" />}
// // //           >
// // //             סגור
// // //           </Button>
// // //         </div>
// // //         <div className="p-4">
// // //           <ul className="divide-y">
// // //             {workoutExercises.map((exercise, index) => (
// // //               <li
// // //                 key={exercise.exerciseId} // השתמש ב-exerciseId כ-key
// // //                 className={`py-4 flex items-center ${index === currentExerciseIndex ? 'bg-blue-50 rounded' : ''}`}
// // //               >
// // //                 <div className="flex-shrink-0 ml-4">
// // //                   <div
// // //                     className="h-16 w-16 rounded bg-cover bg-center"
// // //                     style={{ backgroundImage: `url(${getImageUrl(exercise.exercise.exerciseName)})` }} // ודא שיש לך תמונה מתאימה
// // //                   ></div>
// // //                 </div>
// // //                 <div className="flex-1">
// // //                   <h3 className="text-lg font-medium">{exercise.exercise.exerciseName}</h3>
// // //                   <p className="text-sm text-gray-500">{exercise.sets} סטים × {exercise.reps} חזרות</p>
// // //                 </div>
// // //                 {index === currentExerciseIndex && (
// // //                   <div className="text-blue-600 font-medium">תרגיל נוכחי</div>
// // //                 )}
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         </div>
// // //         <div className="p-4 border-t">
// // //           <Button
// // //             fullWidth
// // //             onClick={() => setShowAllExercises(false)}
// // //           >
// // //             חזרה לאימון
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="max-w-4xl mx-auto">
// // //       <AnimatePresence>
// // //         {showMachineOccupiedModal && (
// // //           <motion.div
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             exit={{ opacity: 0 }}
// // //             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
// // //           >
// // //             <motion.div
// // //               initial={{ scale: 0.9 }}
// // //               animate={{ scale: 1 }}
// // //               exit={{ scale: 0.9 }}
// // //               className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
// // //             >
// // //               <div className="flex items-center justify-center text-amber-500 mb-4">
// // //                 <AlertTriangle size={40} />
// // //               </div>
// // //               <h3 className="text-xl font-bold text-center mb-2">המכשיר תפוס</h3>
// // //               <p className="text-gray-600 mb-6 text-center">
// // //                 המכשיר לתרגיל {currentExercise?.exercise.exerciseName} תפוס כרגע. זמן המתנה משוער: {waitTime} דקות.
// // //               </p>
// // //               <div className="flex flex-col sm:flex-row sm:space-x-3 sm:space-x-reverse space-y-3 sm:space-y-0">
// // //                 <Button
// // //                   variant="primary"
// // //                   fullWidth
// // //                   onClick={waitForMachine}
// // //                 >
// // //                   המתן בתור
// // //                 </Button>
// // //                 <Button
// // //                   variant="outline"
// // //                   fullWidth
// // //                   onClick={skipExercise}
// // //                 >
// // //                   דלג על תרגיל זה
// // //                 </Button>
// // //               </div>
// // //             </motion.div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>

// // //       <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
// // //         <div className="p-4 border-b flex justify-between items-center">
// // //           <h2 className="text-xl font-bold">תרגיל {currentExerciseIndex + 1} מתוך {workoutExercises.length}</h2>
// // //           <Button
// // //             variant="ghost"
// // //             size="sm"
// // //             onClick={() => setShowAllExercises(true)}
// // //             icon={<List className="h-4 w-4" />}
// // //           >
// // //             כל התרגילים
// // //           </Button>
// // //         </div>

// // //         {isResting ? (
// // //           <motion.div
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             className="p-8 text-center"
// // //           >
// // //             <h3 className="text-xl font-bold mb-4">זמן מנוחה</h3>
// // //             <div className="mb-6">
// // //               <div className="text-4xl font-bold text-blue-600 mb-2">
// // //                 {Math.floor(restTimeRemaining / 60)}:{restTimeRemaining % 60 < 10 ? '0' : ''}{restTimeRemaining % 60}
// // //               </div>
// // //               <p className="text-gray-500">המשך לנשום ותתכונן לתרגיל הבא</p>
// // //             </div>
// // //             <Button
// // //               onClick={nextExercise}
// // //               icon={<ArrowRight className="h-4 w-4" />}
// // //             >
// // //               דלג למנוחה והמשך לתרגיל הבא
// // //             </Button>
// // //           </motion.div>
// // //         ) : (
// // //           <div>
// // //             <div
// // //               className="h-64 bg-cover bg-center"
// // //               style={{ backgroundImage: `url(${getImageUrl(currentExercise?.exercise.exerciseName || 'default')})` }}
// // //             ></div>

// // //             <div className="p-6">
// // //               <h3 className="text-2xl font-bold mb-2">{currentExercise?.exercise.exerciseName}</h3>
// // //               <div className="flex flex-wrap gap-4 mb-4">
// // //                 <div className="bg-blue-50 p-2 rounded text-blue-700">
// // //                   {/* c///////////////////////////////////////// */}
// // //                   <span className="font-medium">קבוצת שרירים:</span> {currentExercise?.exercise.muscleIds || 'לא ידוע'}
// // //                 </div>
// // //                 <div className="bg-blue-50 p-2 rounded text-blue-700">
// // //                   <span className="font-medium">סטים:</span> {currentExercise?.sets}
// // //                 </div>
// // //                 <div className="bg-blue-50 p-2 rounded text-blue-700">
// // //                   <span className="font-medium">חזרות:</span> {currentExercise?.reps}
// // //                 </div>
// // //                 {currentExercise?.weight && (
// // //                   <div className="bg-blue-50 p-2 rounded text-blue-700">
// // //                     <span className="font-medium">משקל:</span> {currentExercise.weight} ק"ג
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               <div className="mb-6">
// // //                 <h4 className="text-lg font-medium mb-2">התקדמות</h4>
// // //                 <div className="flex space-x-2 space-x-reverse">
// // //                   {Array.from({ length: currentExercise?.sets || 0 }).map((_, index) => (
// // //                     <div
// // //                       key={index}
// // //                       className={`h-3 flex-1 rounded ${
// // //                         completedSets.includes(index + 1)
// // //                           ? 'bg-green-500'
// // //                           : 'bg-gray-200'
// // //                       }`}
// // //                     ></div>
// // //                   ))}
// // //                 </div>
// // //               </div>

// // //               <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
// // //                 {completedSets.length === 0 ? (
// // //                   <Button
// // //                     fullWidth
// // //                     onClick={handleStartExercise} // קריאה ל-API להתחלת תרגיל
// // //                     icon={<Play className="h-4 w-4" />}
// // //                   >
// // //                     התחל תרגיל
// // //                   </Button>
// // //                 ) : completedSets.length < (currentExercise?.sets || 0) ? (
// // //                   <Button
// // //                     fullWidth
// // //                     onClick={completeSet} // קריאה ל-API בסיום כל הסטים של התרגיל
// // //                     variant="primary"
// // //                   >
// // //                     סיימתי סט {completedSets.length + 1}
// // //                   </Button>
// // //                 ) : (
// // //                   <Button
// // //                     fullWidth
// // //                     onClick={nextExercise}
// // //                     variant="primary"
// // //                     icon={<ArrowRight className="h-4 w-4" />}
// // //                   >
// // //                     המשך לתרגיל הבא
// // //                   </Button>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default WorkoutPage;


// // // src/pages/WorkoutPage.tsx
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Play, CheckCircle, Home, List, ArrowRight, X, AlertTriangle } from 'lucide-react';
// // import Button from '../components/ui/Button'; // ודא שהנתיב לקומפוננטת Button נכון
// // import { getImageUrl } from '../lib/utils'; // ודא שהנתיב לפונקציית getImageUrl נכון
// // import { activeWorkoutApi } from '../lib/api'; // ודא שהנתיב לקובץ ה-API נכון
// // import { ExercisePlan, Exercise, Trainee } from '../types'; // ודא שהנתיב וכל ה-DTOs מוגדרים כראוי
// // import { useAuthStore } from '../store/authStore'; // ודא שהנתיב ל-Auth Store נכון

// // // הגדרת טיפוס עבור תרגיל באימון שכולל את פרטי התרגיל המלאים
// // // הנחה: ExercisePlan מה-API מכיל את Exercise בתוכו
// // interface WorkoutExercise extends ExercisePlan {
// //     exercise: Exercise;
// // }

// // const WorkoutPage: React.FC = () => {
// //     // השגת planDayId מפרמטרי ה-URL
// //     const { programId } = useParams<{ programId: string }>();
// //     const navigate = useNavigate();
// //     // השגת פרטי המשתמש המחובר מה-Auth Store
// //     const { user } = useAuthStore();

// //     // --- מצבי קומפוננטה (State) ---
// //     const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
// //     const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
// //     const [isResting, setIsResting] = useState(false);
// //     const [restTimeRemaining, setRestTimeRemaining] = useState(0);
// //     const [completedSets, setCompletedSets] = useState<number[]>([]);
// //     const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
// //     const [showAllExercises, setShowAllExercises] = useState(false);
// //     const [showMachineOccupiedModal, setShowMachineOccupiedModal] = useState(false);
// //     const [waitTime, setWaitTime] = useState(0);

// //     const [isLoading, setIsLoading] = useState(true);
// //     const [error, setError] = useState<string | null>(null);

// //     // התרגיל הנוכחי המוצג על המסך
// //     const currentExercise = workoutExercises[currentExerciseIndex];

// //     // --- useEffect: אחזור נתוני האימון מה-API ---
// //     useEffect(() => {
// //         const fetchWorkoutData = async () => {
// //             // ודא שקיימים planId ו-traineeId לפני ניסיון שליפת נתונים
// //             if (!programId || !user?.traineeId) {
// //                 setError('נתונים חסרים להתחלת אימון.');
// //                 setIsLoading(false);
// //                 return;
// //             }

// //             setIsLoading(true);
// //             setError(null);
// //             try {
// //                 // קריאה ל-API כדי לקבל את רשימת התרגילים עבור יום התכנית
// //                 // ה-programId משמש כאן כ-planDayId
// //                 const exercises = await activeWorkoutApi.getExercisesForPlanDay(parseInt(programId));

// //                 // הגדרת רשימת התרגילים עבור האימון
// //                 setWorkoutExercises(exercises as WorkoutExercise[]);
// //                 setIsLoading(false);

// //             } catch (err: any) {
// //                 console.error('Error fetching workout data:', err);
// //                 // הצגת הודעת שגיאה למשתמש
// //                 setError(err.response?.data || err.message || 'שגיאה בטעינת נתוני האימון.');
// //                 setIsLoading(false);
// //             }
// //         };

// //         fetchWorkoutData();
// //     }, [programId, user?.traineeId]); // תלויות ב-programId וב-traineeId

// //     // --- useEffect: טיימר למנוחה בין תרגילים/סטים ---
// //     useEffect(() => {
// //         let timer: ReturnType<typeof setTimeout>;

// //         if (isResting && restTimeRemaining > 0) {
// //             timer = setTimeout(() => {
// //                 setRestTimeRemaining(prev => prev - 1);
// //             }, 1000);
// //         } else if (isResting && restTimeRemaining === 0) {
// //             // בסיום המנוחה, נצא ממצב מנוחה.
// //             // המשתמש ילחץ על כפתור "המשך" כדי לעבור לתרגיל הבא.
// //             setIsResting(false);
// //         }

// //         // ניקוי הטיימר במקרה שהקומפוננטה עוברת unmount או שהתלויות משתנות
// //         return () => clearTimeout(timer);
// //     }, [isResting, restTimeRemaining]);

// //     // --- לוגיקת API: התחלת תרגיל ---
// //     const handleStartExercise = async () => {
// //         if (!user?.traineeId || !currentExercise) return;

// //         // סימולציה של מכונה תפוסה: 30% סיכוי שהמכשיר יהיה תפוס
// //         const randomOccupied = Math.random() < 0.3;
// //         if (randomOccupied) {
// //             setWaitTime(Math.floor(Math.random() * 10) + 5); // זמן המתנה אקראי: 5-15 דקות
// //             setShowMachineOccupiedModal(true);
// //             return; // אל תמשיך להתחיל את התרגיל אם המכונה תפוסה
// //         }

// //         try {
// //             // קריאה ל-API להתחלת תרגיל
// //             const success = await activeWorkoutApi.startExercise({
// //                 traineeId: user.traineeId,
// //                 exerciseId: currentExercise.exerciseId,
// //                 startTime: new Date().toISOString(),
// //             });

// //             if (success) {
// //                 console.log(`תרגיל ${currentExercise.exercise.exerciseName} התחיל בהצלחה.`);
// //                 // אין צורך לעשות דבר נוסף מבחינת ה-UI כאן, הלחצן ישתנה ל"סיימתי סט"
// //             } else {
// //                 alert('שגיאה בהתחלת התרגיל. נסה שוב.');
// //             }
// //         } catch (err: any) {
// //             console.error('Failed to start exercise:', err);
// //             alert(`שגיאה בהתחלת התרגיל: ${err.response?.data || err.message}`);
// //         }
// //     };

// //     // --- לוגיקת API: סיום סט ---
// //     const completeSet = async () => {
// //         const nextCompletedSets = [...completedSets, completedSets.length + 1];
// //         setCompletedSets(nextCompletedSets);

// //         // אם כל הסטים לתרגיל הנוכחי הושלמו
// //         if (nextCompletedSets.length === currentExercise.sets) {
// //             if (!user?.traineeId || !currentExercise) return;

// //             try {
// //                 // קריאה ל-API לסיום תרגיל
// //                 const success = await activeWorkoutApi.completeExercise({
// //                     traineeId: user.traineeId,
// //                     exerciseId: currentExercise.exerciseId,
// //                     startTime: new Date().toISOString(),
// //                 });

// //                 if (success) {
// //                     console.log(`תרגיל ${currentExercise.exercise.exerciseName} הושלם בהצלחה.`);
// //                     // אם זה התרגיל האחרון באימון, סמן את האימון כהושלם
// //                     if (currentExerciseIndex === workoutExercises.length - 1) {
// //                         setIsWorkoutComplete(true);
// //                     } else {
// //                         // אחרת, עבור למצב מנוחה לפני התרגיל הבא
// //                         setIsResting(true);
// //                         setRestTimeRemaining(currentExercise.restTime || 0); // קבל זמן מנוחה מהתרגיל
// //                         setCompletedSets([]); // איפוס סטים לתרגיל הבא
// //                     }
// //                 } else {
// //                     alert('שגיאה בסיום התרגיל. נסה שוב.');
// //                 }
// //             } catch (err: any) {
// //                 console.error('Failed to complete exercise:', err);
// //                 alert(`שגיאה בסיום התרגיל: ${err.response?.data || err.message}`);
// //             }
// //         }
// //     };

// //     // --- מעבר לתרגיל הבא ---
// //     const nextExercise = useCallback(() => {
// //         setCompletedSets([]); // איפוס סטים עבור התרגיל החדש
// //         setIsResting(false); // יציאה ממצב מנוחה

// //         if (currentExerciseIndex < workoutExercises.length - 1) {
// //             // אם יש עוד תרגילים, עבור לתרגיל הבא
// //             setCurrentExerciseIndex(prevIndex => prevIndex + 1);
// //         } else {
// //             // אם זה היה התרגיל האחרון, סמן את האימון כהושלם
// //             setIsWorkoutComplete(true);
// //         }
// //     }, [currentExerciseIndex, workoutExercises.length]);

// //     // --- טיפול במודאל מכונה תפוסה: המתנה בתור ---
// //     const waitForMachine = () => {
// //         setShowMachineOccupiedModal(false);
// //         // כאן ניתן להוסיף לוגיקה לשליחת מידע ל-API על המתנה בתור, אם רלוונטי.
// //         // כרגע רק סוגר את המודאל וממתין שהמשתמש ינסה שוב.
// //     };

// //     // --- טיפול במודאל מכונה תפוסה: דילוג על תרגיל ---
// //     const skipExercise = () => {
// //         setShowMachineOccupiedModal(false);
// //         // כאן ניתן לשלוח ל-API מידע על דילוג על התרגיל, למשל לסמנו כ"לא הושלם".
// //         console.log(`מדלג על תרגיל ${currentExercise?.exercise.exerciseName}`);
// //         nextExercise(); // עבור לתרגיל הבא
// //     };

// //     // --- הצגת מצבי טעינה ושגיאה ---
// //     if (isLoading) {
// //         return <div className="text-center py-8 text-gray-500">טוען אימון...</div>;
// //     }

// //     if (error) {
// //         return <div className="text-center py-8 text-red-500">{error}</div>;
// //     }

// //     // אם אין תרגילים בכלל ולא סיימנו את האימון
// //     if (!currentExercise && !isWorkoutComplete) {
// //         return <div className="text-center py-8 text-gray-500">לא נמצאו תרגילים לאימון זה.</div>;
// //     }

// //     // --- מסך סיום אימון ---
// //     if (isWorkoutComplete) {
// //         return (
// //             <motion.div
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
// //             >
// //                 <div className="p-8 text-center">
// //                     <motion.div
// //                         initial={{ scale: 0.8 }}
// //                         animate={{ scale: 1 }}
// //                         transition={{ duration: 0.5, type: 'spring' }}
// //                     >
// //                         <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
// //                     </motion.div>
// //                     <h2 className="text-2xl font-bold text-gray-900 mb-2">סיימת את האימון!</h2>
// //                     <p className="text-gray-600 mb-6">כל הכבוד! השלמת את כל התרגילים בהצלחה.</p>
// //                     <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse justify-center">
// //                         <Button
// //                             variant="primary"
// //                             icon={<Home className="h-4 w-4" />}
// //                             onClick={() => navigate('/')}
// //                         >
// //                             חזרה לדף הבית
// //                         </Button>
// //                         <Button
// //                             variant="outline"
// //                             onClick={() => navigate('/login')} // או ניווט לדף יציאה רלוונטי
// //                         >
// //                             יציאה
// //                         </Button>
// //                     </div>
// //                 </div>
// //             </motion.div>
// //         );
// //     }

// //     // --- מסך הצגת כל התרגילים באימון (מצב רשימה) ---
// //     if (showAllExercises) {
// //         return (
// //             <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
// //                 <div className="flex justify-between items-center p-4 border-b">
// //                     <h2 className="text-xl font-bold">רשימת תרגילים באימון</h2>
// //                     <Button
// //                         variant="ghost"
// //                         onClick={() => setShowAllExercises(false)}
// //                         icon={<X className="h-4 w-4" />}
// //                     >
// //                         סגור
// //                     </Button>
// //                 </div>
// //                 <div className="p-4">
// //                     <ul className="divide-y">
// //                         {workoutExercises.map((exercise, index) => (
// //                             <li
// //                                 key={exercise.exerciseId}
// //                                 className={`py-4 flex items-center ${index === currentExerciseIndex ? 'bg-blue-50 rounded' : ''}`}
// //                             >
// //                                 <div className="flex-shrink-0 ml-4">
// //                                     <div
// //                                         className="h-16 w-16 rounded bg-cover bg-center"
// //                                         style={{ backgroundImage: `url(${getImageUrl(exercise.exercise.exerciseName)})` }}
// //                                     ></div>
// //                                 </div>
// //                                 <div className="flex-1">
// //                                     <h3 className="text-lg font-medium">{exercise.exercise.exerciseName}</h3>
// //                                     <p className="text-sm text-gray-500">{exercise.sets} סטים × {exercise.reps} חזרות</p>
// //                                 </div>
// //                                 {index === currentExerciseIndex && (
// //                                     <div className="text-blue-600 font-medium">תרגיל נוכחי</div>
// //                                 )}
// //                             </li>
// //                         ))}
// //                     </ul>
// //                 </div>
// //                 <div className="p-4 border-t">
// //                     <Button
// //                         fullWidth
// //                         onClick={() => setShowAllExercises(false)}
// //                     >
// //                         חזרה לאימון
// //                     </Button>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     // --- רכיב עמוד האימון הראשי (מצב תרגיל בודד) ---
// //     return (
// //         <div className="max-w-4xl mx-auto">
// //             {/* מודאל "מכשיר תפוס" */}
// //             <AnimatePresence>
// //                 {showMachineOccupiedModal && (
// //                     <motion.div
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         exit={{ opacity: 0 }}
// //                         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
// //                     >
// //                         <motion.div
// //                             initial={{ scale: 0.9 }}
// //                             animate={{ scale: 1 }}
// //                             exit={{ scale: 0.9 }}
// //                             className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
// //                         >
// //                             <div className="flex items-center justify-center text-amber-500 mb-4">
// //                                 <AlertTriangle size={40} />
// //                             </div>
// //                             <h3 className="text-xl font-bold text-center mb-2">המכשיר תפוס</h3>
// //                             <p className="text-gray-600 mb-6 text-center">
// //                                 המכשיר לתרגיל {currentExercise?.exercise.exerciseName} תפוס כרגע. זמן המתנה משוער: {waitTime} דקות.
// //                             </p>
// //                             <div className="flex flex-col sm:flex-row sm:space-x-3 sm:space-x-reverse space-y-3 sm:space-y-0">
// //                                 <Button
// //                                     variant="primary"
// //                                     fullWidth
// //                                     onClick={waitForMachine}
// //                                 >
// //                                     המתן בתור
// //                                 </Button>
// //                                 <Button
// //                                     variant="outline"
// //                                     fullWidth
// //                                     onClick={skipExercise}
// //                                 >
// //                                     דלג על תרגיל זה
// //                                 </Button>
// //                             </div>
// //                         </motion.div>
// //                     </motion.div>
// //                 )}
// //             </AnimatePresence>

// //             <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
// //                 <div className="p-4 border-b flex justify-between items-center">
// //                     <h2 className="text-xl font-bold">תרגיל {currentExerciseIndex + 1} מתוך {workoutExercises.length}</h2>
// //                     <Button
// //                         variant="ghost"
// //                         size="sm"
// //                         onClick={() => setShowAllExercises(true)}
// //                         icon={<List className="h-4 w-4" />}
// //                     >
// //                         כל התרגילים
// //                     </Button>
// //                 </div>

// //                 {isResting ? (
// //                     // --- מצב מנוחה ---
// //                     <motion.div
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         className="p-8 text-center"
// //                     >
// //                         <h3 className="text-xl font-bold mb-4">זמן מנוחה</h3>
// //                         <div className="mb-6">
// //                             <div className="text-4xl font-bold text-blue-600 mb-2">
// //                                 {Math.floor(restTimeRemaining / 60)}:{restTimeRemaining % 60 < 10 ? '0' : ''}{restTimeRemaining % 60}
// //                             </div>
// //                             <p className="text-gray-500">המשך לנשום ותתכונן לתרגיל הבא</p>
// //                         </div>
// //                         <Button
// //                             onClick={nextExercise}
// //                             icon={<ArrowRight className="h-4 w-4" />}
// //                         >
// //                             דלג למנוחה והמשך לתרגיל הבא
// //                         </Button>
// //                     </motion.div>
// //                 ) : (
// //                     // --- מצב תרגיל פעיל ---
// //                     <div>
// //                         <div
// //                             className="h-64 bg-cover bg-center"
// //                             style={{ backgroundImage: `url(${getImageUrl(currentExercise?.exercise.exerciseName || 'default')})` }}
// //                         ></div>

// //                         <div className="p-6">
// //                             <h3 className="text-2xl font-bold mb-2">{currentExercise?.exercise.exerciseName}</h3>
// //                             <div className="flex flex-wrap gap-4 mb-4">
// //                                 <div className="bg-blue-50 p-2 rounded text-blue-700">
// //                                     <span className="font-medium">קבוצת שרירים:</span> {currentExercise?.exercise.muscleIds || 'לא ידוע'}
// //                                 </div>
// //                                 <div className="bg-blue-50 p-2 rounded text-blue-700">
// //                                     <span className="font-medium">סטים:</span> {currentExercise?.sets}
// //                                 </div>
// //                                 <div className="bg-blue-50 p-2 rounded text-blue-700">
// //                                     <span className="font-medium">חזרות:</span> {currentExercise?.reps}
// //                                 </div>
// //                                 {currentExercise?.weight && (
// //                                     <div className="bg-blue-50 p-2 rounded text-blue-700">
// //                                         <span className="font-medium">משקל:</span> {currentExercise.weight} ק"ג
// //                                     </div>
// //                                 )}
// //                             </div>

// //                             <div className="mb-6">
// //                                 <h4 className="text-lg font-medium mb-2">התקדמות</h4>
// //                                 <div className="flex space-x-2 space-x-reverse">
// //                                     {Array.from({ length: currentExercise?.sets || 0 }).map((_, index) => (
// //                                         <div
// //                                             key={index}
// //                                             className={`h-3 flex-1 rounded ${
// //                                                 completedSets.includes(index + 1)
// //                                                     ? 'bg-green-500'
// //                                                     : 'bg-gray-200'
// //                                             }`}
// //                                         ></div>
// //                                     ))}
// //                                 </div>
// //                             </div>

// //                             <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
// //                                 {completedSets.length === 0 ? (
// //                                     <Button
// //                                         fullWidth
// //                                         onClick={handleStartExercise} // התחלת תרגיל (שליחת ל-API)
// //                                         icon={<Play className="h-4 w-4" />}
// //                                     >
// //                                         התחל תרגיל
// //                                     </Button>
// //                                 ) : completedSets.length < (currentExercise?.sets || 0) ? (
// //                                     <Button
// //                                         fullWidth
// //                                         onClick={completeSet} // סיום סט (שליחת ל-API אם זה הסט האחרון)
// //                                         variant="primary"
// //                                     >
// //                                         סיימתי סט {completedSets.length + 1}
// //                                     </Button>
// //                                 ) : (
// //                                     <Button
// //                                         fullWidth
// //                                         onClick={nextExercise} // מעבר לתרגיל הבא (לאחר שכל הסטים הושלמו וה-API עודכן)
// //                                         variant="primary"
// //                                         icon={<ArrowRight className="h-4 w-4" />}
// //                                     >
// //                                         המשך לתרגיל הבא
// //                                     </Button>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default WorkoutPage;

// // src/pages/WorkoutPage.tsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Button from '../components/ui/Button';
// import { activeWorkoutApi } from '../lib/api';
// import { useAuthStore } from '../store/authStore';
// import { PathResult, ExerciseEntry, NextExerciseResponse } from '../types'; // וודאי שייבאת את ה-types הנכונים

// const WorkoutPage: React.FC = () => {
//   const { planDayId } = useParams<{ planDayId: string }>(); // קבל את ה-planDayId מה-URL
//   const navigate = useNavigate();
//   const { user } = useAuthStore();

//   const [workoutData, setWorkoutData] = useState<PathResult | null>(null);
//   const [currentExercise, setCurrentExercise] = useState<ExerciseEntry | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);

//   useEffect(() => {
//     // טען את נתוני האימון המעודכנים כשהדף נטען או כשמתבצע שינוי
//     const fetchWorkoutStatus = async () => {
//       if (!user?.traineeId || !planDayId) {
//         setError('מזהה מתאמן או מזהה יום תוכנית חסר.');
//         setIsLoading(false);
//         return;
//       }
//       try {
//         setIsLoading(true);
//         // ננסה לקבל את סטטוס האימון הנוכחי
//         const updatedWorkout = await activeWorkoutApi.getUpdatedWorkoutPlan(user.traineeId);
//         setWorkoutData(updatedWorkout);
//         setIsWorkoutComplete(updatedWorkout.isWorkoutComplete);

//         // אם האימון לא הושלם, ננסה לקבל את התרגיל הבא
//         if (!updatedWorkout.isWorkoutComplete) {
//           const nextExerciseRes: NextExerciseResponse = await activeWorkoutApi.getNextExerciseInWorkout(user.traineeId);
//           if (nextExerciseRes.isWorkoutComplete) {
//             setIsWorkoutComplete(true);
//             setCurrentExercise(null);
//           } else {
//             setCurrentExercise(nextExerciseRes.nextExercise || null);
//           }
//         } else {
//           setCurrentExercise(null); // האימון הושלם
//         }

//       } catch (err: any) {
//         console.error('Error fetching workout status:', err);
//         setError(err.response?.data || 'שגיאה בטעינת סטטוס האימון.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchWorkoutStatus();

//     // ניתן להוסיף כאן לוגיקת ריענון אוטומטי אם יש צורך
//     // לדוגמה:
//     // const interval = setInterval(fetchWorkoutStatus, 10000); // רענן כל 10 שניות
//     // return () => clearInterval(interval);

//   }, [user?.traineeId, planDayId]);

//   const handleStartExercise = async (exerciseId: number) => {
//     if (!user?.traineeId || !currentExercise) return;

//     try {
//       // קריאה ל-API של התחלת תרגיל
//       await activeWorkoutApi.startExercise(user.traineeId, exerciseId, new Date());
//       alert('התרגיל התחיל!');
//       // אולי תרצה לעדכן את ה-UI או להביא שוב את סטטוס האימון
//       // כדי לוודא שה-StartedAt התעדכן ב-Backend
//       await fetchWorkoutStatus(); // טען מחדש את הסטטוס המעודכן
//     } catch (err: any) {
//       console.error('Failed to start exercise:', err);
//       alert(`שגיאה בהתחלת תרגיל: ${err.response?.data || err.message}`);
//     }
//   };

//   const handleCompleteExercise = async (exerciseId: number) => {
//     if (!user?.traineeId || !currentExercise) return;

//     try {
//       // קריאה ל-API של סיום תרגיל
//       await activeWorkoutApi.completeExercise(user.traineeId, exerciseId, new Date());
//       alert('התרגיל הסתיים!');
//       // לאחר סיום תרגיל, טען מחדש את סטטוס האימון כדי לקבל את התרגיל הבא או לסיים את האימון
//       await fetchWorkoutStatus();
//     } catch (err: any) {
//       console.error('Failed to complete exercise:', err);
//       alert(`שגיאה בסיום תרגיל: ${err.response?.data || err.message}`);
//     }
//   };

//   const fetchWorkoutStatus = async () => {
//     if (!user?.traineeId) return;
//     try {
//       // עדכון הסטטוס הנוכחי של האימון מה-Backend
//       const updatedWorkout = await activeWorkoutApi.getUpdatedWorkoutPlan(user.traineeId);
//       setWorkoutData(updatedWorkout);
//       setIsWorkoutComplete(updatedWorkout.isWorkoutComplete);

//       if (!updatedWorkout.isWorkoutComplete) {
//         const nextExerciseRes: NextExerciseResponse = await activeWorkoutApi.getNextExerciseInWorkout(user.traineeId);
//         if (nextExerciseRes.isWorkoutComplete) {
//           setIsWorkoutComplete(true);
//           setCurrentExercise(null);
//         } else {
//           setCurrentExercise(nextExerciseRes.nextExercise || null);
//         }
//       } else {
//         setCurrentExercise(null);
//       }
//     } catch (err) {
//       console.error('Error refreshing workout status:', err);
//       // ייתכן שהאימון הסתיים ב-Backend או נמחק מה-cache
//       if (
//         typeof err === 'object' &&
//         err !== null &&
//         'response' in err &&
//         typeof (err as any).response === 'object' &&
//         (err as any).response !== null &&
//         'status' in (err as any).response &&
//         (err as any).response.status === 404
//       ) {
//         setIsWorkoutComplete(true);
//         setCurrentExercise(null);
//         alert('האימון הסתיים או לא נמצא במערכת.');
//         navigate('/'); // חזור לדף הבית
//       } else {
//         setError('שגיאה בריענון סטטוס האימון.');
//       }
//     }
//   };


//   if (isLoading) {
//     return <div className="text-center py-8 text-gray-500">טוען נתוני אימון...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 py-8">{error}</div>;
//   }

//   if (isWorkoutComplete) {
//     return (
//       <div className="text-center py-8 text-green-600">
//         <h2 className="text-2xl font-bold mb-4">כל הכבוד! האימון הושלם בהצלחה!</h2>
//         <Button onClick={() => navigate('/')}>חזור לדף הבית</Button>
//       </div>
//     );
//   }

//   if (!workoutData || !currentExercise) {
//     return (
//       <div className="text-center py-8 text-gray-500">
//         לא נמצא אימון פעיל או שהתרגיל הבא לא זמין.
//         <Button onClick={() => navigate('/')} className="mt-4">חזור לדף הבית</Button>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
//     >
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//         אימון פעיל: {workoutData.trainee?.traineeName}
//       </h1>

//       {currentExercise && (
//         <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-md">
//           <h2 className="text-xl font-semibold text-blue-800 mb-2">תרגיל נוכחי: {currentExercise.exerciseDetails?.exerciseName}</h2>
//           <p className="text-gray-700">סדר בתרגילים: {currentExercise.orderInList + 1} מתוך {workoutData.exerciseIdsInPath ? Object.keys(workoutData.exerciseIdsInPath).length : '?'}</p>
//           {/* הוסף כאן פרטים נוספים מה-currentExercise כגון סטים, חזרות, זמן מנוחה */}
//           {/*
//           <p>סטים: {currentExercise.sets}</p>
//           <p>חזרות: {currentExercise.reps}</p>
//           <p>זמן מנוחה: {currentExercise.restTime} שניות</p>
//           */}

//           <div className="mt-4 flex gap-4">
//             {!currentExercise.startedAt ? (
//               <Button onClick={() => handleStartExercise(currentExercise.exerciseId)} className="bg-green-500 hover:bg-green-600">
//                 התחל תרגיל
//               </Button>
//             ) : (
//               <Button onClick={() => handleCompleteExercise(currentExercise.exerciseId)} className="bg-indigo-500 hover:bg-indigo-600">
//                 סיים תרגיל
//               </Button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ניתן להוסיף כאן הצגה של התקדמות האימון או רשימת תרגילים עתידיים/שהושלמו */}
//       <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">סטטוס תרגילים:</h3>
//       <div className="space-y-3">
//         {workoutData.exerciseIdsInPath && Object.values(workoutData.exerciseIdsInPath)
//           .sort((a, b) => a.orderInList - b.orderInList)
//           .map((exercise, index) => (
//             <div
//               key={exercise.exerciseId + '-' + index} // Use a unique key
//               className={`flex items-center justify-between p-3 rounded-md ${
//                 exercise.isDone ? 'bg-green-100 text-green-800' :
//                 (currentExercise && exercise.exerciseId === currentExercise.exerciseId && exercise.orderInList === currentExercise.orderInList) ? 'bg-blue-100 text-blue-800 font-medium' :
//                 'bg-gray-50 text-gray-700'
//               }`}
//             >
//               <span>
//                 {exercise.exerciseDetails?.exerciseName} (סדר: {exercise.orderInList + 1})
//               </span>
//               {exercise.isDone ? (
//                 <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white">בוצע</span>
//               ) : (currentExercise && exercise.exerciseId === currentExercise.exerciseId && exercise.orderInList === currentExercise.orderInList) ? (
//                 <span className="text-xs px-2 py-1 rounded-full bg-blue-500 text-white">נוכחי</span>
//               ) : (
//                 <span className="text-xs px-2 py-1 rounded-full bg-gray-300 text-gray-800">ממתין</span>
//               )}
//             </div>
//           ))}
//       </div>
//     </motion.div>
//   );
// };

// export default WorkoutPage;


// src/pages/WorkoutPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { activeWorkoutApi } from '../lib/api';
import { useAuthStore } from '../store/authStore';
import { PathResult, ExerciseEntry, NextExerciseResponse } from '../types'; // ודא שייבאת את ה-types הנכונים
import { data } from 'framer-motion/client';

const WorkoutPage: React.FC = () => {
  // קבל את ה-planDayId מה-URL כמחרוזת
  const { planDayId: planDayIdString } = useParams<{ planDayId: string }>();
  // המר למספר, עם ברירת מחדל 0 אם לא קיים או לא חוקי
  const planDayId = parseInt(planDayIdString || '0'); 
  
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const traineeId = user?.traineeId; // קבל את ה-traineeId מהסטור

  const [workoutData, setWorkoutData] = useState<PathResult | null>(null);
  const [currentExercise, setCurrentExercise] = useState<ExerciseEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);

  // פונקציה אחידה לטעינת סטטוס האימון, עטופה ב-useCallback לביצועים
  const fetchWorkoutStatus = useCallback(async () => {
    // ודא ש-traineeId ו-planDayId תקינים לפני ביצוע קריאת API
    if (!traineeId || !planDayId || planDayId === 0) {
      setError('שגיאה: מזהה מתאמן או מזהה יום אימון חסר/לא חוקי.');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null); // נקה שגיאות קודמות

      // קבל את סטטוס האימון הנוכחי מה-Backend
      const updatedWorkout: PathResult = await activeWorkoutApi.getUpdatedWorkoutPlan(traineeId);
      setWorkoutData(updatedWorkout);
      setIsWorkoutComplete(updatedWorkout.isWorkoutComplete);

      // אם האימון לא הושלם, ננסה לקבל את התרגיל הבא
      if (!updatedWorkout.isWorkoutComplete) {
        const nextExerciseRes: NextExerciseResponse = await activeWorkoutApi.getNextExerciseInWorkout(traineeId);
        
        // לוודא שאם ה-Backend אומר שהאימון הושלם כאן, אנחנו מעדכנים את המצב
        if (nextExerciseRes.isWorkoutComplete) {
          setIsWorkoutComplete(true);
          setCurrentExercise(null);
        } else {
          setCurrentExercise(nextExerciseRes.nextExercise || null);
        }
      } else {
        setCurrentExercise(null); // האימון הושלם
      }

    } catch (err: any) {
      console.error('Error fetching workout status:', err);
      // בדיקה אם השגיאה היא 404 (לא נמצא), מה שיכול להעיד על סיום אימון או אי זמינות
      if (err.response && err.response.status === 404) {
        setIsWorkoutComplete(true); // אם האימון לא נמצא, נניח שהוא הושלם
        setCurrentExercise(null);
        alert('האימון הסתיים או לא נמצא במערכת. חוזרים לדף הבית.');
        navigate('/'); // חזור לדף הבית
      } else {
        // הצג הודעת שגיאה כללית יותר
        setError(err.response?.data?.message || err.message || 'שגיאה בטעינת סטטוס האימון.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [traineeId, planDayId, navigate]); // הוסף traineeId, planDayId, ו-navigate כתלויות ל-useCallback

  // טען את הסטטוס הראשוני של האימון כאשר הקומפוננטה נטענת
  useEffect(() => {
    fetchWorkoutStatus();
  }, [fetchWorkoutStatus]); // תלוי ב-fetchWorkoutStatus שהוגדר ב-useCallback

  // מטפל בהתחלת תרגיל
  const handleStartExercise = async (exerciseId: number) => {
    // ודא שקיים traineeId ו-currentExercise לפני הפעולה
    if (!traineeId || !currentExercise) return;

    try {

      const currentTime = new Date(); // הזמן הנוכחי כאובייקט Date
      // קריאה ל-API של התחלת תרגיל עם הזמן הנוכחי
      await activeWorkoutApi.startExercise(traineeId, exerciseId, currentTime);
      alert('התרגיל התחיל!');
      // לאחר התחלת תרגיל, רענן את סטטוס האימון כדי לעדכן את ה-UI
      await fetchWorkoutStatus(); 
    // קריאה ל-API של התחלת תרגיל עם תאריך קבוע
    // await activeWorkoutApi.startExercise(traineeId, exerciseId, new Date('2025-06-15T09:00:00.000Z'));
    // alert('התרגיל התחיל!');
    // לאחר התחלת תרגיל, רענן את סטטוס האימון כדי לעדכן את ה-UI
    //await fetchWorkoutStatus(); 
    } catch (err: any) {
      console.error('Failed to start exercise:', err);
      alert(`שגיאה בהתחלת תרגיל: ${err.response?.data?.message || err.message}`);
    }
  };

  // מטפל בסיום תרגיל
  const handleCompleteExercise = async (exerciseId: number) => {
    // ודא שקיים traineeId ו-currentExercise לפני הפעולה
    if (!traineeId || !currentExercise) return;

    try {
      // קריאה ל-API של סיום תרגיל עם הזמן הנוכחי
      await activeWorkoutApi.completeExercise(traineeId, exerciseId, new Date());
      alert('התרגיל הסתיים!');
      // לאחר סיום תרגיל, רענן את סטטוס האימון כדי לקבל את התרגיל הבא או לסיים את האימון
      await fetchWorkoutStatus();
    } catch (err: any) {
      console.error('Failed to complete exercise:', err);
      alert(`שגיאה בסיום תרגיל: ${err.response?.data?.message || err.message}`);
    }
  };

  // --- תנאי רינדור לפי מצב הטעינה/שגיאה/סיום ---
  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">טוען נתוני אימון...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>{error}</p>
        <Button onClick={() => navigate('/')} className="mt-4">חזור לדף הבית</Button>
      </div>
    );
  }

  if (isWorkoutComplete) {
    return (
      <div className="text-center py-8 text-green-600">
        <h2 className="text-2xl font-bold mb-4">כל הכבוד! האימון הושלם בהצלחה!</h2>
        <Button onClick={() => navigate('/')}>חזור לדף הבית</Button>
      </div>
    );
  }

  // אם אין נתוני אימון או תרגיל נוכחי למרות שהאימון לא הושלם
  if (!workoutData || !currentExercise) {
    return (
      <div className="text-center py-8 text-gray-500">
        לא נמצא אימון פעיל או שהתרגיל הבא לא זמין.
        <Button onClick={() => navigate('/')} className="mt-4">חזור לדף הבית</Button>
      </div>
    );
  }

  // --- רינדור דף האימון הפעיל ---
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        אימון פעיל: {workoutData.trainee?.traineeName || 'מתאמן לא ידוע'}
      </h1>

      {currentExercise && ( // ודא ש-currentExercise קיים לפני הרינדור
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-md">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">תרגיל נוכחי: {currentExercise.exerciseDetails?.exerciseName}</h2>
          <p className="text-gray-700">סדר בתרגילים: {currentExercise.orderInList + 1} מתוך {workoutData.exerciseIdsInPath ? Object.keys(workoutData.exerciseIdsInPath).length : '?'}</p>
          
          {/* הוסף כאן פרטים נוספים מה-currentExercise כגון סטים, חזרות, זמן מנוחה */}
          {/* ודא שהשדות האלה קיימים ב-ExerciseEntry שלך אם אתה רוצה להציג אותם */}
          {/* {currentExercise.sets && <p>סטים: {currentExercise.sets}</p>}
          {currentExercise.reps && <p>חזרות: {currentExercise.reps}</p>}
          {currentExercise.restTime && <p>זמן מנוחה: {currentExercise.restTime} שניות</p>}
           */}

          <div className="mt-4 flex gap-4">
            {/* כפתור "התחל תרגיל" מופיע רק אם התרגיל עדיין לא התחיל */}
            {/* {!currentExercise.startTime || currentExercise.startTime === "0001-01-01T00:00:00" ? ( // ודא שגם תאריך ברירת המחדל מטופל(
              <Button onClick={() => handleStartExercise(currentExercise.exerciseId)} className="bg-green-500 hover:bg-green-600">
                התחל תרגיל
              </Button>
            ) : (
              // כפתור "סיים תרגיל" מופיע רק אם התרגיל התחיל ועדיין לא הסתיים
              <Button onClick={() => handleCompleteExercise(currentExercise.exerciseId)} className="bg-indigo-500 hover:bg-indigo-600">
                סיים תרגיל
              </Button>
            )} */}
            {!currentExercise.startTime || currentExercise.startTime === "0001-01-01T00:00:00" ? ( // ודא שגם תאריך ברירת המחדל מטופל(
              <Button onClick={() => handleStartExercise(currentExercise.exerciseId)} className="bg-green-500 hover:bg-green-600">
                התחל תרגיל
              </Button>
            ) : (
              // כפתור "סיים תרגיל" מופיע רק אם התרגיל התחיל ועדיין לא הסתיים
              <Button onClick={() => handleCompleteExercise(currentExercise.exerciseId)} className="bg-indigo-500 hover:bg-indigo-600">
                סיים תרגיל
              </Button>
            )}
          </div>
        </div>
      )}

      {/* הצגה של התקדמות האימון או רשימת תרגילים עתידיים/שהושלמו */}
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">סטטוס תרגילים:</h3>
      <div className="space-y-3">
        {workoutData.exerciseIdsInPath && Object.values(workoutData.exerciseIdsInPath)
          .sort((a, b) => a.orderInList - b.orderInList) // ממיין לפי סדר התרגיל
          .map((exercise, index) => (
            <div
              key={exercise.exerciseId + '-' + index} // מפתח ייחודי לכל פריט ברשימה
              className={`flex items-center justify-between p-3 rounded-md ${
                exercise.isDone ? 'bg-green-100 text-green-800' : // תרגיל בוצע
                (currentExercise && exercise.exerciseId === currentExercise.exerciseId && exercise.orderInList === currentExercise.orderInList) ? 'bg-blue-100 text-blue-800 font-medium' : // תרגיל נוכחי
                'bg-gray-50 text-gray-700' // תרגיל ממתין
              }`}
            >
              <span>
                {exercise.exerciseDetails?.exerciseName} (סדר: {exercise.orderInList + 1})
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
    </motion.div>
  );
};

export default WorkoutPage;