// @flow

import * as React from "react";
import styles from './Header.module.css'


type Props = {
    name: string,
}


function Header(props: Props) {
    return (
       
            <h1 className={styles.headline}>{props.name}</h1>
       
    )
}

export default  Header;
