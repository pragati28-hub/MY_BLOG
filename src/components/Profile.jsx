import React, { useState, useEffect } from "react";
import { useFirebaseAppContext } from "../firebase/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Card, Spinner, Button } from "react-bootstrap";

function Profile() {
  const { auth, db } = useFirebaseAppContext();
  const [userProfile, setUserProfile] = useState({ name: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isViewing, setIsViewing] = useState(false); // 👈 toggle state for view/edit mode

  const user = auth ? auth.currentUser : null;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setError("You must be logged in to view this page.");
        setLoading(false);
        return;
      }

      try {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        } else {
          setUserProfile({
            name: user.displayName || "",
            bio: "",
            email: user.email || "",
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, db]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, userProfile, { merge: true });
      setMessage("Profile updated successfully!");
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Please check your connection.");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Loading your profile...</span>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center mt-4" role="alert">
        {error}
      </div>
    );

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <Card className="shadow-lg border-0">
        <Card.Body>
          <h3 className="text-center mb-4 fw-bold">
            {isViewing ? "Your Profile Details" : "Edit Your Profile"}
          </h3>

          {/* 👇 Conditional Rendering for View/Edit */}
          {isViewing ? (
            <div className="text-center">
              <h5 className="fw-bold text-primary">{userProfile.name}</h5>
              <p className="text-muted">{userProfile.email}</p>
              <p className="mt-3">{userProfile.bio || "No bio available"}</p>

              <Button
                variant="secondary"
                className="mt-3 w-100"
                onClick={() => setIsViewing(false)}
              >
                Edit Profile
              </Button>
            </div>
          ) : (
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={userProfile.name}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={userProfile.email || ""}
                  readOnly
                />
                <small className="text-muted">Email cannot be changed</small>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Bio</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={userProfile.bio}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, bio: e.target.value })
                  }
                  placeholder="Tell us something about yourself..."
                ></textarea>
              </div>

              {message && (
                <div className="alert alert-success py-2 text-center">
                  {message}
                </div>
              )}
              {error && (
                <div className="alert alert-danger py-2 text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 mt-3"
                style={{
                  transition: "0.3s",
                  fontWeight: "600",
                  borderRadius: "8px",
                }}
              >
                Update Profile
              </button>

              <Button
                variant="outline-success"
                className="w-100 mt-3"
                onClick={() => setIsViewing(true)}
              >
                View Profile
              </Button>
            </form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
