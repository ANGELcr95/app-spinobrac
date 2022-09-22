//Dependencies react Natigation && elemets
import { Text, StyleSheet, View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';

//Styles
import { Dropdown } from 'react-native-element-dropdown';
import { Modal, Portal, Button } from 'react-native-paper';

//Components
import useUpContext from '../../context/useUpContext';
import { timeDate } from '../../custom/timeDate';
import { getWorkers } from '../../services/workers'; 

// Globas variables
import GLOBALS from '../../Globals';

//Services
import { getTask, saveTask, updateTask } from '../../services/workers'

//Icons
import { Octicons } from '@expo/vector-icons'; 

const ActivityForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    date: '',
    file: '',
    document_number: ''
  });
  const [workers, setWorkers] = useState([]);
  const isFocused = useIsFocused(); // sabe si retorne a la pagina funciona como true o false
  const [disabled, setdisabled] = useState(true)

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const navigation = useNavigation();
  const context = useUpContext();

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: GLOBALS.COLOR.ICONS }]}>
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
          document_number: element.document_number,
        };
        return data;
      });

      setWorkers(names);
   
  };

  // const dispatch = useDispatch();
  // let [routeId] = useSelector((state) => state.routeId)

  const handleChange = (name, value) => setTask({ ...task, [name]: value });

  useEffect(() => {
    task.title && task.description ? setdisabled(false) : setdisabled(true)
  }, [task])

  const handleSubmit = async () => {
    if (context.routedId) {
      await updateTask(context.routedId, task);
      // dispatch(toggleRouteId(null))
      context.upRoutedId(null);
      setTask({
        title: '',
        description: '',
        date: '',
        file:'',
        document_number:''
      });
      context.upRoutedId(null);
    } else {
       const response =   await saveTask({
        title: task.title,
        description: task.description,
        date: timeDate(),
        file: task.file,
        document_number: task.document_number
      });
      if (response.status === 200) {
          setTask({
            title: '',
            description: '',
            date: '',
            file:'',
            document_number:''
          });
        }
      }
      navigation.navigate('RiskScreen');
  };
  useEffect(() => {
    loadReports();
    setTask({ title: '',
      description: '',
      date: '',
      file:'',
      document_number:''
    });
    if (context.routedId) {
      navigation.setOptions({ headerTitle: 'Actualizar reporte' });
      (async () => {
        const task = await getTask(context.routedId);
        !task.status ?  setTask({
          title: task.title,
          description: task.description,
          date: task.date,
          file:task.file,
          document_number:task.document_number,
        }) : setTask({
          title: '',
          description: '',
          date: '',
          file:'',
          document_number:''
        });
      })();
    }
  }, [context.routedId, isFocused]);

  return (
    <View style={styles.cotainer}>
        <View style={{
            position: 'absolute',
            top: -25,
        }}>
            <Octicons name="rocket" size={60} color={GLOBALS.COLOR.WHITE} />
        </View>
        <View style={styles.cotainerDropDown}>
            {renderLabel()}
            <Dropdown
            style={[
                styles.dropdown,
                isFocus && { 
                borderColor: GLOBALS.COLOR.ICONS,
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
            value={task.title}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {

            setTask({ ...task, 
              ['title']: item.value,
              ['file']: item.file,
              ['document_number']: item.document_number,
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
        value={task.description}
      />
        <Button
            disabled={disabled}
            mode="contained-tonal"
            onPress={()=>{
            handleSubmit()
            context.upOption(null)
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
    backgroundColor: GLOBALS.COLOR.PRIMARY,
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
    backgroundColor: GLOBALS.COLOR.PRIMARY,
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
    backgroundColor: GLOBALS.COLOR.PRIMARY,
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
