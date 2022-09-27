import { useIsFocused } from '@react-navigation/native'
import React from 'react'
import { useEffect } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import GLOBALS from '../../Globals'

const LayoutFourth = ({children}) => {
  const isFocused = useIsFocused();

  return (
    <View style={styles.screen}>
        <StatusBar backgroundColor={GLOBALS.COLOR.PRIMARY} hidden={isFocused} />
        { children }
    </View>
  )
}
const styles = StyleSheet.create({
  screen:{
    flex:1,
    position:'relative'
  }
})
export default LayoutFourth