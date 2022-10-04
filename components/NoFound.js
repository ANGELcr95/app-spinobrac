
import React from "react";
import {Text ,View , Image , StyleSheet} from 'react-native' ;
import GLOBALS from '../Globals'
  
const NoFound = () => {
    return (
        <View style={Styles.container}>
          <Text style={Styles.containerText}>!Oppss</Text>
          <Text style={Styles.containerSub}>no hay informacion...</Text>
          <Image
            style ={{width: "100%", height:"70%"}}
            source={require('../assets/gift/404.gif') }
          />
        </View>
      );
}
  
const Styles = StyleSheet.create({
    container :{
      alignContent:'center',
      justifyContent:'center',
      flexDirection:'column',
    },
    containerText: {
      textAlign:'center',
      color: GLOBALS.COLOR.PRIMARY,
      fontWeight:GLOBALS.WEIGHT.EXTRA_BIG,
      fontSize:40,
    },
    containerSub:{
      textAlign:'center',
      color: GLOBALS.COLOR.PRIMARY,
      fontSize:20,
    }
})
  
export default NoFound;