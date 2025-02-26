import useStore from '../../zustand/store'


function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);

  return (
//     <>
//       <h2>Get Jacked!</h2>
//       <h3>logged in page...</h3>
//       <p>Your username is: {user.username}</p>
//       <p>Your ID is: {user.id}</p>
//       <button onClick={logOut}>
//         Log Out
//       </button>
//     </>
//   );
// }
<main className="bg-gray-800 text-white min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-4xl font-semibold text-center text-gray-200 mb-4">Get Jacked!</h2>
        <h3 className="text-2xl text-center text-gray-300 mb-4">You're logged in!</h3>
        
        <div className="text-gray-300 mb-4">
          <p><strong className="text-gray-200">Your username:</strong> {user.username}</p>
          <p><strong className="text-gray-200">Your ID:</strong> {user.id}</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={logOut}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4"
          >
            Log Out
          </button>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
