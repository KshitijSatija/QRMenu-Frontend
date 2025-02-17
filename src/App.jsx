import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/loginPage";
import Dashboard from "./pages/dashboard";
import LightButton from "./LightButton";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/light" element={<LightButton/>}/>
      </Routes>
    </Router>
  );
};

export default App;
