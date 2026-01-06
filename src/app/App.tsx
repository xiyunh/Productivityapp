import React, { useState } from 'react';
import { StatusWindow } from './components/StatusWindow';
import { StatsDetail } from './components/StatsDetail';
import { SkillTree } from './components/SkillTree';
import { DungeonsScreen } from './components/DungeonsScreen';
import { TitlesScreen } from './components/TitlesScreen';
import { RelationshipScreen } from './components/RelationshipScreen';
import { SideQuestsScreen } from './components/SideQuestsScreen';
import { DailyReview } from './components/DailyReview';
import { CalorieTracker } from './components/CalorieTracker';
import { motion } from 'motion/react';
import { BarChart3, Target, Swords, Users, User, Trophy, Lightbulb, Crown, Flame } from 'lucide-react';

type Screen = 'status' | 'skills' | 'dungeons' | 'social' | 'profile' | 'titles' | 'quests' | 'review' | 'calories';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('status');
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const handleStatClick = (statName: string) => {
    setSelectedStat(statName);
  };

  const handleBackToStatus = () => {
    setSelectedStat(null);
  };

  const renderScreen = () => {
    if (selectedStat) {
      return <StatsDetail statName={selectedStat} onBack={handleBackToStatus} />;
    }

    switch (currentScreen) {
      case 'status':
        return <StatusWindow onStatClick={handleStatClick} />;
      case 'skills':
        return <SkillTree />;
      case 'dungeons':
        return <DungeonsScreen />;
      case 'social':
        return <RelationshipScreen />;
      case 'titles':
        return <TitlesScreen />;
      case 'quests':
        return <SideQuestsScreen />;
      case 'review':
        return <DailyReview />;
      case 'calories':
        return <CalorieTracker />;
      case 'profile':
        return <StatusWindow onStatClick={handleStatClick} />;
      default:
        return <StatusWindow onStatClick={handleStatClick} />;
    }
  };

  return (
    <div className="app-container">
      <div className="app-background" />
      
      <main className="app-main">
        <motion.div
          key={currentScreen + (selectedStat || '')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderScreen()}
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <NavItem
          icon={BarChart3}
          label="Status"
          active={currentScreen === 'status' && !selectedStat}
          onClick={() => {
            setCurrentScreen('status');
            setSelectedStat(null);
          }}
        />
        <NavItem
          icon={Target}
          label="Skills"
          active={currentScreen === 'skills'}
          onClick={() => {
            setCurrentScreen('skills');
            setSelectedStat(null);
          }}
        />
        <NavItem
          icon={Swords}
          label="Dungeons"
          active={currentScreen === 'dungeons'}
          onClick={() => {
            setCurrentScreen('dungeons');
            setSelectedStat(null);
          }}
        />
        <NavItem
          icon={Lightbulb}
          label="Quests"
          active={currentScreen === 'quests'}
          onClick={() => {
            setCurrentScreen('quests');
            setSelectedStat(null);
          }}
        />
        <NavItem
          icon={Users}
          label="Social"
          active={currentScreen === 'social'}
          onClick={() => {
            setCurrentScreen('social');
            setSelectedStat(null);
          }}
        />
      </nav>

      {/* Quick Access Buttons */}
      <div className="quick-access">
        <QuickButton
          icon={Crown}
          label="Titles"
          onClick={() => {
            setCurrentScreen('titles');
            setSelectedStat(null);
          }}
        />
        <QuickButton
          icon={Trophy}
          label="Review"
          onClick={() => {
            setCurrentScreen('review');
            setSelectedStat(null);
          }}
        />
        <QuickButton
          icon={Flame}
          label="Calories"
          onClick={() => {
            setCurrentScreen('calories');
            setSelectedStat(null);
          }}
        />
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <motion.button
      className={`nav-item ${active ? 'active' : ''}`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="nav-icon" />
      <span className="nav-label">{label}</span>
      {active && <motion.div className="nav-indicator" layoutId="nav-indicator" />}
    </motion.button>
  );
}

interface QuickButtonProps {
  icon: any;
  label: string;
  onClick: () => void;
}

function QuickButton({ icon: Icon, label, onClick }: QuickButtonProps) {
  return (
    <motion.button
      className="quick-button"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon className="w-5 h-5" />
      <span className="quick-button-label">{label}</span>
    </motion.button>
  );
}