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
import { getUrl } from "../ApiUrl";

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
      personInfo: {
        name: "",
        availability: "",
        car: {
          id: "",
          carType: "",
          lincencePlate: ""
        },
        address: "",
        construction: ""
      },
      cars: [],
      selectedCar: "",
      selectedStatus: ""
    };

    componentDidMount() {
      if (this.props.personInfo !== null) {
        const car = this.props.personInfo.car;
        const status = this.availabilityConverter(this.props.personInfo.availability);
        this.getCars();
        this.setState({
          personInfo: this.props.personInfo,
          selectedCar: car.lincencePlate + " " + car.carType + " " + car.id,
          selectedStatus: status
        });
      }
    }

    availabilityConverter(availability) {
      switch (availability) {
        case "AVAILABLE" :
          return "Available";
        case "NOTAVAILABLE" :
          return "Not Available";
        case "HOLIDAY":
          return "Holiday";
        case "SICKLEAVE":
          return "Sickleave";
      }
    }

    getCars() {
      if (sessionStorage.getItem("token") != null) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append(
          "Authorization",
          "Bearer " + sessionStorage.getItem("token")
        );
        const options = {
          method: "GET",
          headers
        };

        const request = new Request(getUrl() + "/car/list", options);
        fetch(request)
          .then(response =>
            response.json().then(data => {
              if (response.status === 401) {
                sessionStorage.clear();
                this.setState({ cars: null });
                this.props.handleToggle();
                alert("Your are logged out!");
                console.log("Invalid token!");
              } else if (data.length === 0) {
                this.setState({ cars: null });
              } else {
                this.setState({ cars: data });
              }
            })
          )
          .then(() => {});
      } else {
        this.setState({ loggedIn: false, rows: null });
      }
    }

    componentWillReceiveProps(nextProps) {
      const car = nextProps.personInfo.car;
      const status = this.availabilityConverter(nextProps.personInfo.availability);
      this.getCars();
      if (nextProps.personInfo !== null) {
        this.setState({
          personInfo: nextProps.personInfo,
          selectedCar: car.licencePlate + " " + car.carType + " " + car.id,
          selectedStatus: status
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

    handleCarChange = name => ({ target: { value } }) => {
      const carData = value.split(" ");
      this.setState({
        personInfo: {
          ...this.state.personInfo,
          car: {
            id: carData[2],
            carType: carData[1],
            licencePlate: carData[0]
          }
        },
        selectedCar: value
      });
    };

    handleAvailabilityChange = name => ({ target: { value } }) => {
      let status = "";
      switch (value) {
        case "Available":
          status = "AVAILABLE";
          break;
        case "Not Available":
          status = "NOTAVAILABLE";
          break;
        case "Holiday":
          status = "HOLIDAY";
          break;
        case "Sickleave":
          status = "SICKLEAVE";
      }
      this.setState({
        personInfo: {
          ...this.state.personInfo,
          availability: status
        },
        selectedStatus: value
      });
      console.log(
        "[STATUS.INFO] status is: " + this.state.personInfo.availability
      );
    };

    submitHandler = () => {
      const { open } = this.state;
      this.props.open(open);
      this.props.onSubmit(this.state.personInfo);
      this.setState({
        personInfo: {
          name: "",
          availability: "",
          car: "",
          address: "",
          construction: ""
        }
      });
    };

    render() {
      const {
        personInfo: { name, availability, car, address, construction }
      } = this.state;
      const { classes } = this.props;
      const cars = this.state.cars;
      console.log("[INFO.SELECTED-STATUS] is " + this.state.selectedStatus.toString());
      console.log("[INFO.SELECTED-CAR] is " + this.state.selectedCar.toString());

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
                  value={this.state.selectedStatus}
                  onChange={this.handleAvailabilityChange("availability")}
                >
                  <option value="" />
                  <option value={"Available"}> Available</option>
                  <option value={"Not Available"}> Not available</option>
                  <option value={"Holiday"}> Holiday</option>
                  <option value={"Sickleave"}> Sickleave</option>
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
                  value={this.state.selectedCar}
                  onChange={this.handleCarChange("car")}
                >
                  <option value="" />
                  {this.state.cars.map(auto => (
                    <option value={auto.licencePlate + " " + auto.carType + " " + auto.id}>
                      {auto.licencePlate + " " + auto.carType}
                    </option>
                  ))}
                </Select>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TextField
                  className={classes.input}
                  label="Address"
                  value={address}
                  onChange={this.handleChange("address")}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  className={classes.input}
                  label="Construction"
                  value={construction}
                  onChange={this.handleChange("construction")}
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
            {this.state.personInfo.id ? "Edit" : "Create"}
          </Button>
        </form>
      );
    }
  }
);
