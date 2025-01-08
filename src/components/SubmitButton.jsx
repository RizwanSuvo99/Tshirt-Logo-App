import React from 'react';

const SubmitButton = ({ onSubmit }) => {
  return (
    <button
      onClick={onSubmit}
      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      Submit
    </button>
  );
};

export default SubmitButton;
