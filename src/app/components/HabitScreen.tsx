import React from 'react';
import { HabitCalendar } from './HabitCalendar';
import { GlassPanel } from './GlassPanel';
import { Calendar } from 'lucide-react';

export function HabitScreen() {
  return (
    <div className="habit-screen">
      <GlassPanel className="mb-6">
        <h1 className="page-title flex items-center gap-2">
          <Calendar className="w-7 h-7 text-orange-400" />
          Habit Tracker
        </h1>
        <p className="page-subtitle">Track your daily quest and dungeon completions</p>
      </GlassPanel>

      <HabitCalendar />
    </div>
  );
}
