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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DemoPageClient from "../ClientParticulier/page";
import DemoPageSociete from "../Societe/page";



function Aaaaaa(){
  const [estVisibleClient, setEstVisibleClient] = useState(true);
  const [estVisibleSociete, setEstVisibleSociete] = useState(false);

    const handleSelectChange = (value) => {
      if (value === 'ClientParticulier') {
        setEstVisibleClient(true);
        setEstVisibleSociete(false);
      } else if (value === 'ClientSociete') {
        setEstVisibleClient(false);
        setEstVisibleSociete(true);
      }
    };

  return (
    <div>
      
     <div style={{position:'relative',top:'1rem',left:'84%',marginTop:'6px'}}>
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px] ">
          <SelectValue placeholder="Type Client" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ClientParticulier">Client Particulier</SelectItem>
          <SelectItem value="ClientSociete">Client Societe</SelectItem>
        </SelectContent>
      </Select>
    </div>
      {estVisibleClient && <DemoPageClient />}
      {estVisibleSociete && <DemoPageSociete />}
      </div>
  );
}

export default Aaaaaa;
