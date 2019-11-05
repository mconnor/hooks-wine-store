import React from 'react';
import { render, cleanup, getByTestId } from '@testing-library/react';

import Wine from '../Wine';


afterEach(() => {
    cleanup();
    console.error.mockClear();
  });

  console.error = jest.fn();

test('<Wine />', () => {
    render(<Wine />);
    expect(console.error).not.toHaveBeenCalled();
  });



const wineProps = {
    "id": "f2ca57a5-d9da-4808-9164-8d6e0da0aef5",
    "name": "Apothic Red",
    "vintage": 2015,
    "vineyard": "Apothic",
    "type": "Red Blend",
    "region": "California",
    "unitsSold": 51,
    "ratings": [{
        "stars": 5
    }, {
        "stars": 3
    }]
};

test('<Wine /> with wine props', () => {
    const { debug,getByTestId } = render(
        <Wine 
            name = {wineProps.name}
            vintage = {wineProps.vintage}
            region = {
                `${wineProps.region}`
            }
            vineyard = {
                `${wineProps.vineyard}`
            }
            type = {
                `${wineProps.type}`
            }
        />
    );
    expect(getByTestId('name-container').textContent).toBe(wineProps.name);
    expect(getByTestId('vintage-container').textContent).toBe(wineProps.vintage.toString());

    expect(getByTestId('region-container').textContent).toBe(wineProps.region);
    expect(getByTestId('vineyard-container').textContent).toBe(wineProps.vineyard);
    expect(getByTestId('type-container').textContent).toBe(wineProps.type);

    debug();

});