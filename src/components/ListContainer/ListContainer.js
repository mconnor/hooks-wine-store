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
  }>,
  highSeller: boolean
};
type WinesArrayProps = {
  wines: Array<WineProp>,
  onLearnMore: Function,
  showingAllWines: boolean
};

function ListContainer(props: WinesArrayProps) {

  const [mostSold, setMostSold] = React.useState();
  const { wines, onLearnMore, showingAllWines } = { ...props };


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
          ratings = {wine.ratings}
          highSeller={wine.unitsSold === mostSold}
            onLearnMore={onLearnMore}
            showingAllWines = {showingAllWines}
        />
      ))}
    </section>
  );
}



export default ListContainer;
