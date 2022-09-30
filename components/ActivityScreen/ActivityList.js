//Dependencies react Natigation && elemets
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, Text } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

//Redux && context
import { useDispatch, useSelector } from 'react-redux'
import { setActivities, showActivities } from '../../redux/dataActivitiesSlice'

//Components
import ActivityItem from './ActivityList/ActivityItem'

//Services
import { deleteActivity, getActivities } from '../../services/activities'

const ActivityList = ({renderActivity, setRenderActivity, updateActivity, setVisibleSnack}) => {

  // const [activities, setActivity] = useState(useSelector((state) => state.dataActivitiesSlice.all))
  const [refreshing, setrefreshing] = useState(false)
  const { activitiesShow } = useSelector((state) => state.activities)

  const isFocused = useIsFocused() // sabe si retorne a la pagina funciona como true o false
  const dispatch = useDispatch();

  const loadActivities = async () => {
    const data = await getActivities()
    data.reverse()
    
    // !data.status ? dispatch(setActivities(data)) : dispatch(setActivities([]))
    dispatch(setActivities(data))
    dispatch(showActivities(data))
    
  }

  useEffect(() => {
    loadActivities()
  }, [isFocused, updateActivity])



  const onRefresh = React.useCallback(async() => { // esto solo es para poder usar aasync y await con ese mtodo nativo 
    setrefreshing(true)
    await loadActivities()
    setrefreshing(false)
  })
  
  const handleDelete = async (id) => {
    await deleteActivity(id)
    await loadActivities()
  }

  const renderItem = ({item}) => {
    return <ActivityItem setVisibleSnack={setVisibleSnack} activity={item} handleDelete={handleDelete} renderActivity={renderActivity} setRenderActivity={setRenderActivity} />
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