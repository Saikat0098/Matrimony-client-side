import React from 'react';
 
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
 

 

const useDirectPremiumUsers = () => {
    const axiosSecure = useAxiosSecure() ; 
    const {user , loading} = useAuth()
    const {data : PremiumUser = [] , isLoading} =useQuery({
        queryKey : [ user?.email ,  `PremiumUser`] , 
         
        queryFn : async()=>{
            const res = await axiosSecure.get(`/user/premium/${user.email}`) ; 
            console.log(res.data);
            return res.data?.PremiumUser
        }
    })
    return  [PremiumUser , isLoading]
};

export default useDirectPremiumUsers;