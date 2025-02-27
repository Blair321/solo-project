import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';


function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const register = useStore((state) => state.register)
  const errorMessage = useStore((state) => state.authErrorMessage);
  const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

  useEffect(() => {
    // Clear the auth error message when the component unmounts:
    return () => {
      setAuthErrorMessage('');
    }
  }, [])

  const handleRegister = (event) => {
    event.preventDefault();

    register({
      username: username,
      password: password,
    })
  };

  return (
    <main className="bg-gray-800 text-white min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-200 mb-6">Register</h2>
        <form onSubmit={handleRegister}>
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
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>

        {/* Conditionally render registration error */}
        {errorMessage && (
          <div className="text-red-500 text-center mt-4">
            <h3>{errorMessage}</h3>
          </div>
        )}
      </div>
    </main>
  );
}
//     <>
//       <h2>Register Page</h2>
//       <form onSubmit={handleRegister}>
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
//           Register 
//         </button>
//       </form>
//       { // Conditionally render registration error:
//         errorMessage && (
//           <h3>{errorMessage}</h3>
//         )
//       }
//     </>
//   );
// }


export default RegisterPage;
