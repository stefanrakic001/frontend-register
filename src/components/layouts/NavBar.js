import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import CreateNewModal from "./CreateNewModal";
import OpenLogin from "./OpenLogin";
import { Grid } from "@material-ui/core";

export default ({ addToNavBar, handleLoggedIn, isLoggedIn }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography
        variant="headline"
        color="inherit"
        style={{
          flex: 1
        }}
      >
        Employee Register
      </Typography>
      <Grid item xs={10}>
        <OpenLogin handleLoggedIn={handleLoggedIn}/>
      </Grid>
      <CreateNewModal onSubmit={addToNavBar} isLoggedIn={isLoggedIn}/>
    </Toolbar>
  </AppBar>
);
