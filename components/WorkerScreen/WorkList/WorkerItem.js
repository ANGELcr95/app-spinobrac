//Dependencies react Natigation && elemets
import React,{ useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

//Styles Icons
import { AntDesign } from '@expo/vector-icons';
import GLOBALS from '../../../Globals';

import { useNavigation } from '@react-navigation/native'
import AwesomeAlert from 'react-native-awesome-alerts';
import useUpContext from '../../../context/useUpContext';


// se crea componente exclusivamente para poder configurar estilos
const WorkerItem = ({ worker, handleDelete }) => {
  const [showAlert, setShowAlert] = useState(false)
  const navigation = useNavigation()
  
  const context = useUpContext()

  return (
    <View style={styles.itemContainer}>
           <AwesomeAlert
            show={showAlert}
            // showProgress={false}
            title="Eliminar"
            titleStyle={{fontSize:36,marginBottom:10}}
            messageStyle={{fontSize:16,marginBottom:10,textAlign:'center',color:GLOBALS.COLOR.SECONDARY, fontWeight:GLOBALS.WEIGHT.MEDIUM}}
            message= {`${worker.name} con cc ${worker.document_number}`}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Cancelar"
            confirmText="Eliminar"
            cancelButtonStyle={{width:100,alignItems:'center'}}
            confirmButtonStyle={{width:100,alignItems:'center'}}
            confirmButtonColor={GLOBALS.COLOR.RED}
            cancelButtonColor={GLOBALS.COLOR.ICONSDOWN}
            onCancelPressed={() => {
              setShowAlert(false)
            }}
            onConfirmPressed={() => {
              handleDelete(worker.document_number)
              setShowAlert(false)
            }}
        />
      <TouchableOpacity
          style={styles.buttonUpdate}
          onPress={() => {
              context.upWorker(worker.document_number)
              navigation.navigate('Datos Empleado', {dni: worker.document_number})
            }
          }
        >
        <AntDesign
          name="pushpin"
          size={GLOBALS.SIZE.MEDIUM}
          color={GLOBALS.COLOR.GREEN}
        />
      </TouchableOpacity>

      <View>
        <Text style={styles.itemTitle}>{worker.name}</Text>
        <Text style={styles.dni}>cc {worker.document_number}</Text>
      </View>
      {context.user.role == 'Root'?
      <TouchableOpacity
        style={styles.buttonDelete}
        onPress={() => setShowAlert(true)}
      >
        <AntDesign
          name="deleteuser"
          size={GLOBALS.SIZE.MEDIUM}
          color={GLOBALS.COLOR.ICON_DELETE}
        />
      </TouchableOpacity>: null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 18,
    marginVertical: 2,
    borderRadius: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: GLOBALS.COLOR.SECONDARY,
    borderWidth: 3,
    width: '90%',
    marginLeft: '5%',
    position: 'relative',
  },
  itemTitle: {
    color: GLOBALS.COLOR.ICONSDOWN,
    fontSize: GLOBALS.FONT.BIG,
    textAlign: 'center',
  },
  dni: {
    color: GLOBALS.COLOR.ICONS,
    textAlign: 'center',
    fontSize: GLOBALS.FONT.MEDIUM,
  },
  buttonDelete: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  buttonUpdate: {
    position: 'absolute',
    left: 15,
    bottom: 15,
    zIndex: 1,
  }
});

export default WorkerItem;
