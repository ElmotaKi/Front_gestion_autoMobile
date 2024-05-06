import React, { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function getParkingData() {
  try {
    const response = await fetch('http://localhost:8000/api/parkings');
    if (!response.ok) {
      throw new Error('Failed to fetch parking data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching parking data:", error);
    throw error; // Rethrow the error to be caught by the component
  }
}

export default function DemoPage() {
  const [parkingData, setParkingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parking = await getParkingData();
        console.log("Fetched parking data:", parking); // Log fetched parking data
        setParkingData(parking);
      } catch (error) {
        console.error("Error fetching parking data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Parking data:", parkingData); // Log current parking data state

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2>Parking Data</h2>
          <DataTable columns={columns} data={parkingData} />
        </>
      )}
    </div>
  );
}
