import React from 'react';
import PlansData from './PlansData';

const Cards = props => {

    //switching currency to set monetary symbole
  let currency = '€';
  switch (props.currency) {
    default:
    case 'EUR':
      currency = '€';
      break;
    case 'USD':
      currency = '$';
      break;
    case 'CHF':
      currency = '₣';
      break;
  }

  // switching cycle duration set set correct wording
  let billed = ''
  switch (props.cycles) {
    default:
    case 1:
      billed = 'per month';
      break;
    case 12:
      billed = 'per year';
      break;
    case 24:
      billed = 'per 2 year'
      break;
  }

  // mapping my all 4 price plans with a custom card template
  const cards = props.plans.map((e, i) => (
    <div className='card' key={i}>
        {/* getting data from PlansData using element (e) properties names */}
      <div className='pop'>{PlansData[e.Name].Pop}</div>
      <div className='name'>{PlansData[e.Name].Title}</div>
      <div className='pricing'>
        {currency}{' '}
        <span className='amount'>
            {/* setting monthly price and limit it to 2 decimals */}
          {(e.Pricing[props.cycles] / props.cycles / 100).toFixed(2)}         
        </span>
        /mo
      </div>
      <div className='billed'>
          {/* showing billing only if price > 0 */}
        {e.Pricing[props.cycles] > 0  &&
          `Billed as ${currency}
        ${(e.Pricing[props.cycles]) / 100} ${billed}`}
      </div>
      <div className='description'>{PlansData[e.Name].Description}</div>
      <div className='advantage'>
        <ul>
          {PlansData[e.Name].Advantages.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
      <button>Select</button>
    </div>
  ));

  return <div className='cards'>{cards}</div>;
};

export default Cards;
