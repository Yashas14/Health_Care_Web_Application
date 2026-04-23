import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, FileText, Users, Cpu, Database, BarChart3 } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="p-3 rounded-2xl bg-blue-500/10">
          <BookOpen size={32} className="text-blue-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">About This Project</h1>
          <p className="text-gray-500 dark:text-gray-400">
            IEEE Published Research & Technical Details
          </p>
        </div>
      </motion.div>

      {/* Paper Citation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-8 border-l-4 border-teal-500"
      >
        <div className="flex items-center gap-2 mb-4">
          <FileText size={20} className="text-teal-500" />
          <h2 className="text-xl font-bold">IEEE Publication</h2>
        </div>

        <h3 className="text-lg font-semibold mb-3 leading-relaxed">
          "Exploratory Analysis of Heart Attack and Breast Cancer Early Stage Prediction:
          Revolutionizing Patient-Centric Healthcare with Technology"
        </h3>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p><strong>Published in:</strong> IEEE Xplore Digital Library</p>
          <p><strong>DOI:</strong>{' '}
            <a
              href="https://ieeexplore.ieee.org/document/10941411"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 hover:text-teal-400 inline-flex items-center gap-1"
            >
              10.1109/ICCSP60870.2024.10941411 <ExternalLink size={14} />
            </a>
          </p>
          <p><strong>Conference:</strong> International Conference on Communication Signal Processing (ICCSP 2024)</p>
        </div>
      </motion.div>

      {/* Abstract */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-8"
      >
        <h2 className="text-xl font-bold mb-4">Abstract Summary</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          This research presents an exploratory analysis of machine learning techniques for early-stage
          prediction of heart attack and breast cancer. The study evaluates five widely-used classification
          algorithms — Logistic Regression, K-Nearest Neighbors (KNN), Support Vector Machine (SVM),
          Random Forest, and XGBoost — on standard clinical datasets from UCI/Kaggle repositories.
          The models are compared across multiple evaluation metrics including Accuracy, Precision, Recall,
          F1-Score, and Mean Squared Error. PCA-based 2D visualizations provide intuitive understanding
          of data separability. The application includes a user-facing prediction interface with custom
          input capability, enabling patient-centric healthcare decision support.
        </p>
      </motion.div>

      {/* Methodology */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-8"
      >
        <h2 className="text-xl font-bold mb-6">Methodology</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 mt-1">
                <Database size={18} className="text-blue-500" />
              </div>
              <div>
                <h4 className="font-semibold">Data Collection</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Heart Disease (UCI) — 303 samples, 13 features<br />
                  Breast Cancer Wisconsin — 569 samples, 30 features
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 mt-1">
                <BarChart3 size={18} className="text-purple-500" />
              </div>
              <div>
                <h4 className="font-semibold">Preprocessing</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  StandardScaler normalization, LabelEncoder for categoricals,
                  80/20 train-test split, PCA for visualization
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-teal-500/10 mt-1">
                <Cpu size={18} className="text-teal-500" />
              </div>
              <div>
                <h4 className="font-semibold">ML Classifiers</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Logistic Regression, KNN, SVM, Random Forest, XGBoost —
                  all with sklearn default hyperparameters
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10 mt-1">
                <Users size={18} className="text-orange-500" />
              </div>
              <div>
                <h4 className="font-semibold">Evaluation</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Accuracy, Precision, Recall, F1-Score, MSE,
                  Confusion Matrix, PCA visualization, execution time tracking
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tech stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-8"
      >
        <h2 className="text-xl font-bold mb-4">Technology Stack (v2.0)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts',
            'FastAPI', 'scikit-learn', 'XGBoost', 'SQLite', 'Pydantic', 'Vite',
            'Lucide Icons',
          ].map(tech => (
            <div key={tech} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-navy-800 text-sm font-medium text-center">
              {tech}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20"
      >
        <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
          ⚠️ <strong>Disclaimer:</strong> This application is for educational and research demonstration
          purposes only. It is NOT intended to be used as a medical diagnosis tool. Always consult
          qualified healthcare professionals for medical decisions.
        </p>
      </motion.div>
    </div>
  );
}
