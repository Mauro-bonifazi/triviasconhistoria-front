import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useTheme } from "@mui/material/styles";

const ConfettiEffect = ({ onComplete }) => {
  const theme = useTheme(); // Accedemos a nuestro tema
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const themeColors = [
    theme.palette.primary.main, // Verde Oliva
    theme.palette.accent.main, // Dorado/Ocre
    theme.palette.success.main, // Verde de acierto
    theme.palette.secondary.main, // Marrón oscuro
    theme.palette.background.default, // Fondo claro para contraste
  ];

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: document.documentElement.scrollHeight,
      });
    };

    updateSize(); // Lo ejecutamos una vez al montar
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      // --- ¡Aquí la magia! ---
      colors={themeColors} // 1. Usamos nuestros colores personalizados
      numberOfPieces={500} // 2. Más piezas
      gravity={0.15} // 3. Un poco más de "flote"
      recycle={false} // 4 El confeti no se recicla, caerá una sola vez.
      onConfettiComplete={onComplete} // 5. Llama a la función onComplete cuando la anima
      confettiSource={{
        w: 10,
        h: 10,
        x: dimensions.width / 2, // Dispara desde el centro horizontal
        y: dimensions.height / 4, // Dispara desde un tercio de la altura
      }}
    />
  );
};

export default ConfettiEffect;
