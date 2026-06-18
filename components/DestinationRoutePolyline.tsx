import React from 'react'
import { Polyline } from 'react-native-maps'

export default function DestinationRoutePolyline({routeCoords}:{routeCoords:any}) {
  return (
    <>
       <Polyline
              coordinates={routeCoords}
              strokeWidth={8}
              strokeColor="rgba(255,255,255,0.9)"
              lineCap="round"
              lineJoin="round"
            />
            <Polyline
              coordinates={routeCoords}
              strokeWidth={5}
              strokeColor="#007AFF"
              lineCap="round"
              lineJoin="round"
            />

            <Polyline
              coordinates={routeCoords}
              strokeWidth={2}
              strokeColor="#ffffff"
              lineDashPattern={[1, 9]}
              lineCap="round"
            />
    </>
  )
}