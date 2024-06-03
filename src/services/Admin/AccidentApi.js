// AgentApi.js
import { axiosClient } from "../../api/axios";

const AccidentApi = {
  create: async (payload) => {
    return await axiosClient.post("accidents", payload);
  },
  update: async (id, payload) => {
    return await axiosClient.put(`accidents/${id}`, {
      ...payload,
      id,
    });
  },
  delete: async (id, queryClient) => {
    
    await axiosClient.delete(`accidents/${id}`); // Added backticks for string interpolation
    // queryClient.invalidateQueries("vidanges");
  },
//   getById: async (id) => { 
//     return await axiosClient.get(`accidents/${id}`);
//   },

 all: async (columns = []) => { 
    return await axiosClient.get("accidents", {
      params: {
        columns: columns,
      },
    });
  },
};

export default AccidentApi ;
