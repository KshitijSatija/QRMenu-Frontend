import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/loginPage";
import LightButton from "./LightButton";
import RegisterForm from "./pages/registerPage";
import ProfilePage from "./pages/profilePage";
import Dashboard from "./pages/dashboard";
import Sample from "./pages/sample";
import Ini from "./pages/dashboard-ini";
import Navbar from "./components/navbar";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/light" element={<LightButton />} />
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/sample' element={<Sample/>}/>
        <Route path='/ini' element={<Ini/>}/>
        <Route path='/navbar' element={<Navbar/>}/>
        
        
      </Routes>
    </Router>
  );
};

export default App;
