
import { ArrowUpDown, MoreHorizontal } from "lucide-react";


  
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
import React from "react";

export type Societe = {
  id: number;
  CIN:number;
  Nom: string;
  Prenom: string;
  Sexe:number;
  DateNaissance:Date;
  Tel:string;
  Adresse:string;
  Ville:string;
  
  
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
            <DropdownMenuItem key="CIN">CIN</DropdownMenuItem>
            <DropdownMenuItem key="Nom">Nom</DropdownMenuItem>
            <DropdownMenuItem key="Prenom">Prenom</DropdownMenuItem>
            <DropdownMenuItem key="Sexe">Sexe</DropdownMenuItem>
            <DropdownMenuItem key="DateNaissance">DateNaissance</DropdownMenuItem>
            <DropdownMenuItem key="Tel">Tel</DropdownMenuItem>
            <DropdownMenuItem key="Adresse">Adresse</DropdownMenuItem>
            <DropdownMenuItem key="Ville">Ville</DropdownMenuItem>
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
    id: "actions", // Unique identifier for the column
    header: () => <span>Actions</span>, // Header text
    cell: ({ row }) => {
      const societe = row.original; // Access the current agency location data

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <span onClick={() => navigator.clipboard.writeText(societe.id)}>
                Consulter information Societes
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <span onClick={() => navigator.clipboard.writeText(societe.id)}>
                    Supprimer
                </span>
              </DropdownMenuItem>
           
            <DropdownMenuItem>
                <span onClick={() => navigator.clipboard.writeText(societe.id)}>
                    Modifier
                </span>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },]
