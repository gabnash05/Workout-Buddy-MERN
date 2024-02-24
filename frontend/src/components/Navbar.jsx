import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout.jsx';
import { useAuthContext }  from '../hooks/useAuthContext'

export default function Navbar() {

  const { logout } = useLogout();
  const { user } = useAuthContext();

  function handleClick() {
    logout();
  }


  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>

          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          
          {!user && (
            <div>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </div>
          )}
        </nav>
      </div>  
    </header>
  );
}