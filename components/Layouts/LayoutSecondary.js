import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import GLOBALS from '../../Globals'

const LayoutSecondary = ({children}) => {
  
  return (
    <View style={styles.screen}>
        <StatusBar backgroundColor={GLOBALS.COLOR.PRIMARY} />
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
export default LayoutSecondary