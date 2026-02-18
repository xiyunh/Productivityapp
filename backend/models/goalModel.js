const pool = require("../db");

const Goal = {
  async getAll() {
    const res = await pool.query("SELECT * FROM goals ORDER BY id");
    return res.rows;
  },

  async getById(id) {
    const res = await pool.query("SELECT * FROM goals WHERE id=$1", [id]);
    return res.rows[0];
  },

  async updateXP(id, xp, level) {
    const res = await pool.query(
      "UPDATE goals SET xp=$1, level=$2 WHERE id=$3 RETURNING *",
      [xp, level, id]
    );
    return res.rows[0];
  },
};

module.exports = Goal;
