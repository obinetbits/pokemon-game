import React, { useEffect, useState, useCallback } from 'react';
import './pokedex.css';
import Pokecard from '../Pokecard/pokecard';

const Pokedex = ({ pokemon, reset }) => {
	const initialState = {
		matchedCards: {},
		currentUniqueId: '',
		prevUniqueId: '',
		currentName: '',
		prevName: '',
		attempts: 0
	};
	const [ cardStatus, setCardStatus ] = useState(initialState);

	useEffect(
		() => {
			if (cardStatus.prevName === cardStatus.currentName) {
				const matchedCard = {
					[cardStatus.currentName]: true
				};
				setCardStatus((prevState) => ({
					...prevState,
					matchedCards: Object.assign(prevState.matchedCards, matchedCard)
				}));
			}
		},
		[ cardStatus.prevName, cardStatus.currentName, cardStatus.matchedCards ]
	);

	const onCardflipHandler = useCallback(({ uniqueId, name }) => {
		setCardStatus((prevState) => ({
			...prevState,
			currentUniqueId: uniqueId,
			prevUniqueId: prevState.currentUniqueId,
			currentName: name,
			prevName: prevState.currentName,
			attempts: prevState.attempts + 1
		}));
	}, []);

	const handleReset = useCallback(
		() => {
			setCardStatus(initialState);
			reset();
		},
		[ reset, initialState ]
	);

	return (
		<div>
			<h1 className="Pokedex-winner">Pokemon</h1>
			<p>Memory Game. Attempts: {cardStatus.attempts}</p>
			<button onClick={handleReset} className="Pokeball">
				Reset
			</button>
			<div className="Pokedex-cards">
				{pokemon.map((p) => (
					<Pokecard
						imageId={p.image_id}
						key={p.uniqueId}
						uniqueId={p.uniqueId}
						name={p.name}
						type={p.type}
						exp={p.base_experience}
						matchedCards={cardStatus.matchedCards}
						flipCard={onCardflipHandler}
						wasJustClickedOn={cardStatus.currentUniqueId === p.uniqueId}
						isCurrentName={cardStatus.currentName === p.name}
						isPrevName={cardStatus.prevName === p.name}
						isMatched={cardStatus.matchedCards[p.name]}
					/>
				))}
			</div>
		</div>
	);
};

export default Pokedex;
