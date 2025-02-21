const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated, } = require ('../modules/authentication-middleware');

//  Get routines seed data
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
  module.exports = router;