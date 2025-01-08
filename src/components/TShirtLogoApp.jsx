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
    <div className="max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">
        T-Shirt Customizer
      </h1>
      <DropzoneUploader onDrop={onDrop} />
      <div className="relative w-[500px] h-[500px] mx-auto border border-gray-300 rounded-lg">
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
      <div className="mt-4 text-center">
        <SubmitButton onSubmit={downloadImage} />
      </div>
    </div>
  );
};

export default TShirtLogoApp;
