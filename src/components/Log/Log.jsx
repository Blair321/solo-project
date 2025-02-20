
import { useState, useEffect } from 'react';
import axios from 'axios';
function Log() {
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
  return(
//   <div>
// <p>{JSON.stringify(logList)}</p>

//   </div>
<div>
      <h2>Exercise Log List</h2>
      <ul>
        {logList.length > 0 ? (
          logList.map((log) => (
            <li key={log.log_id}>
              <strong>Exercise ID:</strong> {log.exercise_id}, <strong>Set:</strong> {log.set_number}, 
              <strong>Reps:</strong> {log.reps}, <strong>Weight:</strong> {log.weight}, 
              <strong>Exertion Level:</strong> {log.exertion_level}
            </li>
          ))
        ) : (
          <p>No logs available.</p>
        )}
      </ul>
    </div>
  );
}
export default Log;