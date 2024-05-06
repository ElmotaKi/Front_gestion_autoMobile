import { axiosClient } from "./../../api/axios";
const AgentApi = {
  create: async (payload) => {
    return await axiosClient.post("agents", payload);
  },
  update: async (id, payload) => {
    return await axiosClient.put(`agents/${id}`, {
      ...payload,
      id,
    });
  },
  delete: async (id) => {
    return await axiosClient.delete(`agents/${id}`);
  },
  get: async (id) => {
    return await axiosClient.get(`agents/${id}`);
  },

  all: async (columns = []) => {
    return await axiosClient.get("agents", {
      params: {
        columns: columns,
      },
    });
  },
};
export default AgentApi;
