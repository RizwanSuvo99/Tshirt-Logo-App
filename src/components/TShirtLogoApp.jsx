import React, { useState } from 'react';
import tShirtImage from '../../public/tshirt.png';
import CanvasArea from './CanvasArea';
import DropzoneUploader from './DropzoneUploader';
import LogoResizer from './LogoResizer';
import SubmitButton from './SubmitButton';

const TShirtLogoApp = () => {
  const [logo, setLogo] = useState(null);
  const [logoPosition, setLogoPosition] = useState({ x: 100, y: 100 });
  const [logoSize, setLogoSize] = useState({ width: 50, height: 50 });

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const image = new Image();
      image.onload = () => setLogo(image);
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const downloadImage = () => {
    const canvas = document.querySelector('canvas');
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'custom-tshirt.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 tracking-wide drop-shadow-lg">
        T-Shirt Customizer
      </h1>

      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-2xl bg-white">
        <DropzoneUploader onDrop={onDrop} />

        <div className="relative w-[500px] h-[500px] mx-auto border border-gray-300 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <CanvasArea
            tShirtImage={tShirtImage}
            logo={logo}
            logoPosition={logoPosition}
            logoSize={logoSize}
          />
          <LogoResizer
            logo={logo}
            logoPosition={logoPosition}
            logoSize={logoSize}
            setLogoPosition={setLogoPosition}
            setLogoSize={setLogoSize}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <SubmitButton onSubmit={downloadImage} />
        </div>
      </div>
    </div>
  );
};

export default TShirtLogoApp;
