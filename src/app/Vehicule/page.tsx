import React, { useState, useEffect } from "react";
// import DataTable from "./data-table"; // Ensure correct import path
import { columns } from "./columns"; // Ensure correct import path
import VehiculeApi from "@/services/Admin/VehiculeApi"; // Ensure correct import path
import { DataTable } from "./data-table";


export default function DemoPageVehicule() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ids,setIds]=useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await VehiculeApi.all();
                const vehiculesIds = response.data.map(vehicule => vehicule.id);
                setIds(vehiculesIds);
                let newdata = [];
                for (let i = 0; i < ids.length; i++) {
                    const vehiculeData = await VehiculeApi.get(ids[i]);
                    newdata = [...newdata, vehiculeData.data];
                    
                }
                setData(newdata);
                console.log('datq dyali',data)
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
