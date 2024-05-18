
import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import VehiculeApi from "@/services/Admin/VehiculeApi";


const DemoPageVehicule = () => {
    const { isLoading, isError, data: clientsData, refetch } = useQuery("vehicules", fetchData);
    // hook notifikasyo
  
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    const onDeleteSuccess = () => {
   
        refetch(); 
    };
    
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={clientsData} onDeleteSuccess={onDeleteSuccess} />
        </div>
    );

    async function fetchData() {
        const response = await VehiculeApi.all();
        const filteredData = response.data[0].map((vehicule) => ({
                id :vehicule.id,
                Marque: vehicule.Marque,
                Model: vehicule.Model,
                Categorie: vehicule.Categorie,
                Kilometrage: vehicule.Kilometrage,
                Pneumatique: vehicule.Pneumatique,
                NumeroDechassis: vehicule.NumeroDechassis,
                Immatriculation: vehicule.Immatriculation,
                DateD_achat: vehicule.DateD_achat,
                numeroDePlace: vehicule.numeroDePlace,
                Disponibilité: vehicule.Disponibilité,
                jourTitulaire: vehicule.jourTitulaire,
                Montant: vehicule.Montant,
                MontantRestantApayer: vehicule.MontantRestantApayer,
                ImageVoiture: vehicule.ImageVoiture,
                typeBoiteVitesse: vehicule.typeBoiteVitesse,
                annee: vehicule.annee,
                placeAssure: vehicule.placeAssure,
                typeCarburant: vehicule.typeCarburant,
                NomAgence: vehicule.agence_location.NomAgence,
                Lieu: vehicule.parking.Lieu,                                                                                                                                                                                                   
        }));

        return filteredData;
      }
      
};

export default DemoPageVehicule;
