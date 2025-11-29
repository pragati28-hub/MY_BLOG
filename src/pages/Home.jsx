import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useFirebaseAppContext } from "../firebase/FirebaseConfig.jsx";
import PostCard from "../components/PostCard.jsx";

const Home = () => {
  const { db } = useFirebaseAppContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading posts...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center" style={{ color: "#4a90e2", fontWeight: "bold" }}>
        Latest Posts
      </h2>

      {posts.length === 0 && <p className="text-center">No posts available.</p>}

      <div className="row">
        {posts.map(post => (
          <div className="col-md-4 mb-3" key={post.id}>
            <PostCard post={post} refreshPosts={fetchPosts} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
