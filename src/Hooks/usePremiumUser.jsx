import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";


const usePremiumUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user , loading} = useAuth();
  const { data: isPremium = [] , refetch , isLoading} = useQuery({
   
    queryKey: [user?.email, "isPremium"],
    
    queryFn: async () => {
      const res = await axiosSecure.get(`/premium-user/${user?.email}`);
      return res.data;
    },
  });
  return [isPremium , refetch , isLoading];
};

export default usePremiumUser;
