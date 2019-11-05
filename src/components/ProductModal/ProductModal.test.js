import React from 'react';
import { render, cleanup, getByTestId} from "@testing-library/react"
import ProductModal from './ProductModal';


afterEach(() => {
    cleanup();
    console.error.mockClear();
  });

console.error = jest.fn();


test('<ProductModal />', () => {
    render(<ProductModal />);
    // TODO - why are we not getting error here? How to make props be necessary within this flow enviorment
    expect(console.error).not.toHaveBeenCalled(); //
  });
  

  const featuredWine = {
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



test('<ProductModal wine={featuredWine} />', () => {
    const {debug, getByTestId} = render( <ProductModal wine={featuredWine} />);
   
    expect(getByTestId('vintage-container').textContent).toBe(`vintage: ${featuredWine.vintage}`);
    expect(getByTestId('region-container').textContent).toBe(`region: ${featuredWine.region}`);
    expect(getByTestId('units-container').textContent).toBe(`units sold: ${featuredWine.unitsSold}`);
    expect(getByTestId('type-container').textContent).toBe(`type: ${featuredWine.type}`);

    expect(console.error).not.toHaveBeenCalled();
    debug()
  });