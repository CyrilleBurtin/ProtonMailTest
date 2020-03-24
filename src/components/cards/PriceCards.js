import React, { useState, useEffect } from 'react';

import Cards from './Cards';

const PriceCards = () => {
  // variables
  const [rowPlansData, setRowPlansData] = useState([]);
  const [cleanPlansData, setCleanPlansData] = useState([]);
  const [cycle, setCycle] = useState(1);
  const [currency, setCurrency] = useState('EUR');

  // fetch data
  const requestPlans = async (currency = 'USD') => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json;charset=utf-8');
    myHeaders.append('x-pm-appversion', 'Other');
    myHeaders.append('x-pm-apiversion', '3');
    myHeaders.append('Accept', 'application/vnd.protonmail.v1+json');

    const myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    };
    console.log(currency);
    fetch(`https://api.protonmail.ch/payments/plans?${currency}`, myInit)
      .then(response => response.json())
      .then(data => setRowPlansData(data.Plans))
      .catch(error => console.log(error));
  };

  // handle plans duration selection
  const handleCycle = e => {
    setCycle(parseInt(e.target.value));
  };

  // handle currency selection
  const handleCurrency = e => {
    setCurrency(e.target.value);
  };

  // fetch new data on currency change
  useEffect(() => {
    requestPlans(currency);
  }, [currency]);

  // clean fetched data to keep only usefull data
  useEffect(() => {
    let pFilter = rowPlansData.filter(
      e =>
        e.Name === 'plus' || e.Name === 'professional' || e.Name === 'visionary'
    );
    // add the free subscription
    pFilter.unshift({ Name: 'free', Pricing: { 1: 0, 12: 0, 24: 0 } });
    setCleanPlansData(pFilter);
  }, [rowPlansData]);

  return (
    <div className='container'>
      
      <form>
        <div className='selectors'>
          <select value={cycle} onChange={handleCycle}>
            <option value='1'>Monthly</option>
            <option value='12'>Annualy</option>
            <option value='24'>2 years</option>
          </select>

          <select value={currency} onChange={handleCurrency}>
            <option value='EUR'>€ EUR</option>
            <option value='CHF'>₣ CHF</option>
            <option value='USD'>$ USD</option>
          </select>
        </div>
      </form>

      <Cards cycles={cycle} currency={currency} plans={cleanPlansData} />

    </div>
  );
};

export default PriceCards;
