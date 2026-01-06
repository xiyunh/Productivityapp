import React from 'react';
import { GlassPanel } from './GlassPanel';
import { motion } from 'motion/react';
import { Heart, Users, Lock, Shield } from 'lucide-react';

interface Relationship {
  name: string;
  role: string;
  tier: 'inner' | 'middle' | 'outer';
  buffs: string[];
}

const relationships: Relationship[] = [
  {
    name: 'Sarah Chen',
    role: 'Best Friend',
    tier: 'inner',
    buffs: ['+5 Charisma', '+3 Influence', 'Emotional Support']
  },
  {
    name: 'Marcus Webb',
    role: 'Mentor',
    tier: 'inner',
    buffs: ['+8 Intelligence', '+5 Influence', 'Strategic Guidance']
  },
  {
    name: 'Emma Rodriguez',
    role: 'Business Partner',
    tier: 'middle',
    buffs: ['+6 Wealth', '+4 Influence']
  },
  {
    name: 'James Park',
    role: 'Colleague',
    tier: 'middle',
    buffs: ['+3 Intelligence', '+2 Charisma']
  },
  {
    name: 'Network Group',
    role: 'Professional Network',
    tier: 'outer',
    buffs: ['+2 Influence', 'Opportunities']
  }
];

const tierColors = {
  inner: '#ec4899',
  middle: '#a855f7',
  outer: '#6366f1'
};

export function RelationshipScreen() {
  const innerCircle = relationships.filter(r => r.tier === 'inner');
  const middleCircle = relationships.filter(r => r.tier === 'middle');
  const outerCircle = relationships.filter(r => r.tier === 'outer');

  return (
    <div className="relationship-screen">
      <GlassPanel className="mb-6">
        <h1 className="page-title flex items-center gap-2">
          <Heart className="w-7 h-7 text-pink-400" />
          Relationships
        </h1>
        <p className="page-subtitle">Build meaningful connections and alliances</p>
      </GlassPanel>

      {/* Romantic Partner Slot */}
      <GlassPanel className="mb-6">
        <div className="relationship-slot locked">
          <Lock className="w-8 h-8 text-gray-600 mb-3" />
          <h3 className="slot-title">Romantic Partner</h3>
          <p className="slot-description">Unlock at Level 50</p>
          <div className="slot-preview-buffs">
            <div className="preview-buff">+15 All Stats</div>
            <div className="preview-buff">Emotional Anchor</div>
            <div className="preview-buff">Shared Growth</div>
          </div>
        </div>
      </GlassPanel>

      {/* Inner Circle */}
      <GlassPanel className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title flex items-center gap-2">
            <Shield className="w-5 h-5" style={{ color: tierColors.inner }} />
            Inner Circle
          </h2>
          <div className="tier-badge" style={{ 
            background: `${tierColors.inner}22`,
            color: tierColors.inner,
            borderColor: tierColors.inner
          }}>
            {innerCircle.length}/5
          </div>
        </div>
        <p className="tier-description">Closest relationships with deepest impact</p>
        <div className="relationships-list">
          {innerCircle.map((rel, index) => (
            <motion.div
              key={index}
              className="relationship-card"
              style={{ borderLeftColor: tierColors.inner }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="relationship-avatar" style={{ borderColor: tierColors.inner }}>
                {rel.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="relationship-name">{rel.name}</h4>
                <p className="relationship-role">{rel.role}</p>
                <div className="relationship-buffs">
                  {rel.buffs.map((buff, i) => (
                    <span key={i} className="relationship-buff" style={{ 
                      background: `${tierColors.inner}22`,
                      color: tierColors.inner 
                    }}>
                      {buff}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassPanel>

      {/* Middle Circle */}
      <GlassPanel className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title flex items-center gap-2">
            <Users className="w-5 h-5" style={{ color: tierColors.middle }} />
            Middle Circle
          </h2>
          <div className="tier-badge" style={{ 
            background: `${tierColors.middle}22`,
            color: tierColors.middle,
            borderColor: tierColors.middle
          }}>
            {middleCircle.length}/10
          </div>
        </div>
        <p className="tier-description">Regular contacts and collaborators</p>
        <div className="relationships-list">
          {middleCircle.map((rel, index) => (
            <motion.div
              key={index}
              className="relationship-card"
              style={{ borderLeftColor: tierColors.middle }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="relationship-avatar" style={{ borderColor: tierColors.middle }}>
                {rel.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="relationship-name">{rel.name}</h4>
                <p className="relationship-role">{rel.role}</p>
                <div className="relationship-buffs">
                  {rel.buffs.map((buff, i) => (
                    <span key={i} className="relationship-buff" style={{ 
                      background: `${tierColors.middle}22`,
                      color: tierColors.middle 
                    }}>
                      {buff}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassPanel>

      {/* Outer Circle */}
      <GlassPanel>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title flex items-center gap-2">
            <Users className="w-5 h-5" style={{ color: tierColors.outer }} />
            Outer Circle
          </h2>
          <div className="tier-badge" style={{ 
            background: `${tierColors.outer}22`,
            color: tierColors.outer,
            borderColor: tierColors.outer
          }}>
            {outerCircle.length}/∞
          </div>
        </div>
        <p className="tier-description">Extended network and acquaintances</p>
        <div className="relationships-list">
          {outerCircle.map((rel, index) => (
            <motion.div
              key={index}
              className="relationship-card"
              style={{ borderLeftColor: tierColors.outer }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="relationship-avatar" style={{ borderColor: tierColors.outer }}>
                {rel.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="relationship-name">{rel.name}</h4>
                <p className="relationship-role">{rel.role}</p>
                <div className="relationship-buffs">
                  {rel.buffs.map((buff, i) => (
                    <span key={i} className="relationship-buff" style={{ 
                      background: `${tierColors.outer}22`,
                      color: tierColors.outer 
                    }}>
                      {buff}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
