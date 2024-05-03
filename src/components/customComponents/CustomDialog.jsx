import AgentApi from "@/services/Admin/AgentApi"
import {
    AlertDialog,
    AlertDialogAction,
    // AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    
  } from "../ui/alert-dialog"
  import { Button } from "../ui/button"
const CustomDialog = ({dataLibaghi,textLtrigger}) => {
    const handleClick = async (id) => {
        try {
            // Call the delete function from AgentApi with the provided ID
            await AgentApi.delete(id);
            
            // Handle successful delete (e.g., refresh the list of agents or notify the user)
            console.log("Agent deleted successfully");
    
            // Add additional post-delete actions here, if necessary
        } catch (error) {
            // Handle errors
            if (error.response && error.response.status === 500) {
                // Internal server error - display a user-friendly error message
                console.error("Internal server error:", error);
                // Display a user-friendly error message to the user
                alert("An internal server error occurred. Please try again later.");
            } else {
                // Handle other types of errors
                console.error("Error deleting agent:", error);
                // Display a generic error message to the user
            }
        }
    };
    
  return (
    <AlertDialog>
  <AlertDialogTrigger>{textLtrigger}</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirmation </AlertDialogTitle>
      <AlertDialogDescription>
      voulez vous vraiment supprimer {dataLibaghi.NomAgent}:( ?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction><Button onClick={() => handleClick(dataLibaghi.id)}>Supprimer</Button></AlertDialogAction>
      
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default CustomDialog