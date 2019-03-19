import React, { Component, Fragment } from "react";
import NavBar from "./components/layouts/NavBar";
import Table from "./components/layouts/Table";
import {
  TableCell,
  TableRow,
  IconButton,
  Tooltip,
  Link
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";

class App extends Component {
  state = {
    rows: []
  };

  onDelete = id => {
    this.setState({ rows: this.state.rows.filter(row => row.key !== id) });
  };

  addToList = personInfo => {
    const available = <Check />;
    const notAvailable = <Close />;

    const row = (
      <TableRow key={personInfo.name}>
        <TableCell component="th" scope="row">
          <Link component="button" variant="body2" color="primary">
            {personInfo.name}
          </Link>
        </TableCell>
        <TableCell align="right">
          {personInfo.status === "Available" ? available : notAvailable}
        </TableCell>
        <TableCell align="right">{personInfo.car}</TableCell>
        <TableCell align="right">{}</TableCell>
        <TableCell align="right">{}</TableCell>
        <TableCell align="right">{}</TableCell>
        <TableCell>
          <Tooltip title="Delete" placement="left">
            <IconButton
              onClick={() => this.onDelete(personInfo.name)}
              aria-label="Delete"
              color="secondary"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
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
