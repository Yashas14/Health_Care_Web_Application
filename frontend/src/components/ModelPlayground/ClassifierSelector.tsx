import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CLASSIFIERS, type ClassifierKey } from '@/types';
import { TrendingUp, Users, Maximize2, TreePine, Zap } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Users, Maximize2, TreePine, Zap,
};

interface Props {
  selected: ClassifierKey;
  onSelect: (key: ClassifierKey) => void;
  loading?: boolean;
  onTrain?: () => void;
}

export default function ClassifierSelector({ selected, onSelect, loading, onTrain }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Classifier</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {CLASSIFIERS.map(clf => {
          const Icon = iconMap[clf.icon] || Zap;
          const isActive = selected === clf.key;
          return (
            <motion.button
              key={clf.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(clf.key)}
              className={cn(
                'glass-card p-4 text-left transition-all duration-200 cursor-pointer border-2',
                isActive
                  ? 'border-teal-500 shadow-teal-500/20 shadow-lg'
                  : 'border-transparent hover:border-gray-300 dark:hover:border-navy-600'
              )}
            >
              <div className={cn(
                'p-2 rounded-lg w-fit mb-2',
                isActive ? 'bg-teal-500/10' : 'bg-gray-100 dark:bg-navy-700'
              )}>
                <Icon size={20} className={isActive ? 'text-teal-500' : 'text-gray-500'} />
              </div>
              <p className="font-semibold text-sm">{clf.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{clf.description}</p>
            </motion.button>
          );
        })}
      </div>
      {onTrain && (
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onTrain}
          disabled={loading}
          className="btn-primary flex items-center gap-2 mt-4"
        >
          {loading ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
              Training...
            </>
          ) : (
            'Train Model'
          )}
        </motion.button>
      )}
    </div>
  );
}
