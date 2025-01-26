import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useSuccess from '../../../Hooks/useSuccess';

const Modal = ({ open, onClose, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        isOpen ? 'visible' : 'invisible'
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={handleClose}
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

const AdminSuccessStoryView = () => {
 
  const [showModal, setShowModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const [successStory] = useSuccess()
  const handleViewStory = (story) => {
    setSelectedStory(story);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStory(null);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Success Stories</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Male Biodata ID
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Female Biodata ID
              </th>
              <th className="px-4 md:px-6 py-3 text-center text-sm font-semibold text-gray-700">
                View Story
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {successStory.map((story) => (
              <tr key={story.id} className="hover:bg-gray-50">
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {story.selfBiodataId}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {story.partnerBiodataId}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                  <button
                    onClick={() => handleViewStory(story)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md  rounded-lg"
                  >
                    View Story
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={showModal} onClose={handleCloseModal}>
        <div className="px-6 py-4">
          {selectedStory && (
            <div>
              <p>Male Biodata ID: {selectedStory.selfBiodataId}</p>
              <p>Female Biodata ID: {selectedStory.partnerBiodataId}</p>
              <img src={selectedStory.coupleImageUrl}   />
              <p>{selectedStory.successStory}</p>
            </div>
          )}
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminSuccessStoryView;