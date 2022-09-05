import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'

// se crae componente exclusivamente para poder configurar estilos
const TaskItem = ({task, handleDelete}) => {

  const navigation = useNavigation()

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
      onPress={()=>navigation.navigate('TaskFormScreen', {id: task.id})}
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