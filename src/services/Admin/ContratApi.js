import { axiosClient } from "./../../api/axios";
const ContratApi = {
    create: async (payload) => {
        return await axiosClient.post("Contrats", payload);
    },
    update: async (id, payload) => {
        return await axiosClient.put(`Contrats/${id}`, {
            ...payload,
            id,
        });
    },
    delete: async (id,queryClient) => {
        return await axiosClient.delete(`Contrats/${id}`);
        queryClient.invalidateQueries("Contrats");
    },
    all: async (columns = []) => {
        return await axiosClient.get("Contrats", {
            params: {
                columns: columns,
            },
        });
    },
};
export default ContratApi;