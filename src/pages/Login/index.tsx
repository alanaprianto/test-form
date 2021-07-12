import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import { useHistory, Redirect } from "react-router-dom";

type DefaultDataType = {
  username: string;
  password: string;
  isRemember: boolean;
};

const defaultData: DefaultDataType = {
  username: "test@mail.com",
  password: "apasaja",
  isRemember: false,
};

export default function SignIn() {
  const history = useHistory();
  const classes = styles();
  const [data, setData] = React.useState(defaultData);
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("token", JSON.stringify(data));
    history.push("/dashboard");
  };

  if (localStorage.getItem("token")) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={data.username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData({ ...data, username: e.target.value });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={data.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData({ ...data, password: e.target.value });
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                checked={data.isRemember}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, isRemember: e.target.checked });
                }}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
