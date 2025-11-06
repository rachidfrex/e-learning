import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SignInPage = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="relative flex min-h-screen w-full bg-gray-50 dark:bg-background-dark">
      <div className="relative z-10 flex flex-1 flex-col md:flex-row w-full">
        
        {/* Left Side - Branding (Hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-[#17362d] via-[#0f231e] to-[#17362d] p-8 overflow-hidden"
        >
          {/* Decorative Pattern (static & subtle) */}
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.06,
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300ffbb" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: '60px 60px'
            }}
          />

          <div className="relative flex flex-col items-center justify-center gap-8 text-center max-w-md z-10">
            {/* Logo */}
            <div className="flex items-center gap-4 text-white">
              <div className="text-primary size-12">
                <svg 
                  fill="currentColor" 
                  viewBox="0 0 48 48" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                    strokeWidth="0"
                  />
                </svg>
              </div>
              <h1 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em]">
                E-Learn AI
              </h1>
            </div>

            {/* Badge */}
            <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-primary/30">
              <Shield className="text-primary" size={20} />
              <span className="text-white text-sm font-bold">{t('hero.gendarmerie')}</span>
            </div>

            {/* Hero Image */}
            <div className="relative w-full max-w-sm">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-2xl flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=500&fit=crop"
                  alt="Learning"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Feature Text */}
            <div className="space-y-2">
              <h3 className="text-white text-xl font-bold">{t('signin.hero.title')}</h3>
              <p className="text-white/70 text-sm">{t('signin.hero.subtitle')}</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <div className="flex flex-1 items-center justify-center p-6 md:p-12">
          <div className="flex w-full max-w-md flex-col gap-8">
            
            {/* Mobile Logo */}
            <div className="flex md:hidden flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-primary size-10">
                  <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" strokeWidth="0" />
                  </svg>
                </div>
                <h1 className="text-gray-900 dark:text-white text-2xl font-bold">E-Learn AI</h1>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#17362d] rounded-full">
                <Shield className="text-primary" size={16} />
                <span className="text-gray-700 dark:text-white/80 text-xs font-semibold">
                  {t('hero.gendarmerie')}
                </span>
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {t('signin.title')}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
                {t('signin.subtitle')}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Email Input */}
              <div className="relative">
                <div className="group flex items-center gap-3 rounded-lg border-2 border-gray-200 dark:border-[#2e6b5b] bg-white dark:bg-[#17362d] px-4 py-3 transition-all focus-within:border-primary">
                  <Mail className="text-gray-400 dark:text-white/50 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full flex-1 appearance-none border-none bg-transparent p-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/50 focus:outline-none focus:ring-0"
                    placeholder={t('signin.email')}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="group flex items-center gap-3 rounded-lg border-2 border-gray-200 dark:border-[#2e6b5b] bg-white dark:bg-[#17362d] px-4 py-3 transition-all focus-within:border-primary">
                  <Lock className="text-gray-400 dark:text-white/50 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full flex-1 appearance-none border-none bg-transparent p-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/50 focus:outline-none focus:ring-0"
                    placeholder={t('signin.password')}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 dark:text-white/50 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 dark:border-[#2e6b5b] text-primary focus:ring-primary focus:ring-offset-0"
                  />
                  <span className="text-sm text-gray-600 dark:text-white/60">
                    {t('signin.rememberMe')}
                  </span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline font-semibold">
                  {t('signin.forgotPassword')}
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg h-12 px-5 bg-primary text-[#0f241e] text-base font-bold hover:bg-primary/90 transition-all group"
              >
                <span>{t('signin.signIn')}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-[#2e6b5b]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-50 dark:bg-background-dark px-4 text-gray-600 dark:text-white/60">
                  {t('signin.orContinue')}
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-3 rounded-lg bg-white dark:bg-[#204b40] px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white shadow-sm border-2 border-gray-200 dark:border-[#2e6b5b] hover:border-primary dark:hover:border-primary transition-all">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="truncate">{t('signin.google')}</span>
              </button>

              <button className="flex items-center justify-center gap-3 rounded-lg bg-white dark:bg-[#204b40] px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white shadow-sm border-2 border-gray-200 dark:border-[#2e6b5b] hover:border-primary dark:hover:border-primary transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="truncate">{t('signin.facebook')}</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600 dark:text-white/60">{t('signin.noAccount')} </span>
              <Link to="/signup" className="text-primary hover:underline font-semibold">
                {t('signin.signUp')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
