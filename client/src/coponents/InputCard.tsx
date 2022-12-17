import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setName, setNameData } from "../redux/nameSlice";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
function InputCard() {
  const nameDataState = useSelector((state: RootState) => state.name.nameData);
  const nameState = useSelector((state: RootState) => state.name.name);
  const dispatch = useDispatch();
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql/",
    cache: new InMemoryCache(),
  });

  function nameCheck() {
    // Checking that the input is correct.
    // Checking that the input is correct.
    if (
      nameState !== null &&
      nameState !== " " &&
      typeof nameState === "string" &&
      nameState !== "" &&
      nameState
    ) {
    }

    client
      .query({
        query: gql`
          query {nameData (name:"${nameState.toLowerCase()}") {
            name
              gender{
                gender
                probability
              }
              nationality{
              country_id
              probability
      } 
    } } 
        `,
      })
      .then((result) => {
        if(result.data.nameData.gender.probability !==0){
          
          
          dispatch(setNameData(result.data.nameData));
        }
      });
  }
  // Rendering the card that display the data after clicking the data search
  let cardComponent =
    nameDataState?.gender.probability! > 0 ? (
      <div className="card">
        <Card>
          <CardContent>
            <Typography
              fontFamily={"Varela Round"}
              variant="h5"
              color="text"
              gutterBottom
            >
              {nameDataState!.name}
            </Typography>
            <Typography component="div" fontFamily={"Varela Round"}>
              The probability is {nameDataState!.gender.probability}
              <br /> for {nameDataState!.name} to be{" "}
              {nameDataState!.gender.gender}
            </Typography>{" "}
            <Typography component="div" fontFamily={"Varela Round"}>
              {nameDataState?.nationality.map((country) => {
                return (
                  <Typography
                    style={{ margin: "5px" }}
                    component="div"
                    fontFamily={"Varela Round"}
                  >
                    {" "}
                    the probability is {country.probability} to be from{" "}
                    {country.country_id}
                  </Typography>
                );
              })}
            </Typography>
          </CardContent>
        </Card>
      </div>
    ) : (
      <></>
    );
  return (
    <div className="header">
      <h1>Check your name: </h1>
      <div className="inputDuo">
        <TextField
          type="string"
          id="outlined-basic"
          variant="outlined"
          onChange={(newValue) => dispatch(setName(newValue.target.value))}
        />{" "}
        <Button onClick={nameCheck} variant="contained">
          Check it!
        </Button>
      </div>
      {cardComponent}
    </div>
  );
}

export default InputCard;
