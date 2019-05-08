import React, { Component } from "react";
import { TableCell, TableRow, IconButton, Tooltip } from "@material-ui/core";

export default class SalaryRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: null
    };
  }

  componentDidMount() {
    this.setState({
      money: this.props.money
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ money: nextProps.money });
  }

  render() {
    console.log("you recieved " + this.state.money);
    if (this.state.money != null) {
      return (
        <TableCell>
          <TableRow>dsds</TableRow>
        </TableCell>
      );
    } else {
      return null;
    }
  }
}
