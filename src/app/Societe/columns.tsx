import { createPortal } from "react-dom";
import React,{useState,useEffect} from "react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Checkbox } from "../../components/ui/checkbox"
import CustomDrawer from "@/components/customComponents/CustomDrawer";
import CustomDialog from "@/components/customComponents/CustomDialog";
import { faCopy, faDeleteLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SocieteApi from "@/services/Admin/SocieteApi";
import FormulaireComponentSociete from "@/components/customComponents/FormComponents/FormulaireComponentSociete";
export type Societe = {
  id: number;
  RaisonSocial: string;
  ICE: string;
  NumeroCNSS:number;
  NumeroFiscale:number;
  RegistreCommercial:string;
  AdresseSociete:string;
  
  
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
          <DropdownMenuItem key="select-header">
            <span>Filtrer par:</span>
          </DropdownMenuItem>
          <DropdownMenuItem key="RaisonSocial">RaisonSocial</DropdownMenuItem>
          <DropdownMenuItem key="ICE">ICE</DropdownMenuItem>
          <DropdownMenuItem key="NumeroCNSS">NumeroCNSS</DropdownMenuItem>
          <DropdownMenuItem key="NumeroFiscale">NumeroFiscale</DropdownMenuItem>
          <DropdownMenuItem key="RegistreCommercial">RegistreCommercial</DropdownMenuItem>
          <DropdownMenuItem key="AdresseSociete">AdresseSociete</DropdownMenuItem>
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
    id:"ICE",
    accessorKey: "ICE",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       ICE
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"NumeroCNSS",
    accessorKey: "NumeroCNSS",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       NumeroCNSS
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"NumeroFiscale",
    accessorKey: "NumeroFiscale",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        NumeroFiscale
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"RegistreCommercial",
    accessorKey: "RegistreCommercial",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       RegistreCommercial
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"AdresseSociete",
    accessorKey: "AdresseSociete",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       AdresseSociete
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  
  
  {
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const societe = row.original; // Access the current agency location data

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
  <IconButton onClick={()=>{navigator.clipboard.writeText(societe.id);
  toggleform();}
  } color="green">
   <FontAwesomeIcon icon={faEdit} />
   </IconButton>
  
   {formVisible &&
   createPortal(
   <FormulaireComponentSociete formVisible={formVisible} titre={'Modifier'} dataLibaghi={societe} methode={"update"}/>,
   document.getElementById('modifierDiv'))
   }
  
  </div>
  <div>
  <IconButton onClick={() => navigator.clipboard.writeText(societe.id)} color="red" >
    {/* <CustomDialog dataLibaghi={agent} textLtrigger={<FontAwesomeIcon icon={faTrash} />}/> */}
    <CustomDialog dataLibaghi={societe}  onDeleteSuccess={onDeleteSuccess} nomApi={"societe"} textLtrigger={<FontAwesomeIcon icon={faTrash} />} />
  </IconButton>
  </div>
  </div>)}}] 