import React, { useRef, useCallback } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

function ZoomImage({ src, alt }) {
  const imgRef = useRef();
  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = imgRef;

    if (img) {
      const value = make3dTransformValue({ x, y, scale });

      img.style.setProperty("transform", value);
    }
  }, []);

  return (
    <QuickPinchZoom onUpdate={onUpdate}>
      <img ref={imgRef} src={src} alt={alt} />
    </QuickPinchZoom>
  );
}

export default ZoomImage;
