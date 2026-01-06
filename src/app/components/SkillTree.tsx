import React, { useState } from 'react';
import { GlassPanel } from './GlassPanel';
import { motion } from 'motion/react';
import { Sparkles, Brain, Briefcase, Users, Lock } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  level: number;
  maxLevel: number;
  effects: string[];
}

const skillTrees = {
  beauty: {
    name: 'Beauty Tree',
    icon: Sparkles,
    color: '#f472b6',
    skills: [
      {
        id: 'skincare',
        name: 'Radiant Skin',
        description: 'Master the art of skincare',
        unlocked: true,
        level: 2,
        maxLevel: 5,
        effects: ['+5 Attractiveness', '+2 Discipline']
      },
      {
        id: 'style',
        name: 'Style Mastery',
        description: 'Develop personal aesthetic',
        unlocked: true,
        level: 1,
        maxLevel: 5,
        effects: ['+3 Attractiveness', '+2 Charisma']
      },
      {
        id: 'presence',
        name: 'Magnetic Presence',
        description: 'Command attention effortlessly',
        unlocked: false,
        level: 0,
        maxLevel: 3,
        effects: ['+8 Attractiveness', '+5 Charisma', '+3 Influence']
      }
    ]
  },
  strategist: {
    name: 'Strategist Tree',
    icon: Brain,
    color: '#a855f7',
    skills: [
      {
        id: 'analysis',
        name: 'Critical Analysis',
        description: 'See patterns others miss',
        unlocked: true,
        level: 3,
        maxLevel: 5,
        effects: ['+6 Intelligence', '+2 Discipline']
      },
      {
        id: 'planning',
        name: 'Master Planner',
        description: 'Strategic foresight',
        unlocked: true,
        level: 1,
        maxLevel: 5,
        effects: ['+4 Intelligence', '+3 Discipline']
      },
      {
        id: 'execution',
        name: 'Flawless Execution',
        description: 'Turn plans into reality',
        unlocked: false,
        level: 0,
        maxLevel: 3,
        effects: ['+5 Intelligence', '+7 Discipline', '+3 Influence']
      }
    ]
  },
  founder: {
    name: 'Founder Tree',
    icon: Briefcase,
    color: '#fbbf24',
    skills: [
      {
        id: 'vision',
        name: 'Visionary',
        description: 'See opportunities everywhere',
        unlocked: true,
        level: 1,
        maxLevel: 5,
        effects: ['+4 Intelligence', '+3 Wealth']
      },
      {
        id: 'execution',
        name: 'Builder Mindset',
        description: 'Create from nothing',
        unlocked: false,
        level: 0,
        maxLevel: 5,
        effects: ['+5 Discipline', '+4 Wealth']
      },
      {
        id: 'empire',
        name: 'Empire Builder',
        description: 'Scale to infinity',
        unlocked: false,
        level: 0,
        maxLevel: 3,
        effects: ['+10 Wealth', '+8 Influence', '+5 Charisma']
      }
    ]
  },
  social: {
    name: 'Social Tree',
    icon: Users,
    color: '#f59e0b',
    skills: [
      {
        id: 'networking',
        name: 'Network Weaver',
        description: 'Build valuable connections',
        unlocked: true,
        level: 2,
        maxLevel: 5,
        effects: ['+5 Charisma', '+3 Influence']
      },
      {
        id: 'leadership',
        name: 'Natural Leader',
        description: 'Inspire and guide others',
        unlocked: true,
        level: 1,
        maxLevel: 5,
        effects: ['+4 Charisma', '+4 Influence']
      },
      {
        id: 'influence',
        name: 'Sphere of Influence',
        description: 'Become unmissable',
        unlocked: false,
        level: 0,
        maxLevel: 3,
        effects: ['+7 Charisma', '+10 Influence', '+3 Wealth']
      }
    ]
  }
};

export function SkillTree() {
  const [selectedTree, setSelectedTree] = useState<keyof typeof skillTrees>('beauty');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const currentTree = skillTrees[selectedTree];

  return (
    <div className="skill-tree">
      <GlassPanel className="mb-6">
        <h1 className="page-title">Skill Trees</h1>
        <p className="page-subtitle">Unlock passive abilities and bonuses</p>
      </GlassPanel>

      {/* Tree Selection */}
      <div className="tree-selector">
        {Object.entries(skillTrees).map(([key, tree]) => {
          const Icon = tree.icon;
          return (
            <motion.button
              key={key}
              className={`tree-button ${selectedTree === key ? 'active' : ''}`}
              onClick={() => setSelectedTree(key as keyof typeof skillTrees)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                borderColor: selectedTree === key ? tree.color : 'transparent',
                background: selectedTree === key ? `${tree.color}11` : 'transparent'
              }}
            >
              <Icon className="w-5 h-5" style={{ color: tree.color }} />
              <span>{tree.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Skill Nodes */}
      <GlassPanel className="mb-6">
        <div className="skill-tree-container">
          <div className="skill-nodes">
            {currentTree.skills.map((skill, index) => (
              <div key={skill.id} className="skill-node-wrapper">
                {index > 0 && (
                  <div className="skill-connector">
                    <div className="connector-line" style={{ 
                      background: skill.unlocked 
                        ? `linear-gradient(180deg, ${currentTree.color}, ${currentTree.color}44)` 
                        : '#ffffff11'
                    }} />
                  </div>
                )}
                <motion.div
                  className={`skill-node ${skill.unlocked ? 'unlocked' : 'locked'}`}
                  onClick={() => setSelectedSkill(skill)}
                  whileHover={{ scale: skill.unlocked ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    borderColor: skill.unlocked ? currentTree.color : '#ffffff22',
                    boxShadow: skill.unlocked ? `0 0 20px ${currentTree.color}44` : 'none'
                  }}
                >
                  {!skill.unlocked && (
                    <Lock className="skill-lock" />
                  )}
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-level">
                    {skill.unlocked ? `Level ${skill.level}/${skill.maxLevel}` : 'Locked'}
                  </div>
                  {skill.unlocked && (
                    <div className="skill-progress-bar">
                      <div 
                        className="skill-progress-fill" 
                        style={{ 
                          width: `${(skill.level / skill.maxLevel) * 100}%`,
                          background: currentTree.color
                        }} 
                      />
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>

      {/* Skill Detail */}
      {selectedSkill && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassPanel>
            <div className="skill-detail">
              <h3 className="skill-detail-name" style={{ color: currentTree.color }}>
                {selectedSkill.name}
              </h3>
              <p className="skill-detail-description">{selectedSkill.description}</p>
              
              <div className="mt-4">
                <div className="section-title mb-2">Effects</div>
                <div className="space-y-2">
                  {selectedSkill.effects.map((effect, index) => (
                    <div key={index} className="skill-effect">
                      {effect}
                    </div>
                  ))}
                </div>
              </div>

              {selectedSkill.unlocked && (
                <motion.button
                  className="upgrade-button"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentTree.color}88, ${currentTree.color})`,
                    boxShadow: `0 4px 20px ${currentTree.color}44`
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={selectedSkill.level >= selectedSkill.maxLevel}
                >
                  {selectedSkill.level >= selectedSkill.maxLevel ? 'Maxed' : 'Upgrade'}
                </motion.button>
              )}
            </div>
          </GlassPanel>
        </motion.div>
      )}
    </div>
  );
}