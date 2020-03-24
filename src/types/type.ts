
// Modal interfaces
import {WithStyles} from "@material-ui/core";
import {inspect} from "util";
import {SAppForm} from "../components/form";
import {SAppModal} from "../components/modal";

export interface IModalState {
    open: boolean;
}

export interface IModalProps extends WithStyles <typeof SAppModal> {
    personInfo?: any;
    onSubmit: any;
}

// Form interfaces
export interface IAppFormProps extends WithStyles <typeof SAppForm> {
    personInfo: any;
    open: (open: boolean) => void;
    onSubmit: (personInfo: any) => {};
}

export interface IAppFormState {
    open: boolean;
    personInfo: any;
}
