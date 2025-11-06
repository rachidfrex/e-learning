import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Globe } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

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

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 xl:w-80 bg-white dark:bg-[#0b2b24] text-gray-900 dark:text-white p-6 gap-6 h-screen sticky top-0 border-r border-gray-200 dark:border-[#204b40]">
      <div className="flex items-center gap-4">
        <div className="size-8 text-primary">
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
          <h3 className="text-gray-900 dark:text-white text-lg font-bold">LearnAI</h3>
          <p className="text-primary text-sm">{t('hero.gendarmerie')}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-2 mt-6">
        <Link to="/courses" className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white transition-colors">{t('nav.courses')}</Link>
        <Link to="/dashboard" className="px-3 py-2 rounded-lg text-sm bg-primary/10 text-primary font-semibold">{t('dashboard.dashboard')}</Link>
        <Link to="/community" className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white transition-colors">{t('dashboard.community')}</Link>
      </nav>

      <div className="flex flex-col gap-2 mt-4">
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
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-[#204b40]/50">
          <div className="w-12 h-12 rounded-full bg-center bg-cover" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCxr6zJ9M6BzbtkdmIQDmVCcThOnNqeor15P0CIs7XkDIkzP5OAF-_Jwo4Ql4Ce5tEd-tHbCXmUy7hx_SeVwkN-tPnEFcCr7IbAopRAT3MvdHf2K0ZYrcD5q_nCy7ANFyOMooUwVk5o_u68_Q-TtxjZbS35DBxDVsqQ9NB-SllEZHpRd_UaqAjlIRU4_zRmAYkxjxoRUBtjVQfoAmEVft4yd4NRiHXIkJn4R8IDvx_v407JDOu9as0tnKpbHSWJ82Y32QLXfDXysus')`}}></div>
          <div>
            <p className="text-gray-900 dark:text-white text-sm font-semibold">Alex</p>
            <p className="text-gray-600 dark:text-[#8dcebd] text-xs">{t('dashboard.student')}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
