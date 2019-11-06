import React from 'react';
import { render, cleanup, getByTestId, fireEvent} from "@testing-library/react"
import ListContainer from './ListContainer';
import Wine from '../Wine/Wine';
import expectExport from 'expect';

afterEach(() => {
    cleanup();
    console.error.mockClear();
  });

console.error = jest.fn();





const allWines = 
{
    "wines": [
        {
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
            }, {
            "id": "37f345b1-9f96-4eef-860e-24ab6360ebef",
                "name": "Carson Ridge Cabernet Paso Robles",
                "vintage": 2015,
                "vineyard": "Carson Ridge",
                "type": "Cabernet",
                "region": "California",
                "unitsSold": 19,
                "ratings": []
                }, {
                "id": "b760ebd3-103c-4bd6-b3f4-1f50c400c89c",
                "name": "Radius Merlot",
                "vintage": 2014,
                "vineyard": "Radius",
                "type": "Merlot",
                "region": "Washington",
                "unitsSold": 15,
                "ratings": [{
                    "stars": 3
                }, {
                    "stars": 3
                }]
        }
    ]
};

const clickedLearnMore = jest.fn();

test('<ListContainer  />', () => {
    const {debug, getAllByTestId } = render(<ListContainer
                showingAllWines={true}
                wines={allWines.wines}
                onLearnMore={clickedLearnMore}
    />);
    expect(getAllByTestId('wine-container').length).toBe(allWines.wines.length);

    expect(console.error).not.toHaveBeenCalled(); //
  });