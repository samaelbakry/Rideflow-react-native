import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LatLng } from "@/types/PropsTypes";
type RideStatus =
  | "idle"
  | "selecting_car"
  | "searching_drivers"
  | "driver_assigned"
  | "trip_started"
  | "trip_ended";

type RideFlowState = {
  origin: LatLng | null;
  destination: LatLng | null;
  travelTimeInformation: any;
  selectedCar: string | null;
  selectedDriver: any | null;
  driverArrived: boolean;
  rideStatus: RideStatus;
};

const initialState: RideFlowState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  selectedCar: null,
  selectedDriver: null,
  driverArrived: false,
  rideStatus: "idle",
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
      state.rideStatus = "selecting_car";
    },
    setTravelInfo: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setSelectedCar: (state, action) => {
      state.selectedCar = action.payload;
      state.rideStatus = "searching_drivers";
    },
    setSelectedDriver: (state, action) => {
      state.selectedDriver = action.payload;
      state.driverArrived = false;
      state.rideStatus = "driver_assigned";
    },
    startTrip: (state) => {
      state.rideStatus = "trip_started";
    },
    setDriverPosition: (state, action) => {
      state.driverArrived = action.payload;
    },
    endTrip: (state) => {
      state.rideStatus = "trip_ended";
    },
    startOver: (state) => {
      state.rideStatus = "idle";
      state.driverArrived = false;
      state.selectedDriver = null;
      state.selectedCar = null;

      state.origin = null;
      state.destination = null;
      state.travelTimeInformation = null;
    },
  },
});

export const rideFlowReducer = RideFlowSlice.reducer;

export const {
  setOrigin,
  setDestination,
  setTravelInfo,
  setSelectedCar,
  setSelectedDriver,
  setDriverPosition,
  startTrip,
  endTrip,
  startOver,
} = RideFlowSlice.actions;

export const selectOrigin = (state: RootState) => state.rideFlow.origin;
export const selectDestination = (state: RootState) =>
  state.rideFlow.destination;
export const selectTravelTimeInformation = (state: RootState) =>
  state.rideFlow.travelTimeInformation;
export const selectedCar = (state: RootState) => state.rideFlow.selectedCar;
export const selectedDriver = (state: RootState) =>
  state.rideFlow.selectedDriver;
export const rideState = (state: RootState) => state.rideFlow.rideStatus;
export const driverArrived = (state: RootState) => state.rideFlow.driverArrived;
