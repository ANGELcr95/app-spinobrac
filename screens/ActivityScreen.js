//Dependencies react Natigation && elemets
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated
} from 'react-native';

//Components
import LayoutTertiary from '../components/Layouts/LayoutTertiary';
import ActivityForm from '../components/ActivityScreen/ActivityForm';
import ActivityList from '../components/ActivityScreen/ActivityList';

// Globas variables
import GLOBALS from '../Globals';

//Styles
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Modal, IconButton, Snackbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setActivities, setDateShow, showActivities } from '../redux/dataActivitiesSlice';
import { getActivities } from '../services/activities';
import { shortDate, timeDate } from '../custom/timeDate';

export const ActivityScreen = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('Todos');
  const [showMenu, setShowMenu] = useState(false);
  const [firstTouch, setFirstTouch] = useState(false);
  const [renderActivity, setRenderActivity] = useState(false);
  const [updateActivity, setUpdateActivity] = useState(false);
  const [visibleSnack, setVisibleSnack] = useState(false);
  const containerStyle = {
    width: '80%',
    marginHorizontal: '10%',
  };
  const dispatch = useDispatch();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

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
    outputRange: !firstTouch ? [0, 250] : showMenu ? [0, 250] : [250, 0],
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
    outputRange: !firstTouch
      ? ['0deg', '90deg']
      : showMenu
      ? ['0deg', '90deg']
      : ['90deg', '0deg'],
  });

  const { activities } = useSelector((state) => state.activities);

  const load = async () => {
    let data = await getActivities();
    data.reverse();
       
    data = data.map(function (element, index) {
      element.index = index
      return element
    });

    let dates = data.map(function (element, index) {
      let date = {
        date: shortDate(element.date),
        index: index
      };
      return date;
    });

    let hash = {};
    dates = dates.filter(function(current) {
      let exists = !hash[current.date];
      hash[current.date] = true;
      return exists;
    });

    dispatch(setActivities(data));
    dispatch(setDateShow(dates));
  };

  useEffect(() => {
    load();
  }, [renderActivity]);

  const statusActivity = (done) => {
    if (done == null) {
      
      let dates = activities.map(function (element, index) {
        let date = {
          date: shortDate(element.date),
          index: index
        };
        return date;
      });
  
      let hash = {};
      dates = dates.filter(function(current) {
        let exists = !hash[current.date];
        hash[current.date] = true;
        return exists;
      });
      
      dispatch(showActivities(activities));
      dispatch(setDateShow(dates));
      setTitle('Todos');
      return;
    }
    let status = activities.filter(
      (activity) => activity.done['data'][0] === done
    );
      
    status = status.map(function (element, index) {
      let object ={
        administrativo: element.administrativo, 
        date: element.date, 
        description: element.description, 
        document_admin: element.document_admin, 
        document_oper: element.document_oper, 
        done: element.done, 
        type: element.type, 
        file_admin: element.file_admin, 
        file_operativo: element.file_operativo, 
        id: element.id , 
        index: index, 
        operativo: element.operativo
      }
      
      return object
    });

    let dates = status.map(function (element, index) {
      let date = {
        date: shortDate(element.date),
        index: index
      };
      return date;
    });

    let hash = {};
    dates = dates.filter(function(current) {
      let exists = !hash[current.date];
      hash[current.date] = true;
      return exists;
    });

    dispatch(showActivities(status));
    dispatch(setDateShow(dates));
    done ? setTitle('Completado') : setTitle('Pendiente');
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  

  const handleConfirm = (date) => {
    let dateUtil = timeDate(date)
    let statusDate = activities.filter(
      (activity) => shortDate(activity.date) == dateUtil
    );
      
    statusDate = statusDate.map(function (element, index) {
      let object ={
        administrativo: element.administrativo, 
        date: element.date, 
        description: element.description, 
        document_admin: element.document_admin, 
        document_oper: element.document_oper, 
        done: element.done, 
        type: element.type, 
        file_admin: element.file_admin, 
        file_operativo: element.file_operativo, 
        id: element.id , 
        index: index, 
        operativo: element.operativo
      }
      
      return object
    });

    // let dates = statusDate.map(function (element, index) {
    //   let date = {
    //     date: shortDate(element.date),
    //     index: index
    //   };
    //   return date;
    // });

    // let hash = {};
    // dates = dates.filter(function(current) {
    //   let exists = !hash[current.date];
    //   hash[current.date] = true;
    //   return exists;
    // });

    dispatch(setDateShow([]));
    dispatch(showActivities(statusDate));
    setTitle(dateUtil);
    hideDatePicker();
  };

  return (
    <LayoutTertiary>
      <View
        style={{
          position: 'absolute',
          zIndex: visible ? 2 : 1,
          height: '100%',
          width: '100%',
        }}
      >
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{title}</Text>
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
              backgroundColor: GLOBALS.COLOR.SECONDARY,
              borderRadius: 10,
              width: '45%',
              marginRight: '2.5%',
            }}
          >
            <Ionicons
              name="add"
              size={GLOBALS.SIZE.BIG}
              color={GLOBALS.COLOR.WHITE}
            />
            <Text style={styles.meniTitle}>Actividad</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <ActivityForm
            hideModal={hideModal}
            setUpdateActivity={setUpdateActivity}
            updateActivity={updateActivity}
            setTitle={setTitle}
          />
        </Modal>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 55,
          height: '90%',
          width: '97%',
          marginHorizontal: '1.5%',
        }}
      >
        <ActivityList
          renderActivity={renderActivity}
          setRenderActivity={setRenderActivity}
          updateActivity={updateActivity}
          setVisibleSnack={setVisibleSnack}
          setTitle={setTitle}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 70,
          right: 5,
          zIndex: 1,
          width: '50%',
        }}
      >
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              // Bind opacity to animated value
              height: showBox,
            },
          ]}
        >
          {showMenu ? (
            <View>
              <TouchableOpacity
                mode="contained-tonal"
                onPress={() => {
                  statusActivity();
                  setFirstTouch(true);
                  setShowMenu(!showMenu);
                  startImageRotateFunction();
                  showBoxFunction();
                }}
                activeOpacity={0.9}
                style={styles.boxTitle}
              >
                <MaterialCommunityIcons
                  style={styles.menuIcon}
                  name="clock"
                  size={GLOBALS.SIZE.BIG}
                  color={GLOBALS.COLOR.WHITE}
                />
                <Text style={styles.meniTitle}>Todos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                mode="contained-tonal"
                onPress={() => {
                  statusActivity(0);
                  setFirstTouch(true);
                  setShowMenu(!showMenu);
                  startImageRotateFunction();
                  showBoxFunction();
                }}
                activeOpacity={0.9}
                style={styles.boxTitle}
              >
                <MaterialCommunityIcons
                  style={styles.menuIcon}
                  name="clock-alert"
                  size={GLOBALS.SIZE.BIG}
                  color={GLOBALS.COLOR.YELLOW}
                />
                <Text style={styles.meniTitle}>Pendiente</Text>
              </TouchableOpacity>

              <TouchableOpacity
                mode="contained-tonal"
                onPress={() => {
                  statusActivity(1);
                  setFirstTouch(true);
                  setShowMenu(!showMenu);
                  startImageRotateFunction();
                  showBoxFunction();
                }}
                activeOpacity={0.9}
                style={styles.boxTitle}
              >
                <MaterialCommunityIcons
                  style={styles.menuIcon}
                  name="clock-check"
                  size={GLOBALS.SIZE.BIG}
                  color={GLOBALS.COLOR.GREEN_LIGTH}
                />
                <Text style={styles.meniTitle}>Completado</Text>
              </TouchableOpacity>

              
              <TouchableOpacity
                mode="contained-tonal"
                onPress={() => {
                  showDatePicker()
                  setFirstTouch(true);
                  setShowMenu(!showMenu);
                  startImageRotateFunction();
                  showBoxFunction();
                }}
                activeOpacity={0.9}
                style={styles.boxTitle}
              >
                <MaterialCommunityIcons
                  style={styles.menuIcon}
                  name="calendar"
                  size={GLOBALS.SIZE.BIG}
                  color={GLOBALS.COLOR.WHITE}
                />
                <Text style={styles.meniTitle}>Fecha</Text>
              </TouchableOpacity>
        
            </View>
          ) : null}
        </Animated.View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 5,
          zIndex: 1,
        }}
      >
        <Animated.View
          style={[
            {
              // Bind opacity to animated value
              transform: [{ rotate: rotateData }],
            },
          ]}
        >
          <IconButton
            icon="arrow-left"
            size={GLOBALS.SIZE.EXTRA_BIG}
            containerColor={GLOBALS.COLOR.PRIMARY}
            iconColor={GLOBALS.COLOR.WHITE}
            mode="contained-tonal"
            onPress={() => {
              setFirstTouch(true);
              setShowMenu(!showMenu);
              startImageRotateFunction();
              showBoxFunction();
            }}
          />
        </Animated.View>
      </View>
      <Snackbar
        style={{
          position: 'absolute',
          bottom: 0,
          zIndex: 1,
        }}
        visible={visibleSnack}
        onDismiss={onDismissSnackBar}
      >
        Modidifico estado de la actividad
      </Snackbar>
    </LayoutTertiary>
  );
};

const styles = StyleSheet.create({
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: GLOBALS.FONT.BIG,
    fontWeight: GLOBALS.WEIGHT.MEDIUM,
    width: '45%',
    marginHorizontal: '2.5%',
    textAlign: 'center',
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  fadingContainer: {
    height: 0,
    backgroundColor: GLOBALS.COLOR.SECONDARY,
    borderRadius: 10,
  },
  boxTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    height: 40,
    marginHorizontal: '5%',
    marginTop: 5,
    borderRadius: 10,
  },
  menuIcon: {
    marginRight: 10,
  },
  meniTitle: {
    fontSize: GLOBALS.FONT.BIG,
    color: GLOBALS.COLOR.THETIARY,
  },
});

export default ActivityScreen;
