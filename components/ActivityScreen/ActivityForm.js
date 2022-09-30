//Dependencies react Natigation && elemets
import { Text, StyleSheet, View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';

//Components
import useUpContext from '../../context/useUpContext';
import { timeDate } from '../../custom/timeDate';
import { getWorkers } from '../../services/workers'; 

//Styles
import { Dropdown } from 'react-native-element-dropdown';
import { Modal, Portal, Button } from 'react-native-paper';

// Globas variables
import GLOBALS from '../../Globals';

//Services
import { getTask, saveTask, updateTask } from '../../services/workers'

//Icons
import { Ionicons } from '@expo/vector-icons';
import { saveActivity } from '../../services/activities';

const ActivityForm = ({hideModal, setUpdateActivity, updateActivity, setTitle}) => {
  const [acivity, setAcivity] = useState({
    operativo: '',
    description: '',
    date: '',
    file_operativo: '',
    document_oper: '',
    administrativo: '',
    file_admin: '',
    document_admin: '',
    done: ''
  });
  const [workers, setWorkers] = useState([]);
  const isFocused = useIsFocused(); // sabe si retorne a la pagina funciona como true o false
  const [disabled, setdisabled] = useState(true)

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const context = useUpContext();

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: GLOBALS.COLOR.WHITE }]}>
          Empleado
        </Text>
      );
    }
    return null;
  };

  const loadReports = async () => {
      const data = await getWorkers();
      let names = data.map(function (element) {
        let data = {
          label: element.name,
          value: element.name,
          file:element.file,
          document_number: element.document_number
        };
        return data;
      });

      setWorkers(names);
  };

  // const dispatch = useDispatch();
  // let [routeId] = useSelector((state) => state.routeId)

  const handleChange = (name, value) => setAcivity({ ...acivity, [name]: value });

  useEffect(() => {
    acivity.operativo && acivity.description ? setdisabled(false) : setdisabled(true)
  }, [acivity])

  const handleSubmit = async () => {
    
       const response =   await saveActivity({
        operativo: acivity.operativo,
        description: acivity.description,
        date: timeDate(),
        file_operativo: acivity.file_operativo,
        document_oper: acivity.document_oper,
        administrativo: acivity.administrativo,
        file_admin: acivity.file_admin,
        document_admin: acivity.document_admin,
        done: acivity.done,
      });
      if (response.status === 200) {
          setAcivity({
            operativo: '',
            description: '',
            date: '',
            file_operativo: '',
            document_oper: '',
            administrativo: '',
            file_admin: '',
            document_admin: '',
            done: ''
          });
        }
        setUpdateActivity(!updateActivity)
        hideModal()
        setTitle('Todos')
  };
  useEffect(() => {
    loadReports();
    setAcivity({   
      operativo: '',
      description: '',
      date: '',
      file_operativo: '',
      document_oper: '',
      administrativo: '',
      file_admin: '',
      document_admin: '',
      done: ''
    });
  }, [isFocused]);

  return (
    <View style={styles.cotainer}>
        <View style={{
            position: 'absolute',
            top: -25,
        }}>
            <Ionicons name="md-build" size={60} color={GLOBALS.COLOR.WHITE} />
        </View>
        <View style={styles.cotainerDropDown}>
            {renderLabel()}
            <Dropdown
            style={[
                styles.dropdown,
                isFocus && { 
                borderColor: GLOBALS.COLOR.WHITE,
                borderWidth: 2
                },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={workers}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Selecionar Empleado' : '...'}
            searchPlaceholder="Buscar..."
            value={acivity.title}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {

            setAcivity({ ...acivity, 
              ['operativo']: item.value,
              ['file_operativo']: item.file,
              ['document_oper']: item.document_number,
              ['administrativo']: context.user.name,
              ['file_admin']: context.user.file,
              ['document_admin']: context.user.dni,
              ['done']: 0,
            });

            setIsFocus(false);
            setValue(null);
          }}
        />
      </View>
      <TextInput
        style={styles.input}
        mode="outlined"
        onChangeText={(text) => handleChange('description', text)}
        placeholder="Descripcion Actividad"
        placeholderTextColor={GLOBALS.COLOR.ICONSDOWN} 
        value={acivity.description}
      />
        <Button
            disabled={disabled}
            mode="contained-tonal"
            onPress={()=>{
            handleSubmit()
            }}
            buttonColor={GLOBALS.COLOR.GREEN}
            textColor={GLOBALS.COLOR.WHITE}
            style={{
            marginTop: 13,
            marginBottom: 7,
            }}
        >
            <Text style={{
                color: GLOBALS.COLOR.WHITE
            }}> Agregar </Text>
        </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GLOBALS.COLOR.SECONDARY,
    shadowColor: GLOBALS.COLOR.FOURTH,
    shadowOffset: {
      width: 20,
      height: 30,
    },
    shadowRadius: 100,
    elevation: 10,
    paddingTop: 40,
    borderRadius: 15,
  },
  containerBox: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: GLOBALS.COLOR.PRIMARY,
  },
  input: {
    width: '80%',
    marginTop: 10,
    padding: 10,
    color: GLOBALS.COLOR.WHITE,
    borderColor: GLOBALS.COLOR.WHITE,
    borderWidth: 1,
    height: 50,
    borderRadius:3,
    fontSize: GLOBALS.FONT.MEDIUM,
  },
  buttonSave: {
    padding: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: GLOBALS.COLOR.RED,
    width: '60%',
    marginTop: 5,
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
    borderColor: GLOBALS.COLOR.WHITE,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    color: GLOBALS.COLOR.WHITE,
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 40,
    top: -7,
    zIndex: 999,
    fontSize: 12,
    paddingHorizontal: 7,
  },
  placeholderStyle: {
    fontSize: 16,
    color: GLOBALS.COLOR.ICONSDOWN,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: GLOBALS.COLOR.WHITE,
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

export default ActivityForm;
