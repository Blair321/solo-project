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
  const handleExerciseChanges = (routineExerciseId, field, value) => {
    const updatedExercises = exercises.map(exercise =>
      exercise.routine_exercise_id === routineExerciseId
        ? { ...exercise, [field]: value }
        : exercise
    );
    setExercises(updatedExercises);
    if (createdRoutine) {
      const updatedCreatedRoutine = {
        ...createdRoutine,
        exercises: createdRoutine.exercises.map(exercise =>
          exercise.routine_exercise_id === routineExerciseId
            ? { ...exercise, [field]: value }
            : exercise
        ),
      };
      setCreatedRoutine(updatedCreatedRoutine);
    }
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
      if (createdRoutine) {
        const updatedCreatedRoutine = {
          ...createdRoutine,
          exercises: createdRoutine.exercises.map(exercise =>
            exercise.routine_exercise_id === routineExerciseId
              ? { ...exercise, sets: updatedSets, reps: updatedReps }
              : exercise
          ),
        };
        setCreatedRoutine(updatedCreatedRoutine);
      }
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
  
<div className="flex justify-between space-x-6">
{/* Left Side: Routine Creation Form */}
<div className="w-1/2 p-6 bg-gray-800 rounded-lg shadow-lg">
  <h2 className="text-2xl font-semibold text-white mb-4">Add New Routine</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="routineName" className="text-white">Routine Name:</label>
      <input
        type="text"
        id="routineName"
        value={routineName}
        onChange={(e) => setRoutineName(e.target.value)}
        required
        className="w-full p-2 rounded-md bg-gray-700 text-white"
      />
    </div>

    {exercises.map((exercise, index) => (
      <div key={index} className="space-y-3">
        <h3 className="text-lg font-medium text-white">Exercise {index + 1}</h3>
        <div>
          <label htmlFor={`exerciseName-${index}`} className="text-white">Exercise Name:</label>
          <input
            type="text"
            id={`exerciseName-${index}`}
            value={exercise.exercise_name}
            onChange={(e) => handleExerciseChange(index, 'exercise_name', e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
        </div>
        <div>
          <label htmlFor={`sets-${index}`} className="text-white">Sets:</label>
          <input
            type="number"
            id={`sets-${index}`}
            value={exercise.sets}
            onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
        </div>
        <div>
          <label htmlFor={`reps-${index}`} className="text-white">Reps:</label>
          <input
            type="number"
            id={`reps-${index}`}
            value={exercise.reps}
            onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
        </div>
      </div>
    ))}

    <div>
      <button
        type="button"
        onClick={handleAddExercise}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add Another Exercise
      </button>
    </div>

    <div>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        {loading ? 'Creating Routine...' : 'Create Routine'}
      </button>
    </div>
  </form>

  {error && <p className="text-red-500">{error}</p>}
</div>

{/* Right Side: Exercises Table */}
<div className="w-1/2 p-6 bg-gray-800 rounded-lg shadow-lg">
  {createdRoutine && (
    <div>
      <h3 className="text-2xl font-semibold text-white mb-4">Created Routine:</h3>
      <p className="text-white"><strong>Routine Name:</strong> {createdRoutine.routine_name}</p>
      <h4 className="text-xl font-semibold text-white mt-4">Exercises:</h4>
      <table className="table-auto w-full text-white border-collapse mt-4">
        <thead>
          <tr className="bg-gray-600">
            <th className="p-2 border border-gray-500">Exercise Name</th>
            <th className="p-2 border border-gray-500">Sets</th>
            <th className="p-2 border border-gray-500">Reps</th>
            <th className="p-2 border border-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {createdRoutine.exercises.map((exercise) => (
            <tr key={exercise.routine_exercise_id} className="bg-gray-700">
              <td className="p-2 border border-gray-500">{exercise.exercise_name}</td>
              <td className="p-2 border border-gray-500">
  <input
    type="number"
    value={exercise.sets}
    onChange={(e) => handleExerciseChanges(exercise.routine_exercise_id, 'sets', e.target.value)}
    className="w-full p-2 rounded-md bg-gray-600 text-white"
  />
</td>
<td className="p-2 border border-gray-500">
  <input
    type="number"
    value={exercise.reps}
    onChange={(e) => handleExerciseChanges(exercise.routine_exercise_id, 'reps', e.target.value)}
    className="w-full p-2 rounded-md bg-gray-600 text-white"
  />
</td>

              {/* <td className="p-2 border border-gray-500">{exercise.sets}</td>
              <td className="p-2 border border-gray-500">{exercise.reps}</td> */}
              
              <td className="p-2 border border-gray-500">
                <button
                  onClick={() => handleDeleteExercise(exercise.routine_exercise_id)}
                  className="text-red-500 mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdateExercise(exercise.routine_exercise_id, exercise.sets, exercise.reps)}
                  className="text-blue-500"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
</div>
);
};

  
  export default Routines;
  