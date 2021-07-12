import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  borderTable: {
    border: "1px solid #000000",
    width: "100%",
  },
  width50: {
    width: "50%",
  },
  divRow: {
    display: "flex",
    flexDirection: "row",
  },
  bordered: {
    borderBottom: "1px solid #000000",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

type ModalProps = {
  open: boolean;
  setOpen: any;
  response: { [key: string]: any };
  selected: { [key: string]: any };
};

export default function SimpleModal(props: ModalProps) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { open, setOpen, response, selected } = props;
  const [openNotif, setOpenNotif] = React.useState(false);
  const [reject, setReject] = React.useState(false);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">
        {response.status === "success"
          ? `User Info ${response.user.userId}`
          : response.message}
      </h2>
      {response.status === "success" ? (
        <>
          <div className={classes.divRow}>
            <div className={classes.width50}>
              <h4>Info From Api</h4>
              <table>
                <tbody>
                  {Object.keys(response.user).map((key: string, i: number) => (
                    <tr key={i}>
                      <td>{key}</td>
                      <td>:</td>
                      <td>{response.user[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={classes.width50}>
              <h4>Info From Form</h4>
              <table>
                <tbody>
                  {Object.keys(selected).map((key: string, i: number) => (
                    <tr key={i}>
                      <td>{key}</td>
                      <td>:</td>
                      <td>{selected[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <h2>Info Package</h2>
          <table className={classes.borderTable}>
            <thead className={classes.bordered}>
              <tr>
                <th>Package Name</th>
                <th>Package Serial</th>
                <th>Package Tag</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {response.packages.map((x: { [key: string]: any }, i: number) => (
                <tr className={classes.bordered} key={i}>
                  <td>{x.packageName}</td>
                  <td>{x.packageSerial}</td>
                  <td>{x.packageTag}</td>
                  <td>{x.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setOpen(false);
                setReject(false);
                setOpenNotif(true);
              }}
              className={classes.button}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setOpen(false);
                setReject(true);
                setOpenNotif(true);
              }}
              className={classes.button}
            >
              Reject
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Snackbar
        open={openNotif}
        autoHideDuration={2000}
        onClose={() => setOpenNotif(false)}
      >
        <Alert
          onClose={() => setOpenNotif(false)}
          severity={reject ? "error" : "success"}
        >
          {reject ? "Rejected" : "Approved"}
        </Alert>
      </Snackbar>
    </div>
  );
}
