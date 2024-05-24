import { axiosClient } from "./../../api/axios";
const ParkingApi = {
    create: async (payload) => {
        return await axiosClient.post("parkings", payload);
    },
    update: async (id, payload) => {
        return await axiosClient.put(`parkings/${id}`, {
            ...payload,
            id,
        });
    },
    delete: async (id) => {
        return await axiosClient.delete(`parkings/${id}`);
    },
    all: async (columns = []) => {
        return await axiosClient.get("parkings", {
            params: {
                columns: columns,
            },
        });
    },
};
export default ParkingApi;
