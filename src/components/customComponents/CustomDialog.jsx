// CustomDialog.jsx
import AgentApi from "@/services/Admin/AgentApi";
import React,{useState} from "react";
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
import LocationApi from "@/services/Admin/LocationApi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FcOk } from "react-icons/fc";
import PneumatiqueApi from "@/services/Admin/PneumatiqueApi";
import HistoriqueApi from "@/services/Admin/HistoriqueApi";
import AccidentApi from "@/services/Admin/AccidentApi";
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
        const deleteLocationMutation = useMutation(async (id) => {
            await LocationApi.delete(id);
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries("locations"); // Invalidate the cache after successful deletion
            },
        });
        const deletePneumatiqueMutation = useMutation(async (id) => {
            await PneumatiqueApi.delete(id);
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries("pneumatiques"); // Invalidate the cache after successful deletion
            },
        });
        const deleteHistoriqueMutation = useMutation(async (id) => {
            await HistoriqueApi.delete(id);
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries("historiques"); // Invalidate the cache after successful deletion
            },
        });
        const deleteAccidentMutation = useMutation(async (id) => {
            await AccidentApi.delete(id);
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries("accidents"); // Invalidate the cache after successful deletion
            },
        });
        const firstItemId = dataLibaghi.length > 0 ? dataLibaghi[0].id: null;
        console.log('firstItemId',firstItemId)
        
       const handleClick = async (id) => {
                console.log('hello')
        try {
            console.log(id)
            if (nomApi==="agent"){
               
                await AgentApi.delete(id, queryClient);
                setAlertVisible(true);
                setAlertMessage("Agent deleted successfully");
                hideAlertAfterDelay();
                onDeleteSuccess();
               
            }
            else if(nomApi==="agence"){
                await deleteAgenceMutation.mutate(id);
                setAlertVisible(true);
                setAlertMessage("agence deleted successfully");
                hideAlertAfterDelay();
                onDeleteSuccess();
            }
            else if(nomApi==="location"){
                await deleteLocationMutation.mutate(id);
                setAlertVisible(true);
                setAlertMessage("location deleted successfully");
                hideAlertAfterDelay();
                onDeleteSuccess();
            }
            else if(nomApi==="parking"){
                await deleteParkingMutation.mutate(id);
                setAlertVisible(true);
                setAlertMessage("parking deleted successfully");
                hideAlertAfterDelay();
                onDeleteSuccess();
            }
            else if(nomApi === 'vignette'){
                await deleteVignetteMutation.mutate(id);
                console.log("vignette deleted successfully");
                setAlertVisible(true);
                setAlertMessage("vignette deleted successfully");
                hideAlertAfterDelay();
                onDeleteSuccess();
              
                        }
            else if(nomApi === 'visite'){
                await deleteVisiteMutation.mutate(id);
                setAlertVisible(true);
                setAlertMessage("visite deleted successfully");
                hideAlertAfterDelay();
                onDeleteSuccess();
              
                        }
            else if (nomApi === "assurance") {
                        await deleteAssuranceMutation.mutate(id);
                        setAlertVisible(true);
                        setAlertMessage("assurance deleted successfully");
                        hideAlertAfterDelay();
                        onDeleteSuccess();
                
            }
            
            else if(nomApi==="vidange"){
                await deleteVidangeMutation.mutate(id);
                setAlertVisible(true);
                setAlertMessage("vidange deleted successfully");
                hideAlertAfterDelay();
                onDeleteSuccess();
            }
            else if(nomApi==="societe"){
               
                await deleteSocieteMutation.mutate(id);
                
                setAlertVisible(true);
                setAlertMessage("Societe deleted successfully");
                hideAlertAfterDelay();
                onDeleteSuccess();
            }
            else if(nomApi === "clientparticulier"){
                
                await deleteClientMutation.mutate(id);
                setAlertVisible(true);
                setAlertMessage("client deleted successfully");
                hideAlertAfterDelay();
                onDeleteSuccess();
            }
            else if(nomApi === 'contrat'){
                await deleteContratMutation.mutate(id);
                setAlertVisible(true);
                setAlertMessage("contrat deleted successfully");
                hideAlertAfterDelay();
                onDeleteSuccess();
          }
          else if(nomApi === 'vehicule'){
            await deleteVehiculeMutation.mutate(id);
            setAlertVisible(true);
            setAlertMessage("vehicule deleted successfully");
            hideAlertAfterDelay();
            onDeleteSuccess();
          
                    }
        else if(nomApi === 'commercial'){
            await deleteCommercialMutation.mutate(id);
            setAlertVisible(true);
            setAlertMessage("commercial deleted successfully");
            hideAlertAfterDelay();
            onDeleteSuccess();
          
                    }
        else if(nomApi === 'pneumatique'){
            await deletePneumatiqueMutation.mutate(id);
            setAlertVisible(true);
            setAlertMessage("pneumatique deleted successfully");
            hideAlertAfterDelay();
            onDeleteSuccess();
          
                    }
        else if(nomApi === 'historique'){
            await deleteHistoriqueMutation.mutate(id);
            setAlertVisible(true);
            setAlertMessage("historique deleted successfully");
            hideAlertAfterDelay();
            onDeleteSuccess();
          
                    }
        else if(nomApi === 'accident'){
            await deleteAccidentMutation.mutate(id);
            setAlertVisible(true);
            setAlertMessage("accident deleted successfully");
            hideAlertAfterDelay();
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
    const handleBulkDelete = async () => {
        if (dataLibaghi.length > 0) {
            for (let i = 0; i < dataLibaghi.length; i++) {
                await handleClick(dataLibaghi[i].id);
            }
        }
        else{
            console.log('hello')
            await handleClick(dataLibaghi.id);
        }
    };
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState(""); 
    const hideAlertAfterDelay = () => {
        setTimeout(() => {
          setAlertVisible(false);
        }, 2000); 
      };
      
    return (
        <div>
        {alertVisible && (
            <Alert style={{ width: '30rem', height: '15rem',position:'fixed',top:'30%',left:'40%' }} className="flex flex-col justify-center items-center">
            <AlertTitle className="mb-6">Succès!</AlertTitle>
            <AlertDescription className="flex flex-col items-center" style={{fontSize:'15px'}}>
            {alertMessage}
              <FcOk className="animate-bounce mt-4" style={{ width: '15rem', height: '5rem' }} />
            </AlertDescription>
          </Alert>
           )}
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
                        <Button onClick={handleBulkDelete}>Supprimer</Button>
                       
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </div>
    );
};

export default CustomDialog;
