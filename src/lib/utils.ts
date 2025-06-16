import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
  // Map exercise names to placeholder images from Pexels
  const exerciseImages: Record<string, string> = {
    default: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
    chest: 'https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg',
    back: 'https://images.pexels.com/photos/4608158/pexels-photo-4608158.jpeg',
    legs: 'https://images.pexels.com/photos/6550839/pexels-photo-6550839.jpeg',
    arms: 'https://images.pexels.com/photos/1304325/pexels-photo-1304325.jpeg',
    shoulders: 'https://images.pexels.com/photos/28054/pexels-photo.jpg',
    cardio: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg'
  };
  
  return exerciseImages[name.toLowerCase()] || exerciseImages.default;
}

// Format error messages from the API
export function formatApiError(error: any): string {
  if (error.response) {
    return error.response.data || 'An error occurred';
  }
  return error.message || 'An unexpected error occurred';
}