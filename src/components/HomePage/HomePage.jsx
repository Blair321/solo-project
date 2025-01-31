import useStore from '../../zustand/store'


function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);

  return (
    <>
      <h2>Get Jacked!</h2>
      <h3>logged in page...</h3>
      <p>Your username is: {user.username}</p>
      <p>Your ID is: {user.id}</p>
      <p>{JSON.stringify(user)}</p>
      <button onClick={logOut}>
        Log Out
      </button>
    </>
  );
}


export default HomePage;
