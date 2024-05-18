import React, { useState } from "react";
import { Button, Navbar, NavDropdown, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DemoPageClient from "../ClientParticulier/page";
import DemoPageSociete from "../Societe/page";


function Aaaaaa(){
  const [estVisibleClient, setEstVisibleClient] = useState(true);
  const [estVisibleSociete, setEstVisibleSociete] = useState(false);

  function clientVisible(){
    setEstVisibleClient(true);
    setEstVisibleSociete(false);
  }

  function societeVisible(){
    setEstVisibleClient(false);
    setEstVisibleSociete(true);
  }

  return (
    <div>
      <div className=" aaaa ">
        <DropdownMenu >
      
        <DropdownMenuTrigger style={{position:"relative",left:"27.9em"}}  className="h-10  button rounded bg-gray-700 text-white  px-3 font-bold">
        Choisissez un Client
    </DropdownMenuTrigger>
      
        
  <DropdownMenuContent>
    <DropdownMenuLabel>Type Client</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={clientVisible}>ClientParticulier</DropdownMenuItem>
    <DropdownMenuItem onClick={societeVisible}>ClientSociete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
      </div>
    


      {estVisibleClient && <DemoPageClient />}
      {estVisibleSociete && <DemoPageSociete />}
      </div>
  );
}

export default Aaaaaa;
