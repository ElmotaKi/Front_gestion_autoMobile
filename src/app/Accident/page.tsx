import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { FaSpinner } from 'react-icons/fa';
import AccidentApi from "@/services/Admin/AccidentApi";

const DemoPageAccident = () => {
    const { isLoading, isError, data: accidentData, refetch } = useQuery("accidents", fetchData);
  
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
            <DataTable columns={columns} data={accidentData} onDeleteSuccess={onDeleteSuccess}  />
        </div>
    );

    async function fetchData() {
        const response = await AccidentApi.all();
          console.log('data vehicule',response)
        const filteredData = response.data[0].map((accident) => ({
            id:accident.id,
            photo:accident.photo,
            date_accident:accident.date_accident,
            temps_accident:accident.temps_accident,
            lieu:accident.lieu,
            cout_dommage:accident.cout_dommage,
            rapport_police:accident.rapport_police,
            statut_resolution:accident.statut_resolution,
            Immatriculation:accident.vehicule.Immatriculation,
            id_location:accident.id_location,
            id_assurance:accident.id_assurance,
        }));
      
        return filteredData;
      }
      
};

export default DemoPageAccident;

