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