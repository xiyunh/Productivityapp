import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StatBarProps {
  icon: LucideIcon;
  label: string;
  value: number;
  maxValue: number;
  color: string;
  emphasized?: boolean;
  onClick?: () => void;
}

export function StatBar({ icon: Icon, label, value, maxValue, color, emphasized = false, onClick }: StatBarProps) {
  const percentage = (value / maxValue) * 100;

  return (
    <motion.div
      className={`stat-bar-container ${emphasized ? 'emphasized' : ''}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color }} />
          <span className="stat-label">{label}</span>
        </div>
        <span className="stat-value">{value}/{maxValue}</span>
      </div>
      <div className="stat-bar-bg">
        <motion.div
          className="stat-bar-fill"
          style={{ 
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: emphasized ? `0 0 10px ${color}` : `0 0 5px ${color}66`
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
