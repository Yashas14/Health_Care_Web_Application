import { motion } from 'framer-motion';
import { HeartPulse, Ribbon, FlaskConical, BookOpen, ArrowRight, Activity, Shield, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '17.9M', label: 'Deaths/year from CVD', icon: HeartPulse, color: 'text-red-500' },
  { value: '2.3M', label: 'Breast Cancer cases/year', icon: Ribbon, color: 'text-pink-500' },
  { value: '5', label: 'ML Classifiers Used', icon: Cpu, color: 'text-teal-500' },
  { value: '95%+', label: 'Model Accuracy', icon: Shield, color: 'text-blue-500' },
];

const features = [
  {
    title: 'Heart Attack Prediction',
    desc: 'Analyze 13 clinical features to assess heart attack risk using state-of-the-art ML classifiers.',
    icon: HeartPulse,
    to: '/heart-attack',
    color: 'from-red-500/20 to-red-600/5',
  },
  {
    title: 'Breast Cancer Detection',
    desc: 'Evaluate 30 tumor characteristics to predict malignancy with high accuracy.',
    icon: Ribbon,
    to: '/breast-cancer',
    color: 'from-pink-500/20 to-pink-600/5',
  },
  {
    title: 'Model Playground',
    desc: 'Compare all 5 classifiers side by side with interactive metrics and visualizations.',
    icon: FlaskConical,
    to: '/playground',
    color: 'from-teal-500/20 to-teal-600/5',
  },
  {
    title: 'IEEE Publication',
    desc: 'Based on a peer-reviewed paper published in IEEE Xplore conference proceedings.',
    icon: BookOpen,
    to: '/about',
    color: 'from-blue-500/20 to-blue-600/5',
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-teal-900 p-8 sm:p-12 text-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity size={20} className="text-teal-400" />
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-wider">
              Healthcare ML Platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Early Stage Prediction for{' '}
            <span className="bg-gradient-to-r from-teal-400 to-teal-200 bg-clip-text text-transparent">
              Heart Attack
            </span>{' '}
            &amp;{' '}
            <span className="bg-gradient-to-r from-pink-400 to-pink-200 bg-clip-text text-transparent">
              Breast Cancer
            </span>
          </h1>

          <p className="text-gray-300 text-lg mb-8 max-w-2xl">
            A patient-centric healthcare prediction system powered by 5 machine learning
            classifiers. Built on peer-reviewed research published in IEEE Xplore.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/heart-attack" className="btn-primary flex items-center gap-2">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/10 transition-colors"
            >
              Read the Paper
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <stat.icon size={28} className={`mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl sm:text-3xl font-extrabold">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Explore Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Link to={feat.to} className="block group">
                <div className={`glass-card p-6 bg-gradient-to-br ${feat.color} hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1`}>
                  <feat.icon size={32} className="text-teal-500 mb-3" />
                  <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feat.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-teal-500 font-semibold text-sm group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
