import React, { Component } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Dialog } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

export default class extends Component {
  state = {
    open: false,
    personInfo: {
      name: "",
      status: "",
      car: "",
      location: "",
      address: "",
      payment: ""
    }
  };

  handleChange = (e, inputField) => {
    this.setState({ name: e.target.value });
  };

  handleStatusChange = status => event => {
    this.setState({ status: event.target.value });
  };
  handleCarChange = car => event => {
    this.setState({ car: event.target.value });
  };

  render() {
    return (
      <form>
        <TextField
          label="Name"
          value={this.state.name}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <br />
        <br />
        <InputLabel htmlFor="age-native-simple">Status</InputLabel>
        <Select
          native
          value={this.state.status}
          onChange={this.handleStatusChange("status")}
          inputProps={{
            name: "status",
            id: "age-native-simple"
          }}
        >
          <option value="" />
          <option value={" Available"}> Available</option>
          <option value={" Not available"}> Not available</option>
        </Select>
        <br />
        <br />

        <InputLabel htmlFor="age-native-simple">Car</InputLabel>
        <Select
          native
          value={this.state.car}
          onChange={this.handleCarChange("car")}
          inputProps={{
            name: "car",
            id: "age-native-simple"
          }}
        >
          <option value="" />
          <option value={"XML-333"}> XML-333</option>
          <option value={"RTE-343"}>RTE-343</option>
        </Select>
      </form>
    );
  }
}
