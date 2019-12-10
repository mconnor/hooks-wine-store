// @flow

import * as React from "react";
import { useSpring } from 'react-spring';

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
  
  const [isLoading, setIsLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [featuredWine, setFeaturedWine] = React.useState();



  const showModal = (id: string) => {
    const _wine = allWines.find(wine => wine.id === id);
    setFeaturedWine(_wine);
    setModalOpen(true);
    console.log("show modal");
  };

  const modalAnimation = useSpring({
    transform: modalOpen ? `translate3d(0,0,0) scale(1)` : `translate3d(0,100%,0) scale(0.6)`
});

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
    const fetchWines = async _url => {
        try {
          const res = await fetch(_url);
          const data = await res.json();
    
          const { wines } = { ...data };
    console.log('wines', wines)
          const winesCleaned = wines
            .map(wine => {
              wine.vintage = parseInt(wine.vintage, 10);
              return wine;
            })
            .sort((a, b) => a.vintage - b.vintage);
    
          setAllWines(winesCleaned);
          setWineBySelectedVintage(winesCleaned);
        } catch (error) {
          setFetchError(true);
        }
        setIsLoading(false);
      };
    fetchWines(props.url);
  }, [props.url]);

  React.useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  return (
    <div className={styles.app}>
      <Header 
        data-testid="title-container"
        name={props.title} />
      {modalOpen ? (
        <ProductModal wine={featuredWine} handleCloseModal={handleCloseModal} animationStyle={modalAnimation} />
      ) : null}

      <Background />
      {fetchError ? (
        <h1>Error fetching</h1>
      ) : isLoading ? (
        <h1 data-testid='loading'>Loading</h1>
      ) : modalOpen ? null : (
        <div>
          <Selector wines={allWines} filterByVintage={onFilterByVintage} />
          <ListContainer
            showingAllWines={wineBySelectedVintage === allWines}
            wines={wineBySelectedVintage}
            onLearnMore={showModal}
          />
        </div>
      )}
    </div>
  );
}

export default App;
