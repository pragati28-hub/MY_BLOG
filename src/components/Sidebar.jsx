import React from "react";
import { Home, User, BarChart2, LogOut } from "lucide-react";

 function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">📝 My Blog</h2>
      <ul>
        <li><Home size={20}/> Home</li>
        <li><User size={20}/> Profile</li>
        <li><BarChart2 size={20}/> Analytics</li>
        <li><LogOut size={20}/> Logout</li>
      </ul>
    </div>
  );
}
export default Sidebar;
