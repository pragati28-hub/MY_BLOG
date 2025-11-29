import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useFirebaseAppContext } from "../firebase/FirebaseConfig.jsx";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { db, storage, user } = useFirebaseAppContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);


 
  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let imageUrl = "";

     

      // Add post to Firestore
      await addDoc(collection(db, "posts"), {
        title,
        content,
        authorName: user?.displayName || "Anonymous",
        createdAt: serverTimestamp(),
        imageUrl,
        likes: 0,
        comments: 0,
        tags: [],
      });

      
      setTitle("");
      setContent("");
     
      setPreview(null);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "An error occurred while creating the post.");
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow" style={{ borderRadius: "12px", transition: "0.3s" }}>
            <div className="card-body">
              <h2 className="card-title text-center mb-4" style={{ color: "#4a90e2" }}>
                 Create New Post
              </h2>
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
               
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    placeholder="Enter post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <textarea
                    id="content"
                    className="form-control"
                    placeholder="Write something amazing..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={4}
                  />
                </div>

                
                {preview && (
                  <div className="mb-3 text-center">
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ maxWidth: "100%", borderRadius: "8px" }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  style={{ background: "#4a90e2" }}
                  disabled={loading}
                >
                  {loading ? "Creating Post..." : "Create Post"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  
}