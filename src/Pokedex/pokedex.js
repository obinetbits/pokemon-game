import React, { useEffect, useState } from 'react';
import './pokedex.css';
import Pokecard from '../Pokecard/pokecard';

const Pokedex = ({ pokemon }) => {
	const initialState = {
		matchedCards: {},
		currentUniqueId: '',
		prevUniqueId: '',
		currentName: '',
		prevName: ''
	};
	const [ cardStatus, setCardStatus ] = useState(initialState);

	useEffect(
		() => {
			if (cardStatus.prevName === cardStatus.currentName) {
				const matchedCard = {
					[cardStatus.currentName]: true
				};
				setCardStatus({
					...cardStatus,
					matchedCards: Object.assign(cardStatus.matchedCards, matchedCard)
				});
			}
		},
		[ cardStatus ]
	);

	const onCardflipHandler = ({ uniqueId, name }) => {
		setCardStatus({
			...cardStatus,
			currentUniqueId: uniqueId,
			prevUniqueId: cardStatus.currentUniqueId,
			currentName: name,
			prevName: cardStatus.currentName
		});
	};

	return (
		<div>
			<h1 className="Pokedex-winner">Pokemon</h1>
			<p>Memory Game</p>
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
						flipCardAction={cardStatus.currentUniqueId === p.uniqueId}
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
