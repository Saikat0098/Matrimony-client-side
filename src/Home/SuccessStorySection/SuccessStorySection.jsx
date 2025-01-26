import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import Rating from 'react-rating';
import { Star } from 'lucide-react';
import useSuccess from '../../Hooks/useSuccess';

const SuccessStorySection = () => {
  const [successStories] = useSuccess();
  const [sortOrder, setSortOrder] = useState('ascending');

  const sortedStories = useMemo(() => {
 
    return [...successStories].sort((a, b) => {
       
      const dateA = Date.parse(a.date) || 0;
      const dateB = Date.parse(b.date) || 0;
      
      return sortOrder === 'ascending' 
        ? dateA - dateB    
        : dateB - dateA;   
    });
  }, [successStories, sortOrder]);

  return (
    <section className="py-12 bg-gradient-to-br from-[#F3E7F3] via-[#E6F3F6] to-[#F0F4F8]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 mb-3">
            Matrimonial Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Happily ever afters, curated with care. Explore the journeys that began on our platform.
          </p>
        </motion.div>

        {/* Sort Control */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex justify-end">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-white px-4 py-2 rounded-lg border-2 border-purple-100 focus:outline-none focus:border-purple-300"
            >
              <option value="ascending">Oldest to Newest</option>
              <option value="descending">Newest to Oldest</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {sortedStories.slice(0 - 4).map(({ id, name, successStory, coupleImageUrl, date, platformRating }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
            >
              <div className="relative">
                <img 
                  src={coupleImageUrl} 
                  alt={name} 
                  className="h-full w-full object-cover rounded-2xl" 
                />
                <div className="absolute top-0 left-0 p-2 bg-gray-800 text-white rounded-br-2xl">
                  <FaQuoteLeft className="text-2xl" />
                </div>
                <div className="absolute bottom-0 right-0 p-2 bg-gray-800 text-white rounded-tl-2xl">
                  <FaQuoteRight className="text-2xl" />
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{name}</h3>
                  <p className="text-gray-600 leading-relaxed mb-3">{successStory}</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs text-gray-500">
                      Married on: {date}
                    </div>
                    <Rating
                      initialRating={platformRating}
                      readonly
                      emptySymbol={<Star size={18} color="#E0E0E0" fill="#E0E0E0" />}
                      fullSymbol={<Star size={18} color="#FFD700" fill="#FFD700" />}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStorySection;