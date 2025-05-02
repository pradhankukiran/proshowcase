import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Grid, Search, LogOut, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navLinkClasses = 'px-4 py-2 font-medium rounded-md transition-colors';
  const activeClasses = 'bg-blue-50 text-blue-700';
  const inactiveClasses = 'text-gray-700 hover:bg-gray-100';
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className={`${navLinkClasses} ${isActive('/') ? activeClasses : inactiveClasses}`}
            >
              Home
            </Link>
            <Link 
              to="/directory" 
              className={`${navLinkClasses} ${isActive('/directory') ? activeClasses : inactiveClasses}`}
            >
              Directory
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/projects" 
                  className={`${navLinkClasses} ${isActive('/projects') ? activeClasses : inactiveClasses}`}
                >
                  My Projects
                </Link>
                <div className="relative group ml-2">
                  <Button 
                    variant="ghost"
                    className="flex items-center"
                  >
                    <span className="mr-2">{user?.name}</span>
                    <img 
                      src={user?.profileImage || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <User size={16} className="mr-2" />
                      My Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Link>
                    <button 
                      onClick={logout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="md">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="md">Sign Up</Button>
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/directory" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/directory') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={closeMobileMenu}
            >
              Directory
            </Link>
            
            {isAuthenticated && (
              <Link 
                to="/projects" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/projects') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={closeMobileMenu}
              >
                My Projects
              </Link>
            )}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img 
                      src={user?.profileImage || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                      alt="Profile" 
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                </div>
                
                <div className="mt-3 space-y-1">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={closeMobileMenu}
                  >
                    <User size={16} className="mr-2" />
                    My Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={closeMobileMenu}
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="w-full text-left block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1 px-2">
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeMobileMenu}
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-700 text-white hover:bg-blue-800"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};