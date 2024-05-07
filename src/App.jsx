import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";

const App = () => {
  return (
    <div>
      <Routes>
       <Route exact path="/" element={<Login />} />
       <Route path="/dashboard" element={<Home />} />
        <Route path="/agence" element={<Home />} />
        <Route path="/agents" element={<Home />} />
        <Route path="/vehicules" element={<Home />} />
        <Route path="/parking" element={<Home />} />
        <Route path="/societes" element={<Home />} />
        <Route path="/commerciaux" element={<Home />} />
        <Route path="/client" element={<Home />} />
        <Route path="/contrat" element={<Home />} />
        <Route path="/infos" element={<Home />} />
     
        
      </Routes>
    </div>
  );
};

export default App;
