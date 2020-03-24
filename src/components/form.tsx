import React, {ChangeEvent, Component} from "react";
import {
    Button,
    TextField,
    Select,
    InputLabel,
    withStyles, Theme
} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import {IAppFormProps, IAppFormState} from "../types/type";

export const SAppForm = (theme: Theme) => createStyles({
    container: {
        display: "flex",
        flexWrap: "wrap"
    }
});



export class AppForm extends Component<IAppFormProps, IAppFormState> {
    state = {
        open: false,
        personInfo: {
            name: "",
            status: "",
            car: "",
            address: "",
            location: "",
            payment: ""
        }
    };

    getInitialState() {
        const { personInfo } = this.props;
    }

    handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value: string = e.currentTarget.value;
        const name: string = e.currentTarget.name;
        this.setState({
            personInfo: {
                ...this.state.personInfo,
                [name]: value,
            }
        });
    };

    submitHandler = () => {
        const { personInfo, open } = this.state;
        this.props.open(open);
        this.props.onSubmit(personInfo);
        this.setState({
            personInfo: { name: "", status: "", car: "", address: "", location: "" }
        });
    };

    renderFormFields = () => {
        // pass
    }

    render() {
        const {
            personInfo: {name, status, car, address, location}
        } = this.state;
        const { classes } = this.props;

        return (
            <form className={classes.container}>
                <TextField
                    label="Name"
                    value={name}
                    name='name'
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
                <InputLabel htmlFor="age-native-simple">Status</InputLabel>
                <Select name='status' native value={status} onChange={this.handleChange}>
                    <option value="" />
                    <option value={"Available"}> Available</option>
                    <option value={"Not available"}> Not available</option>
                </Select>

                <InputLabel htmlFor="age-native-simple">Car</InputLabel>
                <Select  name='car' native value={car} onChange={this.handleChange}>
                    <option value="" />
                    <option value={"XML-333"}> XML-333</option>
                    <option value={"RTE-343"}>RTE-343</option>
                </Select>

                <TextField
                    label="Construction Address"
                    name='address'
                    value={address}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Location"
                    name='location'
                    value={location}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />

                <Button
                    color="primary"
                    variant="raised"
                    onClick={this.submitHandler}
                    mini
                >
                    Create
                </Button>
            </form>
        );
    }
}

export default (withStyles(SAppForm)(AppForm))
