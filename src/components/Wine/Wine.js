// @flow

import * as React from "react";
import Ratings from "react-ratings-declarative";
import Badge from "react-bootstrap/Badge";
import useGetAverage from "../../hooks/useGetAverage";
import { animated } from 'react-spring';
import styles from "./Wine.module.css";

type Props = {
  id: string,
  name: string,
  vintage: number,
  vineyard: string,
  type: string,
  region: string,
  unitsSold: number,
  ratings: $ReadOnlyArray<{
    stars: number
  }>,

  highSeller: boolean,
  onLearnMore: Function,
  showingAllWines: boolean
};

const Wine = (props: Props) => {
  const {
    id,
    name,
    vintage,
    vineyard,
    type,
    region,
    unitsSold,
    ratings,
    highSeller,
    onLearnMore,
    showingAllWines,
    animStyle
  } = { ...props };

  const [avg, setAvg] = useGetAverage(ratings, "stars");
  const badgeJxs = () => {
    if (highSeller && showingAllWines) {
      return returnJsx("High Seller");
    } else if (highSeller) {
      return returnJsx("Vintage high seller");
    } else {
      return null;
    }
  };

  const returnJsx = _copy => {
    return (
      <div className={styles.myBadge}>
        <Badge variant="secondary">{_copy}</Badge>
      </div>
    );
  };


  return (
    
      <animated.div style={animStyle} className={styles.cardBody} data-testid='wine-container'>
        <div className={styles.col1}></div>
        <div className={styles.col2}>
          <div className={styles.headline}>
            <span data-testid="name-container">
                {name}
            </span>
            <span data-testid="vintage-container">
                {vintage}
            </span>
          </div>

          <p className={styles.subHeadline} data-testid="subheadline-container">
            <span data-testid="region-container">{region}</span> | 
            <span data-testid="vineyard-container">{vineyard}</span> | 
            <span data-testid="type-container">{type}</span>
          </p>

          <div>
            {avg > 0 ? (
              <Ratings
                rating={avg}
                widgetDimensions="20px"
                widgetSpacings="10px"
                typeOfWidget="Star"
              >
                <Ratings.Widget widgetRatedColor="red" />
                <Ratings.Widget widgetRatedColor="red" />
                <Ratings.Widget widgetRatedColor="red" />
                <Ratings.Widget widgetRatedColor="red" />
                <Ratings.Widget widgetRatedColor="red" />
              </Ratings>
            ) : (
              <span className={styles.noRating}>(no ratings yet)</span>
            )}
          </div>
        </div>
        <div className={styles.col3}>
          {badgeJxs()}

          <button
            data-testid="learn-more-btn"
            className={styles.buttonFont}
            variant="secondary"
            size="sm"
            onClick={() => onLearnMore(id)}
          >
            click for more info
          </button>
        </div>
      </animated.div>
  );
};

export default Wine;
