import React, { Component, Fragment } from "react";
import { Button, Dialog, DialogContent, Tooltip } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Login from "./Login";

export default class CreateNewModal extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  open = open => {
    this.setState({
      open: open
    });
  };

  render() {
    const { open } = this.state;

    return (
      <Fragment>
        <Tooltip title="Login" placement="left">
          <Button
            variant="fab"
            color="extended"
            onClick={this.handleToggle}
            mini
          >
            <AccountCircle />
          </Button>
        </Tooltip>
        <Dialog open={open} onClose={this.handleToggle}>
          <DialogContent>
            <Login />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
