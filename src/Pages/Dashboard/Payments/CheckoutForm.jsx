import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CheckoutForm = ({ BioDataInfo }) => {
    const {user} = useAuth()
    const {BiodataId , ContactEmail , MobileNumber , Name} = BioDataInfo ;
    const paymentInfo = {...BioDataInfo , email: user?.email ,  status : 'pending'} ; 
    console.log(paymentInfo);
     
 
    const [error, setError] = useState("");
    const stripe = useStripe();
    const elements = useElements();
   
   const axiosSecure = useAxiosSecure()

    const [clientSecret , setClientSecret ] = useState('') ; 
    useEffect( () =>{
  
           axiosSecure.post('/create-payment-intent' , {price: 5} )
           .then(res =>{
               console.log(res.data.clientSecret);
               setClientSecret(res.data.clientSecret)
           })
     
          
           } , [axiosSecure ])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }


        const {error , paymentMethod} = await stripe.createPaymentMethod({
            type: 'card' , 
            card 
        })
        if(error){
            console.log('Payment Error ' , error);
            setError(error.message)
        }

        else{
            console.log('payment Method ' , paymentMethod);
            setError("");
        }

        // conform card payment 

        const {paymentIntent , error: paymentError} = await stripe.confirmCardPayment(clientSecret , {
            payment_method : {
                card , 
                billing_details : {
                 email : user?.email || 'anonymous' , 
                    name: user?.displayName|| 'anonymous'
                }
            }
        })

        if(paymentError){
            console.log('payment Error');
           setError(paymentError.message)
        }

        else{
            if(paymentIntent.status === 'succeeded'){
                // console.log('transaction id' ,paymentError.id);
                
            }
          // now save the payment in the database
           
           const res = await axiosSecure.post('/request-user-info' ,paymentInfo )
             console.log(res.data);
        }

         
        
          
     
    };

    return (
        <div className="max-w-md mx-auto mt-16 bg-white rounded-lg shadow-md p-6">
            {/* Stripe Header */}
             

            {/* Payment Notice */}
            <p className="text-gray-600 mb-6">
                Secure payment via Stripe.
            </p>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Biodata ID */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Biodata ID <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={BiodataId}
                        readOnly
                        className="w-full px-3 py-2 border rounded-md bg-gray-50"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="w-full px-3 py-2 border rounded-md bg-gray-50"
                    />
                </div>

                {/* Stripe Card Element */}
                <div className="space-y-1">
                    <label className="block text-sm text-gray-600">
                        Card Details <span className="text-red-500">*</span>
                    </label>
                    <div className="border rounded-md p-3 bg-white">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret}
                    className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;