import LayoutSecondary from '../components/Layouts/LayoutSecondary'
import React from 'react'
import HeaderSecondary from '../components/Layouts/LayoutSecondary/HeaderSecondary'
import WorkerForm from '../components/WorkerScreen/WorkerForm'
import { StyleSheet, Text, View } from 'react-native'
import WorkList from '../components/WorkerScreen/WorkList'
import { useState } from 'react'
import useUpContext from '../context/useUpContext'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GLOBALS from '../Globals'

const WorkerScreen = ({ route }) => {
  const [newUser, setNewUser] = useState(false)
  const context = useUpContext();

  return (
    <LayoutSecondary>
      <HeaderSecondary title={ context.user.role == 'Root'? route.name : 'Actualizar'} />
        { context.user.role == 'Root'? <WorkerForm setNewUser={setNewUser} newUser={newUser}/> : null}
        { context.user.role == 'Root'? null: 
          <View style={ styles.containerIcon}>
            <MaterialCommunityIcons name="file-edit" size={90} color={GLOBALS.COLOR.WHITE} />
          </View>
        }
        <View style={{
          top:context.user.role == 'Root' ? 135 : 0,
          zIndex: 1,
          paddingHorizontal: 25,
          height:context.user.role == 'Root' ? '60%' : '78%' 
        }}>
        <WorkList newUser={newUser} user={context.user.role}/>
      </View>
    </LayoutSecondary>
  )
}

const styles = StyleSheet.create({
  containerIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginLeft: '10%',
    top: 35,
    paddingTop: 10,
  }
})  

export default WorkerScreen