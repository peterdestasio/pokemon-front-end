import React, { Component } from "react";
import "./card.css";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

export class Card extends Component {

    constructor(props)  {
        super(props);
        this.state = {
            name: props.name,
            description: props.description,
            isFavorite: this.isFavorite(props.name)
        };
   }

   isFavorite = (pokemonName) =>{
    const favorites = JSON.parse(localStorage.getItem('fav-pok'));
    if(favorites){
      return favorites.includes(pokemonName);
    }
    return false;    
  }

    handleFavorites = () => {        
        if(this.state.isFavorite){
            this.setState({ isFavorite: false });
            this.removeFavorite();
        } else {
            this.saveFavorite();
            this.setState({ isFavorite: true });
        }

    };

    saveFavorite = () => {
        let newfavorites = [];
        let favorites = JSON.parse(localStorage.getItem('fav-pok'));
        if(!favorites){
            newfavorites.push(this.props.name);
            localStorage.setItem('fav-pok', JSON.stringify(newfavorites));
        } else if (!favorites.includes(this.props.name)){
            favorites.push(this.props.name);
            localStorage.setItem('fav-pok', JSON.stringify(favorites));
        }     
    };

    removeFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem('fav-pok'));
        if(favorites && favorites.includes(this.props.name)){
            const index = favorites.indexOf(this.props.name);
            if (index > -1) {
                favorites.splice(index, 1);
            }
            localStorage.setItem('fav-pok', JSON.stringify(favorites));
        }     
    };

    render() {
        let fav;
        if(this.state.isFavorite) {
            fav = <IoIosHeart className="favourite-icon" fontSize="2em" onClick={this.handleFavorites}></IoIosHeart>;
        } else {
            fav = <IoIosHeartEmpty className="favourite-icon" fontSize="2em" onClick={this.handleFavorites}></IoIosHeartEmpty>;
        }


        return (
            <div className="card-shape">
                <div className="card-header">
                    <h1>{this.state.name}</h1>
                    {fav}
                </div>
                <p>{this.state.description}</p>
            </div>
        );

    }
}