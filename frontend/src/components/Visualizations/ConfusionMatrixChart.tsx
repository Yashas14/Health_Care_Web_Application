import type { ConfusionMatrixData } from '@/types';

interface Props {
  data: ConfusionMatrixData;
}

function getColor(value: number, max: number) {
  const intensity = max > 0 ? value / max : 0;
  const r = Math.round(0 + intensity * 0);
  const g = Math.round(100 + intensity * 91);
  const b = Math.round(120 + intensity * 46);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function ConfusionMatrixChart({ data }: Props) {
  const { matrix, labels } = data;
  const allValues = matrix.flat();
  const maxVal = Math.max(...allValues);

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Confusion Matrix</h3>
      <div className="flex flex-col items-center">
        {/* Header row */}
        <div className="flex ml-20">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-2 w-full text-center">
            Predicted
          </p>
        </div>
        <div className="flex ml-20 mb-1">
          {labels.map(label => (
            <div key={label} className="w-24 text-center text-xs font-medium text-gray-500 dark:text-gray-400">
              {label}
            </div>
          ))}
        </div>

        <div className="flex items-center">
          {/* Left label */}
          <div className="flex flex-col items-center mr-2 justify-center">
            <p
              className="text-xs text-gray-500 dark:text-gray-400 font-semibold"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Actual
            </p>
          </div>
          <div className="flex flex-col items-end mr-1 gap-1">
            {labels.map(label => (
              <div key={label} className="h-24 flex items-center">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
              </div>
            ))}
          </div>

          {/* Matrix cells */}
          <div className="flex flex-col gap-1">
            {matrix.map((row, i) => (
              <div key={i} className="flex gap-1">
                {row.map((val, j) => (
                  <div
                    key={j}
                    className="w-24 h-24 rounded-xl flex items-center justify-center text-white font-bold text-xl cursor-pointer transition-transform hover:scale-105 relative group"
                    style={{ backgroundColor: getColor(val, maxVal) }}
                  >
                    {val}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {labels[i]} → {labels[j]}: {val}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
