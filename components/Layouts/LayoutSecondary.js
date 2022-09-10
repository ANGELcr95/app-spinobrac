import React, { useEffect, useState } from 'react'
import { View, StyleSheet, StatusBar, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import useUpContext from '../../context/useUpContext';
import GLOBALS from '../../Globals'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const LayoutSecondary = ({children}) => {
  const context = useUpContext();
  const navigation = useNavigation()
  const [title, setTitle] = useState(null)
  
  useEffect(() => {
    setTitle(context.title)
  }, [context.title])
  
  
  return (
    <View style={styles.screen}>
        <StatusBar backgroundColor={GLOBALS.COLOR.PRIMARY} />
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.header}>{title}</Text>
          </View>
          <TouchableOpacity
          style={styles.buttonMenu}
          onPress={() => navigation.toggleDrawer()}
          >
          <MaterialIcons  name="menu-open" size={GLOBALS.SIZE.EXTRA_BIG} color={GLOBALS.COLOR.ICONSDOWN} />
          </TouchableOpacity>
        </View>
        { children }
    </View>
  )
}
const styles = StyleSheet.create({
  screen:{
    flex:1,
    position:'relative'
  },
  container: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width:'100%',
    height: 150,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    backgroundColor:GLOBALS.COLOR.PRIMARY
  },
  containerHeader: {
    position: 'absolute',
    alignItems: 'center',
    top: 8, 
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    fontSize:GLOBALS.FONT.EXTRA_BIG,
    color: GLOBALS.COLOR.THETIARY,
    fontWeight: GLOBALS.WEIGHT.MEDIUM,
  },
  buttonMenu: {
    marginLeft: 15,
    marginTop: 8,
  }

})
export default LayoutSecondary