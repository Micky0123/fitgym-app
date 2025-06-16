import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Save, User } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';
import { traineeApi } from '../lib/api';
import { formatApiError } from '../lib/utils';
import { RegistrationData } from '../types';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegistrationData>();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userData = await traineeApi.getById(user.traineeId);
        reset(userData);
      } catch (error) {
        setApiError(formatApiError(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate, reset]);

  const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
    if (!user) return;

    setIsLoading(true);
    setApiError(null);
    setSuccess(false);
    
    try {
      await traineeApi.update(user.traineeId, data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setApiError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-medium text-gray-900">פרטים אישיים</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              כאן ניתן לעדכן את הפרטים האישיים שלך
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="טלפון"
                fullWidth
                {...register('phone', { 
                  required: 'שדה חובה',
                  pattern: {
                    value: /^0\d{8,9}$/,
                    message: 'מספר טלפון לא תקין'
                  }
                })}
                error={errors.phone?.message}
              />
              
              <Input
                label="דוא״ל"
                type="email"
                fullWidth
                {...register('email', { 
                  required: 'שדה חובה',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'כתובת דוא״ל לא תקינה'
                  }
                })}
                error={errors.email?.message}
              />

              <Input
                label="משקל (ק״ג)"
                type="number"
                fullWidth
                {...register('traineeWeight', { 
                  required: 'שדה חובה',
                  min: { value: 30, message: 'משקל לא תקין' },
                  max: { value: 300, message: 'משקל לא תקין' }
                })}
                error={errors.traineeWeight?.message}
              />
              
              <Input
                label="גובה (ס״מ)"
                type="number"
                fullWidth
                {...register('traineeHeight', { 
                  required: 'שדה חובה',
                  min: { value: 100, message: 'גובה לא תקין' },
                  max: { value: 250, message: 'גובה לא תקין' }
                })}
                error={errors.traineeHeight?.message}
              />
              
              <Input
                label="סיסמה חדשה (השאר ריק לשימוש בסיסמה הנוכחית)"
                type="password"
                fullWidth
                {...register('password', { 
                  minLength: { value: 6, message: 'סיסמה חייבת להיות לפחות 6 תווים' }
                })}
                error={errors.password?.message}
              />
            </div>

            {apiError && (
              <div className="mt-4 bg-red-50 p-3 rounded text-red-700 text-sm">
                {apiError}
              </div>
            )}

            {success && (
              <div className="mt-4 bg-green-50 p-3 rounded text-green-700 text-sm">
                הפרטים עודכנו בהצלחה
              </div>
            )}
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Button
              type="submit"
              isLoading={isLoading}
              icon={<Save className="h-4 w-4" />}
            >
              שמור שינויים
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ProfilePage;