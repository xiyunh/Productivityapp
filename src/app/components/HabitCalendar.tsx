import React, { useState, useEffect } from 'react';
import { GlassPanel } from './GlassPanel';
import { motion } from 'motion/react';
import { Flame, Trophy, Calendar, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

interface DayData {
  date: string; // YYYY-MM-DD format
  completions: number;
  types: string[]; // quest, dungeon, custom
}

interface HabitCalendarProps {
  compact?: boolean;
  onHabitClick?: () => void;
}

export function HabitCalendar({ compact = false, onHabitClick }: HabitCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [completionData, setCompletionData] = useState<Record<string, DayData>>({});
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // Load completion data from localStorage
  useEffect(() => {
    loadCompletionData();
    
    // Listen for completion events
    const handleCompletion = () => {
      loadCompletionData();
    };
    
    window.addEventListener('habitCompletion', handleCompletion);
    
    return () => {
      window.removeEventListener('habitCompletion', handleCompletion);
    };
  }, []);

  const loadCompletionData = () => {
    const saved = localStorage.getItem('habitCompletions');
    if (saved) {
      const data = JSON.parse(saved);
      setCompletionData(data);
      calculateStreaks(data);
    }
  };

  const calculateStreaks = (data: Record<string, DayData>) => {
    const today = new Date();
    let streak = 0;
    let longest = 0;
    let tempStreak = 0;

    // Calculate current streak (going backwards from today)
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = formatDate(checkDate);
      
      if (data[dateStr] && data[dateStr].completions > 0) {
        if (i === streak) {
          streak++;
        }
        tempStreak++;
      } else {
        if (tempStreak > longest) longest = tempStreak;
        if (i > 0) break; // Stop if we hit a gap
        tempStreak = 0;
      }
    }

    if (tempStreak > longest) longest = tempStreak;
    
    setCurrentStreak(streak);
    setLongestStreak(longest);
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days: (Date | null)[] = [];
    
    // Add empty slots for days before month starts
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getCompletionLevel = (date: Date | null): number => {
    if (!date) return 0;
    const dateStr = formatDate(date);
    const data = completionData[dateStr];
    if (!data) return 0;
    return Math.min(data.completions, 4); // Cap at 4 levels
  };

  const isToday = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const isFuture = (date: Date | null): boolean => {
    if (!date) return false;
    return date > new Date();
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const getMonthCompletion = () => {
    const days = getDaysInMonth(currentDate);
    const validDays = days.filter(d => d && !isFuture(d)).length;
    const completedDays = days.filter(d => d && getCompletionLevel(d) > 0).length;
    return validDays > 0 ? Math.round((completedDays / validDays) * 100) : 0;
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(currentDate);
  const monthCompletion = getMonthCompletion();

  if (compact) {
    return (
      <motion.div
        onClick={onHabitClick}
        whileHover={onHabitClick ? { scale: 1.02 } : {}}
        whileTap={onHabitClick ? { scale: 0.98 } : {}}
        style={{ cursor: onHabitClick ? 'pointer' : 'default' }}
      >
        <GlassPanel className="habit-calendar-compact">
          <div className="habit-calendar-compact-header">
            <div className="habit-streak-display">
              <Flame className="streak-flame-icon" />
              <div>
                <div className="streak-number">{currentStreak}</div>
                <div className="streak-label">Day Streak</div>
              </div>
            </div>
            <div className="habit-calendar-mini-grid">
              {days.slice(-7).map((date, index) => {
                const level = getCompletionLevel(date);
                return (
                  <div
                    key={index}
                    className={`mini-calendar-day level-${level} ${isToday(date) ? 'today' : ''}`}
                  />
                );
              })}
            </div>
          </div>
        </GlassPanel>
      </motion.div>
    );
  }

  return (
    <GlassPanel className="habit-calendar">
      {/* Stats Header */}
      <div className="habit-stats-header">
        <motion.div 
          className="habit-stat-card streak-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="habit-stat-icon-container">
            <Flame className={`habit-stat-icon ${currentStreak > 0 ? 'streak-active' : ''}`} />
          </div>
          <div className="habit-stat-content">
            <div className="habit-stat-value">{currentStreak}</div>
            <div className="habit-stat-label">Current Streak</div>
          </div>
        </motion.div>

        <motion.div 
          className="habit-stat-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="habit-stat-icon-container">
            <Trophy className="habit-stat-icon" />
          </div>
          <div className="habit-stat-content">
            <div className="habit-stat-value">{longestStreak}</div>
            <div className="habit-stat-label">Best Streak</div>
          </div>
        </motion.div>

        <motion.div 
          className="habit-stat-card"
          whileHover={{ scale: 1.05 }}
        >
          <div className="habit-stat-icon-container">
            <Zap className="habit-stat-icon" />
          </div>
          <div className="habit-stat-content">
            <div className="habit-stat-value">{monthCompletion}%</div>
            <div className="habit-stat-label">This Month</div>
          </div>
        </motion.div>
      </div>

      {/* Calendar Header */}
      <div className="calendar-header">
        <button 
          className="calendar-nav-btn"
          onClick={() => changeMonth(-1)}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="calendar-month-display">
          <Calendar className="w-5 h-5 text-blue-400" />
          <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        </div>
        <button 
          className="calendar-nav-btn"
          onClick={() => changeMonth(1)}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day Names */}
      <div className="calendar-day-names">
        {dayNames.map(day => (
          <div key={day} className="calendar-day-name">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {days.map((date, index) => {
          const level = getCompletionLevel(date);
          const today = isToday(date);
          const future = isFuture(date);
          
          return (
            <motion.div
              key={index}
              className={`calendar-day ${!date ? 'empty' : ''} ${today ? 'today' : ''} ${future ? 'future' : ''} level-${level}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01 }}
              whileHover={date && !future ? { scale: 1.1 } : {}}
            >
              {date && (
                <>
                  <div className="calendar-day-number">{date.getDate()}</div>
                  {level > 0 && (
                    <div className="calendar-day-indicator">
                      {Array.from({ length: level }).map((_, i) => (
                        <div key={i} className="indicator-dot" />
                      ))}
                    </div>
                  )}
                  {today && <div className="today-ring" />}
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="calendar-legend">
        <div className="legend-label">Activity Level:</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-box level-0" />
            <span>None</span>
          </div>
          <div className="legend-item">
            <div className="legend-box level-1" />
            <span>Low</span>
          </div>
          <div className="legend-item">
            <div className="legend-box level-2" />
            <span>Medium</span>
          </div>
          <div className="legend-item">
            <div className="legend-box level-3" />
            <span>High</span>
          </div>
          <div className="legend-item">
            <div className="legend-box level-4" />
            <span>Max</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

// Utility function to record completions (export for use in other components)
export function recordCompletion(type: 'quest' | 'dungeon' | 'custom' = 'quest') {
  const today = new Date().toISOString().split('T')[0];
  const saved = localStorage.getItem('habitCompletions');
  const data: Record<string, DayData> = saved ? JSON.parse(saved) : {};
  
  if (!data[today]) {
    data[today] = {
      date: today,
      completions: 0,
      types: []
    };
  }
  
  data[today].completions++;
  if (!data[today].types.includes(type)) {
    data[today].types.push(type);
  }
  
  localStorage.setItem('habitCompletions', JSON.stringify(data));
  
  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent('habitCompletion'));
}