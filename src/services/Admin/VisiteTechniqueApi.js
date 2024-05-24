// AgentApi.js
import { axiosClient } from "./../../api/axios";

const VisiteTechniqueApi = {
  create: async (payload) => {
    return await axiosClient.post("visiteTechnique", payload);
  },
  update: async (id, payload) => {
    return await axiosClient.put(`visiteTechnique/${id}`, {
      ...payload,
      id,
    });
  },
  delete: async (id, queryClient) => {
    return await axiosClient.delete(`visiteTechnique/${id}`);
   
},
  getById: async (id) => { 
    return await axiosClient.get(`visiteTechnique/${id}`);
  },

  get: async (columns = []) => { 
    return await axiosClient.get("visiteTechnique", {
      params: {
        columns: columns,
      },
    });
  },
};

export default  VisiteTechniqueApi ;