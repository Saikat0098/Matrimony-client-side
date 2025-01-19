import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const axiosSecure = useAxiosSecure();
const usePremiumUser = () => {
  const { user } = useAuth();
  const { data: isPremium = [] } = useQuery({
    queryKey: [user?.email, "isPremium"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/premium-user/${user.email}`);
      return res.data;
    },
  });
  return [isPremium];
};

export default usePremiumUser;
