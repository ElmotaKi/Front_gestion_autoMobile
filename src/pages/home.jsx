import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";

import { AiOutlineUser,  } from "react-icons/ai";
import { Link, Navigate, Outlet, } from "react-router-dom";
import {CarFront} from 'lucide-react';
import {SquareParking} from 'lucide-react';
import { MdGroups } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import {  UserRound  } from "lucide-react";
import {ReceiptText } from 'lucide-react';
import {Building2 } from 'lucide-react';
import { BsInfoSquare } from "react-icons/bs";
import CustomAvatar from "./CustomAvatar";
// import DemoPageAgent from "@/app/Agent/page";
// import DemoPageCommercial from "@/app/Commercial/page";
// import DemoPageSociete from "@/app/Societe/page";
// import DemoPageAgence from "@/app/Agence/page";
// import DemoPageClientParticulier from "@/app/ClientParticulier/page";
// import CustomAvatar from "./CustomAvatar";
// import DemoPageContrat from "@/app/Contrat/page";
const Home = () => {
  const [open, setOpen] = useState(true);
  const [content,setContent] = useState('Dashboard');
  if(!window.localStorage.getItem("token")){
    return <Navigate to="/" />;
  }
  const menus = [
    { name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Agence", link: "/agence", icon: AiOutlineUser },
    { name: "Agents", link: "/agents", icon: MdGroups },
    { name: "vehicules", link: "/vehicules", icon: CarFront },
    { name: "Parking", link: "/parking", icon: SquareParking },
    { name: "Societes", link: "/societes", icon: Building2 },
    { name: "Commerciaux", link: "/commerciaux", icon: GrGroup  },
    { name: "Client", link: "/ClientParticulier", icon: UserRound  },
    { name: "Contrat", link: "/contrat", icon: ReceiptText},
    { name: "Infos", link: "/infos", icon: BsInfoSquare },
    
  ];
  const handleMenuClick = (name) => {
    switch (name) {
      case 'Agence':
        setContent('Gestion des agences');
        break;
      case 'Agents':
        setContent('Gestion des agents');
        break;
      case 'dashboard':
        setContent('Dashboard ');
        break;
      case 'vehicules':
        setContent(' Gestion des  vehicules ');
        break;
      case 'Parking':
        setContent('Gestion des parkings ');
        break;
      case 'Societes':
        setContent('Gestion des societes');
        break;
      case 'Commerciaux':
        setContent('Gestion des commerciaux');
        break;
      case 'Client':
        setContent('Gestion des clients');
        break;
      case 'Contrat':
        setContent('Gestion des contrats');
        break;
      case 'Infos':
        setContent('Infos ');
        break;
      default:
        setContent('');
        break;
    }
  };

  
  return (
    <section className="flex gap-6 ">
     <div
  className={`bg-[#ffffff] min-h-screen border ${open ? "w-70" : "w-16"} duration-500 text-gray-700 px-4 `}
  style={open ? { position: 'absolute', left: 0, top: 0 } : {position: 'absolute', left: 0, top: 0 }}
>

        <div className="py-3 flex justify-end" >
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative" >
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-200 rounded-md`}
              onClick={() => handleMenuClick(menu.name)}
              >
              {/*  */}
              <div >{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                // style={{
                //   transitionDelay: `${i + 3}00ms`,
                // }}
                // duration-500
                className={`whitespace-pre  ${
                  !open && "opacity-0 translate-x-28 overflow-hidden "
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className=" text-xl">
       <div className='p-3  z-30 bg-gray-500 text-white font-bold rounded-md'   style={open ? { position: 'absolute', left: 218, top: 5 ,width:"84rem",} : {position: 'absolute', right: 210, top: 5,width:"85.4rem"}} ><CustomAvatar />
      </div> 
      <div className="" style={open ?{marginTop:"40px",marginLeft:"-17px",fontSize:"17px",fontFamily:'poppins'}:{marginTop:"40px",marginLeft:"-160px",fontSize:"17px",fontFamily:'poppins'}} >  {content}</div>
      
      <div className="" style={open ? { position: 'absolute', left: 190, top: 70 } : {position: 'absolute', left: 50, top: 70,}}><Outlet/></div>
      
    
      </div>
    </section>
  );
};

export default Home;
 