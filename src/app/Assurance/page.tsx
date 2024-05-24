import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import AssuranceApi from "@/services/Admin/AssuranceApi";
import { FaSpinner } from 'react-icons/fa'; // Import loading spinner icon

const DemoPageAssurance = () => {
    const { isLoading, isError, data: assuranceData, refetch } = useQuery("assurances", fetchData);
  
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
            <DataTable columns={columns} data={assuranceData} onDeleteSuccess={onDeleteSuccess} />
        </div>
    );

    async function fetchData() {
        const response = await AssuranceApi.getAll();
          
        const filteredData = response.data.map((assurance) => ({
            id:assurance.id,
            type_assurance:assurance.type_assurance,
            date_assurance:assurance.date_assurance,
            date_expiration_assurance:assurance.date_expiration_assurance,
            Immatriculation:assurance.vehicule.Immatriculation,
        }));
      
        return filteredData;
      }
      
};

export default DemoPageAssurance;

