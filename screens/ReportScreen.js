import { Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import Layout from '../components/Layouts/Layout'
import { getTask, saveTask, updateTask } from '../api'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { toggleRouteId } from '../redux/routeSlice'
import useUpContext from '../context/useUpContext'
import {timeDate} from '../custom/timeDate'

const ReportScreen = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    date: ''
  })

  // const dispatch = useDispatch();
  // let [routeId] = useSelector((state) => state.routeId)
  const context = useUpContext();

  const [editing, setEditing] = useState(false)
  const navigation = useNavigation()

  const handleChange = (name, value) => setTask({...task,[name]: value})

  const handleSubmit = async () => {
    try {
      if (context.routedId) {
        await updateTask(context.routedId, task)
        // dispatch(toggleRouteId(null))
        context.upRoutedId(null)
        setTask({
          title: '',
          description: '',
          date: ''
          }
        )
        setEditing(false)
      } else {
        await saveTask({
          title: task.title,
          description: task.description,
          date: timeDate()
          })
        setTask({
          title: '',
          description: '',
          date: ''
          }
        )
      }
      navigation.navigate('RiskScreen')
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (context.routedId) {
      navigation.setOptions({ headerTitle: 'Actualizar reporte'});
      (async()=> {
        const task = await getTask(context.routedId)
        setTask({
          title: task.title,
          description: task.description,
          date: task.date
        })
        setEditing(true)
      })()
    }
  }, [context.routedId, task])

  return (
    <Layout>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('title', text)}
        placeholder='Empleado'
        value={task.title}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('description', text)}
        placeholder='Descripcion Reporte'
        value={task.description}
      />

      {editing ? (
           <TouchableOpacity
           style={styles.buttonUpdate}
           onPress={handleSubmit}
         >
           <Text style={styles.buttonText}>Actualizar</Text>
         </TouchableOpacity>

      ):(
        <TouchableOpacity
        style={styles.buttonSave}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Reportar</Text>
      </TouchableOpacity>
      )

      }

    </Layout>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    textAlign: 'center'
  },
  buttonSave: {
    padding:10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#00722e',
    width:'90%',
    marginTop: 10
  },
  buttonUpdate: {
    padding:10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#288ba8',
    width:'90%',
    marginTop: 10
  },
  buttonText: {
    textAlign:'center',
    fontWeight:'bold',
    color:'#ffffff'
  }
})

export default ReportScreen