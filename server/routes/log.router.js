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
module.exports = router;