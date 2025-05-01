import { useEffect, useState } from "react";
import { db } from "../../firebase";
import useStore from "../../zustand/store";
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";

const Log = () => {
  const user = useStore((state) => state.user);

  const [logList, setLogList] = useState([]);
  const [exercise, setExercise] = useState('');
  const [setNumber, setSetNumber] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [exertionLevel, setExertionLevel] = useState('');

  useEffect(() => {
    if (user) {
      fetchLogs();
    }
  }, [user]);

  // Fetch logs from workouts subcollection
  const fetchLogs = async () => {
    try {
      const logsRef = collection(db, 'users', user.uid, 'workouts');
      const querySnapshot = await getDocs(logsRef);
      const logs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLogList(logs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  // Handle log submission and store progress logs
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please log in to submit a workout log.');
      return;
    }

    const newLog = {
      exercise,
      set_number: setNumber,
      reps,
      weight,
      exertion_level: exertionLevel,
      timestamp: Timestamp.now(),
    };

    const newProgressLog = {
      exercise,
      weight: Number(weight),
      reps: Number(reps),
      date: Timestamp.now(),
    };

    try {
      // Store workout log in "workouts" collection
      const logsRef = collection(db, 'users', user.uid, 'workouts');
      await addDoc(logsRef, newLog);

      // Store progress log in "progressLogs" collection for progress tracking
      const progressRef = collection(db, 'users', user.uid, 'progressLogs');
      await addDoc(progressRef, newProgressLog);

      fetchLogs(); // Fetch updated logs

      // Reset form fields after successful submission
      setExercise('');
      setSetNumber('');
      setReps('');
      setWeight('');
      setExertionLevel('');
    } catch (error) {
      console.error('Error adding log:', error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-800 text-white p-6">
      <section className="bg-gray-700 w-full max-w-2xl p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-semibold text-center mb-4">Log Workout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Exercise:</label>
            <input
              type="text"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-600 text-white"
            />
          </div>
          <div>
            <label className="block mb-1">Set Number:</label>
            <input
              type="number"
              value={setNumber}
              onChange={(e) => setSetNumber(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white"
            />
          </div>
          <div>
            <label className="block mb-1">Reps:</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white"
            />
          </div>
          <div>
            <label className="block mb-1">Weight:</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white"
            />
          </div>
          <div>
            <label className="block mb-1">Exertion Level:</label>
            <input
              type="number"
              value={exertionLevel}
              onChange={(e) => setExertionLevel(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
          >
            Submit Log
          </button>
        </form>
      </section>

      {/* Your exercise log display section */}
      <section className="bg-gray-700 w-full max-w-4xl p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Your Exercise Logs</h2>
        {logList.length === 0 ? (
          <p className="text-center text-gray-300">No logs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-600 text-center">
              <thead className="bg-gray-600">
                <tr>
                  <th className="border border-gray-500 px-4 py-2">Date</th>
                  <th className="border border-gray-500 px-4 py-2">Exercise</th>
                  <th className="border border-gray-500 px-4 py-2">Set</th>
                  <th className="border border-gray-500 px-4 py-2">Reps</th>
                  <th className="border border-gray-500 px-4 py-2">Weight</th>
                  <th className="border border-gray-500 px-4 py-2">Exertion</th>
                </tr>
              </thead>
              <tbody>
                {logList.map((log, index) => (
                  <tr key={index} className="hover:bg-gray-600">
                    <td className="border border-gray-500 px-4 py-2">
                      {log.timestamp?.toDate?.().toLocaleDateString?.() ?? 'N/A'}
                    </td>
                    <td className="border border-gray-500 px-4 py-2">{log.exercise}</td>
                    <td className="border border-gray-500 px-4 py-2">{log.set_number}</td>
                    <td className="border border-gray-500 px-4 py-2">{log.reps}</td>
                    <td className="border border-gray-500 px-4 py-2">{log.weight}</td>
                    <td className="border border-gray-500 px-4 py-2">{log.exertion_level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default Log;