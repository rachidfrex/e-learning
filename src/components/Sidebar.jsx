import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, BookOpen, Languages as LanguagesIcon, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ collapsed, onToggleCollapse }) => {
  const { t } = useTranslation();
  const location = useLocation();

  // Helper function to check if a path is active
  const isActive = (path) => {
    if (path === '/courses') {
      return location.pathname.startsWith('/courses');
    }
    if (path === '/languages') {
      return location.pathname.startsWith('/languages');
    }
    return location.pathname === path;
  };

  return (
    <aside className={`hidden lg:flex lg:flex-col ${collapsed ? 'lg:w-16' : 'lg:w-56 xl:w-64'} bg-white dark:bg-[#0b2b24] text-gray-900 dark:text-white p-4 gap-6 h-screen sticky top-0 border-r border-gray-200 dark:border-[#204b40] transition-all duration-300`}>
      {/* Logo */}
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
        {!collapsed && (
          <>
            <div className="size-7 text-primary">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_330)">
                  <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_330">
                    <rect fill="white" height="48" width="48"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white text-base font-bold">LearnAI</h3>
              <p className="text-primary text-xs">{t('hero.gendarmerie')}</p>
            </div>
          </>
        )}
        {collapsed && (
          <div className="size-7 text-primary">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6_330)">
                <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
              </g>
              <defs>
                <clipPath id="clip0_6_330">
                  <rect fill="white" height="48" width="48"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 bg-white dark:bg-[#204b40] border border-gray-200 dark:border-primary/20 rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors shadow-lg z-10"
        title={collapsed ? 'Expand' : 'Collapse'}
      >
        {collapsed ? <ChevronRight size={16} className="text-gray-700 dark:text-white" /> : <ChevronLeft size={16} className="text-gray-700 dark:text-white" />}
      </button>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 mt-4">
        <Link 
          to="/dashboard" 
          className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-lg text-sm transition-colors ${
            isActive('/dashboard') 
              ? 'bg-primary/10 text-primary font-semibold' 
              : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white'
          }`}
          title={collapsed ? t('dashboard.dashboard') : ''}
        >
          <LayoutDashboard size={18} />
          {!collapsed && <span>{t('dashboard.dashboard')}</span>}
        </Link>
        <Link 
          to="/courses" 
          className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-lg text-sm transition-colors ${
            isActive('/courses') 
              ? 'bg-primary/10 text-primary font-semibold' 
              : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white'
          }`}
          title={collapsed ? t('nav.courses') : ''}
        >
          <BookOpen size={18} />
          {!collapsed && <span>{t('nav.courses')}</span>}
        </Link>
        <Link 
          to="/languages" 
          className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-lg text-sm transition-colors ${
            isActive('/languages') 
              ? 'bg-primary/10 text-primary font-semibold' 
              : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white'
          }`}
          title={collapsed ? t('nav.languages') : ''}
        >
          <LanguagesIcon size={18} />
          {!collapsed && <span>{t('nav.languages')}</span>}
        </Link>
        <Link 
          to="/community" 
          className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2'} px-3 py-2 rounded-lg text-sm transition-colors ${
            isActive('/community') 
              ? 'bg-primary/10 text-primary font-semibold' 
              : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white'
          }`}
          title={collapsed ? t('dashboard.community') : ''}
        >
          <Users size={18} />
          {!collapsed && <span>{t('dashboard.community')}</span>}
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
