import React, { useState } from 'react';
import { GlassPanel } from './GlassPanel';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus } from 'lucide-react';

interface StatReward {
  stat: string;
  amount: number;
}

interface CustomQuest {
  id: string;
  title: string;
  description: string;
  statRewards: StatReward[];
  xpReward: number;
  completed: boolean;
  createdAt: number;
}

interface CreateQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quest: CustomQuest) => void;
}

const AVAILABLE_STATS = [
  'Strength',
  'Intelligence',
  'Charisma',
  'Discipline',
  'Attractiveness',
  'Vitality',
  'Identity Clarity'
];

export function CreateQuestModal({ isOpen, onClose, onSave }: CreateQuestModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [xpReward, setXpReward] = useState(50);
  const [statRewards, setStatRewards] = useState<StatReward[]>([]);
  const [selectedStat, setSelectedStat] = useState(AVAILABLE_STATS[0]);
  const [statAmount, setStatAmount] = useState(1);

  const handleAddStatReward = () => {
    if (statRewards.find(r => r.stat === selectedStat)) {
      // Update existing stat
      setStatRewards(statRewards.map(r => 
        r.stat === selectedStat ? { ...r, amount: r.amount + statAmount } : r
      ));
    } else {
      // Add new stat
      setStatRewards([...statRewards, { stat: selectedStat, amount: statAmount }]);
    }
  };

  const handleRemoveStatReward = (stat: string) => {
    setStatRewards(statRewards.filter(r => r.stat !== stat));
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a quest title');
      return;
    }

    const newQuest: CustomQuest = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'No description provided',
      statRewards,
      xpReward,
      completed: false,
      createdAt: Date.now()
    };

    onSave(newQuest);
    
    // Reset form
    setTitle('');
    setDescription('');
    setXpReward(50);
    setStatRewards([]);
    setSelectedStat(AVAILABLE_STATS[0]);
    setStatAmount(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="quest-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="quest-modal-container"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <GlassPanel className="quest-modal">
              {/* Header */}
              <div className="quest-modal-header">
                <h2 className="quest-modal-title">Create Custom Quest</h2>
                <button className="quest-modal-close" onClick={onClose}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <div className="quest-modal-form">
                {/* Title */}
                <div className="quest-form-group">
                  <label className="quest-form-label">Quest Title *</label>
                  <input
                    type="text"
                    className="quest-form-input"
                    placeholder="e.g., Complete 10 Cold Calls"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={50}
                  />
                </div>

                {/* Description */}
                <div className="quest-form-group">
                  <label className="quest-form-label">Description</label>
                  <textarea
                    className="quest-form-textarea"
                    placeholder="Describe what you need to accomplish..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    maxLength={200}
                  />
                </div>

                {/* XP Reward */}
                <div className="quest-form-group">
                  <label className="quest-form-label">XP Reward</label>
                  <div className="quest-form-number-input">
                    <button
                      className="quest-number-btn"
                      onClick={() => setXpReward(Math.max(10, xpReward - 10))}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      className="quest-form-input text-center"
                      value={xpReward}
                      onChange={(e) => setXpReward(Math.max(10, parseInt(e.target.value) || 10))}
                      min="10"
                      max="500"
                    />
                    <button
                      className="quest-number-btn"
                      onClick={() => setXpReward(Math.min(500, xpReward + 10))}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Stat Rewards */}
                <div className="quest-form-group">
                  <label className="quest-form-label">Stat Rewards</label>
                  
                  <div className="quest-stat-selector">
                    <select
                      className="quest-form-select"
                      value={selectedStat}
                      onChange={(e) => setSelectedStat(e.target.value)}
                    >
                      {AVAILABLE_STATS.map(stat => (
                        <option key={stat} value={stat}>{stat}</option>
                      ))}
                    </select>
                    
                    <input
                      type="number"
                      className="quest-form-input quest-stat-amount"
                      value={statAmount}
                      onChange={(e) => setStatAmount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                      min="1"
                      max="10"
                    />
                    
                    <button className="quest-add-stat-btn" onClick={handleAddStatReward}>
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>

                  {/* Stat Rewards List */}
                  {statRewards.length > 0 && (
                    <div className="quest-stat-rewards-list">
                      {statRewards.map((reward) => (
                        <motion.div
                          key={reward.stat}
                          className="quest-stat-reward-item"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                        >
                          <span className="quest-stat-reward-text">
                            +{reward.amount} {reward.stat}
                          </span>
                          <button
                            className="quest-stat-remove-btn"
                            onClick={() => handleRemoveStatReward(reward.stat)}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="quest-modal-actions">
                  <motion.button
                    className="quest-modal-btn quest-modal-btn-cancel"
                    onClick={onClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="quest-modal-btn quest-modal-btn-save"
                    onClick={handleSave}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create Quest
                  </motion.button>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export type { CustomQuest, StatReward };
