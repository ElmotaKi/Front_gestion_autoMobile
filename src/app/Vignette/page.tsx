import React from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import VignetteApi from "@/services/Admin/VignetteApi";
import { FaSpinner } from 'react-icons/fa'; // Import loading spinner icon

const DemoPageVignette = () => {
    const { isLoading, isError, data: vignetteData, refetch } = useQuery("vignettes", fetchData)
    
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
            <DataTable columns={columns} data={vignetteData} onDeleteSuccess={onDeleteSuccess} />
        </div>
    );
    async function fetchData() {
        try {
            const response = await VignetteApi.get();
            const filteredData = response.data.map((vignette) => ({
                id: vignette.id,
                designation: vignette.designation,
                status: vignette.status,
                date_vignette: vignette.date_vignette,
                date_expiration_vignette: vignette.date_expiration_vignette,  
                id_vehicule: vignette.id_vehicule,
                Immatriculation: vignette.vehicule.Immatriculation,
                
                // Check if societe is defined
            }));
          
            return filteredData;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw new Error("Error fetching data");
        }
    }


    
    
   
};



export default DemoPageVignette;
