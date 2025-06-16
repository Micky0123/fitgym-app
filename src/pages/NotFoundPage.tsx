import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" dir="rtl">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">404</h2>
          <p className="text-xl font-medium text-gray-700 mb-6">העמוד לא נמצא</p>
          <p className="text-gray-500 mb-6">
            העמוד שחיפשת אינו קיים או שהועבר למיקום אחר.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse justify-center">
            <Link to="/">
              <Button icon={<Home className="h-4 w-4" />}>
                חזרה לדף הבית
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
                חזרה להתחברות
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;