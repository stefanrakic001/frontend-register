import React, { Component, Fragment } from "react";
import { Button, Dialog, DialogContent, Tooltip } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Login from "./Login";

export default class CreateNewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleToggle = this.handleToggle.bind(this);
  }


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
    const { handleLoggedIn } = this.props;
    console.log("open login props."+this.props);

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
        <Dialog open={open} >
          <DialogContent>
            <Login handleLoggedIn={handleLoggedIn} onClose={this.handleToggle}/>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
