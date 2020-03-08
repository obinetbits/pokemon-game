import React, { useEffect, useState, useCallback } from 'react';
import Pokedex from '../Pokedex/pokedex';
import axios from 'axios';
import { uuid } from 'uuidv4';

const pokeDataFallback = [
	{ uniqueId: 1, image_id: 4, name: 'Charmander', type: 'fire', base_experience: 62 },
	{ uniqueId: 2, image_id: 7, name: 'Squirtle', type: 'water', base_experience: 63 },
	{ uniqueId: 3, image_id: 11, name: 'Metapod', type: 'bug', base_experience: 72 },
	{ uniqueId: 4, image_id: 25, name: 'Pikachu', type: 'electric', base_experience: 112 },
	{ uniqueId: 9, image_id: 4, name: 'Charmander', type: 'fire', base_experience: 62 },
	{ uniqueId: 10, image_id: 7, name: 'Squirtle', type: 'water', base_experience: 63 },
	{ uniqueId: 11, image_id: 11, name: 'Metapod', type: 'bug', base_experience: 72 },
	{ uniqueId: 13, image_id: 25, name: 'Pikachu', type: 'electric', base_experience: 112 }
];
const Pokegame = () => {
	const [ pokeData, setPokeData ] = useState([]);
	/**
     * Shuffles array in place. ES6 version
     * @param {Array} a items An array containing the items.
     */
	const shuffle = (a) => {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[ a[i], a[j] ] = [ a[j], a[i] ];
		}
		return a;
	};

	const number = 5;

	useEffect(
		() => {
			async function getPokeData() {
				try {
					const response = await axios.get(
						`https://pokeapi.co/api/v2/pokemon?offset=${number}&limit=${number}`
					);
					const pokemonDetail = response.data.results.map(({ url, name }) => ({
						uniqueId: uuid(),
						image_id: parseInt(url.replace('https://pokeapi.co/api/v2/pokemon/', '')),
						name: name,
						type: 'unknown',
						base_experience: 'unknown'
					}));
					const pokemonDetailCopy = response.data.results.map(({ url, name }) => ({
						uniqueId: uuid(),
						image_id: parseInt(url.replace('https://pokeapi.co/api/v2/pokemon/', '')),
						name: name,
						type: 'unknown',
						base_experience: 'unknown'
					}));
					setPokeData(shuffle(pokemonDetail.concat(pokemonDetailCopy)));
				} catch (error) {
					setPokeData(shuffle(pokeDataFallback));
				}
			}
			getPokeData();
		},
		[ number ]
	);
	const handleReset = useCallback(() => {
		setPokeData((prevState) => shuffle(prevState));
	}, []);
	return <Pokedex pokemon={pokeData} reset={handleReset} />;
};

export default Pokegame;
