
import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";

import { FaSpinner } from 'react-icons/fa'; // Import loading spinner icon
import LocationApi from "@/services/Admin/LocationApi";

const DemoPageLocation = () => {
    const { isLoading, isError, data: locationsData, refetch } = useQuery("locations", fetchData);
    

    if (isLoading) return (
        <div
        className="flex items-center"
            style={{
                position: 'absolute', 
                top: '15rem', 
                left: '40rem', 
                 }}
        >
           
           <FaSpinner className="animate-spin mr-2" /> 
           loading...
            

        </div>
    );
    if (isError) return <div>Error fetching data</div>;

    const onDeleteSuccess = () => {
   
        refetch(); 
    };
    
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={locationsData} onDeleteSuccess={onDeleteSuccess} />
            
        </div>
    );

    async function fetchData() {
        const response = await LocationApi.all();
        const filteredData = response.data[0].map((location) => ({
                id :location.id,
                dateDebutLocation:  location.dateDebutLocation,
                dateFinLocation: location.dateFinLocation,
                Contrat:location.Contrat,
                NbrJours: location.NbrJours,
                Montant:location.Montant,
                status:location.status,
                DateRetourPrevue: location.DateRetourPrevue,
                DateRetourVoiture : location.DateRetourVoiture,
                KilometrageAvant:location.KilometrageAvant,
                KilometrageApres:location.KilometrageApres,
                ImageApres:location.ImageApres,
                ImageAvant:location.ImageAvant,
                Immatriculation:location.vehicules.Immatriculation,
                NomAgent:location.agent.NomAgent,
                NomClient:location.clientparticulier.Nom,
                RaisonSocial:location.societe.RaisonSocial,
                nomContrat:location.contrat.nomContrat
                                                                                                                                                                                                                 
        }));

        return filteredData;
      }
      
};

export default DemoPageLocation;
