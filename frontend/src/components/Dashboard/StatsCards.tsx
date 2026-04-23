import { motion } from 'framer-motion';
import { Database, BarChart3, Trophy, Activity } from 'lucide-react';

interface Props {
  samples: number;
  features: number;
  bestAccuracy: number | null;
  predictions: number;
}

const cards = [
  { key: 'samples', label: 'Dataset Samples', icon: Database, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { key: 'features', label: 'Features', icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { key: 'bestAccuracy', label: 'Best Accuracy', icon: Trophy, color: 'text-teal-500', bg: 'bg-teal-500/10' },
  { key: 'predictions', label: 'Predictions Made', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-500/10' },
] as const;

export default function StatsCards({ samples, features, bestAccuracy, predictions }: Props) {
  const values: Record<string, string> = {
    samples: samples.toLocaleString(),
    features: features.toString(),
    bestAccuracy: bestAccuracy ? `${(bestAccuracy * 100).toFixed(1)}%` : '—',
    predictions: predictions.toString(),
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-5 flex items-center gap-4"
        >
          <div className={`p-3 rounded-xl ${card.bg}`}>
            <card.icon size={24} className={card.color} />
          </div>
          <div>
            <p className="text-2xl font-bold">{values[card.key]}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
