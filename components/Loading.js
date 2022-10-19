
import React from "react";
import {Text ,View , Image , StyleSheet} from 'react-native' ;
import GLOBALS from '../Globals'
  
const Loading = ({w=110, h=110}) => {
    return (
        <View style={Styles.container}>
          <Image
            style ={{width:w, height:h}}
            source={require('../assets/gift/loading.gif') }
          />
        </View>
      );
}
  
const Styles = StyleSheet.create({
    container :{
      alignContent:'center',
      justifyContent:'center',
      flexDirection:'column',
      height :'100%',
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
  
export default Loading;