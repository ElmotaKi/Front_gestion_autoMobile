import { axiosClient } from "../../api/axios";
const ClientParticulierApi = {
    create: async (payload) => {
        return await axiosClient.post("/ClientParticuliers", payload);
    },
    update: async (id, payload) => {
        return await axiosClient.put(`/ClientParticuliers/${id}`, {
            ...payload,
            id,
        });
    },
    delete: async (id) => {
        return await axiosClient.delete(`/ClientParticuliers/${id}`);
    },
    all: async (columns = []) => {
        return await axiosClient.get("/ClientParticuliers", {
            params: {
                columns: columns,
            },
        });
    },
};
export default ClientParticulierApi;