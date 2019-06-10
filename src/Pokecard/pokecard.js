import React, { Component } from 'react';
import './pokecard.css';

// const POKE_API = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const POKE_API = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';

const padToThree = (num) => (num <= 999 ? `00${num}`.slice(-3) : num);

class Pokecard extends Component {
    handleFlipCard = () => {
		this.props.flipCard({uniqueId: this.props.uniqueId, name: this.props.name});
    }
	render() {
        const imgSrc = `${POKE_API}${padToThree(this.props.imageId)}.png`;
        const stayOpen = this.props.isCurrentName && this.props.isPrevName;
		const flipCard = (this.props.flipCardAction || stayOpen || this.props.isMatched) ? ' flip-card-action': '';
		return (
			<div className={`flip-card${flipCard}`} onClick={this.handleFlipCard}>
				<div className="flip-card-inner">
					<div className="Pokecard-front" >
						<h1 className="Pokecard-title">Guess</h1>
						<div className="Pokecard-image">
							<h1>Pokemon Card</h1>
						</div>
						<div className="Pokecard-data">Exp: {this.props.exp} </div>
						<div className="Pokecard-data">Type: {this.props.type} </div>
					</div>
					<div className="Pokecard-back">
						<h1 className="Pokecard-title">{this.props.name}</h1>
						<div className="Pokecard-image">
							<img src={imgSrc} alt={this.props.name} />
						</div>
						<div className="Pokecard-data">Exp: {this.props.exp} </div>
						<div className="Pokecard-data">Type: {this.props.type} </div>
					</div>
				</div>
			</div>
		);
	}
}
export default Pokecard;
