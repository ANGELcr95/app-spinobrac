import { Text, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import GLOBALS from '../../Globals';
import { saveWork } from '../../services/workers';

import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { useEffect } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';


const WorkerForm = ({ setNewUser, newUser }) => {
  const [worker, setWorker] = useState({
    name: '',
    dni: null,
  });
  const [disabled, setdisabled] = useState(true)

  const handleChange = (name, value) => setWorker({ ...worker, [name]: value });

  const handleSubmit = async () => {
    try {
      await saveWork({
        name: worker.name,
        dni: worker.dni,
      });
      setWorker({ name: '', dni: null });
      setNewUser(!newUser);
      setdisabled(true)
      setShowAlert(true);
      


    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    worker.dni && worker.name ? setdisabled(false) : setdisabled(true)
  }, [worker])

    const [showAlert, setShowAlert] = useState(false)
 


  return (
    <View style={styles.cotainer}>
        <AwesomeAlert
          show={showAlert}
          // showProgress={false}
          title="Exitoso"
          titleStyle={{fontSize:36,marginBottom:10}}
          messageStyle={{fontSize:16,marginBottom:10}}
          message="Registro agregado satisfactoriamente"
          closeOnTouchOutside={false}
          // closeOnHardwareBackPress={false}
          // showCancelButton={true}
          showConfirmButton={true}
          // cancelText="No"
          confirmText="Cerrar"
          // cancelButtonStyle={{width:100,alignItems:'center',marginTop:10}}
          confirmButtonStyle={{width:180,alignItems:'center',}}
          confirmButtonColor="green"
          // cancelButtonColor="#DD6B55"
        //   onCancelPressed={() => {
        //  setShowAlert(false)
        //   }}
          onConfirmPressed={() => {
         setShowAlert(false)
          }}
        />

      <TextInput
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
        onChangeText={(number) => handleChange('dni', number)}
        label="Cedula"
        value={worker.dni}
        outlineColor={GLOBALS.COLOR.SECONDARY}
        theme={{ colors: { primary: GLOBALS.COLOR.ICONS } }}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        onChangeText={(text) => handleChange('name', text)}
        label="Nombre"
        value={worker.name}
        outlineColor={GLOBALS.COLOR.SECONDARY}
        theme={{ colors: { primary: GLOBALS.COLOR.ICONS } }}
      />
      <Button
        disabled={disabled}
        mode="contained-tonal"
        onPress={handleSubmit}
        buttonColor={GLOBALS.COLOR.FOURTH}
        textColor={GLOBALS.COLOR.WHITE}
      >
        <Text style={styles.buttonText}>Agregar</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginLeft: '10%',
    backgroundColor: GLOBALS.COLOR_TRANSAPARENT.THETIARY,
    shadowColor: GLOBALS.COLOR.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    top: 100,
    paddingTop: 10,
    borderRadius: 25,
  },

  input: {
    width: '80%',
  },
  buttonSave: {
    padding: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: GLOBALS.COLOR.RED,
    width: '60%',
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  cotainerDropDown: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  dropdown: {
    height: 50,
    width: '80%',
    borderColor: GLOBALS.COLOR.PRIMARY,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    color: 'black',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: GLOBALS.COLOR_TRANSAPARENT.THETIARY,
    left: 40,
    top: -7,
    zIndex: 999,
    fontSize: 12,
    paddingHorizontal: 7,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default WorkerForm;
