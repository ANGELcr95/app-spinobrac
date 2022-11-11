//Dependencies react Natigation && elemets
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

//Redux && context
import { useDispatch, useSelector } from 'react-redux'
import { setActivities, setDateShow, showActivities } from '../../redux/dataActivitiesSlice'

//Components
import ActivityItem from './ActivityList/ActivityItem'

//Services
import { deleteActivity, getActivities } from '../../services/activities'
import { shortDate } from '../../custom/timeDate'
import NoFound from '../NoFound'
import Loading from '../Loading'

import io from 'socket.io-client'
import GLOBALS from '../../Globals'
const socket = io(`${GLOBALS.API}`)

const ActivityList = ({renderActivity, setRenderActivity, setVisibleSnack, setTitle }) => {

  // const [activities, setActivity] = useState(useSelector((state) => state.dataActivitiesSlice.all))
  const [refreshing, setrefreshing] = useState(false)
  const { activitiesShow } = useSelector((state) => state.activities)
  const { dateShow } = useSelector((state) => state.activities)


  const isFocused = useIsFocused() // sabe si retorne a la pagina funciona como true o false
  const dispatch = useDispatch();

  const loadActivities = async () => {
    let data = await getActivities()
    data.reverse()
    
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

    dispatch(setDateShow(dates));
    
    // !data.status ? dispatch(setActivities(data)) : dispatch(setActivities([]))
    dispatch(setActivities(data))
    dispatch(showActivities(data))
    
  }

  useEffect(() => {
    loadActivities()
  }, [isFocused])



  const onRefresh = React.useCallback(async() => { // esto solo es para poder usar aasync y await con ese mtodo nativo 
    setrefreshing(true)
    setTitle('Cargando...')
    await loadActivities()
    setrefreshing(false)
  })
  
  const handleDelete = async (id) => {
    await deleteActivity(id)
    setRenderActivity(!renderActivity);
    socket.emit("socketRenderActivity", !renderActivity);
  }

  const renderItem = ({item}) => {
    return <ActivityItem dateShow={dateShow} setVisibleSnack={setVisibleSnack} activity={item} handleDelete={handleDelete} renderActivity={renderActivity} setRenderActivity={setRenderActivity} />
  }

  
  if (!activitiesShow) {
    return (
      <View>
        <Loading/>
      </View>
    )
  }
  
  if (activitiesShow && activitiesShow.length == 0) {
    return (
      <View>
        <NoFound/>
      </View>
    )
  }

  return (
    <FlatList
      style={{ width: '100%' }}
      data={activitiesShow}
      keyExtractor={(item) => `${item.id} `}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          colors={['#78e08f']}
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor='gray'
        />}
  />
  )
}

export default ActivityList