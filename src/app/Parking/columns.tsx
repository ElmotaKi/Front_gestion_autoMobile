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

export type Parking = {
  id: number;
  Capacite: number;
  pannes: string;
  PlaceRestantes: number;
};

export const columns = [
  {
    id: "filter-select",
    header: () => (
      <DropdownMenu>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <span>Filtrer par:</span>
          </DropdownMenuItem>
          <DropdownMenuItem key="Capacite">Capacite</DropdownMenuItem>
          <DropdownMenuItem key="pannes">Pannes</DropdownMenuItem>
          <DropdownMenuItem key="PlaceRestantes">PlaceRestantes</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: () => null,
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
    id:"Capacité",
    accessorKey: "Capacite",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Capacite
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    id:"pannes",
    accessorKey: "pannes",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        pannes
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    id:"Place Restantes",
    accessorKey: "PlaceRestantes",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        PlaceRestantes
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    id: "actions",
    header: () => <span>Actions</span>,
    cell: ({ row }) => {
      const parking = row.original;

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
              <span onClick={() => navigator.clipboard.writeText(parking.id)}>
                Consulter information Parking
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span onClick={() => navigator.clipboard.writeText(parking.id)}>
                Supprimer
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span onClick={() => navigator.clipboard.writeText(parking.id)}>
                Modifier
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]
