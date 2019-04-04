import React, { Component } from "react";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import {
  TableCell,
  TableRow,
  IconButton,
  Tooltip,
  Link
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

export default class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personInfo: props.personInfo
    };
  }
  onRowDelete = id => {
    const { onDelete } = this.props;
    onDelete(id);
  };
  render() {
    const { personInfo } = this.state;
    const available = <Check />;
    const notAvailable = <Close />;

    return (
      <TableRow key={this.props.id}>
        <TableCell component="th" scope="row">
          <Link component="button" variant="body2" color="primary">
            {personInfo.name}
          </Link>
        </TableCell>
        <TableCell align="right">
          {personInfo.status === "Available" ? available : notAvailable}
        </TableCell>
        <TableCell align="right">{personInfo.car}</TableCell>
        <TableCell align="right">{personInfo.address}</TableCell>
        <TableCell align="right">{personInfo.location}</TableCell>
        <TableCell align="right">{}</TableCell>
        <TableCell>
          <Tooltip title="Edit" placement="left">
            <IconButton aria-label="Edit">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>
          <Tooltip title="Delete" placement="left">
            <IconButton
              onClick={() => {
                this.onRowDelete(this.props.id);
              }}
              aria-label="Delete"
              color="secondary"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    );
  }
}
