import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

 

const useAdmin = () => {
    const axiosSecure = useAxiosSecure() ; 
    const {user , loading} = useAuth()
    const {data : isAdmin = [] , isLoading} =useQuery({
        queryKey : [ user?.email ,  `isAdmin`] , 
        enabled : !loading ,
        queryFn : async()=>{
            const res = await axiosSecure.get(`/users/admin/${user.email}`) ; 
 
            return res.data?.admin
        }
    })
    return  [isAdmin , isLoading]
};

export default useAdmin;