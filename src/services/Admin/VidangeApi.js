// AgentApi.js
import { axiosClient } from "../../api/axios";

const VidangeApi = {
  create: async (payload) => {
    return await axiosClient.post("vidanges", payload);
  },
  update: async (id, payload) => {
    return await axiosClient.put(`vidanges/${id}`, {
      ...payload,
      id,
    });
  },
  delete: async (id, queryClient) => {
    
    await axiosClient.delete(`vidanges/${id}`); // Added backticks for string interpolation
    // queryClient.invalidateQueries("vidanges");
  },
  getById: async (id) => { 
    return await axiosClient.get(`vidanges/${id}`);
  },

  getAll: async (columns = []) => { 
    return await axiosClient.get("vidanges", {
      params: {
        columns: columns,
      },
    });
  },
};

export default VidangeApi;
