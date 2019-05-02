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
  },
  input: {
    marginRight: theme.spacing.unit * 4
  },
  inputLabel: {
    marginRight: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(
  class extends Component {
    state = {
      open: false,
      rowId: null,
      isNew: true,
      personInfo: {
        name: "",
        availability: "",
        car: {
          carType: "BMW",
          lincencePlate: "XML-965"
        },
        address: "",
        construction: ""
      }
    };

    componentDidMount() {
      if (this.props.personInfo !== null) {
        this.setState({
          isNew: false,
          personInfo: this.props.personInfo,
          rowId: this.props.rowId
        });
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.personInfo !== null) {
        this.setState({
          isNew: false,
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
      if (this.state.isNew === true) {
        this.props.onSubmit(this.state.personInfo);
      } else {
        this.props.onSubmit(this.state.rowId, this.state.personInfo);
      }
      this.setState({
        rowId: null,
        personInfo: { name: "", availability: "", car: "", address: "", construction: "" }
      });
    };

    render() {
      const {
        personInfo: { name, availability, car, address, construction }
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
                <InputLabel
                  className={classes.inputLabel}
                  htmlFor="age-native-simple"
                >
                  Availability
                </InputLabel>
                <Select
                  className={classes.input}
                  native
                  value={availability}
                  onChange={this.handleChange("availability")}
                >
                  <option value="" />
                  <option value={"Available"}> Available</option>
                  <option value={"Not available"}> Not available</option>
                </Select>
                <InputLabel
                  className={classes.inputLabel}
                  htmlFor="age-native-simple"
                >
                  Car
                </InputLabel>
                <Select
                  className={classes.input}
                  native
                  value={car}
                  onChange={this.handleChange("car")}
                >
                  <option value="" />
                  <option value={"XML-333"}> XML-333</option>
                  <option value={"RTE-343"}>RTE-343</option>
                </Select>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TextField
                  className={classes.input}
                  label="Construction Address"
                  value={address}
                  onChange={this.handleChange("address")}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  className={classes.input}
                  label="Construction"
                  value={construction}
                  onChange={this.handleChange("constuction")}
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
            {this.state.isNew ? "Create" : "Edit"}
          </Button>
        </form>
      );
    }
  }
);
