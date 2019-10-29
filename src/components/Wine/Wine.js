// @flow

import * as React from "react";
import Ratings from "react-ratings-declarative";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import useGetAverage from "../../hooks/useGetAverage";
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
    showingAllWines
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
    <Card>
      <Card.Body className={styles.cardBody}>
        <div className={styles.col1}></div>
        <div className={styles.col2}>
          <div className={styles.headline}>
            {name},&nbsp;{vintage}
          </div>

          <p className={styles.subHeadline}>
            {region} | {vineyard} | {type}
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
              <span>(no ratings yet)</span>
            )}
          </div>
        </div>
        <div className={styles.col3}>
          {badgeJxs()}

          <button className={styles.buttonFont}
            
            variant="secondary"
            size="sm"
            onClick={() => onLearnMore(id)}
          >
            click for more info
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Wine;
