// import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./components/Auth/Login";
import DemoPageAgent from "./app/Agent/page";
import Dashboard from "./Dashboard/dashboard";
import DemoPageContrat from "./app/Contrat/page";
import DemoPageAgence from "./app/Agence/page";
import DemoPageParkings from "./app/Parking/page";
import { QueryClient, QueryClientProvider } from "react-query"; 
import DemoPageSociete from "./app/Societe/page";
import DemoPageCommercial from "./app/Commercial/page";
import DemoPageVehicule from "./app/Vehicule/page";
import Aaaaaa from "./app/ClientPar/client";
import Pneu from "./app/pneu/pneumatique";
import DemoPageVidange from "./app/Vidange/page";
import DemoPageAssurance from "./app/Assurance/page";
import DemoPageVignette from "./app/Vignette/page";
import DemoPageVisite from "./app/VisiteTechnique/page";
import DemoPageLocation from "./app/Location/page";
import DemoPagePneumatique from "./app/Pneumatique/page";
import DemoPageHistorique from "./app/Historique/page";
import DemoPageAccident from "./app/Accident/page";

import Card from "./app/profil/profilCard"
const queryClient = new QueryClient(); 
const App = () => {
  return (
   <>
     <QueryClientProvider client={queryClient}> 
<Routes>
  <Route exact path="/" element={<Login />} />
  <Route element={<Home/>}>
  <Route path="/dashboard" element={<Dashboard/>} />
  <Route path="/agents" element={<DemoPageAgent/>} />
   <Route path="/ClientParticulier" element={<Aaaaaa />} />
   <Route path="/societes" element={<DemoPageSociete/>} />
  <Route path="/commerciaux" element={<DemoPageCommercial/>} /> 
  <Route path="/contrat" element={<DemoPageContrat/>} />
  <Route path="/agence" element={<DemoPageAgence/>} />
   <Route path="/parking" element={<DemoPageParkings/>} />
  <Route path="/vehicules" element={<DemoPageVehicule/>} /> 
  <Route path="/Vidange" element={<DemoPageVidange/>} /> 
  <Route path="/Assurance" element={<DemoPageAssurance/>} /> 
  <Route path="/vignettes" element={<DemoPageVignette/>} /> 
  <Route path="/visitetechnique" element={<DemoPageVisite/>}/>
  <Route path="/location" element={<DemoPageLocation/>}/>
  {/* <Route path="/Pneumatique" element={<DemoPagePneumatique/>}/> */}
  <Route path="/Pneumatique" element={<Pneu/>}/>
  <Route path="/Historique" element={<DemoPageHistorique/>}/>
  <Route path="/Accident" element={<DemoPageAccident/>}/>
  <Route path="/profile" element={<Card/>}/>
  </Route>
</Routes>

</QueryClientProvider>
   </>
    
  );
};

export default App;