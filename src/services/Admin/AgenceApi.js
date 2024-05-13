import { axiosClient } from "./../../api/axios";
const AgenceApi = {
    create: async (payload) => {
        return await axiosClient.post("agences", payload);
    },
    update: async (id, payload) => {
        return await axiosClient.put(`agences/${id}`, {
            ...payload,
            id,
        });
    },
    delete: async (id) => {
        return await axiosClient.delete(`agences/${id}`);
    },
    getAll: async (columns = []) => {
        return await axiosClient.get("agences", {
            params: {
                columns: columns,
            },
        });
    },
};
export default AgenceApi;