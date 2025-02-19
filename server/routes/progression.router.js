const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
// Attempt of get route for progression with join
// Get all progression details for a user
router.get('/', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(`
        SELECT 
          p.progression_id,
          p.id,
          p.best_weight,
          p.max_reps,
          ex.exercise_name
        FROM progression p
        JOIN exercises ex
          ON p.exercise_id = ex.exercise_id
        WHERE p.id = $1`, [id]);
  
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching user progression");
    }
  });
  

module.exports = router;