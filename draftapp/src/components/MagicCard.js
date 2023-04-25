import React from "react";
import "./MagicCard.css";

function MagicCard(props) {
  const { src, alt, isFoil } = props;

  function handleMouseMove(e) {
    const card = e.currentTarget;
    const halfCardWidth = card.offsetWidth / 2;
    const halfCardHeight = card.offsetHeight / 2;
    const cardRect = card.getBoundingClientRect();
    const cardX = cardRect.left + halfCardWidth;
    const cardY = cardRect.top + halfCardHeight;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const rotateX = -1*(cardY - mouseY) / 25;
    const rotateY = (cardX - mouseX) / 20;
    const rotateZ = 0;
    const perspective = '1000px';
    card.style.transform = `perspective(${perspective}) rotate3d(0, 1, 0, ${rotateY}deg) rotate3d(1, 0, 0, ${rotateX}deg) rotate3d(0, 0, 1, ${rotateZ}deg) scale(1.25)`;

    if (isFoil) {
      const middleColorPercentage = 50 + (rotateY / 15) * 25;
      card.style.background = `linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) ${middleColorPercentage}%, rgba(255, 255, 255, 0) 100%)`;
    }
  }
  
  function handleMouseLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'scale(1)';
  }

  return (
    <div className={`magicCard${isFoil ? ' foil' : ''}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <img src={src} alt={alt} />
    </div>
  );
}


export default MagicCard;
