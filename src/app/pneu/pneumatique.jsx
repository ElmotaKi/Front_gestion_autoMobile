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

import DemoPagePneumatiqueActuelle from "../Pneumatique/pageActuelle";
import DemoPagePneumatiquechange from "../Pneumatique/pageChangé";
import DemoPagePneumatiqueAchanger from "../Pneumatique/pageAchanger";
import DemoPagePneumatique from "../Pneumatique/page";



function Pneu(){
  const [estVisible, setEstVisible] = useState(true);
  const [estVisibleActuelle, setEstVisibleActuelle] = useState(false);
  const [estVisibleHistorique, setEstVisibleHistorique] = useState(false);
  const [estVisibleAchanger, setEstVisibleAchanger] = useState(false);
    const handleSelectChange = (value) => {
      if (value === 'actuelle') {
        setEstVisible(false)
        setEstVisibleActuelle(true);
        setEstVisibleHistorique(false);
        setEstVisibleAchanger(false);
      } else if (value === 'achanger') {
        setEstVisible(false)
        setEstVisibleActuelle(false);
        setEstVisibleHistorique(false);
        setEstVisibleAchanger(true);
      }
      else if (value === 'change') {
        setEstVisible(false)
        setEstVisibleActuelle(false);
        setEstVisibleHistorique(true);
        setEstVisibleAchanger(false);
      }
    };

  return (
    <div>
      
     <div style={{position:'relative',top:'1rem',left:'84%',marginTop:'6px'}}>
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px] ">
          <SelectValue placeholder="l'etat du pneu" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="actuelle">Pneu Actuelle</SelectItem>
          <SelectItem value="achanger">Pneu a Changer</SelectItem>
          <SelectItem value="change">Pneu changé</SelectItem>
        </SelectContent>
      </Select>
    </div>
      {estVisible && <DemoPagePneumatique />}
      {estVisibleActuelle && <DemoPagePneumatiqueActuelle />}
      {estVisibleHistorique && <DemoPagePneumatiquechange />}
      {estVisibleAchanger && <DemoPagePneumatiqueAchanger />}
      </div>
  );
}

export default Pneu;
