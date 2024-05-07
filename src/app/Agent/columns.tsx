
import { ArrowUpDown, MoreHorizontal,Trash  } from "lucide-react";

import { Button } from "../../components/ui/button";
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
import React from "react";
import CustomDrawer from "@/components/customComponents/CustomDrawer";
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
  NomAgence:string
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
        NomAgent
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
        PrenomAgent
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
        SexeAgent
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
        EmailAgent
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
        TelAgent
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
        AdresseAgent
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
        VilleAgent
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
        CodePostalAgent
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "NomAgence",
    accessorKey: "NomAgence", 
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nom Agence
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "id_agence", 
  },
  {
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const agent = row.original; // Access the current agency location data

      return (<div className="flex justify-between">
        {/* <IconButton onClick={() => navigator.clipboard.writeText(agent.id)}>
  <FontAwesomeIcon icon={faCopy} />
</IconButton> */}
<div>
<IconButton onClick={() => navigator.clipboard.writeText(agent.id)} color="red" >
  {/* <CustomDialog dataLibaghi={agent} textLtrigger={<FontAwesomeIcon icon={faTrash} />}/> */}
  <CustomDialog dataLibaghi={agent} textLtrigger={<FontAwesomeIcon icon={faTrash} />} />
</IconButton>
</div>
<div>
<IconButton onClick={() => navigator.clipboard.writeText(agent.id)} color="green">
  <CustomDrawer dataLibaghi={agent} textLtrigger={<FontAwesomeIcon icon={faEdit} />} methode={"update"} />
</IconButton>
</div>
</div>)}}]