import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import GLOBALS from '../../Globals'

const LayoutSecondary = ({children}) => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={GLOBALS.COLOR.PRIMARY} />
        { children }
    </View>
  )
}

const styles =  StyleSheet.create({ // creo  estyles dentro de esteobject que funciona como clases
    container: {
        backgroundColor: GLOBALS.COLOR.PRIMARY,
        paddingHorizontal: 20,
        flex:1,
        alignItems: 'center',
        position:'absolute',
        top:-60,
        zIndex:1000
    }
})

export default LayoutSecondary