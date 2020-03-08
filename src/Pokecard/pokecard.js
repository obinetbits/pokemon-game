import React, { useCallback } from 'react';
import './pokecard.css';

// https://media1.tenor.com/images/84c5b716f0f747acc57a8176e3e6affd/tenor.gif?itemid=4444793
// https://media1.tenor.com/images/5fa6f43961a2c4e5e08ea014bd958459/tenor.gif?itemid=5964096
// https://media1.tenor.com/images/5fa6f43961a2c4e5e08ea014bd958459/tenor.gif'
// https://media1.tenor.com/images/84c5b716f0f747acc57a8176e3e6affd/tenor.gif

// const POKE_API = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const POKE_API_I = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
const POKE_API_II = 'http://www.pokestadium.com/sprites/xy/'; // animate

const padToThree = (num) => (num <= 999 ? `00${num}`.slice(-3) : num);

const Pokecard = ({
	wasJustClickedOn,
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
			if (wasJustClickedOn) return;
			flipCard({ uniqueId, name });
		},
		[ wasJustClickedOn, flipCard, uniqueId, name ]
	);

	const handleImageError = useCallback((e) => {
		console.log({ e });
		e.target.src = `https://media1.tenor.com/images/5fa6f43961a2c4e5e08ea014bd958459/tenor.gif`;
	}, []);

	// const imgSrc = `${POKE_API_I}${padToThree(imageId)}.png`;
	const imgSrc = `${POKE_API_II}${name}.gif`;
	const stayOpen = isCurrentName && isPrevName;
	const showCard = wasJustClickedOn || stayOpen || isMatched;
	return (
		<div className={`flip-card${showCard ? ' flip-card-action' : ''}`}>
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
					{showCard ? (
						<React.Fragment>
							<h1 className="Pokecard-title">{name}</h1>
							<div className="Pokecard-image">
								<img src={imgSrc} onError={handleImageError} alt={name} />
							</div>
							<div className="Pokecard-data">Exp: {exp} </div>
							<div className="Pokecard-data">Type: {type} </div>
						</React.Fragment>
					) : (
						<React.Fragment>
							<h1 className="Pokecard-title">Dummy</h1>
							<div className="Pokecard-image">
								<h1>Pokemon Card</h1>
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
