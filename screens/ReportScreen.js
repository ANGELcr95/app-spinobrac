import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LayoutSecondary from '../components/Layouts/LayoutSecondary'
import ReportTitle from '../components/ReportScreen/ReportTitle'
import HeaderSecondary from '../components/Layouts/LayoutSecondary/HeaderSecondary'

const ReportScreen = ({ route }) => {

  return (
    <LayoutSecondary>
      <HeaderSecondary title={route.name} />
      <ReportTitle/>
      <View style={styles.cotainer}>
        <Text>Estaditicas</Text>
      </View>
    </LayoutSecondary>
  )
}
const styles = StyleSheet.create({
  cotainer:{
    position: 'relative',
    top: 190,
    flex: 1,
    zIndex: 1
  }
})  

export default ReportScreen