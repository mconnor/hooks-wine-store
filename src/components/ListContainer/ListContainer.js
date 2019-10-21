// @flow

import * as React from "react";
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
    console.log('LISTCONTAINER')

  const [mostSold, setMostSold] = React.useState();

  const { wines, onLearnMore } = { ...props };
 
  const getAverage = (arr: Array<{'stars': number}>) => {
    const len = arr.length;
    if (len === 0) {
      return -1;
    }
    let initialValue = 0;
    const total = arr
      .map(wine => wine.stars)
      .reduce((totalStars, curr) => totalStars + curr, initialValue);
    const avg =total / len;
      //console.log('avg', avg)
    return avg;
  };

  const findMostUnitsSold = (arr: Array<WineProp>) => {
    console.log('findMostUnitsSold of ', arr)
    const maxCallback = (acc, cur) => Math.max(acc, cur);
    console.log(maxCallback)
    //returns a number ... 370
    return arr.map(wine => wine.unitsSold).reduce(maxCallback);

  };

  //
//   setMostSold(findMostUnitsSold(wines));

  React.useEffect(() => {
    setMostSold(findMostUnitsSold(wines))
  }, [wines])


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
