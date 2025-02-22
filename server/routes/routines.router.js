const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated, } = require ('../modules/authentication-middleware');

 //Get routines seed data
router.get('/', rejectUnauthenticated ,(req, res) => {
    console.log('/api/routines Get Hit');
    const queryString = `SELECT * FROM "workout_routines";`;
    pool.query(queryString).then((results)=>
    {res.send(results.rows);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(400);
    })
    
});
router.post('/', async (req, res) => {
    const { routine_name, exercises } = req.body;  // `exercises` is an array with objects like { exercise_name, sets, reps }
    try {
      // Step 1: Insert new routine into workout_routines
      const routineResult = await pool.query(`
        INSERT INTO workout_routines (routine_name) 
        VALUES ($1) 
        RETURNING routine_id;
      `, [routine_name]);
  
      const routineId = routineResult.rows[0].routine_id;  // Get the newly inserted routine_id
  
      // Step 2: Insert new exercises or get existing exercises
      for (const exercise of exercises) {
        // Check if the exercise already exists in the exercises table
        const existingExerciseResult = await pool.query(`
          SELECT exercise_id FROM exercises_pool 
          WHERE exercise_name = $1;
        `, [exercise.exercise_name]);
  
        let exerciseId;
  
        if (existingExerciseResult.rows.length > 0) {
          // If exercise exists, use the existing exercise_id
          exerciseId = existingExerciseResult.rows[0].exercise_id;
        } else {
          // If exercise doesn't exist, insert it and get the new exercise_id
          const newExerciseResult = await pool.query(`
            INSERT INTO exercises_pool (exercise_name)
            VALUES ($1)
            RETURNING exercise_id;
          `, [exercise.exercise_name]);
  
          exerciseId = newExerciseResult.rows[0].exercise_id;
        }
  
        // Step 3: Insert exercise details into exercises_routine
        await pool.query(`
          INSERT INTO exercises_routine (routine_id, exercise_id, sets, reps) 
          VALUES ($1, $2, $3, $4);
        `, [routineId, exerciseId, exercise.sets, exercise.reps]);
      }
  
      // Step 4: Send success response
      res.status(201).json({ message: 'Routine and exercises created successfully', routineId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create routine and add exercises' });
    }
  });

  
  module.exports = router;