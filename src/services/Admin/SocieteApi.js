// AgentApi.js
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
  delete: async (id, queryClient) => {
    await axiosClient.delete(`societes/${id}`); // Added backticks for string interpolation
    // console.log(queryClient)
    // queryClient.invalidateQueries("societes");
  },
  getById: async (id) => { 
    return await axiosClient.get(`societes/${id}`);
  },

  get: async (columns = []) => { 
    return await axiosClient.get("societes", {
      params: {
        columns: columns,
      },
    });
  },
};

export default SocieteApi;