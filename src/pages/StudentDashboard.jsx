import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TrendingUp, Award, Target, Clock, PlayCircle, BookOpen, Calendar, Flame } from 'lucide-react';
import AIChat from '../components/AIChat';

const StudentDashboard = () => {
  const { t } = useTranslation();
  
  const statsCards = [
    { icon: BookOpen, value: '3', label: t('dashboard.coursesCompleted'), color: 'from-blue-500 to-cyan-500', trend: '+2' },
    { icon: Flame, value: '24', label: t('dashboard.dayStreak'), color: 'from-orange-500 to-red-500', trend: '+3' },
    { icon: Award, value: '5', label: t('dashboard.achievements'), color: 'from-purple-500 to-pink-500', trend: '+1' },
    { icon: Target, value: '1250', label: t('dashboard.pointsEarned'), color: 'from-green-500 to-emerald-500', trend: '+150' }
  ];

  const recentActivity = [
    { type: 'completed', course: t('dashboard.militaryCorrespondence'), time: '2 hours ago', icon: Award },
    { type: 'started', course: t('dashboard.transmissionSystems'), time: '5 hours ago', icon: PlayCircle },
    { type: 'quiz', course: t('dashboard.tacticalOperations'), time: 'Yesterday', icon: Target }
  ];
  
  return (
    <div className="flex-1 overflow-y-auto bg-transparent">
      <div className="p-6 md:p-8 lg:p-10">
        {/* Top Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-between gap-4 mb-6 items-center">
            <div className="flex flex-col gap-2">
              <p className="text-gray-900 dark:text-white text-4xl font-black">{t('dashboard.welcome')}</p>
              <p className="text-gray-600 dark:text-[#8dcebd] text-base flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((stat, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl`}></div>
                <div className="relative bg-white dark:bg-[#204b40]/50 p-5 rounded-xl border border-gray-200 dark:border-primary/10 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 rounded-lg bg-gradient-to-r ${stat.color} bg-opacity-10`}>
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-green-500 dark:text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-[#8dcebd] font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Continue Learning */}
              <div className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <div className="relative bg-white dark:bg-[#204b40]/50 p-6 rounded-xl flex flex-col md:flex-row items-stretch justify-between gap-6 border border-gray-200 dark:border-primary/20 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-1 flex flex-col gap-4 justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <p className="text-primary text-xs font-bold uppercase tracking-wider">{t('dashboard.continueLearning')}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-900 dark:text-white text-2xl font-bold">{t('dashboard.militaryCorrespondence')}</p>
                      <p className="text-gray-600 dark:text-[#8dcebd] text-sm">{t('dashboard.module3')}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600 dark:text-[#8dcebd]">{t('dashboard.progress')}</span>
                            <span className="text-primary font-bold">45%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-[#2e6b5b]/50 rounded-full h-2">
                            <div className="bg-gradient-to-r from-primary to-cyan-500 h-2 rounded-full transition-all duration-500" style={{width: '45%'}}></div>
                          </div>
                        </div>
                        <div className="text-gray-600 dark:text-[#8dcebd] text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          25 {t('dashboard.timeLeft')}
                        </div>
                      </div>
                    </div>
                    <Link 
                      to="/courses/military-correspondence-fundamentals"
                      className="inline-flex items-center gap-2 rounded-lg h-11 px-6 bg-gradient-to-r from-primary to-cyan-500 text-[#0f241e] text-sm font-bold hover:shadow-lg hover:shadow-primary/50 transition-all w-fit group"
                    >
                      <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>{t('dashboard.startLesson')}</span>
                    </Link>
                  </div>
                  <div className="relative w-full md:w-64 h-48 md:h-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg"></div>
                    <div className="relative w-full h-full bg-center bg-no-repeat bg-cover rounded-lg" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_wJ0dVhmbb5-_5mu9xUo5bb225wjYmWyWmRWfv3S_E8bnOY7BX24c6iuuqFnHOwW-iPtiaIClOKELn8Qz3_9IkFGgtPNb3nQF9EC_ByA9BtSk7Ors45_D75brlEP_AGNhrawIQo4CMECSJXbCqP6aDNAxKRPvsiE_fBhtSZOz4dO25nZwKApHREgg5jzmi-2dzziJ_WlSoohAwIeiewbM_7vYFkncSot85MQcj0ObtPaFbb_ytG5hwT99-p2Bxs8AG8gBy2cNER4')`}}></div>
                  </div>
                </div>
              </div>

              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900 dark:text-white text-2xl font-bold">{t('dashboard.myCourses')}</h2>
                  <button className="text-primary text-sm font-semibold hover:underline">{t('dashboard.viewAll')} →</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {/* Course Card 1 - Enhanced */}
                  {[
                    { name: t('dashboard.tacticalOperations'), progress: 65, img: 'AB6AXuBejzEIEAq9a06rIhDVex0Quim1axsZP9SGj7mj5R9R98kMlDetin7tgMSGEJAyzGKomCQg-I_vPhx_kqtfkgP0xjfoCCPGUtcAUVmSu6wstrQTeFICDeAnnS_drJq8l-o172t3_1GJkQDnH92nHjWtVuhXzc1uxxN_nLrdoPnu2nf1W24I240SBKcsuXyu4Z3JH2Vv91lHb4R7PSrYzr5s_Hmw24ZcsK2k-40fDuBLx0yUoDMmeKTzMpmAzF1Uc-aETXkxNlK6BrE', lessons: 24, duration: '6h 30m' },
                    { name: t('dashboard.transmissionSystems'), progress: 30, img: 'AB6AXuBGHlTTG6limhppoSZE9WTUIhxp3ZprvpJCACYeC5tBqypq6G9ds3M2Ut_c3IuvL8jm5eblU-WSSK_S2lEVBUldh3vF6eTg2F6XHUMYfTrzf2N-evOXn_CsvDHDzrScFqLxMv3yZD-t_KePPuWrpEAUrPqRZlgLDWOCwGDKVz83rZeg60bAL0SEutxMlQm9n_d48rFWly5CntyK2ncOK-G5OwNryQXSRyIxpmkmjlA_OHxa3_YclslvuML5yrqJsn76Q3UW6NeIisU', lessons: 18, duration: '4h 15m' },
                    { name: t('dashboard.militaryLeadership'), progress: 95, img: 'AB6AXuAA3ylYRGF-3k3mmCOA6l_1E7oCNLJfirmlLp4T8gOZ4Q0qBgYN1_1Hsvc74GsW8TAK1TuJgBc7c1_3WKImu1BJssaXMCdqd6YsDVBZK7Xh09XOkw9IpYevqMWCxcqWv9bpj4Qlmrb0Da4rNrVl9ca2W0Xveu_4W1lH8DVd1loo2OwngHJtzMRYO_Iw-oJyBYIiLBlIHIExaeCh0SLOEV1Qu24kcjTfiT0R475YjLHV7mJWyZPtULT8SispuFBUq5YWjx59YP22Nu8', lessons: 32, duration: '8h 45m' }
                  ].map((course, index) => (
                    <div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative bg-white dark:bg-[#204b40]/50 rounded-xl border border-gray-200 dark:border-primary/10 shadow-md hover:shadow-xl transition-all overflow-hidden">
                        <div className="relative w-full aspect-video overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                          <div 
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full bg-center bg-no-repeat bg-cover" 
                            style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/${course.img}')`}}
                          ></div>
                          <div className="absolute bottom-3 left-3 z-20 flex gap-2">
                            <span className="text-xs bg-primary/90 text-[#0f241e] px-2 py-1 rounded-md font-bold">
                              {course.lessons} lessons
                            </span>
                            <span className="text-xs bg-white/90 dark:bg-black/50 text-gray-900 dark:text-white px-2 py-1 rounded-md font-bold">
                              {course.duration}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 flex flex-col gap-3">
                          <p className="text-gray-900 dark:text-white text-base font-bold group-hover:text-primary transition-colors">{course.name}</p>
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-4 justify-between items-center">
                              <p className="text-gray-600 dark:text-[#8dcebd] text-xs font-medium">{t('dashboard.progress')}</p>
                              <p className="text-primary text-sm font-bold">{course.progress}%</p>
                            </div>
                            <div className="relative rounded-full bg-gray-200 dark:bg-[#2e6b5b]/50 h-2 overflow-hidden">
                              <div 
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                className="h-2 rounded-full bg-gradient-to-r from-primary to-cyan-500"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-gray-900 dark:text-white text-2xl font-bold pb-6 pt-8">{t('dashboard.recommended')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: t('dashboard.introductionToEnglish'), desc: 'Learn English fundamentals for professional military communication', img: 'AB6AXuDJnQSntsKgGvfprT3KwWOpcQMyst_d0KpDTtIXnSLhP6bHIapzvX4R64HNQOk-nzxzf-ndzibsFIWiSV9Conm39mJQbSRDZ_ie5Yu95rxDkVs7fOS7OJ7DmA4_TYfeph3WhOf0srzsLIh6jDUYHvXl9t5BTxXWk09XSfCMEDOcc7SxzzRg0m29HyPDV5RoiyaDzJwsOL591B2FTIUjfXfWEF1IKfrqqA8kmprtJ6ptMlDgMg9Y0JjMVBGjbW4uiS0TwikFuB1axaE', color: 'from-blue-500 to-cyan-500' },
                    { title: 'IGTD Training Course', desc: 'Comprehensive IGTD training for modern military operations', img: 'AB6AXuB18BtHcD7QHMBMbjnO-erJU2-JGNd5qMuy-rAqWDYvWGaaJP1aLhaUbPAz5k9qlcRhTHNTnaO2iePP9a7J7DHW-0Pb84fNF3ENUxN0HeoCGKLynSSt_f_pxgWw7NB6GN9eO2LMKQ8ff1VRg1KlohZ8MWmSOFBCpGK671o2uROpQDklDQ_Yc8LZiHDk84sFyYlBlzrv_g25cZrYyBpE1clb7CI7GKV8NXlOCgyC3jpr257T6H6y5uLtGefx6D0iX4S75khVDGceQFQ', color: 'from-purple-500 to-pink-500' }
                  ].map((item, index) => (
                    <div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ y: -3 }}
                      className="group cursor-pointer"
                    >
                      <div className="bg-white dark:bg-[#204b40]/50 p-4 rounded-xl flex items-center gap-4 border border-gray-200 dark:border-primary/10 shadow-md hover:shadow-lg transition-all">
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 rounded-lg`}></div>
                          <div className="relative w-full h-full bg-center bg-no-repeat bg-cover rounded-lg" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/${item.img}')`}}></div>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                          <p className="text-gray-900 dark:text-white text-base font-bold group-hover:text-primary transition-colors">{item.title}</p>
                          <p className="text-gray-600 dark:text-[#8dcebd] text-sm line-clamp-2">{item.desc}</p>
                          <a 
                            whileHover={{ x: 3 }}
                            className="text-primary text-sm font-bold hover:underline flex items-center gap-1" 
                            href="#"
                          >
                            {t('dashboard.learnMore')} →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:col-span-1 flex flex-col gap-6">
              {/* Recent Activity */}
              <div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-[#204b40]/50 p-6 rounded-xl border border-gray-200 dark:border-primary/10 shadow-lg"
              >
                <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <activity.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{activity.course}</p>
                        <p className="text-xs text-gray-600 dark:text-[#8dcebd]">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Challenges - Enhanced */}
              <div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-[#204b40]/50 p-6 rounded-xl border border-gray-200 dark:border-primary/10 shadow-lg"
              >
                <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-4">{t('dashboard.upcomingChallenges')}</h3>
                <ul className="flex flex-col gap-3">
                  <li 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/20"
                  >
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-2.5">
                      <span className="material-symbols-outlined text-lg">quiz</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 dark:text-white font-semibold text-sm">{t('dashboard.quiz')}</p>
                      <p className="text-gray-600 dark:text-[#8dcebd] text-xs">{t('dashboard.quizDue')}</p>
                    </div>
                    <a 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-primary text-xs font-bold hover:underline px-3 py-1 bg-primary/10 rounded-md" 
                      href="#"
                    >{t('dashboard.start')}</a>
                  </li>
                  
                  <li 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg p-2.5">
                      <span className="material-symbols-outlined text-lg">code</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 dark:text-white font-semibold text-sm">{t('dashboard.codingChallenge')}</p>
                      <p className="text-gray-600 dark:text-[#8dcebd] text-xs">{t('dashboard.codingDue')}</p>
                    </div>
                    <a 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-primary text-xs font-bold hover:underline px-3 py-1 bg-primary/10 rounded-md" 
                      href="#"
                    >{t('dashboard.view')}</a>
                  </li>
                  
                  <li 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20"
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-2.5">
                      <span className="material-symbols-outlined text-lg">assignment</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 dark:text-white font-semibold text-sm">{t('dashboard.finalProject')}</p>
                      <p className="text-gray-600 dark:text-[#8dcebd] text-xs">{t('dashboard.projectDue')}</p>
                    </div>
                    <a 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-primary text-xs font-bold hover:underline px-3 py-1 bg-primary/10 rounded-md" 
                      href="#"
                    >{t('dashboard.view')}</a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>

        {/* AI Chat Component */}
        <AIChat />
      </div>
  
  );
};

export default StudentDashboard;


