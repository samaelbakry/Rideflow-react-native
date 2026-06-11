import { View, Platform, SafeAreaView } from 'react-native'
import React from 'react'
import { ContainerProps } from '@/types/PropsTypes'
import tw from "twrnc"

export default function Container({children , className} :ContainerProps) {
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={[tw`p-5` , className ? tw`${className}` : null , tw`${Platform.OS ==="android" ? "mt-10" : "mt-0"}`]}>{children}</View>
    </SafeAreaView>
  )
}