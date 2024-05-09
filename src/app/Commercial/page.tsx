import React, { useState, useEffect } from "react";
// import DataTable from "./data-table"; // Ensure correct import path
import { columns } from "./columns"; // Ensure correct import path
import CommercialApi from "@/services/Admin/CommercialApi"; // Ensure correct import path
import { DataTable } from "./data-table";
import { c } from "vite/dist/node/types.d-aGj9QkWt";


export default function DemoPageCommercial() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ids,setIds]=useState([])
    // const [dataliraditban,setDataliraditban]=useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CommercialApi.all();
                
                const commercialsIds = response.data.map(commercial => commercial.id);
               
                setIds(commercialsIds);
                console.log(commercialsIds)
                let newdata = [];
                for (let i = 0; i < ids.length; i++) {
                    const CommercialData = await CommercialApi.get(ids[i]);
                    newdata = [...newdata, CommercialData.data];
   
                }
                setData(newdata);
                console.log(newdata)
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
    
    // useEffect(() => {

    //     const fetchData = async () => {

    //         try {
    //             const response = await CommercialApi.all();
    //             console.log(response)
    //             const societeIds = response.data.map(ct => ct.id);
    //             setIds(societeIds);
    //             let newdata = [];
    //             for (let i = 0; i < ids.length; i++) {
    //                 const ctData = await CommercialApi.get(ids[i]);
    //                 newdata = [...newdata, ctData.data];
                    
    //             }
    //             setData(newdata);
                
    //             if (!response) {
    //                 throw new Error("Failed to fetch data");
    //             }
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //             // alert("An error occurred while loading data. Please try again later.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    
    //     fetchData();
    // }, [data]);


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

