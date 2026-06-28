import React from "react"

export type ContainerProps = {
    children :React.ReactNode,
    className?:string
}

export type LatLng = {
  latitude: number;
  longitude: number;
  description?: string;
};

export type CreateRideProps = {
  user_id: string;
  driver_id: string;
  car_id: string;

  origin: string;
  destination: string;

  origin_lat: number;
  origin_lng: number;

  destination_lat: number;
  destination_lng: number;

  distance: number;
  duration: number;

  price: number;

  status: string;
};

