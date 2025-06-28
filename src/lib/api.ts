
import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: 'https://localhost:7187/api', // Update with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

import { TrainingPlan, MultiplePlansResponseItem, ActiveTrainingPlanResponse, ExercisePlan } from '../types'; // ייבא את ה-Type המעודכן
import { Trainee, PathResult, NextExerciseResponse,SchedulerInitRequest } from '../types'; // וודאי שייבאת את ה-types הרלוונטיים

// Base API configuration (ללא שינוי)


export const formatApiError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    // זהו אובייקט שגיאה של Axios
    if (error.response) {
      // השרת הגיב עם סטטוס שגיאה (לדוגמה, 400, 401, 404, 409, 500)
      const { data, status, statusText } = error.response;

      if (data) {
        // המבנה הצפוי מאובייקט ProblemDetails של ASP.NET Core:
        // { type: "...", title: "...", status: N, detail: "...", errors: { ... } }

        if (typeof data === 'string') {
          // אם ה-data הוא סטרינג פשוט (לפעמים שרתים מחזירים כך)
          return data;
        }

        if (data.errors && typeof data.errors === 'object') {
          // אם יש שגיאות ולידציה מפורטות (בדרך כלל 400 Bad Request)
          const errorMessages: string[] = [];
          for (const key in data.errors) {
            if (Object.prototype.hasOwnProperty.call(data.errors, key)) {
              const messages = data.errors[key];
              if (Array.isArray(messages)) {
                errorMessages.push(...messages);
              } else if (typeof messages === 'string') {
                errorMessages.push(messages);
              }
            }
          }
          if (errorMessages.length > 0) {
            return `Validation Errors: ${errorMessages.join(' | ')}`;
          }
        }

        if (data.title) {
          // אם יש כותרת לשגיאה (ProblemDetails)
          return data.title;
        }

        if (data.detail) {
          // אם יש פרטים נוספים על השגיאה
          return data.detail;
        }

        // גיבוי: אם data הוא אובייקט אבל אין בו שדות ספציפיים
        return `Server Error: ${status} - ${statusText || 'Unknown'}. Response: ${JSON.stringify(data)}`;
      }

      // אם אין data, אבל יש סטטוס ו-statusText
      return `Server Error: ${status} - ${statusText || 'Unknown'}.`;

    } else if (error.request) {
      // הבקשה בוצעה, אך לא התקבלה תגובה (לדוגמה, שרת לא זמין)
      return 'Network Error: No response from server. Please check your internet connection or try again later.';
    } else {
      // משהו קרה בהגדרת הבקשה שגרם לשגיאה
      return `Request Error: ${error.message}`;
    }
  } else if (error instanceof Error) {
    // שגיאת JavaScript רגילה (לדוגמה, הודעה שזרקנו ידנית)
    return error.message;
  }

  // גיבוי לכל מקרה אחר, אם ה-error אינו אובייקט Error או AxiosError
  return 'An unexpected error occurred. Please try again.';
};
// Auth endpoints
export const authApi = {
  login: async (username: string, password: string) => {
    const response = await api.post('/Trainee/Login', { username, password });
    return response.data;
  },
  // register: async (userData: any) => {
  //   const response = await api.post('/Trainee', userData);
  //   return response.data;
  // },

  register: async (userData: any) => {
    try {
      // שינוי כאן:
      // 1. ה-URL השתנה ל '/Trainee/Register'
      // 2. אנו שולחים את ה-userData ישירות, שצריך להכיל את כל השדות של RegisterRequest
      const response = await api.post('/Trainee/Register', userData);
      return response.data; // ה-createdTrainee שהוחזר מהבקאנד
    } catch (error) {
      // if (axios.isAxiosError(error) && error.response) {
      //   // טיפול בשגיאות ספציפיות מהבקאנד, לדוגמה Conflict (409) או Bad Request (400)
      //   console.error('Registration error:', error.response.data);
      //   throw new Error(error.response.data || 'Registration failed'); // זרוק את הודעת השגיאה מהשרת
      // }
        if (axios.isAxiosError(error) && error.response) {
        // המבנה של error.response.data יכול להיות שונה.
        // אם השרת מחזיר object עם keys {type, title, status, errors, traceId},
        // סביר להניח שזה אובייקט ProblemDetails (שגיאת ברירת מחדל של ASP.NET Core API).
        
        // ננסה לגשת למאפיין 'title' או 'detail' או 'errors'
        const errorMessage = error.response.data.title || // אם קיים title
                             error.response.data.detail || // אם קיים detail
                             JSON.stringify(error.response.data); // כגיבוי, נמיר לסטרינג
        
        console.error('Registration error:', error.response.data);
        // זרוק אובייקט Error עם הודעת סטרינג
        throw new Error(errorMessage || 'Registration failed due to server error.'); 
}
      console.error('An unexpected error occurred during registration:', error);
      throw new Error('An unexpected error occurred during registration.');
    }
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
    //const response = await api.get<TrainingPlan>(`/TrainingPlan/active/${traineeId}`); // <-- axios יצפה ל-TrainingPlan
    const response = await api.get<ActiveTrainingPlanResponse>(`/TrainingPlan/active/${traineeId}`); // <-- axios יצפה ל-ActiveTrainingPlanResponse
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
    getTraineeActiveTrainingPlan: async (traineeId: number): Promise<ActiveTrainingPlanResponse> => {
    const response = await api.get(`/ActiveWorkout/active-plan/${traineeId}`);
    return response.data;
  },
   // נקודת קצה חדשה עבור כל האימונים הפעילים
  // getAllActiveWorkouts: async (): Promise<ActiveTrainingPlanResponse[]> => {
  //   const response = await api.get(`/ActiveWorkout/all-active-workouts`);
  //   return response.data;
  // },
  getAllActiveWorkouts: async () => {
        try {
            const response = await api.get(`/ActiveWorkout/all-active-workouts`);
            return response.data; // PathResult[]
        } catch (error) {
            console.error('Error getting all active workouts:', error);
            throw error;
        }
    },
  GetAllActiveTraineesIds: async () => {
        try {
            const response = await api.get(`/ActiveWorkout/all-trainees`);
            return response.data; // trainee[]
        } catch (error) {
            console.error('Error getting all active workouts:', error);
            throw error;
        }
    },
};


export const schedulerApi = {
  initializeScheduler: async (data: SchedulerInitRequest): Promise<string> => {
      const response = await api.post<string>(`/ActiveWorkout/initialize`, data);
      return response.data; // השרת מחזיר הודעת טקסט בהצלחה
  },

  resetScheduler: async (): Promise<string> => {
      const response = await api.post<string>(`/ActiveWorkout/reset`);
      return response.data; // השרת מחזיר הודעת טקסט בהצלחה
    }
};

   

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


export const exercisePlanApi = {
    // קבלת כל תוכניות התרגיל
    getAll: async (): Promise<ExercisePlan[]> => {
        const response = await api.get('/ExercisePlan');
        return response.data;
    },

    // קבלת תוכנית תרגיל לפי מזהה (ExercisePlanId)
    getById: async (id: number): Promise<ExercisePlan> => {
        const response = await api.get(`/ExercisePlan/${id}`);
        return response.data;
    },

    // יצירת תוכנית תרגיל חדשה
    create: async (data: ExercisePlan): Promise<string> => {
        const response = await api.post('/ExercisePlan', data);
        return response.data; // השרת מחזיר הודעת הצלחה
    },

    // עדכון תוכנית תרגיל קיימת
    update: async (id: number, data: ExercisePlan): Promise<string> => {
        const response = await api.put(`/ExercisePlan/${id}`, data);
        return response.data; // השרת מחזיר הודעת הצלחה
    },

    // מחיקת תוכנית תרגיל
    delete: async (id: number): Promise<string> => {
        const response = await api.delete(`/ExercisePlan/${id}`);
        return response.data; // השרת מחזיר הודעת הצלחה
    },

    // **הערה חשובה לגבי getExercisesForPlanDay:**
    // הפונקציה הזו לא קיימת כרגע בקונטרולר ה-C# שסיפקת תחת הנתיב `/api/ExercisePlan/{planDayId}/exercises`.
    // אם אתה רוצה שהיא תעבוד, תצטרך להוסיף אותה לקונטרולר ה-C# שלך, לדוגמה כך:
    // [HttpGet("planDay/{planDayId}/exercises")]
    // public async Task<ActionResult<List<ExercisePlanDTO>>> GetExercisesForPlanDay(int planDayId) { ... }
    getExercisesForPlanDay: async (planDayId: number): Promise<ExercisePlan[]> => {
        // הנתיב הזה מבוסס על ההנחה שקיימת נקודת קצה כזו בבקר ה-C# שלך.
        // אם היא לא קיימת, קריאה זו תיכשל ב-404.
        const response = await api.get(`/ExercisePlan/planDay/${planDayId}/exercises`);
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