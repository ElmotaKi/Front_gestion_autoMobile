
import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ClientParticulierApi from "@/services/Admin/ClientParticulierApi";
import { FaSpinner } from 'react-icons/fa'; // Import loading spinner icon

const DemoPageClient = () => {
    const { isLoading, isError, data: clientsData, refetch } = useQuery("ClientParticuliers", fetchData);
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
            <DataTable columns={columns} data={clientsData} onDeleteSuccess={onDeleteSuccess} />
        </div>
    );

    async function fetchData() {
        const response = await ClientParticulierApi.all();
        const filteredData = response.data[0].map((clientparticulier) => ({
            id:clientparticulier.id,
            Nom:clientparticulier.Nom,
            Prenom:clientparticulier.Prenom,
            Sexe:clientparticulier.Sexe,
            DateNaissance:clientparticulier.DateNaissance,
            Tel:clientparticulier.Tel,
            Email:clientparticulier.Email,
            Adresse:clientparticulier.Adresse,
            Ville:clientparticulier.Ville,
            CodePostal:clientparticulier.CodePostal,
            CIN:clientparticulier.CIN,
            DateValidCIN:clientparticulier.DateValidCIN,
            NumeroPermis:clientparticulier.NumeroPermis,
            TypePermis:clientparticulier.TypePermis,
            NumeroPasseport:clientparticulier.NumeroPasseport,
            TypePassport:clientparticulier.TypePassport,
            DateFinPassport:clientparticulier.DateFinPassport,
            AdresseEtrangere:clientparticulier.AdresseEtrangere,
        }));

        return filteredData;
      }
      
};

export default DemoPageClient;
