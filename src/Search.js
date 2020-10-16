import React, { Component } from "react";
import "./search.css";
import { Card }  from "./components/Card.js";

class Search extends Component {
  state = {
    searchValue: ''
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.setState({ pokemon: null });
    this.apiCall(this.state.searchValue);
  };

  apiCall = searchInput => {
    const searchUrl = `https://localhost:44340/pokemon/${searchInput}`;
    fetch(searchUrl)
      .then(async  response => {
        const jsonData = await response.json();
        if (!response.ok) {
          const error = (jsonData && jsonData.message) || response.statusText;
          return Promise.reject(error);
        } else {
          this.setState({ pokemon: jsonData });
        }        
      }).catch(error => {
        console.error('There was an error!', error);
    });;
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

        {this.state.pokemon ? (
          <Card
          name = {this.state.pokemon.name}
          description = {this.state.pokemon.description}
          />
        ) : (
            <p>Try searching for a Pokemon</p>
          )}

      </div>
    );

  }

}


export default Search;