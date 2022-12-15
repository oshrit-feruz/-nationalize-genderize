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
        dispatch(setPrevNamesData(result.data.namesData));
      });
  }, []);
  const [rows, setRows] = useState<NameData[]>(prevNamesData!);
  const [searched, setSearched] = useState<string>("");

  const requestSearch = (searchedVal: string) => {
    const filteredRows = prevNamesData?.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows!);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <>
      <Paper>
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
    </>
  );
}

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650
//   }
// });

// = [
//   { name: "Pizza", calories: 200, fat: 6.0, carbs: 24, protein: 4.0 },
//   { name: "Hot Dog", calories: 300, fat: 6.0, carbs: 24, protein: 4.0 },
//   { name: "Burger", calories: 400, fat: 6.0, carbs: 24, protein: 4.0 },
//   { name: "Hamburger", calories: 500, fat: 6.0, carbs: 24, protein: 4.0 },
//   { name: "Fries", calories: 600, fat: 6.0, carbs: 24, protein: 4.0 },
//   { name: "Ice Cream", calories: 700, fat: 6.0, carbs: 24, protein: 4.0 }
// ];

// export default function BasicTable() {
//   const [rows, setRows] = useState<food[]>(prevNamesData?);
//   const [searched, setSearched] = useState<string>("");
//   const classes = useStyles();

//   const requestSearch = (searchedVal: string) => {
//     const filteredRows = prevNamesData?.filter((row) => {
//       return row.name.toLowerCase().includes(searchedVal.toLowerCase());
//     });
//     setRows(filteredRows);
//   };

//   const cancelSearch = () => {
//     setSearched("");
//     requestSearch(searched);
//   };

//   return (
//     <>
//       <Paper>
//         <SearchBar
//           value={searched}
//           onChange={(searchVal) => requestSearch(searchVal)}
//           onCancelSearch={() => cancelSearch()}
//         />
//         <TableContainer>
//           <Table className={classes.table} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Food (100g serving)</TableCell>
//                 <TableCell align="right">Calories</TableCell>
//                 <TableCell align="right">Fat&nbsp;(g)</TableCell>
//                 <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//                 <TableCell align="right">Protein&nbsp;(g)</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.map((row) => (
//                 <TableRow key={row.name}>
//                   <TableCell component="th" scope="row">
//                     {row.name}
//                   </TableCell>
//                   <TableCell align="right">{row.calories}</TableCell>
//                   <TableCell align="right">{row.fat}</TableCell>
//                   <TableCell align="right">{row.carbs}</TableCell>
//                   <TableCell align="right">{row.protein}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//       <br />
//       <a
//         target="_blank"
//         href="https://smartdevpreneur.com/the-easiest-way-to-implement-material-ui-table-search/"
//       >
//         Learn how to add search and filter to Material-UI Table here.
//       </a>
//     </>
//   );
// }
