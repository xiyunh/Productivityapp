import React from 'react';
import { GlassPanel } from './GlassPanel';
import { motion } from 'motion/react';
import { Book, Lightbulb, Eye, Flame } from 'lucide-react';

interface Hobby {
  id: string;
  name: string;
  icon: any;
  color: string;
  streak: number;
  totalCompleted: number;
  xpPerSession: number;
  statBoosts: string[];
  identityClarityBonus: number;
}

const hobbies: Hobby[] = [
  {
    id: 'reading',
    name: 'Reading',
    icon: Book,
    color: '#a855f7',
    streak: 12,
    totalCompleted: 45,
    xpPerSession: 25,
    statBoosts: ['+2 Intelligence', '+1 Discipline'],
    identityClarityBonus: 3
  },
  {
    id: 'chess',
    name: 'Chess',
    icon: Brain,
    color: '#3b82f6',
    streak: 7,
    totalCompleted: 28,
    xpPerSession: 30,
    statBoosts: ['+3 Intelligence', '+2 Discipline'],
    identityClarityBonus: 4
  },
  {
    id: 'photography',
    name: 'Photography',
    icon: Eye,
    color: '#f59e0b',
    streak: 5,
    totalCompleted: 18,
    xpPerSession: 20,
    statBoosts: ['+2 Attractiveness', '+1 Charisma'],
    identityClarityBonus: 5
  },
  {
    id: 'journaling',
    name: 'Journaling',
    icon: Lightbulb,
    color: '#ec4899',
    streak: 30,
    totalCompleted: 90,
    xpPerSession: 15,
    statBoosts: ['+3 Identity Clarity', '+2 Discipline'],
    identityClarityBonus: 8
  }
];

function Brain(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}

export function SideQuestsScreen() {
  return (
    <div className="side-quests-screen">
      <GlassPanel className="mb-6">
        <h1 className="page-title flex items-center gap-2">
          <Lightbulb className="w-7 h-7 text-yellow-400" />
          Side Quests & Hobbies
        </h1>
        <p className="page-subtitle">Cultivate identity and earn bonus XP</p>
      </GlassPanel>

      {/* Identity Clarity Stat */}
      <GlassPanel className="mb-6">
        <div className="identity-clarity-container">
          <div className="flex items-center justify-between mb-3">
            <h3 className="identity-clarity-title">Identity Clarity</h3>
            <div className="identity-clarity-value">76/100</div>
          </div>
          <div className="identity-clarity-bar-bg">
            <motion.div
              className="identity-clarity-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: '76%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <p className="identity-clarity-description">
            Higher identity clarity improves all stat gains and unlocks unique opportunities
          </p>
        </div>
      </GlassPanel>

      {/* Hobbies Grid */}
      <div className="hobbies-grid">
        {hobbies.map((hobby, index) => {
          const Icon = hobby.icon;
          return (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassPanel className="hobby-card">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="hobby-icon-container" style={{ background: `${hobby.color}22` }}>
                    <Icon className="w-8 h-8" style={{ color: hobby.color }} />
                  </div>

                  <h3 className="hobby-name">{hobby.name}</h3>

                  <div className="hobby-stats">
                    <div className="hobby-stat">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span className="hobby-stat-label">Streak</span>
                      <span className="hobby-stat-value">{hobby.streak} days</span>
                    </div>
                    <div className="hobby-stat">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="hobby-stat-label">Total</span>
                      <span className="hobby-stat-value">{hobby.totalCompleted}</span>
                    </div>
                  </div>

                  <div className="hobby-rewards">
                    <div className="hobby-reward-item">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span>{hobby.xpPerSession} XP</span>
                    </div>
                    {hobby.statBoosts.map((boost, i) => (
                      <div key={i} className="hobby-reward-item">
                        <TrendingUp className="w-4 h-4" style={{ color: hobby.color }} />
                        <span>{boost}</span>
                      </div>
                    ))}
                    <div className="hobby-reward-item special">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span>+{hobby.identityClarityBonus} Identity Clarity</span>
                    </div>
                  </div>

                  <motion.button
                    className="hobby-button"
                    style={{ 
                      background: `linear-gradient(135deg, ${hobby.color}33, ${hobby.color}66)`,
                      borderColor: hobby.color
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Complete Session
                  </motion.button>
                </motion.div>
              </GlassPanel>
            </motion.div>
          );
        })}
      </div>

      {/* Completion History */}
      <GlassPanel className="mt-6">
        <h2 className="section-title mb-4">Recent Completions</h2>
        <div className="completion-history">
          {[
            { hobby: 'Journaling', date: 'Today', xp: 15 },
            { hobby: 'Reading', date: 'Today', xp: 25 },
            { hobby: 'Chess', date: 'Yesterday', xp: 30 },
            { hobby: 'Photography', date: 'Yesterday', xp: 20 },
            { hobby: 'Journaling', date: '2 days ago', xp: 15 }
          ].map((completion, index) => (
            <motion.div
              key={index}
              className="completion-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="completion-hobby">{completion.hobby}</div>
              <div className="completion-date">{completion.date}</div>
              <div className="completion-xp">+{completion.xp} XP</div>
            </motion.div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}

function Trophy(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function CheckCircle(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function TrendingUp(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function Sparkles(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
