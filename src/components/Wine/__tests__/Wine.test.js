import React from 'react';
import { render, cleanup, waitForElement, getByTestId } from '@testing-library/react';

import Wine from '../Wine';

// global.fetch = require('jest-fetch-mock');

console.error = jest.fn();

const wineProps = 
{
    "id": "f2ca57a5-d9da-4808-9164-8d6e0da0aef5",
    "name": "Apothic Red",
    "vintage": "2015",
    "vineyard": "Apothic",
    "type": "Red Blend",
    region: "California",
    "unitsSold": 51,
    "ratings": [{
      "stars": 5
    }, {
      "stars": 3
    }]
  }
  ;

  test('<Wine /> with wine props', async () => {
    const { debug, getByTestId, container } = render(
        <Wine 
            name={`${wineProps.name}`} 
            vintage={`${wineProps.vintage}`}
            region={`${wineProps.region}`}/>
        );
   expect(getByTestId('name-container').textContent).toBe(wineProps.name);
   expect(getByTestId('vintage-container').textContent).toBe(wineProps.vintage);

   expect(getByTestId('region-container').textContent).toBe(wineProps.region);
   
   // expect(container.firstChild).toMatchSnapshot()
    debug();

  });