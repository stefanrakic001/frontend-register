import React, {Component} from "react";
import {
  Button,
  TextField,
  Select,
  InputLabel,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

export default withStyles(styles)(
  class extends Component {
    state = {
      open: false,
      rowId: null,
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
        this.setState({personInfo: this.props.personInfo, rowId: this.props.rowId});
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.personInfo !== null) {
        this.setState({personInfo: nextProps.personInfo, rowId: nextProps.rowId});
      }
    }

    handleChange = name => ({target: {value}}) => {
      this.setState({
        personInfo: {
          ...this.state.personInfo,
          [name]: value
        }
      });
    };


    submitHandler = () => {
      console.log("[START] Submit Handler");
      const {open} = this.state;
      this.props.open(open);
      if (this.state.rowId === null) {
        this.props.onSubmit(this.state.personInfo);
        console.log("[INFO] Person info submitted.");
      } else {
        console.log("[INFO] RowId is: " + this.state.rowId);
        this.props.onSubmit(this.state.rowId, this.state.personInfo);
      }
      this.setState({
        rowId: null,
        personInfo: {name: "", status: "", car: "", address: "", location: ""}
      });
      console.log("[END] Submit Handler");
    };

    render() {
      const {
        personInfo: {name, status, car, address, location}
      } = this.state;
      const {classes} = this.props;

      return (
        <form className={classes.container}>
          <TextField
            label="Name"
            value={name}
            onChange={this.handleChange("name")}
            margin="normal"
            variant="outlined"
          />
          <InputLabel htmlFor="age-native-simple">Status</InputLabel>
          <Select native value={status} onChange={this.handleChange("status")}>
            <option value=""/>
            <option value={"Available"}> Available</option>
            <option value={"Not available"}> Not available</option>
          </Select>

          <InputLabel htmlFor="age-native-simple">Car</InputLabel>
          <Select native value={car} onChange={this.handleChange("car")}>
            <option value=""/>
            <option value={"XML-333"}> XML-333</option>
            <option value={"RTE-343"}>RTE-343</option>
          </Select>

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

          <Button
            color="primary"
            variant="contained"
            onClick={this.submitHandler}
            mini
          >
            {this.state.rowId ? "Edit" : "Create"}
          </Button>
        </form>
      );
    }
  }
);
