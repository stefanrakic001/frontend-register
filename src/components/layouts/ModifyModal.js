import React, { Component, Fragment } from "react";
import {
    IconButton,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Form from "./Form";

export default class ModifyModal extends Component {
    state = {
        open: false,
        personInfo: null,
        rowId: null
    };

    componentDidMount() {
        this.setState({personInfo: this.props.personInfo, rowId: this.props.rowId});

    }

    componentWillReceiveProps(nextProps) {
        this.setState({personInfo: nextProps.personInfo, rowId: nextProps.rowId});
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
        const { classes, onSubmit } = this.props;

        return (
            <Fragment>
                <Tooltip title="Edit" placement="left">
                    <IconButton
                        aria-label="Edit"
                        onClick={this.handleToggle}
                    >
                        <EditIcon fontSize="small"/>
                    </IconButton>
                </Tooltip>
                <Dialog open={open} onClose={this.handleToggle}>
                    <DialogTitle id="form-dialog-title">Edit Info</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Please fill out the form</DialogContentText>
                        <Form
                            personInfo={this.state.personInfo}
                            classes={classes}
                            onSubmit={onSubmit}
                            open={this.open}
                            rowId={this.state.rowId}
                        />
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}