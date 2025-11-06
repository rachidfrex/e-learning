import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = {
    platform: [
      { label: t('nav.courses'), path: '/courses' },
      { label: t('nav.features'), path: '/features' },
      { label: t('nav.about'), path: '/about' },
      { label: t('nav.pricing'), path: '/pricing' }
    ],
    legal: [
      { label: t('footer.privacy'), path: '/privacy' },
      { label: t('footer.terms'), path: '/terms' },
      { label: t('footer.contact'), path: '/contact' }
    ]
  };

  return (
    <footer className="mt-16 md:mt-24 border-t border-solid border-gray-200 dark:border-[#204b40] py-10 px-4 md:px-10 lg:px-20 xl:px-40 bg-white dark:bg-background-dark">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* Logo & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 items-start col-span-1 md:col-span-2"
        >
          <div className="flex items-center gap-4 text-gray-900 dark:text-white">
            <div className="text-primary size-7">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" />
              </svg>
            </div>
            <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              E-Learn AI
            </h2>
          </div>
          <p className="text-gray-600 dark:text-white/60 text-sm">{t('footer.tagline')}</p>
          <p className="text-xs text-gray-500 dark:text-white/50 italic">{t('hero.gendarmerie')}</p>
        </motion.div>

        {/* Platform Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-3"
        >
          <h3 className="font-bold text-gray-900 dark:text-white">{t('footer.platform')}</h3>
          {footerLinks.platform.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>

        {/* Legal Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-3"
        >
          <h3 className="font-bold text-gray-900 dark:text-white">{t('footer.legal')}</h3>
          {footerLinks.legal.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-10 pt-6 border-t border-solid border-gray-200 dark:border-[#204b40] flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto"
      >
        <p className="text-gray-500 dark:text-white/50 text-xs">{t('footer.rights')}</p>
        <div className="flex gap-4">
          {[
            { Icon: Twitter, href: '#' },
            { Icon: Facebook, href: '#' },
            { Icon: Instagram, href: '#' }
          ].map(({ Icon, href }, index) => (
            <motion.a
              key={index}
              href={href}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-600 dark:text-white/60 hover:text-primary transition-colors"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
