
import { createPortal } from "react-dom";
import { ArrowUpDown, MoreHorizontal,Trash  } from "lucide-react";
 import FormulaireComponentVehicule from "@/components/customComponents/FormComponents/FormulaireComponentVehicule";
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
import FormulaireComponentLocation from "@/components/customComponents/FormComponents/FormulaireComponentLocation";

export type Location = {
  dateDebutLocation: Date,
  dateFinLocation: Date,
  Contrat:string,
  NbrJours: number,
  Montant:number,
  status:'Complete' | 'encours',
  DateRetourPrevue: Date,
  DateRetourVoiture : Date,
  KilometrageAvant:number,
  KilometrageApres:number,
  ImageApres:string,
  ImageAvant:string,
  Immatriculation:string,
  NomAgent:string,
  NomClient:string,
  RaisonSocial:string,
  nomContrat:string
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
            <DropdownMenuItem key="dateDebutLocation">dateDebutLocation</DropdownMenuItem>
            <DropdownMenuItem key="dateFinLocation">dateFinLocation</DropdownMenuItem>
            <DropdownMenuItem key="Contrat">Contrat</DropdownMenuItem>
            <DropdownMenuItem key="NbrJours">NbrJours</DropdownMenuItem>
            <DropdownMenuItem key="Montant">Montant</DropdownMenuItem>
            <DropdownMenuItem key="status">status</DropdownMenuItem>
            <DropdownMenuItem key="DateRetourPrevue">DateRetourPrevue</DropdownMenuItem>
            <DropdownMenuItem key="DateRetourVoiture">DateRetourVoiture</DropdownMenuItem>
            <DropdownMenuItem key="KilometrageAvant">KilometrageAvant</DropdownMenuItem>
            <DropdownMenuItem key="KilometrageApres">KilometrageApres</DropdownMenuItem>
            <DropdownMenuItem key="ImageApres">ImageApres</DropdownMenuItem>
            <DropdownMenuItem key="ImageAvant">ImageAvant</DropdownMenuItem>
            <DropdownMenuItem key="Immatriculation">Immatriculation</DropdownMenuItem>
            <DropdownMenuItem key="NomAgent">NomAgent</DropdownMenuItem>
            <DropdownMenuItem key="NomClient">NomClient</DropdownMenuItem>
            <DropdownMenuItem key="RaisonSocial">RaisonSocial</DropdownMenuItem>
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
    id:"nomContrat",
    accessorKey: "nomContrat",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        nomContrat
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Contrat",
    accessorKey: "Contrat",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Contrat
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Immatriculation",
    accessorKey: "Immatriculation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Immatriculation
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"NomAgent",
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
    id:"Nom",
    accessorKey: "NomClient",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        NomClient
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"RaisonSocial",
    accessorKey: "RaisonSocial",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        RaisonSocial
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"dateDebutLocation",
    accessorKey: "dateDebutLocation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        dateDebutLocation
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"dateFinLocation",
    accessorKey: "dateFinLocation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        dateFinLocation
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"status",
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
 
  {
    id:"Montant",
    accessorKey: "Montant",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Montant
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"NbrJours",
    accessorKey: "NbrJours",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        NbrJours
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"KilometrageApres",
    accessorKey: "KilometrageApres",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        KilometrageApres
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"KilometrageAvant",
    accessorKey: "KilometrageAvant",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        KilometrageAvant
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"ImageApres",
    accessorKey: "ImageApres",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ImageApres
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"ImageAvant",
    accessorKey: "ImageAvant",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ImageAvant
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const location = row.original; // Access the current agency location data
      const [formVisible, setFormVisible] = useState(false);
      const toggleform = ()=>{
        setFormVisible(!formVisible);
      }
        return (<div className="flex justify-between">
        
  
  <div>
  
  <IconButton onClick={()=>{navigator.clipboard.writeText(location.id);
  toggleform();}
  } color="green">
   <FontAwesomeIcon icon={faEdit} />
   </IconButton>
  
   {formVisible &&
   createPortal(
   <FormulaireComponentLocation formVisible={formVisible} titre={'Modifier'} dataLibaghi={location} methode={"update"}/>,
   document.getElementById('modifierDiv'))
   }
  
  </div>
  <div>
  <IconButton onClick={() => navigator.clipboard.writeText(location.id)} color="red" >
    <CustomDialog dataLibaghi={location}  onDeleteSuccess={onDeleteSuccess} nomApi={"location"} textLtrigger={<FontAwesomeIcon icon={faTrash} />} />
  </IconButton>
  </div>
  </div>
  
)
    },
  },]
