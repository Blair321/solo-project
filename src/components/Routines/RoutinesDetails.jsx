import useSWR from "swr";
import axios from "axios";
import {useParams, useNavigate } from "react-router-dom"


const fetcher = url => axios.get(url).then(res => res.data);

const RoutineDetails = () => {
    const { routineId } = useParams();
    console.log(routineId);
const { data: routine, error,isLoading } = useSWR(
    routineId ? `/api/routines/${routineId}` : null,  // Only fetch if routineId is set
    fetcher
  );
  if (error) return <p style={{ color: 'red' }}>Failed to load routine details</p>;

  const handleExerciseDelete = async (routineExerciseId) => {
    
    try {
      await axios.delete(`/api/routines/exercises/${routineExerciseId}`);
      alert("Exercise deleted successfully");
       // Re-fetch the data to get the updated routine
       useNavigate('/Routines')
    } catch (err) {
      alert("Failed to delete exercise");
      console.error(err);
    }
  };
  // Handling loading state
  if (isLoading) return <p>Loading...</p>;


  return (
    <div>
      <h2>Routine Details</h2>
      <p><strong>Routine Name:</strong> {routine.routine_name}</p>
      <h3>Exercises:</h3>
      <ul>
        {routine.exercises.map((exercise, index) => (
          <li key={exercise.exercise_id}>
            {exercise.exercise_name} - {exercise.sets} sets of {exercise.reps} reps
            <button onClick={() => {
                debugger; handleExerciseDelete(exercise.routine_exercise_id);
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
       
    </div>
  );
};

export default RoutineDetails;







