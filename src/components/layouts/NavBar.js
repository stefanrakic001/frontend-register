import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Form from "../layouts/Form";

export default props => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography
        variant="headline"
        color="inherit"
        style={{
          flex: 1
        }}
      >
        Register
      </Typography>
      <Form onSubmit={props.addToNavBar} />
    </Toolbar>
  </AppBar>
);
