const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated, } = require ('../modules/authentication-middleware')
//first route for the exercise-log table

router.get('/all',(req, res) => {
    console.log('in exerciselog route');
    const sqlText = 'SELECT * FROM "exercise_log"';
    pool.query(sqlText)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error GET /api/log'${sqlText}`, error);
        res.sendStatus(500);  
    });
})





module.exports = router;