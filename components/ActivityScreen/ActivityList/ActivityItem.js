//Dependencies react Natigation && elemets
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Components
import AwesomeAlert from 'react-native-awesome-alerts';

//Redux && context
import { useDispatch, useSelector } from 'react-redux';
import { toggleRouteId } from '../../../redux/routeSlice';
import useUpContext from '../../../context/useUpContext';

//Styles Icons
import { Foundation } from '@expo/vector-icons';
import GLOBALS from '../../../Globals';
import { shortDate } from '../../../custom/timeDate';
import { Avatar, Switch } from 'react-native-paper';
import { updateActivity } from '../../../services/activities';
import { showActivities } from '../../../redux/dataActivitiesSlice';

// se crea componente exclusivamente para poder configurar estilos
const ActivityItem = ({
  activity,
  handleDelete,
  setRenderActivity,
  renderActivity,
  setVisibleSnack,
}) => {
  const [date, setdate] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
 

  const context = useUpContext();
  // const navigation = useNavigation()
  const dispatch = useDispatch();



  useEffect(() => {
    setdate(shortDate(activity.date));
    activity.done['data'][0] ? setIsSwitchOn(true) : setIsSwitchOn(false);
  }, [activity]);

  const { activities } = useSelector((state) => state.activities);

  const updateActivityFunction = () => {
    setIsSwitchOn(!isSwitchOn);
    updateActivity(activity.id, { done: !isSwitchOn });
    setRenderActivity(!renderActivity);
  };

  return (
    <View
      style={{
        backgroundColor: isSwitchOn
          ? GLOBALS.COLOR_TRANSAPARENT.GREEN_LIGTH
          : GLOBALS.COLOR_TRANSAPARENT.SECONDARY,
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginVertical: 2,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
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
        message={`Eliminara actividad asignada a ${activity.user}`}
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
          handleDelete(activity.id);
          setShowAlert(false);
        }}
      />
      <View style={styles.containerActivity}>
        <View style={styles.containerAdmin}>
          <TouchableOpacity
            style={styles.itemContainerData}
            onPress={() => {
              context.upRoutedId(activity.id);
            }}
          >
            <View style={styles.itemContainerImage}>
              {activity.file_admin ? (
                <Avatar.Image source={{ uri: activity.file_admin }} size={30} />
              ) : (
                <Avatar.Image
                  size={30}
                  source={require('../../../assets/img/worker.png')}
                />
              )}
            </View>
            <View>
              <Text style={styles.administrative}>
                {activity.administrativo}
              </Text>
              <Text style={styles.date}>{date}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowAlert(true)}>
            <Foundation
              name="page-delete"
              size={GLOBALS.SIZE.MEDIUM}
              color={GLOBALS.COLOR.ICON_DELETE}
            />
          </TouchableOpacity>
          <Switch
            style={styles.switch}
            trackColor={{
              true: GLOBALS.COLOR.GREEN_LIGTH,
              false: GLOBALS.COLOR.ICONSDOWN,
            }}
            thumbColor={GLOBALS.COLOR.WHITE}
            value={isSwitchOn}
            onValueChange={() => {
              updateActivityFunction()
              setVisibleSnack(true)
              setTimeout(() => {
                setVisibleSnack(false)
              }, 1000);
            }}
          />
        </View>

        <View style={styles.containerOperative}>
          <View style={styles.operative}>
            <Text style={styles.operativeTitle}>{activity.operativo}</Text>
            <Text style={styles.descriptionTitle}>{activity.description}</Text>
          </View>
          <View style={styles.switchOperative}>
            {activity.file ? (
              <Avatar.Image source={{ uri: activity.file }} size={50} />
            ) : (
              <Avatar.Image
                size={50}
                source={require('../../../assets/img/worker.png')}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainerData: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
  },
  itemContainerImage: {
    marginRight: 10,
  },
  itemTitle: {
    color: '#ffffff',
  },
  description: {
    color: 'gray',
  },
  date: {
    color: GLOBALS.COLOR.ICONSDOWN,
    fontStyle: 'italic',
    fontSize: GLOBALS.FONT.EXTRA_SMALL,
  },
  buttonDelete: {
    paddingHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 5,
  },
  textButtonDelete: {
    color: '#ffffff',
  },
  containerActivity: {
    flexDirection: 'column',
    width: '100%',
  },
  containerAdmin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: GLOBALS.COLOR_TRANSAPARENT.SECONDARY_MEDIUM,
    paddingBottom: 3,
    marginBottom: 7,
  },
  administrative: {
    color: GLOBALS.COLOR.BLACK,
    fontWeight: GLOBALS.WEIGHT.MEDIUM,
    fontSize: GLOBALS.FONT.MEDIUM,
  },
  containerOperative: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  operative: {
    width: '75%',
    borderRightWidth: 1,
    borderRightColor: GLOBALS.COLOR_TRANSAPARENT.SECONDARY_MEDIUM,
    marginBottom: 7,
  },
  operativeTitle: {
    color: GLOBALS.COLOR.BLACK,
    fontWeight: GLOBALS.WEIGHT.MEDIUM,
    fontSize: GLOBALS.FONT.BIG,
  },
  descriptionTitle: {
    color: GLOBALS.COLOR.ICONSDOWN,
  },
  switchOperative: {
    width: '25%',
    alignItems: 'center',
  },
  switch: {
    height: 35,
  },
});

export default ActivityItem;
