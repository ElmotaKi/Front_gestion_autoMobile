// AgentApi.js
import { all } from "axios";
import { axiosClient } from "../../api/axios";

const HistoriqueApi = {
  create: async (payload) => {
    return await axiosClient.post("historiques", payload);
  },
  update: async (id, payload) => {
    return await axiosClient.put(`historiques/${id}`, {
      ...payload,
      id,
    });
  },
  delete: async (id, queryClient) => {
    
    await axiosClient.delete(`historiques/${id}`); // Added backticks for string interpolation
    // queryClient.invalidateQueries("vidanges");
  },
  getById: async (id) => { 
    return await axiosClient.get(`historiques/${id}`);
  },

  all: async (columns = []) => { 
    return await axiosClient.get("historiques", {
      params: {
        columns: columns,
      },
    });
  },
};

export default HistoriqueApi;
