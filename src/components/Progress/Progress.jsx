import { useEffect, useState } from "react";
import { db } from "../../firebase";
import useStore from "../../zustand/store";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ProgressSection = () => {
  const user = useStore((state) => state.user);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ensure progressLogs exists for the user
  useEffect(() => {
    const ensureSubcollection = async () => {
      if (!user) return;

      const logsRef = collection(db, "users", user.uid, "progressLogs");
      const snapshot = await getDocs(logsRef);

      if (snapshot.empty) {
        const starterLog = {
          exercise: "Bench Press",
          weight: 45,
          date: new Date().toISOString(),
          createdAt: Timestamp.now(),
        };
        await addDoc(logsRef, starterLog);
      }

      fetchProgressData(); // fetch data after creating if needed
    };

    const fetchProgressData = async () => {
      const logsRef = collection(db, "users", user.uid, "progressLogs");
      const snapshot = await getDocs(logsRef);
      const logs = snapshot.docs.map((doc) => doc.data());

      const unique = Array.from(new Set(logs.map((l) => l.exercise)));
      setExercises(unique);
      setSelectedExercise(unique[0]);
      setProgressData(logs);
      setLoading(false);
    };

    ensureSubcollection();
  }, [user]);

  const filteredData = progressData
    .filter((log) => log.exercise === selectedExercise)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const chartData = {
    labels: filteredData.map((log) =>
      new Date(log.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Weight Lifted (lbs)",
        data: filteredData.map((log) => log.weight),
        fill: false,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgb(59, 130, 246)",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        title: { display: true, text: "Weight (lbs)" },
      },
      x: {
        title: { display: true, text: "Date" },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-semibold text-white mb-4">Progress Tracker</h2>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : exercises.length === 0 ? (
        <p className="text-white">No progress data yet. Start logging your workouts!</p>
      ) : (
        <>
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="mb-4 p-2 rounded-md bg-gray-700 text-white w-full"
          >
            {exercises.map((ex) => (
              <option key={ex} value={ex}>
                {ex}
              </option>
            ))}
          </select>

          {filteredData.length > 0 ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <p className="text-white">No data for this exercise yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProgressSection;
  