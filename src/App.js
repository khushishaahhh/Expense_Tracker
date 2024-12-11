import {getAuth} from "firebase/auth";
import {app} from "./firebase";
import Signup from './Signup';
import Login from "./Login";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth(app);
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router> 
    <ToastContainer/>
    </>
  );
}

export default App;