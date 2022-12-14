import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NameState {
  name: string;
}
/**
 * @type {}
 */
const initialState: NameState = {
  name: "",
};
// all question state and the chossen question state
export const nameSlice = createSlice({
  name: "questionsSlice",
  initialState,
  reducers: {
    setName: (state :NameState, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName } = nameSlice.actions;

export default nameSlice.reducer;
