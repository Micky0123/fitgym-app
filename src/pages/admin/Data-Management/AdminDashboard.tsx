import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Dumbbell, 
  FolderOpen, 
  Target, 
  Calendar,
  Tag,
  Puzzle,
  Activity,
  UserPlus,
  TrendingUp,
  CalendarRange,
  Split,
  Clock,
  CalendarCheck,
  ListChecks,
  Heart 
} from 'lucide-react';
import Button from '../../../components/ui/Button';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { 
      icon: <Users className="h-10 w-10 text-blue-600" />, 
      title: 'ניהול מתאמנים', 
      description: 'צפייה, עדכון ומחיקה של מתאמנים',
      path: '/admin/trainees'
    },
    { 
      icon: <Dumbbell className="h-10 w-10 text-purple-600" />, 
      title: 'ניהול ציוד', 
      description: 'הוספה, עדכון ומחיקה של ציוד אימון',
      path: '/admin/equipment'
    },
    { 
      icon: <Tag className="h-10 w-10 text-green-600" />, 
      title: 'ניהול קטגוריות', 
      description: 'ניהול קטגוריות תרגילים',
      path: '/admin/categories'
    },
    { 
      icon: <Puzzle className="h-10 w-10 text-orange-600" />, 
      title: 'ניהול תרגילים', 
      description: 'הוספה, עדכון ומחיקה של תרגילים',
      path: '/admin/exercises'
    },
    { 
      icon: <FolderOpen className="h-10 w-10 text-indigo-600" />, 
      title: 'ניהול שרירים ', 
      description: 'ניהול מידע על שרירים ומפרקים',
      path: '/admin/muscles'
    },
    { 
      icon: <Target className="h-10 w-10 text-red-600" />, 
      title: 'ניהול מטרות', 
      description: 'הגדרת מטרות אימון שונות',
      path: '/admin/goals'
    },
    { 
      icon: <Calendar className="h-10 w-10 text-teal-600" />, 
      title: 'תוכניות אימון', 
      description: 'יצירה וניהול של תוכניות אימון',
      path: '/admin/programs'
    },
    { 
      icon: <Activity className="h-10 w-10 text-yellow-600" />, 
      title: 'רמות כושר', 
      description: 'ניהול רמות כושר',
      path: '/admin/fitness-levels'
    },
    { 
      icon: <UserPlus className="h-10 w-10 text-pink-600" />, 
      title: 'מפרקים', 
      description: 'ניהול מפרקים',
      path: '/admin/joints'
    },
    { 
      icon: <TrendingUp className="h-10 w-10 text-indigo-500" />, 
      title: 'סוגי שרירים', 
      description: 'ניהול סוגי שרירים',
      path: '/admin/muscle-types'
    },

    {
        icon: <CalendarRange className="h-10 w-10 text-rose-600" />, 
        title: 'ימי תכנית',
        description: 'ניהול ימי תכנית האימון',
        path: '/admin/plan-days'
      },
      {
        icon: <Split className="h-10 w-10 text-blue-500" />, 
        title: 'תתי שרירים',
        description: 'ניהול שרירים מפורטים',
        path: '/admin/sub-muscles'
      },
      {
        icon: <Clock className="h-10 w-10 text-amber-600" />, 
        title: 'משך אימון',
        description: 'הגדרת משכי זמן לאימונים',
        path: '/admin/training-durations'
      },
      {
        icon: <CalendarCheck className="h-10 w-10 text-lime-600" />, 
        title: 'ימי אימון אפשריים',
        description: 'ניהול אפשרויות לימי אימון בתוכנית',
        path: '/admin/training-day-options'
      },
      {
        icon: <ListChecks className="h-10 w-10 text-violet-600" />, 
        title: 'תוכניות מותאמות',
        description: 'יצירה וניהול של תוכניות לפי מתאמן',
        path: '/admin/training-plans'
      },
      {
        icon: <Heart className="h-10 w-10 text-cyan-700" />, 
        // icon: <Body className="h-10 w-10 text-cyan-700" />, 
        title: 'מבני גוף',
        description: 'הגדרת סוגי מבנה גוף',
        path: '/admin/size'
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
              ממשק ניהול מערכת
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              ברוך הבא לממשק הניהול של מערכת האימונים
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
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
                    onClick={() => navigate(item.path)}
                    fullWidth
                  >
                    פתח
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

export default AdminDashboard;