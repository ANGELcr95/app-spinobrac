import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LayoutSecondary from '../components/Layouts/LayoutSecondary'
import HeaderSecondary from '../components/Layouts/LayoutSecondary/HeaderSecondary'
import StatisticsData from '../components/StatisticsScreen/StatisticsData'

const StatisticsScreen = ({ route }) => {

  return (
    <LayoutSecondary>
      <HeaderSecondary title={route.name} />
      <StatisticsData/>
    </LayoutSecondary>
  )
}


export default StatisticsScreen