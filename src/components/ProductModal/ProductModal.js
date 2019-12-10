// @flow

import * as React from "react";
import useGetAverage from "../../hooks/useGetAverage";
import Ratings from "react-ratings-declarative";
import { animated } from 'react-spring';
import styles from "./ProductModal.module.css";

type WineProp = {
  id: string,
  name: string,
  vintage: number,
  vineyard: string,
  type: string,
  region: string,
  unitsSold: number,
  highSeller: boolean,
  onLearnMore: Function,
  ratings: $ReadOnlyArray<{
    stars: number
  }>
};

type Props = {
  wine: ?WineProp,
  handleCloseModal: Function
};

function ProductModal(props: Props) {
   
  const { name, region, vintage, ratings, type, unitsSold } = { ...props.wine };
  const { handleCloseModal, animationStyle } = { ...props };
  const [avg, setAvg] = useGetAverage(ratings, "stars");

  return (
    <animated.div style={animationStyle} className={styles.modal}>
        <div className={styles.modalCard}>
      <div className={styles.modalHeader} data-testid="close-btn">
        <span className={styles.headline}>{name}</span>
        <button data-testid="close-btn" onClick={handleCloseModal}>x</button>
      </div>
      
      <div className={styles.body}>
        <p data-testid="vintage-container">vintage: {vintage}</p>
        <p data-testid="type-container">type: {type}</p>
        <p data-testid="region-container">region: {region}</p>
        <p data-testid="units-container">units sold: {unitsSold}</p>
      

        {(avg > 0) ? (
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
    </animated.div>
  );
}




export default ProductModal;
