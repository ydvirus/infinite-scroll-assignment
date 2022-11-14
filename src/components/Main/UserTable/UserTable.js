import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useMemo } from "react";
import { useTable, useGlobalFilter } from "react-table";
import USER_DATA from "../../../data/MOCK_DATA.json";
import { COLUMNS } from "./columns";
import GlobalFilter from "./GlobalFilter";

function UserTable({ setSelectedCustomer }) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => USER_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const globalFilter = state.globalFilter ? state.globalFilter : "";
  console.log(state)
  console.log(globalFilter)

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <TableContainer
        component={Paper}
        className="main-container"
        elevation={4}
        sx={{
          width: "inherit",
          margin: "1% 3%",
          height: "400px",
          padding: "0 25px",
          "&::-webkit-scrollbar": {
            width: 5,
            height: 5,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#b2ebf2",
            borderRadius: 2,
          },
        }}
      >
        <Table aria-label="simple table" {...getTableProps()} stickyHeader>
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell
                    key={index}
                    {...column.getHeaderProps({
                      style: {},
                    })}
                    sx={{
                      fontWeight: 700,
                      fontSize: "18px",
                      width: "20%",
                      color: "#424242",
                    }}
                  >
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  key={index}
                  onClick={() => {
                    setSelectedCustomer(row.original);
                  }}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: '#b2ebf2',
                      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px',
                    },
                    border: 'none',
                  }}
                >
                  {row.cells.map((cell, index) => (
                    <TableCell {...cell.getCellProps()} key={index}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
    </>
  );
}

export default UserTable;
