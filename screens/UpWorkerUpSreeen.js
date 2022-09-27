import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import LayoutFourth from "../components/Layouts/LayoutFourth";
import HeaderSecondaryTwo from "../components/Layouts/LayoutSecondary/HeaderSecondaryTwo";
import DataWorkerUp from "../components/UpWorkerUpSreeen/DataWorkerUp";
import GLOBALS from "../Globals";

 const UpWorkerUpSreeen= ({ route }) => {
  
  return (
    <LayoutFourth>
      <HeaderSecondaryTwo title={route.name} />
      <View style={styles.container}>
        <DataWorkerUp/>
      </View>
    </LayoutFourth>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GLOBALS.COLOR.SECONDARY,
    flex: 1,
    position: 'relative',
    height: '100%',
    paddingHorizontal: '10%',
  }
});


export default UpWorkerUpSreeen