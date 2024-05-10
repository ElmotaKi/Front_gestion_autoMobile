import { useState } from 'react';
import CommercialApi from "@/services/Admin/CommercialApi"

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
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { Navigate } from 'react-router-dom';

import AgenceApi from '@/services/Admin/AgenceApi';
import AgentApi from '@/services/Admin/AgentApi';
import SocieteApi from '@/services/Admin/SocieteApi';

const CustomDialog = ({ dataLibaghi, textLtrigger, nomApi }) => {
    const handleClick = async (id) => {
        try {
            if (nomApi === 'agent') {
                await AgentApi.delete(id);
                console.log('Agent deleted successfully');
            } else if (nomApi === 'agence') {
                await AgenceApi.delete(id);
                console.log('Agence deleted successfully');
            }
            else if (nomApi === 'societe') {
                await SocieteApi.delete(id);
                console.log('societe deleted successfully');
            }
            else if (nomApi === 'commercial') {
                await CommercialApi.delete(id);
                console.log('commercial deleted successfully');
            }
            else if (nomApi === 'vehicule') {
                await CommercialApi.delete(id);
                console.log('commercial deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting:', error);
            alert('An internal server error occurred. Please try again later.');
        }
    }
    

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger>{textLtrigger}</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmation </AlertDialogTitle>
                        <AlertDialogDescription>
                            Voulez-vous vraiment supprimer {dataLibaghi.Nom} : ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction>
                            <Button onClick={() => handleClick(dataLibaghi.id)}>Supprimer </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default CustomDialog;
