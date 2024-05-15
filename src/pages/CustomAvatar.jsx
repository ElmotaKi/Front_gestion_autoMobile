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

function CustomAvatar(props) {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle logout
  const handleLogout = () => {
    // Remove token from local storage (assuming it's stored under the name 'token')
    localStorage.removeItem('token');
    // Navigate to the login page after logout
    navigate("/"); // Navigate to the route of your login page
  };

  return (
    <div className=' flex justify-between items-center ' >
      {/* Display the content prop */}
      <div></div>
      {/* Dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar avatarWidth="20" avatarHeight="20">
            {/* Avatar image */}
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* Dropdown menu items */}
          <DropdownMenuLabel>Nom</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Mon Profile</DropdownMenuItem>
          {/* Logout option */}
          <DropdownMenuItem onClick={handleLogout}>se déconnecter</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default CustomAvatar;