
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
import { createPortal } from "react-dom";
import FormulaireComponentVisite from "@/components/customComponents/FormComponents/FormulaireComponentVisite";

export type Vidange = {
  id: number;
  DateVisite:Date;
  TypeVisite:string;
  resultat :string; 
  DateExpirationVisiteTechnique: Date;
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
            <DropdownMenuItem key="DateVisite">DateVisite</DropdownMenuItem>
            <DropdownMenuItem key="TypeVisite">TypeVisite</DropdownMenuItem>
            <DropdownMenuItem key="resultat">resultat</DropdownMenuItem>
            <DropdownMenuItem key="DateExpirationVisiteTechnique">DateExpirationVisiteTechnique</DropdownMenuItem>
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
    id:"DateVisite",
    accessorKey: "DateVisite",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        DateVisite
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"TypeVisite",
    accessorKey: "TypeVisite",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       TypeVisite
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"resultat",
    accessorKey: "resultat",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        resultat
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"DateExpirationVisiteTechnique",
    accessorKey: "DateExpirationVisiteTechnique",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       DateExpirationVisiteTechnique
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const visite = row.original; // Access the current agency location data
            const [formVisible, setFormVisible] = useState(false);
    const toggleform = ()=>{
      setFormVisible(!formVisible);
    }
      return (<div className="flex justify-between">
<div>
<IconButton onClick={()=>{navigator.clipboard.writeText(visite.id);
toggleform();}
} color="green">
 <FontAwesomeIcon icon={faEdit} />
 </IconButton>

 {formVisible &&
 createPortal(
 <FormulaireComponentVisite formVisible={formVisible} titre={'Modifier'} dataLibaghi={visite} methode={"update"}/>,
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
<IconButton onClick={() => navigator.clipboard.writeText(visite.id)} color="red" >
    <CustomDialog dataLibaghi={visite} onDeleteSuccess={onDeleteSuccess} nomApi={'visite'} textLtrigger={<FontAwesomeIcon icon={faTrash}  />} />
  </IconButton>
</div>

</div>)}}]
  