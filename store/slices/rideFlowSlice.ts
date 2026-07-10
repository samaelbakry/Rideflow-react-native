import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  rideStatus: RideStatus;
  rideId: string | null;
  origin: LatLng | null;
  originDescription: string;
  destination: LatLng | null;
  destinationDescription: string;
  travelTimeInformation: any;
  selectedCar: string | null;
  selectedDriver: any | null;
  driverArrived: boolean;
  tripEndedAt: string | null;
  price: number;
};

const initialState: RideFlowState = {
  rideId: null,
  origin: null,
  destination: null,
  originDescription: "",
  destinationDescription: "",
  travelTimeInformation: null,
  selectedCar: null,
  selectedDriver: null,
  driverArrived: false,
  rideStatus: "idle",
  tripEndedAt: null,
  price: 0,
};

const RideFlowSlice = createSlice({
  name: "rideFlow",
  initialState,
  reducers: {
    setRideId: (state, action) => {
      state.rideId = action.payload;
    },
    setOrigin: (state, action: PayloadAction<LatLng | null>) => {
      state.origin = action.payload;
      state.originDescription = action.payload?.description ?? "";
    },
    setDestination: (state, action: PayloadAction<LatLng | null>) => {
      state.destination = action.payload;
      state.destinationDescription = action.payload?.description ?? "";
      state.rideStatus = action.payload ? "selecting_car" : "idle";
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
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    startTrip: (state) => {
      state.rideStatus = "trip_started";
    },
    setDriverPosition: (state, action) => {
      state.driverArrived = action.payload;
    },
    endTrip: (state) => {
      state.rideStatus = "trip_ended";
      state.tripEndedAt = new Date().toISOString();
    },
    startOver: (state) => {
      state.rideStatus = "idle";
      state.driverArrived = false;
      state.rideId = null;
      state.selectedDriver = null;
      state.selectedCar = null;
      state.origin = null;
      state.destination = null;
      state.travelTimeInformation = null;
    },
    goBackRideState: (state) => {
      switch (state.rideStatus) {
        case "selecting_car":
          state.rideStatus = "idle";
          state.destination = null;
          break;

        case "searching_drivers":
          state.rideStatus = "selecting_car";
          break;

        case "driver_assigned":
          state.rideStatus = "selecting_car";
          break;

        case "trip_started":
          state.rideStatus = "driver_assigned";
          break;

        case "trip_ended":
          state.rideStatus = "idle";
          state.destination = null;
          break;
      }
    },
  },
});

export const rideFlowReducer = RideFlowSlice.reducer;

export const {
  setRideId,
  setOrigin,
  setDestination,
  setTravelInfo,
  setSelectedCar,
  setSelectedDriver,
  setDriverPosition,
  startTrip,
  endTrip,
  startOver,
  setPrice,
  goBackRideState,
} = RideFlowSlice.actions;

export const selectOrigin = (state: RootState) => state.rideFlow.origin;
export const selectOriginDescription = (state: RootState) =>
  state.rideFlow.originDescription;

export const selectDestination = (state: RootState) =>
  state.rideFlow.destination;
export const selectDestinationDescription = (state: RootState) =>
  state.rideFlow.destinationDescription;

export const rideState = (state: RootState) => state.rideFlow.rideStatus;
export const selectedRideId = (state: RootState) => state.rideFlow.rideId;
export const selectPrice = (state: RootState) => state.rideFlow.price;

export const selectedCar = (state: RootState) => state.rideFlow.selectedCar;
export const selectedDriver = (state: RootState) =>
  state.rideFlow.selectedDriver;

export const driverArrived = (state: RootState) => state.rideFlow.driverArrived;
export const selectTripEndedAt = (state: RootState) =>
  state.rideFlow.tripEndedAt;

export const selectTravelTimeInformation = (state: RootState) =>
  state.rideFlow.travelTimeInformation;
