import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useSuccess = () => {
    const axiosPublic = useAxiosPublic()
    const {data: successStory=[] , isLoading} = useQuery({
        queryKey: ['successStory'] , 
        queryFn: async()=>{
            const res = await axiosPublic.get('/success-story') ; 
            return res.data
        }
     })
     return [successStory , isLoading]
};

export default useSuccess;