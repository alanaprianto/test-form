import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";

import SimpleModal from "./components/Modal";

type rowItem = {
  userId: string;
  userDeliveryAddress: string;
  contactNumber: number;
  contactPerson: string;
};

export default function Orders() {
  const dataRaw = localStorage.getItem("listSubmit");
  const data = dataRaw ? JSON.parse(dataRaw) : [];
  const [openModal, setOpenModal] = React.useState(false);
  const [response, setResponse] = React.useState({});
  const [selected, setSelected] = React.useState({});

  const fetchAndOpenModal = async (userID: string) => {
    const res = await fetch(
      `https://us-central1-silicon-airlock-153323.cloudfunctions.net/rg-package-dummy?userId=${userID}`
    );
    const data = await res.json();
    setOpenModal(true);
    setResponse(data);
  };

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width="1%" align="center">
              Number
            </TableCell>
            <TableCell width="20%" align="center">
              User Id
            </TableCell>
            <TableCell width="30%" align="center">
              User Delivery Address
            </TableCell>
            <TableCell width="20%" align="center">
              Contact Number
            </TableCell>
            <TableCell width="20%" align="center">
              Contact Person
            </TableCell>
            <TableCell width="9%" align="center">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: rowItem, index: number) => (
            <TableRow key={index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.userDeliveryAddress}</TableCell>
              <TableCell>{row.contactNumber}</TableCell>
              <TableCell>{row.contactPerson}</TableCell>
              <TableCell align="center">
                <IconButton
                  onClick={() => {
                    setSelected(row);
                    fetchAndOpenModal(row.userId);
                  }}
                >
                  <Visibility />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SimpleModal
        open={openModal}
        setOpen={setOpenModal}
        response={response}
        selected={selected}
      />
    </React.Fragment>
  );
}
