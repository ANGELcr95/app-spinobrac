//Dependencies react Natigation && elemets
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

//Styles Icons
import { AntDesign } from '@expo/vector-icons';
import GLOBALS from '../../../Globals';

import { useNavigation } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import useUpContext from '../../../context/useUpContext';
import { Avatar } from 'react-native-paper';


// se crea componente exclusivamente para poder configurar estilos
const WorkerItem = ({ worker, handleDelete }) => {
  const [showAlert, setShowAlert] = useState(false);
  const navigation = useNavigation();

  const context = useUpContext();

  return (
    <View style={styles.itemContainer}>
      <AwesomeAlert
        show={showAlert}
        // showProgress={false}
        title="Eliminar"
        titleStyle={{ fontSize: 36, marginBottom: 10 }}
        messageStyle={{
          fontSize: 16,
          marginBottom: 10,
          textAlign: 'center',
          color: GLOBALS.COLOR.SECONDARY,
          fontWeight: GLOBALS.WEIGHT.MEDIUM,
        }}
        message={`${worker.name} con cc ${worker.document_number}`}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancelar"
        confirmText="Eliminar"
        cancelButtonStyle={{ width: 100, alignItems: 'center' }}
        confirmButtonStyle={{ width: 100, alignItems: 'center' }}
        confirmButtonColor={GLOBALS.COLOR.RED}
        cancelButtonColor={GLOBALS.COLOR.ICONSDOWN}
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={() => {
          handleDelete(worker.document_number);
          setShowAlert(false);
        }}
      />

      {worker.file ? <Avatar.Image style={{position:'absolute', top:-45 }} source={{ uri: worker.file }} size={80} /> : <Avatar.Image style={{position:'absolute', top:-45}} size={80} source={require('../../../assets/img/worker.png')}/>}

      <TouchableOpacity
        style={styles.buttonUpdate}
        onPress={() => {
          context.upWorker(worker.document_number);
          navigation.navigate('Datos Empleado', {
            dni: worker.document_number,
          });
        }}
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
      {context.user.role == 'Root' ? (
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => setShowAlert(true)}
        >
          <AntDesign
            name="deleteuser"
            size={GLOBALS.SIZE.MEDIUM}
            color={GLOBALS.COLOR.ICON_DELETE}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 2,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: GLOBALS.COLOR.SECONDARY,
    borderWidth: 3,
    width: '48%',
    position: 'relative',
    marginHorizontal: '1%',
    marginTop: 45,
    minHeight: 150,
  },
  itemTitle: {
    color: GLOBALS.COLOR.BLACK,
    fontSize: GLOBALS.FONT.BIG,
    fontWeight: GLOBALS.WEIGHT.MEDIUM,
    textAlign: 'center',
    marginTop: 40
  },
  dni: {
    color: GLOBALS.COLOR.ICONSDOWN,
    textAlign: 'center',
    fontSize: GLOBALS.FONT.MEDIUM,
  },
  buttonDelete: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  buttonUpdate: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    zIndex: 1,
  },
});

export default WorkerItem;
