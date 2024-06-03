
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import CustomDrawer from "@/components/customComponents/CustomDrawer";
import { Button } from "../../components/ui/button";
import CustomDialog from "@/components/customComponents/CustomDialog";
import { faCopy, faDeleteLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from "@/components/ui/IconButton";
import { FaPlus } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Checkbox } from "../../components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog"
import React, { useState } from "react";
import VignetteApi from "@/services/Admin/VehiculeApi";
import { Navigate } from "react-router-dom";
import FormulaireComponentcommercial from "@/components/customComponents/FormComponents/FormulaireComponentCommercial";
import { createPortal } from "react-dom";
import FormulaireComponentVignette from "@/components/customComponents/FormComponents/FormulaireComponentVignette";
import DemoPageVehiculetest from "../Vehicule/pagetest";

export type Vignette = {
  id: number;
  designation:string;
  status: string;
  date_vignette: number;
  date_expiration_vignette: number;
  id_vehicule:number;
 
  
  
};
const onDeleteSuccess = () => {
  // Placeholder function to trigger data refresh
  console.log("Delete operation successful, refreshing data...");
};
export const columns = [

  
  // Existing columns for displaying commercial details
  
    {
      id: "filter-select",
      header: () => (
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>Filtrer par:</span>
            </DropdownMenuItem>
            <DropdownMenuItem key="CIN">CIN</DropdownMenuItem>
            <DropdownMenuItem key="Nom">Nom</DropdownMenuItem>
            <DropdownMenuItem key="Prenom">Prenom</DropdownMenuItem>
            <DropdownMenuItem key="Sexe">Sexe</DropdownMenuItem>
            <DropdownMenuItem key="DateNaissance">DateNaissance</DropdownMenuItem>
            <DropdownMenuItem key="Tel">Tel</DropdownMenuItem>
            <DropdownMenuItem key="Adresse">Adresse</DropdownMenuItem>
            <DropdownMenuItem key="Ville">Ville</DropdownMenuItem>
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
    id:"designation",
    accessorKey: "designation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       designation
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
    id:"date_vignette",
    accessorKey: "date_vignette",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       date_vignette
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"date_expiration_vignette",
    accessorKey: "date_expiration_vignette",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        date_expiration_vignette
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
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const vignette = row.original; // Access the current agency location data
            const [formVisible, setFormVisible] = useState(false);
            const [Visible, setVisible] = useState(false);
            const toggle = () =>{
              setVisible(!Visible)
            }
    const toggleform = ()=>{
      setFormVisible(!formVisible);
    }
    return (<div className="flex justify-between">
    <div>
    <IconButton onClick={()=>{navigator.clipboard.writeText(vignette.id);
    toggleform();}
    } color="green">
     <FontAwesomeIcon icon={faEdit} />
     </IconButton>
    
     {formVisible &&
     createPortal(
     <FormulaireComponentVignette formVisible={formVisible} titre={'Modifier'} dataLibaghi={vignette} methode={"update"}/>,
     document.getElementById('modifierDiv'))
     }
    
    </div>
    <div style={{ marginRight: '10px' }} />
<div>
          <IconButton 
            onClick={ ()=>{
              toggle();
            } }
            color="gray" 
          >
            <FaPlus />
            <div style={{position:'relative',top:'1rem',right:'50rem'}}>
            {Visible &&
              createPortal(
                <DemoPageVehiculetest data={vignette}/>,
                document.getElementById(`vehiculeDiv-${vignette.id}`))
              }
            </div>
          </IconButton>
        </div>
 <div style={{ marginRight: '10px' }} />
<div></div>
    <div>
    <IconButton onClick={() => navigator.clipboard.writeText(vignette.id)} color="red" >
        <CustomDialog dataLibaghi={vignette} onDeleteSuccess={onDeleteSuccess} nomApi={'vignette'} textLtrigger={<FontAwesomeIcon icon={faTrash}  />} />
      </IconButton>
    </div>
    
    </div>)}}]