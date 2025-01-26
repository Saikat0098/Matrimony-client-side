import React from 'react';
 
import BanerSlide from './Header/BanerSlide';
import PremiumCards from './PremiumProfile/PremiumCards';
import HowItWorkSection from './HowItWork/HowItWorkSection';
import SuccessCounter from './SuccessCounter/SuccessCounter';
import SuccessStorySection from './SuccessStorySection/SuccessStorySection';
 
 

const Home = () => {
    return (
        <div>
           <BanerSlide></BanerSlide>
           <PremiumCards></PremiumCards>
           <HowItWorkSection></HowItWorkSection>
           <SuccessCounter></SuccessCounter>
           <SuccessStorySection></SuccessStorySection>
           
        </div>
    );
};

export default Home;