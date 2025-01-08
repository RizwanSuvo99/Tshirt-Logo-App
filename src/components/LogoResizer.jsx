import React from 'react';
import { Rnd } from 'react-rnd';

const LogoResizer = ({
  logo,
  logoPosition,
  logoSize,
  setLogoPosition,
  setLogoSize,
}) => {
  return (
    logo && (
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
    )
  );
};

export default LogoResizer;
