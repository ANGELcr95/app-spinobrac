//Dependencies react Natigation && elemets
import React, { View, Text, StyleSheet, Image } from 'react-native'
import {TouchableOpacity} from "react-native";

//Components
import LayoutLogin from '../components/Layouts/LayoutLogin'

// Globas variables
import GLOBALS from '../Globals'

//Services
import { userLogin } from '../services/login';

//Styles
import { TextInput } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import useUpContext from '../context/useUpContext';

const LoginScreen = () => {

  const [password, setPassword] = useState(true)
  const [loginUser, setLoginUser] = useState({
    dni: null,
    password: null
  })
  const [warning, setWarning] = useState('')

  const context = useUpContext();

  const handleChange = (name, value) => setLoginUser({ ...loginUser, [name]: value });

  const handleSubmit = async () => {
      const res = await userLogin(loginUser)
      console.log(res);
      
      if (res) {
        setWarning('')
        context.upUser({
          dni: res.document_number,
          name: res.name,
          file:res.file,
          role:res.role
        })
        return
      }

      setWarning('Comuniquese con administrador o revise que los campos esten correctamente diligenciados')
      
  };

  // useEffect(() => {
  //   console.log(loginUser);
    
  //   // task.title && task.description ? setdisabled(false) : setdisabled(true)
  // }, [loginUser])

  return (
    <LayoutLogin>
      <Image
        style={styles.logo}
        source={require('../assets/icon.png')}
      />
      <View style={styles.containerForm}>
        <TextInput
            style={styles.input}
            mode="outlined"
            onChangeText={(number) => handleChange('dni', number)}
            keyboardType="numeric"
            editable={true}
            label="# identifiacion"
            outlineColor={GLOBALS.COLOR.SECONDARY}
            theme={{ colors: { primary: GLOBALS.COLOR.ICONS } }}
          />
        <TextInput
            style={styles.input}
            mode="outlined"
            onChangeText={(password) => handleChange('password', password)}
            secureTextEntry={password}
            editable={true}
            label="Contraseña"
            right={
            <TextInput.Icon icon="eye"
              onPressIn={()=> setPassword(false)}
              onPressOut={()=> setPassword(true)}
             />}
            outlineColor={GLOBALS.COLOR.SECONDARY}
            theme={{ colors: { primary: GLOBALS.COLOR.ICONS } }}
          />
           <TouchableOpacity
          mode="contained-tonal"
          onPress={handleSubmit}
          activeOpacity={0.9}
          style={styles.boxLogin}
          ><Entypo name="login" size={GLOBALS.SIZE.SMALL} color={GLOBALS.COLOR.WHITE} />
            <Text style={styles.meniTitle}>Iniciar</Text>
          </TouchableOpacity>
          <View style={styles.boxWarning}>
            <Text style={styles.warningText}>{warning}</Text>
          </View>
      </View>
    </LayoutLogin>
  )
}

const styles =  StyleSheet.create({ // creo  estyles dentro de esteobject que funciona como clases
  logo: {
    height: 100,
    width: 120,
  },
  containerForm: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    width: '70%',
    marginTop: 5,
  },
  boxLogin: {
    marginTop: 5, 
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GLOBALS.COLOR.PRIMARY,
    borderRadius: 10,
    width: '70%',
    marginHorizontal: '5%'
  },
  meniTitle: {
    fontSize: GLOBALS.FONT.BIG,
    color: GLOBALS.COLOR.THETIARY,
    marginLeft: 10
  },
  boxWarning: {
    marginTop: 10,
  },
  warningText:{
    color: GLOBALS.COLOR.RED,
    fontSize: GLOBALS.FONT.SMALL,
    textAlign: 'center'
  }
})

export default LoginScreen