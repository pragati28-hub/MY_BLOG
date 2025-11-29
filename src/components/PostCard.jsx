import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { useFirebaseAppContext } from "../firebase/FirebaseConfig.jsx";

const PostCard = ({ post, refreshPosts }) => {
  const { db, user } = useFirebaseAppContext();
  const navigate = useNavigate();

  // ✅ Delete Post
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    await deleteDoc(doc(db, "posts", post.id));
    refreshPosts(); // Reload posts after delete
  };

  // Check if current logged user is author
  const isAuthor = user?.displayName === post.authorName;

  return (
    <div
      className="post-card shadow"
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div className="p-3">
        <h4 style={{ fontWeight: "bold", color: "#333" }}>{post.title}</h4>

        <p style={{ color: "#555" }}>
          {post.content.length > 100
            ? post.content.substring(0, 100) + "..."
            : post.content}
        </p>

        {/* Tags */}
        <div className="mb-2">
          {post.tags?.map((tag, i) => (
            <span
              key={i}
              className="badge bg-primary me-1"
              style={{ fontSize: "0.75rem" }}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <Link
            to={`/post/${post.id}`}
            className="btn btn-sm btn-outline-primary"
          >
            Read More
          </Link>

          {/* Only show Edit / Delete to author */}
          {isAuthor && (
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => navigate(`/edit/${post.id}`)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
