import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseAppContext } from "../firebase/FirebaseConfig.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { auth } = useFirebaseAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // For displaying errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");  // Clear previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);  // Display error message
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow" style={{ borderRadius: "10px", transition: "box-shadow 0.3s" }}>
            <div className="card-body">
              <h2 className="card-title text-center mb-4" style={{ color: "#4a90e2" }}>Login</h2>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ transition: "border-color 0.3s" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" style={{ background: "#4a90e2", transition: "background-color 0.3s" }}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
