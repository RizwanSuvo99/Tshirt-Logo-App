import React from 'react';

const SubmitButton = ({ onSubmit }) => {
  return (
    <button
      onClick={onSubmit}
      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
    >
      Submit
    </button>
  );
};

export default SubmitButton;
