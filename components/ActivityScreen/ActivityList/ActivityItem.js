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
  dateShow
}) => {
  const [date, setdate] = useState(null);
  const [showDate, setShowDate] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
 

  const context = useUpContext();
  // const navigation = useNavigation()
  const dispatch = useDispatch();



  useEffect(() => {
    setdate(shortDate(activity.date));

    setShowDate(false)
    
    for (let i = 0; i < dateShow.length; i++) {
      if (dateShow[i].index == activity.index) {  
        setShowDate(true)
        break
      }
    }
    
    activity.done['data'][0] ? setIsSwitchOn(true) : setIsSwitchOn(false);
  }, [activity]);

  const { activities } = useSelector((state) => state.activities);

  const updateActivityFunction = () => {
    setIsSwitchOn(!isSwitchOn);
    updateActivity(activity.id, { done: !isSwitchOn });
    setRenderActivity(!renderActivity);
  };

  return (
    <>
    {showDate &&
      <View style={styles.showDateContainer}>
        <Text style={styles.showDate}>{ date }</Text>
      </View>
      }
      <View
        style={{
          backgroundColor: isSwitchOn
            ? GLOBALS.COLOR_TRANSAPARENT.FOURTH
            : GLOBALS.COLOR_TRANSAPARENT.SECONDARY,
          paddingHorizontal: 12,
          paddingVertical: 5,
          marginVertical: 5,
          borderRadius: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: context.user.dni == activity.document_admin ? 40 : 0,
          borderBottomRightRadius: context.user.dni == activity.document_admin ? 40 : 20,
          borderTopRightRadius: context.user.dni == activity.document_admin ? 0 : 40,
          borderBottomLeftRadius: context.user.dni == activity.document_admin ? 20 : 40,
          borderWidth: context.user.dni == activity.document_admin ? 2 : 0,
          borderColor: context.user.dni == activity.document_admin && GLOBALS.COLOR.RED,
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
          message={`Eliminara actividad asignada a ${activity.operativo}`}
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
              <View style={styles.administrativeContainer}>
                <Text style={styles.administrative}>
                  {activity.administrativo}
                </Text>
                <Text style={styles.date}>{date}</Text>
              </View>
            </TouchableOpacity>
            {context.user.dni == activity.document_admin &&
            <>
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
                  }, 2000);
                }}
              />
            </>
            }
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
    </>
  );
};

const styles = StyleSheet.create({
  showDateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5
  },
  showDate: {
    backgroundColor: GLOBALS.COLOR.BLACK,
    color: GLOBALS.COLOR.WHITE,
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
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
  administrativeContainer: {
    width: '100%',
  },
  administrative: {
    color: GLOBALS.COLOR.BLACK,
    fontWeight: GLOBALS.WEIGHT.MEDIUM,
    fontSize: GLOBALS.FONT.MEDIUM,
    width: '85%',
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
