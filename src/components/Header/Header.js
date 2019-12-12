// @flow

import * as React from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './Header.module.css';

type Props = {
	name: string
};

function Header(props: Props) {
	const slide = useSpring({
        transform: `translate3d(0, 0, 0)`,
		from: {
            transform: `translate3d(1000px, 0, 0)`
		}
    });
    

	return (
	
			<h1 data-testid="title-container" className={styles.headline}>
				{props.name}
			</h1>

	);
}

export default Header;
