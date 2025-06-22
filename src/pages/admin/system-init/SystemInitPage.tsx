
// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import {
// //   Clock,
// //   RefreshCw,
// //   Puzzle,
// //   Dumbbell,
// //   Share2
// // } from 'lucide-react';
// // import Button from '../../../components/ui/Button';

// // const SystemInitPage: React.FC = () => {
// //   const navigate = useNavigate();

// //   const menuItems = [
// //     {
// //       icon: <Clock className="h-10 w-10 text-blue-600" />,
// //       title: 'אתחול סקדולר',
// //       description: 'מייצר מחדש את כל חלונות הזמן במערכת',
// //       onClick: async () => {
// //         const response = await fetch('/api/ActiveWorkout/initialize', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ slotMinutes: 15, slotCount: 20 }),
// //         });
// //         const result = await response.text();
// //         alert(result);
// //       },
// //     },
// //     {
// //       icon: <RefreshCw className="h-10 w-10 text-red-600" />,
// //       title: 'איפוס סקדולר',
// //       description: 'מאפס את כל המידע מהסקדולר',
// //       onClick: async () => {
// //         const response = await fetch('/api/ActiveWorkout/reset', {
// //           method: 'POST',
// //         });
// //         const result = await response.text();
// //         alert(result);
// //       },
// //     },
// //     {
// //       icon: <Puzzle className="h-10 w-10 text-orange-600" />,
// //       title: 'קשרי גרף',
// //       description: 'מעבר למסך ניהול הגרף הראשי',
// //       onClick: () => navigate('/admin/system-init/GraphManagement'),
// //     },
// //     {
// //       icon: <Dumbbell className="h-10 w-10 text-purple-600" />,
// //       title: 'קשרי מכשירים-שרירים',
// //       description: 'ניהול חיבורים בין ציוד לקבוצות שרירים',
// //       onClick: () => navigate('/admin/system-init/DeviceMuscleEdgeManagement'),
// //     },
// //     {
// //       icon: <Share2 className="h-10 w-10 text-green-600" />,
// //       title: 'קשרי שריר-שריר',
// //       description: 'הגדרת קישורים בין קבוצות שרירים',
// //       onClick: () => navigate('/admin/system-init/MuscleEdgeManagement'),
// //     },
// //   ];

// //   return (
// //     <div className="space-y-6">
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //       >
// //         <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
// //           <div className="px-4 py-5 sm:px-6">
// //             <h2 className="text-xl font-medium text-gray-900">
// //               ניהול אתחול מערכת
// //             </h2>
// //             <p className="mt-1 max-w-2xl text-sm text-gray-500">
// //               פעולות מתקדמות לאתחול או ניהול גרף המערכת
// //             </p>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {menuItems.map((item, index) => (
// //             <motion.div
// //               key={index}
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.3, delay: index * 0.1 }}
// //               className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
// //             >
// //               <div className="p-6">
// //                 <div className="flex justify-center mb-4">
// //                   {item.icon}
// //                 </div>
// //                 <h3 className="text-lg font-medium text-gray-900 text-center">
// //                   {item.title}
// //                 </h3>
// //                 <p className="mt-2 text-sm text-gray-500 text-center">
// //                   {item.description}
// //                 </p>
// //                 <div className="mt-4">
// //                   <Button onClick={item.onClick} fullWidth>
// //                     הפעל
// //                   </Button>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default SystemInitPage;


// // src/pages/admin/SystemInitPage.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   Clock,
//   RefreshCw,
//   Puzzle,
//   Dumbbell,
//   Share2,
//   Loader2
// } from 'lucide-react';
// import Button from '../../../components/ui/Button';

// // נניח שפונקציה זו קיימת ב-utils.ts או שיצרת אותה מחדש
// const formatApiError = (error: any): string => {
//   if (error.response && error.response.data) {
//     if (typeof error.response.data === 'string') {
//       return error.response.data;
//     }
//     if (error.response.data.detail) {
//       return error.response.data.detail;
//     }
//     if (error.response.data.errors) {
//       const errors = Object.values(error.response.data.errors).flat();
//       return (errors as string[]).join(', ');
//     }
//   }
//   return error.message || 'שגיאה לא ידועה מהשרת.';
// };


// const SystemInitPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

//   const handleAction = async (actionKey: string, apiEndpoint: string, method: string = 'POST', body?: object) => {
//     setLoadingStates(prev => ({ ...prev, [actionKey]: true }));
//     try {
//       const options: RequestInit = {
//         method: method,
//         headers: { 'Content-Type': 'application/json' },
//       };
//       if (body) {
//         options.body = JSON.stringify(body);
//       }

//       const response = await fetch(apiEndpoint, options);
//       const result = await response.text();

//       if (response.ok) {
//         alert(`הפעולה בוצעה בהצלחה: ${result}`);
//       } else {
//         let errorMessage = result;
//         try {
//           const errorData = JSON.parse(result);
//           errorMessage = formatApiError({ response: { data: errorData } });
//         } catch (e) {
//           errorMessage = formatApiError({ message: result });
//         }
//         alert(`שגיאה בביצוע הפעולה: ${errorMessage}`);
//       }
//     } catch (error: any) {
//       console.error(`Error performing ${actionKey}:`, error);
//       alert(`שגיאת רשת: לא ניתן להתחבר לשרת או שהייתה בעיה בבקשה. ${formatApiError(error)}`);
//     } finally {
//       setLoadingStates(prev => ({ ...prev, [actionKey]: false }));
//     }
//   };


//   const menuItems = [
//     {
//       key: 'initializeScheduler',
//       icon: <Clock className="h-10 w-10 text-blue-600" />,
//       title: 'אתחול סקדולר',
//       description: 'מייצר מחדש את כל חלונות הזמן במערכת',
//       // ** שינוי כאן: נווט לדף הטופס החדש **
//       onClick: () => navigate('/admin/system-init/initialize-scheduler-form'),
//     },
//     {
//       key: 'resetScheduler',
//       icon: <RefreshCw className="h-10 w-10 text-red-600" />,
//       title: 'איפוס סקדולר',
//       description: 'מאפס את כל המידע מהסקדולר',
//       onClick: () => handleAction(
//         'resetScheduler',
//         '/api/ActiveWorkout/reset',
//         'POST'
//       ),
//     },
//     {
//       key: 'graphRelations',
//       icon: <Puzzle className="h-10 w-10 text-orange-600" />,
//       title: 'קשרי גרף',
//       description: 'מעבר למסך ניהול הגרף הראשי',
//       onClick: () => navigate('/admin/system-init/GraphManagement'),
//     },
//     {
//       key: 'deviceMuscleRelations',
//       icon: <Dumbbell className="h-10 w-10 text-purple-600" />,
//       title: 'קשרי מכשירים-שרירים',
//       description: 'ניהול חיבורים בין ציוד לקבוצות שרירים',
//       onClick: () => navigate('/admin/system-init/DeviceMuscleEdgeManagement'),
//     },
//     {
//       key: 'muscleMuscleRelations',
//       icon: <Share2 className="h-10 w-10 text-green-600" />,
//       title: 'קשרי שריר-שריר',
//       description: 'הגדרת קישורים בין קבוצות שרירים',
//       onClick: () => navigate('/admin/system-init/MuscleEdgeManagement'),
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
//           <div className="px-4 py-5 sm:px-6">
//             <h2 className="text-xl font-medium text-gray-900">
//               ניהול אתחול מערכת
//             </h2>
//             <p className="mt-1 max-w-2xl text-sm text-gray-500">
//               פעולות מתקדמות לאתחול או ניהול גרף המערכת
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {menuItems.map((item, index) => (
//             <motion.div
//               key={item.key}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
//             >
//               <div className="p-6">
//                 <div className="flex justify-center mb-4">
//                   {item.icon}
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 text-center">
//                   {item.title}
//                 </h3>
//                 <p className="mt-2 text-sm text-gray-500 text-center">
//                   {item.description}
//                 </p>
//                 <div className="mt-4">
//                   <Button
//                     onClick={item.onClick}
//                     fullWidth
//                     disabled={loadingStates[item.key]}
//                   >
//                     {loadingStates[item.key] ? (
//                       <div className="flex items-center justify-center">
//                         <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                         טוען...
//                       </div>
//                     ) : (
//                       'הפעל'
//                     )}
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SystemInitPage;

// src/pages/admin/SystemInitPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock,
  RefreshCw,
  Puzzle,
  Dumbbell,
  Share2,
  Loader2
} from 'lucide-react';
import Button from '../../../components/ui/Button';

// ** ייבוא חדש **
import { schedulerApi } from '../../../lib/api'; // וודא שהנתיב נכון

const SystemInitPage: React.FC = () => {
  const navigate = useNavigate();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const handleAction = async (actionKey: string, apiCall: () => Promise<string>) => {
    setLoadingStates(prev => ({ ...prev, [actionKey]: true }));
    try {
      const result = await apiCall();
      alert(`הפעולה בוצעה בהצלחה: ${result}`);
    } catch (error: any) { // השגיאה כבר מעוצבת ע"י handleApiError ב-API
      console.error(`Error performing ${actionKey}:`, error);
      alert(`שגיאה בביצוע הפעולה: ${error}`);
    } finally {
      setLoadingStates(prev => ({ ...prev, [actionKey]: false }));
    }
  };


  const menuItems = [
    {
      key: 'initializeScheduler',
      icon: <Clock className="h-10 w-10 text-blue-600" />,
      title: 'אתחול סקדולר',
      description: 'מייצר מחדש את כל חלונות הזמן במערכת',
      onClick: () => navigate('/admin/system-init/initialize-scheduler-form'),
    },
    {
      key: 'resetScheduler',
      icon: <RefreshCw className="h-10 w-10 text-red-600" />,
      title: 'איפוס סקדולר',
      description: 'מאפס את כל המידע מהסקדולר',
      // ** שימוש בפונקציה מה-API **
      onClick: () => handleAction(
        'resetScheduler',
        schedulerApi.resetScheduler // מעבירים את הפונקציה עצמה
      ),
    },
    {
      key: 'graphRelations',
      icon: <Puzzle className="h-10 w-10 text-orange-600" />,
      title: 'קשרי גרף',
      description: 'מעבר למסך ניהול הגרף הראשי',
      onClick: () => navigate('/admin/system-init/GraphManagement'),
    },
    {
      key: 'deviceMuscleRelations',
      icon: <Dumbbell className="h-10 w-10 text-purple-600" />,
      title: 'קשרי מכשירים-שרירים',
      description: 'ניהול חיבורים בין ציוד לקבוצות שרירים',
      onClick: () => navigate('/admin/system-init/DeviceMuscleEdgeManagement'),
    },
    {
      key: 'muscleMuscleRelations',
      icon: <Share2 className="h-10 w-10 text-green-600" />,
      title: 'קשרי שריר-שריר',
      description: 'הגדרת קישורים בין קבוצות שרירים',
      onClick: () => navigate('/admin/system-init/MuscleEdgeManagement'),
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-medium text-gray-900">
              ניהול אתחול מערכת
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              פעולות מתקדמות לאתחול או ניהול גרף המערכת
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  {item.description}
                </p>
                <div className="mt-4">
                  <Button
                    onClick={item.onClick}
                    fullWidth
                    disabled={loadingStates[item.key]}
                  >
                    {loadingStates[item.key] ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        טוען...
                      </div>
                    ) : (
                      'הפעל'
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SystemInitPage;

