// @flow

import * as React from "react";
import Wine from "../Wine/Wine";
import styles from "./ListContainer.module.css";

type RatingProp = {
  stars: number
};

type WineProps = {
  id: string,
  name: string,
  vintage: number,
  vineyard: string,
  type: string,
  region: string,
  unitsSold: number,
  highSeller: boolean,
  onLearnMore: Function,
  ratings: $ReadOnlyArray<RatingProp>
};
type Props = {
  wines: $ReadOnlyArray<WineProps>,
  onLearnMore: Function,
  showingAllWines: boolean
};

function ListContainer(props: Props) {
  const [mostSold, setMostSold] = React.useState();
  const { wines, onLearnMore, showingAllWines } = { ...props };
  
  

  const findMostUnitsSold = (arr: $ReadOnlyArray<WineProps>): number => {
    const maxCallback = (acc, cur) => Math.max(acc, cur);
    return arr.map(wine => wine.unitsSold).reduce(maxCallback);
  };


  React.useEffect(() => {
    setMostSold(findMostUnitsSold(wines));
  }, [wines]);

  return (
    <section>
      {wines.map((wine, index) => (
        <Wine
        fadeDelay={index*500}
          key={wine.id}
          id={wine.id}
          name={wine.name}
          vintage={wine.vintage}
          vineyard={wine.vineyard}
          type={wine.type}
          region={wine.region}
          unitsSold={wine.unitsSold}
          ratings={wine.ratings}
          highSeller={wine.unitsSold === mostSold}
          onLearnMore={onLearnMore}
          showingAllWines={showingAllWines}
        />
      ))}
    </section>
  );
}

export default ListContainer;
