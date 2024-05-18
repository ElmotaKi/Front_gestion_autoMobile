import { createPortal } from "react-dom";
import { ArrowUpDown, MoreHorizontal,Trash  } from "lucide-react";
 import FormulaireComponentAgent from "@/components/customComponents/FormComponents/FormulaireComponentAgent";
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

import CustomDialog from "@/components/customComponents/CustomDialog";
import IconButton from "@/components/ui/IconButton";
export type Agent = {
  id: number;
  NomAgent: string;
  PrenomAgent: string;
  SexeAgent: string;
  EmailAgent: string;
  TelAgent: string;
  AdresseAgent: string;
  VilleAgent: string;
  CodePostalAgent: string;
  id_agnce:Number;
  NomAgence: string;
};

const onDeleteSuccess = () => {
  // Placeholder function to trigger data refresh
  console.log("Delete operation successful, refreshing data...");
};


export const columns = [
  // Existing columns for displaying agent details
  
    {
      id: "filter-select",
      header: () => (
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>Filtrer par:</span>
            </DropdownMenuItem>
            <DropdownMenuItem key="NomAgent">Nom Agent</DropdownMenuItem>
            <DropdownMenuItem key="PrenomAgent">Prenom Agent</DropdownMenuItem>
            <DropdownMenuItem key="EmailAgent">Email Agent</DropdownMenuItem>
            <DropdownMenuItem key="TelAgent">Tel Agent</DropdownMenuItem>
            <DropdownMenuItem key="AdresseAgent">Adresse Agent</DropdownMenuItem>
            <DropdownMenuItem key="VilleAgent">Ville Agent</DropdownMenuItem>
            <DropdownMenuItem key="CodePostalAgent">CodePostal Agent</DropdownMenuItem>
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
    id:"Nom",
    accessorKey: "NomAgent",
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
    accessorKey: "PrenomAgent",
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
    accessorKey: "SexeAgent",
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
    id:"Email",
    accessorKey: "EmailAgent",
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
    id:"Téléphone",
    accessorKey: "TelAgent",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Telephone
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Adresse",
    accessorKey: "AdresseAgent",
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
    accessorKey: "VilleAgent",
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
    id:"Code Postal",
    accessorKey: "CodePostalAgent",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Code Postal
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Agence",
    accessorKey: "NomAgence",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Agence
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const agent = row.original; // Access the current agency location data
            const [formVisible, setFormVisible] = useState(false);
    const toggleform = ()=>{
      setFormVisible(!formVisible);
    }
      return (<div className="flex justify-between">
        {/* <IconButton onClick={() => navigator.clipboard.writeText(agent.id)}>
  <FontAwesomeIcon icon={faCopy} />
</IconButton> */}
<div>
{/* <IconButton onClick={() => navigator.clipboard.writeText(agent.id)} color="green">
  <CustomDrawer dataLibaghi={agent} textLtrigger={<FontAwesomeIcon icon={faEdit} />} methode={"update"} />
</IconButton> */}
<IconButton onClick={()=>{navigator.clipboard.writeText(agent.id);
toggleform();}
} color="green">
 <FontAwesomeIcon icon={faEdit} />
 </IconButton>

 {formVisible &&
 createPortal(
 <FormulaireComponentAgent formVisible={formVisible} titre={'Modifier'} dataLibaghi={agent} methode={"update"}/>,
 document.getElementById('modifierDiv'))
 }

</div>
<div>
<IconButton onClick={() => navigator.clipboard.writeText(agent.id)} color="red" >
  {/* <CustomDialog dataLibaghi={agent} textLtrigger={<FontAwesomeIcon icon={faTrash} />}/> */}
    <CustomDialog dataLibaghi={agent} onDeleteSuccess={onDeleteSuccess} nomApi={'agent'} textLtrigger={<FontAwesomeIcon icon={faTrash}  />} />
  </IconButton>
</div>

</div>)}}]