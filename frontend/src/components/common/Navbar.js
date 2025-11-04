import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          E-Learning Platform
        </Link>
        <ul className="navbar-menu">
          {!isAuthenticated ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/courses">Courses</Link></li>
              {user?.role === 'student' && (
                <li><Link to="/dashboard">Dashboard</Link></li>
              )}
              {user?.role === 'instructor' && (
                <li><Link to="/instructor">My Courses</Link></li>
              )}
              {user?.role === 'admin' && (
                <li><Link to="/admin">Admin</Link></li>
              )}
              <li>
                <span className="user-name">Hello, {user?.name}</span>
              </li>
              <li>
                <button onClick={logout} className="btn-logout">Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
