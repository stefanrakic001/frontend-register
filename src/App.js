import React, { Component, Fragment } from "react";
import NavBar from "./components/layouts/NavBar";
import Table from "./components/layouts/Table";
import { TableCell, TableRow } from "@material-ui/core";

class App extends Component {
  state = {
    rows: []
  };

  addToList = (name, status, car) => {
    const row = (
      <TableRow key={name}>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="right">{status}</TableCell>
        <TableCell align="right">{car}</TableCell>
        <TableCell align="right">{}</TableCell>
        <TableCell align="right">{}</TableCell>
        <TableCell align="right">{}</TableCell>
        <TableCell align="right">{}</TableCell>
      </TableRow>
    );
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
