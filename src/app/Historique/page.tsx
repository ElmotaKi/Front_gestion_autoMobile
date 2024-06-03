import React from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import CommercialApi from "@/services/Admin/CommercialApi";
import { FaSpinner } from 'react-icons/fa'; // Import loading spinner icon
import HistoriqueApi from "@/services/Admin/HistoriqueApi";

const DemoPageHistorique = () => {
    const { isLoading, isError, data: historiqueData, refetch } = useQuery("historiques", fetchData)
    
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
            <DataTable columns={columns} data={historiqueData} onDeleteSuccess={onDeleteSuccess} />
        </div>
    );
    async function fetchData() {
        try {
            const response = await HistoriqueApi.all();
            const filteredData = response.data.map((historique) => ({
                id: historique.id,
                Date_reparation: historique.Date_reparation,
                Type_reparation: historique.Type_reparation,
                cout: historique.cout,
                kilometrage: historique.kilometrage,
                Etat_Pneu_Avant: historique.Etat_Pneu_Avant,
                Etat_Pneu_Apres: historique.Etat_Pneu_Apres,
                // Check if societe is defined
                Immatriculation:historique.vehicule.Immatriculation,
            }));
          
            return filteredData;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error("Error fetching data");
        }
    }


    
    
   
};



export default DemoPageHistorique;
