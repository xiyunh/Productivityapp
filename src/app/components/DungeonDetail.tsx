import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Flame, CheckCircle2, Circle, Swords, TrendingUp } from 'lucide-react';
import { GlassPanel } from './GlassPanel';
import { recordCompletion } from './HabitCalendar';

interface Subtask {
  id: string;
  name: string;
  completed: boolean;
}

interface Quest {
  id: string;
  name: string;
  difficulty: 'D' | 'C' | 'B' | 'A' | 'S';
  type: 'daily' | 'weekly' | 'dungeon';
  rewards: {
    xp: number;
    stats?: string[];
    title?: string;
  };
  timeLeft?: string;
  description: string;
  subtasks?: Subtask[];
}

interface DungeonDetailProps {
  quest: Quest;
  onClose: () => void;
}

const difficultyColors = {
  D: '#22c55e',
  C: '#3b82f6',
  B: '#a855f7',
  A: '#f59e0b',
  S: '#ef4444'
};

export function DungeonDetail({ quest, onClose }: DungeonDetailProps) {
  const [subtasks, setSubtasks] = useState<Subtask[]>(quest.subtasks || []);
  
  const completedCount = subtasks.filter(st => st.completed).length;
  const totalCount = subtasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const toggleSubtask = (id: string) => {
    setSubtasks(prev =>
      prev.map(st => st.id === id ? { ...st, completed: !st.completed } : st)
    );
  };

  const handleCompleteQuest = () => {
    if (progress === 100) {
      recordCompletion('dungeon');
      // Show success feedback
      alert('Dungeon completed! Streak updated!');
      onClose();
    }
  };

  const difficultyColor = difficultyColors[quest.difficulty];

  return (
    <AnimatePresence>
      <motion.div
        className="dungeon-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="dungeon-modal-content"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="dungeon-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dungeon Header */}
          <div className="dungeon-modal-header">
            <div 
              className="dungeon-modal-difficulty"
              style={{ 
                background: `linear-gradient(135deg, ${difficultyColor}88, ${difficultyColor})`,
                boxShadow: `0 0 20px ${difficultyColor}66`
              }}
            >
              {quest.difficulty}
            </div>
            <div className="dungeon-modal-title-section">
              <h2 className="dungeon-modal-title">{quest.name}</h2>
              <p className="dungeon-modal-description">{quest.description}</p>
            </div>
          </div>

          {/* Progress Section */}
          {totalCount > 0 && (
            <GlassPanel className="dungeon-progress-section">
              <div className="dungeon-progress-header">
                <div className="dungeon-progress-label">
                  <TrendingUp className="w-4 h-4" />
                  <span>Progress</span>
                </div>
                <div className="dungeon-progress-count">
                  {completedCount}/{totalCount}
                </div>
              </div>
              <div className="dungeon-progress-bar-bg">
                <motion.div
                  className="dungeon-progress-bar-fill"
                  style={{ 
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${difficultyColor}, ${difficultyColor}cc)`,
                    boxShadow: `0 0 15px ${difficultyColor}88`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="dungeon-progress-percentage">{Math.round(progress)}% Complete</p>
            </GlassPanel>
          )}

          {/* Subtasks List */}
          {totalCount > 0 && (
            <GlassPanel className="dungeon-subtasks-section">
              <h3 className="dungeon-subtasks-title">
                <Swords className="w-5 h-5" style={{ color: difficultyColor }} />
                Dungeon Challenges
              </h3>
              <div className="dungeon-subtasks-list">
                {subtasks.map((subtask, index) => (
                  <motion.div
                    key={subtask.id}
                    className={`dungeon-subtask-item ${subtask.completed ? 'completed' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => toggleSubtask(subtask.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="dungeon-subtask-checkbox">
                      {subtask.completed ? (
                        <CheckCircle2 
                          className="w-5 h-5" 
                          style={{ color: difficultyColor }}
                        />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                    <span className="dungeon-subtask-name">{subtask.name}</span>
                  </motion.div>
                ))}
              </div>
            </GlassPanel>
          )}

          {/* Rewards Section */}
          <GlassPanel className="dungeon-rewards-section">
            <h3 className="dungeon-rewards-title">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Rewards
            </h3>
            <div className="dungeon-rewards-grid">
              <div className="dungeon-reward-card xp">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <div className="dungeon-reward-amount">{quest.rewards.xp}</div>
                <div className="dungeon-reward-label">XP</div>
              </div>
              {quest.rewards.stats && quest.rewards.stats.map((stat, i) => (
                <div key={i} className="dungeon-reward-card stat">
                  <Flame className="w-6 h-6 text-orange-400" />
                  <div className="dungeon-reward-amount">{stat}</div>
                  <div className="dungeon-reward-label">Stat Boost</div>
                </div>
              ))}
            </div>
            {quest.rewards.title && (
              <div 
                className="dungeon-title-reward"
                style={{ 
                  borderColor: `${difficultyColor}44`,
                  background: `linear-gradient(135deg, ${difficultyColor}11, ${difficultyColor}05)`
                }}
              >
                <Trophy className="w-5 h-5" style={{ color: difficultyColor }} />
                <div>
                  <div className="dungeon-title-label">Title Unlocked</div>
                  <div className="dungeon-title-name" style={{ color: difficultyColor }}>
                    {quest.rewards.title}
                  </div>
                </div>
              </div>
            )}
          </GlassPanel>

          {/* Action Button */}
          <motion.button
            className="dungeon-action-button"
            style={{
              background: `linear-gradient(135deg, ${difficultyColor}33, ${difficultyColor}66)`,
              borderColor: difficultyColor,
              boxShadow: `0 4px 20px ${difficultyColor}44`
            }}
            whileHover={{ scale: 1.02, boxShadow: `0 6px 30px ${difficultyColor}66` }}
            whileTap={{ scale: 0.98 }}
            disabled={progress !== 100}
            onClick={handleCompleteQuest}
          >
            {progress === 100 ? 'Complete Dungeon!' : progress > 0 ? 'Continue Quest' : 'Begin Dungeon'}
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}