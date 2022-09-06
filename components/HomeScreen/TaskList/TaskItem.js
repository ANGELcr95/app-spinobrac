import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { toggleRouteId } from '../../../redux/routeSlice'
import useUpContext from '../../../context/useUpContext'

// se crae componente exclusivamente para poder configurar estilos
const TaskItem = ({task, handleDelete}) => {
  const context = useUpContext()

  
  const navigation = useNavigation()
  const dispatch = useDispatch();

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
      onPress={()=>{
        navigation.navigate('ReportScreen', {id: task.id})
        dispatch(toggleRouteId(task.id))
        context.upRoutedId(task.id)

      }}
      >
        <Text style={styles.itemTitle}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.buttonDelete}
        onPress={()=> handleDelete(task.id)}
        >
        <Text style={styles.textButtonDelete}> Delete </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#333333',
        padding: 20,
        marginVertical: 8,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemTitle: {
        color: '#ffffff'
    },
    description: {
        color: 'gray'
    }, 
    buttonDelete: {
        backgroundColor: '#ee5253',
        paddingHorizontal: 4,
        paddingVertical: 10,
        borderRadius: 5
    },
    textButtonDelete: {
        color: '#ffffff'
    }
})

export default TaskItem