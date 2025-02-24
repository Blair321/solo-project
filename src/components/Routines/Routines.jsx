import { useState,useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Routines = () => {
  const [routineName, setRoutineName] = useState('');
  const [exercises, setExercises] = useState([{ exercise_name: '', sets: '', reps: '', routine_exercise_id:'' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdRoutine, setCreatedRoutine] = useState(null); // State to store created routine
  const [routineId, setRoutineId] = useState(null);

  useEffect(() => {
    const fetchRoutine = async () => {
      if (!routineId) return;  // Don't fetch if there is no routineId

      try {
        const response = await axios.get(`/api/routines/${routineId}`);
        setCreatedRoutine(response.data);
      } catch (err) {
        setError('Failed to fetch routine details');
        console.error(err);
      }
    };
    fetchRoutine();
  }, [routineId]);  
  // Handle adding a new exercise field
  // const navigate = useNavigate();
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
        exercises_pool: exercises.map(exercise => ({
          exercise_name: exercise.exercise_name,
          sets: exercise.sets,
          reps: exercise.reps,
        })),
      };

      // Make API request to create routine and exercises
      const response = await axios.post('/api/routines', routineData);
      alert(response.data.message);  // Show success message
      setRoutineId(response.data.routineId);
    } catch (err) {
      setError('Failed to create routine and add exercises');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateExercise = async (routineExerciseId, updatedSets, updatedReps) => {
    try {
      const response = await axios.put(`/api/routines/exercises/${routineExerciseId}`, {
        sets: updatedSets,
        reps: updatedReps,
      });

      // Update the exercise in the exercises list after successful update
      const updatedExercises = exercises.map(exercise =>
        exercise.routine_exercise_id === routineExerciseId
          ? { ...exercise, sets: updatedSets, reps: updatedReps }
          : exercise
      );

      setExercises(updatedExercises);
      alert(response.data.message);
    } catch (err) {
      alert('Failed to update exercise');
      console.error(err);
    }
  };
  const handleDeleteExercise = async (routineExerciseId) => {
    try {
      const response = await axios.delete(`/api/routines/exercises/${routineExerciseId}`);
      alert(response.data.message);

      // After deleting, update the exercise list in state
      const updatedExercises = createdRoutine.exercises.filter(
        (exercise) => exercise.routine_exercise_id !== routineExerciseId
      );
      setCreatedRoutine((prevState) => ({
        ...prevState,
        exercises: updatedExercises,
      }));
    } catch (err) {
      alert('Failed to delete exercise');
      console.error(err);
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
            {createdRoutine.exercises.map((exercise) => (
              <li key={exercise.routine_exercise_id}>
                {exercise.exercise_name} - {exercise.sets} sets of {exercise.reps} reps
                <button
                  onClick={() => handleDeleteExercise(exercise.routine_exercise_id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdateExercise(exercise.routine_exercise_id, exercise.sets, exercise.reps)}
                  style={{ marginLeft: '10px' }}
                >
                  Update
                </button>
              </li>
            ))}
          </ul>
        </div>
        )}
      
    </div>
  );
};
  

  
  export default Routines;
  