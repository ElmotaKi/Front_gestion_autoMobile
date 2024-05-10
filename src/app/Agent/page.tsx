import React, { useState, useEffect } from "react";
// import DataTable from "./data-table"; // Ensure correct import path
import { columns } from "./columns"; // Ensure correct import path
import AgentApi from "@/services/Admin/AgentApi"; // Ensure correct import path
import { DataTable } from "./data-table";


export default function DemoPageAgent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ids,setIds]=useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AgentApi.all();
                const agentsIds = response.data.agents.map(agent => agent.id);
                setIds(agentsIds);
                let newdata = [];
                for (let i = 0; i < ids.length; i++) {
                    const agentData = await AgentApi.get(ids[i]);
                    newdata = [...newdata, agentData.data];
                    
                }
                setData(newdata);
                console.log('data aya',data)
                if (!response) {
                    throw new Error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // alert("An error occurred while loading data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [data]);
    
    


    return (
        <div className="container mx-auto py-10">
            {loading ? (
                <div>Loading...</div> // Display loading message
            ) : (
                <DataTable columns={columns} data={data} /> // Display DataTable
            )}
        </div>
    );
}