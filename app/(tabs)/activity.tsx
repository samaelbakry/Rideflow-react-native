import Container from '@/components/common/Container'
import { selectedDriver } from '@/store/slices/rideFlowSlice';
import { useAppSelector } from '@/store/store';
import React from 'react'
import { Text } from 'react-native'

export default function Activity() {
   const driver = useAppSelector(selectedDriver);
  return (
    <Container>
      <Text>{JSON.stringify(driver)}</Text>
    </Container>
  )
}