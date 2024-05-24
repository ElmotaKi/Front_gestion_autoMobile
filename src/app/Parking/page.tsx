import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ParkingApi from "@/services/Admin/ParkingApi";
import { FaSpinner } from 'react-icons/fa'; // Import loading spinner icon
const DemoPageParkings = () => {
    const { isLoading, isError, data: parkingData, refetch } = useQuery("parkings", fetchData);

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
            <DataTable columns={columns} data={parkingData} onDeleteSuccess={onDeleteSuccess} />
        </div>
    );

    async function fetchData() {
        const response = await ParkingApi.all();
        const filteredData = response.data.map((parking) => ({
            id: parking.id,
            Capacite: parking.Capacite,
            pannes: parking.pannes,
            PlaceRestantes: parking.PlaceRestantes,
            Lieu: parking.Lieu
        }));

        return filteredData;
    }
};

export default DemoPageParkings;
