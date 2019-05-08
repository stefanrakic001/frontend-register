import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import * as jwt_decoder from "jwt-decode";
import { getUrl } from "../ApiUrl";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  handleChange = name => ({ target: { value } }) => {
    this.setState({
      [name]: value
    });
  };

  logIn() {
    const { onClose, handleLoggedIn } = this.props;

    const user = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(user);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(user)
    };

    const request = new Request(getUrl() + "/api/auth/signin", options);
    fetch(request).then(response =>
      response.json().then(data => {
        console.log(data);
        try {
          const user = jwt_decoder(data.accessToken);
          console.log(user.sub);
          sessionStorage.setItem("username", user.sub);
          sessionStorage.setItem("token", data.accessToken);
          onClose();
          handleLoggedIn();
        } catch (e) {
          console.log(e);
          this.setState({ failed_login: true });
        }
      })
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange("username")}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                value={this.state.password}
                id="password"
                onChange={this.handleChange("password")}
              />
            </FormControl>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.logIn}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

/*SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};*/

export default withStyles(styles)(Login);
