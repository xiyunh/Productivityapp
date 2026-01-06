import React from 'react';
import { GlassPanel } from './GlassPanel';
import { motion } from 'motion/react';
import { Trophy, TrendingUp, TrendingDown, Flame, Target, Sparkles } from 'lucide-react';

export function DailyReview() {
  const todayStats = {
    totalXP: 245,
    statsIncreased: [
      { name: 'Discipline', change: +5, color: '#0ea5e9' },
      { name: 'Intelligence', change: +3, color: '#a855f7' },
      { name: 'Stamina', change: +2, color: '#22c55e' }
    ],
    statsDecreased: [
      { name: 'Charisma', change: -1, color: '#f59e0b' }
    ],
    streaks: [
      { name: 'Morning Routine', days: 12, active: true },
      { name: 'Workout', days: 7, active: true },
      { name: 'Reading', days: 5, active: false }
    ],
    highlight: 'Completed Deep Work Session',
    improvement: 'More social interaction needed'
  };

  return (
    <div className="daily-review">
      <GlassPanel className="mb-6">
        <motion.div
          className="review-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Trophy className="w-10 h-10 text-yellow-400 mb-3" />
          <h1 className="page-title">Daily Review</h1>
          <p className="page-subtitle">Monday, January 5, 2026</p>
        </motion.div>
      </GlassPanel>

      {/* XP Earned */}
      <GlassPanel className="mb-6">
        <motion.div
          className="xp-earned-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <div className="xp-label">Experience Earned Today</div>
          <motion.div
            className="xp-amount"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            +{todayStats.totalXP}
          </motion.div>
          <div className="xp-sublabel">Keep up the momentum!</div>
        </motion.div>
      </GlassPanel>

      {/* Stats Changed */}
      <GlassPanel className="mb-6">
        <h2 className="section-title mb-4">Stat Changes</h2>
        
        {todayStats.statsIncreased.length > 0 && (
          <div className="mb-4">
            <div className="stat-change-label">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Increased</span>
            </div>
            <div className="space-y-2 mt-2">
              {todayStats.statsIncreased.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  className="stat-change-item positive"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="stat-change-name">{stat.name}</span>
                  <span className="stat-change-value positive" style={{ color: stat.color }}>
                    +{stat.change}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {todayStats.statsDecreased.length > 0 && (
          <div>
            <div className="stat-change-label">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span>Decreased</span>
            </div>
            <div className="space-y-2 mt-2">
              {todayStats.statsDecreased.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  className="stat-change-item negative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="stat-change-name">{stat.name}</span>
                  <span className="stat-change-value negative" style={{ color: stat.color }}>
                    {stat.change}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </GlassPanel>

      {/* Streaks */}
      <GlassPanel className="mb-6">
        <h2 className="section-title mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          Streaks
        </h2>
        <div className="space-y-3">
          {todayStats.streaks.map((streak, index) => (
            <motion.div
              key={streak.name}
              className={`streak-item ${streak.active ? 'active' : 'broken'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 flex-1">
                <Flame className={`w-5 h-5 ${streak.active ? 'text-orange-400' : 'text-gray-600'}`} />
                <div>
                  <div className="streak-name">{streak.name}</div>
                  <div className={`streak-days ${streak.active ? 'active' : 'broken'}`}>
                    {streak.days} days
                  </div>
                </div>
              </div>
              {!streak.active && (
                <span className="streak-broken-label">Broken</span>
              )}
            </motion.div>
          ))}
        </div>
      </GlassPanel>

      {/* Highlight & Improvement */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassPanel>
            <div className="review-card highlight">
              <Sparkles className="w-6 h-6 text-yellow-400 mb-2" />
              <div className="review-card-label">Today's Win</div>
              <div className="review-card-content">{todayStats.highlight}</div>
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassPanel>
            <div className="review-card improvement">
              <Target className="w-6 h-6 text-blue-400 mb-2" />
              <div className="review-card-label">Tomorrow's Focus</div>
              <div className="review-card-content">{todayStats.improvement}</div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>

      {/* System Message */}
      <GlassPanel>
        <motion.div
          className="system-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="system-message-text">
            "Every master was once a beginner. Every pro was once an amateur. Keep showing up."
          </div>
          <div className="system-message-signature">— The System</div>
        </motion.div>
      </GlassPanel>
    </div>
  );
}
