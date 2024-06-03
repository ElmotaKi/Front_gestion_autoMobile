
import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import PneumatiqueApi from "@/services/Admin/PneumatiqueApi";
import { FaSpinner } from 'react-icons/fa'; // Import loading spinner icon

const DemoPagePneumatique = () => {
    const { isLoading, isError, data: pneumatiquesdata, refetch } = useQuery("pneumatiques", fetchData);
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
            <DataTable columns={columns} data={pneumatiquesdata} onDeleteSuccess={onDeleteSuccess} />
        </div>
    );

    async function fetchData() {
        const response = await PneumatiqueApi.all();
        const filteredData = response.data.map((pneumatique) => ({
            id:pneumatique.id,
            Marque_Pneu:pneumatique.Marque_Pneu,
            Modele_Pneu:pneumatique.Modele_Pneu,
            Dimension_Pneu:pneumatique.Dimension_Pneu,
            Type_Pneu:pneumatique.Type_Pneu,
            Position_Pneu:pneumatique.Position_Pneu,
            Etat_Pneu:pneumatique.Etat_Pneu,
            Date_Verification:pneumatique.Date_Verification,
            Date_Installation:pneumatique.Date_Installation,
            Date_Changement:pneumatique.Date_Changement,
            kilometrage_Verification:pneumatique.kilometrage_Verification,
            kilometrage_Installation:pneumatique.kilometrage_Installation,
            kilometrage_Final:pneumatique.kilometrage_Final,
     
            Immatriculation:pneumatique.vehicule.Immatriculation,
        }));

        return filteredData;
      }
      
};

export default DemoPagePneumatique;
