import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import AppModal from "./modal";

export default function NavBar({addToNavBar}: {addToNavBar: () => void}) {
    return (
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
                <AppModal onSubmit={addToNavBar}/>
            </Toolbar>
    </AppBar>);
};
