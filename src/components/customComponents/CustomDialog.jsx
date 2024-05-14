// CustomDialog.jsx
import AgentApi from "@/services/Admin/AgentApi";
import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "react-query";
import ClientParticulierApi from "@/services/Admin/ClientParticulierApi";
import ContratApi from "@/services/Admin/ContratApi";

const CustomDialog = ({ dataLibaghi, onDeleteSuccess,nomApi,textLtrigger }) => {
    const queryClient = useQueryClient();
    const deleteClientMutation = useMutation(async (id) => {
        await ClientParticulierApi.delete(id);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("ClientParticuliers"); // Invalidate the cache after successful deletion
        },
    });
    const deleteContratMutation = useMutation(async (id) => {
        await ContratApi.delete(id);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("Contrats"); // Invalidate the cache after successful deletion
  },
});
    const handleClick = async (id) => {
        try {
            console.log(id)
            if (nomApi==="agent"){
               
            await AgentApi.delete(id, queryClient);
            console.log("Agent deleted successfully");
            onDeleteSuccess();}
            else if(nomApi === "clientparticulier"){
                console.log("hello")
                await deleteClientMutation.mutate(id);
                console.log("client deleted successfully");
                onDeleteSuccess();
            }
            else if(nomApi === 'contrat'){
                await deleteContratMutation.mutate(id);
                console.log("contrat deleted successfully");
                onDeleteSuccess();
            
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                console.error("Internal server error:", error);
                alert("An internal server error occurred. Please try again later.");
            } else {
                console.error("Error deleting agent:", error);
            }
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>{textLtrigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                        Voulez-vous vraiment supprimer {dataLibaghi.NomAgent} :(
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                        <Button onClick={() => 
                            
                            handleClick(dataLibaghi.id)}>Supprimer</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CustomDialog;
