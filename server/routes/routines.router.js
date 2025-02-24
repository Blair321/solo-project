const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated, } = require ('../modules/authentication-middleware');

 //Get routines seed data
// router.get('/', rejectUnauthenticated ,(req, res) => {
//     console.log('/api/routines Get Hit');
//     const queryString = `SELECT * FROM "workout_routines";`;
//     pool.query(queryString).then((results)=>
//     {res.send(results.rows);
//     }).catch((err)=>{
//         console.log(err);
//         res.sendStatus(400);
//     })
    
// });
router.post('/', async (req, res) => {
    const { routine_name, exercises_pool } = req.body;  // `exercises` is an array with objects like { exercise_name, sets, reps }
    try {
      // Step 1: Insert new routine into workout_routines
      const routineResult = await pool.query(`
        INSERT INTO workout_routines (routine_name) 
        VALUES ($1) 
        RETURNING routine_id;
      `, [routine_name]);
  
      const routineId = routineResult.rows[0].routine_id;  // Get the newly inserted routine_id
  
      // Step 2: Insert new exercises or get existing exercises
      for (const exercise of exercises_pool) {
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
            INSERT INTO exercises (exercise_name)
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
  router.get('/:id', async (req, res) => {
    const routineId = req.params.id;
  
    try {
      // Step 1: Get the routine by ID
      const routineResult = await pool.query(`
        SELECT routine_id, routine_name
        FROM workout_routines
        WHERE routine_id = $1;
      `, [routineId]);
  
      if (routineResult.rows.length === 0) {
        return res.status(404).json({ error: 'Routine not found' });
      }
  
      // Step 2: Get the exercises associated with the routine
      const exercisesResult = await pool.query(`
        SELECT e.exercise_name, er.sets, er.reps
        FROM exercises_routine er
        JOIN exercises_pool e ON er.exercise_id = e.exercise_id
        WHERE er.routine_id = $1;
      `, [routineId]);
  
      // Combine the routine data and the exercises
      const routine = routineResult.rows[0];
      routine.exercises = exercisesResult.rows;
  
      // Step 3: Send the response with the routine and exercises
      res.status(200).json(routine);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch routine and exercises' });
    }
  });
  
  
  module.exports = router;