import React, { Component } from "react";
import {
  Button,
  TextField,
  Select,
  InputLabel,
  withStyles,
  Grid,
  Paper
} from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

export default withStyles(styles)(
  class extends Component {
    state = {
      open: false,
      rowId: false,
      personInfo: {
        name: "",
        status: "",
        car: "",
        address: "",
        location: "",
        payment: ""
      }
    };

    componentDidMount() {
      if (this.props.personInfo !== null) {
        this.setState({
          personInfo: this.props.personInfo,
          rowId: this.props.rowId
        });
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.personInfo !== null) {
        this.setState({
          personInfo: nextProps.personInfo,
          rowId: nextProps.rowId
        });
      }
    }

    handleChange = name => ({ target: { value } }) => {
      this.setState({
        personInfo: {
          ...this.state.personInfo,
          [name]: value
        }
      });
    };

    submitHandler = () => {
      const { open } = this.state;
      this.props.open(open);
      if (this.state.rowId === false) {
        this.props.onSubmit(this.state.personInfo);
      } else {
        this.props.onSubmit(this.state.rowId, this.state.personInfo);
      }
      this.setState({
        rowId: null,
        personInfo: { name: "", status: "", car: "", address: "", location: "" }
      });
    };

    render() {
      const {
        personInfo: { name, status, car, address, location }
      } = this.state;
      const { classes } = this.props;

      return (
        <form className={classes.root} noValidate>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TextField
                  label="Name"
                  value={name}
                  onChange={this.handleChange("name")}
                  margin="normal"
                  variant="outlined"
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <InputLabel htmlFor="age-native-simple">Status</InputLabel>
                <Select
                  native
                  value={status}
                  onChange={this.handleChange("status")}
                >
                  <option value="" />
                  <option value={"Available"}> Available</option>
                  <option value={"Not available"}> Not available</option>
                </Select>
                <InputLabel htmlFor="age-native-simple">Car</InputLabel>
                <Select native value={car} onChange={this.handleChange("car")}>
                  <option value="" />
                  <option value={"XML-333"}> XML-333</option>
                  <option value={"RTE-343"}>RTE-343</option>
                </Select>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TextField
                  label="Construction Address"
                  value={address}
                  onChange={this.handleChange("address")}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Location"
                  value={location}
                  onChange={this.handleChange("location")}
                  margin="normal"
                  variant="outlined"
                />
              </Paper>
            </Grid>
          </Grid>
          <Button
            color="primary"
            variant="contained"
            onClick={this.submitHandler}
            mini
          >
            {this.state.rowId !== false ? "Edit" : "Create"}
          </Button>
        </form>
      );
    }
  }
);
