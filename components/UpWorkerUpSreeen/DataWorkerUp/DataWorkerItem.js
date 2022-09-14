import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import GLOBALS from '../../../Globals'

const DataWorkerItem = ({placeholder,value,code,handleChange,iconName}) => {
  return (
    <View style={styles.contain}>
        <Ionicons name={iconName} size={GLOBALS.SIZE.MEDIUM} color={GLOBALS.COLOR.THETIARY}/>
        <TextInput
            style={styles.input}         
            placeholder={placeholder}
            placeholderTextColor={GLOBALS.COLOR.FOURTH}
            value={value}
            underlineColorAndroid='transparent'
            textDecorationLine="none"
            onChangeText={(text) => handleChange(code, text)}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    contain: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginRight: 10,
    },
    input: {
      backgroundColor: GLOBALS.COLOR_TRANSAPARENT.PRIMARY,
      borderBottomWidth:1,
      color: GLOBALS.COLOR.THETIARY,
      borderBottomColor: GLOBALS.COLOR.THETIARY,
      height: 40,
      fontSize: GLOBALS.FONT.MEDIUM,
      alignItems: 'center',
      width: '80%',
      marginHorizontal: 10,
      textAlign: 'center'
    }
});

export default DataWorkerItem