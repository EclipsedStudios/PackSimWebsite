import React from "react";
import "./MagicCard.css";
import { useState, useEffect } from 'react';

function MagicCardLoading(props) {
  const { src, alt, name } = props;
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [middleColorPercentage, setMiddleColorPercentage] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate new rotation values
      const newRotateX = rotateX + direction * 0.05;
      const newRotateY = rotateY + direction * 0.5;

      // Update state
      setRotateX(newRotateX);
      setRotateY(newRotateY);

      setMiddleColorPercentage(50 + (newRotateY / 15) * -10);

      // Switch direction if we hit the limits
      if (newRotateX >= 8 || newRotateX <= -8 || newRotateY >= 8 || newRotateY <= -8) {
        setDirection(-direction);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [rotateX, rotateY, direction]);

  return (
    <div className={`magicCardLoading`} 
      style={{
        transform: `perspective(1000px) rotate3d(0, 1, 0, ${rotateY}deg) rotate3d(1, 0, 0, ${rotateX}deg) rotate3d(0, 0, 1, 0deg) scale(1.25)`,
      }}
    >
      <div className={`magicCardLoadingShiny`} style={{background: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.15) ${middleColorPercentage}%, rgba(255, 255, 255, 0.05) 100%)`,}}> 
      </div>

      <img className={`magicCardLoadingPack`} src={src} alt={alt}/>
      <div className={`magicCardLoadingText`} dangerouslySetInnerHTML={{ __html: name }}/> 

    </div>
  );
}


export default MagicCardLoading;
