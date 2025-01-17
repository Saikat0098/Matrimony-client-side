import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

 

const useAdmin = () => {
    const axiosSecure = useAxiosSecure() ; 
    const {user} = useAuth()
    const {data : isAdmin = [] , isLoading} =useQuery({
        queryKey : [ user?.email ,  `isAdmin`] , 
        queryFn : async()=>{
            const res = await axiosSecure.get(`/users/admin/${user.email}`) ; 
            console.log(res.data);
            return res.data?.admin
        }
    })
    return  [isAdmin , isLoading]
};

export default useAdmin;