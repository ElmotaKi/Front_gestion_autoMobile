// AgentApi.js
import { axiosClient } from "../../api/axios";

const VignetteApi = {
  create: async (payload) => {
    return await axiosClient.post("vignettes", payload);
  },
  update: async (id, payload) => {
    return await axiosClient.put(`vignettes/${id}`, {
      ...payload,
      id,
    });
  },
  delete: async (id, queryClient) => {
    return await axiosClient.delete(`vignettes/${id}`);
    queryClient.invalidateQueries("vignettes");
},
  getById: async (id) => { 
    return await axiosClient.get(`vignettes/${id}`);
  },

  get: async (columns = []) => { 
    return await axiosClient.get("vignettes", {
      params: {
        columns: columns,
      },
    });
  },
};

export default VignetteApi;