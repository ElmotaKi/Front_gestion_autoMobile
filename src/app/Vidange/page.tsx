import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import VidangeApi from "@/services/Admin/VidangeApi";
import { FaSpinner } from 'react-icons/fa'; // Import loading spinner icon

const DemoPageVidange = () => {
    const { isLoading, isError, data: vidangeData, refetch } = useQuery("vidanges", fetchData);
  
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
            <DataTable columns={columns} data={vidangeData} onDeleteSuccess={onDeleteSuccess}  />
        </div>
    );

    async function fetchData() {
        const response = await VidangeApi.getAll();
          
        const filteredData = response.data.map((vidange) => ({
            id:vidange.id,
            DateVidange:vidange.DateVidange,
            TypeVidange:vidange.TypeVidange,
            DureeDeVidange:vidange.DureeDeVidange,
            Cout:vidange.Cout,
            KilometrageDerniereVidange:vidange.KilometrageDerniereVidange,
            Immatriculation:vidange.vehicule.Immatriculation,
        }));
      
        return filteredData;
      }
      
};

export default DemoPageVidange;

