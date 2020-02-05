// @flow

import * as React from 'react';
import { useTrail } from 'react-spring';
import Wine from '../Wine/Wine';
import styles from './ListContainer.module.css';

type RatingProp = {
	stars: number
};

type WineProps = {
	id: string,
	name: string,
	vintage: number,
	vineyard: string,
	type: string,
	region: string,
	unitsSold: number,
	highSeller: boolean,
	onLearnMore: (id: string) => void,
	ratings: $ReadOnlyArray<RatingProp>
};
type Props = {
	wines: $ReadOnlyArray<WineProps>,
	onLearnMore: Function,
	showingAllWines: boolean
};

function ListContainer(props: Props) {
	const [ mostSold, setMostSold ] = React.useState();
	const { wines, onLearnMore, showingAllWines } = { ...props };

	const [ trail, set ] = useTrail(wines.length, () => ({
		opacity: 0,
		transform: 'scale(0.5)'
		// config:  { mass: 10, tension: 200, friction: 50 }
	}));

	const findMostUnitsSold = (arr: $ReadOnlyArray<WineProps>): number => {
		const maxCallback = (acc, cur) => Math.max(acc, cur);
		return arr.map((wine) => wine.unitsSold).reduce(maxCallback);
	};

	React.useEffect(
		() => {
			setMostSold(findMostUnitsSold(wines));
		},
		[ wines ]
	);

	set({
		opacity: 1,
		transform: 'scale(1)'
	});
	return (
		<div className={styles.container}>
			{trail.map((animation, index) => (
				<Wine
					animStyle={animation}
                    id={wines[index].id}
                    key={wines[index].id}
					name={wines[index].name}
					vintage={wines[index].vintage}
					vineyard={wines[index].vineyard}
					type={wines[index].type}
					region={wines[index].region}
					unitsSold={wines[index].unitsSold}
					ratings={wines[index].ratings}
					highSeller={wines[index].unitsSold === mostSold}
					onLearnMore={onLearnMore}
					showingAllWines={showingAllWines}
				/>
			))}
		</div>
	);
}

export default ListContainer;

/* 
<animated.div key={key} style={props} />
				<Wine
					key={item.id}
					id={item.id}
					name={item.name}
					vintage={item.vintage}
					vineyard={item.vineyard}
					type={item.type}
					region={item.region}
					unitsSold={item.unitsSold}
					ratings={item.ratings}
					highSeller={item.unitsSold === mostSold}
					onLearnMore={onLearnMore}
					showingAllWines={showingAllWines}
				/>
            </animated.div> */
