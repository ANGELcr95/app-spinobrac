import { View, Text, StyleSheet,TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
// import { TextInput } from 'react-native-paper';
import GLOBALS from '../../Globals';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { shortDate, timeDate } from '../../custom/timeDate';
import { AntDesign } from '@expo/vector-icons';
import DataWorkerItem from './DataWorkerUp/DataWorkerItem';
import { Avatar } from 'react-native-paper';
import useUpContext from '../../context/useUpContext';
import { getWorker, saveWork, updateWork } from '../../services/workers';
import { useEffect } from 'react';

import AwesomeAlert from 'react-native-awesome-alerts';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';



import { Button } from 'react-native-paper'
import { useIsFocused, useNavigation } from '@react-navigation/native';

const DataWorkerUp = () => {
  const [data, setData] = useState({
    dni: null,
    name: '',
    password: '',
    eps: null,
    date_born: null,
    result:null,
    role:null,
  });

  const [role , setRole]= useState()
  const [disabled, setdisabled] = useState(true)
  const [passWord, setPassWord] = useState(null)
 
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertOut, setShowAlertOut] = useState(false)
 
  const context = useUpContext()
  const navigation = useNavigation()

  const [isFocus, setIsFocus] = useState(false);
  const isFocused = useIsFocused(); // sabe si retorne a la pagina funciona como true o false


  
  
  useEffect(() => {
    if (context.worker) {
      // navigation.setOptions({ headerTitle: 'Actualizar reporte' });
      (async () => {
        const worker = await getWorker(context.worker);
        setData({
          dni: worker.document_number,
          name: worker.name,
          password: '',
          eps: worker.eps,
          date_born:worker.date_born ? shortDate(worker.date_born): null,
          result: worker.file, 
          role: worker.role ? worker.role: 'Operativo'
        });
        setPassWord(worker.password);
        if ('Root' === worker.role) {
          setRole([
            {
              label:'Root',
              value:'Root'
            }
          ])
        } else {
          setRole([
            {
              label:'Administrativo',
              value:'Administrativo'
            }, 
            {
              label: 'Operativo',
              value: 'Operativo'
            }
          ])
        }
      })();
    }
  }, [context.worker, isFocused]);


  const handleChange = (name, value) => setData({ ...data, [name]: value });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      handleChange('result', result.uri) 
    }
  };

  const handleSubmit = async () => {
    let passwordUtil 
    if (data.role == 'Administrativo' || data.role == 'Root' ) {
      if (data.password ) {
        passwordUtil = data.password
      } else {
        passwordUtil = null
      }
    } else {
      passwordUtil = null
    }
    await updateWork(
      data.dni,
      {
      name: data.name,
      password: passwordUtil,
      eps: data.eps,
      date_born: data.date_born,
      file: data.result ? data.result :null,
      role: data.role
      }
    )
    setShowAlert(true);
  };

  useEffect(() => {
    if (data.role == 'Administrativo'|| data.role == 'Root') {
      if(data.password.length){
        data.name && data.password.length > 4 ? setdisabled(false) : setdisabled(true)  
      } else {
        data.name && passWord ? setdisabled(false) : setdisabled(true)  
      }
    } else {
      data.name ? setdisabled(false) : setdisabled(true)
    }
  }, [data, passWord])


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    handleChange('date_born', timeDate(date))
    
    hideDatePicker();
  };

  return (
    <View style={styles.contain}>
      <AwesomeAlert
          show={showAlert}
          // showProgress={false}
          title="Exitoso"
          titleStyle={{fontSize:36,marginBottom:10}}
          messageStyle={{fontSize:16,marginBottom:10,textAlign:'center', color:GLOBALS.COLOR.SECONDARY, fontWeight:GLOBALS.WEIGHT.MEDIUM}}
          message= {`Se ha guadado correctamente informacion de ${data.name}`}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Permanecer"
          confirmText="Salir"
          cancelButtonStyle={{width:100,alignItems:'center'}}
          confirmButtonStyle={{width:100,alignItems:'center'}}
          confirmButtonColor={GLOBALS.COLOR.FOURTH}
          cancelButtonColor={GLOBALS.COLOR.ICONSDOWN}
          onCancelPressed={() => {
            setShowAlert(false)
          }}
          onConfirmPressed={() => {
            setShowAlert(false)
            setShowAlertOut(true)
            navigation.navigate('WorkerScreen')
          }}
        />

        <TouchableOpacity onPress={pickImage}>
          {data.result ? <Avatar.Image source={{ uri: data.result }} size={100} /> : <Avatar.Image size={100} source={require('../../assets/img/worker.png')}/>}
        </TouchableOpacity>
        
        <View style={styles.item}>
          <AntDesign name="idcard" size={GLOBALS.SIZE.MEDIUM} color={GLOBALS.COLOR.THETIARY}/>
          <TextInput
          style={styles.input}
          editable={false}
          value={`${data.dni} `}
          
          />
        </View>
        <DataWorkerItem placeholder={'Nombre'} value={data.name} code={'name'}  handleChange={ handleChange} iconName={'person-circle'} />
          {context.user.role == 'Root'? (<>
        <View style={styles.cotainerDropDown}>
          <Ionicons name='body' size={GLOBALS.SIZE.MEDIUM} color={GLOBALS.COLOR.THETIARY}/>
          <Dropdown
              style={[
                  styles.dropdown,
                  isFocus && { 
                  borderColor: GLOBALS.COLOR.WHITE,
                  },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={role}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? data.role : '...'}
              value={data.role}
              defaultValue={data.role}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
              handleChange('role', item.value)
              setIsFocus(false);
            }}
          />
        </View>
        { data.role != 'Operativo' ? <DataWorkerItem placeholder={ passWord ? 'Existente': 'Nueva'}  code={'password'}  handleChange={ handleChange} iconName={'key'}/>: null } 
        </>)
        : null}
        <DataWorkerItem placeholder={'EPS'} value={data.eps} code={'eps'}  handleChange={ handleChange} iconName={'md-medkit-outline'}/>
        <View style={styles.item}>
          <TouchableOpacity>
            <AntDesign
              onPress={showDatePicker}
              name="calendar"
              size={GLOBALS.SIZE.MEDIUM}
              color={GLOBALS.COLOR.PRIMARY}
              />
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.input}
              onPress={()=>{
              handleChange('date_born', null)      
            }}
          >
            <TextInput
              style={styles.input}
              editable={false}
              value={data.date_born}
              placeholder='Selecciona Fecha'
              placeholderTextColor={GLOBALS.COLOR.FOURTH}
            />
           </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            />
        </View>

        <Button
          style={styles.button}
          disabled={disabled}
          mode="contained-tonal"
          onPress={handleSubmit}
          buttonColor={GLOBALS.COLOR.WHITE}
          textColor={GLOBALS.COLOR.WHITE}
          labelStyle={{ color: disabled && GLOBALS.COLOR.ICONSDOWN }}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </Button>
      </View>
  )
}

const styles = StyleSheet.create({
    contain: {
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      paddingVertical: 30,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
      marginRight: 10,

    },
    input: {
      backgroundColor: GLOBALS.COLOR_TRANSAPARENT.PRIMARY,
      borderBottomWidth:1,
      color: GLOBALS.COLOR.THETIARY,
      borderBottomColor: GLOBALS.COLOR.THETIARY,
      height: 40,
      fontSize: GLOBALS.FONT.MEDIUM,
      alignItems: 'center',
      width: '80%',
      marginHorizontal: 10,
      textAlign: 'center',
    },
    caldendar:{
      flexDirection: 'row',
      borderBottomColor: GLOBALS.COLOR.THETIARY,
      borderBottomWidth:1,
      height: 40,
      alignItems: 'center',
    },
    button:{
      marginTop:30
    },
    cotainerDropDown: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
      marginRight: 10,
    },
    dropdown: {
      backgroundColor: GLOBALS.COLOR_TRANSAPARENT.PRIMARY,
      borderBottomWidth:1,
      color: GLOBALS.COLOR.THETIARY,
      borderBottomColor: GLOBALS.COLOR.THETIARY,
      height: 40,
      fontSize: GLOBALS.FONT.MEDIUM,
      alignItems: 'center',
      width: '80%',
      marginHorizontal: 10,
      textAlign: 'center'
    },
    placeholderStyle: {
      fontSize:  GLOBALS.FONT.MEDIUM,
      color: GLOBALS.COLOR.PRIMARY,
      textAlign: 'center',
      marginLeft: 20,
    },
    selectedTextStyle: {
      fontSize: GLOBALS.FONT.MEDIUM,
      color: GLOBALS.COLOR.WHITE,
      textAlign: 'center',
      marginLeft: 20,
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

export default DataWorkerUp