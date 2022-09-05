import { Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'


import Layout from '../components/Layouts/Layout'
import { getTask, saveTask, updateTask } from '../api'

const TaskFormScreen = ({navigation, route}) => {  
  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const [editing, setEditing] = useState(false)

  const handleChange = (name, value) => setTask({...task,[name]: value})

  const handleSubmit = async () => {
    try {
      if (editing) {
        updateTask(route.params.id, task)
      } else {
        await saveTask(task)
      }
      navigation.navigate('HomeScreen')
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {
    if (route.params && route.params.id) {
      navigation.setOptions({ headerTitle: 'Updating a Task'});
      (async()=> {
        const task = await getTask(route.params.id)
        setTask({title: task.title, description: task.description})
      })()
      setEditing(true)
    }
  }, [])
  

  return (
    <Layout>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('title', text)}
        placeholder='Write Title'
        value={task.title}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange('description', text)}
        placeholder='Write Description'
        value={task.description}
      />

      {editing ? (
           <TouchableOpacity
           style={styles.buttonUpdate}
           onPress={handleSubmit}
         >
           <Text style={styles.buttonText}>Update Task</Text>
         </TouchableOpacity>

      ):(
        <TouchableOpacity
        style={styles.buttonSave}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Save Task</Text>
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

export default TaskFormScreen
