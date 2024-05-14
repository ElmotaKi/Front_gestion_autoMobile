import React from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import CommercialApi from "@/services/Admin/CommercialApi";


const DemoPageCommercial = () => {
    const { isLoading, isError, data: commercialData, refetch } = useQuery("commercials", fetchData)
    
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    const onDeleteSuccess = () => {
        refetch(); 
    };
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={commercialData} onDeleteSuccess={onDeleteSuccess} />
        </div>
    );
    async function fetchData() {
        try {
            const response = await CommercialApi.get();
            const filteredData = response.data.map((commercial) => ({
                id: commercial.id,
                CIN: commercial.CIN,
                Nom: commercial.Nom,
                Prenom: commercial.Prenom,
                Sexe: commercial.Sexe,
                DateNaissance: commercial.DateNaissance,
                Tel: commercial.Tel,
                Adresse: commercial.Adresse,
                Ville: commercial.Ville,
                id_societe: commercial.id_societe,
                RaisonSocial: commercial.societe.RaisonSocial, // Check if societe is defined
            }));
          
            return filteredData;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error("Error fetching data");
        }
    }


    
    
   
};



export default DemoPageCommercial;
