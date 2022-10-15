import { View, Text } from 'react-native'
import React from 'react'
import { DrawerNavigator, StackLoginScreen } from '../App'
import { useState } from 'react'
import { useEffect } from 'react'
import useUpContext from '../context/useUpContext'

//LocalStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitScreen = () => {
  const context = useUpContext();
  useEffect(() => {
    (async()=> {
      const jsonValue = await AsyncStorage.getItem('@storage_User')
      jsonValue != null && context.upUser(JSON.parse(jsonValue))
    })()
  }, [context.user.dni])
  

  return (
    <View style={{flex:1}}>
      { context.user.dni ? (<DrawerNavigator />): <StackLoginScreen/> }
    </View>
  )
}

export default InitScreen