import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useLocation } from "react-router-dom";
import QS from "query-string";
import styles from "./styles";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type DefaultFormType = {
  userId: string;
  userDeliveryAddress: string;
  contactNumber: number;
  contactPerson: string;
};

const defaultForm: DefaultFormType = {
  userId: "",
  userDeliveryAddress: "",
  contactNumber: 0,
  contactPerson: "",
};

export default function Checkout() {
  const location = useLocation();
  const classes = styles();

  const [form, setForm] = React.useState(defaultForm);
  const [openNotif, setOpenNotif] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = () => {
    if (!form.userId) {
      setError("User Id cannot null");
      setOpenNotif(true);
      return false;
    }
    const listSubmit = JSON.parse(localStorage.getItem("listSubmit") as string);
    listSubmit.push(form);
    localStorage.setItem("listSubmit", JSON.stringify(listSubmit));
    setForm(defaultForm);
    setOpenNotif(true);
  };

  React.useEffect(() => {
    const { userId } = QS.parse(location.search);
    if (userId) setForm({ ...form, userId: userId as string });
    if (!localStorage.getItem("listSubmit")) {
      localStorage.setItem("listSubmit", JSON.stringify([]));
    }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Snackbar
        open={openNotif}
        autoHideDuration={2000}
        onClose={() => setOpenNotif(false)}
      >
        <Alert
          onClose={() => setOpenNotif(false)}
          severity={error ? "error" : "success"}
        >
          {error ? error : "Success submit form!"}
        </Alert>
      </Snackbar>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Ruang Guru Form
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Submit Form
          </Typography>
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  value={form.userId}
                  required
                  name="userId"
                  label="User ID"
                  fullWidth
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setForm({ ...form, userId: e.target.value });
                  }}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={form.userDeliveryAddress}
                  name="userDeliveryAddress"
                  label="User Delivery Address"
                  fullWidth
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setForm({ ...form, userDeliveryAddress: e.target.value });
                  }}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="number"
                  value={form.contactNumber}
                  name="contactNumber"
                  label="Contact Number"
                  fullWidth
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setForm({
                      ...form,
                      contactNumber: parseInt(e.target.value),
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  value={form.contactPerson}
                  name="contactPerson"
                  label="Contact Person"
                  fullWidth
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setForm({ ...form, contactPerson: e.target.value });
                  }}
                />
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={classes.button}
              >
                Submit
              </Button>
            </div>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
