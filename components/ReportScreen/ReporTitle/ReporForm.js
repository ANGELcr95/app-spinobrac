import { Text, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import GLOBALS from '../../../Globals';
import { getTask, saveTask, updateTask } from '../../../services/reports';

import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { useIsFocused, useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux'
// import { toggleRouteId } from '../redux/routeSlice'
import useUpContext from '../../../context/useUpContext';
import { timeDate } from '../../../custom/timeDate';
import { getWorkers } from '../../../services/workers';
import { useSelector } from 'react-redux';
const ReporForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    date: '',
    file: '',
    document_number: '',
    administrativo: '',
    document_admin: '',
    type_risk: '',
  });
  const { workers } = useSelector((state) => state.workers);
  const isFocused = useIsFocused(); // sabe si retorne a la pagina funciona como true o false
  const [disabled, setdisabled] = useState(true);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [valueType, setValueType] = useState(null);
  const [isFocusType, setIsFocusType] = useState(false);

  const navigation = useNavigation();
  const context = useUpContext();

  
  const [risks]= useState([
    {
      label:'Biologico',
      value:'Biologico'
    }, 
    {
      label: 'Fisico',
      value: 'Fisico'
    }, 
    {
      label: 'Ergonomico',
      value: 'Ergonomico'
    }, 
    {
      label: 'Psicologico',
      value: 'Psicologico'
    }, 
    {
      label: 'Mecanico',
      value: 'Mecanico'
    }, 
    {
      label: 'Ambiental',
      value: 'Ambiental'
    }
  ])

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

  const renderLabelRisk = () => {
    if (isFocusType || valueType) {
      return (
        <Text style={[styles.label, isFocusType && { color: GLOBALS.COLOR.ICONS }]}>
          Tipo Riesgo
        </Text>
      );
    }
    return null;
  };

  // const dispatch = useDispatch();
  // let [routeId] = useSelector((state) => state.routeId)

  const handleChange = (name, value) => setTask({ ...task, [name]: value });

  useEffect(() => {
    task.title && task.description && task.type_risk? setdisabled(false) : setdisabled(true);
  }, [task]);

  const handleSubmit = async () => {
    if (context.routedId) {
      await updateTask(context.routedId, task);
      // dispatch(toggleRouteId(null))
      context.upRoutedId(null);
      setTask({
        title: '',
        description: '',
        date: '',
        file: '',
        document_number: '',
        administrativo: '',
        document_admin: '',
        type_risk: '',
      });
      context.upRoutedId(null);
    } else {
      const response = await saveTask({
        title: task.title,
        description: task.description,
        date: timeDate(),
        file: task.file,
        document_number: task.document_number,
        administrativo: context.user.name,
        document_admin: context.user.dni,
        type_risk: task.type_risk, 
      });
      if (response.status === 200) {
        setTask({
          title: '',
          description: '',
          date: '',
          file: '',
          document_number: '',
          administrativo: '',
          document_admin: '',
          type_risk: '',
        });
      }
    }
    navigation.navigate('RiskScreen');
  };
  useEffect(() => {
    setTask({
      title: '',
      description: '',
      date: '',
      file: '',
      document_number: '',
      administrativo: '',
      document_admin: '',
      type_risk: '',
    });
    if (context.routedId) {
      navigation.setOptions({ headerTitle: 'Actualizar reporte' });
      (async () => {
        const task = await getTask(context.routedId);
        !task.status
          ? setTask({
              title: task.title,
              description: task.description,
              date: task.date,
              file: task.file,
              document_number: task.document_number,
              administrativo: context.user.name,
              document_admin: context.user.dni,
              type_risk: task.type_risk,
            })
          : setTask({
              title: '',
              description: '',
              date: '',
              file: '',
              document_number: '',
              administrativo: '',
              document_admin: '',
              type_risk: '',
            });
      })();
    }
  }, [context.routedId, isFocused]);

  return (
    <View style={styles.cotainer}>
      <View style={styles.containerBox}>
        <View
          style={{
            width: '10%',
            height: 30,
            backgroundColor: GLOBALS.COLOR_TRANSAPARENT.THETIARY,
            borderTopLeftRadius: 25,
            borderTopRightRadius: context.routedId || context.option ? 10 : 0,
          }}
        ></View>
        <View
          style={{
            width: '30%',
            height: 30,
            backgroundColor: GLOBALS.COLOR_TRANSAPARENT.THETIARY,
          }}
        ></View>
        <View
          style={{
            width: '20%',
            height: 30,
            backgroundColor: GLOBALS.COLOR_TRANSAPARENT.THETIARY,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        ></View>
        <View
          style={{
            width: '30%',
            height: 30,
            backgroundColor: GLOBALS.COLOR_TRANSAPARENT.THETIARY,
          }}
        ></View>
        <View
          style={{
            width: '10%',
            height: 30,
            backgroundColor: GLOBALS.COLOR_TRANSAPARENT.THETIARY,
            borderTopRightRadius: 25,
            borderTopLeftRadius: context.routedId || context.option ? 10 : 0,
          }}
        ></View>
      </View>

      {context.routedId && task.title ? (
        <TextInput
          style={styles.input}
          mode="outlined"
          editable={false}
          label="Empleado"
          value={task.title}
          outlineColor={GLOBALS.COLOR.SECONDARY}
          theme={{ colors: { primary: GLOBALS.COLOR.ICONS } }}
        />
      ) : (
        <>
          <View style={styles.cotainerDropDown}>
            {renderLabel()}
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && {
                  borderColor: GLOBALS.COLOR.ICONS,
                  borderWidth: 2,
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
                setTask({
                  ...task,
                  ['title']: item.value,
                  ['file']: item.file,
                  ['document_number']: item.document_number,
                });

                setIsFocus(false);
                setValue(null);
              }}
            />
          </View>
      
        </>
      )}
          <View style={styles.cotainerDropDown}>
            {renderLabelRisk()}
            <Dropdown
              style={[
                styles.dropdown,
                isFocusType && {
                  borderColor: GLOBALS.COLOR.ICONS,
                  borderWidth: 2,
                },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={risks}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocusType ? task.type_risk ? task.type_risk : 'Tipo de Riesgo' : '...'}
              value={task.type_risk}
              onFocus={() => setIsFocusType(true)}
              onBlur={() => setIsFocusType(false)}
              onChange={(item) => {
                setTask({
                  ...task,
                  ['type_risk']: item.value,
                });

                setIsFocusType(false);
                setValueType(null);
              }}
            />
          </View>
      <TextInput
        style={styles.input}
        mode="outlined"
        onChangeText={(text) => handleChange('description', text)}
        label="Descripcion Reporte"
        value={task.description}
        outlineColor={GLOBALS.COLOR.SECONDARY}
        theme={{ colors: { primary: GLOBALS.COLOR.ICONS } }}
      />
      {context.routedId && task.title ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <Button
            mode="contained-tonal"
            onPress={() => {
              context.upRoutedId(null);
              context.upOption(null);
            }}
            buttonColor={GLOBALS.COLOR.ICONSDOWN}
            textColor={GLOBALS.COLOR.WHITE}
            style={{
              marginBottom: 7,
            }}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </Button>
          <Button
            disabled={disabled}
            mode="contained-tonal"
            onPress={handleSubmit}
            buttonColor={GLOBALS.COLOR.BLUE}
            textColor={GLOBALS.COLOR.WHITE}
            style={{
              marginBottom: 7,
            }}
          >
            <Text style={styles.buttonText}>Actualizar</Text>
          </Button>
        </View>
      ) : (
        <Button
          disabled={disabled}
          mode="contained-tonal"
          onPress={() => {
            handleSubmit();
            context.upOption(null);
          }}
          buttonColor={GLOBALS.COLOR.RED}
          textColor={GLOBALS.COLOR.WHITE}
          style={{
            marginBottom: 7,
          }}
        >
          Reportar
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    width: '89%',
    backgroundColor: GLOBALS.COLOR_TRANSAPARENT.THETIARY,
    shadowColor: GLOBALS.COLOR.BLACK,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    
    elevation: 17,
    paddingTop: 25,
    borderRadius: 25,
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
    marginTop: 2,
    marginBottom: 7,
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
    marginBottom: 10
  },

  dropdown: {
    height: 50,
    width: '80%',
    borderColor: GLOBALS.COLOR.PRIMARY,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    color: 'black',
    marginTop: 10,
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

export default ReporForm;
