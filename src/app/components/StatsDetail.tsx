import React from 'react';
import { GlassPanel } from './GlassPanel';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';

interface StatsDetailProps {
  statName: string;
  onBack: () => void;
}

const statDetails: Record<string, any> = {
  discipline: {
    title: 'Discipline',
    color: '#0ea5e9',
    description: 'Your ability to maintain focus, follow through on commitments, and resist distractions. The foundation of all progress.',
    todayXP: 45,
    weekXP: 312,
    increaseActions: [
      'Complete morning routine',
      'Stick to planned schedule',
      'Resist immediate gratification',
      'Complete difficult tasks first'
    ],
    decreaseActions: [
      'Skip planned activities',
      'Excessive social media',
      'Breaking commitments',
      'Procrastination'
    ],
    milestones: [
      { level: 25, effect: 'Unlock: Morning Momentum', achieved: true },
      { level: 50, effect: 'Passive: +5% XP to all stats', achieved: true },
      { level: 75, effect: 'Unlock: Unbreakable Will', achieved: true },
      { level: 100, effect: 'Title: "Relentless"', achieved: false }
    ]
  },
  intelligence: {
    title: 'Intelligence',
    color: '#a855f7',
    description: 'Cognitive ability, strategic thinking, and capacity for learning. Influences decision quality and problem-solving.',
    todayXP: 28,
    weekXP: 198,
    increaseActions: [
      'Read educational content',
      'Solve complex problems',
      'Learn new skills',
      'Engage in strategic games'
    ],
    decreaseActions: [
      'Passive content consumption',
      'Avoiding challenges',
      'Mental laziness'
    ],
    milestones: [
      { level: 25, effect: 'Unlock: Quick Learner', achieved: true },
      { level: 50, effect: 'Passive: -20% time for new skills', achieved: true },
      { level: 75, effect: 'Unlock: Strategic Mind', achieved: false },
      { level: 100, effect: 'Title: "The Strategist"', achieved: false }
    ]
  },
  charisma: {
    title: 'Charisma',
    color: '#f59e0b',
    description: 'Personal magnetism, social influence, and ability to connect with others. Opens doors and creates opportunities.',
    todayXP: 22,
    weekXP: 156,
    increaseActions: [
      'Meaningful conversations',
      'Public speaking practice',
      'Help others genuinely',
      'Practice active listening'
    ],
    decreaseActions: [
      'Social isolation',
      'Being self-absorbed',
      'Poor communication'
    ],
    milestones: [
      { level: 25, effect: 'Unlock: First Impression', achieved: true },
      { level: 50, effect: 'Passive: +10% Influence gain', achieved: true },
      { level: 75, effect: 'Unlock: Magnetic Presence', achieved: false },
      { level: 100, effect: 'Title: "Unignorable"', achieved: false }
    ]
  }
};

export function StatsDetail({ statName, onBack }: StatsDetailProps) {
  const detail = statDetails[statName] || statDetails.discipline;

  return (
    <div className="stats-detail">
      <button onClick={onBack} className="back-button">
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <GlassPanel className="mb-6">
        <div className="stat-header" style={{ borderLeftColor: detail.color }}>
          <h1 className="stat-detail-title">{detail.title}</h1>
          <p className="stat-description">{detail.description}</p>
        </div>

        <div className="xp-summary">
          <div className="xp-card">
            <div className="xp-value">+{detail.todayXP}</div>
            <div className="xp-label">Today</div>
          </div>
          <div className="xp-card">
            <div className="xp-value">+{detail.weekXP}</div>
            <div className="xp-label">This Week</div>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="mb-6">
        <h2 className="section-title mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" style={{ color: '#22c55e' }} />
          Increases From
        </h2>
        <ul className="action-list">
          {detail.increaseActions.map((action: string, index: number) => (
            <motion.li
              key={index}
              className="action-item increase"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {action}
            </motion.li>
          ))}
        </ul>
      </GlassPanel>

      <GlassPanel className="mb-6">
        <h2 className="section-title mb-4 flex items-center gap-2">
          <TrendingDown className="w-5 h-5" style={{ color: '#ef4444' }} />
          Decreases From
        </h2>
        <ul className="action-list">
          {detail.decreaseActions.map((action: string, index: number) => (
            <motion.li
              key={index}
              className="action-item decrease"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {action}
            </motion.li>
          ))}
        </ul>
      </GlassPanel>

      <GlassPanel>
        <h2 className="section-title mb-4">Milestones</h2>
        <div className="space-y-3">
          {detail.milestones.map((milestone: any, index: number) => (
            <motion.div
              key={index}
              className={`milestone-item ${milestone.achieved ? 'achieved' : 'locked'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <CheckCircle className={`w-5 h-5 mt-0.5 ${milestone.achieved ? 'text-emerald-400' : 'text-gray-600'}`} />
                <div className="flex-1">
                  <div className="milestone-level">Level {milestone.level}</div>
                  <div className="milestone-effect">{milestone.effect}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
