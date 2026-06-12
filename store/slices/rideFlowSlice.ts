import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LatLng } from "@/types/PropsTypes";

type RideFlowState = {
  origin: LatLng | null;
  destination: LatLng | null;
  travelTimeInformation: any;
};

const initialState:RideFlowState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

const RideFlowSlice = createSlice({
  name: "rideFlow",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelInfo: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const rideFlowReducer = RideFlowSlice.reducer;

export const { setOrigin, setDestination, setTravelInfo } =
  RideFlowSlice.actions;

export const selectOrigin = (state: RootState) => state.rideFlow.origin;
export const selectDestination = (state: RootState) =>
  state.rideFlow.destination;
export const selectTravelTimeInformation = (state: RootState) =>
  state.rideFlow.travelTimeInformation;
