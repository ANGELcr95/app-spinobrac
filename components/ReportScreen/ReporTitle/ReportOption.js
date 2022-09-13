import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import useUpContext from '../../../context/useUpContext';
import { useEffect } from 'react';
import GLOBALS from '../../../Globals'
import { useState } from 'react';

const ReportOption = ({title, colores}) => {

  const navigation = useNavigation();
  const context = useUpContext();

  const changeOptions = () => {
    if (title === 'Reportar') {
        context.routedId && context.upOption(context.routedId)
        context.upRoutedId(null)
        return
    }
    context.option && context.upRoutedId(context.option)
 
  }

  return (
    
    <TouchableOpacity 
        onPress={() =>{
  
            changeOptions()
        }}
        activeOpacity={0.9}
        style={styles.option} >
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={{ 
            backgroundColor: colores,
            height:6,
            width: '80%',
            borderRadius:2
            }}>
        </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    option: {
        width: '30.2%',
        borderRadius: 10,
        backgroundColor: GLOBALS.COLOR.PRIMARY,
        flexDirection: 'column', 
        alignItems: 'center',
        zIndex: 1,
        paddingBottom: 6,
        opacity: 1
    },
    header: {
    
    },
    headerText: {
        fontSize: GLOBALS.FONT.MEDIUM,
        fontWeight: GLOBALS.WEIGHT.MEDIUM,
        color: GLOBALS.COLOR.THETIARY
    },
    containerBullet: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
    }
  });

export default ReportOption