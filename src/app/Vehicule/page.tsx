import React, { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function getVehiculeData() {
  try {
    const response = await fetch('http://localhost:8000/api/vehicules');
    if (!response.ok) {
      throw new Error('Failed to fetch vehicule data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching vehicule data:", error);
    throw error; // Rethrow the error to be caught by the component
  }
}

export default function DemoPage() {
  const [VehiculeData, setVehiculeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Vehicule = await getVehiculeData();
        console.log("Fetched Vehicule data:", Vehicule); // Log fetched Vehicule data
        setVehiculeData(Vehicule);
      } catch (error) {
        console.error("Error fetching Vehicule data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Vehicule data:", VehiculeData); // Log current Vehicule data state

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>Vehicule Data</h2>
          <DataTable columns={columns} data={VehiculeData} />
        </>
      )}
    </div>
  );
}
