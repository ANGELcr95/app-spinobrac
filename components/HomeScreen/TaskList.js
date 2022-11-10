import { FlatList, RefreshControl, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deleteTask, getTasks } from '../../services/reports'

import TaskItem from './TaskList/TaskItem'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setTask } from '../../redux/dataTasksSlice'
import { getWorkers } from '../../services/workers'
import { setWorkers } from '../../redux/dataWorkersSlice'
import Loading from '../Loading'
import io from 'socket.io-client'
import GLOBALS from '../../Globals'
import useUpContext from '../../context/useUpContext'

const socket = io(`${GLOBALS.API}`)

const TaskList = () => {

  const [tasks, setTasks] = useState([])
  const [refreshing, setrefreshing] = useState(false)

  const context = useUpContext();
  const isFocused = useIsFocused() // sabe si retorne a la p=agina funciona como true o false
  const dispatch = useDispatch();

  const loadReports = async () => {
    const data = await getWorkers();
    let names = data.map(function (element) {
      let data = {
        label: element.name,
        value: element.name,
        file: element.file,
        document_number: element.document_number,
      };
      return data;
    });

    dispatch(setWorkers(names))
  };

  const loadTasks = async () => {
    const data = await getTasks()
    data.reverse()
    !data.status ? setTasks(data) : setTasks([])
    dispatch(setTask(data))
  }

  useEffect(() => {
    socket.on("socketReport", (id) => {
      context.upSocketReport(id)
    });

    return () => {
      socket.off("socketReport", (id) => {
        context.upSocketReport(id)
      });
    };
  }, []);

  useEffect(() => {
    loadTasks()
    loadReports()
  }, [isFocused, context.socketReport])

  const onRefresh = React.useCallback(async() => { // esto solo es para poder usar aasync y await con ese mtodo nativo 
    setrefreshing(true)
    await loadTasks()
    setrefreshing(false)
  })
  
  const handleDelete = async (id) => {
    await deleteTask(id)
    await loadTasks()
    socket.emit("socketReport");
  }

  const renderItem = ({item}) => {
    return <TaskItem task={item} handleDelete={handleDelete}/>
  }

  if (tasks && tasks.length == 0) {
    return (
      <View>
        <Loading/>
      </View>
    )
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