import React, { Component, Fragment } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip, withStyles, Theme
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import {AppForm} from "./form";
import {IModalProps, IModalState} from "../types/type";
import createStyles from "@material-ui/core/styles/createStyles";

export const SAppModal = (theme: Theme) => createStyles({
    container: {
        display: "flex",
        flexWrap: "wrap"
    }
});

export class AppModal extends Component<IModalProps, IModalState> {
    state = {
        open: false
    };

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    open = (open: boolean) => {
        this.setState({
            open: open
        });
    };

    render() {
        const { open } = this.state;
        const { classes, onSubmit, personInfo } = this.props;

        return (
            <Fragment>
                <Tooltip title="Add" placement="left">
                    <Button
                        variant="fab"
                        color="primary"
                        onClick={this.handleToggle}
                        mini
                    >
                        <Add />
                    </Button>
                </Tooltip>
                <Dialog open={open} onClose={this.handleToggle}>
                    <DialogTitle id="form-dialog-title">Create new</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Please fill out the form</DialogContentText>
                        <AppForm
                            personInfo={personInfo}
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

export default (withStyles(SAppModal)(AppModal));
