import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import AgenceApi from "@/services/Admin/AgenceApi";

const DemoPageAgence = () => {
    const { isLoading, isError, data: agencesData, refetch } = useQuery("agences", fetchData);
  
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    const onDeleteSuccess = () => {
        refetch(); 
    };
    
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={agencesData} onDeleteSuccess={onDeleteSuccess} />
        </div>
    );

    async function fetchData() {
        const response = await AgenceApi.getAll();
        console.log('data wa3',response.data.agences) ; // Return the fetched data
        return response.data.agences
    }
};

export default DemoPageAgence;
