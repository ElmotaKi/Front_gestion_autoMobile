import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ContratApi from "@/services/Admin/ContratApi";


const DemoPageContrat = () => {
    const { isLoading, isError, data: contratData, refetch } = useQuery("Contrats", fetchData);
    // hook notifikasyo
  
    if (isLoading) return <div>Loading...</div>;
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
