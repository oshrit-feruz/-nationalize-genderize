import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NameData {
  name: string;
  gender: string;
  nationality: string[];
  probability: number;
}
export interface NameState {
  name: string;
  nameData: NameData | null;
}
/**
 * @type {}
 */
const initialState: NameState = {
  name: "",
  nameData: null,
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
  },
});

// Action creators are generated for each case reducer function
export const { setName ,setNameData } = nameSlice.actions;

export default nameSlice.reducer;
