
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import CustomDrawer from "@/components/customComponents/CustomDrawer";
import { Button } from "../../components/ui/button";
import CustomDialog from "@/components/customComponents/CustomDialog";
import { faCopy, faDeleteLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from "@/components/ui/IconButton";
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
import CommercialApi from "@/services/Admin/CommercialApi";
import { Navigate } from "react-router-dom";
import FormulaireComponentcommercial from "@/components/customComponents/FormComponents/FormulaireComponentCommercial";
import { createPortal } from "react-dom";
import FormulaireComponentHistorique from "@/components/customComponents/FormComponents/FormulaireComponentHistorique";

export type Commercial = {
  id: number;
  Date_reparation:Date;
  Type_reparation: string;
  cout: string;
  kilometrage:number;
  Etat_Pneu_Avant:Date;
  Etat_Pneu_Apres:string;
  
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
            <DropdownMenuItem key="Date_reparation">Date_reparation</DropdownMenuItem>
            <DropdownMenuItem key="Type_reparation">Type_reparation</DropdownMenuItem>
            <DropdownMenuItem key="cout">cout</DropdownMenuItem>
            <DropdownMenuItem key="kilometrage">kilometrage</DropdownMenuItem>
            <DropdownMenuItem key="Etat_Pneu_Avant">Etat_Pneu_Avant</DropdownMenuItem>
            <DropdownMenuItem key="Etat_Pneu_Apres">Etat_Pneu_Apres</DropdownMenuItem>
            
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
    id:"Date_reparation",
    accessorKey: "Date_reparation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       Date_reparation
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Type_reparation",
    accessorKey: "Type_reparation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       Type_reparation
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"cout",
    accessorKey: "cout",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        cout
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"kilometrage",
    accessorKey: "kilometrage",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        kilometrage
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Etat_Pneu_Avant",
    accessorKey: "Etat_Pneu_Avant",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       Etat_Pneu_Avant
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Etat_Pneu_Apres",
    accessorKey: "Etat_Pneu_Apres",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       Etat_Pneu_Apres
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
      const historique = row.original; // Access the current agency location data
            const [formVisible, setFormVisible] = useState(false);
    const toggleform = ()=>{
      setFormVisible(!formVisible);
    }
      return (<div className="flex justify-between">
<div>
<IconButton onClick={()=>{navigator.clipboard.writeText(historique.id);
toggleform();}
} color="green">
 <FontAwesomeIcon icon={faEdit} />
 </IconButton>

 {formVisible &&
 createPortal(
 <FormulaireComponentHistorique formVisible={formVisible} titre={'Modifier'} dataLibaghi={historique} methode={"update"}/>,
 document.getElementById('modifierDiv'))
 }

</div>

<div></div>
<div>
<IconButton onClick={() => navigator.clipboard.writeText(historique.id)} color="red" >
    <CustomDialog dataLibaghi={historique} onDeleteSuccess={onDeleteSuccess} nomApi={'historique'} textLtrigger={<FontAwesomeIcon icon={faTrash}  />} />
  </IconButton>
</div>

</div>)}}]
  
  

