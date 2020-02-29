import React, { Component } from 'react';
import './pokedex.css';
import Pokecard from '../Pokecard/pokecard';

class Pokedex extends Component {
	constructor() {
		super();
		this.state = {
			matchedCards: {},
			currentUniqueId: '',
			prevUniqueId: '',
			currentName: '',
			prevName: ''
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.currentName === this.state.currentName && !this.state.matchedCards[this.state.currentName]) {
			const matchedCard = {
				[this.state.currentName]: true
			};
			this.setState({
				matchedCards: Object.assign(this.state.matchedCards, matchedCard)
			});
		}
	}

	flipCard = ({ uniqueId, name }) => {
		this.setState({
			currentUniqueId: uniqueId,
			prevUniqueId: this.state.currentUniqueId,
			currentName: name,
			prevName: this.state.currentName
		});
	};

	render() {
		return (
			<div>
				<h1 className="Pokedex-winner">Pokemon</h1>
				<p>Memory Game</p>
				<div className="Pokedex-cards">
					{this.props.pokemon.map((p) => (
						<Pokecard
							imageId={p.image_id}
							key={p.uniqueId}
							uniqueId={p.uniqueId}
							name={p.name}
							type={p.type}
							exp={p.base_experience}
							matchedCards={this.state.matchedCards}
							flipCard={this.flipCard}
							flipCardAction={this.state.currentUniqueId === p.uniqueId}
							isCurrentName={this.state.currentName === p.name}
							isPrevName={this.state.prevName === p.name}
							isMatched={this.state.matchedCards[p.name]}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default Pokedex;
