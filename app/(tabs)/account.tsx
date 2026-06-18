import Container from '@/components/common/Container'
import { logout } from '@/store/slices/authSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import React from 'react'
import tw from "twrnc"
import { Text, TouchableOpacity } from 'react-native'

export default function Account() {
  const dispacth = useAppDispatch()
  const name = useAppSelector((state)=>state.auth.user?.name)
  return (
    <Container>
      <TouchableOpacity onPress={()=>{dispacth(logout())}} style={tw`bg-red-600 p-4 rounded-2xl active:bg-red-600`}
        activeOpacity={0.85}>
        <Text style={tw`text-center text-white font-bold text-base`}>
          logout
        </Text>
      </TouchableOpacity>
      <Text  style={tw`text-center font-bold text-base`}>
        {name}
      </Text>
    </Container>
  )
}