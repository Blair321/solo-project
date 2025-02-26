import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const logIn = useStore((state) => state.logIn)
  const errorMessage = useStore((state) => state.authErrorMessage);
  const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

  useEffect(() => {
    // Clear the auth error message when the component unmounts:
    return () => {
      setAuthErrorMessage('');
    }
  }, [])

  const handleLogIn = (event) => {
    event.preventDefault();

    logIn({
      username: username,
      password: password,
    })
  };

  return (
    <>
      

      <main className="bg-gray-800 text-white min-h-screen flex items-center justify-center p-6">
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full sm:w-96">
          <h2 className="text-3xl font-semibold text-center text-gray-200 mb-6">Login</h2>
          <form onSubmit={handleLogIn}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-300">Username:</label>
              <input
                type="text"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mt-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-300">Password:</label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Log In
              </button>
            </div>
          </form>

          {/* Conditionally render login error */}
          {errorMessage && (
            <div className="text-red-500 text-center mt-4">
              <h3>{errorMessage}</h3>
            </div>
          )}
        </div>
      </main>

     
    </>
  );
}

//     <>
//       <h2>Login Page</h2>
//       <form onSubmit={handleLogIn}>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           required
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">
//           Log In
//         </button>
//       </form>
//       { // Conditionally render login error:
//         errorMessage && (
//           <h3>{errorMessage}</h3>
//         )
//       }
//     </>
//   );
// }


export default LoginPage;
