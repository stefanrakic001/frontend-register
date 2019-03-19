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
  InputLabel,
  withStyles,
  Tooltip
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

export default withStyles(styles)(
  class extends Component {
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

    handleChange = name => ({ target: { value } }) => {
      this.setState({
        personInfo: {
          ...this.state.personInfo,
          [name]: value
        }
      });
    };

    submitHandler = () => {
      const { personInfo } = this.state;
      this.props.onSubmit(personInfo);
      this.setState({
        open: false,
        personInfo: { name: "", status: "", car: "" }
      });
    };
    render() {
      const {
        open,
        personInfo: { name, status, car }
      } = this.state;
      const { classes } = this.props;

      return (
        <Fragment>
          <Tooltip title="Add" placement="left">
            <Button
              variant="fab"
              color="extended"
              onClick={this.handleToggle}
              mini
            >
              <Add />
            </Button>
          </Tooltip>
          <Dialog open={open} onClose={this.handleToggle}>
            <DialogTitle id="form-dialog-title">Create new</DialogTitle>
            <DialogContent>
              <DialogContentText>Please fill out the form</DialogContentText>
              <form className={classes.container}>
                <TextField
                  label="Name"
                  value={name}
                  onChange={this.handleChange("name")}
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                />
                <br />
                <br />
                <InputLabel htmlFor="age-native-simple">Status</InputLabel>
                <Select
                  native
                  value={status}
                  onChange={this.handleChange("status")}
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
                  value={car}
                  onChange={this.handleChange("car")}
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
                onClick={this.submitHandler}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      );
    }
  }
);
