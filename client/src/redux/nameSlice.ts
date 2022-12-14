import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface gender {
  gender: string;
  probability: number;
}
export interface nationality {
  country_id: string;
  probability: number;
}
export interface NameData {
  name: string;
  gender: gender;
  nationality: nationality[];
}
export interface NameState {
  prevNamesData: NameData[] | undefined;
  name: string;
  nameData: NameData | undefined;
}
/**
 * @type {}
 */
const initialState: NameState = {
  name: "",
  nameData: undefined,
  prevNamesData: undefined,
};
// all question state and the chossen question state
export const nameSlice = createSlice({
  name: "questionsSlice",
  initialState,
  reducers: {
    setName: (state: NameState, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setNameData: (state: NameState, action: PayloadAction<NameData>) => {
      state.nameData = action.payload;
    },
    setPrevNamesData: (state: NameState, action: PayloadAction<NameData[]>) => {
      state.prevNamesData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName, setNameData, setPrevNamesData } = nameSlice.actions;

export default nameSlice.reducer;
