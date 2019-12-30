/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import App from "./App"


afterEach(() => {
    cleanup();
    console.error.mockClear();
  });
console.error = jest.fn();

  

const store = {
    title: "my store"
}

const origJsonData = 
    {
        "wines": [{
        "id": "f2ca57a5-d9da-4808-9164-8d6e0da0aef5",
        "name": "Apothic Red",
        "vintage": "2015",
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
            "vintage": "2015",
            "vineyard": "Carson Ridge",
            "type": "Cabernet",
            "region": "California",
            "unitsSold": 19,
            "ratings": []
            }, {
            "id": "b760ebd3-103c-4bd6-b3f4-1f50c400c89c",
            "name": "Radius Merlot",
            "vintage": "2014",
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
    }
;

const _title = 'fake title'

test('<App /> with just title', async () => {
    const {debug, getByTitle } = render(<App title={_title}/>);
    expect(document.title).toBe(_title);
    expect(console.error).not.toHaveBeenCalled();
});




test('<App /> with url and title', async () => {

   fetch.mockResponseOnce(JSON.stringify(origJsonData));
    const {debug, getByTestId, queryByTestId, queryAllByTestId} = render(
        <App 
            title={_title}
            url="www.fakeUrl.com">
        </App>
    );

    expect(getByTestId('loading')).toBeTruthy();
   await waitForElement(() => getByTestId('wines-container') );
    expect(queryByTestId('loading')).toBeFalsy();
    expect(getByTestId('wines-container')).toBeTruthy();

    expect(queryAllByTestId('wine-container').length).toBe(origJsonData.wines.length);

    debug();
    // expect(getByTitle('vintage-selector').childElementCount).toBe(origJsonData.wines.length);
   expect(console.error).not.toHaveBeenCalled();
  
});
