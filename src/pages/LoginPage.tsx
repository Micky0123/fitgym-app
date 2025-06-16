import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, LogIn, UserPlus, Lock, Mail } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading, clearError, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!username || !password) {
      return;
    }
    
    await login(username, password);
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8" dir="rtl">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex justify-center">
            <Dumbbell className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            התחברות למערכת
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ברוכים הבאים למערכת ניהול האימונים
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="שם משתמש"
                fullWidth
                icon={<Mail className="h-4 w-4" />}
                label="שם משתמש"
              />

              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="סיסמה"
                fullWidth
                icon={<Lock className="h-4 w-4" />}
                label="סיסמה"
              />
            </div>

            {error && (
              <div className="bg-red-50 p-3 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                icon={<LogIn className="h-4 w-4" />}
              >
                התחבר
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  אין לך חשבון?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/register">
                <Button
                  variant="outline"
                  fullWidth
                  icon={<UserPlus className="h-4 w-4" />}
                >
                  הרשמה למערכת
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;