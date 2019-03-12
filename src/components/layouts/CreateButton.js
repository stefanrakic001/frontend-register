import React, { Component, Fragment } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Dialog } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});
export default class extends Component {
  state = {
    open: false,
    name: ""
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleChange = (e, inputField) => {
    console.log(e.target.value);
    console.log(inputField);
    let name = e.target.value;
    this.setState({ name: name });
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
                id="standard-name"
                label="Name"
                stlye={{
                  textField: {
                    width: 200
                  }
                }}
                value={this.state.name}
                onChange={this.handleChange}
                margin="normal"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="raised"
              onClick={() => this.props.submitHandler(this.state.name)}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
