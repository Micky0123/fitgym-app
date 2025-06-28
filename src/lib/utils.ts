import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

import defaultImage from '../images/logo.png'; // שנה את השם והנתיב לקובץ שלך
import chestImage from '../images/logo.png'; // דוגמה
import backImage from '../images/logo.png';   // דוגמה
import legsImage from '../images/logo.png';   // דוגמה
import armsImage from '../images/logo.png';   // דוגמה
import shouldersImage from '../images/logo.png'; // דוגמה
import cardioImage from '../images/logo.png'; // דוגמה



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('he-IL', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(date);
}


export function getImageUrl(name: string): string {
  // 2. מפה את השמות למשתני הייבוא
  const exerciseImages: Record<string, string> = {
    default: defaultImage, 
    chest: chestImage,
    back: backImage,
    legs: legsImage,
    arms: armsImage,
    shoulders: shouldersImage,
    cardio: cardioImage
  };

  // 3. החזר את התמונה המתאימה, או תמונת ברירת המחדל אם השם לא נמצא
  return exerciseImages[name] || exerciseImages.default;
}

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