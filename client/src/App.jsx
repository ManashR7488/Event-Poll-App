import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreatePoll from "./components/CreatePoll";
import PollDetails from "./components/PollDetails";
import Register from "./components/Register";
import Home from "./components/Home";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes className="bg-gray-900 min-h-screen text-white">
        {/* If user is logged in, show Dashboard, otherwise show Login */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/create" element={user ? <CreatePoll /> : <Navigate to="/" />} />
        <Route path="/poll/:pollId" element={user ? <PollDetails /> : <Navigate to="/" />} />
        <Route path="/*" element={<div className="text-white ">Nothing Here</div>} />
      </Routes>
    </Router>
  );
};

export default App;
