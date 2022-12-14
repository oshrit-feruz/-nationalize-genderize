import "./App.css";
import axios from "axios";
import { setName, setNameData } from "./redux/nameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { TextField, Button } from "@mui/material";
import { useFormControl } from "@mui/material/FormControl";

function App() {
  const nameDataState = useSelector((state: RootState) => state.name.nameData);
  const nameState = useSelector((state: RootState) => state.name.name);
  const dispatch = useDispatch();
  const urlWithProxy = "/api/v1";

  function nameCheck() {
    console.log("try axios");

    axios
      .post(urlWithProxy + "/checkName", { newName: nameState })
      .then((res) => dispatch(setNameData(res.data)))
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="App">
      <TextField
        id="outlined-basic"
        variant="outlined"
        onChange={(newValue) => dispatch(setName(newValue.target.value))}
      />{" "}
      <p>data : {nameDataState}</p>
      <Button onClick={nameCheck} variant="contained">
        Check it!
      </Button>
    </div>
  );
}

export default App;
