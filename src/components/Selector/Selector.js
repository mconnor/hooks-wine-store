// @flow

import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/SplitButton";

type WineProps = {
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

type Props = {
  wines: Array<WineProps>,
  filterByVintage: Function
};

function Selector(props: Props) {

   const { wines, filterByVintage } = { ...props };
  const [chosenVintage, setChosenVintage] = useState(0);


  const uniqueYears = wines
                        .map(wine => wine.vintage)
                        .filter( (year, pos, arr) => (arr.indexOf(year) === pos) )
                        .sort();

  const selectVintage = (eventKey: number) => {
    const _year = parseInt(eventKey, 10);
    setChosenVintage(_year);
    console.log(_year)
    
  };

  useEffect(() => {
      console.log('useEffect');
    filterByVintage(chosenVintage);
  }, []);

  return (
    <SplitButton key="vintage" title="Select a Year" onSelect={selectVintage}>
      {chosenVintage ? (
        <Dropdown.Item onSelect={selectVintage} eventKey={0} key={0}>
          <span>All Vintages</span>
        </Dropdown.Item>
      ) : null}
      {uniqueYears.map(year => (
        <Dropdown.Item onSelect={selectVintage} eventKey={year} key={year}>
          <span>{year}</span>
        </Dropdown.Item>
      ))}
    </SplitButton>
  );
}

export default Selector;
