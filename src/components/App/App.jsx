import { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import useStore from '../../zustand/store';
import Nav from '../Nav/Nav';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Log from '../Log/Log';
import Progress from '../Progress/Progress';
import Routines from '../Routines/Routines';
function App() {
  const user = useStore((state) => state.user);
  const fetchUser = useStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Barbell Buddy</h1>
        <Nav />
      </div>
    </header>

    <main className="bg-gray-800 text-white container mx-auto p-6">
      <Routes>
        <Route 
          path="/"
          element={
            user?.uid ? (  // ✅ safer check: Firebase user has .uid not .id
              <HomePage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route 
          path="/login"
          element={
            user?.uid ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route 
          path="/registration"
          element={
            user?.uid ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterPage />
            )
          }
        />
        <Route path="/Log" element={<Log />} />
        <Route path="/Progress" element={<Progress />} />
        <Route path="/Routines" element={<Routines />} />
        <Route 
          path="/about"
          element={
            <section className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">About Page</h2>
              <p className="text-lg text-gray-300 mb-4">
                Intelligence doesn’t seem like an aspect of personal character, and it isn’t. Coincidentally, great intelligence is only loosely connected to being a good programmer.
              </p>
              <p className="text-lg text-gray-300 mb-4">
                What? You don’t have to be superintelligent?
              </p>
              <p className="text-lg text-gray-300 mb-4">
                No, you don’t. Nobody is really smart enough to program computers. Fully understanding an average program requires an almost limitless capacity to absorb details and an equal capacity to comprehend them all at the same time.
              </p>
              <p className="text-lg text-gray-300 mb-4">
                The way you focus your intelligence is more important than how much intelligence you have…
              </p>
              <p className="text-lg text-gray-300 mb-4">
                …most of programming is an attempt to compensate for the strictly limited size of our skulls. The best programmers realize how small their brains are. They are humble.
              </p>
              <p className="text-lg text-gray-300 font-semibold mt-4">
                -- From Steve McConnell's <em className="italic text-blue-400">Code Complete</em>.
              </p>
            </section>
          }
        />
        <Route path="*" element={<h2 className="text-center text-xl font-bold">404 - Page Not Found</h2>} />
      </Routes>
    </main>

    <footer className="bg-gray-900 text-white text-center p-4">
      <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  </>
);


  }
export default App;
