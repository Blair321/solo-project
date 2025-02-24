import useSWR from "swr";
import axios from "axios";
import {useParams} from "react-router-dom"


const fetcher = url => axios.get(url).then(res => res.data);

const RoutineDetails = () => {
    const { routineId } = useParams();
    console.log(routineId);
const { data: routine, error,isLoading } = useSWR(
    routineId ? `/api/routines/${routineId}` : null,  // Only fetch if routineId is set
    fetcher
  );
  if (error) return <p style={{ color: 'red' }}>Failed to load routine details</p>;

  // Handling loading state
  if (isLoading) return <p>Loading...</p>;


  return (
    <div>
      <h2>Routine Details</h2>
      <p><strong>Routine Name:</strong> {routine.routine_name}</p>
      <h3>Exercises:</h3>
      <ul>
        {routine.exercises.map((exercise, index) => (
          <li key={index}>
            {exercise.exercise_name} - {exercise.sets} sets of {exercise.reps} reps
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoutineDetails;







