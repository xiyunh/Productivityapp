import React, { useState } from 'react';
import { GlassPanel } from './GlassPanel';
import { motion } from 'motion/react';
import { Swords, Target, Trophy, Clock, Flame } from 'lucide-react';
import { DungeonDetail } from './DungeonDetail';

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

const quests: Quest[] = [
  {
    id: 'morning',
    name: 'Morning Momentum',
    difficulty: 'D',
    type: 'daily',
    description: 'Complete morning routine before 8 AM',
    rewards: { xp: 50, stats: ['+2 Discipline'] },
    timeLeft: '6h 32m'
  },
  {
    id: 'workout',
    name: 'Physical Training',
    difficulty: 'C',
    type: 'daily',
    description: 'Complete 30-minute workout',
    rewards: { xp: 75, stats: ['+3 Stamina', '+1 Discipline'] },
    timeLeft: '6h 32m'
  },
  {
    id: 'deepwork',
    name: 'Deep Work Session',
    difficulty: 'B',
    type: 'daily',
    description: '2 hours of focused work',
    rewards: { xp: 100, stats: ['+4 Discipline', '+2 Intelligence'] },
    timeLeft: '6h 32m'
  },
  {
    id: 'weekly-boss',
    name: 'Weekend Warrior',
    difficulty: 'A',
    type: 'weekly',
    description: 'Complete all daily quests for 7 days',
    rewards: { xp: 500, stats: ['+10 Discipline'], title: 'Relentless' },
    timeLeft: '3d 14h'
  },
  {
    id: 'discipline-dungeon',
    name: 'Discipline Dungeon',
    difficulty: 'S',
    type: 'dungeon',
    description: '30-day streak of perfect routine execution',
    rewards: { xp: 2000, stats: ['+25 Discipline', '+10 All Stats'], title: 'Unbreakable Will' },
    timeLeft: 'Active',
    subtasks: [
      { id: 'dd-1', name: 'Wake up before 6 AM for 30 days', completed: false },
      { id: 'dd-2', name: 'Complete morning routine daily', completed: false },
      { id: 'dd-3', name: 'No missed workouts for 30 days', completed: false },
      { id: 'dd-4', name: 'Daily meditation practice', completed: false },
      { id: 'dd-5', name: 'Track every day in journal', completed: false }
    ]
  },
  {
    id: 'academic-boss',
    name: 'Academic Ascension',
    difficulty: 'A',
    type: 'dungeon',
    description: 'Complete 50 hours of learning',
    rewards: { xp: 1000, stats: ['+15 Intelligence', '+5 Discipline'] },
    timeLeft: 'Available',
    subtasks: [
      { id: 'aa-1', name: 'Study 2 hours daily for 25 days', completed: false },
      { id: 'aa-2', name: 'Complete 10 practice problems', completed: false },
      { id: 'aa-3', name: 'Finish 3 online courses', completed: false },
      { id: 'aa-4', name: 'Create study notes summary', completed: false }
    ]
  },
  {
    id: 'business-boss',
    name: 'Entrepreneurial Conquest',
    difficulty: 'S',
    type: 'dungeon',
    description: 'Launch and maintain a revenue stream',
    rewards: { xp: 3000, stats: ['+30 Wealth', '+15 Influence', '+10 Discipline'] },
    timeLeft: 'Available',
    subtasks: [
      { id: 'ec-1', name: 'Validate business idea with 10 customers', completed: false },
      { id: 'ec-2', name: 'Build MVP product', completed: false },
      { id: 'ec-3', name: 'Acquire first 5 paying customers', completed: false },
      { id: 'ec-4', name: 'Generate $1000 in revenue', completed: false },
      { id: 'ec-5', name: 'Maintain operations for 30 days', completed: false },
      { id: 'ec-6', name: 'Create marketing strategy', completed: false }
    ]
  }
];

const difficultyColors = {
  D: '#22c55e',
  C: '#3b82f6',
  B: '#a855f7',
  A: '#f59e0b',
  S: '#ef4444'
};

export function DungeonsScreen() {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  
  const dailyQuests = quests.filter(q => q.type === 'daily');
  const weeklyQuests = quests.filter(q => q.type === 'weekly');
  const dungeons = quests.filter(q => q.type === 'dungeon');

  const renderQuest = (quest: Quest, index: number) => (
    <motion.div
      key={quest.id}
      className="quest-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      style={{
        borderColor: `${difficultyColors[quest.difficulty]}44`,
        boxShadow: `0 4px 20px ${difficultyColors[quest.difficulty]}22`
      }}
    >
      <div className="quest-header">
        <div className="quest-difficulty" style={{ 
          background: `linear-gradient(135deg, ${difficultyColors[quest.difficulty]}88, ${difficultyColors[quest.difficulty]})`,
          boxShadow: `0 0 15px ${difficultyColors[quest.difficulty]}66`
        }}>
          {quest.difficulty}
        </div>
        <div className="flex-1">
          <h3 className="quest-name">{quest.name}</h3>
          <p className="quest-description">{quest.description}</p>
        </div>
      </div>

      <div className="quest-rewards">
        <div className="reward-item">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span>{quest.rewards.xp} XP</span>
        </div>
        {quest.rewards.stats && quest.rewards.stats.map((stat, i) => (
          <div key={i} className="reward-item">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>{stat}</span>
          </div>
        ))}
        {quest.rewards.title && (
          <div className="reward-item">
            <Trophy className="w-4 h-4 text-purple-400" />
            <span className="reward-title">{quest.rewards.title}</span>
          </div>
        )}
      </div>

      {quest.timeLeft && (
        <div className="quest-timer">
          <Clock className="w-4 h-4" />
          <span>{quest.timeLeft}</span>
        </div>
      )}

      <motion.button
        className="quest-button"
        style={{ 
          background: `linear-gradient(135deg, ${difficultyColors[quest.difficulty]}33, ${difficultyColors[quest.difficulty]}66)`,
          borderColor: difficultyColors[quest.difficulty]
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => quest.type === 'dungeon' && setSelectedQuest(quest)}
      >
        {quest.type === 'dungeon' ? 'Enter Dungeon' : 'Start Quest'}
      </motion.button>
    </motion.div>
  );

  return (
    <div className="dungeons-screen">
      {/* Dungeon Detail Modal */}
      {selectedQuest && (
        <DungeonDetail 
          quest={selectedQuest} 
          onClose={() => setSelectedQuest(null)} 
        />
      )}

      <GlassPanel className="mb-6">
        <h1 className="page-title flex items-center gap-2">
          <Swords className="w-7 h-7 text-red-400" />
          Challenges
        </h1>
        <p className="page-subtitle">Test yourself and earn powerful rewards</p>
      </GlassPanel>

      {/* Daily Quests */}
      <GlassPanel className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            Daily Quests
          </h2>
          <div className="quest-counter">{dailyQuests.length}/3</div>
        </div>
        <div className="space-y-4">
          {dailyQuests.map((quest, index) => renderQuest(quest, index))}
        </div>
      </GlassPanel>

      {/* Weekly Boss */}
      <GlassPanel className="mb-6">
        <h2 className="section-title flex items-center gap-2 mb-4">
          <Swords className="w-5 h-5 text-orange-400" />
          Weekly Boss Battle
        </h2>
        <div className="space-y-4">
          {weeklyQuests.map((quest, index) => renderQuest(quest, index))}
        </div>
      </GlassPanel>

      {/* Major Dungeons */}
      <GlassPanel>
        <h2 className="section-title flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-purple-400" />
          Major Life Dungeons
        </h2>
        <div className="space-y-4">
          {dungeons.map((quest, index) => renderQuest(quest, index))}
        </div>
      </GlassPanel>
    </div>
  );
}
