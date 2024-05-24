// AgentApi.js
import { axiosClient } from "../../api/axios";

const AssuranceApi = {
  create: async (payload) => {
    return await axiosClient.post("assurances", payload);
  },
  update: async (id, payload) => {
    return await axiosClient.put(`assurances/${id}`, {
      ...payload,
      id,
    });
  },
  delete: async (id, queryClient) => {
    
    await axiosClient.delete(`assurances/${id}`); // Added backticks for string interpolation
    // queryClient.invalidateQueries("vidanges");
  },
  getById: async (id) => { 
    return await axiosClient.get(`assurances/${id}`);
  },

  getAll: async (columns = []) => { 
    return await axiosClient.get("assurances", {
      params: {
        columns: columns,
      },
    });
  },
};

export default AssuranceApi;
