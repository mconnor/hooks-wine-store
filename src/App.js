// @flow

import React, { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import Background from "./components/Background/Background";
import ListContainer from "./components/ListContainer/ListContainer";
import Selector from "./components/Selector/Selector";
import styles from "./App.module.css";

function App() {
  const [allWines, setAllWines] = useState([]);
  const [wineBySelectedVintageArray, setVintageWines] = useState([]);

  const fetchWines = async () => {
    const res = await fetch(
      "https://gist.githubusercontent.com/mconnor/9b9f93ad895c695cfdc70ba6857fe6a1/raw/d0871f04fb834cc48e38386ce670ee9c584831af/wine.json"
    );
    const data = await res.json();

    const { wines } = { ...data };

    const wineCleaned = wines
        .map(wine => {
             wine.vintage = parseInt(wine.vintage, 10);
                return wine;
        })
        .sort((a,b) => a.vintage - b.vintage);


    setAllWines(wineCleaned);
    setVintageWines(wineCleaned);
  };

  const showModal = (id: string) => {
    console.log("show modal");
  };

  const onFilterByVintage = (selectedYear: number): void => {
    let arr;
    if (selectedYear === 0) {
      arr = allWines;
    } else {
      arr = allWines.filter(wine => wine.vintage === selectedYear);
    }
    setVintageWines(arr);
  };

  useEffect(() => {
    fetchWines();
  }, []);

  return (
    <div className={styles.app}>
      <Header name="Fat Lady Wine Store" />
      <Background />
      <Selector
        wines={wineBySelectedVintageArray}
        filterByVintage={onFilterByVintage}
      />
      <ListContainer wines={allWines} onLearnMore={showModal} />
    </div>
  );
}

export default App;
