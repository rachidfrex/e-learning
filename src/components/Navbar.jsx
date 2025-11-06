import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setIsLangMenuOpen(false);
    // Set direction for Arabic
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' }
  ];

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  const navLinks = [
    { path: '/', label: t('nav.courses') },
    { path: '/features', label: t('nav.features') },
    { path: '/about', label: t('nav.about') }
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 dark:border-[#204b40] bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm px-4 md:px-10 py-3 sticky top-5 z-50 rounded-xl mx-4 md:mx-10 lg:mx-20 xl:mx-40 mt-5"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-4 text-gray-900 dark:text-white">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="text-primary size-7"
        >
          <motion.svg 
            fill="currentColor" 
            viewBox="0 0 48 48" 
            xmlns="http://www.w3.org/2000/svg"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <motion.path 
              d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
              strokeWidth="0"
            />
          </motion.svg>
        </motion.div>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          E-Learn AI
        </h2>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium leading-normal transition-colors ${
                location.pathname === link.path
                  ? 'text-primary'
                  : 'text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          {/* Language Selector */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 cursor-pointer overflow-hidden rounded-lg h-10 bg-gray-100 dark:bg-[#204b40] text-gray-900 dark:text-white px-3 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              <Globe size={20} />
              <span className="text-sm font-bold">{currentLang.flag}</span>
            </motion.button>

            {isLangMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-12 right-0 bg-white dark:bg-[#17362d] rounded-lg shadow-lg border border-gray-200 dark:border-[#2e6b5b] overflow-hidden min-w-[150px] z-50"
              >
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
              </motion.div>
            )}
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-lg h-10 w-10 bg-gray-100 dark:bg-[#204b40] text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.div>
          </motion.button>

          {/* Auth Buttons */}
          <Link to="/signin">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-[#204b40] text-gray-900 dark:text-white text-sm font-bold leading-normal hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              <span className="truncate">{t('nav.login')}</span>
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-[#0f241e] text-sm font-bold leading-normal hover:bg-primary/80 transition-colors"
          >
            <span className="truncate">{t('nav.signup')}</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="flex items-center justify-center rounded-lg h-10 w-10 bg-gray-100 dark:bg-[#204b40] text-gray-900 dark:text-white"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center rounded-lg h-10 w-10 bg-gray-100 dark:bg-[#204b40] text-gray-900 dark:text-white"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute top-full left-4 right-4 mt-2 bg-white dark:bg-[#17362d] rounded-xl shadow-lg border border-gray-200 dark:border-[#2e6b5b] overflow-hidden md:hidden"
        >
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-900 dark:text-white text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-200 dark:border-[#2e6b5b] pt-4 flex flex-col gap-2">
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                      i18n.language === lang.code
                        ? 'bg-primary text-[#0f241e]'
                        : 'bg-gray-100 dark:bg-[#204b40] text-gray-900 dark:text-white'
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>

              <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#204b40] text-gray-900 dark:text-white text-sm font-bold hover:bg-gray-200 dark:hover:bg-white/10">
                  {t('nav.login')}
                </button>
              </Link>

              <button className="w-full px-4 py-2 rounded-lg bg-primary text-[#0f241e] text-sm font-bold hover:bg-primary/80">
                {t('nav.signup')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
