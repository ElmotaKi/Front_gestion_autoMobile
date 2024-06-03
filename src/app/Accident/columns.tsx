
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../components/ui/button"
import IconButton from "@/components/ui/IconButton";
import CustomDialog from "@/components/customComponents/CustomDialog";
import { faCopy, faDeleteLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { } from "../../components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import React, { useState } from "react";
import FormulaireComponentVidange from "@/components/customComponents/FormComponents/FormulaireComponentVidange";
import { createPortal } from "react-dom";
import DemoPageVehicule from "../Vehicule/page";

import DemoPageVehiculetest from "../Vehicule/pagetest";
import FormulaireComponentAccident from "@/components/customComponents/FormComponents/FormulaireComponentAccident";

export type Vidange = {
  id: number;
  photo: string;
  date_accident: Date;
  temps_accident: string;
  lieu: string;
  cout_dommage: number;
  statut_resolution:string;
  id_location:number;
  id_assurance:number;
  Immatriculation:string;
};
const onDeleteSuccess = () => {
  // Placeholder function to trigger data refresh
  console.log("Delete operation successful, refreshing data...");
};


export const columns =[
  // Existing columns for displaying agent details
  
    {
      id: "filter-select",
      header: () => (
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>Filtrer par:</span>
            </DropdownMenuItem>
            <DropdownMenuItem key="photo">photo</DropdownMenuItem>
            <DropdownMenuItem key="date_accident">date_accident</DropdownMenuItem>
            <DropdownMenuItem key="temps_accident">temps_accident</DropdownMenuItem>
            <DropdownMenuItem key="lieu">lieu</DropdownMenuItem>
            <DropdownMenuItem key="cout_dommage">cout_dommage</DropdownMenuItem>
            <DropdownMenuItem key="statut_resolution">statut_resolution</DropdownMenuItem>
            <DropdownMenuItem key="id_location">id_location</DropdownMenuItem>
            <DropdownMenuItem key="id_assurance">id_assurance</DropdownMenuItem>
            <DropdownMenuItem key="Immatriculation">Immatriculation</DropdownMenuItem>
        
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
    id:"photo",
    accessorKey: "photo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        photo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"date_accident",
    accessorKey: "date_accident",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       date_accident
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"temps_accident",
    accessorKey: "temps_accident",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        temps_accident
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"lieu",
    accessorKey: "lieu",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       lieu
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"cout_dommage",
    accessorKey: "cout_dommage",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       cout_dommage
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"statut_resolution",
    accessorKey: "statut_resolution",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       statut_resolution
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"id_location",
    accessorKey: "id_location",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       id_location
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"id_assurance",
    accessorKey: "id_assurance",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       id_assurance
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const accident = row.original; // Access the current agency location data
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
<IconButton onClick={()=>{navigator.clipboard.writeText(accident.id);
toggleform();}
} color="green">
 <FontAwesomeIcon icon={faEdit} />
 </IconButton>

 {formVisible &&
 createPortal(
 <FormulaireComponentAccident formVisible={formVisible} titre={'Modifier'} dataLibaghi={accident} methode={"update"}/>,
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
                <DemoPageVehiculetest data={accident}/>,
                document.getElementById(`vehiculeDiv-${accident.id}`))
              }
              
    
            </div>
          </IconButton>
         
        </div>
 <div style={{ marginRight: '10px' }} />
<div></div>
<div>
<IconButton onClick={() => navigator.clipboard.writeText(accident.id)} color="red" >
    <CustomDialog dataLibaghi={accident} onDeleteSuccess={onDeleteSuccess} nomApi={'accident'} textLtrigger={<FontAwesomeIcon icon={faTrash}  />} />
  </IconButton>
</div>

</div>)}}]
  