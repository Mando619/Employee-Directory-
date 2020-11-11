import React, { Component } from "react";
import SearchForm from "./SearchForm";
import DataTable from "../components/DataTable";
import API from "../utils/API";
import Header from "./Header";


class SearchResultContainer extends Component {
  state = {
    search: "",
    results: []
  };

//  When this component mounts, search the Giphy API for pictures of kittens
  componentDidMount() {
    this.searchEmployees();
  }

  searchEmployees = query => {
    API.search(query)
    .then(res => this.setState({ results: res.data.results }))
      .catch(err => console.log(err));
      
  };

  handleInputChange = event => {
    
   // const search = event.target.search;
    const value = event.target.value;
    this.setState({
      searchEmployees: value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchEmployees(this.state.search);
  };

  render() {
    return (
      <div>
        <Header/>
         <SearchForm
          value={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange} 
         />
        <DataTable results={this.state.results} />
      </div>
    );
  }
}

export default SearchResultContainer;
