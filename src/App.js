import React, { Component, Fragment } from "react";
import NavBar from "./components/layouts/NavBar";
import Table from "./components/layouts/Table";
import { TableCell, TableRow, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

class App extends Component {
  state = {
    rows: []
  };

  onDelete = id => {
    this.setState({ rows: this.state.rows.filter(row => row.key !== id) });
  };

  addToList = personInfo => {
    const row = (
      <TableRow key={personInfo.name}>
        <TableCell component="th" scope="row">
          {personInfo.name}
        </TableCell>
        <TableCell align="right">{personInfo.status}</TableCell>
        <TableCell align="right">{personInfo.car}</TableCell>
        <TableCell align="right">{}</TableCell>
        <TableCell align="right">{}</TableCell>
        <TableCell align="right">{}</TableCell>
        <TableCell>
          <IconButton
            onClick={() => this.onDelete(personInfo.name)}
            aria-label="Delete"
            color="secondary"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
    console.log(row);
    this.setState({ rows: this.state.rows.concat(row) });
  };

  render() {
    return (
      <Fragment>
        <NavBar addToNavBar={this.addToList} />
        <Table rows={this.state.rows} />
      </Fragment>
    );
  }
}

export default App;
