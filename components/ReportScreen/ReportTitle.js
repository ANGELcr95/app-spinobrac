import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import ReporForm from './ReporTitle/ReporForm';
import GLOBALS from '../../Globals';
import ReportOption from './ReporTitle/ReportOption';
import useUpContext from '../../context/useUpContext';

const ReportTitle = () => {
  const context = useUpContext();

  useEffect(() => {

  }, [context.routedId])
  

  return (
    <View style={styles.cotainer}>
      <View style={styles.options}>
        <ReportOption  title="Reportar" colores={!context.routedId ? GLOBALS.COLOR.RED : null}/>
        { context.routedId || context.option ? <ReportOption title="Actualizar" colores={context.routedId ? GLOBALS.COLOR.FOURTH :null}  />: null}
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
    shadowColor: GLOBALS.COLOR.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    top: 85,
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
