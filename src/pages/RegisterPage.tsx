
// export default RegisterPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Save, CheckCircle } from 'lucide-react'; // ייבא גם את CheckCircle לאייקון הצלחה
import { motion, AnimatePresence } from 'framer-motion'; // ייבא AnimatePresence לאנימציית כניסה/יציאה של המודאל
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { authApi } from '../lib/api';
import { RegistrationData } from '../types';
import { formatApiError } from '../lib/api'; 

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false); 

  const navigate = useNavigate();
  // State for dynamic options
  const [fitnessLevels, setFitnessLevels] = useState<{ id: number; name: string }[]>([]);
  const [goalOptions, setGoalOptions] = useState<{ id: number; name: string }[]>([]);
  const [trainingDaysOptions, setTrainingDaysOptions] = useState<{ id: number; name: string }[]>([]);
  const [trainingDurationOptions, setTrainingDurationOptions] = useState<{ id: number; name: string }[]>([]);

  // Fetch dynamic options from API
  const fetchOptions = async () => {
    try {
      setIsLoading(true);
      setApiError(null); 

      const [fitnessLevelsData, goalsData, trainingDaysData, trainingDurationData] = await Promise.all([
        authApi.getFitnessLevels(),
        authApi.getGoals(),
        authApi.getTrainingDays(),
        authApi.getTrainingDurations(),
      ]);

      setFitnessLevels(fitnessLevelsData.map((level: { fitnessLevelId: number; fitnessLevelName: string }) => ({
        id: level.fitnessLevelId,
        name: level.fitnessLevelName,
      })));

      setGoalOptions(goalsData.map((goal: { goalId: number; goalName: string }) => ({
        id: goal.goalId,
        name: goal.goalName,
      })));

      const daysOptions: { id: number; name: string }[] = [];
      trainingDaysData.forEach((day: { trainingDaysId: number; minNumberDays: number; maxNumberDays: number }) => {
        for (let i = day.minNumberDays; i <= day.maxNumberDays; i++) {
          daysOptions.push({ id: i, name: `${i} ימים` });
        }
      });
      setTrainingDaysOptions(daysOptions);

      setTrainingDurationOptions(trainingDurationData.map((duration: { trainingDurationId: number; timeTrainingDuration: number }) => ({
        id: duration.trainingDurationId,
        name: `${duration.timeTrainingDuration} דקות`,
      })));
    } catch (error: any) { 
      console.error("Original error object from API:", error); 
      console.error("Error response data:", error.response?.data); 
      setApiError(formatApiError(error)); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
    setIsLoading(true);
    setApiError(null); 
    setShowSuccessModal(false); 

    const formData = {
      idNumber: data.idnumber,
      traineeName: data.traineeName,
      age: Number(data.age),
      traineeWeight: Number(data.traineeWeight),
      traineeHeight: Number(data.traineeHeight),
      gender: Number(data.gender),
      phone: data.phone,
      email: data.email,
      password: data.password,
      trainingDays: Number(data.trainingDays),
      trainingDuration: Number(data.trainingDuration),
      goalId: Number(data.goalId),
      fitnessLevelId: Number(data.fitnessLevelId),
    };

    try {
      console.log('Data sent to API:', formData); 
      await authApi.register(formData);
      setIsLoading(false); // עצור את הטעינה לאחר שהנתונים נשמרו בהצלחה
      setShowSuccessModal(true); 
    } catch (error: any) { 
      console.error('Error submitting data:', error);
      console.error('Data sent to API:', formData);
      setApiError(formatApiError(error)); 
      setIsLoading(false); // עצור את הטעינה גם במקרה של שגיאה
    }
  };

  // פונקציה שתופעל בלחיצה על כפתור האישור במודאל
  const handleSuccessModalConfirm = () => {
    setShowSuccessModal(false); // סגור את המודאל
    navigate('/login', { state: { registrationSuccessMessage: 'המתאמן נרשם בהצלחה!' } }); // נווט לדף ההתחברות
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-3xl mx-auto">
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
            הרשמה למערכת האימונים
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            אנא מלא את הפרטים הבאים כדי ליצור חשבון חדש
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="תעודת זהות"
                  fullWidth
                  {...register('idnumber', { required: 'שדה חובה' })}
                  error={errors.idnumber?.message}
                />
                <Input
                  label="שם מלא"
                  fullWidth
                  {...register('traineeName', { required: 'שדה חובה' })}
                  error={errors.traineeName?.message}
                />
                <Input
                  label="גיל"
                  type="number"
                  fullWidth
                  {...register('age', {
                    required: 'שדה חובה',
                    min: { value: 16, message: 'גיל מינימלי הוא 16' },
                    max: { value: 120, message: 'גיל לא תקין' }
                  })}
                  error={errors.age?.message}
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
                <Select
                  label="מין"
                  options={[
                    { id: 1, name: 'זכר' },
                    { id: 2, name: 'נקבה' }
                  ]}
                  fullWidth
                  {...register('gender', { required: 'יש לבחור מין' })}
                  onChange={(e) => {
                    const value = e; 
                    register('gender').onChange({ target: { value } });
                  }}
                  error={errors.gender?.message}
                />
              </div>

              <div className="space-y-4">
                <Input
                  label="טלפון"
                  type="tel"
                  fullWidth
                  {...register('phone', {
                    required: 'שדה חובה',
                    pattern: {
                      value: /^0\d{8,9}$/,
                      message: 'מספר טלפון לא תקין',
                    },
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
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'כתובת דוא״ל לא תקינה',
                    },
                  })}
                  error={errors.email?.message}
                />
                <Input
                  label="סיסמה"
                  type="password"
                  fullWidth
                  {...register('password', {
                    required: 'שדה חובה',
                    minLength: { value: 6, message: 'סיסמה חייבת להיות לפחות 6 תווים' },
                  })}
                  error={errors.password?.message}
                />
                <Select
                  label="רמת כושר"
                  options={fitnessLevels}
                  fullWidth
                  {...register('fitnessLevelId', { required: 'יש לבחור רמה' })}
                  onChange={(e) => {
                    const value = e; 
                    register('fitnessLevelId').onChange({ target: { value } });
                  }}
                  error={errors.fitnessLevelId?.message}
                />

                <Select
                  label="ימי אימון בשבוע"
                  options={trainingDaysOptions}
                  fullWidth
                  {...register('trainingDays', { required: 'יש לבחור ימי אימון' })}
                  onChange={(e) => {
                    const value = e; 
                    register('trainingDays').onChange({ target: { value } });
                  }}
                  error={errors.trainingDays?.message}
                />
                <Select
                  label="משך זמן אימון"
                  options={trainingDurationOptions}
                  fullWidth
                  {...register('trainingDuration', { required: 'יש לבחור משך זמן' })}
                  onChange={(e) => {
                    const value = e; 
                    register('trainingDuration').onChange({ target: { value } });
                  }}
                  error={errors.trainingDuration?.message}
                />
                <Select
                  label="מטרה"
                  options={goalOptions}
                  fullWidth
                  {...register('goalId', { required: 'יש לבחור מטרה' })}
                  onChange={(e) => {
                    const value = e; 
                    register('goalId').onChange({ target: { value } });
                  }}
                  error={errors.goalId?.message}
                />
              </div>
            </div>

            {apiError && (
              <div className="bg-red-50 p-3 rounded text-red-700 text-sm">
                {apiError}
              </div>
            )}

            <div className="flex justify-center">
              <Button
                type="submit"
                size="lg"
                isLoading={isLoading}
                icon={<Save className="h-5 w-5" />}
                // נטרל את הכפתור בזמן טעינה או כשהמודאל מוצג
                disabled={isLoading || showSuccessModal} 
              >
                {isLoading ? 'שומר נתונים...' : 'שמור והירשם'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* **חדש: מודאל הצלחה** */}
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">הרשמה בוצעה בהצלחה!</h3>
              <p className="text-gray-600 mb-6">
                המתאמן נרשם למערכת בהצלחה. כעת תוכל להתחבר.
              </p>
              <Button 
                onClick={handleSuccessModalConfirm} 
                size="lg" 
                fullWidth
              >
                אישור
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterPage;