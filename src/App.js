import React, { Component, Fragment } from "react";
import NavBar from "./components/layouts/NavBar";
import Table from "./components/layouts/Table";
import { TableCell, TableRow } from "@material-ui/core";

class App extends Component {
  state = {
    rows: []
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
