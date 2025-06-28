
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
import { schedulerApi } from '../../../lib/api'; 

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

