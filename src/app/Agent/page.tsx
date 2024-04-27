import React, { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function getData() {
  try {
    const response = await fetch('http://localhost:8000/api/agents');
    const responsedeux= await fetch('http://localhost:8000/api/agence')
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be caught by the component
  }
}

export default function DemoPage() {
  const [data, setData] = useState([]);
  const [dataAgence,setDataAgence]=useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getData();
        console.log("Fetched data:", fetchedData); // Log fetched data
        setData(fetchedData.agents);
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