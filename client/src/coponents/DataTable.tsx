import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NameData, setPrevNamesData } from "../redux/nameSlice";
import { RootState } from "../redux/store";
import { Divider } from "@mui/material";

export default function DataTable() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  const prevNamesData = useSelector(
    (state: RootState) => state.name.prevNamesData
  );
  const [rows, setRows] = useState<NameData[]>(prevNamesData!);
  const [searched, setSearched] = useState<string>("");
  const requestSearch = (searchedVal: string) => {
    const filteredRows = prevNamesData?.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows!);
  };
  const dispatch = useDispatch();
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql/",
    cache: new InMemoryCache(),
  });
  useEffect(() => {
    client
      .query({
        query: gql`
          query {
            namesData {
              name
              gender {
                gender
                probability
              }
              nationality {
                country_id
                probability
              }
            }
          }
        `,
      })
      .then((result) => {
        console.log(result);

        dispatch(setPrevNamesData(result.data.namesData));
      });
  }, []);
  useEffect(() => {
    setRows(prevNamesData!);
  }, [prevNamesData]);

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <div className="tableContainer">
      <Paper className="innerTableContainer">
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Gender probability</TableCell>
                <TableCell align="right">Country Id</TableCell>
                <TableCell align="right">Country probability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows ? (
                rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.gender.gender}</TableCell>
                    <TableCell align="right">
                      {row.gender.probability}
                    </TableCell>
                    <TableCell align="right">
                      {row.nationality.map((country) => (
                        <>
                          {country.country_id}
                          <Divider />
                        </>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      {row.nationality.map((country) => (
                        <>
                          {country.probability}

                          <Divider />
                        </>
                      ))}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
