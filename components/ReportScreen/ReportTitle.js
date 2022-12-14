import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import ReporForm from './ReporTitle/ReporForm';
import GLOBALS from '../../Globals';
import ReportOption from './ReporTitle/ReportOption';
import useUpContext from '../../context/useUpContext';

const ReportTitle = () => {
  const context = useUpContext();

  return (
    <View style={styles.cotainer}>
      <View style={styles.options}>
        <ReportOption  title="Reportar" colores={!context.routedId ? GLOBALS.COLOR.WHITE : null}/>
        { context.routedId  || context.option ? <ReportOption title="Actualizar" colores={context.routedId ? GLOBALS.COLOR.WHITE :null}  />: null}
      </View>
      <ReporForm />
    </View>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginLeft: '5%',
    top: 70,
    paddingTop: 5,
    borderRadius: 25,
  },
  options: {
    width: '89%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5
  }
});

export default ReportTitle;
