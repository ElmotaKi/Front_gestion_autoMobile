
import { createPortal } from "react-dom";
import { ArrowUpDown, MoreHorizontal,Trash  } from "lucide-react";
 import FormulaireComponentVehicule from "@/components/customComponents/FormComponents/FormulaireComponentVehicule";
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

export type Vehicule = {
  Marque: string;
  Model: string;
  Categorie: string;
  Kilometrage: number;
  Pneumatique: string;
  NumeroDechassis: string;
  Immatriculation: string;
  DateD_achat: Date;
  numeroDePlace: number;
  Disponibilité: 'oui' | 'non';
  jourTitulaire: Date;
  Montant: number;
  MontantRestantApayer: number;
  ImageVoiture: string;
  typeBoiteVitesse: 'manuelle' | 'automatique';
  annee: number;
  placeAssure: number;
  typeCarburant: string;
  NomAgence: string;
  Lieu: string;  
};
const onDeleteSuccess = () => {
  // Placeholder function to trigger data refresh
  console.log("Delete operation successful, refreshing data...");
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
            <DropdownMenuItem key="Marque">Marque</DropdownMenuItem>
            <DropdownMenuItem key="Model">Model</DropdownMenuItem>
            <DropdownMenuItem key="Categorie">Categorie</DropdownMenuItem>
            <DropdownMenuItem key="Kilometrage">Kilometrage</DropdownMenuItem>
            <DropdownMenuItem key="Pneumatique">Pneumatique</DropdownMenuItem>
            <DropdownMenuItem key="NumeroDechassis">NumeroDechassis</DropdownMenuItem>
            <DropdownMenuItem key="Immatriculation">Immatriculation</DropdownMenuItem>
            <DropdownMenuItem key="DateD_achat">DateD_achat</DropdownMenuItem>
            <DropdownMenuItem key="numeroDePlace">numeroDePlace</DropdownMenuItem>
            <DropdownMenuItem key="Disponibilité">Disponibilité</DropdownMenuItem>
            <DropdownMenuItem key="jourTitulaire">jourTitulaire</DropdownMenuItem>
            <DropdownMenuItem key="Montant">Montant</DropdownMenuItem>
            <DropdownMenuItem key="MontantRestantApayer">MontantRestantApayer</DropdownMenuItem>
            <DropdownMenuItem key="ImageVoiture">ImageVoiture</DropdownMenuItem>
            <DropdownMenuItem key="typeBoiteVitesse">typeBoiteVitesse</DropdownMenuItem>
            <DropdownMenuItem key="annee">annee</DropdownMenuItem>
            <DropdownMenuItem key="placeAssure">placeAssure</DropdownMenuItem>
            <DropdownMenuItem key="typeCarburant">typeCarburant</DropdownMenuItem>
            <DropdownMenuItem key="NomAgence">NomAgence</DropdownMenuItem>
            <DropdownMenuItem key="Lieu">Lieu</DropdownMenuItem>
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
    id:"Marque",
    accessorKey: "Marque",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Marque
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Model",
    accessorKey: "Model",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Model
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Categorie",
    accessorKey: "Categorie",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Categorie
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Kilometrage",
    accessorKey: "Kilometrage",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Kilometrage
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Pneumatique",
    accessorKey: "Pneumatique",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Pneumatique
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"NumeroDechassis",
    accessorKey: "NumeroDechassis",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        NumeroDechassis
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
    id:"DateD_achat",
    accessorKey: "DateD_achat",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        DateD_achat
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"numeroDePlace",
    accessorKey: "numeroDePlace",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        numeroDePlace
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Disponibilité",
    accessorKey: "Disponibilité",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Disponibilité
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"jourTitulaire",
    accessorKey: "jourTitulaire",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        jourTitulaire
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Montant",
    accessorKey: "Montant",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Montant
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"MontantRestantApayer",
    accessorKey: "MontantRestantApayer",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        MontantRestantApayer
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"ImageVoiture",
    accessorKey: "ImageVoiture",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ImageVoiture
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"typeBoiteVitesse",
    accessorKey: "typeBoiteVitesse",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        typeBoiteVitesse
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"annee",
    accessorKey: "annee",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        annee
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"placeAssure",
    accessorKey: "placeAssure",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        placeAssure
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"typeCarburant",
    accessorKey: "typeCarburant",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        typeCarburant
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"NomAgence",
    accessorKey: "NomAgence",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        NomAgence
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"Lieu",
    accessorKey: "Lieu",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Lieu
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const vehicule = row.original; // Access the current agency location data
      const [formVisible, setFormVisible] = useState(false);
      const toggleform = ()=>{
        setFormVisible(!formVisible);
      }
        return (<div className="flex justify-between">
        
  
  <div>
  
  <IconButton onClick={()=>{navigator.clipboard.writeText(vehicule.id);
  toggleform();}
  } color="green">
   <FontAwesomeIcon icon={faEdit} />
   </IconButton>
  
   {formVisible &&
   createPortal(
   <FormulaireComponentVehicule formVisible={formVisible} titre={'Modifier'} dataLibaghi={vehicule} methode={"update"}/>,
   document.getElementById('modifierDiv'))
   }
  
  </div>
  <div>
  <IconButton onClick={() => navigator.clipboard.writeText(vehicule.id)} color="red" >
    <CustomDialog dataLibaghi={vehicule}  onDeleteSuccess={onDeleteSuccess} nomApi={"vehicule"} textLtrigger={<FontAwesomeIcon icon={faTrash} />} />
  </IconButton>
  </div>
  </div>)
    },
  },]
