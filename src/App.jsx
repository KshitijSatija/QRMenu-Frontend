import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/loginPage";
import LightButton from "./LightButton";
import RegisterForm from "./pages/registerPage";
import Navbar from "./components/navbar";
import NotFound from "./pages/404Page";
import Dashboard from "./pages/dashboard";
import UserSettings from "./pages/UserSettings";
import MenuDashboard from "./pages/MenuDashboard";

import PublicMenuLanding from "./components/PublicMenuLanding";
import CategoryDetails from "./components/CategoryDetails";

import MenuLogs from "./pages/MenuLogs";
import Landing from "./pages/landing";

import ContactSection from "./components/contactForm";
/*

import Landing from "./pages/landing_old";
import PublicMenu from "./pages/PublicMenu";
import AnalyticsDashboard from './pages/AnalyticsDashboard';
<Route path="/profile" element={<ProfCont />} />
          
<Route path="/calendar" element={<Calendar />} />
<Route path="/suggestions" element={<Suggestions />} />
<Route path="/insta-analytics" element={<InstagramLogin />} />
<Route path="/analytics" element={<AnalyticsDashboard />} />
*/
        

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/dashboard" element={<Dashboard/>}/>
          
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/menu-dashboard" element={<MenuDashboard />} />
          <Route path="/menu-logs" element={<MenuLogs/>}/>
          
        </Route>
        <Route path="/restaurant/:restaurantName" element={<PublicMenuLanding />} />
        <Route path="/restaurant/:restaurantName/category/:categoryId" element={<CategoryDetails />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        
        <Route path="/light" element={<LightButton />} />
        <Route path='/landing' element={<Landing/>}/>
        
        <Route path='/contact' element={<ContactSection/>}/>
        <Route path="*" element={<NotFound />} />
        
        
        
        
        
        
      </Routes>
    </Router>
  );
};

export default App;
