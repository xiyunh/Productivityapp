const DungeonService = require("../services/dungeonService");

exports.getDailyDungeons = async (req, res) => {
  try {
    const dungeons = await DungeonService.generateDailyDungeon();
    res.json(dungeons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.completeGoal = async (req, res) => {
  try {
    const { goalId } = req.body;
    const result = await DungeonService.completeGoal(goalId);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
