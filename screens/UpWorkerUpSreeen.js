import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import LayoutSecondary from "../components/Layouts/LayoutSecondary";
import HeaderSecondary from "../components/Layouts/LayoutSecondary/HeaderSecondary";
import HeaderSecondaryTwo from "../components/Layouts/LayoutSecondary/HeaderSecondaryTwo";
import DataWorkerUp from "../components/UpWorkerUpSreeen/DataWorkerUp";
import GLOBALS from "../Globals";

 const UpWorkerUpSreeen= ({ route }) => {
  
  return (
    <LayoutSecondary>
      <HeaderSecondaryTwo title={route.name} />
      <View style={styles.container}>
        <DataWorkerUp/>
      </View>
    </LayoutSecondary>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: GLOBALS.COLOR.PRIMARY,
    flex: 1,
    position: 'relative',
    height: '100%',
    paddingHorizontal: '10%',
  }
});


export default UpWorkerUpSreeen