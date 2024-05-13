// AgentApi.js
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
  delete: async (id, queryClient) => {
    console.log(id);
    await axiosClient.delete(`agents/${id}`); // Added backticks for string interpolation
    queryClient.invalidateQueries("agents");
  },
  getById: async (id) => { 
    return await axiosClient.get(`agents/${id}`);
  },

  getAll: async (columns = []) => { 
    return await axiosClient.get("agents", {
      params: {
        columns: columns,
      },
    });
  },
};

export default AgentApi;
