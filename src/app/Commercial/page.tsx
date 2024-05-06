import React, { useState, useEffect } from "react";
// import DataTable from "./data-table"; // Ensure correct import path
import { columns } from "./columns"; // Ensure correct import path
import CommercialApi from "@/services/Admin/AgentApi"; // Ensure correct import path
import { DataTable } from "./data-table";


export default function DemoPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CommercialApi.get();
                if (!response) {
                    throw new Error("Failed to fetch data");
                }
                setData(response.data.agents);
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("An error occurred while loading data. Please try again later.");
            } finally {
                setLoading(false);
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