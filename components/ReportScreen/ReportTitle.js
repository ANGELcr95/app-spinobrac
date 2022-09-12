import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ReporForm from './ReporTitle/ReporForm';
import GLOBALS from '../../Globals';

const ReportTitle = () => {
  return (
    <View style={styles.cotainer}>
      <View style={styles.header}>
        <View style={styles.option}>
          <Text style={{ color: 'black' }}>Report</Text>
        </View>
        <View style={styles.option}>
          <Text style={{ color: 'black' }}>Update</Text>
        </View>
      </View>
      <View style={styles.containerBullet}>
        <View style={styles.Bullet}>
          <Text style={{ color: 'black' }}>Report2</Text>
        </View>
        <View style={styles.Bullet}>
          <Text style={{ color: 'black' }}>Update2</Text>
        </View>
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
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  containerBullet: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  Bullet: {
    height: 9,
    width: 80,
    backgroundColor: 'black',
  },
});

export default ReportTitle;
