import React, { useEffect, useRef } from 'react';

const CanvasArea = ({ tShirtImage, logo, logoPosition, logoSize }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && tShirtImage) {
      const tshirt = new Image();
      tshirt.src = tShirtImage;

      tshirt.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(
          tshirt,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        if (logo) {
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
  }, [tShirtImage, logo, logoPosition, logoSize]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      className="w-full h-full rounded-lg"
    />
  );
};

export default CanvasArea;
