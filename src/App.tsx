import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layout
import AppLayout from './components/AppLayout';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import WorkoutPage from './pages/WorkoutPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminDashboard from './pages/admin/Data-Management/AdminDashboard';
import CategoriesManagement from './pages/admin/Data-Management/CategoriesManagement';
import ExercisesManagement from './pages/admin/Data-Management/ExercisesManagement';
import GoalsManagement from './pages/admin/Data-Management/GoalsManagement';
import MusclesManagement from './pages/admin/Data-Management/MusclesManagement';
import EquipmentManagement from './pages/admin/Data-Management/EquipmentManagement';
import TraineesManagement from './pages/admin/Data-Management/TraineesManagement';
import JointManagement from './pages/admin/Data-Management/JointManagement';
import MuscleTypesManagement from './pages/admin/Data-Management/MuscleTypesManagement';
import FitnessLevelsManagement from './pages/admin/Data-Management/FitnessLevelsManagement';

import SizeManagement from './pages/admin/Data-Management/SizeManagement';
import PlanDayManagement from './pages/admin/Data-Management/PlanDayManagement';  
import SubMuscleManagement from './pages/admin/Data-Management/SubMuscleManagement';
import TrainingDayOptionManagement from './pages/admin/Data-Management/TrainingDayManagement';
import TrainingDurationManagement from './pages/admin/Data-Management/TrainingDurationManagement';
import TrainingPlanManagement from './pages/admin/Data-Management/TrainingPlanManagement';

import SystemInitPage from './pages/admin/system-init/SystemInitPage';
import GraphManagement from './pages/admin/system-init/GraphManager';
import DeviceMuscleEdgeManagement from './pages/admin/system-init/DeviceMuscleEdgeManagement';
import MuscleEdgeManagement from './pages/admin/system-init/MuscleEdgeManagement';
import SchedulerInitForm from './pages/admin/system-init/SchedulerInitForm'; 


const App: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // בדיקה אם יש ערך שמור ב-localStorage
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Protected route component
  const ProtectedRoute = ({ 
    children, 
    requiresAdmin = false 
  }: { 
    children: JSX.Element, 
    requiresAdmin?: boolean 
  }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (requiresAdmin && (!user || !user.isAdmin)) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <>
      {/* כפתור למעבר בין מצב כהה ובהיר */}
      {/* <header className="p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800">
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">האפליקציה שלי</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {isDarkMode ? 'מצב בהיר' : 'מצב כהה'}
        </button>
      </header> */}

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          {/* <Route path="Workout/:programId" element={
            <ProtectedRoute>
              
              <WorkoutPage traineeId={user?.traineeId ?? 0} planDayId={1} start/>
            </ProtectedRoute>
          } /> */}
           <Route  path="WorkoutPage/:planDayId" element={
                <ProtectedRoute>
                  <WorkoutPage /> 
                </ProtectedRoute>
              } 
            />

          {/* Admin routes */}
          <Route path="admin" element={
            <ProtectedRoute requiresAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="admin/categories" element={
            <ProtectedRoute requiresAdmin>
              <CategoriesManagement />
            </ProtectedRoute>
          } />
           <Route path="admin/trainees" element={
            <ProtectedRoute requiresAdmin>
              <TraineesManagement />
            </ProtectedRoute>
          } />
          <Route path="admin/exercises" element={
            <ProtectedRoute requiresAdmin>
              <ExercisesManagement />
            </ProtectedRoute>
          } />
          <Route path="admin/goals" element={
            <ProtectedRoute requiresAdmin>
              <GoalsManagement />
            </ProtectedRoute>
          } />
          <Route path="admin/muscles" element={
            <ProtectedRoute requiresAdmin>
              <MusclesManagement />
            </ProtectedRoute>
          } />
          <Route path="admin/equipment" element={
            <ProtectedRoute requiresAdmin>
              <EquipmentManagement />
            </ProtectedRoute>
          } />
          <Route path="admin/joint" element={
            <ProtectedRoute requiresAdmin>
              <JointManagement />
            </ProtectedRoute>
          } />
          <Route path="admin/muscle-types" element={
            <ProtectedRoute requiresAdmin>
              <MuscleTypesManagement />
            </ProtectedRoute>
          } />
          <Route path="admin/fitness-levels" element={
            <ProtectedRoute requiresAdmin>
              <FitnessLevelsManagement />
            </ProtectedRoute>
          } />
          <Route path="admin/size" element={
            <ProtectedRoute requiresAdmin>
              <SizeManagement />
            </ProtectedRoute>
          } />
          <Route path="admin/plan-days" element={
            <ProtectedRoute requiresAdmin>
              <PlanDayManagement />
            </ProtectedRoute>
          } />
          <Route path="admin/sub-muscles" element={
            <ProtectedRoute requiresAdmin>
              <SubMuscleManagement />
            </ProtectedRoute>
          } />
          <Route path="admin/training-day-options" element={
            <ProtectedRoute requiresAdmin>
              <TrainingDayOptionManagement />
            </ProtectedRoute>
          } />
          <Route path="admin/training-durations" element={
            <ProtectedRoute requiresAdmin>
              <TrainingDurationManagement />
            </ProtectedRoute>
          } />
          <Route path="admin/training-plans" element={
            <ProtectedRoute requiresAdmin>
              <TrainingPlanManagement />
            </ProtectedRoute>
          } />

          <Route path="/admin/system-init" element={<SystemInitPage />} />
           <Route path="/admin/system-init/initialize-scheduler-form" element={<SchedulerInitForm />} />
          <Route path="admin/system-init/GraphManagement" element={
            <ProtectedRoute requiresAdmin>
              <GraphManagement />
            </ProtectedRoute>
          } />

          <Route path="admin/system-init/DeviceMuscleEdgeManagement" element={
            <ProtectedRoute requiresAdmin>
              <DeviceMuscleEdgeManagement />
            </ProtectedRoute>
          } />

          <Route path="admin/system-init/MuscleEdgeManagement" element={
            <ProtectedRoute requiresAdmin>
              <MuscleEdgeManagement />
            </ProtectedRoute>
          } />
        </Route>

 
        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;