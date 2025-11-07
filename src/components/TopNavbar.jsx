import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Globe, ChevronDown, User, Settings, LogOut, Menu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { document } from 'postcss';

const TopNavbar = ({ onMenuClick }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    setShowLangMenu(false);
    document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <nav className="bg-white dark:bg-[#17362d] border-b border-gray-200 dark:border-primary/10 px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left: Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu size={24} className="text-gray-700 dark:text-white" />
        </button>

        <div className={`flex-1 ${i18n.language === 'ar' ? 'text-right lg:text-right lg:mr-4' : 'text-center lg:text-left lg:ml-4'}`}>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            {t('hero.gendarmerie')}
          </h1>
        </div>

        {/* Right: Theme, Language, Profile */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
            title={theme === 'dark' ? t('dashboard.lightMode') : t('dashboard.darkMode')}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              <Globe size={20} className="text-gray-700 dark:text-white" />
              <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-white">
                {currentLang.flag} {currentLang.name}
              </span>
              <ChevronDown size={16} className="text-gray-700 dark:text-white" />
            </button>

            {showLangMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)}></div>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#204b40] rounded-lg shadow-lg border border-gray-200 dark:border-primary/20 py-2 z-20">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors ${
                        i18n.language === lang.code ? 'bg-gray-50 dark:bg-white/5' : ''
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-white">
                        {lang.name}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User size={18} className="text-[#0f241e]" />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-semibold text-gray-700 dark:text-white">Alex</span>
                <span className="text-xs text-gray-500 dark:text-white/60">{t('dashboard.student')}</span>
              </div>
              <ChevronDown size={16} className="text-gray-700 dark:text-white" />
            </button>

            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)}></div>
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#204b40] rounded-lg shadow-lg border border-gray-200 dark:border-primary/20 py-2 z-20">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-primary/10">
                    <p className="text-sm font-semibold text-gray-700 dark:text-white">Alex Johnson</p>
                    <p className="text-xs text-gray-500 dark:text-white/60">alex@example.com</p>
                  </div>
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    <User size={18} className="text-gray-700 dark:text-white" />
                    <span className="text-sm text-gray-700 dark:text-white">Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    <Settings size={18} className="text-gray-700 dark:text-white" />
                    <span className="text-sm text-gray-700 dark:text-white">Settings</span>
                  </button>
                  <hr className="my-2 border-gray-200 dark:border-primary/10" />
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-red-600 dark:text-red-400">
                    <LogOut size={18} />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
