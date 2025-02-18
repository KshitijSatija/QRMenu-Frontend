import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/loginPage";
import Dashboard from "./pages/dashboard";
import LightButton from "./LightButton";
import RegisterForm from "./pages/registerPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/light" element={<LightButton />} />
      </Routes>
    </Router>
  );
};

export default App;
