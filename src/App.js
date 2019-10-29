// @flow

import * as React from "react";

import Header from "./components/Header/Header";
import Background from "./components/Background/Background";
import ListContainer from "./components/ListContainer/ListContainer";
import Selector from "./components/Selector/Selector";
import ProductModal from "./components/ProductModal/ProductModal";
import styles from "./App.module.css";

type AppProps = {
  url: string,
  title: string
};

function App(props: AppProps) {
  const [allWines, setAllWines] = React.useState([]);
  const [wineBySelectedVintage, setWineBySelectedVintage] = React.useState([]);
  const [featuredWine, setFeaturedWine] = React.useState();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [fetchError, setFetchError] = React.useState(false);

  const fetchWines = async _url => {
    try {
      const res = await fetch(_url);
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
    } catch (error) {
      setFetchError(true);
    }
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
    fetchWines(props.url);
  }, [props.url]);

  React.useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <div className={styles.app}>
      <Header name={props.title} />
      {modalOpen ? (
        <ProductModal wine={featuredWine} handleCloseModal={handleCloseModal} />
      ) : null}

      <Background />
      {fetchError ? (
        <h1>Error fetching</h1>
      ) : allWines.length < 1 || wineBySelectedVintage.length < 1 ? (
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
