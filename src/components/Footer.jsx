import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'; 
const Footer = () => {
  return (
    <footer style={{
      padding: "20px",
      background: 'linear-gradient(90deg, #4a90e2, #9013fe)',  
      color: "#ffffff",
      textAlign: "center",
      boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",  
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.3s ease"  
    }}>
      <p style={{ fontSize: "1rem", marginBottom: "10px", fontWeight: "bold" }}>
        © 2025 Pragati Kamalpure. All rights reserved.
      </p>
      <div style={{ marginTop: "10px" }}>
        <a href="https://github.com/yourusername" style={{ color: "#ffffff", margin: "0 10px", transition: "color 0.3s" }} target="_blank" rel="noopener noreferrer">
          <FaGithub size={20} /> GitHub
        </a>
        <a href="https://linkedin.com/in/yourusername" style={{ color: "#ffffff", margin: "0 10px", transition: "color 0.3s" }} target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={20} /> LinkedIn
        </a>
        <a href="https://twitter.com/yourusername" style={{ color: "#ffffff", margin: "0 10px", transition: "color 0.3s" }} target="_blank" rel="noopener noreferrer">
          <FaTwitter size={20} /> Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
