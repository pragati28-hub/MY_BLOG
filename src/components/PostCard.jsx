import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";

const PostCard = ({ post }) => {
  return (
    <div 
      className="post-card shadow" 
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
        transition: "transform 0.3s, box-shadow 0.3s"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
     
      {/* 📄 Content Section */}
      <div className="p-3">
        <h4 style={{ fontWeight: "bold", color: "#333" }}>{post.title}</h4>
        <p style={{ color: "#555" }}>
          {post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content}
        </p>

        

        {/* 🏷️ Tags */}
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

        {/* ❤️ Actions */}
        <div className="d-flex justify-content-between align-items-center">
          <Link 
            to={`/post/${post.id}`} 
            className="btn btn-sm btn-outline-primary"
            style={{ transition: "background-color 0.3s" }}
          >
            Read More
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default PostCard;
