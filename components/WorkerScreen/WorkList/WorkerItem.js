//Dependencies react Natigation && elemets
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

//Styles Icons
import { AntDesign } from '@expo/vector-icons';
import GLOBALS from '../../../Globals';

// se crea componente exclusivamente para poder configurar estilos
const WorkerItem = ({ worker, handleDelete }) => {

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => {
          // navigationk.navigate('Reporte', {dni: worker.document_number})
          // dispatch(toggleRouteId(worker.id))
          // context.upRoutedId(worker.document_number)
        }}
      >
        <Text style={styles.itemTitle}>{worker.name}</Text>
        <Text style={styles.dni}>cc {worker.document_number}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonDelete}
        onPress={() => handleDelete(worker.document_number)}
      >
        <AntDesign
          name="deleteuser"
          size={GLOBALS.SIZE.MEDIUM}
          color={GLOBALS.COLOR.ICON_DELETE}
        />
      </TouchableOpacity>
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
    borderColor: GLOBALS.COLOR.PRIMARY,
    borderWidth: 3,
    width: '90%',
    marginLeft: '5%',
    position: 'relative',
  },
  itemTitle: {
    color: GLOBALS.COLOR.PRIMARY,
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
});

export default WorkerItem;
