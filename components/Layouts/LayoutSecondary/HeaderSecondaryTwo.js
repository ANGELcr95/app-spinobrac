import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import GLOBALS from '../../../Globals'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const HeaderSecondaryTwo = ({title}) => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonMenu}
        onPress={() => navigation.toggleDrawer()}
      >
        <MaterialIcons  name="menu-open" size={GLOBALS.SIZE.EXTRA_BIG} color={GLOBALS.COLOR.ICONSDOWN} />
      </TouchableOpacity>
      <View style={styles.containerHeader}>
        <Text style={styles.header}>{title}</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.navigate('WorkerScreen')}
      >
        <AntDesign name="left" size={GLOBALS.SIZE.BIG} color={GLOBALS.COLOR.ICONSDOWN} />
      </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width:'100%',
    backgroundColor:GLOBALS.COLOR.SECONDARY
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
  },
  buttonBack: {
    position: 'absolute',
    right: 15,
    top: 10,
  }

})

export default HeaderSecondaryTwo