import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import { useLoaderData, useParams } from 'react-router-dom';

const Payments = () => {
    const data = useLoaderData() ; 
    const {id} = useParams() ; 
    const BioData = data.filter(item => item._id === id) ; 
     
    // console.log(data , "id" , id);
    const stripePromise = loadStripe('pk_test_51Qh8PBFvD6yrvu2saJC9sITwJdU5WlgyJgIbZTER6X2hpqxzNpnjE5s9xK28Lq8vGTSajMOmAXUYGVq50nnJuvBb00lE5Td8zA')
    return (
        <div>
            <Elements stripe={stripePromise}>
               {
                BioData.map(BioDataInfo =>  <CheckoutForm key={BioDataInfo._id} BioDataInfo={BioDataInfo}></CheckoutForm>)
               }
            </Elements>
        </div>
    );
};

export default Payments;