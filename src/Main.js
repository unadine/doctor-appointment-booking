import React from "react";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AdminRoute from "./components/AdminRoute";


const Main = () => {
    return (
      <Router >
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<AdminRoute component={Dashboard}/>}/>

       </Routes>
      </Router>
    );
  }
  
  export default Main;