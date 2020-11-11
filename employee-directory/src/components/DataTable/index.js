import React from "react";
import "./style.css";

// changed normal to scope=col to specify header to row.
function DataTable(props) {
  return (
    <div className="container">
    <table className="table-data">
      <tr>
        <th scope="col">Image</th>
        <th scope="col">Name</th>
        <th scope="col">Phone</th>
        <th scope="col">Email</th>
        <th scope="col">D.O.B</th>
      </tr>
      {props.results.map(result => (
        <tr key={result.login.uuid}>
          <td>
            <img alt={result.name.first}
              className="img-fluid"
              src={result.picture.large}
            />
          </td>
          <td>
            {result.name.first} {result.name.last}
          </td>
          <td>
            {result.phone}
          </td>
          <td>
            {result.email}
          </td>
          <td>
            {result.dob.date}
          </td>
        </tr>
      ))}
    </table>
    </div>

  );
}


export default DataTable;
