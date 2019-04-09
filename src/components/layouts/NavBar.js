import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import CreateNewModal from "./CreateNewModal";

export default ({ addToNavBar }) => (
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
      <CreateNewModal onSubmit={addToNavBar}/>
    </Toolbar>
  </AppBar>
);
