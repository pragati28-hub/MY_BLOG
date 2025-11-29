import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebaseAppContext } from "../firebase/FirebaseConfig.jsx";
import { signOut } from "firebase/auth";

const Navbar = ({ postCount, toggleTheme, isDark }) => {
  const { user, auth } = useFirebaseAppContext();
  const navigate = useNavigate();

  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); 
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        isDark ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } shadow`}
    >
      <div className="container d-flex justify-content-between align-items-center">
       
        <Link className="navbar-brand fw-bold" to="/">
          My Blog
        </Link>

        
        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className="btn btn-outline-secondary me-3"
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        )}

        {/* Navbar links */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard {postCount ? `(${postCount})` : ""}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger ms-2"
                    style={{ borderRadius: "5px" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
