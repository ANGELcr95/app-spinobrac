//Dependencies react Natigation && elemets
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

//Styles Icons
import GLOBALS from '../../../Globals';
import { shortDate } from '../../../custom/timeDate';
import { Avatar } from 'react-native-paper';


// se crea componente exclusivamente para poder configurar estilos
const StaticsTaskModal = ({task}) => {
const [date, setdate] = useState(null)

  useEffect(() => {
    setdate(shortDate(task.date))
  }, [task.date])
  

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <View style={styles.containerTittles}>
          <Text style={styles.containerLabel}>Reportado por:</Text>
          <Text style={styles.containerLabel}>{task.type_risk}</Text>
        </View>
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
          </View>
        </View>
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
    containerTittles: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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

export default StaticsTaskModal