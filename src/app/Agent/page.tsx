import React, { useState, useEffect } from "react";
// import DataTable from "./data-table"; // Ensure correct import path
import { columns } from "./columns"; // Ensure correct import path
import AgentApi from "@/services/Admin/AgentApi"; // Ensure correct import path
import { DataTable } from "./data-table";

// Asynchronous function to fetch data
async function getData() {
    try {
        const response = await AgentApi.get(); // Fetch data from AgentApi
        if (!response) {
            throw new Error("Failed to fetch data");
        }
        console.log(response.data)
        return response.data; 
        
        // Return the data from response
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow error to be caught by the component
    }
}

export default function DemoPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getData();
                setData(fetchedData.agents);
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("An error occurred while loading data. Please try again later.");
            } finally {
                setLoading(false); // Update loading state
            }
        };

        fetchData();
    }, data);

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
