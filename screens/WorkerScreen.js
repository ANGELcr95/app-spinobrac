import LayoutSecondary from '../components/Layouts/LayoutSecondary'
import React from 'react'
import HeaderSecondary from '../components/Layouts/LayoutSecondary/HeaderSecondary'
import WorkerForm from '../components/WorkerScreen/WorkerForm'
import { StyleSheet, Text, View } from 'react-native'
import WorkList from '../components/WorkerScreen/WorkList'
import { useState } from 'react'

const WorkerScreen = ({ route }) => {
  const [newUser, setNewUser] = useState(false)

  return (
    <LayoutSecondary>
      <HeaderSecondary title={route.name} />
      <WorkerForm setNewUser={setNewUser} newUser={newUser}/>
      <View style={styles.cotainer}>
        <WorkList newUser={newUser}/>
      </View>
    </LayoutSecondary>
  )
}

const styles = StyleSheet.create({
  cotainer:{
    top:135,
    zIndex: 1,
    paddingHorizontal: 25,
    height:'80%'
  }
})  

export default WorkerScreen