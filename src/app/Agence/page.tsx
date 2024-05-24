import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import AgenceApi from "@/services/Admin/AgenceApi";
import { FaSpinner } from 'react-icons/fa'; // Import loading spinner icon
const DemoPageAgence = () => {
    const { isLoading, isError, data: agencesData, refetch } = useQuery("agences", fetchData);

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
            {agencesData ? (
                <DataTable columns={columns} data={agencesData} onDeleteSuccess={onDeleteSuccess} />
            ) : (
                <div>No data available</div>
            )}
        </div>
    );

    async function fetchData() {
        try {
            const response = await AgenceApi.getAll();
            return response.data[1];
        } catch (error) {
            throw new Error('Error fetching data');
        }
    }
};

export default DemoPageAgence;

