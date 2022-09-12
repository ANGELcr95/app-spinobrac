import { FlatList, RefreshControl, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deleteTask, getTasks } from '../../services/reports'

import TaskItem from './TaskList/TaskItem'
import { useIsFocused } from '@react-navigation/native'

const TaskList = () => {

  const [tasks, setTasks] = useState([])
  const [refreshing, setrefreshing] = useState(false)

  const isFocused = useIsFocused() // sabe si retorne a la pagina funciona como true o false

  const loadTasks = async () => {
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadTasks()
  }, [isFocused])

  const onRefresh = React.useCallback(async() => { // esto solo es para poder usar aasync y await con ese mtodo nativo 
    setrefreshing(true)
    await loadTasks()
    setrefreshing(false)
  })
  
  const handleDelete = async (id) => {
    await deleteTask(id)
    await loadTasks()
  }

  const renderItem = ({item}) => {
    return <TaskItem task={item} handleDelete={handleDelete}/>
  }

  return (
    <FlatList
      style={{ width: '100%' }}
      data={tasks}
      keyExtractor={(item) => `${item.id} `}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          colors={['#78e08f']}
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor='gray'
        />}
  />
  )
}

export default TaskList