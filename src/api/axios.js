import axios from "axios";
export const axiosClient=axios.create({
    baseURL:"http://localhost:8000/api/",
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials: true    
});