import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import WorkerItem from './WorkList/WorkerItem';
import { deleteWork, getWorkers } from '../../services/workers';

const WorkList = ({ newUser }) => {
  const [workers, setWorkers] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const isFocused = useIsFocused(); // sabe si retorne a la pagina funciona como true o false

  const loadWorkers = async () => {
    try {
      const data = await getWorkers();
      setWorkers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadWorkers();
  }, [isFocused, newUser]);

  const onRefresh = React.useCallback(async () => {
    // esto solo es para poder usar aasync y await con ese mtodo nativo
    setrefreshing(true);
    await loadWorkers();
    setrefreshing(false);
  });

  const handleDelete = async (dni) => {
    await deleteWork(dni);
    await loadWorkers();
  };

  const renderItem = ({ item }) => {
    return <WorkerItem worker={item} handleDelete={handleDelete} />;
  };

  return (
    <FlatList
      style={{ width: '100%' }}
      data={workers}
      keyExtractor={(worker) => `${worker.id} `}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          colors={['#78e08f']}
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor="gray"
        />
      }
    />
  );
};

export default WorkList;
