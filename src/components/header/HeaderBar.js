import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase';

export function HeaderBar(props) {
  const [user, loading, error] = useAuthState(auth);
  const [navbarToggled, setNavbarToggled] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Florida Homeschool Standards</NavLink>
        <button className="navbar-toggler" aria-controls="main-nav" aria-expanded={navbarToggled} aria-label="Toggle navigation" onClick={setNavbarToggled}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${navbarToggled ? 'show' : ''}`} id="main-nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
