import React, { Component, Fragment } from "react";
import NavBar from "./components/layouts/NavBar";
import Table from "./components/layouts/Table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

class App extends Component {
  state = {
    rows: []
  };

  addToList = name => {
    const row = (
      <TableRow key={1}>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
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
