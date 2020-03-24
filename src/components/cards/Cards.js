import React from 'react';
import PlansData from './PlansData';

const Cards = props => {

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
  const cards = props.plans.map((e, i) => (
    <div className='card' key={i}>
      <div className='pop'>{PlansData[e.Name].Pop}</div>
      <div className='name'>{PlansData[e.Name].Title}</div>
      <div className='pricing'>
        {currency}{' '}
        <span className='amount'>
          {(e.Pricing[props.cycles] / props.cycles / 100).toFixed(2)}         
        </span>
        /mo
      </div>
      <div className='billed'>
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
