import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la navigation

function CustomAvatar() {
  const navigate = useNavigate(); // Initialiser useNavigate

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    // Effacer le jeton du stockage local (supposant qu'il est stocké sous le nom 'token')
    localStorage.removeItem('token');
    // Naviguer vers la page de connexion après la déconnexion
    navigate("/"); // Naviguer vers la route de votre page de connexion
  };

  return (
    <>
      {/* Avatar avec un menu déroulant */}
      <DropdownMenu>
        <DropdownMenuTrigger>
        <Avatar avatarWidth="20" avatarHeight="20">
            <AvatarImage src="https://github.com/shadcn.png"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* Label du menu déroulant */}
          <DropdownMenuLabel>Nom</DropdownMenuLabel>
          {/* Séparateur */}
          <DropdownMenuSeparator />
          {/* Éléments du menu déroulant */}
          <DropdownMenuItem>Mon Profile</DropdownMenuItem>
          {/* Élément du menu déroulant pour se déconnecter avec gestionnaire d'événements onClick */}
          <DropdownMenuItem onClick={handleLogout}>se déconnecter</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default CustomAvatar;
