import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

// Get user data from URL params and sync it to localStorage
const syncUserData = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const userDataParam = urlParams.get('user');
  
  if (token) {
    localStorage.setItem("token", token);
    
    // If user data is in URL, save it to localStorage
    if (userDataParam) {
      try {
        const decodedUserData = decodeURIComponent(userDataParam);
        localStorage.setItem("user", decodedUserData);
        // Dispatch event to notify components
        window.dispatchEvent(new Event("userDataUpdated"));
      } catch (error) {
        console.error("Error parsing user data from URL:", error);
      }
    } else {
      // If no user data in URL, try to get from current localStorage
      // This handles the case where user navigates back to dashboard
      const existingUser = localStorage.getItem("user");
      if (!existingUser) {
        // If still no user data, try to fetch from API using token
        // For now, we'll rely on URL parameter or existing localStorage
      }
    }
  }
};

// Sync user data on load
syncUserData();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);