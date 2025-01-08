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
      className="border-2 border-dashed border-blue-400 p-6 mb-8 rounded-xl text-center cursor-pointer transition-shadow hover:shadow-xl hover:bg-blue-50"
    >
      <input {...getInputProps()} />
      <p className="text-blue-500 font-medium">
        Drag & drop a logo here, or <span className="underline">click</span> to select a file
      </p>
    </div>
  );
};

export default DropzoneUploader;
