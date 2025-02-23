import { useState,useEffect } from "react";
import axios from "axios";
// function Routines() {// components/CreateRoutineForm.js
const Routines = () => {
  const [routineName, setRoutineName] = useState('');
  const [exercises, setExercises] = useState([{ exercise_name: '', sets: '', reps: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdRoutine, setCreatedRoutine] = useState(null); // State to store created routine

  useEffect(() => {
    console.log('Created Routine:', createdRoutine);  // Logs when createdRoutine changes
  }, [createdRoutine]); // Runs whenever createdRoutine state changes

  // Handle adding a new exercise field
  const handleAddExercise = () => {
    setExercises([...exercises, { exercise_name: '', sets: '', reps: '' }]);
  };

  // Handle input changes for each exercise field
  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  // Handle submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare request data
      const routineData = {
        routine_name: routineName,
        exercises: exercises.map(exercise => ({
          exercise_name: exercise.exercise_name,
          sets: exercise.sets,
          reps: exercise.reps,
        })),
      };

      // Make API request to create routine and exercises
      const response = await axios.post('/api/routines', routineData);
      alert(response.data.message);  // Show success message
      setCreatedRoutine(response.data.routine);
    } catch (err) {
      setError('Failed to create routine and add exercises');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add New Routine</h2>
      <form onSubmit={handleSubmit}>
        {/* Routine name input */}
        <div>
          <label htmlFor="routineName">Routine Name:</label>
          <input
            type="text"
            id="routineName"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            required
          />
        </div>

        {/* Exercise inputs */}
        {exercises.map((exercise, index) => (
          <div key={index}>
            <h3>Exercise {index + 1}</h3>
            <div>
              <label htmlFor={`exerciseName-${index}`}>Exercise Name:</label>
              <input
                type="text"
                id={`exerciseName-${index}`}
                value={exercise.exercise_name}
                onChange={(e) => handleExerciseChange(index, 'exercise_name', e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor={`sets-${index}`}>Sets:</label>
              <input
                type="number"
                id={`sets-${index}`}
                value={exercise.sets}
                onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor={`reps-${index}`}>Reps:</label>
              <input
                type="number"
                id={`reps-${index}`}
                value={exercise.reps}
                onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                required
              />
            </div>
          </div>
        ))}

        {/* Add another exercise button */}
        <div>
          <button type="button" onClick={handleAddExercise}>
            Add Another Exercise
          </button>
        </div>

        {/* Submit button */}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Creating Routine...' : 'Create Routine'}
          </button>
        </div>
      </form>

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* Display the newly created routine */}
        {createdRoutine && (
      <div>
          <h3>Created Routine:</h3>
          <p><strong>Routine Name:</strong> {createdRoutine.routine_name}</p>
          <h4>Exercises:</h4>
          <ul>
            {createdRoutine.exercises.map((exercise, index) => (
              <li key={index}>
                {exercise.exercise_name} - {exercise.sets} sets of {exercise.reps} reps
              </li>
            ))}
          </ul>
        </div>
        )}
      
    </div>
  );
};
  
  // const [routinesList,setRoutinesList] =  useState([]);
  // useEffect(()=>{
  //   fetchRoutines()
  // },[]);
  // function fetchRoutines() {
  //   console.log('in fetch routines');
  //   axios.get('/api/routines').then(function(response){
  //     setRoutinesList(response.data);
  //   }).catch(function(err){
  //     console.log(err);
  //     alert('error getting the routines list')
      
  //   })
    
  // }
  //   return (
  //     <div className="Routines">
  //       <h1>Routines</h1>
  //       <p>{JSON.stringify(routinesList)}</p>
  //     </div>
  //   );
  
  export default Routines;
  