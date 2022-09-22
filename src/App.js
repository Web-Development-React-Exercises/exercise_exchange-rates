import './App.css';
import { useState, useEffect } from "react";

const URL = '911b3806a1cbe40dacf96b52c007b3f3';
const API_KEY = '911b3806a1cbe40dacf96b52c007b3f3';



function App() {
  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [rate, setRate] = useState(0);

  useEffect(()=> {
    setRate(23)
  }
  ,[]);

  async function convert(e) {
    e.preventDefault();
    try {
      const response = await fetch(URL + API_KEY)
      if (response.ok) {
        const json = await response.json();
        console.log(response)
        //setRate(json.rates.GBP);

        setGbp(eur * rate);
      } else {
        alert('Error');
        console.log(response);
      }
    } catch (e) {
      alert(e);
    }
  }


  return (
    <div id='container'>
      <form onSubmit={convert()}>
        <div>
          <label htmlFor="">Euros</label>
          <input type="number" value={eur} onChange={e => setEur(e.target.value)} />
          <output>{rate}</output>
        </div>
        <div>
          <label htmlFor="">Pounds</label>
          <output>{gbp}</output>
          <button onClick={convert()}>Convert</button>

        </div>
      </form>
    </div>
  );
}

export default App;
