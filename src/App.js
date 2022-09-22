import './App.css';
import { useState, useEffect } from "react";

const URL = 'https://api.apilayer.com/exchangerates_data/latest';
const API_KEY = 'rGEXR2U27MlbtSNXC3NOHJcdXfdcsjqM';

function App() {
  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [rate, setRate] = useState('Rate is loading, please wait');

  async function getRate() {
    try {
      var myHeaders = new Headers();
      myHeaders.append("apikey", API_KEY);

      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };
      const response = await fetch(URL, requestOptions);

      if (response.ok) {
        const json = await response.json();
        console.log(json);

        setRate(json.rates.GBP);

      } else {
        alert('Error');
        console.log(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getRate();
  }, []);

  function convert(e) {
    e.preventDefault();
    getRate();
    setGbp(eur * rate);
  }


  return (
    <>
      <form onSubmit={convert}>
        <div>
          <label htmlFor="">Euros</label>
          <input type="number" value={eur} onChange={e => setEur(e.target.value)} />
          <output>{rate}</output>
          <button onClick={getRate()}>Update Rate</button>
        </div>
        <div>
          <label htmlFor="">Pounds</label>
          <output>{gbp}</output>
          <button onClick={convert}>Convert</button>

        </div>
      </form>
    </>
  );
}

export default App;