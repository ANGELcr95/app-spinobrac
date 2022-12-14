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
    </LayoutSecondary>
  )
}


export default ReportScreen