import React, { Component } from "react";
import SearchForm from "./SearchForm";
import DataTable from "../components/DataTable";
import API from "../utils/API";
import Header from "./Header";


class SearchResultContainer extends Component  {
  state = {
    search: "",
    results: [],
    order:"",
    employees:[]
  };

//  When this component mounts, search the Employee API for pictures of kittens
  componentDidMount() {
    this.searchEmployees();
  }

  searchEmployees = query => {
    API.search(query)
    .then(res => {
      this.setState({ results: res.data.results })
      this.setState({ employees: res.data.results})
    })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    // props.employees.filter(employeeRRecord)
    const employees = this.state.employees;
    const search = event.target.search;

    const results = employees.filter(employee => 
    employee.name.first.toLowerCase().indexOf(search.toLowerCase()) > -1)

     this.setState({
       results

     })
    };
  
   employeeSort = () => {
     const employeeFilter = this.state.results;
     if (this.state.order === "asc") {
      const sorted = employeeFilter.sort((sort1, sort2) => (sort1.name.first > sort2.name.first) ? 1 : -1)
      console.log(sorted);
      this.setState({
          results: sorted,
          order: "desc"
      })
  } else {
      const sorted = employeeFilter.sort((sort1, sort2) => (sort1.name.first > sort2.name.first) ? -1 : 1)
      console.log(sorted);
      this.setState({
          results: sorted,
          order: "asc"
      })
  }
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
        <DataTable results={this.state.results} 
         employeeSort= {this.employeeSort}
        />
        
      </div>
    );
  }
}

export default SearchResultContainer;
