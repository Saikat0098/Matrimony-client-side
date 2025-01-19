import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

 const axiosPublic = useAxiosPublic() ;

 import React from 'react';
 
 const useBiodata = () => {
     const {data: biodatas=[] , isLoading} = useQuery({
        queryKey: ['biodata'] , 
        queryFn: async()=>{
            const res = await axiosPublic.get('/biodata') ; 
            return res.data
        }
     })
     return [biodatas , isLoading]
 };
 
 export default useBiodata;