import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Bot, 
  Languages, 
  Trophy, 
  LineChart,
  ArrowRight,
  Sparkles,
  Shield,
  GraduationCap
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Bot,
      title: t('features.aiTeacher.title'),
      description: t('features.aiTeacher.description'),
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Languages,
      title: t('features.multilingual.title'),
      description: t('features.multilingual.description'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Trophy,
      title: t('features.gamified.title'),
      description: t('features.gamified.description'),
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: LineChart,
      title: t('features.dashboard.title'),
      description: t('features.dashboard.description'),
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const courses = [
    {
      title: t('courses.digitalMarketing'),
      instructor: 'Dr. Angela Yu',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      category: 'Marketing'
    },
    {
      title: t('courses.python'),
      instructor: 'Jose Portilla',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&h=300&fit=crop',
      category: 'Programming'
    },
    {
      title: t('courses.graphicDesign'),
      instructor: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
      category: 'Design'
    },
    {
      title: t('courses.publicSpeaking'),
      instructor: 'David Phillips',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&h=300&fit=crop',
      category: 'Communication'
    }
  ];

  const stats = [
    {
      icon: Shield,
      value: '10,000+',
      label: t('stats.activeOfficers'),
      description: t('stats.activeOfficersDesc'),
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: GraduationCap,
      value: '500+',
      label: t('stats.courses'),
      description: t('stats.coursesDesc'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Trophy,
      value: '95%',
      label: t('stats.completionRate'),
      description: t('stats.completionRateDesc'),
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: LineChart,
      value: '24/7',
      label: t('stats.availability'),
      description: t('stats.availabilityDesc'),
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-background-dark dark:to-[#17362d] overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.02, 0.03, 0.02]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.03, 0.02, 0.03]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-cyan-500 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="px-4 md:px-10 lg:px-20 xl:px-40 py-10">
          <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24 lg:gap-32">
            
            {/* Hero Section */}
            <motion.section
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="mt-10"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#17362d] via-[#0f231e] to-[#17362d] opacity-90" />
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2300ffbb" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    backgroundSize: '60px 60px'
                  }}
                />
                
                <div className="relative flex min-h-[60vh] md:min-h-[480px] flex-col gap-6 items-center justify-center p-8 md:p-16 text-center">
                  {/* Moroccan Gendarmerie Badge */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-primary/30"
                  >
                    <Shield className="text-primary" size={24} />
                    <span className="text-white text-sm font-bold">{t('hero.gendarmerie')}</span>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex flex-col gap-4 max-w-3xl">
                    <motion.h1
                      className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {t('hero.title')}
                    </motion.h1>
                    <motion.p
                      className="text-white/80 text-base md:text-lg leading-relaxed"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      {t('hero.subtitle')}
                    </motion.p>
                  </motion.div>

                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-[#0f241e] text-base md:text-lg font-bold rounded-lg hover:bg-primary/90 transition-all group"
                  >
                    <Sparkles size={20} />
                    <span>{t('hero.cta')}</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.section>

            {/* Features Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="flex flex-col gap-10"
            >
              <motion.div variants={itemVariants} className="flex flex-col gap-4 text-center items-center">
                <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight">
                  {t('features.title')}
                </h2>
                <p className="text-gray-600 dark:text-white/80 text-base md:text-lg leading-normal max-w-2xl">
                  {t('features.subtitle')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="relative group"
                  >
                    <div className="relative flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-[#2e6b5b] bg-white dark:bg-[#17362d] p-6 hover:border-primary/50 transition-all h-full">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                        <feature.icon className="text-white" size={28} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-[#8dcebd] text-sm leading-normal">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Courses Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="flex flex-col gap-8"
            >
              <motion.h2
                variants={itemVariants}
                className="text-gray-900 dark:text-white text-2xl md:text-3xl font-bold text-center"
              >
                {t('courses.title')}
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="flex flex-col rounded-xl bg-white dark:bg-[#17362d] shadow-lg overflow-hidden border border-gray-200 dark:border-[#2e6b5b] group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-[#0f241e] text-xs font-bold rounded-full">
                        {course.category}
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 justify-between p-5 gap-4">
                      <div>
                        <p className="text-gray-900 dark:text-white text-base font-semibold leading-snug mb-2">
                          {course.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="text-primary" size={16} />
                          <p className="text-gray-600 dark:text-[#8dcebd] text-sm">{course.instructor}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#204b40] text-gray-900 dark:text-white text-sm font-bold hover:bg-primary hover:text-[#0f241e] dark:hover:bg-primary dark:hover:text-[#0f241e] transition-colors"
                      >
                        {t('courses.viewCourse')}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Platform Statistics Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="flex flex-col gap-10"
            >
              <motion.div variants={itemVariants} className="flex flex-col gap-4 text-center items-center">
                <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold">
                  {t('stats.title')}
                </h2>
                <p className="text-gray-600 dark:text-white/80 text-base md:text-lg max-w-2xl">
                  {t('stats.subtitle')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="relative flex flex-col items-center gap-4 rounded-xl bg-white dark:bg-[#17362d] p-8 border border-gray-200 dark:border-[#2e6b5b] overflow-hidden group"
                  >
                    {/* Background gradient effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Icon */}
                    <div className={`relative p-4 rounded-full bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                      <stat.icon className="" size={32} />
                    </div>
                    
                    {/* Value */}
                    <div className="text-center space-y-2">
                      <p className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-lg font-bold text-gray-700 dark:text-primary">
                        {stat.label}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-white/70">
                        {stat.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="rounded-2xl bg-gradient-to-br from-[#17362d] to-[#0f231e] p-8 md:p-16 text-center relative overflow-hidden"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.05, 0.1, 0.05]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
                className="absolute inset-0 bg-primary rounded-full blur-3xl"
              />
              
              <div className="relative flex flex-col items-center gap-6">
                <motion.h2
                  variants={itemVariants}
                  className="text-white text-3xl md:text-4xl font-black leading-tight max-w-2xl"
                >
                  {t('cta.title')}
                </motion.h2>
                <motion.p
                  variants={itemVariants}
                  className="text-white/80 text-base md:text-lg max-w-2xl"
                >
                  {t('cta.subtitle')}
                </motion.p>
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-8 py-4 bg-primary text-[#0f241e] text-base md:text-lg font-bold rounded-lg hover:bg-primary/90 transition-all group"
                >
                  <span>{t('cta.button')}</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </motion.button>
              </div>
            </motion.section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
