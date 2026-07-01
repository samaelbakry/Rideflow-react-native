import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

type initialStateT = {
    isDarkMode: boolean
}

const initialState: initialStateT = {
    isDarkMode: false,
}

const theme = createSlice({
    name:"theme",
    initialState,
    reducers: {
    toggleTheme:(state, action)=>{
      state.isDarkMode = action.payload;
    }
    }
})

export const themeReducer = theme.reducer

export const { toggleTheme } = theme.actions
export const selectIsDarkMode = (state: RootState) => state.theme.isDarkMode;