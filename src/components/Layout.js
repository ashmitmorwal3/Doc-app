import React, { useState, useRef } from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message   
 } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");   

  };

  // Doctor menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",   

    },
  ];

  // Rendering menu list based on user role
  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  // State for sidebar open/closed state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Ref for accessing the sidebar element
  const sidebarRef = useRef(null);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="main">
        <div className={`layout ${isSidebarOpen && "sidebar-open"}`}>
          <div className="sidebar" ref={sidebarRef}>
            <div className="logo">
              <h6>MorwalDoc</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div className={`menu-item ${isActive && "active"}`}   
 key={menu.name}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>   

                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div 
 className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
              <i class="fa-solid fa-bars"  onClick={toggleSidebar} ></i>

                <Badge count={user 
 && user.notifcation.length} onClick={() => navigate("/notification")}>
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div> 

     
    </>
  );
};

export default Layout;