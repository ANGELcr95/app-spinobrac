import { View, Text } from 'react-native'
import React from 'react'
import { DrawerNavigator, StackLoginScreen } from '../App'
import { useState } from 'react'
import { useEffect } from 'react'
import useUpContext from '../context/useUpContext'

const InitScreen = () => {
  const context = useUpContext();
  useEffect(() => {
    console.log(context.user);
  }, [context.user.dni])
  

  return (
    <View style={{flex:1}}>
      { context.user.dni ? (<DrawerNavigator />): <StackLoginScreen/> }
    </View>
  )
}

export default InitScreen