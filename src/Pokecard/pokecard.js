import React, { useCallback } from 'react';
import './pokecard.css';

// const POKE_API = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const POKE_API = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';

const padToThree = (num) => (num <= 999 ? `00${num}`.slice(-3) : num);

const Pokecard = ({
	flipCardAction,
	flipCard,
	uniqueId,
	name,
	imageId,
	isCurrentName,
	isPrevName,
	isMatched,
	exp,
	type
}) => {
	const handleFlipCard = useCallback(
		() => {
			if (flipCardAction) return;
			flipCard({ uniqueId, name });
		},
		[ flipCardAction, flipCard, uniqueId, name ]
	);

	const imgSrc = `${POKE_API}${padToThree(imageId)}.png`;
	const stayOpen = isCurrentName && isPrevName;
	const showCard = flipCardAction || stayOpen || isMatched ? ' flip-card-action' : '';
	return (
		<div className={`flip-card${showCard}`}>
			<div className="flip-card-inner">
				<div className="Pokecard-front" onClick={handleFlipCard}>
					<h1 className="Pokecard-title">Guess</h1>
					<div className="Pokecard-image">
						<h1>Pokemon Card</h1>
					</div>
					<div className="Pokecard-data">
						<span role="img" aria-label="Monser">
							👾👾👾
						</span>
					</div>
					<div className="Pokecard-data">
						<span role="img" aria-label="Diamonds">
							♦️♦️️♦️♦️
						</span>
					</div>
				</div>
				<div className="Pokecard-back">
					{flipCard ? (
						<React.Fragment>
							<h1 className="Pokecard-title">{name}</h1>
							<div className="Pokecard-image">
								<img src={imgSrc} alt={name} />
							</div>
							<div className="Pokecard-data">Exp: {exp} </div>
							<div className="Pokecard-data">Type: {type} </div>
						</React.Fragment>
					) : (
						<React.Fragment>
							<h1 className="Pokecard-title">Dummy</h1>
							<div className="Pokecard-image">
								<img src={imgSrc} alt="Demo" />
							</div>
							<div className="Pokecard-data">Dummy</div>
							<div className="Pokecard-data">Dummy</div>
						</React.Fragment>
					)}
				</div>
			</div>
		</div>
	);
};
export default Pokecard;
