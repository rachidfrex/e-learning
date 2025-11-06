import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Moon, Sun, Globe, Home, BookOpen, Award, BarChart3, Settings,
  MessageSquare, Bell, ChevronLeft, ChevronRight, Menu, X
} from 'lucide-react';

const Sidebar = ({ collapsed, onToggleCollapse }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setIsLangMenuOpen(false);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' }
  ];

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  const navItems = [
    { path: '/dashboard', icon: Home, label: t('dashboard.dashboard') || 'Dashboard' },
    { path: '/courses', icon: BookOpen, label: t('nav.courses') || 'My Courses' },
    { path: '/progress', icon: BarChart3, label: 'Progress' },
    { path: '/certificates', icon: Award, label: 'Certificates' },
    { path: '/messages', icon: MessageSquare, label: 'Messages' },
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className={`flex items-center gap-4 ${collapsed ? 'justify-center' : ''}`}>
        <div className="size-8 text-primary flex-shrink-0">
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
        {!collapsed && (
          <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-bold">LearnAI</h3>
            <p className="text-primary text-xs">{t('hero.gendarmerie')}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 mt-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/5'
            } ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? item.label : ''}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Settings & Controls */}
      <div className="flex flex-col gap-2 mt-6">
        {!collapsed && (
          <>
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#204b40] hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                <Globe size={18} />
                <span className="text-sm font-semibold">{currentLang.flag} {currentLang.name}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-[#17362d] rounded-lg shadow-lg border border-gray-200 dark:border-[#2e6b5b] overflow-hidden z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-[#204b40] transition-colors flex items-center gap-2 ${
                        i18n.language === lang.code ? 'bg-gray-100 dark:bg-[#204b40]' : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm text-gray-900 dark:text-white">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-[#204b40] hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              <span className="text-sm font-semibold">{theme === 'light' ? t('dashboard.darkMode') : t('dashboard.lightMode')}</span>
            </button>
          </>
        )}

        {collapsed && (
          <>
            {/* Collapsed Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center p-2.5 rounded-lg bg-gray-100 dark:bg-[#204b40] hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Collapsed Settings */}
            <Link
              to="/settings"
              className="flex items-center justify-center p-2.5 rounded-lg bg-gray-100 dark:bg-[#204b40] hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              title="Settings"
            >
              <Settings size={18} />
            </Link>
          </>
        )}
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="mt-auto">
          <Link
            to="/settings"
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-[#204b40]/50 hover:bg-gray-200 dark:hover:bg-[#204b40] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 dark:text-white text-sm font-semibold truncate">Alex Johnson</p>
              <p className="text-gray-600 dark:text-[#8dcebd] text-xs truncate">{t('dashboard.student')}</p>
            </div>
          </Link>
        </div>
      )}

      {/* Collapse Button (Desktop) */}
      <button
        onClick={onToggleCollapse}
        className="hidden lg:flex items-center justify-center mt-4 p-2 rounded-lg bg-gray-100 dark:bg-[#204b40] hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-[#204b40] rounded-lg shadow-lg"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex lg:flex-col bg-white dark:bg-[#0b2b24] text-gray-900 dark:text-white p-6 gap-4 h-screen border-r border-gray-200 dark:border-[#204b40] transition-all duration-300 ${
          collapsed ? 'lg:w-20' : 'lg:w-72'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-screen w-72 bg-white dark:bg-[#0b2b24] text-gray-900 dark:text-white p-6 flex flex-col gap-4 border-r border-gray-200 dark:border-[#204b40] z-40 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
