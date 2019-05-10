import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Add from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { fade } from "@material-ui/core/styles/colorManipulator";
import CustomPaginationActionsTable from "./SalaryTable";
import { getUrl } from "../ApiUrl";

const styles = theme => ({
  appBar: {
    position: "relative",
    color: "primary"
  },
  flex: {
    flex: 1
  },
  paper: {
    display: "flex",
    alignItems: "center"
  },
  input: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.5),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.75)
    },
    marginRight: theme.spacing.unit * 4
  },
  inputLabel: {
    marginRight: theme.spacing.unit * 2
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      workerName: this.props.workerName,
      personInfo: this.props.personInfo,
      money: {
        amount: 0,
        type: "",
        date: ""
      },
      selectedType: "",
      salaryRows: []
    };
    this.getSalaryRowsFromBackEnd = this.getSalaryRowsFromBackEnd.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      workerName: nextProps.workerName
    });
  }

  getSalaryRowsFromBackEnd() {
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

      const request = new Request(
        getUrl() + "/salary/id=" + this.state.personInfo.id,
        options
      );
      fetch(request).then(response =>
        response.json().then(data => {
          if (response.status === 401) {
            sessionStorage.clear();
            this.setState({ loggedIn: false, salaryRows: [] });
            console.log("Invalid token!");
          } else if (data.length === 0) {
            this.setState({ salaryRows: [] });
          } else {
            this.setState({ salaryRows: data });
          }
        })
      );
    } else {
      this.setState({ loggedIn: false, salaryRows: [] });
    }
  }

  handleChange = name => ({ target: { value } }) => {
    this.setState({
      money: {
        ...this.state.money,
        [name]: value
      }
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    this.getSalaryRowsFromBackEnd();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    if (sessionStorage.getItem("token") != null) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        "Bearer " + sessionStorage.getItem("token")
      );
      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(this.state.money)
      };

      const request = new Request(
        getUrl() + "/salary/id=" + this.state.personInfo.id,
        options
      );
      fetch(request).then(response =>
        response.json().then(data => {
          if (response.status === 401) {
            sessionStorage.clear();
            this.setState({ loggedIn: false, rows: null });
            console.log("Invalid token!");
          } else if (data.message === "SUCCESS!") {
            this.getSalaryRowsFromBackEnd();
            this.setState({
              money: {
                amount: 0,
                type: "",
                paymentDate: ""
              },
              selectedType: ""
            });
          } else {
            console.log(data.message);
          }
        })
      );
    } else {
      this.setState({ loggedIn: false, salaryRows: null });
    }
  };

  handleSalaryTypeChange = name => ({ target: { value } }) => {
    let salaryType = "";
    value === "Normal" ? (salaryType = "NORMAL") : (salaryType = "INADVANCE");
    console.log(name);
    this.setState({
      money: {
        ...this.state.money,
        type: salaryType
      },
      selectedType: value
    });
    console.log("[SALARYTYPE.INFO] SalaryType is: " + this.state.money.type);
  };

  render() {
    console.log(this.state.money);
    const { classes } = this.props;
    return (
      <div>
        <IconButton onClick={this.handleClickOpen}>
          <AttachMoney />
        </IconButton>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Button
                variant="fab"
                color="extended"
                onClick={this.handleClose}
                aria-label="Close"
                mini
              >
                <CloseIcon />
              </Button>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {this.state.workerName}
              </Typography>
              <InputLabel
                htmlFor="age-native-simple"
                className={classes.inputLabel}
              >
                Amount
              </InputLabel>
              <form className={classes.paper} noValidate>
                <TextField
                  className={classes.input}
                  value={this.state.money.amount}
                  onChange={this.handleChange("amount")}
                  type="number"
                  margin="dense"
                  variant="outlined"
                />
                <InputLabel
                  className={classes.inputLabel}
                  htmlFor="age-native-simple"
                >
                  Type
                </InputLabel>
                <Select
                  className={classes.input}
                  native
                  value={this.state.selectedType}
                  onChange={this.handleSalaryTypeChange("type")}
                >
                  <option value="" />
                  <option value={"Normal"}>Normal</option>
                  <option value={"In Advance"}>Advance</option>
                </Select>
                <InputLabel
                  htmlFor="age-native-simple"
                  className={classes.inputLabel}
                >
                  Date
                </InputLabel>
                <TextField
                  className={classes.input}
                  id="date"
                  type="date"
                  defaultValue="2017-05-24"
                  onChange={this.handleChange("paymentDate")}
                />

                <Button
                  variant="fab"
                  color="extended"
                  mini
                  onClick={this.handleSubmit}
                >
                  <Add />
                </Button>
              </form>
            </Toolbar>
          </AppBar>
          <CustomPaginationActionsTable
            personInfo={this.state.personInfo}
            salaryRows={this.state.salaryRows}
            getSalaryRowsFromBackend={this.getSalaryRowsFromBackEnd}
          />
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenDialog);
