import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const ConfettiEffect = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: document.documentElement.scrollHeight, // 🔥 Obtiene toda la altura del documento
  });

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: document.documentElement.scrollHeight,
      });
    };

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      gravity={0.2}
    />
  );
};
export default ConfettiEffect;
