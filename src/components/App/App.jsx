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
import RoutineDetails from '../Routines/RoutinesDetails';
function App() {
  const user = useStore((state) => state.user);
  const fetchUser = useStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
//     <>
//       <header>
//         <h1>Prime Solo Project</h1>
//         <Nav />
//       </header>
//       <main>
//         <Routes>
//           <Route 
//             exact path="/"
//             element={
//               user.id ? (
//                 <HomePage /> // Render HomePage for authenticated user.
//               ) : (
//                 <Navigate to="/login" replace /> // Redirect unauthenticated user.
//               )
//             }
//           />
//           <Route 
//             exact path="/login"
//             element={
//               user.id ? (
//                 <Navigate to="/" replace /> // Redirect authenticated user.
//               ) : (
//                 <LoginPage /> // Render LoginPage for unauthenticated user.
//               )
//             }
//           />
//           <Route 
//             exact path="/registration"
//             element={
//               user.id ? (
//                 <Navigate to="/" replace /> // Redirect authenticated user.
//               ) : (
//                 <RegisterPage /> // Render RegisterPage for unauthenticated user.
//               )
//             }
//           />
//           <Route
//           exact path= "/Log"
//           element={<Log />}
//           />
//           <Route
//           exact path= "/Progress"
//           element={<Progress />}
//           />
//           <Route
//           exact path= "/Routines"
//           element={<Routines />}
//           />
//             <Route
//           exact path= "/Routines/:routineId"
//           element={<RoutineDetails />}
//           />
//           <Route 
//             exact path="/about"
//             element={
//               <>
//                 <h2>About Page</h2>
//                 <p>
//                   Intelligence doesn’t seem like an aspect of personal character, and it isn’t.
//                   Coincidentally, great intelligence is only loosely connected to being a good programmer.
//                 </p>
//                 <p>
//                   What? You don’t have to be superintelligent?
//                 </p>
//                 <p>
//                   No, you don’t. Nobody is really smart enough to program computers.
//                   Fully understanding an average program requires an almost limitless capacity
//                   to absorb details and an equal capacity to comprehend them all at the same time.
//                   The way you focus your intelligence is more important than how much intelligence you have…
//                 </p>
//                 <p>
//                   …most of programming is an attempt to compensate for the strictly limited size of our skulls.
//                   The people who are the best programmers are the people who realize how small their brains are.
//                   They are humble. The people who are the worst at programming are the people who refuse to
//                   accept the fact that their brains aren’t equal to the task.
//                   Their egos keep them from being great programmers.
//                   The more you learn to compensate for your small brain, the better a programmer you’ll be.
//                   <span className="squiggle"> The more humble you are, the faster you’ll improve.</span>
//                 </p>
//                 <p>
//                   --From Steve McConnell's <em>Code Complete</em>.
//                 </p>
//               </>
//             }
//           />
//           <Route
//             path="*"
//             element={
//               <h2>404 Page</h2>
//             } 
//           />
//         </Routes>
//       </main>
//       <footer>
//         <p>Copyright © {new Date().getFullYear()}</p>
//       </footer>
//     </>
//   );
// }

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
            exact path="/"
            element={
              user.id ? (
                <HomePage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route 
            exact path="/login"
            element={
              user.id ? (
                <Navigate to="/" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route 
            exact path="/registration"
            element={
              user.id ? (
                <Navigate to="/" replace />
              ) : (
                <RegisterPage />
              )
            }
          />
          <Route exact path="/Log" element={<Log />} />
          <Route exact path="/Progress" element={<Progress />} />
          <Route exact path="/Routines" element={<Routines />} />
          <Route exact path="/Routines/:routineId" element={<RoutineDetails />} />
          <Route 
            exact path="/about"
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
                  …most of programming is an attempt to compensate for the strictly limited size of our skulls. The people who are the best programmers are the people who realize how small their brains are. They are humble. The people who are the worst at programming are the people who refuse to accept the fact that their brains aren’t equal to the task. Their egos keep them from being great programmers.
                </p>
                <p className="text-lg text-gray-300 mb-4">
                  The more you learn to compensate for your small brain, the better a programmer you’ll be. The more humble you are, the faster you’ll improve.
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
        <p>&copy; {new Date().getFullYear()}  All rights reserved.</p>
      </footer>
    </>
  );
}
export default App;
