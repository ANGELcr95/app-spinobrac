//Dependencies react Natigation && elemets
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'

//Components
import AwesomeAlert from 'react-native-awesome-alerts';

//Redux && context
import { useDispatch } from 'react-redux'
import { toggleRouteId } from '../../../redux/routeSlice'
import useUpContext from '../../../context/useUpContext'

//Styles Icons
import { AntDesign } from '@expo/vector-icons'; 
import GLOBALS from '../../../Globals'
import { shortDate } from '../../../custom/timeDate'
import { Avatar } from 'react-native-paper';



// se crea componente exclusivamente para poder configurar estilos
const ActivityItem = ({task, handleDelete}) => {
const [date, setdate] = useState(null)
const [showAlert, setShowAlert] = useState(false)

  const context = useUpContext()
  const navigation = useNavigation()
  const dispatch = useDispatch();

  useEffect(() => {
    setdate(shortDate(task.date))
  }, [task.date])
  

  return (
    <View style={styles.itemContainer}>
        <AwesomeAlert
          show={showAlert}
          // showProgress={false}
          title="Eliminar"
          titleStyle={{fontSize:36,marginBottom:10}}
          messageStyle={{fontSize:16,marginBottom:10,textAlign:'center', color:GLOBALS.COLOR.SECONDARY, fontWeight:GLOBALS.WEIGHT.MEDIUM}}
          message= {`Eliminara reporte (${task.description}) de ${task.title}`}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancelar"
          confirmText="Eliminar"
          cancelButtonStyle={{width:100,alignItems:'center'}}
          confirmButtonStyle={{width:100,alignItems:'center'}}
          confirmButtonColor={GLOBALS.COLOR.RED}
          cancelButtonColor={GLOBALS.COLOR.ICONSDOWN}
          onCancelPressed={() => {
            setShowAlert(false)
          }}
          onConfirmPressed={() => {
            handleDelete(task.id)
            setShowAlert(false)
          }}
        />
      <TouchableOpacity
      style={styles.itemContainerData}
      onPress={()=>{
        navigation.navigate('Reporte', {id: task.id})
        dispatch(toggleRouteId(task.id))
        context.upRoutedId(task.id)

      }}
      >
        <View  style={styles.itemContainerImage} >
          {task.file ? <Avatar.Image source={{ uri: task.file }} size={50} /> : <Avatar.Image size={50} source={require('../../../assets/img/worker.png')}/>}
        </View>
        <View>
          <Text style={styles.itemTitle}>👷{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={()=> {
         
          setShowAlert(true);
        }}
        >
         <AntDesign name="delete" size={GLOBALS.SIZE.MEDIUM} color={GLOBALS.COLOR.ICON_DELETE} />
      </TouchableOpacity>
    
    </View>
  )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: GLOBALS.COLOR_TRANSAPARENT.SECONDARY,
        padding: 18,
        marginVertical: 2,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemContainerData: {
      flexDirection: 'row',
      alignItems: 'center',
      width:'70%',
    },
    itemContainerImage: {
      marginRight: 10
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

export default ActivityItem