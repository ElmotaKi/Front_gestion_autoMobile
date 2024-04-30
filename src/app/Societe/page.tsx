import React, { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import SocieteApi from "@/services/Admin/SocieteApi";

async function getSocieteData() {
  try {
    const response=await SocieteApi.all();
    
    if (!response) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.data;
    return data;
    
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be caught by the component
  }
}

export default function DemoPage() {
  const [data, setSocieteData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getSocieteData();
        console.log("Fetched data:", fetchedData); // Log fetched data
        setSocieteData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Data:", data); // Log current data state

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
