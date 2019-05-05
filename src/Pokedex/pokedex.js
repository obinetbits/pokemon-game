import React, {  Component} from 'react';
import './pokedex.css';
import Pokecard from '../Pokecard/pokecard';

class Pokedex extends Component {
    render() {
        let title;
        if(this.props.isWinner) {
            title = <h1 className="Pokedex-winner">Winning Hand</h1>
        } else {
            title = <h1 className="Pokedex-loser">Losing Hand</h1>
        }
        return (
            <div>
                {title}
                <p>Total Experience: {this.props.exp}</p>
                <div className="Pokedex-cards">
                    {this.props.pokemon.map((p) => (
                        <Pokecard
                            id={p.id}
                            key={p.id}
                            name={p.name}
                            type={p.type}
                            exp={p.base_experience}    
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default Pokedex;