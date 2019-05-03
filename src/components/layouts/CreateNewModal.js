import React, { Component, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip
} from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import Form from "./Form";

export default class CreateNewModal extends Component {
  state = {
    open: false,
    LoggedIn: false
  };

  handleToggle = () => {
    if(!this.state.LoggedIn) {
      alert("You have to log in fist!");
    } else {
      this.setState({
        open: !this.state.open
      });
    }
  };

  open = open => {
    this.setState({
      open: open
    });
  };

  render() {
    const { open } = this.state;
    const { classes, onSubmit } = this.props;

    return (
      <Fragment>
        <Tooltip title="Add" placement="left">
          <Button
            variant="fab"
            color="extended"
            onClick={this.handleToggle}
            mini
          >
            <PersonAdd />
          </Button>
        </Tooltip>
        <Dialog open={open} onClose={this.handleToggle}>
          <DialogTitle id="form-dialog-title">Create new</DialogTitle>
          <DialogContent>
            <DialogContentText>Please fill out the form</DialogContentText>
            <Form
              personInfo={null}
              classes={classes}
              onSubmit={onSubmit}
              open={this.open}
            />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
