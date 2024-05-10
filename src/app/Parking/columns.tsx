
import { createPortal } from "react-dom";
import { ArrowUpDown, MoreHorizontal,Trash  } from "lucide-react";
import FormulaireComponentParking from "../formulaire/FormulaireComponentParking";
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

export type Parking = {
  id: number;
  Capacite: number;
  pannes: string;
  PlaceRestantes: number;
};

export const columns = [
  {
    id: "filter-select",
    header: () => (
      <DropdownMenu>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <span>Filtrer par:</span>
          </DropdownMenuItem>
          <DropdownMenuItem key="Capacite">Capacite</DropdownMenuItem>
          <DropdownMenuItem key="pannes">Pannes</DropdownMenuItem>
          <DropdownMenuItem key="PlaceRestantes">PlaceRestantes</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: () => null,
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
    id:"Capacité",
    accessorKey: "Capacite",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Capacite
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    id:"pannes",
    accessorKey: "pannes",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        pannes
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    id:"Place Restantes",
    accessorKey: "PlaceRestantes",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        PlaceRestantes
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const parking = row.original; // Access the current agency location data

      const [formVisible, setFormVisible] = useState(false);
      const toggleform = ()=>{
        setFormVisible(!formVisible);
      }
        return (<div className="flex justify-between">
          {/* <IconButton onClick={() => navigator.clipboard.writeText(agent.id)}>
    <FontAwesomeIcon icon={faCopy} />
  </IconButton> */}
  <div>
  <IconButton onClick={() => navigator.clipboard.writeText(parking.id)} color="red" >
    {/* <CustomDialog dataLibaghi={agent} textLtrigger={<FontAwesomeIcon icon={faTrash} />}/> */}
    <CustomDialog dataLibaghi={parking} nomApi={parking} textLtrigger={<FontAwesomeIcon icon={faTrash} />} />
  </IconButton>
  </div>
  <div>
  {/* <IconButton onClick={() => navigator.clipboard.writeText(agent.id)} color="green">
    <CustomDrawer dataLibaghi={agent} textLtrigger={<FontAwesomeIcon icon={faEdit} />} methode={"update"} />
  </IconButton> */}
  <IconButton onClick={()=>{navigator.clipboard.writeText(parking.id);
  toggleform();}
  } color="green">
   <FontAwesomeIcon icon={faEdit} />
   </IconButton>
  
   {formVisible &&
   createPortal(
   <FormulaireComponentParking formVisible={formVisible} titre={'Modifier'} dataLibaghi={parking} methode={"update"}/>,
   document.getElementById('modifierDiv'))
   }
  
  </div>
  </div>)}}]
