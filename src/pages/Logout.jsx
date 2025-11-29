import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useFirebaseAppContext } from "../firebase/FirebaseConfig.jsx";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { auth } = useFirebaseAppContext();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        setMessage("You have successfully logged out!");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect to login after 2 seconds
      } catch (error) {
        setMessage("Error logging out: " + error.message);
      }
    };

    handleLogout();
  }, [auth, navigate]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow text-center" style={{ borderRadius: "10px" }}>
            <div className="card-body">
              <h2 className="card-title mb-4" style={{ color: "#4a90e2" }}>
                Logout
              </h2>
              {message ? (
                <div className="alert alert-info" role="alert">
                  {message}
                </div>
              ) : (
                <div className="alert alert-warning" role="alert">
                  Logging you out...
                </div>
              )}
              <div className="spinner-border text-primary mt-3" role="status">
                <span className="visually-hidden">Logging out...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
