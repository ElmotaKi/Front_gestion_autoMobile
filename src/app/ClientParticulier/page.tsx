
// import React, { useState, useEffect } from "react";
// // import DataTable from "./data-table"; // Ensure correct import path
// import { columns } from "./columns"; // Ensure correct import path
// // import AgentApi from "@/services/Admin/AgentApi"; // Ensure correct import path
// import { DataTable } from "./data-table";
// import ClientParticulierApi from "@/services/Admin/ClientParticulierApi";

// export default function DemoPageClient() {

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await ClientParticulierApi.all();
//                 if (!response) {
//                     throw new Error("Failed to fetch data");
//                 }
//                 setData(response.data.ClientParticuliers);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 alert("An error occurred while loading data. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, data);

//     return (
//         <div className="container mx-auto py-10">
//             {loading ? (
//                 <div>Loading...</div> // Display loading message
//             ) : (
//                 <DataTable columns={columns} data={data} /> // Display DataTable
//             )}
//         </div>
//     );
// }
import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ClientParticulierApi from "@/services/Admin/ClientParticulierApi";


const DemoPageClient = () => {
    const { isLoading, isError, data: clientsData, refetch } = useQuery("ClientParticuliers", fetchData);
    // hook notifikasyo
  
    if (isLoading) return <div>Loading...</div>;
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
