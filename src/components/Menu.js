import React, { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function to load user data
    const loadUserData = () => {
      // First try localStorage
      let userData = localStorage.getItem("user");
      
      // If not in localStorage, try to get from URL
      if (!userData) {
        const urlParams = new URLSearchParams(window.location.search);
        const userDataParam = urlParams.get('user');
        if (userDataParam) {
          try {
            userData = decodeURIComponent(userDataParam);
            localStorage.setItem("user", userData);
          } catch (error) {
            console.error("Error decoding user data from URL:", error);
          }
        }
      }
      
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Load user data on mount
    loadUserData();

    // Listen for storage changes (when user logs in/out in another tab or window)
    const handleStorageChange = (e) => {
      if (e.key === "user" || e.key === null) {
        loadUserData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also listen for custom event for same-window updates
    window.addEventListener("userDataUpdated", loadUserData);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userDataUpdated", loadUserData);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = (index) => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("userDataUpdated"));
    window.location.href = "http://localhost:3001/";
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  // Update selected menu based on current route
  React.useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path === "") {
      setSelectedMenu(0);
    } else if (path.includes("/orders")) {
      setSelectedMenu(1);
    } else if (path.includes("/holdings")) {
      setSelectedMenu(2);
    } else if (path.includes("/positions")) {
      setSelectedMenu(3);
    } else if (path.includes("/funds")) {
      setSelectedMenu(4);
    } else if (path.includes("/apps")) {
      setSelectedMenu(6);
    }
  }, [location.pathname]);

  return (
    <div className="menu-container">
      <div className="logo-text" style={{ 
        fontSize: '20px', 
        fontWeight: 700, 
        color: '#387ed1',
        textDecoration: 'none'
      }}>
        INVESTA
      </div>
      <div className="menus">
        <ul>
          <li>
            <Link
              className="menu-link"
              to=""
              onClick={() => handleMenuClick(0)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              to="orders"
              onClick={() => handleMenuClick(1)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              to="holdings"
              onClick={() => handleMenuClick(2)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              to="positions"
              onClick={() => handleMenuClick(3)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              to="funds"
              onClick={() => handleMenuClick(4)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              className="menu-link"
              to="apps"
              onClick={() => handleMenuClick(6)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile-dropdown">
          <div className="profile" onClick={handleProfileClick}>
            <div className="avatar">
              {user && user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <p className="username">{user && user.name ? user.name : 'User'}</p>
          </div>
          {isProfileDropdownOpen && (
            <div className="profile-menu">
              <a 
                href="http://localhost:3001/profile" 
                className="profile-menu-item"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                Profile
              </a>
              <hr className="profile-divider" />
              <button 
                className="profile-menu-item"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;