const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// first route for the exercise-log table

router.get('/', (req, res) => {
    pool.query('SELECT * FROM "exercise_log";').then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error GET /api/log', error);
        res.sendStatus(500);  
    });
})

router.post('/', (req, res) => {
    const { exercise_id, set_number, reps, weight, exertion_level, user_id } = req.body;

    const query = `
        INSERT INTO exercise_log (exercise_id, set_number, reps, weight, exertion_level, user_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    pool.query(query, [exercise_id, set_number, reps, weight, exertion_level, user_id])
        .then((result) => {
            res.status(201).json(result.rows[0]);  // Send back the created log
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Error creating exercise log', error: err });
        });
});


module.exports = router;