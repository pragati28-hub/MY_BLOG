import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { useFirebaseAppContext } from "../firebase/FirebaseConfig.jsx";

export default function EditPost() {
  const { db } = useFirebaseAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      const docRef = doc(db, "posts", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setTitle(data.title);
        setContent(data.content);
      }
    };
    loadPost();
  }, [db, id]);

  // 🔥 Update Post
  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "posts", id), {
      title,
      content,
    });

    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="col-md-7 mx-auto">
        <h2 className="text-center mb-4">Edit Post</h2>

        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100">Update Post</button>
        </form>
      </div>
    </div>
  );
}
