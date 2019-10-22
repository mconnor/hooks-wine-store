// @flow

import * as React from "react";

import Header from "./components/Header/Header";
import Background from "./components/Background/Background";
import ListContainer from "./components/ListContainer/ListContainer";
import Selector from "./components/Selector/Selector";
import ProductModal from "./components/ProductModal/ProductModal";
import styles from "./App.module.css";

function App() {
  const [allWines, setAllWines] = React.useState([]);
  const [wineBySelectedVintage, setWineBySelectedVintage] = React.useState([]);
  const [featuredWine, setFeaturedWine] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const fetchWines = async () => {
    console.log("fetchWines");
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
      .sort((a, b) => a.vintage - b.vintage);

    setAllWines(wineCleaned);
    setWineBySelectedVintage(wineCleaned);
  };

  const showModal = (id: string) => {
    const _wine = allWines.find(wine => wine.id === id);
    setFeaturedWine(_wine);
    setModalOpen(true);
    console.log("show modal");
  };

  const onFilterByVintage = (selectedYear: number): void => {
    let arr;
    if (selectedYear === 0) {
      arr = allWines;
    } else {
      arr = allWines.filter(wine => wine.vintage === selectedYear);
    }
    setWineBySelectedVintage(arr);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  React.useEffect(() => {
    fetchWines();
  }, []);

  return (
    <div className={styles.app}>
      <Header name="Fat Lady Wine Store" />
      {modalOpen ? (
        <ProductModal wine={featuredWine} handleCloseModal={handleCloseModal} />
      ) : null}

      <Background />
      {allWines.length < 1 || wineBySelectedVintage.length < 1 ? (
        <h1>Loading</h1>
      ) : modalOpen ? null : (
        <>
          <Selector wines={allWines} filterByVintage={onFilterByVintage} />
          <ListContainer
            showingAllWines={wineBySelectedVintage === allWines}
            wines={wineBySelectedVintage}
            onLearnMore={showModal}
          />
        </>
      )}
    </div>
  );
}

export default App;
