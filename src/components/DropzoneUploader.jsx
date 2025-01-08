import React from 'react';
import { useDropzone } from 'react-dropzone';

const DropzoneUploader = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-600 p-4 mb-8 text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      <p className="text-gray-700">
        Drag & drop a logo here, or click to select a file
      </p>
    </div>
  );
};

export default DropzoneUploader;
