import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import AgentApi from "@/services/Admin/AgentApi";
import { FaSpinner } from 'react-icons/fa'; // Import loading spinner icon

const DemoPageAgent = () => {
    const { isLoading, isError, data: agentsData, refetch } = useQuery("agents", fetchData);
    // hook notifikasyo
  console.log(agentsData)
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
            <DataTable columns={columns} data={agentsData} onDeleteSuccess={onDeleteSuccess} />
        </div>
    );

    async function fetchData() {
        const response = await AgentApi.getAll();
        console.log(response.data[0])
        const filteredData = response.data[0].map((agent) => ({
            id:agent.id,
          NomAgent: agent.NomAgent,
          PrenomAgent: agent.PrenomAgent,
          SexeAgent: agent.SexeAgent,
          EmailAgent: agent.EmailAgent,
          TelAgent: agent.TelAgent,
          AdresseAgent: agent.AdresseAgent,
          VilleAgent: agent.VilleAgent,
          CodePostalAgent: agent.CodePostalAgent,
          id_agence:agent.id_agence,
          NomAgence: agent.agence_location.NomAgence,
        }));
      
        return filteredData;
      }
      
};

export default DemoPageAgent;
