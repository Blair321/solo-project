import { useState,useEffect } from "react";
import axios from "axios";
function Routines() {

  const [routinesList,setRoutinesList] =  useState([]);
  useEffect(()=>{
    fetchRoutines()
  },[]);
  function fetchRoutines() {
    console.log('in fetch routines');
    axios.get('/api/routines').then(function(response){
      setRoutinesList(response.data);
    }).catch(function(err){
      console.log(err);
      alert('error getting the routines list')
      
    })
    
  }
    return (
      <div className="Routines">
        <h1>Routines</h1>
        <p>{JSON.stringify(routinesList)}</p>
      </div>
    );
  }
  
  export default Routines;
  