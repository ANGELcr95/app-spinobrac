import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import GLOBALS from '../../Globals'

const Layout = ({children}) => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={GLOBALS.COLOR.PRIMARY}/>
        { children }
    </View>
  )
}

const styles =  StyleSheet.create({ // creo  estyles dentro de esteobject que funciona como clases
    container: {
        backgroundColor: GLOBALS.COLOR.PRIMARY,
        padding: 20,
        flex:1,
        alignItems: 'center'
    }
})

export default Layout