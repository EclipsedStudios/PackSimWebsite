import React, { useState, useEffect } from 'react';
import axios from 'axios';


function SetSelection(props) {
  const [selectedSet, setSelectedSet] = useState('');
  const [selectedSetCode, setSelectedSetCode] = useState('');
  const [isShowingClose, setIsShowingClose] = useState(false);
  const [setCodes, setSetCodes] = useState([]);

  useEffect(() => {
    async function getSets() {
      try {
        const response = await axios.get('https://api.scryfall.com/sets');

        const setArray = response.data.data.filter(set => set.set_type === 'core' || set.set_type === 'expansion').map(set => [set.name, set.code]);
        setSetCodes(setArray);
      } catch (error) {
        console.error(error);
      }
    }

    getSets();
  }, []);


  const handleChange = (event) => {
    setSelectedSet(event.target.value);
    setSelectedSetCode(setCodes[event.target.selectedIndex - 1][1]);
  }

  const handleSubmit = () => {
    if (selectedSetCode) {
      props.onStartOpen(selectedSetCode, selectedSet);
      setIsShowingClose(true);
    } else {
      alert('Please select a set');
    }
  }
  
  const handleClose = () => {
    if (selectedSetCode) {
      props.onClosePack();
      setIsShowingClose(false);
    } else {
      alert('Please select a set');
    }
  }
  
  return (
    <div className="Buttons">
        {isShowingClose ? (<button type="submit" className="mainButtons" onClick={handleClose}>Clear</button>) :
        (<div className='prePackCSS'>
          <button type="submit" className="mainButtons" onClick={handleSubmit}>Open a Pack!</button>
          <label >
          Select a Set:
            <select value={selectedSet} onChange={handleChange}>
              <option value="">--Select a set--</option>
              {setCodes.map((set, index) => (
                <option key={index} value={set[0]}>{set[0]}</option>
              ))}
            </select>
        </label>
        </div>)}
    </div>
  );
  
}

export default SetSelection;
