// // // // import React, { useState } from 'react';
// // // // import { Link, useNavigate } from 'react-router-dom';
// // // // import { Dumbbell, ArrowRight, Save } from 'lucide-react';
// // // // import { motion } from 'framer-motion';
// // // // import { useForm, SubmitHandler } from 'react-hook-form';
// // // // import Button from '../components/ui/Button';
// // // // import Input from '../components/ui/Input';
// // // // import Select from '../components/ui/Select';
// // // // import { authApi } from '../lib/api';
// // // // import { RegistrationData, fitnessLevels, goalOptions, trainingDaysOptions, trainingDurationOptions } from '../types';
// // // // import { formatApiError } from '../lib/utils';

// // // // const RegisterPage: React.FC = () => {
// // // //   const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>();
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [apiError, setApiError] = useState<string | null>(null);
// // // //   const navigate = useNavigate();

// // // //   const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
// // // //     setIsLoading(true);
// // // //     setApiError(null);
    
// // // //     try {
// // // //       // Set default values
// // // //       const formData = {
// // // //         ...data,
// // // //         isAdmin: false,
// // // //       };
      
// // // //       await authApi.register(formData);
// // // //       navigate('/login', { state: { registrationSuccess: true } });
// // // //     } catch (error) {
// // // //       setApiError(formatApiError(error));
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
// // // //       <div className="max-w-3xl mx-auto">
// // // //         <motion.div 
// // // //           className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10"
// // // //           initial={{ opacity: 0, y: -20 }}
// // // //           animate={{ opacity: 1, y: 0 }}
// // // //           transition={{ duration: 0.5 }}
// // // //         >
// // // //           <div className="mb-6 flex justify-center">
// // // //             <Dumbbell className="h-12 w-12 text-blue-600" />
// // // //           </div>
// // // //           <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
// // // //             הרשמה למערכת האימונים
// // // //           </h2>
// // // //           <p className="mt-2 text-center text-sm text-gray-600">
// // // //             אנא מלא את הפרטים הבאים כדי ליצור חשבון חדש
// // // //           </p>
          
// // // //           <div className="mt-6">
// // // //             <Link to="/login" className="flex items-center text-blue-600 hover:text-blue-800">
// // // //               <ArrowRight className="h-4 w-4 ml-1" />
// // // //               <span>חזרה למסך התחברות</span>
// // // //             </Link>
// // // //           </div>

// // // //           <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //               {/* Personal Details */}
// // // //               <div className="space-y-4">
// // // //                 <h3 className="text-lg font-medium text-gray-900 border-b pb-2">פרטים אישיים</h3>
                
// // // //                 <Input
// // // //                   label="תעודת זהות"
// // // //                   fullWidth
// // // //                   {...register('idnumber', { required: 'שדה חובה' })}
// // // //                   error={errors.idnumber?.message}
// // // //                 />
                
// // // //                 <Input
// // // //                   label="שם מלא"
// // // //                   fullWidth
// // // //                   {...register('traineeName', { required: 'שדה חובה' })}
// // // //                   error={errors.traineeName?.message}
// // // //                 />
                
// // // //                 <Input
// // // //                   label="גיל"
// // // //                   type="number"
// // // //                   fullWidth
// // // //                   {...register('age', { 
// // // //                     required: 'שדה חובה',
// // // //                     min: { value: 16, message: 'גיל מינימלי הוא 16' },
// // // //                     max: { value: 120, message: 'גיל לא תקין' }
// // // //                   })}
// // // //                   error={errors.age?.message}
// // // //                 />
                
// // // //                 <Input
// // // //                   label="משקל (ק״ג)"
// // // //                   type="number"
// // // //                   fullWidth
// // // //                   {...register('traineeWeight', { 
// // // //                     required: 'שדה חובה',
// // // //                     min: { value: 30, message: 'משקל לא תקין' },
// // // //                     max: { value: 300, message: 'משקל לא תקין' }
// // // //                   })}
// // // //                   error={errors.traineeWeight?.message}
// // // //                 />
                
// // // //                 <Input
// // // //                   label="גובה (ס״מ)"
// // // //                   type="number"
// // // //                   fullWidth
// // // //                   {...register('traineeHeight', { 
// // // //                     required: 'שדה חובה',
// // // //                     min: { value: 100, message: 'גובה לא תקין' },
// // // //                     max: { value: 250, message: 'גובה לא תקין' }
// // // //                   })}
// // // //                   error={errors.traineeHeight?.message}
// // // //                 />
                
// // // //                 <Select
// // // //                   label="מין"
// // // //                   options={[
// // // //                     { id: 'male', name: 'זכר' },
// // // //                     { id: 'female', name: 'נקבה' },
// // // //                     { id: 'other', name: 'אחר' }
// // // //                   ]}
// // // //                   fullWidth
// // // //                   onChange={(value) => register('gender').onChange({ target: { value } })}
// // // //                   onBlur={register('gender').onBlur}
// // // //                   name="gender"
// // // //                   error={errors.gender?.message}
// // // //                 />
// // // //               </div>
              
// // // //               {/* Contact & Training Info */}
// // // //               <div className="space-y-4">
// // // //                 <h3 className="text-lg font-medium text-gray-900 border-b pb-2">פרטי קשר ואימון</h3>
                
// // // //                 <Input
// // // //                   label="טלפון"
// // // //                   fullWidth
// // // //                   {...register('phone', { 
// // // //                     required: 'שדה חובה',
// // // //                     pattern: {
// // // //                       value: /^0\d{8,9}$/,
// // // //                       message: 'מספר טלפון לא תקין'
// // // //                     }
// // // //                   })}
// // // //                   error={errors.phone?.message}
// // // //                 />
                
// // // //                 <Input
// // // //                   label="דוא״ל"
// // // //                   type="email"
// // // //                   fullWidth
// // // //                   {...register('email', { 
// // // //                     required: 'שדה חובה',
// // // //                     pattern: {
// // // //                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// // // //                       message: 'כתובת דוא״ל לא תקינה'
// // // //                     }
// // // //                   })}
// // // //                   error={errors.email?.message}
// // // //                 />
                
// // // //                 <Input
// // // //                   label="סיסמה"
// // // //                   type="password"
// // // //                   fullWidth
// // // //                   {...register('password', { 
// // // //                     required: 'שדה חובה',
// // // //                     minLength: { value: 6, message: 'סיסמה חייבת להיות לפחות 6 תווים' }
// // // //                   })}
// // // //                   error={errors.password?.message}
// // // //                 />
                
// // // //                 <Select
// // // //                   label="רמת כושר"
// // // //                   options={fitnessLevels}
// // // //                   fullWidth
// // // //                   {...register('fitnessLevelId', { required: 'שדה חובה' })}
// // // //                   error={errors.fitnessLevelId?.message}
// // // //                 />
                
// // // //                 <Select
// // // //                   label="ימי אימון בשבוע"
// // // //                   options={trainingDaysOptions}
// // // //                   fullWidth
// // // //                   {...register('trainingDays', { required: 'שדה חובה' })}
// // // //                   error={errors.trainingDays?.message}
// // // //                 />
                
// // // //                 <Select
// // // //                   label="משך זמן אימון"
// // // //                   options={trainingDurationOptions}
// // // //                   fullWidth
// // // //                   {...register('trainingDuration', { required: 'שדה חובה' })}
// // // //                   error={errors.trainingDuration?.message}
// // // //                 />
                
// // // //                 <Select
// // // //                   label="מטרה"
// // // //                   options={goalOptions}
// // // //                   fullWidth
// // // //                   {...register('goalId', { required: 'שדה חובה' })}
// // // //                   error={errors.goalId?.message}
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             {apiError && (
// // // //               <div className="bg-red-50 p-3 rounded text-red-700 text-sm">
// // // //                 {apiError}
// // // //               </div>
// // // //             )}

// // // //             <div className="flex justify-center">
// // // //               <Button
// // // //                 type="submit"
// // // //                 size="lg"
// // // //                 isLoading={isLoading}
// // // //                 icon={<Save className="h-5 w-5" />}
// // // //               >
// // // //                 שמור והירשם
// // // //               </Button>
// // // //             </div>
// // // //           </form>
// // // //         </motion.div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default RegisterPage;

// // // import React, { useState, useEffect } from 'react';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import { Dumbbell, ArrowRight, Save } from 'lucide-react';
// // // import { motion } from 'framer-motion';
// // // import { useForm, SubmitHandler } from 'react-hook-form';
// // // import Button from '../components/ui/Button';
// // // import Input from '../components/ui/Input';
// // // import Select from '../components/ui/Select';
// // // import { authApi } from '../lib/api';
// // // import { RegistrationData } from '../types';
// // // import { formatApiError } from '../lib/utils';

// // // const RegisterPage: React.FC = () => {
// // //   const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>();
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [apiError, setApiError] = useState<string | null>(null);
// // //   const navigate = useNavigate();

// // //   // State for dynamic options
// // //   const [fitnessLevels, setFitnessLevels] = useState<{ id: number; name: string }[]>([]);
// // //   const [goalOptions, setGoalOptions] = useState<{ id: number; name: string }[]>([]);
// // //   const [trainingDaysOptions, setTrainingDaysOptions] = useState<{ id: number; name: string }[]>([]);
// // //   const [trainingDurationOptions, setTrainingDurationOptions] = useState<{ id: number; name: string }[]>([]);

// // //   // Fetch dynamic options from API
// // //   const fetchOptions = async () => {
// // //     try {
// // //       setIsLoading(true);
// // //       const [fitnessLevelsData, goalOptionsData, trainingDaysData, trainingDurationData] = await Promise.all([
// // //         authApi.getFitnessLevels(),
// // //         authApi.getGoals(),
// // //         authApi.getTrainingDays(),
// // //         authApi.getTrainingDurations(),
// // //       ]);

// // //       setFitnessLevels(fitnessLevelsData);
// // //       setGoalOptions(goalOptionsData);
// // //       setTrainingDaysOptions(trainingDaysData);
// // //       setTrainingDurationOptions(trainingDurationData);
// // //     } catch (error) {
// // //       console.error('Error fetching options:', formatApiError(error));
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchOptions();
// // //   }, []);

// // //   const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
// // //     setIsLoading(true);
// // //     setApiError(null);

// // //     try {
// // //       // Set default values
// // //       const formData = {
// // //         ...data,
// // //         isAdmin: false,
// // //       };

// // //       await authApi.register(formData);
// // //       navigate('/login', { state: { registrationSuccess: true } });
// // //     } catch (error) {
// // //       setApiError(formatApiError(error));
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
// // //       <div className="max-w-3xl mx-auto">
// // //         <motion.div
// // //           className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10"
// // //           initial={{ opacity: 0, y: -20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.5 }}
// // //         >
// // //           <div className="mb-6 flex justify-center">
// // //             <Dumbbell className="h-12 w-12 text-blue-600" />
// // //           </div>
// // //           <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
// // //             הרשמה למערכת האימונים
// // //           </h2>
// // //           <p className="mt-2 text-center text-sm text-gray-600">
// // //             אנא מלא את הפרטים הבאים כדי ליצור חשבון חדש
// // //           </p>

// // //           <div className="mt-6">
// // //             <Link to="/login" className="flex items-center text-blue-600 hover:text-blue-800">
// // //               <ArrowRight className="h-4 w-4 ml-1" />
// // //               <span>חזרה למסך התחברות</span>
// // //             </Link>
// // //           </div>

// // //           <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               {/* Personal Details */}
// // //               <div className="space-y-4">
// // //                 <h3 className="text-lg font-medium text-gray-900 border-b pb-2">פרטים אישיים</h3>

// // //                 <Input
// // //                   label="תעודת זהות"
// // //                   fullWidth
// // //                   {...register('idnumber', { required: 'שדה חובה' })}
// // //                   error={errors.idnumber?.message}
// // //                 />

// // //                 <Input
// // //                   label="שם מלא"
// // //                   fullWidth
// // //                   {...register('traineeName', { required: 'שדה חובה' })}
// // //                   error={errors.traineeName?.message}
// // //                 />

// // //                 <Input
// // //                   label="גיל"
// // //                   type="number"
// // //                   fullWidth
// // //                   {...register('age', {
// // //                     required: 'שדה חובה',
// // //                     min: { value: 16, message: 'גיל מינימלי הוא 16' },
// // //                     max: { value: 120, message: 'גיל לא תקין' }
// // //                   })}
// // //                   error={errors.age?.message}
// // //                 />

// // //                 <Input
// // //                   label="משקל (ק״ג)"
// // //                   type="number"
// // //                   fullWidth
// // //                   {...register('traineeWeight', {
// // //                     required: 'שדה חובה',
// // //                     min: { value: 30, message: 'משקל לא תקין' },
// // //                     max: { value: 300, message: 'משקל לא תקין' }
// // //                   })}
// // //                   error={errors.traineeWeight?.message}
// // //                 />

// // //                 <Input
// // //                   label="גובה (ס״מ)"
// // //                   type="number"
// // //                   fullWidth
// // //                   {...register('traineeHeight', {
// // //                     required: 'שדה חובה',
// // //                     min: { value: 100, message: 'גובה לא תקין' },
// // //                     max: { value: 250, message: 'גובה לא תקין' }
// // //                   })}
// // //                   error={errors.traineeHeight?.message}
// // //                 />

// // //                 <Select
// // //                   label="מין"
// // //                   options={[
// // //                     { id: 'male', name: 'זכר' },
// // //                     { id: 'female', name: 'נקבה' },
// // //                     { id: 'other', name: 'אחר' }
// // //                   ]}
// // //                   fullWidth
// // //                   onChange={(value) => register('gender').onChange({ target: { value } })}
// // //                   onBlur={register('gender').onBlur}
// // //                   name="gender"
// // //                   error={errors.gender?.message}
// // //                 />
// // //               </div>

// // //               {/* Contact & Training Info */}
// // //               <div className="space-y-4">
// // //                 <h3 className="text-lg font-medium text-gray-900 border-b pb-2">פרטי קשר ואימון</h3>

// // //                 <Input
// // //                   label="טלפון"
// // //                   fullWidth
// // //                   {...register('phone', {
// // //                     required: 'שדה חובה',
// // //                     pattern: {
// // //                       value: /^0\d{8,9}$/,
// // //                       message: 'מספר טלפון לא תקין'
// // //                     }
// // //                   })}
// // //                   error={errors.phone?.message}
// // //                 />

// // //                 <Input
// // //                   label="דוא״ל"
// // //                   type="email"
// // //                   fullWidth
// // //                   {...register('email', {
// // //                     required: 'שדה חובה',
// // //                     pattern: {
// // //                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// // //                       message: 'כתובת דוא״ל לא תקינה'
// // //                     }
// // //                   })}
// // //                   error={errors.email?.message}
// // //                 />

// // //                 <Input
// // //                   label="סיסמה"
// // //                   type="password"
// // //                   fullWidth
// // //                   {...register('password', {
// // //                     required: 'שדה חובה',
// // //                     minLength: { value: 6, message: 'סיסמה חייבת להיות לפחות 6 תווים' }
// // //                   })}
// // //                   error={errors.password?.message}
// // //                 />

// // //                 <Select
// // //                   label="רמת כושר"
// // //                   options={fitnessLevels}
// // //                   fullWidth
// // //                   {...register('fitnessLevelId', { required: 'שדה חובה' })}
// // //                   error={errors.fitnessLevelId?.message}
// // //                 />

// // //                 <Select
// // //                   label="ימי אימון בשבוע"
// // //                   options={trainingDaysOptions}
// // //                   fullWidth
// // //                   {...register('trainingDays', { required: 'שדה חובה' })}
// // //                   error={errors.trainingDays?.message}
// // //                 />

// // //                 <Select
// // //                   label="משך זמן אימון"
// // //                   options={trainingDurationOptions}
// // //                   fullWidth
// // //                   {...register('trainingDuration', { required: 'שדה חובה' })}
// // //                   error={errors.trainingDuration?.message}
// // //                 />

// // //                 <Select
// // //                   label="מטרה"
// // //                   options={goalOptions}
// // //                   fullWidth
// // //                   {...register('goalId', { required: 'שדה חובה' })}
// // //                   error={errors.goalId?.message}
// // //                 />
// // //               </div>
// // //             </div>

// // //             {apiError && (
// // //               <div className="bg-red-50 p-3 rounded text-red-700 text-sm">
// // //                 {apiError}
// // //               </div>
// // //             )}

// // //             <div className="flex justify-center">
// // //               <Button
// // //                 type="submit"
// // //                 size="lg"
// // //                 isLoading={isLoading}
// // //                 icon={<Save className="h-5 w-5" />}
// // //               >
// // //                 שמור והירשם
// // //               </Button>
// // //             </div>
// // //           </form>
// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RegisterPage;

// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { Dumbbell, Save } from 'lucide-react';
// // // import { motion } from 'framer-motion';
// // // import { useForm, SubmitHandler } from 'react-hook-form';
// // // import Button from '../components/ui/Button';
// // // import Input from '../components/ui/Input';
// // // import Select from '../components/ui/Select';
// // // import { authApi } from '../lib/api';
// // // import { RegistrationData } from '../types';
// // // import { formatApiError } from '../lib/utils';

// // // const RegisterPage: React.FC = () => {
// // //   const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>();
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [apiError, setApiError] = useState<string | null>(null);
// // //   const navigate = useNavigate();

// // //   // State for dynamic options
// // //   const [fitnessLevels, setFitnessLevels] = useState<{ id: number; name: string }[]>([]);
// // //   const [goalOptions, setGoalOptions] = useState<{ id: number; name: string }[]>([]);
// // //   const [trainingDaysOptions, setTrainingDaysOptions] = useState<{ id: number; name: string }[]>([]);
// // //   const [trainingDurationOptions, setTrainingDurationOptions] = useState<{ id: number; name: string }[]>([]);

// // //   // // Fetch dynamic options from API
// // //   // const fetchOptions = async () => {
// // //   //   try {
// // //   //     setIsLoading(true);
// // //   //     const [fitnessLevelsData, goalOptionsData, trainingDaysData, trainingDurationData] = await Promise.all([
// // //   //       authApi.getFitnessLevels(),
// // //   //       authApi.getGoals(),
// // //   //       authApi.getTrainingDays(),
// // //   //       authApi.getTrainingDurations(),
// // //   //     ]);

// // //   //     setFitnessLevels(fitnessLevelsData);
// // //   //     setGoalOptions(goalOptionsData);
// // //   //     setTrainingDaysOptions(trainingDaysData);
// // //   //     setTrainingDurationOptions(trainingDurationData);
// // //   //   } catch (error) {
// // //   //     setApiError(formatApiError(error));
// // //   //     console.error('Error fetching options:', error);
// // //   //   } finally {
// // //   //     setIsLoading(false);
// // //   //   }
// // //   // };

// // //   // useEffect(() => {
// // //   //   fetchOptions();
// // //   // }, []);
// // //   // Fetch dynamic options from API
// // //   const fetchOptions = async () => {
// // //     try {
// // //       setIsLoading(true);
// // //       const [fitnessLevelsData, goalsData, trainingDaysData, trainingDurationData] = await Promise.all([
// // //         authApi.getFitnessLevels(),
// // //         authApi.getGoals(), // שליפת מטרות
// // //         authApi.getTrainingDays(),
// // //         authApi.getTrainingDurations(),
// // //       ]);
  
// // //       // setFitnessLevels(fitnessLevelsData);
// // //       // setGoalOptions(goalsData.map((goal: { goalId: number; goalName: string }) => ({ id: goal.goalId, name: goal.goalName }))); // התאמת מבנה הנתונים
// // //       // setTrainingDaysOptions(trainingDaysData);
// // //       // setTrainingDurationOptions(trainingDurationData);

// // //        // התאמת מבנה הנתונים
// // //        setFitnessLevels(fitnessLevelsData.map((level: { id: number; name: string }) => ({ id: level.id, name: level.name })));
// // //        setGoalOptions(goalsData.map((goal: { goalId: number; goalName: string }) => ({ id: goal.goalId, name: goal.goalName })));
// // //        setTrainingDaysOptions(trainingDaysData.map((day: { id: number; name: string }) => ({ id: day.id, name: day.name })));
// // //        setTrainingDurationOptions(trainingDurationData.map((duration: { id: number; name: string }) => ({ id: duration.id, name: duration.name })));
 
// // //     } catch (error) {
// // //       setApiError(formatApiError(error));
// // //       console.error('Error fetching options:', error);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
// // //     setIsLoading(true);
// // //     setApiError(null);

// // //     try {
// // //       // Set default values
// // //       const formData = {
// // //         ...data,
// // //         isAdmin: false,
// // //       };

// // //       await authApi.register(formData);
// // //       navigate('/login', { state: { registrationSuccess: true } });
// // //     } catch (error) {
// // //       setApiError(formatApiError(error));
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
// // //       <div className="max-w-3xl mx-auto">
// // //         <motion.div
// // //           className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10"
// // //           initial={{ opacity: 0, y: -20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.5 }}
// // //         >
// // //           <div className="mb-6 flex justify-center">
// // //             <Dumbbell className="h-12 w-12 text-blue-600" />
// // //           </div>
// // //           <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
// // //             הרשמה למערכת האימונים
// // //           </h2>
// // //           <p className="mt-2 text-center text-sm text-gray-600">
// // //             אנא מלא את הפרטים הבאים כדי ליצור חשבון חדש
// // //           </p>

// // //           <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               {/* Personal Details */}
// // //               <div className="space-y-4">
// // //                 <Input
// // //                   label="תעודת זהות"
// // //                   fullWidth
// // //                   {...register('idnumber', { required: 'שדה חובה' })}
// // //                   error={errors.idnumber?.message}
// // //                 />

// // //                 <Input
// // //                   label="שם מלא"
// // //                   fullWidth
// // //                   {...register('traineeName', { required: 'שדה חובה' })}
// // //                   error={errors.traineeName?.message}
// // //                 />

// // //                 <Input
// // //                   label="גיל"
// // //                   type="number"
// // //                   fullWidth
// // //                   {...register('age', {
// // //                     required: 'שדה חובה',
// // //                     min: { value: 16, message: 'גיל מינימלי הוא 16' },
// // //                     max: { value: 120, message: 'גיל לא תקין' }
// // //                   })}
// // //                   error={errors.age?.message}
// // //                 />

// // //                 {/* <Select
// // //                   label="רמת כושר"
// // //                   options={fitnessLevels}
// // //                   fullWidth
// // //                   onChange={(value) => register('fitnessLevelId').onChange({ target: { value } })}
// // //                   onBlur={register('fitnessLevelId').onBlur}
// // //                   name="fitnessLevelId"
// // //                   error={errors.fitnessLevelId?.message}
// // //                 /> */}
// // //                  <Select
// // //                   label="רמת כושר"
// // //                   options={fitnessLevels}
// // //                   fullWidth
// // //                   onChange={(value) => register('fitnessLevelId').onChange({ target: { value } })}
// // //                   onBlur={register('fitnessLevelId').onBlur}
// // //                   name="fitnessLevelId"
// // //                   error={errors.fitnessLevelId?.message}
// // //                 />
// // //               </div>

// // //               <div className="space-y-4">
// // //                 <Select
// // //                   label="ימי אימון בשבוע"
// // //                   options={trainingDaysOptions}
// // //                   fullWidth
// // //                   onChange={(value) => register('trainingDays').onChange({ target: { value } })}
// // //                   onBlur={register('trainingDays').onBlur}
// // //                   name="trainingDays"
// // //                   error={errors.trainingDays?.message}
// // //                 />

// // //                 <Select
// // //                   label="משך זמן אימון"
// // //                   options={trainingDurationOptions}
// // //                   fullWidth
// // //                   onChange={(value) => register('trainingDuration').onChange({ target: { value } })}
// // //                   onBlur={register('trainingDuration').onBlur}
// // //                   name="trainingDuration"
// // //                   error={errors.trainingDuration?.message}
// // //                 />

// // //                 <Select
// // //                   label="מטרה"
// // //                   options={goalOptions}
// // //                   fullWidth
// // //                   onChange={(value) => register('goalId').onChange({ target: { value } })}
// // //                   onBlur={register('goalId').onBlur}
// // //                   name="goalId"
// // //                   error={errors.goalId?.message}
// // //                 />
// // //               </div>
// // //             </div>

// // //             {apiError && (
// // //               <div className="bg-red-50 p-3 rounded text-red-700 text-sm">
// // //                 {apiError}
// // //               </div>
// // //             )}

// // //             <div className="flex justify-center">
// // //               <Button
// // //                 type="submit"
// // //                 size="lg"
// // //                 isLoading={isLoading}
// // //                 icon={<Save className="h-5 w-5" />}
// // //               >
// // //                 שמור והירשם
// // //               </Button>
// // //             </div>
// // //           </form>
// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RegisterPage;


// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { Dumbbell, Save } from 'lucide-react';
// // // import { motion } from 'framer-motion';
// // // import { useForm, SubmitHandler } from 'react-hook-form';
// // // import Button from '../components/ui/Button';
// // // import Input from '../components/ui/Input';
// // // import Select from '../components/ui/Select';
// // // import { authApi } from '../lib/api';
// // // import { RegistrationData } from '../types';
// // // import { formatApiError } from '../lib/utils';

// // // const RegisterPage: React.FC = () => {
// // //   const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>();
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [apiError, setApiError] = useState<string | null>(null);
// // //   const navigate = useNavigate();

// // //   // State for dynamic options
// // //   const [fitnessLevels, setFitnessLevels] = useState<{ id: number; name: string }[]>([]);
// // //   const [goalOptions, setGoalOptions] = useState<{ id: number; name: string }[]>([]);
// // //   const [trainingDaysOptions, setTrainingDaysOptions] = useState<{ id: number; name: string }[]>([]);
// // //   const [trainingDurationOptions, setTrainingDurationOptions] = useState<{ id: number; name: string }[]>([]);

// // //   // Fetch dynamic options from API
// // //   const fetchOptions = async () => {
// // //     try {
// // //       setIsLoading(true);
// // //       const [fitnessLevelsData, goalsData, trainingDaysData, trainingDurationData] = await Promise.all([
// // //         authApi.getFitnessLevels(),
// // //         authApi.getGoals(), // שליפת מטרות
// // //         authApi.getTrainingDays(),
// // //         authApi.getTrainingDurations(),
// // //       ]);

// // //       // התאמת מבנה הנתונים
// // //       setFitnessLevels(fitnessLevelsData.map((level: { id: number; name: string }) => ({ id: level.id, name: level.name })));
// // //       setGoalOptions(goalsData.map((goal: { goalId: number; goalName: string }) => ({ id: goal.goalId, name: goal.goalName })));
// // //       setTrainingDaysOptions(trainingDaysData.map((day: { id: number; name: string }) => ({ id: day.id, name: day.name })));
// // //       setTrainingDurationOptions(trainingDurationData.map((duration: { id: number; name: string }) => ({ id: duration.id, name: duration.name })));
// // //     } catch (error) {
// // //       setApiError(formatApiError(error));
// // //       console.error('Error fetching options:', error);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchOptions();
// // //   }, []);

// // //   const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
// // //     setIsLoading(true);
// // //     setApiError(null);

// // //     try {
// // //       const formData = {
// // //         ...data,
// // //         isAdmin: false,
// // //       };

// // //       await authApi.register(formData);
// // //       navigate('/login', { state: { registrationSuccess: true } });
// // //     } catch (error) {
// // //       setApiError(formatApiError(error));
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
// // //       <div className="max-w-3xl mx-auto">
// // //         <motion.div
// // //           className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10"
// // //           initial={{ opacity: 0, y: -20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.5 }}
// // //         >
// // //           <div className="mb-6 flex justify-center">
// // //             <Dumbbell className="h-12 w-12 text-blue-600" />
// // //           </div>
// // //           <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
// // //             הרשמה למערכת האימונים
// // //           </h2>
// // //           <p className="mt-2 text-center text-sm text-gray-600">
// // //             אנא מלא את הפרטים הבאים כדי ליצור חשבון חדש
// // //           </p>

// // //           <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               <div className="space-y-4">
// // //                 <Input
// // //                   label="תעודת זהות"
// // //                   fullWidth
// // //                   {...register('idnumber', { required: 'שדה חובה' })}
// // //                   error={errors.idnumber?.message}
// // //                 />
// // //                 <Input
// // //                   label="שם מלא"
// // //                   fullWidth
// // //                   {...register('traineeName', { required: 'שדה חובה' })}
// // //                   error={errors.traineeName?.message}
// // //                 />
// // //                 <Input
// // //                   label="גיל"
// // //                   type="number"
// // //                   fullWidth
// // //                   {...register('age', {
// // //                     required: 'שדה חובה',
// // //                     min: { value: 16, message: 'גיל מינימלי הוא 16' },
// // //                     max: { value: 120, message: 'גיל לא תקין' }
// // //                   })}
// // //                   error={errors.age?.message}
// // //                 />
// // //                 <Select
// // //                   label="רמת כושר"
// // //                   options={fitnessLevels}
// // //                   fullWidth
// // //                   onChange={(value) => register('fitnessLevelId').onChange({ target: { value } })}
// // //                   onBlur={register('fitnessLevelId').onBlur}
// // //                   name="fitnessLevelId"
// // //                   error={errors.fitnessLevelId?.message}
// // //                 />
// // //               </div>

// // //               <div className="space-y-4">
// // //                 <Select
// // //                   label="ימי אימון בשבוע"
// // //                   options={trainingDaysOptions}
// // //                   fullWidth
// // //                   onChange={(value) => register('trainingDays').onChange({ target: { value } })}
// // //                   onBlur={register('trainingDays').onBlur}
// // //                   name="trainingDays"
// // //                   error={errors.trainingDays?.message}
// // //                 />
// // //                 <Select
// // //                   label="משך זמן אימון"
// // //                   options={trainingDurationOptions}
// // //                   fullWidth
// // //                   onChange={(value) => register('trainingDuration').onChange({ target: { value } })}
// // //                   onBlur={register('trainingDuration').onBlur}
// // //                   name="trainingDuration"
// // //                   error={errors.trainingDuration?.message}
// // //                 />
// // //                 <Select
// // //                   label="מטרה"
// // //                   options={goalOptions}
// // //                   fullWidth
// // //                   onChange={(value) => register('goalId').onChange({ target: { value } })}
// // //                   onBlur={register('goalId').onBlur}
// // //                   name="goalId"
// // //                   error={errors.goalId?.message}
// // //                 />
// // //               </div>
// // //             </div>

// // //             {apiError && (
// // //               <div className="bg-red-50 p-3 rounded text-red-700 text-sm">
// // //                 {apiError}
// // //               </div>
// // //             )}

// // //             <div className="flex justify-center">
// // //               <Button
// // //                 type="submit"
// // //                 size="lg"
// // //                 isLoading={isLoading}
// // //                 icon={<Save className="h-5 w-5" />}
// // //               >
// // //                 שמור והירשם
// // //               </Button>
// // //             </div>
// // //           </form>
// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RegisterPage;


// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { Dumbbell, Save } from 'lucide-react';
// // // import { motion } from 'framer-motion';
// // // import { useForm, SubmitHandler } from 'react-hook-form';
// // // import Button from '../components/ui/Button';
// // // import Input from '../components/ui/Input';
// // // import Select from '../components/ui/Select';
// // // import { authApi } from '../lib/api';
// // // import { RegistrationData } from '../types';
// // // import { formatApiError } from '../lib/utils';

// // // const RegisterPage: React.FC = () => {
// // //   const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>();
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [apiError, setApiError] = useState<string | null>(null);
// // //   const navigate = useNavigate();

// // //   // State for dynamic options
// // //   const [fitnessLevels, setFitnessLevels] = useState<{ id: number; name: string }[]>([]);
// // //   const [goalOptions, setGoalOptions] = useState<{ id: number; name: string }[]>([]);
// // //   const [trainingDaysOptions, setTrainingDaysOptions] = useState<{ id: number; name: string }[]>([]);
// // //   const [trainingDurationOptions, setTrainingDurationOptions] = useState<{ id: number; name: string }[]>([]);

// // //   // Fetch dynamic options from API
// // //   const fetchOptions = async () => {
// // //     try {
// // //       setIsLoading(true);

// // //       const [fitnessLevelsData, goalsData, trainingDaysData, trainingDurationData] = await Promise.all([
// // //         authApi.getFitnessLevels(),
// // //         authApi.getGoals(),
// // //         authApi.getTrainingDays(),
// // //         authApi.getTrainingDurations(),
// // //       ]);

// // //       // Map the data to the expected structure
// // //       setFitnessLevels(fitnessLevelsData.map((level: { fitnessLevelId: number; fitnessLevelName: string }) => ({
// // //         id: level.fitnessLevelId,
// // //         name: level.fitnessLevelName,
// // //       })));

// // //       setGoalOptions(goalsData.map((goal: { goalId: number; goalName: string }) => ({
// // //         id: goal.goalId,
// // //         name: goal.goalName,
// // //       })));

// // //       setTrainingDaysOptions(trainingDaysData.map((day: { trainingDaysId: number; minNumberDays: number; maxNumberDays: number }) => ({
// // //         id: day.trainingDaysId,
// // //         name: `${day.minNumberDays} - ${day.maxNumberDays} ימים בשבוע`,
// // //       })));

// // //       setTrainingDurationOptions(trainingDurationData.map((duration: { trainingDurationId: number; timeTrainingDuration: number }) => ({
// // //         id: duration.trainingDurationId,
// // //         name: `${duration.timeTrainingDuration} דקות`,
// // //       })));
// // //     } catch (error) {
// // //       setApiError(formatApiError(error));
// // //       console.error('Error fetching options:', error);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchOptions();
// // //   }, []);

// // //   const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
// // //     setIsLoading(true);
// // //     setApiError(null);

// // //     try {
// // //       const formData = {
// // //         ...data,
// // //         isAdmin: false,
// // //       };

// // //       await authApi.register(formData);
// // //       navigate('/login', { state: { registrationSuccess: true } });
// // //     } catch (error) {
// // //       setApiError(formatApiError(error));
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
// // //       <div className="max-w-3xl mx-auto">
// // //         <motion.div
// // //           className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10"
// // //           initial={{ opacity: 0, y: -20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.5 }}
// // //         >
// // //           <div className="mb-6 flex justify-center">
// // //             <Dumbbell className="h-12 w-12 text-blue-600" />
// // //           </div>
// // //           <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
// // //             הרשמה למערכת האימונים
// // //           </h2>
// // //           <p className="mt-2 text-center text-sm text-gray-600">
// // //             אנא מלא את הפרטים הבאים כדי ליצור חשבון חדש
// // //           </p>

// // //           <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               <div className="space-y-4">
// // //                 <Input
// // //                   label="תעודת זהות"
// // //                   fullWidth
// // //                   {...register('idnumber', { required: 'שדה חובה' })}
// // //                   error={errors.idnumber?.message}
// // //                 />
// // //                 <Input
// // //                   label="שם מלא"
// // //                   fullWidth
// // //                   {...register('traineeName', { required: 'שדה חובה' })}
// // //                   error={errors.traineeName?.message}
// // //                 />
// // //                 <Input
// // //                   label="גיל"
// // //                   type="number"
// // //                   fullWidth
// // //                   {...register('age', {
// // //                     required: 'שדה חובה',
// // //                     min: { value: 16, message: 'גיל מינימלי הוא 16' },
// // //                     max: { value: 120, message: 'גיל לא תקין' }
// // //                   })}
// // //                   error={errors.age?.message}
// // //                 />
// // //                 <Select
// // //                   label="רמת כושר"
// // //                   options={fitnessLevels}
// // //                   fullWidth
// // //                   onChange={(value) => register('fitnessLevelId').onChange({ target: { value } })}
// // //                   onBlur={register('fitnessLevelId').onBlur}
// // //                   name="fitnessLevelId"
// // //                   error={errors.fitnessLevelId?.message}
// // //                 />
// // //               </div>

// // //               <div className="space-y-4">
// // //                 <Select
// // //                   label="ימי אימון בשבוע"
// // //                   options={trainingDaysOptions}
// // //                   fullWidth
// // //                   onChange={(value) => register('trainingDays').onChange({ target: { value } })}
// // //                   onBlur={register('trainingDays').onBlur}
// // //                   name="trainingDays"
// // //                   error={errors.trainingDays?.message}
// // //                 />
// // //                 <Select
// // //                   label="משך זמן אימון"
// // //                   options={trainingDurationOptions}
// // //                   fullWidth
// // //                   onChange={(value) => register('trainingDuration').onChange({ target: { value } })}
// // //                   onBlur={register('trainingDuration').onBlur}
// // //                   name="trainingDuration"
// // //                   error={errors.trainingDuration?.message}
// // //                 />
// // //                 <Select
// // //                   label="מטרה"
// // //                   options={goalOptions}
// // //                   fullWidth
// // //                   onChange={(value) => register('goalId').onChange({ target: { value } })}
// // //                   onBlur={register('goalId').onBlur}
// // //                   name="goalId"
// // //                   error={errors.goalId?.message}
// // //                 />
// // //               </div>
// // //             </div>

// // //             {apiError && (
// // //               <div className="bg-red-50 p-3 rounded text-red-700 text-sm">
// // //                 {apiError}
// // //               </div>
// // //             )}

// // //             <div className="flex justify-center">
// // //               <Button
// // //                 type="submit"
// // //                 size="lg"
// // //                 isLoading={isLoading}
// // //                 icon={<Save className="h-5 w-5" />}
// // //               >
// // //                 שמור והירשם
// // //               </Button>
// // //             </div>
// // //           </form>
// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RegisterPage;


// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { Dumbbell, Save } from 'lucide-react';
// // // import { motion } from 'framer-motion';
// // // import { useForm, SubmitHandler } from 'react-hook-form';
// // // import Button from '../components/ui/Button';
// // // import Input from '../components/ui/Input';
// // // import Select from '../components/ui/Select';
// // // import { authApi } from '../lib/api';
// // // import { RegistrationData } from '../types';
// // // import { formatApiError } from '../lib/utils';

// // // const RegisterPage: React.FC = () => {
// // //   const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>();
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [apiError, setApiError] = useState<string | null>(null);
// // //   const navigate = useNavigate();

// // //   // State for dynamic options
// // //   const [fitnessLevels, setFitnessLevels] = useState<{ id: number; name: string }[]>([]);
// // //   const [goalOptions, setGoalOptions] = useState<{ id: number; name: string }[]>([]);
// // //   const [trainingDaysOptions, setTrainingDaysOptions] = useState<{ id: number; name: string }[]>([]);
// // //   const [trainingDurationOptions, setTrainingDurationOptions] = useState<{ id: number; name: string }[]>([]);

// // //   // Fetch dynamic options from API
// // //   const fetchOptions = async () => {
// // //     try {
// // //       setIsLoading(true);

// // //       const [fitnessLevelsData, goalsData, trainingDaysData, trainingDurationData] = await Promise.all([
// // //         authApi.getFitnessLevels(),
// // //         authApi.getGoals(),
// // //         authApi.getTrainingDays(),
// // //         authApi.getTrainingDurations(),
// // //       ]);

// // //       // Map the data to the expected structure
// // //       setFitnessLevels(fitnessLevelsData.map((level: { fitnessLevelId: number; fitnessLevelName: string }) => ({
// // //         id: level.fitnessLevelId,
// // //         name: level.fitnessLevelName,
// // //       })));

// // //       setGoalOptions(goalsData.map((goal: { goalId: number; goalName: string }) => ({
// // //         id: goal.goalId,
// // //         name: goal.goalName,
// // //       })));

// // //       // Generate individual days for "TrainingDays"
// // //       const daysOptions: { id: number; name: string }[] = [];
// // //       trainingDaysData.forEach((day: { trainingDaysId: number; minNumberDays: number; maxNumberDays: number }) => {
// // //         for (let i = day.minNumberDays; i <= day.maxNumberDays; i++) {
// // //           daysOptions.push({ id: i, name: `${i} ימים` });
// // //         }
// // //       });
// // //       setTrainingDaysOptions(daysOptions);

// // //       setTrainingDurationOptions(trainingDurationData.map((duration: { trainingDurationId: number; timeTrainingDuration: number }) => ({
// // //         id: duration.trainingDurationId,
// // //         name: `${duration.timeTrainingDuration} דקות`,
// // //       })));
// // //     } catch (error) {
// // //       setApiError(formatApiError(error));
// // //       console.error('Error fetching options:', error);
// // //       setApiError((error as any).response?.data || 'שגיאה באחזור נתונים מהשרת');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchOptions();
// // //   }, []);

// // //   const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
// // //     setIsLoading(true);
// // //     setApiError(null);

// // //     try {
// // //       const formData = {
// // //         ...data,
// // //         isAdmin: false,
// // //       };

// // //       await authApi.register(formData);
// // //       navigate('/login', { state: { registrationSuccess: true } });
// // //     } catch (error) {
// // //       setApiError(formatApiError(error));
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
// // //       <div className="max-w-3xl mx-auto">
// // //         <motion.div
// // //           className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10"
// // //           initial={{ opacity: 0, y: -20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.5 }}
// // //         >
// // //           <div className="mb-6 flex justify-center">
// // //             <Dumbbell className="h-12 w-12 text-blue-600" />
// // //           </div>
// // //           <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
// // //             הרשמה למערכת האימונים
// // //           </h2>
// // //           <p className="mt-2 text-center text-sm text-gray-600">
// // //             אנא מלא את הפרטים הבאים כדי ליצור חשבון חדש
// // //           </p>

// // //           <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //               <div className="space-y-4">
// // //                 <Input
// // //                   label="תעודת זהות"
// // //                   fullWidth
// // //                   {...register('idnumber', { required: 'שדה חובה' })}
// // //                   error={errors.idnumber?.message}
// // //                 />
// // //                 <Input
// // //                   label="שם מלא"
// // //                   fullWidth
// // //                   {...register('traineeName', { required: 'שדה חובה' })}
// // //                   error={errors.traineeName?.message}
// // //                 />
// // //                 <Input
// // //                   label="גיל"
// // //                   type="number"
// // //                   fullWidth
// // //                   {...register('age', {
// // //                     required: 'שדה חובה',
// // //                     min: { value: 16, message: 'גיל מינימלי הוא 16' },
// // //                     max: { value: 120, message: 'גיל לא תקין' }
// // //                   })}
// // //                   error={errors.age?.message}
// // //                 />
// // //                 <Select
// // //                   label="רמת כושר"
// // //                   options={fitnessLevels}
// // //                   fullWidth
// // //                   onChange={(value) => register('fitnessLevelId').onChange({ target: { value } })}
// // //                   onBlur={register('fitnessLevelId').onBlur}
// // //                   name="fitnessLevelId"
// // //                   error={errors.fitnessLevelId?.message}
// // //                 />
// // //               </div>

// // //               <div className="space-y-4">
// // //                 <Select
// // //                   label="ימי אימון בשבוע"
// // //                   options={trainingDaysOptions}
// // //                   fullWidth
// // //                   onChange={(value) => register('trainingDays').onChange({ target: { value } })}
// // //                   onBlur={register('trainingDays').onBlur}
// // //                   name="trainingDays"
// // //                   error={errors.trainingDays?.message}
// // //                 />
// // //                 <Select
// // //                   label="משך זמן אימון"
// // //                   options={trainingDurationOptions}
// // //                   fullWidth
// // //                   onChange={(value) => register('trainingDuration').onChange({ target: { value } })}
// // //                   onBlur={register('trainingDuration').onBlur}
// // //                   name="trainingDuration"
// // //                   error={errors.trainingDuration?.message}
// // //                 />
// // //                 <Select
// // //                   label="מטרה"
// // //                   options={goalOptions}
// // //                   fullWidth
// // //                   onChange={(value) => register('goalId').onChange({ target: { value } })}
// // //                   onBlur={register('goalId').onBlur}
// // //                   name="goalId"
// // //                   error={errors.goalId?.message}
// // //                 />
// // //               </div>
// // //             </div>

// // //             {apiError && (
// // //               <div className="bg-red-50 p-3 rounded text-red-700 text-sm">
// // //                 {apiError}
// // //               </div>
// // //             )}

// // //             <div className="flex justify-center">
// // //               <Button
// // //                 type="submit"
// // //                 size="lg"
// // //                 isLoading={isLoading}
// // //                 icon={<Save className="h-5 w-5" />}
// // //               >
// // //                 שמור והירשם
// // //               </Button>
// // //             </div>
// // //           </form>
// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RegisterPage;


// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { Dumbbell, Save } from 'lucide-react';
// // import { motion } from 'framer-motion';
// // import { useForm, SubmitHandler } from 'react-hook-form';
// // import Button from '../components/ui/Button';
// // import Input from '../components/ui/Input';
// // import Select from '../components/ui/Select';
// // import { authApi } from '../lib/api';
// // import { RegistrationData } from '../types';
// // import { formatApiError } from '../lib/utils';

// // const RegisterPage: React.FC = () => {
// //   const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>();
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [apiError, setApiError] = useState<string | null>(null);
// //   const navigate = useNavigate();

// //   // State for dynamic options
// //   const [fitnessLevels, setFitnessLevels] = useState<{ id: number; name: string }[]>([]);
// //   const [goalOptions, setGoalOptions] = useState<{ id: number; name: string }[]>([]);
// //   const [trainingDaysOptions, setTrainingDaysOptions] = useState<{ id: number; name: string }[]>([]);
// //   const [trainingDurationOptions, setTrainingDurationOptions] = useState<{ id: number; name: string }[]>([]);

// //   // Fetch dynamic options from API
// //   const fetchOptions = async () => {
// //     try {
// //       setIsLoading(true);

// //       const [fitnessLevelsData, goalsData, trainingDaysData, trainingDurationData] = await Promise.all([
// //         authApi.getFitnessLevels(),
// //         authApi.getGoals(),
// //         authApi.getTrainingDays(),
// //         authApi.getTrainingDurations(),
// //       ]);

// //       // Map the data to the expected structure
// //       setFitnessLevels(fitnessLevelsData.map((level: { fitnessLevelId: number; fitnessLevelName: string }) => ({
// //         id: level.fitnessLevelId,
// //         name: level.fitnessLevelName,
// //       })));

// //       setGoalOptions(goalsData.map((goal: { goalId: number; goalName: string }) => ({
// //         id: goal.goalId,
// //         name: goal.goalName,
// //       })));

// //       // Generate individual days for "TrainingDays"
// //       const daysOptions: { id: number; name: string }[] = [];
// //       trainingDaysData.forEach((day: { trainingDaysId: number; minNumberDays: number; maxNumberDays: number }) => {
// //         for (let i = day.minNumberDays; i <= day.maxNumberDays; i++) {
// //           daysOptions.push({ id: i, name: `${i} ימים` });
// //         }
// //       });
// //       setTrainingDaysOptions(daysOptions);

// //       setTrainingDurationOptions(trainingDurationData.map((duration: { trainingDurationId: number; timeTrainingDuration: number }) => ({
// //         id: duration.trainingDurationId,
// //         name: `${duration.timeTrainingDuration} דקות`,
// //       })));
// //     } catch (error) {
// //       setApiError(formatApiError(error));
// //       console.error('Error fetching options:', error);
// //       setApiError((error as any).response?.data || 'שגיאה באחזור נתונים מהשרת');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOptions();
// //   }, []);

// //   // const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
// //   //   setIsLoading(true);
// //   //   setApiError(null);

// //   //   try {
// //   //     const formData = {
// //   //       traineeId: 0, // Default value for traineeId
// //   //       idnumber: data.idnumber,
// //   //       traineeName: data.traineeName,
// //   //       age: data.age,
// //   //       traineeWeight: data.traineeWeight,
// //   //       traineeHeight: data.traineeHeight,
// //   //       gender: data.gender,
// //   //       phone: data.phone,
// //   //       email: data.email,
// //   //       isAdmin: false, // Default to false
// //   //       password: data.password,
// //   //       trainingDays: data.trainingDays,
// //   //       trainingDuration: data.trainingDuration,
// //   //       goalId: data.goalId,
// //   //       loginDateTime: new Date().toISOString(), // Current date and time
// //   //       fitnessLevelId: data.fitnessLevelId,
// //   //     };

// //   //     await authApi.register(formData);
// //   //     navigate('/login', { state: { registrationSuccess: true } });
// //   //   } catch (error) {
// //   //     setApiError(formatApiError(error));
// //   //   } finally {
// //   //     setIsLoading(false);
// //   //   }
// //   // };
// //   // const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
// //   //   setIsLoading(true);
// //   //   setApiError(null);
  
// //   //   const formData = {
// //   //     traineeId: 0, // Default value for traineeId
// //   //     idnumber: data.idnumber,
// //   //     traineeName: data.traineeName,
// //   //     age: data.age,
// //   //     traineeWeight: data.traineeWeight,
// //   //     traineeHeight: data.traineeHeight,
// //   //     gender: data.gender,
// //   //     phone: data.phone,
// //   //     email: data.email,
// //   //     isAdmin: false, // Default to false
// //   //     password: data.password,
// //   //     trainingDays: data.trainingDays,
// //   //     trainingDuration: data.trainingDuration,
// //   //     goalId: data.goalId,
// //   //     loginDateTime: new Date().toISOString(), // Current date and time
// //   //     fitnessLevelId: data.fitnessLevelId,
// //   //   };
  
// //   //   try {
// //   //     await authApi.register(formData);
// //   //     navigate('/login', { state: { registrationSuccess: true } });
// //   //   } catch (error) {
// //   //     // Print the formData to the console in case of an error
// //   //     console.error('Error submitting data:', error);
// //   //     console.error('Data sent to API:', formData);
  
// //   //     setApiError(formatApiError(error));
// //   //   } finally {
// //   //     setIsLoading(false);
// //   //   }
// //   // };

// //   // const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
// //   //   setIsLoading(true);
// //   //   setApiError(null);
  
// //   //   const formData = {
// //   //     traineeId: 0, // Default value for traineeId
// //   //     idnumber: data.idnumber,
// //   //     traineeName: data.traineeName,
// //   //     age: Number(data.age), // Ensure this is a number
// //   //     traineeWeight: Number(data.traineeWeight), // Ensure this is a number
// //   //     traineeHeight: Number(data.traineeHeight), // Ensure this is a number
// //   //     gender: Number(data.gender) || 0, // Default to 0 if not selected
// //   //     phone: data.phone,
// //   //     email: data.email,
// //   //     isAdmin: false, // Default to false
// //   //     password: data.password,
// //   //     trainingDays: Number(data.trainingDays) || 0, // Default to 0 if not selected
// //   //     trainingDuration: Number(data.trainingDuration) || 0, // Default to 0 if not selected
// //   //     goalId: Number(data.goalId) || 0, // Default to 0 if not selected
// //   //     loginDateTime: new Date().toISOString(), // Current date and time
// //   //     fitnessLevelId: Number(data.fitnessLevelId) || 0, // Default to 0 if not selected
// //   //   };
  
// //   //   try {
// //   //     console.log('Data sent to API:', formData); // Debugging log
// //   //     await authApi.register(formData);
// //   //     navigate('/login', { state: { registrationSuccess: true } });
// //   //   } catch (error) {
// //   //     console.error('Error submitting data:', error);
// //   //     console.error('Data sent to API:', formData);
  
// //   //     setApiError(formatApiError(error));
// //   //   } finally {
// //   //     setIsLoading(false);
// //   //   }
// //   // };
// //   const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
// //     setIsLoading(true);
// //     setApiError(null);
  
// //     const formData = {
// //       // traineeId: 0, // Default value for traineeId
// //       // idnumber: data.idnumber,
// //       // traineeName: data.traineeName,
// //       // age: Number(data.age), // Ensure this is a number
// //       // traineeWeight: Number(data.traineeWeight), // Ensure this is a number
// //       // traineeHeight: Number(data.traineeHeight), // Ensure this is a number
// //       // gender: Number(data.gender), // Send the gender ID (1 for male, 2 for female)
// //       // phone: data.phone,
// //       // email: data.email,
// //       // isAdmin: false, // Default to false
// //       // password: data.password,
// //       // trainingDays: Number(data.trainingDays), // Send the number of training days
// //       // trainingDuration: Number(data.trainingDuration), // Send the training duration
// //       // goalId: Number(data.goalId), // Send the selected goal ID
// //       // loginDateTime: new Date().toISOString(), // Current date and time
// //       // fitnessLevelId: Number(data.fitnessLevelId), // Send the selected fitness level ID
     
// //       // הסרנו traineeId, isAdmin, loginDateTime כי הם מנוהלים בשרת
// //       // או לא נדרשים בקלט ההרשמה

// //       // שדות חובה ש-RegisterRequest מצפה להם:
// //       idNumber: data.idnumber, // השם ב-C# הוא IdNumber, אבל ב-JS נהוג camelCase idNumber
// //       traineeName: data.traineeName,
// //       age: Number(data.age),
// //       traineeWeight: Number(data.traineeWeight),
// //       traineeHeight: Number(data.traineeHeight),
// //       gender: Number(data.gender),
// //       phone: data.phone,
// //       email: data.email,
// //       password: data.password,

// //       // שדות לתוכנית האימון הדיפולטיבית:
// //       trainingDays: Number(data.trainingDays),
// //       trainingDuration: Number(data.trainingDuration),
// //       goalId: Number(data.goalId),
// //       fitnessLevelId: Number(data.fitnessLevelId),
// //     };
  
// //     try {
// //       console.log('Data sent to API:', formData); // Debugging log
// //       await authApi.register(formData);
// //       navigate('/login', { state: { registrationSuccess: true } });
// //     } catch (error) {
// //       console.error('Error submitting data:', error);
// //       console.error('Data sent to API:', formData);
  
// //       setApiError(formatApiError(error));
// //     } finally {
// //       setIsLoading(false);
// //     }
    
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
// //       <div className="max-w-3xl mx-auto">
// //         <motion.div
// //           className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10"
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.5 }}
// //         >
// //           <div className="mb-6 flex justify-center">
// //             <Dumbbell className="h-12 w-12 text-blue-600" />
// //           </div>
// //           <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
// //             הרשמה למערכת האימונים
// //           </h2>
// //           <p className="mt-2 text-center text-sm text-gray-600">
// //             אנא מלא את הפרטים הבאים כדי ליצור חשבון חדש
// //           </p>

// //           <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div className="space-y-4">
// //                 <Input
// //                   label="תעודת זהות"
// //                   fullWidth
// //                   {...register('idnumber', { required: 'שדה חובה' })}
// //                   error={errors.idnumber?.message}
// //                 />
// //                 <Input
// //                   label="שם מלא"
// //                   fullWidth
// //                   {...register('traineeName', { required: 'שדה חובה' })}
// //                   error={errors.traineeName?.message}
// //                 />
// //                 <Input
// //                   label="גיל"
// //                   type="number"
// //                   fullWidth
// //                   {...register('age', {
// //                     required: 'שדה חובה',
// //                     min: { value: 16, message: 'גיל מינימלי הוא 16' },
// //                     max: { value: 120, message: 'גיל לא תקין' }
// //                   })}
// //                   error={errors.age?.message}
// //                 />
// //                 <Input
// //                   label="משקל (ק״ג)"
// //                   type="number"
// //                   fullWidth
// //                   {...register('traineeWeight', {
// //                     required: 'שדה חובה',
// //                     min: { value: 30, message: 'משקל לא תקין' },
// //                     max: { value: 300, message: 'משקל לא תקין' }
// //                   })}
// //                   error={errors.traineeWeight?.message}
// //                 />
// //                 <Input
// //                   label="גובה (ס״מ)"
// //                   type="number"
// //                   fullWidth
// //                   {...register('traineeHeight', {
// //                     required: 'שדה חובה',
// //                     min: { value: 100, message: 'גובה לא תקין' },
// //                     max: { value: 250, message: 'גובה לא תקין' }
// //                   })}
// //                   error={errors.traineeHeight?.message}
// //                 />
// //                 <Select
// //                   label="מין"
// //                   options={[
// //                     { id: 1, name: 'זכר' },
// //                     { id: 2, name: 'נקבה' }
// //                   ]}
// //                   fullWidth
// //                   // onChange={(value) => register('gender').onChange({ target: { value } })}
// //                   // onBlur={register('gender').onBlur}
// //                   // name="gender"
// //                   {...register('gender', { required: 'יש לבחור מין' })} // Register the field with react-hook-form
// //                   onChange={(e) => {
// //                     const value = e //.target.value; // Extract the value from the event
// //                     register('gender').onChange({ target: { value } }); // Update react-hook-form with the selected value
// //                   }}
// //                   error={errors.gender?.message}
// //                 />
// //               </div>

// //               <div className="space-y-4">
// //                 <Input
// //                   label="טלפון"
// //                   type="tel"
// //                   fullWidth
// //                   {...register('phone', {
// //                     required: 'שדה חובה',
// //                     pattern: {
// //                       value: /^0\d{8,9}$/,
// //                       message: 'מספר טלפון לא תקין',
// //                     },
// //                   })}
// //                   error={errors.phone?.message}
// //                 />
// //                 <Input
// //                   label="דוא״ל"
// //                   type="email"
// //                   fullWidth
// //                   {...register('email', {
// //                     required: 'שדה חובה',
// //                     pattern: {
// //                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
// //                       message: 'כתובת דוא״ל לא תקינה',
// //                     },
// //                   })}
// //                   error={errors.email?.message}
// //                 />
// //                 <Input
// //                   label="סיסמה"
// //                   type="password"
// //                   fullWidth
// //                   {...register('password', {
// //                     required: 'שדה חובה',
// //                     minLength: { value: 6, message: 'סיסמה חייבת להיות לפחות 6 תווים' },
// //                   })}
// //                   error={errors.password?.message}
// //                 />
// //                 <Select
// //                   label="רמת כושר"
// //                   options={fitnessLevels}
// //                   fullWidth
// //                   // onChange={(value) => register('fitnessLevelId').onChange({ target: { value } })}
// //                   // onBlur={register('fitnessLevelId').onBlur}
// //                   // name="fitnessLevelId"
// //                   {...register('fitnessLevelId', { required: 'יש לבחור רמה' })} // Register the field with react-hook-form
// //                   onChange={(e) => {
// //                     const value = e //.target.value; // Extract the value from the event
// //                     register('fitnessLevelId').onChange({ target: { value } }); // Update react-hook-form with the selected value
// //                   }}
// //                   error={errors.fitnessLevelId?.message}
// //                 />
                
// //                 <Select
// //                   label="ימי אימון בשבוע"
// //                   options={trainingDaysOptions}
// //                   fullWidth
// //                   // onChange={(value) => register('trainingDays').onChange({ target: { value } })}
// //                   // onBlur={register('trainingDays').onBlur}
// //                   // name="trainingDays"
// //                   {...register('trainingDays', { required: 'יש לבחור ימי אימון' })} // Register the field with react-hook-form
// //                   onChange={(e) => {
// //                     const value = e //.target.value; // Extract the value from the event
// //                     register('trainingDays').onChange({ target: { value } }); // Update react-hook-form with the selected value
// //                   }}
// //                   error={errors.trainingDays?.message}
// //                 />
// //                 <Select
// //                   label="משך זמן אימון"
// //                   options={trainingDurationOptions}
// //                   fullWidth
// //                   // onChange={(value) => register('trainingDuration').onChange({ target: { value } })}
// //                   // onBlur={register('trainingDuration').onBlur}
// //                   // name="trainingDuration"
// //                   {...register('trainingDuration', { required: 'יש לבחור משך זמן' })}
// //                   onChange={(e) => {
// //                     const value = e //.target.value; // Extract the value from the event
// //                     register('trainingDuration').onChange({ target: { value } }); // Update react-hook-form with the selected value
// //                   }}
// //                   error={errors.trainingDuration?.message}
// //                 />
// //                 {/* <Select
// //                   label="מטרה"
// //                   options={goalOptions}
// //                   fullWidth
// //                   onChange={(value) => register('goalId').onChange({ target: { value } })}
// //                   onBlur={register('goalId').onBlur}
// //                   name="goalId"
// //                   error={errors.goalId?.message}
// //                 /> */}
// //                 <Select
// //                   label="מטרה"
// //                   options={goalOptions} // Options contain { id, name } pairs
// //                   fullWidth
// //                   {...register('goalId', { required: 'יש לבחור מטרה' })} // Register the field with react-hook-form
// //                   onChange={(e) => {
// //                     const value = e //.target.value; // Extract the value from the event
// //                     register('goalId').onChange({ target: { value } }); // Update react-hook-form with the selected value
// //                   }}
// //                   error={errors.goalId?.message}
// //                 />
// //               </div>
// //             </div>

// //             {apiError && (
// //               <div className="bg-red-50 p-3 rounded text-red-700 text-sm">
// //                 {apiError}
// //               </div>
// //             )}

// //             <div className="flex justify-center">
// //               <Button
// //                 type="submit"
// //                 size="lg"
// //                 isLoading={isLoading}
// //                 icon={<Save className="h-5 w-5" />}
// //               >
// //                 שמור והירשם
// //               </Button>
// //             </div>
// //           </form>
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RegisterPage;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Dumbbell, Save } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import Button from '../components/ui/Button';
// import Input from '../components/ui/Input';
// import Select from '../components/ui/Select';
// import { authApi } from '../lib/api';
// import { RegistrationData } from '../types';
// import { formatApiError } from '../lib/api'; // ודאי שזו פונקציה שמחזירה סטרינג!

// const RegisterPage: React.FC = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<RegistrationData>();
//   const [isLoading, setIsLoading] = useState(false);
//   const [apiError, setApiError] = useState<string | null>(null);
//   const navigate = useNavigate();
//   // State for dynamic options
//   const [fitnessLevels, setFitnessLevels] = useState<{ id: number; name: string }[]>([]);
//   const [goalOptions, setGoalOptions] = useState<{ id: number; name: string }[]>([]);
//   const [trainingDaysOptions, setTrainingDaysOptions] = useState<{ id: number; name: string }[]>([]);
//   const [trainingDurationOptions, setTrainingDurationOptions] = useState<{ id: number; name: string }[]>([]);

//   // Fetch dynamic options from API
//   const fetchOptions = async () => {
//     try {
//       setIsLoading(true);
//       setApiError(null); // נקה שגיאות קודמות לפני בקשה חדשה

//       const [fitnessLevelsData, goalsData, trainingDaysData, trainingDurationData] = await Promise.all([
//         authApi.getFitnessLevels(),
//         authApi.getGoals(),
//         authApi.getTrainingDays(),
//         authApi.getTrainingDurations(),
//       ]);

//       // Map the data to the expected structure
//       setFitnessLevels(fitnessLevelsData.map((level: { fitnessLevelId: number; fitnessLevelName: string }) => ({
//         id: level.fitnessLevelId,
//         name: level.fitnessLevelName,
//       })));

//       setGoalOptions(goalsData.map((goal: { goalId: number; goalName: string }) => ({
//         id: goal.goalId,
//         name: goal.goalName,
//       })));

//       // Generate individual days for "TrainingDays"
//       const daysOptions: { id: number; name: string }[] = [];
//       trainingDaysData.forEach((day: { trainingDaysId: number; minNumberDays: number; maxNumberDays: number }) => {
//         for (let i = day.minNumberDays; i <= day.maxNumberDays; i++) {
//           daysOptions.push({ id: i, name: `${i} ימים` });
//         }
//       });
//       setTrainingDaysOptions(daysOptions);

//       setTrainingDurationOptions(trainingDurationData.map((duration: { trainingDurationId: number; timeTrainingDuration: number }) => ({
//         id: duration.trainingDurationId,
//         name: `${duration.timeTrainingDuration} דקות`,
//       })));
//     } catch (error: any) { // קלוט את השגיאה כ-any
//       // **התיקון העיקרי כאן:** ודאי ש-formatApiError מחזירה סטרינג.
//       // אם היא לא, או אם ה-error עצמו הוא אובייקט שלא מטופל כראוי,
//       // זה המקום לטפל בו כדי ש-apiError יהיה סטרינג.
//      // setApiError(formatApiError(error)); // ודאי שזה מחזיר סטרינג
//       console.error("Original error object from API:", error); // הדפיסי את האובייקט המלא
//       console.error("Error response data:", error.response?.data); // הדפיסי את ה-data הספציפי
//       setApiError(formatApiError(error)); // רק לאחר ההדפסות
//      // console.error('Error fetching options:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOptions();
//   }, []);

//   const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
//     setIsLoading(true);
//     setApiError(null); // נקה שגיאות קודמות

//     const formData = {
//       // הסרנו traineeId, isAdmin, loginDateTime כי הם מנוהלים בשרת
//       // או לא נדרשים בקלט ההרשמה
//       // ודא ש-data.idnumber תואם ל-IdNumber בשרת (camelCase -> PascalCase)
//       idNumber: data.idnumber, // ה-`IdNumber` ב-C# DTO, ב-JS נשלח כ-`idNumber`
//       traineeName: data.traineeName,
//       age: Number(data.age), // ודא שזה נשלח כמספר
//       traineeWeight: Number(data.traineeWeight), // ודא שזה נשלח כמספר
//       traineeHeight: Number(data.traineeHeight), // ודא שזה נשלח כמספר
//       gender: Number(data.gender), // שלח את ה-ID (1 לזכר, 2 לנקבה)
//       phone: data.phone,
//       email: data.email,
//       password: data.password,

//       // שדות לתוכנית האימון הדיפולטיבית:
//       trainingDays: Number(data.trainingDays), // שלח את מספר ימי האימון
//       trainingDuration: Number(data.trainingDuration), // שלח את משך האימון
//       goalId: Number(data.goalId), // שלח את ה-ID של המטרה הנבחרת
//       fitnessLevelId: Number(data.fitnessLevelId), // שלח את ה-ID של רמת הכושר הנבחרת
//     };

//     try {
//       console.log('Data sent to API:', formData); // Debugging log
//       await authApi.register(formData);
//       //הוספת הודעת הצלחה
//       console.log('Registration successful, navigating to login page');
//       navigate('/login', { state: { registrationSuccess: true } });
//     } catch (error: any) { // קלוט את השגיאה כ-any
//       console.error('Error submitting data:', error);
//       console.error('Data sent to API:', formData);

//       // **התיקון העיקרי כאן:**
//       // ודא ש-formatApiError(error) מחזירה סטרינג.
//       // אם יש ספק, אתה יכול לבדוק את מבנה ה-error.response.data
//       // ולחלץ ממנו את הודעת השגיאה באופן ידני, כמו בדוגמאות קודמות.
//       setApiError(formatApiError(error)); // ודא שזה מחזיר סטרינג!
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
//       <div className="max-w-3xl mx-auto">
//         <motion.div
//           className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="mb-6 flex justify-center">
//             <Dumbbell className="h-12 w-12 text-blue-600" />
//           </div>
//           <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
//             הרשמה למערכת האימונים
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             אנא מלא את הפרטים הבאים כדי ליצור חשבון חדש
//           </p>

//           <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <Input
//                   label="תעודת זהות"
//                   fullWidth
//                   {...register('idnumber', { required: 'שדה חובה' })}
//                   error={errors.idnumber?.message}
//                 />
//                 <Input
//                   label="שם מלא"
//                   fullWidth
//                   {...register('traineeName', { required: 'שדה חובה' })}
//                   error={errors.traineeName?.message}
//                 />
//                 <Input
//                   label="גיל"
//                   type="number"
//                   fullWidth
//                   {...register('age', {
//                     required: 'שדה חובה',
//                     min: { value: 16, message: 'גיל מינימלי הוא 16' },
//                     max: { value: 120, message: 'גיל לא תקין' }
//                   })}
//                   error={errors.age?.message}
//                 />
//                 <Input
//                   label="משקל (ק״ג)"
//                   type="number"
//                   fullWidth
//                   {...register('traineeWeight', {
//                     required: 'שדה חובה',
//                     min: { value: 30, message: 'משקל לא תקין' },
//                     max: { value: 300, message: 'משקל לא תקין' }
//                   })}
//                   error={errors.traineeWeight?.message}
//                 />
//                 <Input
//                   label="גובה (ס״מ)"
//                   type="number"
//                   fullWidth
//                   {...register('traineeHeight', {
//                     required: 'שדה חובה',
//                     min: { value: 100, message: 'גובה לא תקין' },
//                     max: { value: 250, message: 'גובה לא תקין' }
//                   })}
//                   error={errors.traineeHeight?.message}
//                 />
//                 <Select
//                   label="מין"
//                   options={[
//                     { id: 1, name: 'זכר' },
//                     { id: 2, name: 'נקבה' }
//                   ]}
//                   fullWidth
//                   {...register('gender', { required: 'יש לבחור מין' })}
//                   onChange={(e) => {
//                     const value = e; // Select component returns the value directly, not an event
//                     register('gender').onChange({ target: { value } });
//                   }}
//                   error={errors.gender?.message}
//                 />
//               </div>

//               <div className="space-y-4">
//                 <Input
//                   label="טלפון"
//                   type="tel"
//                   fullWidth
//                   {...register('phone', {
//                     required: 'שדה חובה',
//                     pattern: {
//                       value: /^0\d{8,9}$/,
//                       message: 'מספר טלפון לא תקין',
//                     },
//                   })}
//                   error={errors.phone?.message}
//                 />
//                 <Input
//                   label="דוא״ל"
//                   type="email"
//                   fullWidth
//                   {...register('email', {
//                     required: 'שדה חובה',
//                     pattern: {
//                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message: 'כתובת דוא״ל לא תקינה',
//                     },
//                   })}
//                   error={errors.email?.message}
//                 />
//                 <Input
//                   label="סיסמה"
//                   type="password"
//                   fullWidth
//                   {...register('password', {
//                     required: 'שדה חובה',
//                     minLength: { value: 6, message: 'סיסמה חייבת להיות לפחות 6 תווים' },
//                   })}
//                   error={errors.password?.message}
//                 />
//                 <Select
//                   label="רמת כושר"
//                   options={fitnessLevels}
//                   fullWidth
//                   {...register('fitnessLevelId', { required: 'יש לבחור רמה' })}
//                   onChange={(e) => {
//                     const value = e; // Select component returns the value directly
//                     register('fitnessLevelId').onChange({ target: { value } });
//                   }}
//                   error={errors.fitnessLevelId?.message}
//                 />
                
//                 <Select
//                   label="ימי אימון בשבוע"
//                   options={trainingDaysOptions}
//                   fullWidth
//                   {...register('trainingDays', { required: 'יש לבחור ימי אימון' })}
//                   onChange={(e) => {
//                     const value = e; // Select component returns the value directly
//                     register('trainingDays').onChange({ target: { value } });
//                   }}
//                   error={errors.trainingDays?.message}
//                 />
//                 <Select
//                   label="משך זמן אימון"
//                   options={trainingDurationOptions}
//                   fullWidth
//                   {...register('trainingDuration', { required: 'יש לבחור משך זמן' })}
//                   onChange={(e) => {
//                     const value = e; // Select component returns the value directly
//                     register('trainingDuration').onChange({ target: { value } });
//                   }}
//                   error={errors.trainingDuration?.message}
//                 />
//                 <Select
//                   label="מטרה"
//                   options={goalOptions}
//                   fullWidth
//                   {...register('goalId', { required: 'יש לבחור מטרה' })}
//                   onChange={(e) => {
//                     const value = e; // Select component returns the value directly
//                     register('goalId').onChange({ target: { value } });
//                   }}
//                   error={errors.goalId?.message}
//                 />
//               </div>
//             </div>

//             {apiError && (
//               <div className="bg-red-50 p-3 rounded text-red-700 text-sm">
//                 {apiError}
//               </div>
//             )}

//             <div className="flex justify-center">
//               <Button
//                 type="submit"
//                 size="lg"
//                 isLoading={isLoading}
//                 icon={<Save className="h-5 w-5" />}
//               >
//                 שמור והירשם
//               </Button>
//             </div>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

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
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false); // **חדש: מצב לשליטה במודאל הצלחה**

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
    setShowSuccessModal(false); // וודא שהמודאל סגור לפני ניסיון הרשמה חדש

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
      setShowSuccessModal(true); // **הצג את המודאל לאחר הצלחה**
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