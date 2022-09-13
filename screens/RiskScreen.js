import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Layout from '../components/Layouts/Layout'
import TaskList from '../components/HomeScreen/TaskList'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons';
import GlOBALS from '../Globals'
import useUpContext from '../context/useUpContext'

const RiskScreen = () => {

  const navigation = useNavigation()

  const context = useUpContext();

  return (
    
    <Layout>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Text style={styles.header}>Lista Reportes</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonReport}
          onPress={()=>{
            navigation.navigate('Reporte')
            context.upRoutedId(null)
            context.upOption(null);
          }}
        >
        <Entypo name="new-message" size={GlOBALS.SIZE.SMALL} color={GlOBALS.COLOR.ICONS} />
        </TouchableOpacity>
      </View>
      <TaskList/>
    </Layout>
  )
}

// Posicionamiento (position, top, right, bottom, left, z-index)
// Composición (float, clear, display, box-sizing, visibility, overflow, clip)
// Modelo de caja (width, height, margin, padding)
// Contenidos especiales (list, table, quotes, content, counter)
// Tipografía y texto (font, text-align, text-transform)
// Color y apariencia (outline, color, background, border)
// Efectos visuales (box-shadow, text-shadow, transform, transition)
// Miscelánea (opacity, cursor, filters)
// Impresión (page-break, orphans, widows)

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width:'100%',
    height: 30,
  },
  containerHeader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0, 
    left: 0,
    right: 0,
    bottom: 0
  },
  header: {
    fontWeight: 'bold',
    fontSize: GlOBALS.SIZE.EXTRA_SMALL

  },
  buttonReport: {
  }

})

export default RiskScreen