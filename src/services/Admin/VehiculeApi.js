import { axiosClient } from "../../api/axios";

const VehiculeApi = {
    create: async (payload) => {
        return await axiosClient.post("/vehicules", payload);
    },
    update: async (id, payload) => {
        return await axiosClient.put(`/vehicules/${id}`, {
            ...payload,
            id,
        });
    },
    delete: async (id) => {
        return await axiosClient.delete(`/vehicules/${id}`);
    },
    get: async (id) => {
        return await axiosClient.get(`/vehicules/${id}`);
    },
    all: async (columns = []) => {
        return await axiosClient.get("/vehicules", {
            params: {
                columns: columns,
            },
        });
    },
};
export default VehiculeApi;
