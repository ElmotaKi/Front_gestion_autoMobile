
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import CustomDrawer from "../../components/customComponents/CustomDrawer";
import IconButton from "@/components/ui/IconButton";
import CustomDialog from "@/components/customComponents/CustomDialog";
import { faCopy, faDeleteLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { } from "../../components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import FormulaireComponentAgence from "@/components/customComponents/FormComponents/FormulaireComponentAgence";
import { createPortal } from "react-dom";

export type Societe = {
  id: number;
  NomAgence: string;
  AdresseAgence: string;
  VilleAgence: string;
  CodePostalAgence: string;
  TelAgence: string;
  EmailAgence:string;
  
  
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
            <DropdownMenuItem key="NomAgence">NomAgence</DropdownMenuItem>
            <DropdownMenuItem key="AdresseAgence">AdresseAgence</DropdownMenuItem>
            <DropdownMenuItem key="VilleAgence">VilleAgence</DropdownMenuItem>
            <DropdownMenuItem key="CodePostalAgence">CodePostalAgence</DropdownMenuItem>
            <DropdownMenuItem key="TelAgence">TelAgence</DropdownMenuItem>
            <DropdownMenuItem key="EmailAgence">EmailAgence</DropdownMenuItem>
            
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
    accessorKey: "NomAgence",
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
    id:"Adresse",
    accessorKey: "AdresseAgence",
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
    accessorKey: "VilleAgence",
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
    accessorKey: "CodePostalAgence",
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
    id:"Telephone",
    accessorKey: "TelAgence",
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
    id:"Email",
    accessorKey: "EmailAgence",
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
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const agence = row.original; // Access the current agency location data
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
<IconButton onClick={()=>{navigator.clipboard.writeText(agence.id);
toggleform();}
} color="green">
 <FontAwesomeIcon icon={faEdit} />
 </IconButton>

 {formVisible &&
 createPortal(
 <FormulaireComponentAgence formVisible={formVisible} titre={'Modifier'} dataLibaghi={agence} methode={"update"}/>,
 document.getElementById('modifierDiv'))
 }

</div>
<div>
<IconButton onClick={() => navigator.clipboard.writeText(agence.id)} color="red" >
  {/* <CustomDialog dataLibaghi={agent} textLtrigger={<FontAwesomeIcon icon={faTrash} />}/> */}
    <CustomDialog dataLibaghi={agence} onDeleteSuccess={onDeleteSuccess} nomApi={'agence'} textLtrigger={<FontAwesomeIcon icon={faTrash}  />} />
  </IconButton>
</div>

</div>)}}]
  