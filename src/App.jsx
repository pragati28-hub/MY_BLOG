import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreatePost from "./components/CreatePostModal.jsx";
import SinglePost from "./components/SinglePost.jsx";
import Profile from './components/Profile.jsx'; 
import Sidebar from "./components/Sidebar.jsx";
import PostCard from "./components/PostCard.jsx";
import Logout from "./pages/Logout.jsx";
import EditPost from "./pages/EditPost.jsx"



function App() {
  return (
    <Router>
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />  
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/post/:id" element={<Sidebar />} />
          <Route path="/post/:id" element={<PostCard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/edit/:id" element={<EditPost />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
