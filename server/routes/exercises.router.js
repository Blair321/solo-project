const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// first route for the exercise table
router.get( '/', ( req, res )=>{
    console.log( '/api/exercises GET' );
    // assemble query
    const queryString = 'SELECT * FROM exercises';
    // run pool.query
    pool.query( queryString ).then( ( results )=>{
        // return results.rows
        console.log(results.rows);
        res.send( results.rows );
    }).catch( ( err )=>{
        // handle any errors
        console.log( err );
        res.sendStatus( 400 );
    })
})

module.exports = router;