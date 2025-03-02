import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/loginPage";
import LightButton from "./LightButton";
import RegisterForm from "./pages/registerPage";
import Sample from "./extraPages/sample";
import Ini from "./extraPages/dashboard-ini";
import Navbar from "./components/navbar";
import Landing from "./pages/landing";
import NotFound from "./pages/404Page";
import ProfCont from "./pages/profcont";
import Calendar from "./pages/calendar";
import Suggestions from "./pages/suggestions";
import Dashboard from "./pages/dashboard";
import UserSettings from "./pages/UserSettings";
import InstagramLogin from "./pages/instalogin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/profile" element={<ProfCont />} />
          
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/insta-analytics" element={<InstagramLogin />} />
          <Route path="/settings" element={<UserSettings />} />
        </Route>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        
        <Route path="/light" element={<LightButton />} />
        <Route path='/sample' element={<Sample/>}/>
        <Route path='/ini' element={<Ini/>}/>
        <Route path='/landing' element={<Landing/>}/>
        <Route path="*" element={<NotFound />} />
        
        
        
        
        
        
      </Routes>
    </Router>
  );
};

export default App;
