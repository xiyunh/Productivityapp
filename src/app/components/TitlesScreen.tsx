import React, { useState } from 'react';
import { GlassPanel } from './GlassPanel';
import { motion } from 'motion/react';
import { Crown, Lock, CheckCircle, Sparkles } from 'lucide-react';

interface Title {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  equipped: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  buffs: string[];
  requirements: string[];
}

const titles: Title[] = [
  {
    id: 'that-girl',
    name: 'That Girl',
    description: 'The embodiment of discipline and aesthetic excellence',
    unlocked: true,
    equipped: true,
    rarity: 'epic',
    buffs: ['+5% All Stats', '+10 Discipline', '+8 Attractiveness'],
    requirements: ['30-day morning routine streak', 'Level 50 Discipline']
  },
  {
    id: 'relentless',
    name: 'Relentless',
    description: 'Nothing can break your momentum',
    unlocked: true,
    equipped: false,
    rarity: 'rare',
    buffs: ['+15 Discipline', '+10 Stamina', 'Immune to streak breaks'],
    requirements: ['Complete all daily quests for 7 days']
  },
  {
    id: 'high-value',
    name: 'High-Value',
    description: 'Command respect and admiration',
    unlocked: true,
    equipped: false,
    rarity: 'epic',
    buffs: ['+12 Charisma', '+12 Influence', '+8 Wealth'],
    requirements: ['Level 60 in Charisma, Influence, and Wealth']
  },
  {
    id: 'unignorable',
    name: 'Unignorable',
    description: 'Your presence cannot be overlooked',
    unlocked: false,
    equipped: false,
    rarity: 'legendary',
    buffs: ['+20 Charisma', '+20 Influence', '+15 Attractiveness', 'Magnetic Aura'],
    requirements: ['Level 100 Charisma', 'Master all Social Tree skills']
  },
  {
    id: 'strategist',
    name: 'The Strategist',
    description: 'See ten steps ahead',
    unlocked: false,
    equipped: false,
    rarity: 'legendary',
    buffs: ['+25 Intelligence', '+15 Discipline', 'Perfect Planning'],
    requirements: ['Level 100 Intelligence', 'Complete 100 strategic challenges']
  },
  {
    id: 'shadow-monarch',
    name: 'Shadow Monarch',
    description: 'Transcend mortal limitations',
    unlocked: false,
    equipped: false,
    rarity: 'legendary',
    buffs: ['+50 All Stats', 'Absolute Authority', 'Boundless Potential'],
    requirements: ['Reach Level 100', 'All stats at Level 100', 'Defeat all dungeons']
  }
];

const rarityColors = {
  common: '#94a3b8',
  rare: '#3b82f6',
  epic: '#a855f7',
  legendary: '#fbbf24'
};

export function TitlesScreen() {
  const [selectedTitle, setSelectedTitle] = useState<Title | null>(null);

  const equippedTitle = titles.find(t => t.equipped);

  return (
    <div className="titles-screen">
      <GlassPanel className="mb-6">
        <h1 className="page-title flex items-center gap-2">
          <Crown className="w-7 h-7 text-yellow-400" />
          Titles & Achievements
        </h1>
        <p className="page-subtitle">Earn prestige and powerful buffs</p>
      </GlassPanel>

      {/* Equipped Title */}
      {equippedTitle && (
        <GlassPanel className="mb-6">
          <div className="equipped-title-container">
            <div className="equipped-label">Currently Equipped</div>
            <motion.div
              className="equipped-title"
              style={{
                borderColor: rarityColors[equippedTitle.rarity],
                background: `linear-gradient(135deg, ${rarityColors[equippedTitle.rarity]}11, ${rarityColors[equippedTitle.rarity]}22)`,
                boxShadow: `0 0 30px ${rarityColors[equippedTitle.rarity]}44`
              }}
              animate={{
                boxShadow: [
                  `0 0 30px ${rarityColors[equippedTitle.rarity]}44`,
                  `0 0 40px ${rarityColors[equippedTitle.rarity]}66`,
                  `0 0 30px ${rarityColors[equippedTitle.rarity]}44`
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown className="w-6 h-6" style={{ color: rarityColors[equippedTitle.rarity] }} />
              <h3 className="equipped-title-name" style={{ color: rarityColors[equippedTitle.rarity] }}>
                {equippedTitle.name}
              </h3>
            </motion.div>
          </div>
        </GlassPanel>
      )}

      {/* All Titles */}
      <GlassPanel className="mb-6">
        <h2 className="section-title mb-4">All Titles</h2>
        <div className="titles-grid">
          {titles.map((title, index) => (
            <motion.div
              key={title.id}
              className={`title-card ${title.unlocked ? 'unlocked' : 'locked'} ${title.equipped ? 'equipped' : ''}`}
              onClick={() => title.unlocked && setSelectedTitle(title)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={title.unlocked ? { scale: 1.05 } : { scale: 1.02 }}
              whileTap={title.unlocked ? { scale: 0.95 } : {}}
              style={{
                borderColor: title.unlocked ? rarityColors[title.rarity] : '#ffffff22',
                background: title.unlocked 
                  ? `linear-gradient(135deg, ${rarityColors[title.rarity]}11, ${rarityColors[title.rarity]}22)`
                  : 'transparent'
              }}
            >
              {!title.unlocked && (
                <Lock className="title-lock" />
              )}
              {title.equipped && (
                <CheckCircle className="title-equipped-badge" style={{ color: rarityColors[title.rarity] }} />
              )}
              <div className="title-card-rarity" style={{ color: rarityColors[title.rarity] }}>
                {title.rarity.toUpperCase()}
              </div>
              <h3 className="title-card-name" style={{ 
                color: title.unlocked ? rarityColors[title.rarity] : '#64748b'
              }}>
                {title.name}
              </h3>
              <p className="title-card-description">{title.description}</p>
            </motion.div>
          ))}
        </div>
      </GlassPanel>

      {/* Title Detail */}
      {selectedTitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassPanel>
            <div className="title-detail">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="title-detail-rarity" style={{ color: rarityColors[selectedTitle.rarity] }}>
                    {selectedTitle.rarity.toUpperCase()}
                  </div>
                  <h3 className="title-detail-name" style={{ color: rarityColors[selectedTitle.rarity] }}>
                    {selectedTitle.name}
                  </h3>
                  <p className="title-detail-description">{selectedTitle.description}</p>
                </div>
                {selectedTitle.equipped && (
                  <div className="equipped-badge">Equipped</div>
                )}
              </div>

              <div className="mb-4">
                <div className="section-title mb-2">Passive Buffs</div>
                <div className="space-y-2">
                  {selectedTitle.buffs.map((buff, index) => (
                    <div key={index} className="title-buff">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      <span>{buff}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="section-title mb-2">Requirements</div>
                <div className="space-y-2">
                  {selectedTitle.requirements.map((req, index) => (
                    <div key={index} className="title-requirement">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {!selectedTitle.equipped && (
                <motion.button
                  className="equip-button"
                  style={{ 
                    background: `linear-gradient(135deg, ${rarityColors[selectedTitle.rarity]}88, ${rarityColors[selectedTitle.rarity]})`,
                    boxShadow: `0 4px 20px ${rarityColors[selectedTitle.rarity]}44`
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Equip Title
                </motion.button>
              )}
            </div>
          </GlassPanel>
        </motion.div>
      )}
    </div>
  );
}