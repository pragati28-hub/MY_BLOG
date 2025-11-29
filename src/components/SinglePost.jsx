import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useFirebaseAppContext } from "../firebase/FirebaseConfig.jsx";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { db } = useFirebaseAppContext();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError("");
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Post not found.");
        }
      } catch (err) {
        setError("Error fetching post.");
      }
      setLoading(false);
    };
    fetchPost();
  }, [db, id]);

  if (loading) return <div className="text-center mt-5">Loading post...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;
  if (!post) return <div className="text-center mt-5">No post available.</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow" style={{ borderRadius: "10px", transition: "box-shadow 0.3s" }}>
            {post.imageUrl ? (
              <img src={post.imageUrl} className="card-img-top" alt={post.title} style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
            ) : (
              <img src="https://via.placeholder.com/800x400.png?text=No+Image" className="card-img-top" alt="Placeholder" style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
            )}
            <div className="card-body">
              <h2 className="card-title" style={{ color: "#4a90e2", fontWeight: "bold" }}>{post.title}</h2>
              <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
              <p className="card-text text-muted">By {post.authorName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
