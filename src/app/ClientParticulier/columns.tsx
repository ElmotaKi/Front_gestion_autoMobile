
import { createPortal } from "react-dom";
import { ArrowUpDown, MoreHorizontal,Trash  } from "lucide-react";
 import FormulaireComponentClient from "@/components/customComponents/FormComponents/FormulaireComponentClient";
import { Button } from "../../components/ui/button";
import React,{useState,useEffect} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { faCopy, faDeleteLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { Checkbox } from "../../components/ui/checkbox"

import CustomDrawer from "@/components/customComponents/CustomDrawer";
import CustomDialog from "@/components/customComponents/CustomDialog";
import IconButton from "@/components/ui/IconButton";

export type ClientParticulier = {
    id:number;
    Nom:string;
    Prenom:string;
    Sexe:string;
    DateNaissance:Date;
    Tel:string;
    Email:string;
    Adresse:string;
    Ville:string;
    CodePostal:string;
    CIN:string;
    DateValidCIN:Date;
    NumeroPermis:string;
    TypePermis:string;
    NumeroPasseport:string;
    TypePassport:string;
    DateFinPassport:Date;
    AdresseEtrangere:string;
};
const onDeleteSuccess = () => {
  // Placeholder function to trigger data refresh
  console.log("Delete operation successful, refreshing data...");
};
export const columns = [
  // Existing columns for displaying agent detail
    {
      id: "filter-select",
      header: () => (
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>Filtrer par:</span>
            </DropdownMenuItem>
            <DropdownMenuItem key="Nom">Nom</DropdownMenuItem>
            <DropdownMenuItem key="Prenom">Prenom</DropdownMenuItem>
            <DropdownMenuItem key="Sexe">Sexe</DropdownMenuItem>
            <DropdownMenuItem key="DateNaissance">DateNaissance</DropdownMenuItem>
            <DropdownMenuItem key="Tel">Tel</DropdownMenuItem>
            <DropdownMenuItem key="Email">Email</DropdownMenuItem>
            <DropdownMenuItem key="Adresse">Adresse</DropdownMenuItem>
            <DropdownMenuItem key="Ville">Ville</DropdownMenuItem>
            <DropdownMenuItem key="CodePostal">CodePostal</DropdownMenuItem>
            <DropdownMenuItem key="CIN">CIN</DropdownMenuItem>
            <DropdownMenuItem key="DateValidCIN">DateValidCIN</DropdownMenuItem>
            <DropdownMenuItem key="NumeroPermis">NumeroPermis</DropdownMenuItem>
            <DropdownMenuItem key="TypePermis">TypePermis</DropdownMenuItem>
            <DropdownMenuItem key="NumeroPasseport">NumeroPasseport</DropdownMenuItem>
            <DropdownMenuItem key="TypePassport">TypePassport</DropdownMenuItem>
            <DropdownMenuItem key="DateFinPassport">DateFinPassport</DropdownMenuItem>
            <DropdownMenuItem key="AdresseEtrangere">AdresseEtrangere</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      cell: () => null, // Empty cell for the dropdown
      enableSorting: false,
      enableHiding: false,
    },
    {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id:"nom",
    accessorKey: "Nom",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nom
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Prenom",
    accessorKey: "Prenom",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Prenom
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Sexe",
    accessorKey: "Sexe",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Sexe
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"DateNaissance",
    accessorKey: "DateNaissance",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        DateNaissance
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Tel",
    accessorKey: "Tel",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tel
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Email",
    accessorKey: "Email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Adresse",
    accessorKey: "Adresse",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Adresse
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Ville",
    accessorKey: "Ville",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Ville
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"CodePostal",
    accessorKey: "CodePostal",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        CodePostal
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"CIN",
    accessorKey: "CIN",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        CIN
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"DateValidCIN",
    accessorKey: "DateValidCIN",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        DateValidCIN
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"NumeroPermis",
    accessorKey: "NumeroPermis",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        NumeroPermis
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"TypePermis",
    accessorKey: "TypePermis",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        TypePermis
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"NumeroPasseport",
    accessorKey: "NumeroPasseport",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        NumeroPasseport
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"TypePassport",
    accessorKey: "TypePassport",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        TypePassport
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"DateFinPassport",
    accessorKey: "DateFinPassport",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        DateFinPassport
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"AdresseEtrangere",
    accessorKey: "AdresseEtrangere",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        AdresseEtrangere
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const clientparticulier = row.original; // Access the current agency location data
      const [formVisible, setFormVisible] = useState(false);
      const toggleform = ()=>{
        setFormVisible(!formVisible);
      }
        return (<div className="flex justify-between">
          {/* <IconButton onClick={() => navigator.clipboard.writeText(agent.id)}>
    <FontAwesomeIcon icon={faCopy} />
  </IconButton> */}
  <div>
  <IconButton onClick={() => navigator.clipboard.writeText(clientparticulier.id)} color="red" >
    {/* <CustomDialog dataLibaghi={agent} textLtrigger={<FontAwesomeIcon icon={faTrash} />}/> */}
    <CustomDialog dataLibaghi={clientparticulier}  onDeleteSuccess={onDeleteSuccess} nomApi={"clientparticulier"} textLtrigger={<FontAwesomeIcon icon={faTrash} />} />
  </IconButton>
  </div>
  <div>
  {/* <IconButton onClick={() => navigator.clipboard.writeText(agent.id)} color="green">
    <CustomDrawer dataLibaghi={agent} textLtrigger={<FontAwesomeIcon icon={faEdit} />} methode={"update"} />
  </IconButton> */}
  <IconButton onClick={()=>{navigator.clipboard.writeText(clientparticulier.id);
  toggleform();}
  } color="green">
   <FontAwesomeIcon icon={faEdit} />
   </IconButton>
  
   {formVisible &&
   createPortal(
   <FormulaireComponentClient formVisible={formVisible} titre={'Modifier'} dataLibaghi={clientparticulier} methode={"update"}/>,
   document.getElementById('modifierDiv'))
   }
  
  </div>
  </div>)
    },
  },]
