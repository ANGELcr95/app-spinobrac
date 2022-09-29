import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import useUpContext from '../context/useUpContext'
import GLOBALS from '../Globals'
import { Avatar } from 'react-native-paper';

import { SimpleLineIcons } from '@expo/vector-icons';
import { mostrarSaludo } from '../custom/timeDate';


const Profile = () => {
  const context =  useUpContext()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        mode="contained-tonal"
        onPress={() => context.upUser({
          dni:null,
          name: null,
          file:null
        })}
        activeOpacity={0.9}
        style={styles.boxLogout}
        ><SimpleLineIcons name="logout" size={GLOBALS.SIZE.SMALL} color={GLOBALS.COLOR.THETIARY} />
      </TouchableOpacity>
      <View style={styles.profile}>
        <View>
          {context.user.file ? <Avatar.Image source={{ uri: context.user.file }} size={100} /> : <Avatar.Image  size={100} source={require('../assets/img/worker.png')}/>}
        </View>
        <View>
          <Text style={styles.name}>!Hola</Text><Text style={styles.fullName}>{context.user.name}</Text>
        </View>
        <View>
          <Text style={styles.greeting}>{mostrarSaludo()}</Text>
        </View>
      </View>

    </View>
  )
}

const styles =  StyleSheet.create({ // creo  estyles dentro de esteobject que funciona como clases
  container: {
    backgroundColor: GLOBALS.COLOR.PRIMARY,
    paddingBottom: 70,
    padding:10,
    width:'100%',
    alignItems: 'center',
  
  },
  boxLogout: {
    position:'absolute',
    left:10,
    top:10,
    
  },
  profile: {
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: GLOBALS.FONT.BIG,
    fontWeight: GLOBALS.WEIGHT.SMALL,
    color: GLOBALS.COLOR.THETIARY,
    textAlign: 'center',
  },
  fullName: { 
    fontSize: GLOBALS.FONT.BIG,
    fontWeight: GLOBALS.WEIGHT.SMALL,
    color: GLOBALS.COLOR.THETIARY,
    textAlign: 'center',
    fontWeight: GLOBALS.WEIGHT.MEDIUM,
  },
  greeting: {
    fontSize: GLOBALS.FONT.MEDIUM,
    color: GLOBALS.COLOR.THETIARY,
  }
})

export default Profile
