import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";

import "./index.css";
import Register from "./component/Register";
import Home from "./component/Home";
import ProtectedRoute from "./utils/ProtectedRoutes";
import SplashScreen from "./component/SplashScreen";
const App = () => {
  return (
    <>
    <SplashScreen/>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
       <Route path="/Home" element={
        <ProtectedRoute>
          <Home />
          </ProtectedRoute>
       }/>
        
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;