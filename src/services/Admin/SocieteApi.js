import { axiosClient } from "./../../api/axios";
const SocieteApi = {
  create: async (payload) => {
    return await axiosClient.post("societes", payload);
  },
  update: async (id, payload) => {
    return await axiosClient.put(`societes/${id}`, {
      ...payload,
      id,
    });
  },
  delete: async (id) => {
    return await axiosClient.delete(`societes/${id}`);
  },
  get: async () => {
    return await axiosClient.get("societes");
  },
  all: async (columns = []) => {
    return await axiosClient.get("societes", {
      params: {
        columns: columns,
      },
    });
  },
};
export default SocieteApi;
