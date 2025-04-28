import { useState, useEffect } from 'react';
import useStore from '../../zustand/store';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const logIn = useStore((state) => state.logIn);
  const errorMessage = useStore((state) => state.authErrorMessage);
  const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

  useEffect(() => {
    // Clear the auth error message when the component unmounts
    return () => {
      setAuthErrorMessage('');
    };
  }, []);

  const handleLogIn = (event) => {
    event.preventDefault();
    logIn({ email, password });
  };

  return (
    <main className="bg-gray-800 text-white min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-200 mb-6">Login</h2>
        <form onSubmit={handleLogIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300">Email:</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

        {errorMessage && (
          <div className="text-red-500 text-center mt-4">
            <h3>{errorMessage}</h3>
          </div>
        )}
      </div>
    </main>
  );
}

export default LoginPage;