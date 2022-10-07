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
import { Avatar } from 'react-native-paper';


import AwesomeAlert from 'react-native-awesome-alerts';


// se crea componente exclusivamente para poder configurar estilos
const TaskItem = ({task, handleDelete}) => {
const [date, setdate] = useState(null)
const [showAlert, setShowAlert] = useState(false)

  const context = useUpContext()
  const navigation = useNavigation()
  const dispatch = useDispatch();

  useEffect(() => {
    setdate(shortDate(task.date))
  }, [task.date])
  

  return (
    <View style={styles.container}>
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
      <View style={styles.containerTitle}>
        <Text style={styles.containerLabel}>Reportado por:</Text>
        <Text style={styles.containerName}>{task.administrativo}</Text>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.itemContainerData}>
          <View  style={styles.itemContainerImage} >
            {task.file ? <Avatar.Image source={{ uri: task.file }} size={50} /> : <Avatar.Image size={50} source={require('../../../assets/img/worker.png')}/>}
          </View>
          <View>
            <Text style={styles.itemTitle}>{task.title}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.description}>{task.description}</Text>
            {task.document_admin == context.user.dni ?
            <TouchableOpacity
              style={styles.updateBtn}
              onPress={()=>{
                navigation.navigate('Reporte', {id: task.id})
                dispatch(toggleRouteId(task.id))
                context.upRoutedId(task.id)
              }}
            >
              <Text style={styles.updateBtnText}>Actualizar</Text>
            </TouchableOpacity> : null
            }
          </View>
        </View>
        {task.document_admin == context.user.dni ?
          <TouchableOpacity 
            onPress={()=> {
            
              setShowAlert(true);
            }}
            >
            <AntDesign name="delete" size={GLOBALS.SIZE.MEDIUM} color={GLOBALS.COLOR.ICON_DELETE} />
          </TouchableOpacity>: null
        }
      </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: GLOBALS.COLOR_TRANSAPARENT.THETIARY,
      padding: 18,
      borderRadius: 20,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      shadowColor: GLOBALS.COLOR.SECONDARY,
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      
      elevation: 20,
      marginHorizontal: 10,
      marginVertical: 7,
    },
    updateBtn:{
      backgroundColor: GLOBALS.COLOR_TRANSAPARENT.FIFTH,
      width: 75,
      textAlign: 'center',
      marginVertical: 10,
      paddingVertical:4,
      borderRadius: 20,
    },
    updateBtnText:{
      textAlign: 'center',
      color:GLOBALS.COLOR.WHITE,
      fontSize:GLOBALS.FONT.SMALL, 
    },
    containerLabel:{
      color: GLOBALS.COLOR_TRANSAPARENT.SECONDARY_MEDIUM,
      fontSize: GLOBALS.FONT.SMALL
    },
    containerName:{
      fontSize: GLOBALS.FONT.MEDIUM,
      fontWeight: GLOBALS.WEIGHT.SMALL,
    },
    containerTitle: {
      marginBottom: 10,
      paddingBottom: 10,
      borderBottomColor: GLOBALS.COLOR_TRANSAPARENT.SECONDARY,
      width: '100%',
      borderBottomWidth: 1
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',

    },
    itemContainerData: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      width:'70%',
    },
    itemContainerImage: {
      marginRight: 10
    },
    itemTitle: {
        color: GLOBALS.COLOR.BLACK,
        fontSize: GLOBALS.FONT.MEDIUM,
        fontWeight: GLOBALS.WEIGHT.MEDIUM,
    },
    description: {
        color: 'gray'
    },
    date: {
      color: GLOBALS.COLOR.PRIMARY,
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