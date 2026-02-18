import React, { useState } from 'react';
import { GlassPanel } from './GlassPanel';
import { StatBar } from './StatBar';
import { HabitCalendar } from './HabitCalendar';
import { motion } from 'motion/react';
import {
  Heart,
  Zap,
  Activity,
  Target,
  Brain,
  MessageCircle,
  DollarSign,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface StatusWindowProps {
  onStatClick: (statName: string) => void;
  onHabitClick?: () => void;
}

export function StatusWindow({ onStatClick, onHabitClick }: StatusWindowProps) {
  const stats = {
    hp: { value: 85, max: 100, color: '#ef4444' },
    mp: { value: 70, max: 100, color: '#3b82f6' },
    stamina: { value: 65, max: 100, color: '#22c55e' },
    discipline: { value: 78, max: 100, color: '#0ea5e9', emphasized: true },
    intelligence: { value: 72, max: 100, color: '#a855f7' },
    charisma: { value: 68, max: 100, color: '#f59e0b' },
    wealth: { value: 45, max: 100, color: '#fbbf24' },
    influence: { value: 52, max: 100, color: '#ec4899' },
    attractiveness: { value: 75, max: 100, color: '#f472b6' }
  };

  const radarData = [
    { stat: 'Discipline', value: stats.discipline.value, fullMark: 100 },
    { stat: 'Intelligence', value: stats.intelligence.value, fullMark: 100 },
    { stat: 'Charisma', value: stats.charisma.value, fullMark: 100 },
    { stat: 'Wealth', value: stats.wealth.value, fullMark: 100 },
    { stat: 'Influence', value: stats.influence.value, fullMark: 100 },
    { stat: 'Attractiveness', value: stats.attractiveness.value, fullMark: 100 }
  ];

  return (
    <div className="status-window">
      {/* Habit Calendar - Prominently Featured */}
      <HabitCalendar compact onHabitClick={onHabitClick} />

      {/* Player Info */}
      <GlassPanel className="mb-6">
        <div className="text-center">
          <motion.div
            className="player-avatar"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <div className="avatar-ring">
              <div className="avatar-inner">S</div>
            </div>
          </motion.div>
          <h1 className="player-name">Shadow Monarch</h1>
          <div className="player-title">Unawakened</div>
          
          <div className="level-container">
            <div className="flex items-center justify-between mb-2">
              <span className="level-label">Level 1</span>
              <span className="level-xp">245 / 1000 XP</span>
            </div>
            <div className="level-bar-bg">
              <motion.div
                className="level-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: '24.5%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="rank-badge">
            <span className="rank-text">RANK</span>
            <span className="rank-letter">E</span>
          </div>
        </div>
      </GlassPanel>

      {/* Spider Chart */}
      <GlassPanel className="mb-6">
        <h2 className="section-title">Status Overview</h2>
        <div className="radar-chart-container">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#ffffff22" />
              <PolarAngleAxis 
                dataKey="stat" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fill: '#64748b', fontSize: 10 }}
              />
              <Radar
                name="Stats"
                dataKey="value"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </GlassPanel>

      {/* Stats */}
      <GlassPanel>
        <h2 className="section-title mb-4">Attributes</h2>
        <div className="space-y-4">
          <StatBar
            icon={Heart}
            label="HP"
            value={stats.hp.value}
            maxValue={stats.hp.max}
            color={stats.hp.color}
            onClick={() => onStatClick('hp')}
          />
          <StatBar
            icon={Zap}
            label="MP"
            value={stats.mp.value}
            maxValue={stats.mp.max}
            color={stats.mp.color}
            onClick={() => onStatClick('mp')}
          />
          <StatBar
            icon={Activity}
            label="Stamina"
            value={stats.stamina.value}
            maxValue={stats.stamina.max}
            color={stats.stamina.color}
            onClick={() => onStatClick('stamina')}
          />
          <StatBar
            icon={Target}
            label="Discipline"
            value={stats.discipline.value}
            maxValue={stats.discipline.max}
            color={stats.discipline.color}
            emphasized={true}
            onClick={() => onStatClick('discipline')}
          />
          <StatBar
            icon={Brain}
            label="Intelligence"
            value={stats.intelligence.value}
            maxValue={stats.intelligence.max}
            color={stats.intelligence.color}
            onClick={() => onStatClick('intelligence')}
          />
          <StatBar
            icon={MessageCircle}
            label="Charisma"
            value={stats.charisma.value}
            maxValue={stats.charisma.max}
            color={stats.charisma.color}
            onClick={() => onStatClick('charisma')}
          />
          <StatBar
            icon={DollarSign}
            label="Wealth"
            value={stats.wealth.value}
            maxValue={stats.wealth.max}
            color={stats.wealth.color}
            onClick={() => onStatClick('wealth')}
          />
          <StatBar
            icon={TrendingUp}
            label="Influence"
            value={stats.influence.value}
            maxValue={stats.influence.max}
            color={stats.influence.color}
            onClick={() => onStatClick('influence')}
          />
          <StatBar
            icon={Sparkles}
            label="Attractiveness"
            value={stats.attractiveness.value}
            maxValue={stats.attractiveness.max}
            color={stats.attractiveness.color}
            onClick={() => onStatClick('attractiveness')}
          />
        </div>
      </GlassPanel>
    </div>
  );
}