import React, { Fragment } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import CreateButton from "../layouts/CreateButton";

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
        Nyilvántartás
      </Typography>
      <CreateButton />
    </Toolbar>
  </AppBar>
);
