import { NavLink } from 'react-router-dom';
import useStore from '../../zustand/store';

function Nav() {
  const user = useStore((store) => store.user);

  return (
    <nav>
      <ul className="flex space-x-4">
        {/* User is not logged in, show Login/Register links */}
        {!user?.uid && (
          <>
            <li>
              <NavLink to="/login" className="hover:underline">Login</NavLink>
            </li>
            <li>
              <NavLink to="/registration" className="hover:underline">Register</NavLink>
            </li>
          </>
        )}

        {/* User is logged in, show app links */}
        {user?.uid && (
          <>
            <li>
              <NavLink to="/" className="hover:underline">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Log" className="hover:underline">Log</NavLink>
            </li>
            <li>
              <NavLink to="/Progress" className="hover:underline">Progress</NavLink>
            </li>
            <li>
              <NavLink to="/Routines" className="hover:underline">Routines</NavLink>
            </li>
          </>
        )}

        {/* Always show About link */}
        <li>
          <NavLink to="/about" className="hover:underline">About</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;