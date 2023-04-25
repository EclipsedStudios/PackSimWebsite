import './App.css';
import MagicCard from './components/MagicCard.js';
import MagicCardLoading from './components/MagicCardLoading.js';
import SetSelection from './components/SetSelection';
import getCardImage from './components/getCardImage';
import React, { useState, useEffect } from 'react';

function App() {
  const [cards, setCards] = useState([]);
  const [set, setSet] = useState('');
  const [setName, setSetName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPack, setIsGeneratingPack] = useState(false);
  const [cardsLoaded, setCardsLoaded] = useState(0);
  
  async function fetchCards(set) {
    console.log("Fetching cards...");
    if (!set) return; // Return early if set is undefined
    try {
      
      const basicLandResponse = [];
      for (let i = 0; i < 1; i++) {
        const response = await fetch(`https://api.scryfall.com/cards/random?q=set:${set} is:booster  t:basic unique:prints -stamp:arena`);
        const { name } = await response.json();
        basicLandResponse.push(await getCardImage(name, 'large', set));
      }

      const rareMythicResponse = await fetch(`https://api.scryfall.com/cards/random?q=set:${set} is:booster  (rarity:rare OR rarity:mythic) -stamp:arena`);
      const { name } = await rareMythicResponse.json();
      const rareMythic = await getCardImage(name, 'large', set);
  
      const uncommons = [];
      for (let i = 0; i < 3; i++) {
        const response = await fetch(`https://api.scryfall.com/cards/random?q=set:${set} is:booster  rarity:uncommon -stamp:arena`);
        const { name } = await response.json();
        uncommons.push(await getCardImage(name, 'large', set));
      }
  
      const commons = [];
      for (let i = 0; i < 10; i++) {
        const response = await fetch(`https://api.scryfall.com/cards/random?q=set:${set} is:booster  rarity:common -stamp:arena -t:basic`);
        const { name } = await response.json();
        commons.push(await getCardImage(name, 'large', set));
      }
  
      const foilChance = Math.random();
      let foilCard = null;
      if (foilChance <1) {
        const response = await fetch(`https://api.scryfall.com/cards/random?q=set:${set} is:booster -stamp:arena`);
        const { name } = await response.json();
        foilCard = await getCardImage(name, 'large', set);
      }
  
      const cardImages = [rareMythic, ...uncommons, ...commons, ...basicLandResponse];
      const randomIndex = Math.floor(Math.random() * cardImages.length);
      cardImages[randomIndex] = foilCard || cardImages[randomIndex];
  
      const cardObjects = cardImages.map((src, index) => {
        return { src, isFoil: src === foilCard };
      });
  
      console.log(cardObjects.length);
      setCards(cardObjects);
    } catch (error) {
      console.error(error);
      setCards([]);
    } finally {
      setIsLoading(false);
      setIsGeneratingPack(false);
    }
  }


  function onStartOpen(setCode, setName) {
    setCardsLoaded(0);
    setIsLoading(true);
    setIsGeneratingPack(true);
    setSet(setCode);
    setSetName(setName);
    fetchCards(setCode);
    console.log("Selected set code %s, and name %s", setCode, setName);
  }

  function onClosePack() {
    setCardsLoaded(0);
    setIsLoading(false);
    setIsGeneratingPack(false);
    setCards([]);
    setSetName('');
    setSet('');
  }


  return (
    <div className="App">
      <div className='cardGrid'>
        <h1>PackSim</h1>
        <h4>Magic the Gathering Pack Opening Simulator</h4>
        <SetSelection onStartOpen={onStartOpen} onClosePack={onClosePack} setIsGeneratingPack={setIsGeneratingPack} />
        {<div className='cardSelection'>
          {isGeneratingPack ?(
            <div className ="center">
              <MagicCardLoading src={'https://i.imgur.com/9isqh6C.png'} name={setName} isFoil={false} alt={'Your pack is loading...'}/>
            </div>
          ):
          (
            <div className="card-grid">
              {cards.map((card, index) => (
                <MagicCard key={index} src={card.src}  isFoil={card.isFoil} alt={`Card ${index + 1}`} />
              ))}
            </div>
          ) }
        </div>}
      </div> 

      
    </div>
  );
}

export default App;
