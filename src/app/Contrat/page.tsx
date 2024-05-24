import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ContratApi from "@/services/Admin/ContratApi";
import { FaSpinner } from 'react-icons/fa'; // Import loading spinner icon

const DemoPageContrat = () => {
    const { isLoading, isError, data: contratData, refetch } = useQuery("Contrats", fetchData);
    // hook notifikasyo
  
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
            <DataTable columns={columns} data={contratData} onDeleteSuccess={onDeleteSuccess} />
        </div>
    );

    async function fetchData() {
        const response = await ContratApi.all();
        const filteredData = response.data[0].map((contrat) => ({
            id:contrat.id,
            nomContrat:contrat.nomContrat,
            typeContrat:contrat.typeContrat,
            descriptionContrat:contrat.descriptionContrat,
        }));

        return filteredData;
      }
      
};

export default DemoPageContrat;
