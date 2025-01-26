import React, { useState, useEffect } from 'react';
import { FaUsers, FaVenusMars, FaUserFriends, FaHeart } from 'react-icons/fa';
import useBiodata from '../../Hooks/useBiodata';
import useSuccess from '../../Hooks/useSuccess';

const SuccessCounter = () => {

  const [biodatas] = useBiodata() ; 
  const [successStory] = useSuccess()

  const TotalSuccess = successStory.length ; 

  const totalBioData = biodatas.length ; 
  const Male = biodatas.filter(item => item.Gender ==='Male' || item.Gender ==='male')
  const Female = biodatas.filter(item => item.Gender ==='Female'  || item.Gender === 'female') ; 
 
  const totalMaleBioData = Male.length ; 
  const totalFemaleBioData = Female.length ; 
   
  const [stats, setStats] = useState({
    total: 0,
    boys: 0,
    girls: 0,
    marriages: 0
  });

  useEffect(() => {
    const targets = {
      total: totalBioData,
      boys: totalMaleBioData,
      girls: totalFemaleBioData,
      marriages: TotalSuccess
    };
    const duration = 2000;
    const startTime = Date.now();
    
    const updateStats = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setStats({
        total: Math.floor(targets.total * easeProgress),
        boys: Math.floor(targets.boys * easeProgress),
        girls: Math.floor(targets.girls * easeProgress),
        marriages: Math.floor(targets.marriages * easeProgress)
      });
      
      if (progress < 1) {
        requestAnimationFrame(updateStats);
      }
    };
    
    requestAnimationFrame(updateStats);
  }, [totalBioData , totalMaleBioData , totalFemaleBioData , TotalSuccess]);

  const statsData = [
    { 
      icon: FaUsers, 
      count: stats.total, 
      label: "Total Biodatas", 
      color: "blue" 
    },
    { 
      icon: FaUserFriends, 
      count: stats.boys, 
      label: "Boys Biodatas", 
      color: "purple" 
    },
    { 
      icon: FaVenusMars, 
      count: stats.girls, 
      label: "Girls Biodatas", 
      color: "pink" 
    },
    { 
      icon: FaHeart, 
      count: stats.marriages, 
      label: "Successful Marriages", 
      color: "rose" 
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="grid grid-cols-4 gap-4">
        {statsData.map(({ icon: Icon, count, label, color }) => (
          <div 
            key={label} 
            className="text-center border-r last:border-r-0 border-gray-200 px-4"
          >
            <div className={`bg-${color}-100 text-${color}-600 rounded-full p-4 inline-block mb-4`}>
              <Icon className="text-4xl" />
            </div>
            <h3 className={`text-3xl font-bold text-${color}-700 mb-2`}>
              {count.toLocaleString()}
            </h3>
            <p className="text-gray-600">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessCounter;