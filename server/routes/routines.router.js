const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


//  Get exercises for a specific routine
router.get('/', (req, res) => {
    // Find all orders and return them
    pool.query('SELECT * FROM "workout_routines";').then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error GET /api/routines', error);
        res.sendStatus(500);  
    });
})
  module.exports = router;