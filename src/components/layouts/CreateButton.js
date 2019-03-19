import React, { Component, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  InputLabel
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

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

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
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
    const { open } = this.state;

    return (
      <Fragment>
        <Button variant="fab" color="extended" onClick={this.handleToggle} mini>
          <Add />
        </Button>
        <Dialog open={open} onClose={this.handleToggle}>
          <DialogTitle id="form-dialog-title">Create new</DialogTitle>
          <DialogContent>
            <DialogContentText>Please fill out the form</DialogContentText>
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
                <option value={"Available"}> Available</option>
                <option value={"Not available"}> Not available</option>
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
              <br />
              <br />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="raised"
              onClick={() =>
                this.props.submitHandler(
                  this.state.name,
                  this.state.status,
                  this.state.car
                )
              }
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
