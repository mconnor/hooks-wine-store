// @flow

import * as React from "react";
import Ratings from 'react-ratings-declarative';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import useGetAverage from '../../hooks/useGetAverage'
import styles from "./Wine.module.css";


type Props = {
    id: string,
    name: string,
    vintage: number,
    vineyard: string,
    type: string,
    region: string,
    unitsSold: number,
    highSeller: boolean, 
    onLearnMore: Function,
    ratings: Array<{
        stars: number
      }>,
      showingAllWines: boolean
}



const Wine = (props: Props)  => {
    const { id, name, vintage, vineyard, type, region, unitsSold, ratings, highSeller, onLearnMore, showingAllWines} = { ...props };
   // const avg = useGetAverage(ratings);
    const [avg, setAvg] = useGetAverage(ratings);
    function badgeJxs() {
        if (highSeller && showingAllWines) {
           return (<div className={styles.myBadge}><Badge variant="secondary">High Seller</Badge></div>)
        } else if (highSeller) {
            return   (<div className={styles.myBadge}><Badge variant="secondary">Vintage high seller</Badge></div>)
        } else {
            return null;
        }
   }

    return (
        <Card>
            <Card.Body className={styles.cardBody} >
            <div className={styles.col1}>
            </div>
                <div className={styles.col2}>
                    <div className={styles.headline}>
                        <div>{name},&nbsp;{vintage}</div>
                        
                        </div>
                        <p className={styles.subheadline}>{region}, {vineyard} - {type}</p>
                        {badgeJxs()}  
                        <div className={styles.rating}>
                            {(avg !== -1) ? 
                                <Ratings
                                    rating={avg}
                                    widgetDimensions="20px"
                                    widgetSpacings="10px"
                                    typeOfWidget = "Star"
                                >
                                    <Ratings.Widget widgetRatedColor="red"/>
                                    <Ratings.Widget widgetRatedColor="red" />
                                    <Ratings.Widget widgetRatedColor="red" />
                                    <Ratings.Widget widgetRatedColor="red" />
                                    <Ratings.Widget widgetRatedColor="red" />
                                </Ratings> 
                            : 
                            <span>(no ratings yet)</span> 
                            }
                            <span className={styles.unitSold}>({unitsSold})</span>
                            <Button className={styles.margin4top} active size="sm" onClick={()=> onLearnMore(id)}>more info</Button>
                        </div>
                    </div>
            </Card.Body>
      </Card>
    )
}



export default Wine

