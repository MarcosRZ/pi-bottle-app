import logo from './logo.svg';
import './App.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [colorStyle, setColorStyle] = useState("");

  useEffect(() => {
    console.log(`(${red}, ${green}, ${blue})`);
    setColorStyle(`rgb(${Math.round(red * 255 / 1000)},${Math.round(green * 255 / 1000)},${Math.round(blue * 255 / 1000)})`)
    sendColor();
  }, [red, green, blue])

  const redChanged = (e) => {
    setRed(e.target.value);
  }
  const greenChanged = (e) => {
    setGreen(e.target.value);
  }
  const blueChanged = (e) => {
    setBlue(e.target.value);
  }

  const sendColor = () => {

    axios.post('http://192.168.0.215:3000/', { r: red / 1000, g: green / 1000, b: blue / 1000})
      .then(x => console.log(x.data))
    // console.log({ r: red, g: green, b: blue });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="color" style={{backgroundColor: colorStyle}}></div>
        <p>{colorStyle}</p>
        <div className="sliderContainer">
          <input onChange={redChanged} type="range" min="0" max="1000" value={red} className="slider red" id="red" />
          <input onChange={greenChanged} type="range" min="0" max="1000" value={green} className="slider green" id="green" />
          <input onChange={blueChanged} type="range" min="0" max="1000" value={blue} className="slider blue" id="blue" />
        </div>
        <button onClick={sendColor}>Set</button>
      </header>
    </div>
  );
}

export default App;
