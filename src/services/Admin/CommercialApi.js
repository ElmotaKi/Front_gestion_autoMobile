import { axiosClient } from "./../../api/axios";

const CommercialApi = {
  create: async (payload) => {
    return await axiosClient.post("commercials", payload);
  },
  update: async (id, payload) => {
    return await axiosClient.put(`commercials/${id}`, {
      ...payload,
      id,
    });
  },
  delete: async (id, queryClient) => {
    console.log(id);
    await axiosClient.delete(`commercials/${id}`); // Added backticks for string interpolation
    queryClient.invalidateQueries("commercials");
  },
  getById: async (id) => { 
    return await axiosClient.get(`commercials/${id}`);
  },

  get: async (columns = []) => { 
    return await axiosClient.get("commercials", {
      params: {
        columns: columns,
      },
    });
  },
};

export default CommercialApi;