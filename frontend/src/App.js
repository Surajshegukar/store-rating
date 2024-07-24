import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Register from "./component/Register";

import SystemState from "./context/SystemState";
import AdminDashboard from "./component/AdminDashboard";
import Store from "./component/Store";
import User from "./component/User";
import { useState } from "react";
import StoreOwnerDashboard from "./component/StoreOwnerDashboard";
import UserDashboard from "./component/UserDashboard";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStoreOwner, setIsStoreOwner] = useState(false);
  const [isUser, setIsUser] = useState(false);

  let role = localStorage.getItem("role");
  

  return (
    <div className="App">
      <SystemState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/store/dashboard" element={<StoreOwnerDashboard />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/user" element={<User />} />
            <Route path="/admin/store" element={<Store />} />
          </Routes>
        </Router>
      </SystemState>
    </div>
  );
}

export default App;
