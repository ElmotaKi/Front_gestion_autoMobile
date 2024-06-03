// AgentApi.js
import { all } from "axios";
import { axiosClient } from "../../api/axios";

const PneumatiqueApi = {
  create: async (payload) => {
    return await axiosClient.post("pneumatiques", payload);
  },
  update: async (id, payload) => {
    return await axiosClient.put(`pneumatiques/${id}`, {
      ...payload,
      id,
    });
  },
  delete: async (id, queryClient) => {
    
    await axiosClient.delete(`pneumatiques/${id}`); // Added backticks for string interpolation
    // queryClient.invalidateQueries("vidanges");
  },
  getById: async (id) => { 
    return await axiosClient.get(`pneumatiques/${id}`);
  },

  all: async (columns = []) => { 
    return await axiosClient.get("pneumatiques", {
      params: {
        columns: columns,
      },
    });
  },
};

export default PneumatiqueApi;
