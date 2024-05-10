import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import DemoPageAgent from "./app/Agent/page";
import DemoPageClientParticulier from "./app/ClientParticulier/page";
import Dashboard from "./Dashboard/dashboard";
import DemoPageSociete from "./app/Societe/page";
import DemoPageCommercial from "./app/Commercial/page";
import DemoPageContrat from "./app/Contrat/page";
import DemoPageAgence from "./app/Agence/page";
import DemoPageParkings from "./app/Parking/page";
import DemoPageVehicule from "./app/Vehicule/page";

const App = () => {
  return (
   
<Routes>
  <Route exact path="/" element={<Login />} />
  <Route element={<Home/>}>
  <Route path="/dashboard" element={<Dashboard/>} />
  <Route path="/agents" element={<DemoPageAgent/>} />
  <Route path="/ClientParticulier" element={<DemoPageClientParticulier/>} />
  <Route path="/societes" element={<DemoPageSociete/>} />
  <Route path="/commerciaux" element={<DemoPageCommercial/>} />
  <Route path="/contrat" element={<DemoPageContrat/>} />
  <Route path="/agence" element={<DemoPageAgence/>} />
  <Route path="/parking" element={<DemoPageParkings/>} />
  <Route path="/vehicules" element={<DemoPageVehicule/>} />
  </Route>
</Routes>

     
    
  );
};

export default App;
