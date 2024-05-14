import React from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import SocieteApi from "@/services/Admin/SocieteApi";

const queryClient = new QueryClient(); // Creating a new instance of QueryClient

const DemoPageSociete = () => {
    const { isLoading, isError, data: societesData, refetch } = useQuery("societes", fetchData
    );
    
    console.log(societesData);
    
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    const onDeleteSuccess = () => {
        refetch(); 
    };
    
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={societesData} onDeleteSuccess={onDeleteSuccess} />
        </div>
    );

    async function fetchData() {
        const response = await SocieteApi.get();
        console.log(response.data[0]);
        const filteredData = response.data.map((societe) => ({
            id: societe.id,
            RaisonSocial: societe.RaisonSocial,
            ICE: societe.ICE,
            NumeroCNSS: societe.NumeroCNSS,
            NumeroFiscale: societe.NumeroFiscale,
            RegistreCommercial: societe.RegistreCommercial,
            AdresseSociete: societe.AdresseSociete,
        }));
      
        return filteredData;
    }
}



export default DemoPageSociete;
