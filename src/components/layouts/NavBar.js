import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Modal from "../layouts/Modal";

export default ({ addToNavBar, editmode }) => (
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
      <Modal onSubmit={addToNavBar} editmode={editmode} />
    </Toolbar>
  </AppBar>
);
