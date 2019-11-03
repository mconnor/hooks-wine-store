import React from 'react';
import { render, cleanup, waitForElement, getByTestId } from '@testing-library/react';

import Background from './components/Background/Background';
import Header from './components/Header/Header';
import ListContainer from './components/ListContainer/ListContainer';
import Selector from './components/Selector/Selector';

afterEach(() => {
    cleanup();
    console.error.mockClear();
  });
  
  console.error = jest.fn();

  

const store = {
    title: "my store"
}

const _props = 
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


const wineBySelectedVintage = 
    {
        "wines": [{
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


test('<Selector /><ListContainer />', () => {
    const { debug, getByTestId, container } = render(
        <Header name={store.title}></Header>
    )
} );






test('<ListContainer /> with wines', async () => {

    fetch.mockResponseOnce(JSON.stringify(_props.wines));
// console.log(wineBySelectedVintage);


    const {debug, getByTitle } = render(
        <ListContainer 
            wines={wineBySelectedVintage.wines}
            showingAllWines={true}>
        </ListContainer>
    );
    await waitForElement(() => getByTitle('vintage-selector') );
    expect(console.error).not.toHaveBeenCalled();
    expect(getByTitle('vintage-selector').childElementCount).toBe(3);
   // expect(getByTestId('name-container')[0].textContent).toBe('Apothic Red')
    debug();
})




        // <div>
        //    <Header>{title}</Header>
        //    <Background /> 
        //     <Selector />
        //     <ListContainer /> 
        // </div>
       // );