
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
  NomAgence: string;
  AdresseAgence: string;
  VilleAgence: string;
  CodePostalAgence: string;
  TelAgence: string;
  EmailAgence:string;
  
  
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
    id:"AdresseAgence",
    accessorKey: "AdresseAgence",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       AdresseAgence
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"VilleAgence",
    accessorKey: "VilleAgence",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        VilleAgence
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"CodePostalAgence",
    accessorKey: "CodePostalAgence",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        CodePostalAgence
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"TelAgence",
    accessorKey: "TelAgence",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       TelAgence
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id:"EmailAgence",
    accessorKey: "EmailAgence",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
       EmailAgence
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
