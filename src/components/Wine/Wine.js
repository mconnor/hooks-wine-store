// @flow

import * as React from "react";
import Ratings from 'react-ratings-declarative';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import styles from "./Wine.module.css";


type Props = {
    id: string,
    name: string,
    vintage: number,
    vineyard: string,
    type: string,
    region: string,
    unitsSold: number,
    averageRating: number,
    highSeller: boolean, 
    onLearnMore: Function,
}

const Wine = (props: Props)  => {
    const { id, name, vintage, vineyard, type, region, unitsSold, averageRating, highSeller, onLearnMore} = { ...props };

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
                        <div className={styles.rating}>
                            {(averageRating !== -1) ? 
                                <Ratings
                                rating={averageRating}
                                widgetDimensions="20px"
                                widgetSpacings="10px"
                                typeOfWidget = "Star"
                                >
                                    <Ratings.Widget widgetRatedColor="yellow"/>
                                    <Ratings.Widget widgetRatedColor="yellow" />
                                    <Ratings.Widget widgetRatedColor="yellow" />
                                    <Ratings.Widget widgetRatedColor="yellow" />
                                    <Ratings.Widget widgetRatedColor="yellow" />
                                </Ratings> 
                            : 
                            <span>(no ratings yet)</span> 
                            }
                            <span className={styles.unitSold}>({unitsSold})</span>
                            <Button active size="sm" onClick={()=> onLearnMore(id)}>more info</Button>
                        </div>
                    </div>
            </Card.Body>
      </Card>
    )
}



export default Wine

