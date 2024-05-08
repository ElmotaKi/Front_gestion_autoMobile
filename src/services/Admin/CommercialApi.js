import { axiosClient } from "./../../api/axios";
const CommercialApi = {
  create: async (payload) => {
    return await axiosClient.post("commercials", payload);
  },
  update: async (id, payload) => {
    return await axiosClient.put(`commercials/${id}`, {
      ...payload,
      id,
    });
  },
  delete: async (id) => {
    return await axiosClient.delete(`commercials/${id}`);
  },
  get: async (id) => {
    return await axiosClient.get(`commercials/${id}`);
  },
  all: async (columns = []) => {
    return await axiosClient.get("commercials", {
      params: {
        columns: columns,
      },
    });
  },
};
export default CommercialApi;
