// src/context/WorkoutRefreshContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// הגדר את סוג הקונטקסט
interface WorkoutRefreshContextType {
  // פונקציה שכל רכיב יכול לקרוא לה כדי לבקש רענון
  triggerRefresh: () => void;
  // משתנה שמשתנה בכל פעם שמתבצע טריגר (רכיבים יכולים להאזין לו)
  refreshCounter: number;
}

// צור את הקונטקסט עם ערך ברירת מחדל (או null ואז בדיקה)
const WorkoutRefreshContext = createContext<WorkoutRefreshContextType | undefined>(undefined);

// קומפוננטת Provider שעוטפת את האפליקציה או חלקים ממנה
export const WorkoutRefreshProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [refreshCounter, setRefreshCounter] = useState(0);

  // פונקציה שמשנה את ה-counter כדי להפעיל רענון
  const triggerRefresh = () => {
    setRefreshCounter(prev => prev + 1);
    console.log("Workout refresh triggered! Counter:", refreshCounter + 1); // לצרכי דיבוג
  };

  const value = { triggerRefresh, refreshCounter };

  return (
    <WorkoutRefreshContext.Provider value={value}>
      {children}
    </WorkoutRefreshContext.Provider>
  );
};

// Hook מותאם אישית לשימוש קל בקונטקסט
export const useWorkoutRefresh = () => {
  const context = useContext(WorkoutRefreshContext);
  if (context === undefined) {
    throw new Error('useWorkoutRefresh must be used within a WorkoutRefreshProvider');
  }
  return context;
};