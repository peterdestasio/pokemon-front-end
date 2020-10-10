import React, { Component } from "react";
import "./search.css";
import { IoIosHeartEmpty } from "react-icons/io";

class Search extends Component {
  state = {
    searchValue: '',
    pokemon: { }
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.apiCall(this.state.searchValue);
  };

  handleFavorites = () => {
    localStorage.setItem('favourite', JSON.stringify(this.state.pokemon));
   };

  apiCall = searchInput => {
    var searchUrl = `https://localhost:44340/pokemon/${searchInput}`;
    fetch(searchUrl)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        debugger;
        this.setState({ pokemon: jsonData });
      });
  };

  render() {
    return (
      <div>
        <h1>Pokemon Shakespeare search app</h1>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
        <IoIosHeartEmpty IoIosHeartEmpty onClick={this.handleFavorites}></IoIosHeartEmpty>
        {this.state.pokemon ? (
          <div>
              <div>
                <h1>{this.state.pokemon.name}</h1>
                <p>{this.state.pokemon.description}</p>
              </div>
          </div>
        ) : (
            <p>Try searching for a Pokemon</p>
          )}
          
      </div>
    );

  }

}


export default Search;