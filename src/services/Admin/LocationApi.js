

import { axiosClient } from "../../api/axios";
const LocationApi = {
    create: async (payload) => {
        console.log('my data',payload)
        return await axiosClient.post("locations", payload);
    },
    update: async (id, payload) => {
        return await axiosClient.put(`locations/${id}`, {
            ...payload,
            id,
        });
    },
    delete: async (id, queryClient) => {
        return await axiosClient.delete(`locations/${id}`);
        queryClient.invalidateQueries("locations");
    },
    all: async (columns = []) => {
        return await axiosClient.get("locations", {
            params: {
                columns: columns,
            },
        });
    },
};
export default LocationApi;