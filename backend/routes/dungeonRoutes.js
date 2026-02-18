const express = require("express");
const router = express.Router();
const dungeonController = require("../controllers/dungeonController");

router.get("/daily-dungeons", dungeonController.getDailyDungeons);
router.post("/complete-goal", dungeonController.completeGoal);

module.exports = router;
