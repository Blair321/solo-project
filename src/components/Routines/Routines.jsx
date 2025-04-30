import { useState, useEffect } from "react";
import { db } from "../../firebase";
import useStore from '../../zustand/store';
 // <-- your Zustand store
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

const Routines = () => {
  const user = useStore((state) => state.user); // get current user
  const [routineName, setRoutineName] = useState("");
  const [exercises, setExercises] = useState([{ exercise_name: "", sets: "", reps: "" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdRoutine, setCreatedRoutine] = useState(null);

  const handleAddExercise = () => {
    setExercises([...exercises, { exercise_name: "", sets: "", reps: "" }]);
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!user) {
      setError("You must be logged in to create routines.");
      return;
    }

    setLoading(true);
    try {
      const routinesRef = collection(db, "users", user.uid, "workoutRoutines");

      // 🔍 Prevent duplicate routine names
      const q = query(routinesRef, where("routine_name", "==", routineName));
      const existing = await getDocs(q);
      if (!existing.empty) {
        setError("Routine with this name already exists.");
        setLoading(false);
        return;
      }

      // 📝 Add new routine
      const newRoutine = {
        routine_name: routineName,
        createdAt: Timestamp.now(),
        exercises: exercises.map((ex) => ({
          ...ex,
          routine_exercise_id: crypto.randomUUID(),
        })),
      };

      const docRef = await addDoc(routinesRef, newRoutine);
      setCreatedRoutine({ id: docRef.id, ...newRoutine });
      setExercises([{ exercise_name: "", sets: "", reps: "" }]);
      setRoutineName("");
    } catch (err) {
      console.error(err);
      setError("Failed to create routine.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateExercise = async (routineExerciseId, sets, reps) => {
    if (!createdRoutine) return;
    try {
      const updatedExercises = createdRoutine.exercises.map((ex) =>
        ex.routine_exercise_id === routineExerciseId ? { ...ex, sets, reps } : ex
      );
      const routineRef = doc(db, "users", user.uid, "workoutRoutines", createdRoutine.id);
      await updateDoc(routineRef, { exercises: updatedExercises });
      setCreatedRoutine((prev) => ({ ...prev, exercises: updatedExercises }));
      alert("Exercise updated.");
    } catch (err) {
      console.error(err);
      alert("Failed to update exercise.");
    }
  };

  const handleDeleteExercise = async (routineExerciseId) => {
    if (!createdRoutine) return;
    try {
      const updatedExercises = createdRoutine.exercises.filter(
        (ex) => ex.routine_exercise_id !== routineExerciseId
      );
      const routineRef = doc(db, "users", user.uid, "workoutRoutines", createdRoutine.id);
      await updateDoc(routineRef, { exercises: updatedExercises });
      setCreatedRoutine((prev) => ({ ...prev, exercises: updatedExercises }));
      alert("Exercise deleted.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete exercise.");
    }
  };

  return (
    <div className="flex justify-between space-x-6">
      {/* Left Side: Create Routine */}
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
                <label className="text-white">Exercise Name:</label>
                <input
                  type="text"
                  value={exercise.exercise_name}
                  onChange={(e) => handleExerciseChange(index, "exercise_name", e.target.value)}
                  required
                  className="w-full p-2 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="text-white">Sets:</label>
                <input
                  type="number"
                  value={exercise.sets}
                  onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
                  required
                  className="w-full p-2 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="text-white">Reps:</label>
                <input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
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
              {loading ? "Creating Routine..." : "Create Routine"}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Right Side: Display Routine */}
      <div className="w-1/2 p-6 bg-gray-800 rounded-lg shadow-lg">
        {createdRoutine && (
          <>
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
                        onChange={(e) =>
                          handleUpdateExercise(exercise.routine_exercise_id, e.target.value, exercise.reps)
                        }
                        className="w-full p-2 rounded-md bg-gray-600 text-white"
                      />
                    </td>
                    <td className="p-2 border border-gray-500">
                      <input
                        type="number"
                        value={exercise.reps}
                        onChange={(e) =>
                          handleUpdateExercise(exercise.routine_exercise_id, exercise.sets, e.target.value)
                        }
                        className="w-full p-2 rounded-md bg-gray-600 text-white"
                      />
                    </td>
                    <td className="p-2 border border-gray-500">
                      <button
                        onClick={() => handleDeleteExercise(exercise.routine_exercise_id)}
                        className="text-red-500 mr-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Routines;