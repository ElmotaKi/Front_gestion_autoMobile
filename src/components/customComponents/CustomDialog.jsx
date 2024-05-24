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
import AgenceApi from "@/services/Admin/AgenceApi";
import VehiculeApi from "@/services/Admin/VehiculeApi";
import ParkingApi from "@/services/Admin/ParkingApi";
import SocieteApi from "@/services/Admin/SocieteApi";
import CommercialApi from "@/services/Admin/CommercialApi";
import VidangeApi from "@/services/Admin/VidangeApi";
import AssuranceApi from "@/services/Admin/AssuranceApi";
import VignetteApi from "@/services/Admin/VignetteApi";
import VisiteTechniqueApi from "@/services/Admin/VisiteTechniqueApi";
const CustomDialog = ({ dataLibaghi, onDeleteSuccess,nomApi,textLtrigger }) => {
    const queryClient = useQueryClient();
            const deleteAgenceMutation = useMutation(async (id) => {
                await AgenceApi.delete(id);
            }, {
                onSuccess: () => {
                    queryClient.invalidateQueries("agences"); // Invalidate the cache after successful deletion
                },
            });
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
        const deleteVehiculeMutation = useMutation(async (id) => {
            await VehiculeApi.delete(id);
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries("vehicules"); // Invalidate the cache after successful deletion
            },
        });
        const deleteParkingMutation = useMutation(async (id) => {
            await ParkingApi.delete(id);
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries("parkings"); // Invalidate the cache after successful deletion
            },
        });
        const deleteSocieteMutation = useMutation(async (id) => {
            await SocieteApi.delete(id);
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries("societes"); // Invalidate the cache after successful deletion
            },
        });
        const deleteCommercialMutation = useMutation(async (id) => {
            await CommercialApi.delete(id);
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries("commercials"); // Invalidate the cache after successful deletion
            },
        });
        const deleteVidangeMutation = useMutation(async (id) => {
            await VidangeApi.delete(id);
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries("vidanges"); // Invalidate the cache after successful deletion
            },
        });
        const deleteAssuranceMutation = useMutation(async (id) => {
            await AssuranceApi.delete(id);
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries("assurances"); // Invalidate the cache after successful deletion
            },
        });
        const  deleteVisiteMutation = useMutation(async (id) => {
            await VisiteTechniqueApi.delete(id);
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries("visiteTechnique"); // Invalidate the cache after successful deletion
            },
        });
        const deleteVignetteMutation = useMutation(async (id) => {
            await VignetteApi.delete(id);
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries("vignettes"); // Invalidate the cache after successful deletion
            },
        });
    const handleClick = async (id) => {
        try {
            console.log(id)
            if (nomApi==="agent"){
               
            await AgentApi.delete(id, queryClient);
            console.log("Agent deleted successfully");
            onDeleteSuccess();}
            else if(nomApi==="agence"){
                await deleteAgenceMutation.mutate(id);
                console.log("agence deleted successfully");
                onDeleteSuccess();
            }
            else if(nomApi==="parking"){
                await deleteParkingMutation.mutate(id);
                console.log("parking deleted successfully");
                onDeleteSuccess();
            }
            else if(nomApi === 'vignette'){
                await deleteVignetteMutation.mutate(id);
                console.log("vignette deleted successfully");
                onDeleteSuccess();
              
                        }
            else if(nomApi === 'visite'){
                await deleteVisiteMutation.mutate(id);
                console.log("visite deleted successfully");
                onDeleteSuccess();
              
                        }
            else if(nomApi==="assurance"){
                await deleteAssuranceMutation.mutate(id);
                console.log("assurance deleted successfully");
                onDeleteSuccess();
            }
            else if(nomApi==="vidange"){
                await deleteVidangeMutation.mutate(id);
                console.log("vidange deleted successfully");
                onDeleteSuccess();
            }
            else if(nomApi==="societe"){
                console.log('hello')
                console.log(id)
                await deleteSocieteMutation.mutate(id);
                console.log("Societe deleted successfully");
                onDeleteSuccess();
            }
            else if(nomApi === "clientparticulier"){
                
                await deleteClientMutation.mutate(id);
                console.log("client deleted successfully");
                onDeleteSuccess();
            }
            else if(nomApi === 'contrat'){
                await deleteContratMutation.mutate(id);
                console.log("contrat deleted successfully");
                onDeleteSuccess();
          }
          else if(nomApi === 'vehicule'){
            await deleteVehiculeMutation.mutate(id);
            console.log("contrat deleted successfully");
            onDeleteSuccess();
          
                    }
        else if(nomApi === 'commercial'){
            await deleteCommercialMutation.mutate(id);
            console.log("commercial deleted successfully");
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
