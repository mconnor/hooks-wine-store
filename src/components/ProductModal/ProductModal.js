// @flow

import * as React from "react";
import useGetAverage from "../../hooks/useGetAverage";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Ratings from "react-ratings-declarative";
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
  const { handleCloseModal } = { ...props };

  const [avg, setAvg] = useGetAverage(ratings, "stars");

  return (
    <Modal.Dialog>
      <Modal.Header closeButton onClick={handleCloseModal}>
        <Modal.Title className={styles.headline}>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          vintage:  {vintage}
        </p>
        <p>type: {type}</p>
        <p>region: {region}</p>
        <p>units sold: {unitsSold}</p>

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
      </Modal.Body>
    </Modal.Dialog>
  );
}

export default ProductModal;
