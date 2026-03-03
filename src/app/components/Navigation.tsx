import { Link, useLocation } from 'react-router';
import { Palmtree, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export function Navigation() {
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b-2 border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg">
              <Palmtree className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
              Explore India
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`transition-colors ${
                isActive('/') 
                  ? 'text-orange-600' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/places"
              className={`transition-colors ${
                isActive('/places') 
                  ? 'text-orange-600' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Places
            </Link>
            {isLoggedIn && (
              <Link
                to="/saved"
                className={`transition-colors ${
                  isActive('/saved')
                    ? 'text-orange-600'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Saved
              </Link>
            )}
            <Link
              to="/travel-diary"
              className={`transition-colors ${
                isActive('/travel-diary') 
                  ? 'text-orange-600' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              Travel Diary
            </Link>
            <Link
              to="/my-trips"
              className={`transition-colors ${
                isActive('/my-trips') 
                  ? 'text-orange-600' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              My Trips
            </Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-white" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
                <User className="w-5 h-5 text-white" />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 transition-colors ${
                  isActive('/') 
                    ? 'text-orange-600' 
                    : 'text-gray-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/places"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 transition-colors ${
                  isActive('/places') 
                    ? 'text-orange-600' 
                    : 'text-gray-600'
                }`}
              >
                Places
              </Link>
              {isLoggedIn && (
                <Link
                  to="/saved"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 transition-colors ${
                    isActive('/saved')
                      ? 'text-orange-600'
                      : 'text-gray-600'
                  }`}
                >
                  Saved
                </Link>
              )}
              <Link
                to="/travel-diary"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 transition-colors ${
                  isActive('/travel-diary') 
                    ? 'text-orange-600' 
                    : 'text-gray-600'
                }`}
              >
                Travel Diary
              </Link>
              <Link
                to="/my-trips"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 transition-colors ${
                  isActive('/my-trips') 
                    ? 'text-orange-600' 
                    : 'text-gray-600'
                }`}
              >
                My Trips
              </Link>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-2 text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-gray-600"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}