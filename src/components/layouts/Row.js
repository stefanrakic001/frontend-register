import React, { Component } from "react";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import BeachAccess from "@material-ui/icons/BeachAccess";
import SentimentVeryDissatisfied from "@material-ui/icons/SentimentVeryDissatisfied";
import { TableCell, TableRow, IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ModifyModal from "./ModifyModal";
import SalaryDialog from "./SalaryDialog";

export default class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personInfo: null,
      rowId: null
    };
    this.decideSymbol = this.decideSymbol.bind(this);
  }

  componentDidMount() {
    this.setState({
      rowId: this.props.rowId,
      personInfo: this.props.personInfo
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ rowId: nextProps.rowId, personInfo: nextProps.personInfo });
  }

  onRowDelete(id) {
    const { onDelete } = this.props;
    onDelete(id);
  }

  decideSymbol(status) {
    switch (status) {
      case "AVAILABLE":
        return <Check />;
      case "NOTAVAILABLE":
        return <Close />;
      case "HOLIDAY":
        return <BeachAccess />;
      case "SICKLEAVE":
        return <SentimentVeryDissatisfied />;
    }
  }

  render() {
    if (this.state.personInfo !== null) {
      const { personInfo } = this.state;
      console.log("[ROW.INFO] PersonInfo name: " + personInfo.name);
      const car = personInfo.car;
      return (
        <TableRow key={this.state.id}>
          <TableCell component="th" scope="row">
            {personInfo.name}
          </TableCell>
          <TableCell>{this.decideSymbol(personInfo.availability)}</TableCell>
          <TableCell align="right">
            {car === null ? " " : car.licencePlate + " " + car.carType}
          </TableCell>
          <TableCell align="right">{personInfo.address}</TableCell>
          <TableCell align="right">{personInfo.construction}</TableCell>
          <TableCell align="right">
            <SalaryDialog
              rowId={this.state.rowId}
              workerName={personInfo.name}
            />
          </TableCell>
          <TableCell>
            <Tooltip title="Edit" placement="left">
              <ModifyModal
                onSubmit={this.props.handleEdit}
                personInfo={personInfo}
                rowId={this.state.rowId}
              />
            </Tooltip>
          </TableCell>
          <TableCell>
            <Tooltip title="Delete" placement="left">
              <IconButton
                id={this.state.rowId}
                onClick={() => {
                  this.onRowDelete(personInfo.id);
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
    } else {
      return null;
    }
  }
}
