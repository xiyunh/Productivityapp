const Goal = require("../models/goalModel");
const UserStats = require("../models/userStatsModel");
const { isSameDay } = require("../utils/dateUtils");

function randomSeeded(array, seed) {
  let x = Math.sin(seed) * 10000;
  return array[Math.floor(Math.abs(x) % array.length)];
}

const THRESHOLDS = [0, 50, 150, 300, 500]; // XP thresholds per level

const DungeonService = {
  async generateDailyDungeon() {
    const goals = await Goal.getAll();
    const userStats = await UserStats.get();

    const today = new Date();
    // Only refresh if last generated on previous day
    if (!userStats.last_dungeon_date || !isSameDay(userStats.last_dungeon_date, today)) {
      // Seeded random selection
      const dailyGoals = [];
      for (let i = 0; i < 3; i++) {
        const goal = randomSeeded(goals, today.getDate() + i);
        dailyGoals.push(goal);
      }
      // Update last dungeon date
      await UserStats.update({
        totalXP: userStats.total_xp,
        streak: userStats.streak,
        lastDungeonDate: today,
      });
      return dailyGoals;
    }
    // If already generated today, return previous day's dungeon
    return goals;
  },

  async completeGoal(goalId) {
    const goal = await Goal.getById(goalId);
    let newXP = goal.xp + 10; // flat XP per completion
    let newLevel = goal.level;

    // Check if level up
    while (newLevel < THRESHOLDS.length && newXP >= THRESHOLDS[newLevel]) {
      newLevel++;
    }

    await Goal.updateXP(goalId, newXP, newLevel);

    // Update user stats
    const stats = await UserStats.get();
    const updatedStats = await UserStats.update({
      totalXP: stats.total_xp + 10,
      streak: stats.streak + 1,
      lastDungeonDate: stats.last_dungeon_date,
    });

    return { goal, updatedStats };
  },
};

module.exports = DungeonService;
