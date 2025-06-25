// // // // src/pages/admin/system-init/SchedulerInitForm.tsx
// // // import React, { useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { motion } from 'framer-motion';
// // // import { Loader2 } from 'lucide-react';
// // // import Button from '../../../components/ui/Button'; // וודא שהנתיב נכון

// // // // נניח שפונקציה זו קיימת ב-utils.ts או שיצרת אותה מחדש
// // // const formatApiError = (error: any): string => {
// // //   if (error.response && error.response.data) {
// // //     if (typeof error.response.data === 'string') {
// // //       return error.response.data;
// // //     }
// // //     if (error.response.data.detail) {
// // //       return error.response.data.detail;
// // //     }
// // //     if (error.response.data.errors) {
// // //       const errors = Object.values(error.response.data.errors).flat();
// // //       return (errors as string[]).join(', ');
// // //     }
// // //   }
// // //   return error.message || 'שגיאה לא ידועה מהשרת.';
// // // };

// // // const SchedulerInitForm: React.FC = () => {
// // //   const navigate = useNavigate();
// // //   const [slotMinutes, setSlotMinutes] = useState<number>(5); // ערך ברירת מחדל
// // //   const [slotCount, setSlotCount] = useState<number>(200);     // ערך ברירת מחדל
// // //   const [isLoading, setIsLoading] = useState<boolean>(false);
// // //   const [error, setError] = useState<string | null>(null);

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault(); // מונע ריענון דף
// // //     setIsLoading(true);
// // //     setError(null);

// // //     try {
// // //       const response = await fetch('/api/ActiveWorkout/initialize', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ slotMinutes, slotCount }),
// // //       });

// // //       const result = await response.text();

// // //       if (response.ok) {
// // //         alert(`האתחול בוצע בהצלחה: ${result}`);
// // //         navigate('/admin/system-init'); // חזרה לדף הניהול הראשי לאחר הצלחה
// // //       } else {
// // //         let errorMessage = result;
// // //         try {
// // //           const errorData = JSON.parse(result);
// // //           errorMessage = formatApiError({ response: { data: errorData } });
// // //         } catch (parseError) {
// // //           errorMessage = formatApiError({ message: result });
// // //         }
// // //         setError(errorMessage);
// // //       }
// // //     } catch (err: any) {
// // //       console.error('Error initializing scheduler:', err);
// // //       setError(`שגיאת רשת: לא ניתן להתחבר לשרת. ${formatApiError(err)}`);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, y: 20 }}
// // //       animate={{ opacity: 1, y: 0 }}
// // //       transition={{ duration: 0.5 }}
// // //       className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg"
// // //     >
// // //       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
// // //         אתחול סקדולר
// // //       </h2>
// // //       <p className="text-gray-600 mb-6 text-center">
// // //         אנא הזן את פרטי האתחול של הסקדולר.
// // //       </p>

// // //       <form onSubmit={handleSubmit} className="space-y-4">
// // //         <div>
// // //           <label htmlFor="slotMinutes" className="block text-sm font-medium text-gray-700">
// // //             אורך סלוט בדקות:
// // //           </label>
// // //           <input
// // //             type="number"
// // //             id="slotMinutes"
// // //             value={slotMinutes}
// // //             onChange={(e) => setSlotMinutes(Number(e.target.value))}
// // //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// // //             required
// // //             min="1"
// // //             disabled={isLoading}
// // //           />
// // //         </div>

// // //         <div>
// // //           <label htmlFor="slotCount" className="block text-sm font-medium text-gray-700">
// // //             מספר סלוטים:
// // //           </label>
// // //           <input
// // //             type="number"
// // //             id="slotCount"
// // //             value={slotCount}
// // //             onChange={(e) => setSlotCount(Number(e.target.value))}
// // //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// // //             required
// // //             min="1"
// // //             disabled={isLoading}
// // //           />
// // //         </div>

// // //         {error && (
// // //           <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
// // //             {error}
// // //           </div>
// // //         )}

// // //         <Button
// // //           type="submit"
// // //           fullWidth
// // //           disabled={isLoading}
// // //         >
// // //           {isLoading ? (
// // //             <div className="flex items-center justify-center">
// // //               <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// // //               מבצע אתחול...
// // //             </div>
// // //           ) : (
// // //             'התחל אתחול'
// // //           )}
// // //         </Button>

// // //         <Button
// // //           type="button"
// // //           onClick={() => navigate('/admin/system-init')}
// // //           variant="secondary"
// // //           fullWidth
// // //           disabled={isLoading}
// // //         >
// // //           ביטול
// // //         </Button>
// // //       </form>
// // //     </motion.div>
// // //   );
// // // };

// // // export default SchedulerInitForm;



// // // src/pages/admin/system-init/SchedulerInitForm.tsx
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { Loader2 } from 'lucide-react';
// // import Button from '../../../components/ui/Button';

// // // ** ייבוא חדש **
// // import { schedulerApi } from '../../../lib/api'; // וודא שהנתיב נכון

// // const SchedulerInitForm: React.FC = () => {
// //   const navigate = useNavigate();
// //   const [slotMinutes, setSlotMinutes] = useState<number>(5);
// //   const [slotCount, setSlotCount] = useState<number>(200);
// //   const [isLoading, setIsLoading] = useState<boolean>(false);
// //   const [error, setError] = useState<string | null>(null);

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     setError(null);

// //     try {
// //       // ** שימוש בפונקציה מה-API **
// //       const result = await schedulerApi.initializeScheduler({ slotMinutes, slotCount });
// //       alert(`האתחול בוצע בהצלחה: ${result}`);
// //       navigate('/admin/system-init');
// //     } catch (err: any) {
// //       console.error('Error initializing scheduler:', err);
// //       setError(err); // הודעת השגיאה כבר מפורמטת על ידי handleApiError ב-schedulerApi
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.5 }}
// //       className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg"
// //     >
// //       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
// //         אתחול סקדולר
// //       </h2>
// //       <p className="text-gray-600 mb-6 text-center">
// //         אנא הזן את פרטי האתחול של הסקדולר.
// //       </p>

// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <div>
// //           <label htmlFor="slotMinutes" className="block text-sm font-medium text-gray-700">
// //             אורך סלוט בדקות:
// //           </label>
// //           <input
// //             type="number"
// //             id="slotMinutes"
// //             value={slotMinutes}
// //             onChange={(e) => setSlotMinutes(Number(e.target.value))}
// //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //             required
// //             min="1"
// //             disabled={isLoading}
// //           />
// //         </div>

// //         <div>
// //           <label htmlFor="slotCount" className="block text-sm font-medium text-gray-700">
// //             מספר סלוטים:
// //           </label>
// //           <input
// //             type="number"
// //             id="slotCount"
// //             value={slotCount}
// //             onChange={(e) => setSlotCount(Number(e.target.value))}
// //             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //             required
// //             min="1"
// //             disabled={isLoading}
// //           />
// //         </div>

// //         {error && (
// //           <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
// //             {error}
// //           </div>
// //         )}

// //         <Button
// //           type="submit"
// //           fullWidth
// //           disabled={isLoading}
// //         >
// //           {isLoading ? (
// //             <div className="flex items-center justify-center">
// //               <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// //               מבצע אתחול...
// //             </div>
// //           ) : (
// //             'התחל אתחול'
// //           )}
// //         </Button>

// //         <Button
// //           type="button"
// //           onClick={() => navigate('/admin/system-init')}
// //           variant="secondary"
// //           fullWidth
// //           disabled={isLoading}
// //         >
// //           ביטול
// //         </Button>
// //       </form>
// //     </motion.div>
// //   );
// // };

// // export default SchedulerInitForm;
// // src/pages/admin/system-init/SchedulerInitForm.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion'; // 💡 הוספתי AnimatePresence
// import { Loader2, CheckCircle, XCircle } from 'lucide-react';
// import Button from '../../../components/ui/Button';

// import { schedulerApi } from '../../../lib/api';

// const SchedulerInitForm: React.FC = () => {
//   const navigate = useNavigate();
//   const [slotMinutes, setSlotMinutes] = useState<number>(5);
//   const [slotCount, setSlotCount] = useState<number>(200);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   // 💡 מצבים חדשים לשליטה במודאלים
//   const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
//   const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
//     setSuccessMessage(null);
//     setShowSuccessModal(false); // ודא שהמודאלים סגורים לפני בקשה חדשה
//     setShowErrorModal(false);

//     try {
//       const result = await schedulerApi.initializeScheduler({ slotMinutes, slotCount });
//       setSuccessMessage(`האתחול בוצע בהצלחה: ${result}`);
//       setShowSuccessModal(true); // 💡 הצג את מודאל ההצלחה
//     } catch (err: any) {
//       console.error('Error initializing scheduler:', err);
//       setError(err || 'אירעה שגיאה לא ידועה במהלך האתחול.'); // ודא שיש הודעת שגיאה כלשהי
//       setShowErrorModal(true); // 💡 הצג את מודאל השגיאה
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSuccessModalClose = () => {
//     setShowSuccessModal(false);
//     navigate('/admin/system-init'); // 💡 ניווט לאחר סגירת מודאל ההצלחה
//   };

//   const handleErrorModalClose = () => {
//     setShowErrorModal(false);
//     // ניתן להוסיף כאן לוגיקה נוספת אם נדרש לאחר סגירת מודאל שגיאה
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg"
//     >
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//         אתחול סקדולר
//       </h2>
//       <p className="text-gray-600 mb-6 text-center">
//         אנא הזן את פרטי האתחול של הסקדולר.
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="slotMinutes" className="block text-sm font-medium text-gray-700">
//             אורך סלוט בדקות:
//           </label>
//           <input
//             type="number"
//             id="slotMinutes"
//             value={slotMinutes}
//             onChange={(e) => setSlotMinutes(Number(e.target.value))}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             required
//             min="1"
//             disabled={isLoading}
//           />
//         </div>

//         <div>
//           <label htmlFor="slotCount" className="block text-sm font-medium text-gray-700">
//             מספר סלוטים:
//           </label>
//           <input
//             type="number"
//             id="slotCount"
//             value={slotCount}
//             onChange={(e) => setSlotCount(Number(e.target.value))}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             required
//             min="1"
//             disabled={isLoading}
//           />
//         </div>

//         <Button
//           type="submit"
//           fullWidth
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <div className="flex items-center justify-center">
//               <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//               מבצע אתחול...
//             </div>
//           ) : (
//             'התחל אתחול'
//           )}
//         </Button>

//         <Button
//           type="button"
//           onClick={() => navigate('/admin/system-init')}
//           variant="secondary"
//           fullWidth
//           disabled={isLoading}
//         >
//           ביטול
//         </Button>
//       </form>

//       {/* --- מודאל הצלחה --- */}
//       <AnimatePresence>
//         {showSuccessModal && (
//           <motion.div
//             className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center"
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: 50, opacity: 0 }}
//               transition={{ type: "spring", damping: 15, stiffness: 300 }}
//             >
//               <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
//               <h3 className="text-xl font-bold text-gray-900 mb-2">האתחול הושלם בהצלחה!</h3>
//               <p className="text-gray-600 mb-6">
//                 {successMessage}
//               </p>
//               <Button
//                 onClick={handleSuccessModalClose}
//                 size="lg"
//                 fullWidth
//               >
//                 חזור לדף המערכת
//               </Button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* --- מודאל שגיאה --- */}
//       <AnimatePresence>
//         {showErrorModal && (
//           <motion.div
//             className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center"
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: 50, opacity: 0 }}
//               transition={{ type: "spring", damping: 15, stiffness: 300 }}
//             >
//               <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//               <h3 className="text-xl font-bold text-gray-900 mb-2">שגיאה באתחול!</h3>
//               <p className="text-red-600 mb-6">
//                 {error}
//               </p>
//               <Button
//                 onClick={handleErrorModalClose}
//                 size="lg"
//                 fullWidth
//                 variant="danger" // אם יש לך וריאנט כזה
//               >
//                 הבנתי
//               </Button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// export default SchedulerInitForm;

// src/pages/admin/system-init/SchedulerInitForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import Button from '../../../components/ui/Button';

import { schedulerApi } from '../../../lib/api';

const SchedulerInitForm: React.FC = () => {
  const navigate = useNavigate();
  const [slotMinutes, setSlotMinutes] = useState<number>(5);
  const [slotCount, setSlotCount] = useState<number>(200);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    setShowSuccessModal(false);
    setShowErrorModal(false);

    try {
      const result = await schedulerApi.initializeScheduler({ slotMinutes, slotCount });
      setSuccessMessage(`האתחול בוצע בהצלחה: ${result}`);
      setShowSuccessModal(true);
    } catch (err: any) {
      console.error('Error initializing scheduler:', err);
      let errorMessage = 'אירעה שגיאה לא ידועה במהלך האתחול.';

      // 💡 טיפול ספציפי בשגיאה "Scheduler already initialized!"
      // אנו מניחים שהשגיאה מגיעה כסטרינג ישירות מהשרת דרך האובייקט err.
      // אם ה-API שלך עוטף את השגיאה באובייקט מסוים (למשל, err.message או err.response.data),
      // יש לשנות את הבדיקה בהתאם.
      if (typeof err === 'string' && err.includes("Scheduler already initialized!")) {
        errorMessage = "המערכת כבר מאותחלת!";
      } else if (err && typeof err === 'string') {
        // אם err הוא סטרינג אחר, נשתמש בו ישירות
        errorMessage = err;
      } else if (err && err.message) {
        // אם err הוא אובייקט עם שדה message
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/admin/system-init');
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
    navigate('/admin/system-init');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        אתחול סקדולר
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        אנא הזן את פרטי האתחול של הסקדולר.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="slotMinutes" className="block text-sm font-medium text-gray-700">
            אורך סלוט בדקות:
          </label>
          <input
            type="number"
            id="slotMinutes"
            value={slotMinutes}
            onChange={(e) => setSlotMinutes(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
            min="1"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="slotCount" className="block text-sm font-medium text-gray-700">
            מספר סלוטים:
          </label>
          <input
            type="number"
            id="slotCount"
            value={slotCount}
            onChange={(e) => setSlotCount(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
            min="1"
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              מבצע אתחול...
            </div>
          ) : (
            'התחל אתחול'
          )}
        </Button>

        <Button
          type="button"
          onClick={() => navigate('/admin/system-init')}
          variant="secondary"
          fullWidth
          disabled={isLoading}
        >
          ביטול
        </Button>
      </form>

      {/* --- מודאל הצלחה --- */}
      <AnimatePresence>
        {showSuccessModal && (
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">האתחול הושלם בהצלחה!</h3>
              <p className="text-gray-600 mb-6">
                {successMessage}
              </p>
              <Button
                onClick={handleSuccessModalClose}
                size="lg"
                fullWidth
              >
                חזור לדף המערכת
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- מודאל שגיאה --- */}
      <AnimatePresence>
        {showErrorModal && (
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
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">שגיאה באתחול!</h3>
              <p className="text-red-600 mb-6">
                {error}
              </p>
              <Button
                onClick={handleErrorModalClose}
                size="lg"
                fullWidth
                variant="danger" // אם יש לך וריאנט כזה
              >
                הבנתי
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SchedulerInitForm;