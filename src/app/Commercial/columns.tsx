
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

export type Commercial = {
  id: number;
  CIN:number;
  Nom: string;
  Prenom: string;
  Sexe:number;
  DateNaissance:Date;
  Tel:string;
  Adresse:string;
  Ville:string;
  RaisonSocial:string
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
    id:"Nom",
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
    id: "Societe",
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
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const commercial = row.original; // Access the current agency location data
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
<IconButton onClick={()=>{navigator.clipboard.writeText(commercial.id);
toggleform();}
} color="green">
 <FontAwesomeIcon icon={faEdit} />
 </IconButton>

 {formVisible &&
 createPortal(
 <FormulaireComponentcommercial formVisible={formVisible} titre={'Modifier'} dataLibaghi={commercial} methode={"update"}/>,
 document.getElementById('modifierDiv'))
 }

</div>
<div>
<IconButton onClick={() => navigator.clipboard.writeText(commercial.id)} color="red" >
  {/* <CustomDialog dataLibaghi={agent} textLtrigger={<FontAwesomeIcon icon={faTrash} />}/> */}
    <CustomDialog dataLibaghi={commercial} onDeleteSuccess={onDeleteSuccess} nomApi={'commercial'} textLtrigger={<FontAwesomeIcon icon={faTrash}  />} />
  </IconButton>
</div>

</div>)}}]