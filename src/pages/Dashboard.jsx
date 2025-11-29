import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, query, where, orderBy } from "firebase/firestore";
import { useFirebaseAppContext } from "../firebase/FirebaseConfig";
import { Link } from "react-router-dom";
import CreatePostModal from "../components/CreatePostModal";

function Dashboard() {
  const { db, user } = useFirebaseAppContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Fetch posts from Firebase
  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        setLoading(true);
        const q = query(
          collection(db, "posts"),
          where("authorName", "==", user.displayName),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [db, user]);

  
  
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">MY POST</h2>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
           Create Post
        </button>
      </div>

      {loading && <div className="text-center mt-5">Loading your posts...</div>}
      {!loading && posts.length === 0 && (
        <p className="text-center">You have not created any posts yet.</p>
      )}

      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4 mb-3" key={post.id}>
            <div
              className="card shadow"
              style={{
                borderRadius: "10px",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">
                  {post.content.length > 100
                    ? post.content.substring(0, 100) + "..."
                    : post.content}
                </p>
                
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && <CreatePostModal onClose={() => setShowModal(false)} onCreate={addPost} />}
    </div>
  );
}

export default Dashboard;
