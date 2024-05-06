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
export type Vehicule = {
    id: number;
    Marque: string;
    Model: string;
    Categorie: string;
    Kilometrage: number;
    Pneumatique: string;
    NumeroDechassis: string;
    Immatriculation: string;
    DateD_achat: string;
    numeroDePlace: number;
    Disponibilite: boolean;
    jourTitulaire: string;
    Montant: number;
    MontantRestantApayer: number;
    ImageVoiture: string;
    typeBoiteVitesse: 'manuelle' | 'automatique';
    annee: number;
    placeAssure: number;
    typeCarburant: string;
    id_agence: number;
    id_parking: number;
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
          <DropdownMenuItem key="Marque">Marque</DropdownMenuItem>
          <DropdownMenuItem key="Model">Modèle</DropdownMenuItem>
          {/* Ajoutez d'autres filtres ici si nécessaire */}
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
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "Model",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Modèle
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "Categorie",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Catégorie
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "Kilometrage",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Kilométrage
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
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
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "NumeroDechassis",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Numéro de châssis
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
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
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "DateD_achat",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date d'achat
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "numeroDePlace",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Numéro de place
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "Disponibilite",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Disponibilité
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value ? "Disponible" : "Non disponible"}</span>,
  },
  {
    accessorKey: "jourTitulaire",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Jour titulaire
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
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
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "MontantRestantApayer",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Montant restant à payer
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "ImageVoiture",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Image de la voiture
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "typeBoiteVitesse",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type de boîte de vitesse
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "annee",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Année de fabrication
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "placeAssure",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Place assurée
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "typeCarburant",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type de carburant
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "id_agence",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID de l'agence
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    accessorKey: "id_parking",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID du parking
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    Cell: ({ value }) => <span>{value}</span>,
  },
  {
    id: "actions",
    header: () => <span>Actions</span>,
    cell: ({ row }) => {
      const vehicule = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <span onClick={() => navigator.clipboard.writeText(vehicule.id)}>
                Consulter informations Véhicule
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span onClick={() => navigator.clipboard.writeText(vehicule.id)}>
                Supprimer
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span onClick={() => navigator.clipboard.writeText(vehicule.id)}>
                Modifier
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
