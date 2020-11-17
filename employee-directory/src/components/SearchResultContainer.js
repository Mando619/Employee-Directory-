import React, { Component } from "react";
import SearchForm from "./SearchForm";
import DataTable from "../components/DataTable";
import API from "../utils/API";
import Header from "./Header";


class SearchResultContainer extends Component  {
  state = {
    search: "",
    results: [],
    employees:[],
    order:""
  };

//  When this component mounts, search the Employee API for pictures of kittens
  componentDidMount() {
    this.searchEmployees();
  }

  searchEmployees = query => {
    API.search(query)
    .then(res => {
      this.setState({ ...this.state,results: res.data.results, employees: res.data.results })
     // this.setState({ ...this.state,employees: res.data.results})
    })
      .catch(err => console.log(err));
      console.log(this.state)
  };

  handleInputChange = event => {
    // props.employees.filter(employeeRRecord)
   const employees = this.state.employees;
   const value = event.target.value;
   const results = employees.filter(employee => employee.name.first.toLowerCase().indexOf(value.toLowerCase()) > -1)
   this.setState({
     results
   })
  };
   // const search = event.target.search;
    // const value = event.target.value;
    // this.setState({
    //   search: value

  employeeSort = () => {
    const filter = this.state.results;

    if (this.state.order === "ascend") {
      const sortThrough = filter.sort((name1, name2) => (name1.name.first > name2.name.first) ? 1 : -1)
      
      this.setState({ 
        results: sortThrough,
        order: "descend"
      })
    } else {
      const sortThrough = filter.sort((name1, name2) => (name1.name.first > name2.name.first) ? 1 : -1)
      
      this.setState({ 
        resultes: sortThrough,
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
        employeeSort={this.employeeSort}
        />
        
      </div>
    );
  }
}

export default SearchResultContainer;
