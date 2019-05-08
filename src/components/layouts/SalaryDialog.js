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

const styles = theme => ({
  appBar: {
    position: "relative",
    color: "primary"
  },
  flex: {
    flex: 1
  },
  input: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.5)
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
      selectedType: ""
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      workerName: nextProps.workerName
    });
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
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.setState({
      money: {
        amount: 0,
        type: "",
        date: ""
      }
    });
  };

  handleSalaryTypeChange = name => ({ target: { value } }) => {
    let salaryType = "";
    if (
      name === "Normal" ? (salaryType = "NORMAL") : (salaryType = "INADVANCE")
    )
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
                  value={this.state.amount}
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
                  value={this.state.money.selectedType}
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
                  onChange={this.handleChange("date")}
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
            money={this.state.money}
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
