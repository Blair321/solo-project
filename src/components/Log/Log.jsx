
// import { useState, useEffect } from 'react';
// import axios from 'axios';

import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Log = () => {

  
      const [logList, setLogList] = useState([])
      useEffect(()=>{
        fetchLogList()
      }, [])
    
      function fetchLogList() {
        console.log('in FetchLogList');
        axios.get('/api/log/all')
        .then(function(response)
        {setLogList(response.data);
        }).catch(function(err){
          console.log(err);
          alert('error in getting todos list')
        })
        
      }
  const [exerciseId, setExerciseId] = useState('');
  const [setNumber, setSetNumber] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [exertionLevel, setExertionLevel] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logData = {
      exercise_id: exerciseId,
      set_number: setNumber,
      reps: reps,
      weight: weight,
      exertion_level: exertionLevel,
      user_id: userId,
    };

    try {
      const response = await axios.post('/api/log', logData);
      console.log('Exercise log created:', response.data);
    } catch (err) {
      console.error('Error creating exercise log:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Exercise ID:</label>
        <input
          type="number"
          value={exerciseId}
          onChange={(e) => setExerciseId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Set Number:</label>
        <input
          type="number"
          value={setNumber}
          onChange={(e) => setSetNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Reps:</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      </div>
      <div>
        <label>Weight:</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div>
        <label>Exertion Level:</label>
        <input
          type="number"
          value={exertionLevel}
          onChange={(e) => setExertionLevel(e.target.value)}
        />
      </div>
      <div>
        <label>User ID:</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Log</button>
    </form>
  );
};

export default Log;




// function Log() {
//   const [logList, setLogList] = useState([])
//   useEffect(()=>{
//     fetchLogList()
//   }, [])

//   function fetchLogList() {
//     console.log('in FetchLogList');
//     axios.get('/api/log/all')
//     .then(function(response)
//     {setLogList(response.data);
//     }).catch(function(err){
//       console.log(err);
//       alert('error in getting todos list')
//     })
    
//   }
//   return(
// //   <div>
// // <p>{JSON.stringify(logList)}</p>

// //   </div>
// <div>
//       <h2>Exercise Log List</h2>
//       <ul>
//         {logList.length > 0 ? (
//           logList.map((log) => (
//             <li key={log.log_id}>
//               <strong>Exercise ID:</strong> {log.exercise_id}, <strong>Set:</strong> {log.set_number}, 
//               <strong>Reps:</strong> {log.reps}, <strong>Weight:</strong> {log.weight}, 
//               <strong>Exertion Level:</strong> {log.exertion_level}
//             </li>
//           ))
//         ) : (
//           <p>No logs available.</p>
//         )}
//       </ul>
//     </div>
//   );
// }
