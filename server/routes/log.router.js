const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated, } = require ('../modules/authentication-middleware')
//first route for the exercise-log table

router.get('/all',rejectUnauthenticated, (req, res) => {
    console.log('in exerciselog route');
    if (!req.user || !req.user.id) {
      console.error('User not authenticated or user ID missing');
      return res.status(403).send('User is not authenticated');
    }
    const sqlText = 'SELECT * FROM "exercise_records" WHERE "user_id" = $1';
    const userId = req.user.id;
    pool.query(sqlText,[userId])
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error GET /api/log'${sqlText}`, error);
        res.sendStatus(500);  
    });
})

// post route to create a log of an exercise for a user
router.post('/', rejectUnauthenticated, async (req, res) => {
    const { exercise_id, set_number, reps, weight, exertion_level} = req.body;
  const userId = req.user.id;
    // Ensure the required fields are provided
    if (!exercise_id || !userId) {
      return res.status(400).json({ error: 'Exercise ID and User ID are required.' });
    }
  
    try {
      // Insert new exercise log entry into the database
      const result = await pool.query(
        `INSERT INTO "exercise_records" ("exercise_id", "set_number", "reps", "weight", "exertion_level", "user_id")
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [exercise_id, set_number, reps, weight, exertion_level, userId]
      );
  
      // Respond with the created log
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error inserting exercise log:', err);
      res.status(500).json({ error: 'Failed to create exercise log.' });
    }
  });


module.exports = router;