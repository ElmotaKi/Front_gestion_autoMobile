import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ParkingApi from "@/services/Admin/ParkingApi";

const DemoPageParkings = () => {
    const { isLoading, isError, data: parkingData, refetch } = useQuery("parkings", fetchData);

    if (isLoading) return <div>Loading...</div>;
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
            PlaceRestantes: parking.PlaceRestantes
        }));

        return filteredData;
    }
};

export default DemoPageParkings;
