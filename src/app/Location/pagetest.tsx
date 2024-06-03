import React from "react";
import { useQuery } from "react-query";
import { columns } from "./columns";
import { FaSpinner } from 'react-icons/fa';
import { Tabletest } from "./Tabletest";
import LocationApi from "@/services/Admin/LocationApi";

const DemoPageLocationtest = ({ data }) => {
    const { isLoading, isError, data: locationsData, refetch } = useQuery("locations", fetchData);

    React.useEffect(() => {
        if (locationsData) {
            refetch();
        }
    }, [locationsData, refetch]);

    // Filtrage des données
    const test1 = locationsData ? locationsData.filter(location => location.Immatriculation === data.Immatriculation) : [];

    if (isLoading) return (
        <div className="flex items-center" style={{ position: 'absolute', top: '15rem', left: '40rem' }}>
            <FaSpinner className="animate-spin mr-2" />
            Loading...
        </div>
    );
    
    if (isError) return <div>Error fetching data</div>;

    const onDeleteSuccess = () => {
        refetch();
    };

    return (
        <div className="container mx-auto py-10">
            <Tabletest columns={columns} data={test1} onDeleteSuccess={onDeleteSuccess} />
        </div>
    );

    async function fetchData() {
        try {
            const response = await LocationApi.all();
            const filteredData = response.data[0].map((location) => ({
                id: location.id,
                dateDebutLocation: location.dateDebutLocation,
                dateFinLocation: location.dateFinLocation,
                Contrat: location.Contrat,
                NbrJours: location.NbrJours,
                Montant: location.Montant,
                status: location.status,
                DateRetourPrevue: location.DateRetourPrevue,
                DateRetourVoiture: location.DateRetourVoiture,
                KilometrageAvant: location.KilometrageAvant,
                KilometrageApres: location.KilometrageApres,
                ImageApres: location.ImageApres,
                ImageAvant: location.ImageAvant,
                Immatriculation: location.vehicules.Immatriculation,
                NomAgent: location.agent.NomAgent,
                NomClient: location.clientparticulier.Nom,
                RaisonSocial: location.societe.RaisonSocial,
                nomContrat: location.contrat.nomContrat
            }));
            return filteredData;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error("Error fetching data");
        }
    }
};

export default DemoPageLocationtest;
