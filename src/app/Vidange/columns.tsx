
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

export type Vidange = {
  id: number;
  DateVidange: Date;
  TypeVidange: string;
  DureeDeVidange: number;
  Cout: number;
  KilometrageDerniereVidange: number;
  Immatriculation:string;
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
            <DropdownMenuItem key="DateVidange">DateVidange</DropdownMenuItem>
            <DropdownMenuItem key="TypeVidange">TypeVidange</DropdownMenuItem>
            <DropdownMenuItem key="DureeDeVidange">DureeDeVidange</DropdownMenuItem>
            <DropdownMenuItem key="Cout">Cout</DropdownMenuItem>
            <DropdownMenuItem key="KilometrageDerniereVidange">KilometrageDerniereVidange</DropdownMenuItem>
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
    id:"DateVidange",
    accessorKey: "DateVidange",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        DateVidange
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"TypeVidange",
    accessorKey: "TypeVidange",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       TypeVidange
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"DureeDeVidange",
    accessorKey: "DureeDeVidange",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        DureeDeVidange
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Cout",
    accessorKey: "Cout",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       Cout
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"KilometrageDerniereVidange",
    accessorKey: "KilometrageDerniereVidange",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       KilometrageDerniereVidange
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  
  {
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const vidange = row.original; // Access the current agency location data
            const [formVisible, setFormVisible] = useState(false);
    const toggleform = ()=>{
      setFormVisible(!formVisible);
    }
      return (<div className="flex justify-between">
<div>
<IconButton onClick={()=>{navigator.clipboard.writeText(vidange.id);
toggleform();}
} color="green">
 <FontAwesomeIcon icon={faEdit} />
 </IconButton>

 {formVisible &&
 createPortal(
 <FormulaireComponentVidange formVisible={formVisible} titre={'Modifier'} dataLibaghi={vidange} methode={"update"}/>,
 document.getElementById('modifierDiv'))
 }

</div>
<div style={{ marginRight: '10px' }} />
<div>
          <IconButton 
            onClick={() => {/* Action à effectuer sur le clic du bouton Plus */}} 
            color="gray" 
          >
            <FaPlus />
          </IconButton>
        </div>
 <div style={{ marginRight: '10px' }} />
<div></div>
<div>
<IconButton onClick={() => navigator.clipboard.writeText(vidange.id)} color="red" >
    <CustomDialog dataLibaghi={vidange} onDeleteSuccess={onDeleteSuccess} nomApi={'vidange'} textLtrigger={<FontAwesomeIcon icon={faTrash}  />} />
  </IconButton>
</div>

</div>)}}]
  