import { View, Platform } from 'react-native'
import React from 'react'
import { ContainerProps } from '@/types/PropsTypes'
import tw from "twrnc"

export default function Container({children , className} :ContainerProps) {
  return (
    <View style={tw`bg-white/90 flex-1 py-20 px-5`}>
      <View style={[tw`py -1` , className ? tw`${className}` : null , tw`${Platform.OS ==="android" ? "mt-10" : "mt-0"}`]}>{children}</View>
    </View>
  )
}