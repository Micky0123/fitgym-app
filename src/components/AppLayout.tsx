import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Dumbbell, User, Menu, X, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Button from './ui/Button';
import { cn } from '../lib/utils';
import defaultImage from '../images/logo.png'; // שנה את השם והנתיב לקובץ שלך

const AppLayout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              {/* <Dumbbell className="h-8 w-8 text-blue-600" /> */}
               <img
                  src={defaultImage}
                  // alt="תיאור התמונה"
                  className="h-15 w-20 object-contain"
                />
              {/* <span className="mr-2 text-xl font-bold text-gray-900">פיט-גים</span> */}
            </div>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-4 space-x-reverse">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                דף הבית
              </Button>
              {user.isAdmin ? (
                // <Button 
                //   variant="ghost" 
                //   onClick={() => navigate('/admin')}
                //   className="text-gray-600 hover:text-gray-900"
                // >
                //   ניהול
                // </Button>
                // {user.isAdmin ? (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/admin')}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    ניהול
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/admin/system-init')}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    אתחול מערכת
                  </Button>

                </>
              ) : (
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/profile')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  פרופיל
                </Button>
              )}
            </nav>
            
            {/* User menu */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center ml-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-700">{user.traineeName}</p>
                    <p className="text-gray-500 text-xs">
                      {user.isAdmin ? 'מנהל' : 'מתאמן'}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  icon={<LogOut className="h-4 w-4" />}
                  className="mr-4 text-gray-600 hover:text-gray-900"
                >
                  התנתק
                </Button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={cn("md:hidden", isMobileMenuOpen ? "block" : "hidden")}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Button 
              variant="ghost" 
              fullWidth
              onClick={() => {
                navigate('/');
                setIsMobileMenuOpen(false);
              }}
              className="block text-right w-full text-gray-600 hover:text-gray-900"
            >
              דף הבית
            </Button>
            {user.isAdmin ? (
              <Button 
                variant="ghost" 
                fullWidth
                onClick={() => {
                  navigate('/admin');
                  setIsMobileMenuOpen(false);
                }}
                className="block text-right w-full text-gray-600 hover:text-gray-900"
              >
                ניהול
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                fullWidth
                onClick={() => {
                  navigate('/profile');
                  setIsMobileMenuOpen(false);
                }}
                className="block text-right w-full text-gray-600 hover:text-gray-900"
              >
                פרופיל
              </Button>
            )}
            <Button 
              variant="ghost"
              fullWidth
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="block text-right w-full text-red-600 hover:text-red-900"
            >
              התנתק
            </Button>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="mr-3">
                <p className="text-sm font-medium text-gray-700">{user.traineeName}</p>
                <p className="text-xs text-gray-500">
                  {user.isAdmin ? 'מנהל' : 'מתאמן'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} פיט-גים. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;