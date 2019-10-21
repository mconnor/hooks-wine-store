// @flow

import React, { useState, useEffect } from "react";
import Wine from "../Wine/Wine";

type WineProp = {
  id: string,
  name: string,
  vintage: number,
  vineyard: string,
  type: string,
  region: string,
  unitsSold: number,
  ratings: Array<{
    stars: number
  }>
};
type WinesArrayProps = {
  wines: Array<WineProp>,
  onLearnMore: Function
};

function ListContainer(props: WinesArrayProps) {
  const [mostSold, setMostSold] = useState();
  const [sortedByYearWines, setSortedByYearWines] = useState();

  const { wines, onLearnMore } = { ...props };
  //setSortedByYearWines(wines.sort((a,b) => a.vintage - b.vintage));

  //const [sortedWines, setSortedWines] = useState([]);

 

//   useEffect(() => {
//     setSortedWines(wines.sort((a,b) => a.vintage - b.vintage));
//   }, []);


  const getAverage = (arr: Array) => {
    const len = arr.length;
    if (len === 0) {
      return -1;
    }
    let initialValue = 0;
    const total = arr
      .map(wine => wine.stars)
      .reduce((totalStars, curr) => totalStars + curr, initialValue);
    return total / len;
  };

  const findMostUnitsSold = (arr: Array) => {
    const maxCallback = (acc, cur) => Math.max(acc, cur);
    return arr.map(wine => wine.unitsSold).reduce(maxCallback);
  };

  //   setMostSold(findMostUnitsSold(wines));

  return (
    <section>
      {wines.map(wine => (
        <Wine
          key={wine.id}
          id={wine.id}
          name={wine.name}
          vintage={wine.vintage}
          vineyard={wine.vineyard}
          type={wine.type}
          region={wine.region}
          unitsSold={wine.unitsSold}
          averageRating={getAverage(wine.ratings)}
          highSeller={wine.unitsSold === mostSold}
            onLearnMore={onLearnMore}
        />
      ))}
    </section>
  );
}



export default ListContainer;
