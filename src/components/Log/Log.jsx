
import React, { useState, useEffect} from 'react';
import axios from 'axios';
  const Log = () => {
    const [logList, setLogList] = useState([]);
    const [exerciseId, setExerciseId] = useState('');
    const [setNumber, setSetNumber] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [exertionLevel, setExertionLevel] = useState('');
    const [userId, setUserId] = useState(null);
  
    // Fetch log data and user info
    useEffect(() => {
      fetchLogList();
      fetchUserInfo();
    }, []);
  
    // Fetch the list of exercise logs for the authenticated user
    function fetchLogList() {
      console.log('Fetching exercise log list...');
      axios
        .get('/api/log/all') // This will only work if the user is authenticated
        .then((response) => {
          setLogList(response.data);
        })
        .catch((err) => {
          console.error(err);
          alert('Error in getting exercise logs');
        });
    }
  
    // Fetch the logged-in user's info
    function fetchUserInfo() {
      axios
        .get('/api/user')
        .then((response) => {
          if (response.data) {
            setUserId(response.data.id); // Assuming the user's ID is returned
          }
        })
        .catch((err) => {
          console.error('Error fetching user info:', err);
          alert('You must be logged in to log exercises');
        });
    }
  
    // Handle form submission to create a new exercise log
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const logData = {
        exercise_id: exerciseId,
        set_number: setNumber,
        reps: reps,
        weight: weight,
        exertion_level: exertionLevel,
        user_id: userId, // Pass userId here (from authenticated session)
      };
  
      try {
        const response = await axios.post('/api/log', logData);
        console.log('Exercise log created:', response.data);
        fetchLogList(); // Refresh log list after adding a new log
      } catch (err) {
        console.error('Error creating exercise log:', err);
      }
    };
  
    return (
      <div>
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
          <button type="submit">Submit Log</button>
        </form>
  
        <h2>Your Exercise Logs:</h2>
        <ul>
          {logList.map((log, index) => (
            <li key={index}>
              {log.exercise_id} | Set: {log.set_number} | Reps: {log.reps} | Weight: {log.weight} | Exertion: {log.exertion_level}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  


export default Log;




