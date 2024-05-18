

import { axiosClient } from "./../../api/axios";
const VehiculeApi = {
    create: async (payload) => {
        console.log('my data',payload)
        return await axiosClient.post("vehicules", payload);
    },
    update: async (id, payload) => {
        return await axiosClient.put(`vehicules/${id}`, {
            ...payload,
            id,
        });
    },
    delete: async (id, queryClient) => {
        return await axiosClient.delete(`vehicules/${id}`);
        queryClient.invalidateQueries("vehicules");
    },
    all: async (columns = []) => {
        return await axiosClient.get("vehicules", {
            params: {
                columns: columns,
            },
        });
    },
};
export default VehiculeApi;