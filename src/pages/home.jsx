// import React, { useState } from "react";
// import { HiMenuAlt3 } from "react-icons/hi";
// import { MdOutlineDashboard } from "react-icons/md";

// import { AiOutlineUser,  } from "react-icons/ai";
// import { Link, Navigate, Outlet, } from "react-router-dom";
// import {CarFront} from 'lucide-react';
// import {SquareParking} from 'lucide-react';
// import { MdGroups } from "react-icons/md";
// import { GrGroup } from "react-icons/gr";
// import {  UserRound  } from "lucide-react";
// import {ReceiptText } from 'lucide-react';
// import {Building2 } from 'lucide-react';
// import { BsInfoSquare } from "react-icons/bs";
// import CustomAvatar from "./CustomAvatar";
// import { AiOutlineBgColors } from "react-icons/ai";
// import { GrDocumentConfig } from "react-icons/gr";
// const Home = () => {
//   const [open, setOpen] = useState(true);
//   const [content,setContent] = useState('Dashboard');
//   if(!window.localStorage.getItem("token")){
//     return <Navigate to="/" />;
//   }
//   const menus = [
//     { name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
//     { name: "Agence", link: "/Agence", icon: AiOutlineUser },
//     { name: "Agents", link: "/Agents", icon: MdGroups },
//     { name: "vehicules", link: "/Vehicules", icon: CarFront },
//     { name: "Parking", link: "/Parking", icon: SquareParking },
//     { name: "Societes", link: "/Societes", icon: Building2 },
//     { name: "Commerciaux", link: "/Commerciaux", icon: GrGroup  },
//     { name: "Client", link: "/ClientParticulier", icon: UserRound  },
//     { name: "Contrat", link: "/Contrat", icon: ReceiptText},
//     { name: "Vidange", link: "/Vidange", icon: AiOutlineBgColors },
//     { name: "Assurance", link: "/Assurance", icon: GrDocumentConfig},
    
//     { name: "Infos", link: "/infos", icon: BsInfoSquare },
    
//   ];
//   const handleMenuClick = (name) => {
//     switch (name) {
//       case 'Agence':
//         setContent('Gestion des agences');
//         break;
//       case 'Agents':
//         setContent('Gestion des agents');
//         break;
//       case 'dashboard':
//         setContent('Dashboard ');
//         break;
//       case 'vehicules':
//         setContent(' Gestion des  vehicules ');
//         break;
//       case 'Parking':
//         setContent('Gestion des parkings ');
//         break;
//       case 'Societes':
//         setContent('Gestion des societes');
//         break;
//       case 'Commerciaux':
//         setContent('Gestion des commerciaux');
//         break;
//       case 'Client':
//         setContent('Gestion des clients');
//         break;
//       case 'Contrat':
//         setContent('Gestion des contrats');
//         break;
//         case 'Vidange':
//         setContent(' Gestion des vidanges ');
//         break;
//         case 'Assurance':
//         setContent(' Gestion des assurances ');
//         break;
//       case 'Infos':
//         setContent('Infos ');
//         break;
//       default:
//         setContent('');
//         break;
//     }
//   };

  
//   return (
//     <section className="flex gap-6 ">
//      <div
//   className={`bg-[#ffffff] min-h-screen border ${open ? "w-70" : "w-16"} duration-500 text-gray-700 px-4 `}
//   style={open ? { position: 'absolute', left: 0, top: 0 } : {position: 'absolute', left: 0, top: 0 }}
// >

//         <div className="py-3 flex justify-end" >
//           <HiMenuAlt3
//             size={26}
//             className="cursor-pointer"
//             onClick={() => setOpen(!open)}
//           />
//         </div>
//         <div className="mt-4 flex flex-col gap-4 relative" >
//           {menus?.map((menu, i) => (
//             <Link
//               to={menu?.link}
//               key={i}
//               className={` ${
//                 menu?.margin && "mt-5"
//               } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-200 rounded-md`}
//               onClick={() => handleMenuClick(menu.name)}
//               >
//               {/*  */}
//               <div >{React.createElement(menu?.icon, { size: "20" })}</div>
//               <h2
//                 // style={{
//                 //   transitionDelay: ${i + 3}00ms,
//                 // }}
//                 // duration-500
//                 className={`whitespace-pre  ${
//                   !open && "opacity-0 translate-x-28 overflow-hidden "
//                 }`}
//               >
//                 {menu?.name}
//               </h2>
//               <h2
//                 className={`${
//                   open && "hidden"
//                 } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
//               >
//                 {menu?.name}
//               </h2>
//             </Link>
//           ))}
//         </div>
//       </div>
//       <div className=" text-xl">
//        <div className='p-3  z-30 bg-gray-500 text-white font-bold rounded-md'   style={open ? { position: 'absolute', left: 218, top: 5 ,width:"84rem",} : {position: 'absolute', right: 210, top: 5,width:"85.4rem"}} ><CustomAvatar />
//       </div> 
//       <div className="" style={open ?{marginTop:"40px",marginLeft:"-17px",fontSize:"17px",fontFamily:'poppins'}:{marginTop:"40px",marginLeft:"-115px",fontSize:"17px",fontFamily:'poppins'}} >  {content}</div>
      
//       <div className="" style={open ? { position: 'absolute', left: 190, top: 70 } : {position: 'absolute', left: 100, top: 70,}}><Outlet/></div>
      
    
//       </div>
//     </section>
//   );
// };

// export default Home;
import React, { useState,useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdGroups, MdVignette } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { Link, Navigate, Outlet } from "react-router-dom";
import { CarFront, SquareParking, UserRound, ReceiptText, Building2, Import } from 'lucide-react';
import { GrGroup } from "react-icons/gr";
import { BsInfoSquare } from "react-icons/bs";
import CustomAvatar from "./CustomAvatar";
import { SlWrench } from "react-icons/sl";
import { AiOutlineBgColors } from "react-icons/ai";
import { GrDocumentConfig } from "react-icons/gr";
import { MdCarRental } from "react-icons/md";
import { GiFlatTire } from "react-icons/gi";
import { MdManageHistory } from "react-icons/md";
import { FaCarCrash } from "react-icons/fa";
const Home = () => {
  const [open, setOpen] = useState(true);
  const [content, setContent] = useState('Dashboard');
  const [activeMenu, setActiveMenu] = useState(null);

  if (!window.localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }
  useEffect(() => {
    if (!open) {
      setActiveMenu(null);
    }
  }, [open]);



  const menus = [
    { name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Agence", link: "/agence", icon: AiOutlineUser },
    { name: "Agents", link: "/agents", icon: MdGroups },
    { name: "Vehicule", link: "#",
     icon: CarFront,toggleIcon:<i className="bi bi-chevron-down"></i>,
      subMenus: [
    { name: "Vehicule", link: "/vehicules", icon: CarFront },
    { name: "Visite Technique", link: "/visitetechnique", icon: SlWrench },
    { name: "Vignette", link: "/vignettes", icon: MdVignette },
    { name: "Vidange", link: "/Vidange", icon: AiOutlineBgColors },
    { name: "Assurance", link: "/Assurance", icon: GrDocumentConfig},
    { name: "Pneumatique", link: "/Pneumatique", icon: GiFlatTire},
    { name: "Accident", link: "/Accident", icon: FaCarCrash },
    ]},
    { name: "Location", link: "/location", icon: MdCarRental  },
    { name: "Parking", link: "/parking", icon: SquareParking },
    { name: "Societes", link: "/societes", icon: Building2 },
    { name: "Commerciaux", link: "/commerciaux", icon: GrGroup },
    { name: "Client", link: "/ClientParticulier", icon: UserRound },
    { name: "Contrat", link: "/contrat", icon: ReceiptText },
    { name: "Historique", link: "/Historique", icon: MdManageHistory  },
    { name: "Infos", link: "/infos", icon: BsInfoSquare },
  ];

  const handleMenuClick = (menu) => {
    if (menu.subMenus) {
      setActiveMenu(activeMenu === menu.name ? null : menu.name);
      setContent(`Gestion des ${menu.name.toLowerCase()}`);
    } else {
      setActiveMenu(null);
      setContent(`Gestion des ${menu.name.toLowerCase()}`);
    }
  };
  



   

 
  return (
    <section className="flex gap-6">
        <div
        className={`bg-[#ffffff] min-h-screen border ${open ? "w-70" : "w-16"} duration-500 text-gray-700 px-2.5`}
        style={open ? { position: 'absolute', left: 0, top: 0, height:"60rem",} : {position: 'absolute', left: 0, top: 0 ,height:"60rem"}}
      
      >
          
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <div key={i}>
              <Link
                to={menu?.link}
                className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-200 rounded-md`}
                onClick={() => handleMenuClick(menu)}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  className={`whitespace-pre ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                >
                  {menu?.name}
                </h2>
                
                {menu.subMenus && (
                  <span className={`ml-auto ${open ? "block" : "hidden"}`}>
                    {menu.toggleIcon}
                  </span>
                )}
                <h2
                  className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {menu?.name}
                </h2>
              </Link>
              {menu.subMenus && activeMenu === menu.name && (
                <div className="pl-8">
                  {menu.subMenus.map((subMenu, j) => (
                    <Link
                      to={subMenu.link}
                      key={j}
                      className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-200 rounded-md "
                      onClick={() => setContent(`Gestion des ${subMenu.name.toLowerCase()}`)}
                    >
                      <div>{React.createElement(subMenu?.icon, { size: "20" })}</div>
                      <h2 className="whitespace-pre">{subMenu.name}</h2>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
             <div className=" text-xl">
        <div className='p-3  z-30 bg-gray-500 text-white font-bold rounded-md'   style={open ? { position: 'absolute', left: 225, top: 5 ,width:"84rem",} : {position: 'absolute', right: 210, top: 5,width:"84rem"}} ><CustomAvatar />
       </div> 
      <div className="" style={open ?{marginTop:"40px",marginLeft:"-11px",fontSize:"17px",fontFamily:'poppins'}:{marginTop:"40px",marginLeft:"-106px",fontSize:"17px",fontFamily:'poppins'}} >  {content}</div>
      
       <div className="" style={open ? { position: 'absolute', left: 193, top: 70 } : {position: 'absolute', left: 100, top: 70,}}><Outlet/></div>
      
    
       </div>
    </section>
  );
};

export default Home;