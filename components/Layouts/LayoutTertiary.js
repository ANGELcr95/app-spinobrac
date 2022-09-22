import React from 'react'
import { View, StyleSheet, StatusBar, ImageBackground } from 'react-native'
import GLOBALS from '../../Globals'


const LayoutTertiary = ({children}) => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={GLOBALS.COLOR.PRIMARY}/>
        <ImageBackground source={require('../../assets/wallpaper/ONE.png')} resizeMode="cover" style={styles.image}>
        { children }
        </ImageBackground>
    </View>
  )
}

const styles =  StyleSheet.create({ // creo  estyles dentro de esteobject que funciona como clases
    container: {
      backgroundColor: GLOBALS.COLOR.THETIARY,
      flex:1,
      position: 'relative',
    },
    image: {
      flex: 1,
    },
})

export default LayoutTertiary