import { createPortal } from "react-dom";
import { ArrowUpDown, MoreHorizontal,Trash  } from "lucide-react";
import FormulaireComponentContrat from "@/components/customComponents/FormComponents/FormulaireComponentContrat";
import { Button } from "../../components/ui/button";
import { ImPrinter } from "react-icons/im";
import React,{useState,useEffect} from "react";
import { PiMicrosoftWordLogoFill } from "react-icons/pi";
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
import axios from "axios";
import CustomDrawer from "@/components/customComponents/CustomDrawer";
import CustomDialog from "@/components/customComponents/CustomDialog";
import IconButton from "@/components/ui/IconButton";


export type Contrat = {
    id: number;
    nomContrat:string;
    typeContrat:string;
    descriptionContrat:string;
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
            <DropdownMenuItem key="nomContrat">nom Contrat</DropdownMenuItem>
            <DropdownMenuItem key="typeContrat">type Contrat</DropdownMenuItem>
            <DropdownMenuItem key="descriptionContrat">description Contrat</DropdownMenuItem>
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
    id:"nom",
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
    id:"type",
    accessorKey: "typeContrat",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        typeContrat
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"description",
    accessorKey: "descriptionContrat",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        descriptionContrat
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const contrat = row.original; // Access the current agency location data
      const [formVisible, setFormVisible] = useState(false);

      const handlePrint = (contrat) => {
        console.log(contrat)
        axios.post('http://127.0.0.1:8000/api/printContrat', {contrat})
            .then((response) => {
                window.open(response.data.url, '_blank');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'impression :', error);
            });
    };
    const handlePrintWord = (contrat) => {
      console.log(contrat)
      axios.post('http://127.0.0.1:8000/api/printContratWord', {contrat})
          .then((response) => {
              window.open(response.data.url, '_blank');
          })
          .catch((error) => {
              console.error('Erreur lors de l\'impression :', error);
          });
  };
      const toggleform = ()=>{
        setFormVisible(!formVisible);
      }
     
        return (<div className="flex justify-between">
         
 
  <div className="mr-20">
  
  <IconButton onClick={()=>{navigator.clipboard.writeText(contrat.id);
  toggleform();}
  } color="green">
   <FontAwesomeIcon icon={faEdit} />
   </IconButton>
  
   {formVisible &&
   createPortal(
   <FormulaireComponentContrat formVisible={formVisible} titre={'Modifier'} dataLibaghi={contrat} methode={"update"}/>,
   document.getElementById('modifierDiv'))
   }
  
  </div>
  <div className="mr-20" >
    <IconButton  onClick={() =>{handlePrint(contrat)}}>
    <ImPrinter color="black" />
  
    </IconButton>
    {/* {VisibleContrat && <Contrat id={contrat.id}/>} */}
  </div>
  <div className="mr-20">
  <IconButton  onClick={() =>{handlePrintWord(contrat)}}>
    <PiMicrosoftWordLogoFill  color="blue" />
  
    </IconButton>
  </div>
  <div>
  <IconButton onClick={() => navigator.clipboard.writeText(contrat.id)} color="red" >
    <CustomDialog dataLibaghi={contrat} onDeleteSuccess={onDeleteSuccess} nomApi={'contrat'}textLtrigger={<FontAwesomeIcon icon={faTrash} />} />
  </IconButton>
  </div>
  </div>)
    },
  },]
