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
	ratings: $ReadOnlyArray<RatingProp>
};
type Props = {
	wines: $ReadOnlyArray<WineProps>,
	onLearnMore: (id: string) => void,
    showingAllWines: boolean,
    highSeller: boolean,
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
