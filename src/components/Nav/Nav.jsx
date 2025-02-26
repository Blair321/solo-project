import { NavLink } from 'react-router-dom';
import useStore from '../../zustand/store';


function Nav() {
  const user = useStore((store) => store.user);

  return (
    // <nav>
    //   <ul>
    //   { // User is not logged in, render these links:
    //     !user.id && (
    //       <>
    //         <li>
    //           <NavLink to="/login">Login</NavLink>
    //         </li>
    //         <li>
    //           <NavLink to="/registration">Register</NavLink>
    //         </li>
    //       </>
    //     )
    //   }
    //   { // User is logged in, render these links:
    //     user.id && (
    //       <>
    //         <li>
    //           <NavLink to="/">Home</NavLink>
    //         </li>
    //         <li>
    //           <NavLink to="/Log">Log</NavLink>
    //         </li>
    //         <li>
    //         <NavLink to="/Progress">Progress</NavLink>
    //         </li>
    //         <li>
    //         <NavLink to="/Routines">Routines</NavLink>
    //         </li>
    //       </>
    //     )
    //   }
    //   {/* Show these links regardless of auth status: */}
    //     <li>
    //       <NavLink to="/about">About</NavLink>
    //     </li>


    //   </ul>
    // </nav>
    <nav>
      <ul className="flex space-x-6">
        <li>
          <NavLink
            to="/"
            className="text-gray-300 hover:text-white hover:underline transition duration-300"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Log"
            className="text-gray-300 hover:text-white hover:underline transition duration-300"
          >
            Log
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Progress"
            className="text-gray-300 hover:text-white hover:underline transition duration-300"
          >
            Progress
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Routines"
            className="text-gray-300 hover:text-white hover:underline transition duration-300"
          >
            Routines
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className="text-gray-300 hover:text-white hover:underline transition duration-300"
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}


export default Nav;
