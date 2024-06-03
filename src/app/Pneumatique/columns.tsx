
import { createPortal } from "react-dom";
import { ArrowUpDown, MoreHorizontal,Trash  } from "lucide-react";
 import FormulaireComponentClient from "@/components/customComponents/FormComponents/FormulaireComponentClient";
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
import FormulaireComponentPneumatique from "@/components/customComponents/FormComponents/FormulaireComponentPneumatique";
import { FaPlus } from "react-icons/fa";
import DemoPageVehiculetest from "../Vehicule/pagetest";
import DemoPageHistoriquetest from "../Historique/pagetest";



export type Pneumatique = {
    id:number;
    Marque_Pneu:string;
    Modele_Pneu:string;
    Dimension_Pneu:string;
    Type_Pneu:string;
    Position_Pneu:string;
    Etat_Pneu:string;
    Date_Verification:string;
    Date_Installation:string;
    kilometrage_Verification:string;
    kilometrage_Installation:string;
    Historique_Reparations:string;
    Immatriculation:string;
    
};
const onDeleteSuccess = () => {
  // Placeholder function to trigger data refresh
  console.log("Delete operation successful, refreshing data...");
};

const handleIconClick = (historique) => {
  // Implémentez l'action à effectuer lorsque l'icône est cliquée
  console.log('Historique réparations:', historique);
  // Vous pouvez afficher un modal, un dialogue, etc.
};
const HistoriqueReparationsColumn = ({ row }) => {
  const [visibleHistorique, setVisibleHistorique] = useState(false);

  const handleIconClick = () => {
    setVisibleHistorique(!visibleHistorique);
  };

  return (
    <div className="flex items-center">
      <FaPlus
        className="cursor-pointer"
        onClick={handleIconClick}
      />
      
      {visibleHistorique &&
              createPortal(
                <DemoPageHistoriquetest data={row.original}/>,
                document.getElementById(`HistoriqueDiv-${row.original.id}`))
              }
    </div>
  );
};

export const columns = [
  // Existing columns for displaying agent detail
    {
      id: "filter-select",
      header: () => (
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>Filtrer par:</span>
            </DropdownMenuItem>
            <DropdownMenuItem key="Marque_Pneu">Marque_Pneu</DropdownMenuItem>
            <DropdownMenuItem key="Modele_Pneu">Modele_Pneu</DropdownMenuItem>
            <DropdownMenuItem key="Dimension_Pneu">Dimension_Pneu</DropdownMenuItem>
            <DropdownMenuItem key="Type_Pneu">Type_Pneu</DropdownMenuItem>
            <DropdownMenuItem key="Position_Pneu">Position_Pneu</DropdownMenuItem>
            <DropdownMenuItem key="Etat_Pneu">Etat_Pneu</DropdownMenuItem>
            <DropdownMenuItem key="Date_Verification">Date_Verification</DropdownMenuItem>
            <DropdownMenuItem key="Date_Installation">Date_Installation</DropdownMenuItem>
            <DropdownMenuItem key="Kilometrage_Verification">Kilometrage_Verification</DropdownMenuItem>
            <DropdownMenuItem key="Kilometrage_Installation">Kilometrage_Installation</DropdownMenuItem>
            <DropdownMenuItem key="Historique_Reparations">Historique_Reparations</DropdownMenuItem>
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
    id:"Marque_Pneu",
    accessorKey: "Marque_Pneu",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Marque_Pneu
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Modele_Pneu",
    accessorKey: "Modele_Pneu",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Modele_Pneu
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Dimension_Pneu",
    accessorKey: "Dimension_Pneu",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Dimension_Pneu
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Type_Pneu",
    accessorKey: "Type_Pneu",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type_Pneu
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Position_Pneu",
    accessorKey: "Position_Pneu",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Position_Pneu
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Etat_Pneu",
    accessorKey: "Etat_Pneu",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Etat_Pneu
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Date_Verification",
    accessorKey: "Date_Verification",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date_Verification
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Date_Installation",
    accessorKey: "Date_Installation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date_Installation
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Date_Changement",
    accessorKey: "Date_Changement",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date_Changement
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"kilometrage_Verification",
    accessorKey: "kilometrage_Verification",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        kilometrage_Verification
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"kilometrage_Installation",
    accessorKey: "kilometrage_Installation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       kilometrage_Installation
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"kilometrage_Final",
    accessorKey: "kilometrage_Final",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
      kilometrage_Final
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  
  {
    id:"Historique_Reparations",
    accessorKey: "Historique_Reparations",
    
    header: ({ column }) => (
      
      <Button
        variant="ghost"
        onClick={() => {column.toggleSorting(column.getIsSorted() === "asc");
        
        }}
      >
        Historique_Reparations
       
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <HistoriqueReparationsColumn row={row} />,
},
  
  
  {
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const pneumatique = row.original; // Access the current agency location data
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
<IconButton onClick={()=>{navigator.clipboard.writeText(pneumatique.id);
toggleform();}
} color="green">
 <FontAwesomeIcon icon={faEdit} />
 </IconButton>

 {formVisible &&
 createPortal(
 <FormulaireComponentPneumatique formVisible={formVisible} titre={'Modifier'} dataLibaghi={pneumatique} methode={"update"}/>,
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
            {/* {Visible && <DemoPageVehiculetest data={vidange}/>} */}
            {Visible &&
              createPortal(
                <DemoPageVehiculetest data={pneumatique}/>,
                document.getElementById(`vehiculeDiv-${pneumatique.id}`))
              }
              
       
    
            </div>
          </IconButton>
         
        </div>
 <div style={{ marginRight: '10px' }} />
<div></div>
<div>
<IconButton onClick={() => navigator.clipboard.writeText(pneumatique.id)} color="red" >
    <CustomDialog dataLibaghi={pneumatique} onDeleteSuccess={onDeleteSuccess} nomApi={'pneumatique'} textLtrigger={<FontAwesomeIcon icon={faTrash}  />} />
  </IconButton>
</div>

</div>)}}]
  