import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {CarFront} from 'lucide-react';
import {SquareParking} from 'lucide-react';
import { MdGroups } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import {  UserRound  } from "lucide-react";
import {ReceiptText } from 'lucide-react';
import {Building2 } from 'lucide-react';
import { BsInfoSquare } from "react-icons/bs";
import DemoPageAgent from "@/app/Agent/page";
import DemoPageCommercial from "@/app/Commercial/page";
import DemoPageSociete from "@/app/Societe/page";
import DemoPageAgence from "@/app/Agence/page";
import CustomAvatar from "./CustomAvatar";
const Home = () => {
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
    { name: "Client", link: "/client", icon: UserRound  },
    { name: "Contrat", link: "/contrat", icon: ReceiptText},
    { name: "Infos", link: "/infos", icon: BsInfoSquare },
    
  ];
  const [open, setOpen] = useState(true);
  const [content,setContent]=useState(null)
  const handleMenuClick = (name) => {
    switch (name) {
      case 'Agence':
        setContent(<DemoPageAgence/>);
        break;
      case 'Agents':
        setContent(<DemoPageAgent />);
        break;
      case 'dashboard':
        setContent('dashboard content');
        break;
      case 'vehicules':
        setContent('vehicules content');
        break;
      case 'Parking':
        setContent('Parking content');
        break;
      case 'Societes':
        setContent(<DemoPageSociete/>);
        break;
      case 'Commerciaux':
        setContent(<DemoPageCommercial/>);
        break;
      case 'Client':
        setContent('Client content');
        break;
      case 'Contrat':
        setContent('Contrat content');
        break;
      case 'Infos':
        setContent('Infos content');
        break;
      default:
        setContent('');
        break;
    }
  };

  
  return (
    <section className="flex gap-6 ">
      <div
        className={`bg-[#ffffff] min-h-screen border ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-700 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-200 rounded-md`}
              onClick={() => handleMenuClick(menu.name)}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
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
      
      <div className="  flex justify-end mt-5 mr-5" style={{marginBottom:"-65px"}}> <CustomAvatar/></div>
      <div className="">  {content}</div>
    
      
      </div>
    </section>
  );
};

export default Home;
