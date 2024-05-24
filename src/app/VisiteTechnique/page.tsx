import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import VidangeApi from "@/services/Admin/VidangeApi";
import { FaSpinner } from 'react-icons/fa'; // Import loading spinner icon
import VisiteTechniqueApi from "@/services/Admin/VisiteTechniqueApi";

const DemoPageVidange = () => {
    const { isLoading, isError, data: visiteData, refetch } = useQuery("visiteTechnique", fetchData);
  
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
            <DataTable columns={columns} data={visiteData} onDeleteSuccess={onDeleteSuccess} />
        </div>
    );

    async function fetchData() {
        const response = await VisiteTechniqueApi.get();
          
        const filteredData = response.data.map((visite) => ({
            id:visite.id,
            DateVisite:visite.DateVisite,
            TypeVisite: visite.TypeVisite,
            resultat: visite.resultat,
            DateExpirationVisiteTechnique: visite.DateExpirationVisiteTechnique,
            Immatriculation:visite.vehicule.Immatriculation,
        }));
      
        return filteredData;
      }
      
};

export default DemoPageVidange;

