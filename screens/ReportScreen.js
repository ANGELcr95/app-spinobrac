import { Text, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { getTask, saveTask, updateTask } from '../api'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { toggleRouteId } from '../redux/routeSlice'
import useUpContext from '../context/useUpContext'
import {timeDate} from '../custom/timeDate'
import LayoutSecondary from '../components/Layouts/LayoutSecondary'
import ReporForm from '../components/ReportScreen/ReporTitle/ReporForm'
import ReportTitle from '../components/ReportScreen/ReportTitle'

const ReportScreen = ({ route, navigation }) => {
  
  return (
    <LayoutSecondary>
      <ReportTitle route={route}  navigation={navigation} />
      <View style={styles.cotainer}>
      </View>
    </LayoutSecondary>
  )
}
const styles = StyleSheet.create({
  cotainer:{
    position: 'absolute',
    backgroundColor: 'blue',
   
    flex: 1,
    zIndex: 1
  }
})  

export default ReportScreen