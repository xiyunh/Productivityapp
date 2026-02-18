const pool = require("../db");

const UserStats = {
  async get() {
    const res = await pool.query("SELECT * FROM user_stats LIMIT 1");
    return res.rows[0];
  },

  async update(stats) {
    const { totalXP, streak, lastDungeonDate } = stats;
    const res = await pool.query(
      "UPDATE user_stats SET total_xp=$1, streak=$2, last_dungeon_date=$3 RETURNING *",
      [totalXP, streak, lastDungeonDate]
    );
    return res.rows[0];
  },
};

module.exports = UserStats;
