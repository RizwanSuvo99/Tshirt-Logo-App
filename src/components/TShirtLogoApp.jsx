import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Rnd } from 'react-rnd'; // For drag and resize

const TShirtLogoApp = () => {
  const [logo, setLogo] = useState(null); // Logo state
  const [logoPosition, setLogoPosition] = useState({ x: 100, y: 100 }); // Initial position
  const [logoSize, setLogoSize] = useState({ width: 50, height: 50 }); // Set smaller initial size
  const canvasRef = useRef(null);
  const tShirtImage = './tshirt.png'; // Path to the t-shirt image

  // Handle logo upload
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const image = new Image();
      image.onload = () => setLogo(image); // Set the logo as an image
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  // Draw the t-shirt and logo onto the canvas
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && tShirtImage) {
      const tshirt = new Image();
      tshirt.src = tShirtImage;

      tshirt.onload = () => {
        // Draw t-shirt only once on canvas
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(
          tshirt,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        if (logo) {
          // Draw the logo with current position and size
          ctx.drawImage(
            logo,
            logoPosition.x,
            logoPosition.y,
            logoSize.width,
            logoSize.height
          );
        }
      };
    }
  }, [logo, logoPosition, logoSize]); // Re-run when logo, position, or size change

  // Function to download the canvas image
  const downloadImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png'); // Convert canvas to image (base64 PNG)
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'custom-tshirt.png'; // File name for the download
    link.click();
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">
        T-Shirt Customizer
      </h1>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-600 p-4 mb-8 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-gray-700">
          Drag & drop a logo here, or click to select a file
        </p>
      </div>

      <div className="relative w-[500px] h-[500px] mx-auto border border-gray-300 rounded-lg">
        {/* Canvas for T-shirt and Logo */}
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="w-full h-full rounded-lg"
        />
        {logo && (
          <Rnd
            size={{ width: logoSize.width, height: logoSize.height }}
            position={{ x: logoPosition.x, y: logoPosition.y }}
            onDragStop={(e, d) => setLogoPosition({ x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, position) => {
              setLogoSize({ width: ref.offsetWidth, height: ref.offsetHeight });
              setLogoPosition(position);
            }}
            bounds="parent"
          >
            <img
              src={logo.src}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </Rnd>
        )}
      </div>

      <div className="mt-4 text-center">
        {/* Download Button */}
        <button
          onClick={downloadImage}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default TShirtLogoApp;
