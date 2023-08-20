import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, Grid } from "@mui/material";
// import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchBar from "material-ui-search-bar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Alert as AL, TicketReqBody } from "../utils/types/index";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadCsv from "./UploadCsv";

const Container = styled.div`
  margin: 10px;
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: #219ebc;
  border: none;
  border-radius: 5px;

  color: white;
  padding: 10px 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const TableWrapper = styled.div`
  /* margin: 10px; */
`;

const AttendWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

type TableProps = {
  callbackEnd: boolean;
  setInitialValues: (arg: TicketReqBody) => void;
  setOpen: (arg: boolean) => void;
  setOperation: (arg: string) => void;
  onClickAdd: () => void;
};

interface Ticket {
  id: number;
  name: string;
  table_no: number;
  ticket_no: number;
  ticket_sold_by: string;
}

export default function BasicTable({
  callbackEnd,
  setInitialValues,
  setOpen,
  setOperation,
  onClickAdd,
}: any) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>(data);
  const [searched, setSearched] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [alert, setAlert] = React.useState<AL>({
    show: false,
    message: "",
    severity: "success",
  });

  const [openUpload, setOpenUpload] = React.useState(false);

  const handleClickOpenUpload = () => {
    setOpenUpload(true);
  };

  const requestSearch = (
    searchedVal: string,
    searchProperties: (keyof Ticket)[]
  ) => {
    setSearched(searchedVal);
    const text = searchedVal.toLowerCase();

    if (text) {
      const filteredRows = data.filter((item) => {
        for (const property of searchProperties) {
          const str = String(item[property]).toLowerCase();
          if (str.includes(text)) {
            return true;
          }
        }
        return false;
      });

      setRows(filteredRows);
    } else {
      setRows(data);
    }
  };

  const cancelSearch = () => {
    setSearched("");
    // requestSearch(searched);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // load data from api

  const loadData = async () => {
    const results = await fetch("/api/ticket", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (results.status === 200) {
      const { data } = await results.json();

      if (data) {
        setData(data);
        setRows(data);
      }
    } else {
      setAlert({
        show: true,
        message: "Data loading failed!",
        severity: "error",
      });
    }
  };

  const getCounts = async () => {
    const results = await fetch("/api/ticket/attendance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (results.status === 200) {
      const { data } = await results.json();
      console.log("data", data);

      if (data) {
        setCount(data);
      }
    } else {
      setAlert({
        show: true,
        message: "Data loading failed!",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    loadData();
    getCounts();
  }, [callbackEnd]);

  const markAttendance = async (id: string, attendance: string) => {
    const results = await fetch(`/api/ticket/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attendance,
      }),
    });

    if (results.status === 200) {
      loadData();
      getCounts();
      setAlert({
        show: true,
        message: "Marked Attendance Successfully!",
        severity: "success",
      });

      setTimeout(() => {
        setAlert({
          show: false,
          message: "Marked Attendance Successfully!",
          severity: "success",
        });
      }, 2000);
    } else {
      setAlert({
        show: true,
        message: "Task Failed!",
        severity: "error",
      });

      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          severity: "error",
        });
      }, 2000);
    }
  };

  const deleteParticipant = async (id: string) => {
    const results = await fetch(`/api/ticket/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (results.status === 200) {
      loadData();
      setAlert({
        show: true,
        message: "Participant Deleted Successfully!",
        severity: "success",
      });

      setTimeout(() => {
        setAlert({
          show: false,
          message: "Participant Deleted Successfully!",
          severity: "success",
        });
      }, 2000);
    } else {
      setAlert({
        show: true,
        message: "Task Failed!",
        severity: "error",
      });

      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          severity: "error",
        });
      }, 2000);
    }
  };

  const handleBulkSuccess = () => {
    loadData();
  };

  const Edit = (row: TicketReqBody) => {
    setInitialValues({
      name: row?.name,
      table_no: row?.table_no,
      ticket_no: row?.ticket_no,
      ticket_sold_by: row?.ticket_sold_by,
    });
    setOpen(true);
    setOperation("edit");
  };

  const sendEmailAll = () => {};

  const sendEmail = async (id: string) => {
    const results = await fetch(`/api/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticket_id: id,
      }),
    });

    if (results.status === 200) {
      loadData();
    }
  };

  return (
    <>
      <Container>
        <AttendWrapper>Attendant Count : {count}</AttendWrapper>

        <SearchBarWrapper>
          <ButtonWrapper>
            <Button color="info" onClick={handleClickOpenUpload}>
              <CloudUploadIcon />
            </Button>
          </ButtonWrapper>
        </SearchBarWrapper>
        <TableWrapper>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-[18px] md:text-[22px] text-black border  rounded-lg bg-blue-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name / Ticket Number / Sold By"
            required
            style={{
              marginBottom: 20,
            }}
            value={searched}
            onChange={(searchVal) =>
              requestSearch(searchVal.target.value, [
                "name",
                "ticket_no",
                "ticket_sold_by",
              ])
            }
          />
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Ticket No</TableCell>
                  <TableCell align="right">Ticket Sold By</TableCell>
                  <TableCell align="right">Name/Ticket Holder</TableCell>
                  <TableCell align="right">Table No</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.ticket_no}</TableCell>
                    <TableCell align="right">{row?.ticket_sold_by}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.table_no}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableWrapper>
        <UploadCsv
          openUpload={openUpload}
          setOpenUpload={setOpenUpload}
          onSuccess={handleBulkSuccess}
        />
      </Container>
      {alert.show && (
        <Grid item md={12} style={{ margin: 10 }}>
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </Grid>
      )}
    </>
  );
}
