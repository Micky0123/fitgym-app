// User types
export interface User {
  traineeId: number;
  traineeName: string;
  isAdmin: boolean;
  email?: string;
}

// Authentication types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  password: number; // This appears to be the traineeId based on the controller
  traineeName: string;
  isAdmin: boolean;
}

// Registration form data
export interface RegistrationData {
  idnumber: string;
  traineeName: string;
  age: number;
  traineeWeight: number;
  traineeHeight: number;
  gender: string;
  phone: string;
  email: string;
  password: string;
  fitnessLevelId: number;
  trainingDays: number;
  goalId: number;
  trainingDuration: number;
  isAdmin?: boolean;
}

// Category type
export interface Category {
  categoryId: number;
  categoryName: string;
}

// Exercise type
export interface Exercise {
  exerciseId: number;
  exerciseName: string;
  categoryIds?: number[];
  muscleIds: number[]; // רשימת מזהי השרירים
}

// Goal type
export interface Goal {
  goalId: number;
  goalName: string;
}

// Goal type
export interface Muscle { 
  muscleId: number;
  muscleName: string;
}

// Goal type
export interface Equipment { 
  equipmentId: number;
  equipmentName: string;
}


export interface FitnessLevel {
  fitnessLevelId: number;
  fitnessLevelName: string;
}


export interface TrainingDuration {
  TrainingDurationId: number;
  TimeTrainingDuration: number;
}
// export interface Trainee {
//   TraineeId: number;
//   name: string;
//   // תוכל להוסיף תכונות נוספות כמו גיל, אימייל וכו'
// }

export interface TraineeShort {
  traineeId: number;
  traineeName: string;
}

export interface TraineeDetails extends TraineeShort {
  idnumber?: string;
  age?: number;
  traineeWeight?: number;
  traineeHeight?: number;
  gender?: number;
  phone?: string;
  email?: string;
  isAdmin?: boolean;
  loginDateTime?: string;
}

export type EGender = 1 | 2; // 1=זכר, 2=נקבה

export interface Trainee {
  traineeId: number;
  idnumber?: string;
  traineeName?: string;
  age?: number;
  traineeWeight?: number;
  traineeHeight?: number;
  gender: EGender; // 1=זכר, 2=נקבה
  phone?: string;
  email?: string;
  isAdmin: boolean;
  password: string;
  loginDateTime?: string; // DateTime as ISO string
  //traineesExerciseStatus?: Record<number, TraineeExerciseStatus>;
}

// Program Exercise request
export interface ProgramExerciseRequest {
  daysInWeek: number;
  goal: number;
  level: number;
  time: number;
}

// Workout program
export interface WorkoutProgram {
  programId: number;
  programName: string;
  exercises: ProgramExercise[];
  goalId: number;
  level: number;
  duration: number;
  daysPerWeek: number;
}

// Program exercise
export interface ProgramExercise {
  programExerciseId: number;
  exerciseId: number;
  exerciseName: string;
  sets: number;
  reps: number;
  weight?: number;
  restTime: number;
  order: number;
}

// Workout session status
export interface WorkoutStatus {
  currentExerciseIndex: number;
  completedExercises: number[];
  startTime: Date;
  isCompleted: boolean;
}

// // types.ts
// export interface TrainingPlan {
//   trainingPlanId: number;
//   traineeId: number;
//   goalId: number;
//   trainingDays: number;
//   trainingDurationId: number;
//   fitnessLevelId: number;
//   startDate: string; // Date as ISO string
//   endDate: string;   // Date as ISO string
//   isActive: boolean;
//   // אפשר להוסיף כאן goalName/levelName/DurationName אם ה-API מחזיר אותם
// }


// Interfaces for API Data
// interface FitnessLevel {
//   FitnessLevelId: number;
//   FitnessLevelName: string;
//   Description?: string;
// }

export interface Joint {
  JointId: number;
  JointName?: string;
}

export interface MuscleType {
  MuscleTypeId: number;
  MuscleTypeName: string;
}

// Muscle group size
export interface Size {
  muscleGroupId: number;
  muscleGroupName: string;
}

// Training plan data
export interface TrainingPlan {
  trainingPlanId: number;
  traineeId: number;
  goalId: number;
  trainingDays: number;
  trainingDurationId: number;
  fitnessLevelId: number;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  isActive: boolean;
  planDays: PlanDay[]; // וודא שזה קיים כאן!
}

export type ActiveTrainingPlanResponse = TrainingPlan | null;

// Training duration
export interface TrainingDuration {
  trainingDurationId: number;
  timeTrainingDuration: number;
}

// Training days options
export interface TrainingDayOption {
  trainingDaysId: number;
  minNumberDays: number;
  maxNumberDays: number;
}

// Sub-muscle
export interface SubMuscle {
  subMuscleId: number;
  subMuscleName: string;
  muscleId: number;
  muscle: Muscle;
}

// Plan day within training plan
export interface PlanDay {
  planDayId: number;
  trainingPlanId: number;
  programName: string;
  dayOrder: number;
  creationDate: string; // ISO date string
  isDefaultProgram: boolean;
  parentProgramId?: number;
  isHistoricalProgram: boolean;
}

// Device-Muscle Edge
export interface DeviceMuscleEdge {
  edgeId: number;
  deviceId: number;
  muscleId: number;
}

// Graph Edge
export interface GraphEdge {
  id: number;
  device1Id: number;
  device2Id: number;
}

// Muscle Edge
export interface MuscleEdge {
  muscleEdgeId: number;
  muscleId1: number;
  muscleId2: number;
}


// טיפוס חדש עבור תגובת ה-API עבור רשימת תוכניות (לדוגמה, היסטוריה)
export interface MultiplePlansResponseItem {
  trainingPlan: TrainingPlan;
  planDays: PlanDay[];
}
export interface SingleTrainingPlanResponse {
  trainingPlan: TrainingPlan | null; // תוכנית האימון עצמה
  planDays: PlanDay[]; // רשימת ימי האימון הקשורים לתוכנית זו
}

export interface ExercisePlan{
  exercisePlanId: number;
  planDayId: number;
  exerciseId: number;
  orderInDay: number;
  sets: number;
  reps: number;
  weight?: number; // אופציונלי
  restTime?: number; // אופציונלי
  // ... שדות נוספים מ-ExercisePlanDTO מה-backend
  // נצטרך גם את פרטי התרגיל עצמו, אז אולי נצרף לכאן ExerciseDTO
  // או שנאחזר אותם בנפרד
  exercise?: Exercise; // חשוב: אם ה-backend מחזיר את זה בתוך ה-ExercisePlanDTO
}



export interface ExercisePlan {
  exercisePlanId: number;
  planDayId: number;
  exerciseId: number;
  orderInDay: number;
  sets: number;
  reps: number;
  weight?: number; // אופציונלי
  restTime?: number; // אופציונלי
  // ... שדות נוספים מ-ExercisePlanDTO מה-backend
  // נצטרך גם את פרטי התרגיל עצמו, אז אולי נצרף לכאן ExerciseDTO
  // או שנאחזר אותם בנפרד
  exercise?: Exercise; // חשוב: אם ה-backend מחזיר את זה בתוך ה-ExercisePlanDTO
}

export interface PlanDay {
  planDayId: number;
  dayOrder: number;
  programName: string;
  // ... שדות נוספים של PlanDay
}



// מודלים לבקשות API (כפי שראינו בקוד ה-C#)
export interface SchedulerInitRequest {
  slotMinutes: number;
  slotCount: number;
}

export interface StartWorkoutRequest {
  trainee: Trainee; // או רק traineeId: number; תלוי מה ה-backend באמת מצפה
  planday: number; // PlanDayId
  startTime: string; // DateTime בפורמט ISO string
}
export interface RunAlgorithmRequest {
  Trainee: number; // שימי לב: זה TraineeId
  planday: number;
  StartTime: string; // או Date, תלוי איך את שולחת את התאריך
}

export interface StartOrCompleteExerciseRequest {
  traineeId: number;
  exerciseId: number;
  startTime: string; // DateTime בפורמט ISO string - שים לב לשם הפרמטר ב-Complete
}

// export interface MultiplePlansResponseItem {
//   trainingPlan: TrainingPlan;
//   planDays: PlanDay[];
// }






export type PathResultExerciseEntry = {
  originalExercise: number; // זהו ה-OriginalExercisePlanId מ-Backend
  exerciseId: number; // ה-ExerciseId בפועל שנבחר
  orderInList: number;
  // ... שדות נוספים מ-PathResultExerciseEntry אם יש
  //exerciseDetails?: Exercise; // הוסף את זה אם אתה מצפה לפרטי התרגיל המלאים כאן
};

export type PathResult = {
  trainee: Trainee;
  exerciseIdsInPath: { [key: string]: ExerciseEntry }; // Backend שולח Dictionary
  startTime: string; // ISO string
  endTime: string; // ISO string
  alternativesUsed: number;
  currentExerciseOrderIndex: number;
  isWorkoutComplete: boolean;
};

export type ExerciseStatusEntry = {
  originalExercise: number;
  exerciseId: number;
  orderInList: number;
  isDone: boolean;
  performedAt: string | null;
  startedAt: string | null;
  sets: number | null;
  reps: number | null;
  restTime: number | null;
  timesMax: number | null;
  timesMin: number | null;
  exerciseDetails?: Exercise; // פרטי התרגיל
};


// טיפוס עבור תגובת GetNextExerciseInWorkout
export type NextExerciseResponse = {
  traineeId: number;
  nextExercise: ExerciseEntry | null; // זהו ה-ExerciseEntry מה-Backend
  isWorkoutComplete: boolean;
  message: string | null;
  remainingExercisesCount: number;
  recommendedRestTimeSeconds?: number;
};

// טיפוס עבור ExerciseEntry כפי שממופה ב-Backend ל-frontend
// זה מייצג את הנתונים של תרגיל בודד שמוצג למתאמן
export type ExerciseEntry = {
  originalExercise: number; // ה-ID המקורי מ-ExercisePlan
  exerciseId: number; // ה-ID של התרגיל בפועל (Exercise)
  orderInList: number;
  isDone: boolean;
  startTime: string | null; // תאריך וזמן ISO
  performedAt: string | null; // תאריך וזמן ISO
  // sets: number | null;
  // reps: number | null;
  // restTime: number | null;
  // timesMax: number | null;
  // timesMin: number | null;
  exerciseDetails?: Exercise; // פרטי התרגיל המלאים
};
