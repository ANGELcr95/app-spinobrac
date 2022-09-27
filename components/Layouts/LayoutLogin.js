import React from 'react'
import { View, StyleSheet, StatusBar, ImageBackground } from 'react-native'

const LayoutLogin = ({children}) => {
  return (
    <ImageBackground source={require('../../assets/wallpaper/LOGIN.jpg')} resizeMode="cover" style={styles.image}>
      <StatusBar hidden/>
      { children }
    </ImageBackground>
  )
}

const styles =  StyleSheet.create({ // creo  estyles dentro de esteobject que funciona como clases
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default LayoutLogin