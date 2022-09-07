//Dependencies react Natigation && elemets
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'

//Redux && context
import { useDispatch } from 'react-redux'
import { toggleRouteId } from '../../../redux/routeSlice'
import useUpContext from '../../../context/useUpContext'

//Styles Icons
import { AntDesign } from '@expo/vector-icons'; 
import GLOBALS from '../../../Globals'
import { shortDate } from '../../../custom/timeDate'


// se crea componente exclusivamente para poder configurar estilos
const TaskItem = ({task, handleDelete}) => {
const [date, setdate] = useState(null)

  const context = useUpContext()
  const navigation = useNavigation()
  const dispatch = useDispatch();

  useEffect(() => {
    setdate(shortDate(task.date))
  }, [task.date])
  

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
      onPress={()=>{
        navigation.navigate('ReportScreen', {id: task.id})
        dispatch(toggleRouteId(task.id))
        context.upRoutedId(task.id)

      }}
      >
        <Text style={styles.itemTitle}>👷{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <Text style={styles.date}>{date}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={()=> handleDelete(task.id)}
        >
         <AntDesign name="delete" size={GLOBALS.SIZE.MEDIUM} color={GLOBALS.COLOR.ICON_DELETE} />
      </TouchableOpacity>
    
    </View>
  )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: GLOBALS.COLOR.SECONDARY,
        padding: 18,
        marginVertical: 2,
        borderRadius: 30,
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
    date: {
      color: GLOBALS.COLOR.ICONS,
      fontStyle: 'italic',
      fontSize: GLOBALS.FONT.EXTRA_SMALL
    }, 
    buttonDelete: {
        paddingHorizontal: 4,
        paddingVertical: 10,
        borderRadius: 5
    },
    textButtonDelete: {
        color: '#ffffff'
    }
})

export default TaskItem