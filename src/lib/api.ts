// import axios from 'axios';

// // Base API configuration
// const api = axios.create({
//   baseURL: 'https://localhost:7187/api', // Update with your actual API URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Auth endpoints
// export const authApi = {
//   login: async (username: string, password: string) => {
//     const response = await api.post('/Trainee/Login', { username, password });
//     return response.data;
//   },
//   register: async (userData: any) => {
//     const response = await api.post('/Trainee', userData);
//     return response.data;
//   },
// };

// // Trainee endpoints
// export const traineeApi = {
//   getById: async (id: number) => {
//     const response = await api.get(`/Trainee/${id}`);
//     return response.data;
//   },
//   getAll: async () => {
//     const response = await api.get('/Trainee');
//     return response.data;
//   },
//   update: async (id: number, data: any) => {
//     const response = await api.put(`/Trainee/${id}`, data);
//     return response.data;
//   },
//   delete: async (id: number) => {
//     const response = await api.delete(`/Trainee/${id}`);
//     return response.data;
//   },
// };

// // Category endpoints
// export const categoryApi = {
//   getAll: async () => {
//     const response = await api.get('/Category');
//     return response.data;
//   },
//   getById: async (id: number) => {
//     const response = await api.get(`/Category/${id}`);
//     return response.data;
//   },
//   create: async (data: any) => {
//     const response = await api.post('/Category', data);
//     return response.data;
//   },
//   update: async (id: number, data: any) => {
//     const response = await api.put(`/Category/${id}`, data);
//     return response.data;
//   },
//   delete: async (id: number) => {
//     const response = await api.delete(`/Category/${id}`);
//     return response.data;
//   },
// };

// // Exercise endpoints
// export const exerciseApi = {
//   getAll: async () => {
//     const response = await api.get('/Exercise');
//     return response.data;
//   },
//   getById: async (id: number) => {
//     const response = await api.get(`/Exercise/${id}`);
//     return response.data;
//   },
//   create: async (data: any) => {
//     const response = await api.post('/Exercise', data);
//     return response.data;
//   },
//   update: async (id: number, data: any) => {
//     const response = await api.put(`/Exercise/${id}`, data);
//     return response.data;
//   },
//   delete: async (id: number) => {
//     const response = await api.delete(`/Exercise/${id}`);
//     return response.data;
//   },
//   addToCategory: async (categoryId: number, exerciseData: any) => {
//     const response = await api.post(`/Exercise/${categoryId}/category`, exerciseData);
//     return response.data;
//   },
//   getCategoryIds: async (exerciseId: number) => {
//     const response = await api.get(`/Exercise/${exerciseId}/exercise`);
//     return response.data;
//   },
// };

// // Program Exercise endpoints
// export const programExerciseApi = {
//   addProgramExercise: async (data: any) => {
//     const response = await api.post('/ProgramExercise/AddProgramExercise', data);
//     return response.data;
//   },
// };

// // Intercept requests to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;

import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: 'https://localhost:7187/api', // Update with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

import { TrainingPlan, MultiplePlansResponseItem, ActiveTrainingPlanResponse } from '../types'; // ייבא את ה-Type המעודכן
//import { RunAlgorithmRequest, StartOrCompleteExerciseRequest, Trainee, ExercisePlan, Exercise } from '../types';
import { Trainee, PathResult, NextExerciseResponse } from '../types'; // וודאי שייבאת את ה-types הרלוונטיים

// Base API configuration (ללא שינוי)

// Auth endpoints
export const authApi = {
  login: async (username: string, password: string) => {
    const response = await api.post('/Trainee/Login', { username, password });
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/Trainee', userData);
    return response.data;
  },
  // Existing methods...

  // Fetch fitness levels
  getFitnessLevels: async () => {
    const response = await api.get('/FitnessLevel'); // בדוק שהנתיב נכון ב-Backend
    return response.data;
  },

  // Fetch goal options
  getGoals: async () => {
    const response = await api.get('/Goal'); // בדוק שהנתיב נכון ב-Backend
    return response.data;
  },

  // Fetch training days options
  getTrainingDays: async () => {
    const response = await api.get('/TrainingDay'); // בדוק שהנתיב נכון ב-Backend
    return response.data;
  },

  // Fetch training durations
  getTrainingDurations: async () => {
    const response = await api.get('/TrainingDuration'); // בדוק שהנתיב נכון ב-Backend
    return response.data;
  },
};

// Trainee endpoints
export const traineeApi = {
  getById: async (id: number) => {
    const response = await api.get(`/Trainee/${id}`);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/Trainee');
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/Trainee/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/Trainee/${id}`);
    return response.data;
  },
};

// Category endpoints
export const categoryApi = {
  getAll: async () => {
    const response = await api.get('/Category');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/Category/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/Category', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/Category/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/Category/${id}`);
    return response.data;
  },
};

// Exercise endpoints
export const exerciseApi = {
  getAll: async () => {
    const response = await api.get('/Exercise');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/Exercise/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/Exercise', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/Exercise/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/Exercise/${id}`);
    return response.data;
  },
  addToCategory: async (categoryId: number, exerciseData: any) => {
    const response = await api.post(`/Exercise/${categoryId}/category`, exerciseData);
    return response.data;
  },
  getCategoryIds: async (exerciseId: number) => {
    const response = await api.get(`/Exercise/${exerciseId}/exercise`);
    return response.data;
  },
};

// Goal endpoints
export const goalApi = {
  getAll: async () => {
    const response = await api.get('/Goal');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/Goal/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/Goal', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/Goal/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/Goal/${id}`);
    return response.data;
  },
};

// Equipment endpoints
export const equipmentApi = {
  getAll: async () => {
    const response = await api.get('/Equipment');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/Equipment/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/Equipment', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/Equipment/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/Equipment/${id}`);
    return response.data;
  },
};
// Joint endpoints
export const jointApi = {
  getAll: async () => {
    const response = await api.get('/Joint');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/Joint/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/Joint', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/Joint/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/Joint/${id}`);
    return response.data;
  },
};

// Muscle endpoints
export const muscleApi = {
  getAll: async () => {
    const response = await api.get('/Muscle');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/Muscle/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/Muscle', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/Muscle/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/Muscle/${id}`);
    return response.data;
  },
};

// // SubMuscle endpoints
// export const subMuscleApi = {
//   getAll: async () => {
//     const response = await api.get('/SubMuscle');
//     return response.data;
//   },
//   getById: async (id: number) => {
//     const response = await api.get(`/SubMuscle/${id}`);
//     return response.data;
//   },
//   create: async (data: any) => {
//     const response = await api.post('/SubMuscle', data);
//     return response.data;
//   },
//   update: async (id: number, data: any) => {
//     const response = await api.put(`/SubMuscle/${id}`, data);
//     return response.data;
//   },
//   delete: async (id: number) => {
//     const response = await api.delete(`/SubMuscle/${id}`);
//     return response.data;
//   },
// };

// // TrainingPlan endpoints
// export const trainingPlanApi = {
//   getActivePlans: async (traineeId: number) => {
//     const response = await api.get(`/TrainingPlan/active/${traineeId}`);
//     return response.data;
//   },

//   getHistoryPlans: async (traineeId: number) => {
//     const response = await api.get(`/TrainingPlan/history/${traineeId}`);
//     return response.data;
//   },
//   // תוכל להוסיף בהמשך עוד פעולות שקשורות ל-TrainingPlan
// };

// Program Exercise endpoints
export const programExerciseApi = {
  addProgramExercise: async (data: any) => {
    const response = await api.post('/ProgramExercise/AddProgramExercise', data);
    return response.data;
  },
};

// MuscleType endpoints
export const muscleTypeApi = {
  getAll: async () => {
    const response = await api.get('/MuscleType');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/MuscleType/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/MuscleType', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/MuscleType/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/MuscleType/${id}`);
    return response.data;
  },
};

// // Joint endpoints
// export const jointApi = {
//   getAll: async () => {
//     const response = await api.get('/Joint');
//     return response.data;
//   },
//   getById: async (id: number) => {
//     const response = await api.get(`/Joint/${id}`);
//     return response.data;
//   },
//   create: async (data: any) => {
//     const response = await api.post('/Joint', data);
//     return response.data;
//   },
//   update: async (id: number, data: any) => {
//     const response = await api.put(`/Joint/${id}`, data);
//     return response.data;
//   },
//   delete: async (id: number) => {
//     const response = await api.delete(`/Joint/${id}`);
//     return response.data;
//   },
// };

// PlanDay endpoints
export const planDayApi = {
  getAll: async () => {
    const response = await api.get('/PlanDay');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/PlanDay/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/PlanDay', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/PlanDay/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/PlanDay/${id}`);
    return response.data;
  },
};

// TrainingDay endpoints
export const trainingDayApi = {
  getAll: async () => {
    const response = await api.get('/TrainingDay');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/TrainingDay/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/TrainingDay', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/TrainingDay/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/TrainingDay/${id}`);
    return response.data;
  },
};

// TrainingDuration endpoints
export const trainingDurationApi = {
  getAll: async () => {
    const response = await api.get('/TrainingDuration');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/TrainingDuration/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/TrainingDuration', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/TrainingDuration/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/TrainingDuration/${id}`);
    return response.data;
  },
};


// FitnessLevel endpoints
export const fitnessLevelApi = {
  getAll: async () => {
    const response = await api.get('/FitnessLevel');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/FitnessLevel/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/FitnessLevel', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/FitnessLevel/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/FitnessLevel/${id}`);
    return response.data;
  },
};

// Size endpoints
export const sizeApi = {
  getAll: async () => {
    const response = await api.get('/Size');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/Size/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/Size', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/Size/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/Size/${id}`);
    return response.data;
  },
};

// SubMuscle endpoints
export const subMuscleApi = {
  getAll: async () => {
    const response = await api.get('/SubMuscle');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/SubMuscle/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/SubMuscle', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/SubMuscle/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/SubMuscle/${id}`);
    return response.data;
  },
};


// TrainingPlan endpoints
export const trainingPlanApi = {
  getAll: async () => {
    const response = await api.get('/TrainingPlan');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/TrainingPlan/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/TrainingPlan', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/TrainingPlan/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/TrainingPlan/${id}`);
    return response.data;
  },
  // getActivePlans: async (traineeId: number) => {
  //   const response = await api.get(`/TrainingPlan/active/${traineeId}`);
  //   return response.data;
  // },
  // getHistoryPlans: async (traineeId: number) => {
  //   const response = await api.get(`/TrainingPlan/history/${traineeId}`);
  //   return response.data;
  // },
  //  getActivePlans: async (traineeId: number): Promise<SingleTrainingPlanResponse> => {
  //   const response = await api.get<SingleTrainingPlanResponse>(`/TrainingPlan/active/${traineeId}`);
  //   return response.data;
  // },
  getActivePlans: async (traineeId: number): Promise<ActiveTrainingPlanResponse> => { // <-- כאן משתמשים ב-ActiveTrainingPlanResponse
    const response = await api.get<TrainingPlan>(`/TrainingPlan/active/${traineeId}`); // <-- axios יצפה ל-TrainingPlan
    // אם ה-Backend מחזיר 404 במקרה של "לא נמצא", ה-catch בלוק יטפל בזה.
    // אם ה-Backend מחזיר 200 OK עם null, אז response.data יהיה null.
    return response.data;
  },
  getHistoryPlans: async (traineeId: number): Promise<MultiplePlansResponseItem[]> => {
    const response = await api.get<MultiplePlansResponseItem[]>(`/TrainingPlan/history/${traineeId}`);
    return response.data;
  },
};


export const activeWorkoutApi = {
  // קריאה להתחלת אימון
  startWorkout: async (requestBody: { Trainee: number; planday: number; StartTime: string }): Promise<PathResult> => {
     try {
      const response = await api.post(`/ActiveWorkout/start-workout`, requestBody);
      return response.data; // "Workout started for trainee ..."
    } catch (error) {
      console.error('Error starting workout:', error);
      throw error;
    }
  },

  // קריאה להתחלת תרגיל ספציפי
  startExercise: async (traineeId: number, exerciseId: number, startTime: Date): Promise<boolean> => {
      try {
      const response = await api.post(`/ActiveWorkout/start-exercise`, { traineeId, exerciseId, startTime: startTime.toISOString() });
      return response.data; // true או false
    } catch (error) {
      console.error('Error starting exercise:', error);
      throw error;
    }
  },

  // קריאה לסיום תרגיל ספציפי
  completeExercise: async (traineeId: number, exerciseId: number, endTime: Date): Promise<boolean> => {
    try {
      // חשוב: לבדוק אם ה-backend מצפה ל-StartTime כשזה בעצם EndTime
      const response = await api.post(`/ActiveWorkout/complete-exercise`,  { traineeId, exerciseId, startTime: endTime.toISOString() } );
      return response.data; // true או false
    } catch (error) {
      console.error('Error completing exercise:', error);
      throw error;
    }
  },
  

  // קריאה לקבלת סטטוס אימון מעודכן
  getUpdatedWorkoutPlan: async (traineeId: number): Promise<PathResult> => {
    const response = await api.get(`/ActiveWorkout/GetUpdatedWorkoutPlan/${traineeId}`);
    return response.data;
  },

  // קריאה לקבלת התרגיל הבא באימון
  getNextExerciseInWorkout: async (traineeId: number): Promise<NextExerciseResponse> => {
    const response = await api.get(`/ActiveWorkout/GetNextExerciseInWorkout/${traineeId}`);
    return response.data;
  },

  // פונקציה להבאת פרטי מתאמן, אם היא לא קיימת כבר
  getTraineeById: async (traineeId: number): Promise<Trainee> => {
    const response = await api.get(`/Trainee/${traineeId}`); // התאם את הנתיב אם שונה
    return response.data;
  },
};

// export const activeWorkoutApi = {
//   // פונקציה להתחלת אימון
//   // startWorkout: async (request: RunAlgorithmRequest): Promise<string> => { // ה-API מחזיר הודעת Ok
//   //   try {
//   //     const response = await api.post(`/ActiveWorkout/start-workout`, request);
//   //     return response.data; // "Workout started for trainee ..."
//   //   } catch (error) {
//   //     console.error('Error starting workout:', error);
//   //     throw error;
//   //   }
//   // },

//   // פונקציה להתחלת תרגיל
//   // startExercise: async (request: StartOrCompleteExerciseRequest): Promise<boolean> => {
//   //   try {
//   //     const response = await api.post(`/ActiveWorkout/start-exercise`, request);
//   //     return response.data; // true או false
//   //   } catch (error) {
//   //     console.error('Error starting exercise:', error);
//   //     throw error;
//   //   }
//   // },

//   // פונקציה לסיום תרגיל
//   // completeExercise: async (request: StartOrCompleteExerciseRequest): Promise<boolean> => {
//   //   try {
//   //     // חשוב: לבדוק אם ה-backend מצפה ל-StartTime כשזה בעצם EndTime
//   //     const response = await api.post(`/ActiveWorkout/complete-exercise`, request);
//   //     return response.data; // true או false
//   //   } catch (error) {
//   //     console.error('Error completing exercise:', error);
//   //     throw error;
//   //   }
//   // },

//   // פונקציה לאתחול הסקדולר (כנראה תופעל פעם אחת כשעושים Deploy או מפעילים את השרת)
//   initializeScheduler: async (slotMinutes: number, slotCount: number): Promise<string> => {
//     try {
//       const response = await api.post(`/ActiveWorkout/initialize`, { slotMinutes, slotCount });
//       return response.data; // "Scheduler initialized successfully"
//     } catch (error) {
//       console.error('Error initializing scheduler:', error);
//       throw error;
//     }
//   },

//   // פונקציה לאחזור תרגילים עבור PlanDay (לא ראיתי נקודת קצה כזו ב-ActiveWorkoutController)
//   // כנראה תצטרך נקודת קצה ב-API אחרת, לדוגמה ExerciseController או PlanDayController.
//   // אם אין לך כזו, תצטרך ליצור אותה ב-backend.
//   // לדוגמה:
//   getExercisesForPlanDay: async (planDayId: number): Promise<ExercisePlan[]> => {
//     try {
//       // כאן אני מניח שיש לך נקודת קצה כזו ב-API אחר
//       // לדוגמה: /api/PlanDay/exercises-by-plan-day/{planDayId}
//       const response = await api.get(`/PlanDay/exercises-by-plan-day/${planDayId}`);
//       // נניח שהתגובה מכילה רשימה של ExercisePlanDTOs,
//       // וכל אחד מהם מכיל בתוכו את פרטי ה-ExerciseDTO
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching exercises for plan day ${planDayId}:`, error);
//       throw error;
//     }
//   },

//   // פונקציה לאחזור פרטי מתאמן
//   getTraineeById: async (traineeId: number): Promise<Trainee> => {
//     try {
//       // כאן אני מניח שיש לך נקודת קצה כזו ב-API אחר, לדוגמה TraineeController
//       const response = await api.get(`/Trainee/${traineeId}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching trainee ${traineeId}:`, error);
//       throw error;
//     }
//   },

//    // פונקציה חדשה לאחזור תוכנית האימון המעודכנת
//     getUpdatedWorkoutPlan: async (traineeId: number): Promise<WorkoutPlanResult> => {
//         try {
//             const response = await api.get<WorkoutPlanResult>(`/trainee/${traineeId}/updated-workout-plan`);
//             return response.data;
//         } catch (error) {
//             console.error("Error fetching updated workout plan:", error);
//             throw error;
//         }
//     },

// };


   

// DeviceMuscleEdge endpoints

export const deviceMuscleEdgeApi = {
  getAll: async () => {
    const response = await api.get('/DeviceMuscleEdge');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/DeviceMuscleEdge/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/DeviceMuscleEdge', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/DeviceMuscleEdge/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/DeviceMuscleEdge/${id}`);
    return response.data;
  },
  getByDevice1: async (device1Id: number) => {
    const response = await api.get(`/DeviceMuscleEdge/device1/${device1Id}`);
    return response.data;
  },
  getByMuscle: async (muscleId: number) => {
    const response = await api.get(`/DeviceMuscleEdge/device2/${muscleId}`);
    return response.data;
  },
  generateGraphEdges: async () => {
    const response = await api.post('/DeviceMuscleEdge/generate');
    return response.data;
  },
};

// GraphEdge endpoints
export const graphEdgeApi = {
  getAll: async () => {
    const response = await api.get('/GraphEdge');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/GraphEdge/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/GraphEdge', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/GraphEdge/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/GraphEdge/${id}`);
    return response.data;
  },
  getByDevice1: async (device1Id: number) => {
    const response = await api.get(`/GraphEdge/device1/${device1Id}`);
    return response.data;
  },
  getByDevice2: async (device2Id: number) => {
    const response = await api.get(`/GraphEdge/device2/${device2Id}`);
    return response.data;
  },
  generateGraphEdges: async () => {
    const response = await api.post('/GraphEdge/generate');
    return response.data;
  },
};

// MuscleEdge endpoints
export const muscleEdgeApi = {
  getAll: async () => {
    const response = await api.get('/MuscleEdge/GetAllMuscleEdges');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/MuscleEdge/GetMuscleEdgeById/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/MuscleEdge/AddMuscleEdge', data);
    return response.data;
  },
  update: async (id: number, data: any) => {
    const response = await api.put(`/MuscleEdge/UpdateMuscleEdge/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/MuscleEdge/DeleteMuscleEdge/${id}`);
    return response.data;
  },
  getByMuscle1: async (muscle1Id: number) => {
    const response = await api.get(`/MuscleEdge/GetMuscleEdgesByMuscle1/${muscle1Id}`);
    return response.data;
  },
  getByMuscle2: async (muscle2Id: number) => {
    const response = await api.get(`/MuscleEdge/GetMuscleEdgesByMuscle2/${muscle2Id}`);
    return response.data;
  },
  generateMuscleEdges: async () => {
    const response = await api.post('/MuscleEdge/GenerateMuscleEdges');
    return response.data;
  },
};


// Intercept requests to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Intercept requests to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;