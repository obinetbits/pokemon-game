import React, { Component } from 'react';
import Pokedex from '../Pokedex/pokedex';

class Pokegame extends Component {
	static defaultProps = {
		pokemon: [
			{ uniqueId: 1, image_id: 4, name: 'Charmander', type: 'fire', base_experience: 62 },
			{ uniqueId: 2, image_id: 7, name: 'Squirtle', type: 'water', base_experience: 63 },
			{ uniqueId: 3, image_id: 11, name: 'Metapod', type: 'bug', base_experience: 72 },
			{ uniqueId: 4, image_id: 25, name: 'Pikachu', type: 'electric', base_experience: 112 },
			{ uniqueId: 9, image_id: 4, name: 'Charmander', type: 'fire', base_experience: 62 },
			{ uniqueId: 10, image_id: 7, name: 'Squirtle', type: 'water', base_experience: 63 },
			{ uniqueId: 11, image_id: 11, name: 'Metapod', type: 'bug', base_experience: 72 },
			{ uniqueId: 13, image_id: 25, name: 'Pikachu', type: 'electric', base_experience: 112 }
		]
    };
    /**
     * Shuffles array in place. ES6 version
     * @param {Array} a items An array containing the items.
     */
    shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
	render() {
		return (
			<div>
				<Pokedex pokemon={this.shuffle(this.props.pokemon)} />
			</div>
		);
	}
}

export default Pokegame;
