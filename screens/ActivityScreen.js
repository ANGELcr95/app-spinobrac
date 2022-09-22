//Dependencies react Natigation && elemets
import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Animated } from "react-native";

//Components
import LayoutTertiary from "../components/Layouts/LayoutTertiary";
import ActivityForm from "../components/ActivityScreen/ActivityForm";
import ActivityList from "../components/ActivityScreen/ActivityList";

// Globas variables
import GLOBALS from "../Globals";

//Styles
import { Button, Modal,  IconButton, Menu } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';


export const ActivityScreen = () => {

  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [firstTouch, setFirstTouch] = useState(false);
  const containerStyle = {
    width: '80%',
    marginHorizontal: '10%',
  }

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

   // fadeAnim will be used as the value for opacity. Initial Value: 0
   const fadeAnim = useRef(new Animated.Value(0)).current;

   const showBoxFunction = () => {
     // Will change fadeAnim value to 1 in 5 seconds
     fadeAnim.setValue(0);
     Animated.timing(fadeAnim, {
       toValue: 1,
       duration: 200,
       useNativeDriver: false,
     }).start();
   };


   const showBox = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange:  !firstTouch? [0,250] : showMenu ? [0,250] : [250,0] ,
  });

   const rotateValueHolder = useRef(new Animated.Value(0)).current;

   const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
 
  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: !firstTouch? ['0deg', '90deg']  : showMenu ? ['0deg', '90deg'] : ['90deg', '0deg'],
  });

  
  return (
    <LayoutTertiary>
        <View style={{
          position: 'absolute',
          zIndex: visible ? 2 : 1,
          height: '100%',
          width: '100%',
        }}>
          <TouchableOpacity
          mode="contained-tonal"
          onPress={showModal}
          activeOpacity={0.9}
          style={{
            marginTop: 5, 
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: GLOBALS.COLOR.PRIMARY,
            borderRadius: 10,
            width: '90%',
            marginHorizontal: '5%'
          }}
          ><Ionicons name="add" size={GLOBALS.SIZE.BIG} color={GLOBALS.COLOR.WHITE} />
            <Text style={styles.meniTitle}>Actividad</Text>
          </TouchableOpacity>
          
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <ActivityForm/>
          </Modal>
        </View>
        <View style={{
            position: 'absolute',
            zIndex: 1,
            top: 55,
            height: '90%',
            width: '97%',
            marginHorizontal: '1.5%',
          }}>
          <ActivityList/>
        </View>

        <View style={{
            position:'absolute',
            bottom: 70,
            right: 5,
            zIndex: 1,
            width: '50%'
          }}>
          <Animated.View
            style={[
              styles.fadingContainer,
              {
                // Bind opacity to animated value
                height: showBox,
              },
            ]}>
          {showMenu ? (
          <View>
             <TouchableOpacity
              mode="contained-tonal"
              // onPress={showModal}
              activeOpacity={0.9}
              style={styles.boxTitle}>
              <MaterialCommunityIcons style={styles.menuIcon} name="clock-check" size={GLOBALS.SIZE.BIG} color={GLOBALS.COLOR.GREEN_LIGTH} />
              <Text style={styles.meniTitle}>Completado</Text>
            </TouchableOpacity>

             <TouchableOpacity
              mode="contained-tonal"
              // onPress={showModal}
              activeOpacity={0.9}
              style={styles.boxTitle}>
              <MaterialCommunityIcons style={styles.menuIcon} name="clock-alert" size={GLOBALS.SIZE.BIG} color={GLOBALS.COLOR.YELLOW} />
              <Text style={styles.meniTitle}>Pendiente</Text>
            </TouchableOpacity>
          </View>
          ) : null}
          </Animated.View>
        </View>        

        <View style={{
            position:'absolute',
            bottom: 10,
            right: 5,
            zIndex: 1,
          }}>
          <Animated.View
            style={[
              {
                // Bind opacity to animated value
                transform: [{rotate: rotateData}],
              }
            ]}>
            <IconButton
              icon="arrow-left"
              size={GLOBALS.SIZE.EXTRA_BIG}
              containerColor={GLOBALS.COLOR.PRIMARY}
              iconColor={GLOBALS.COLOR.WHITE}
              mode='contained-tonal'
              onPress={() => {
                setFirstTouch(true)
                setShowMenu(!showMenu)
                startImageRotateFunction()
                showBoxFunction()
              }}
            />
          </Animated.View>
        </View>        
    </LayoutTertiary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    backgroundColor: GLOBALS.COLOR.PRIMARY,
    borderRadius:10,
    height: 0,
  },
  fadingText: {
    fontSize: 28,
  },
  menu: {
    color: GLOBALS.COLOR.THETIARY,
    backgroundColor: GLOBALS.COLOR.THETIARY,
  },
  boxTitle: {
    marginTop: 5,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: GLOBALS.COLOR.PRIMARY,
    borderRadius: 10,
    width: '90%',
    marginHorizontal: '5%'
  },
  menuIcon: {
    marginRight: 10,
  },
  meniTitle: {
    fontSize: GLOBALS.FONT.BIG,
    color: GLOBALS.COLOR.THETIARY,
  }
});

export default ActivityScreen