import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import GLOBALS from '../../Globals';
import { useState } from 'react';
import { useEffect } from 'react';
import Indicators from '../custom/Indicators';
import DropDownCustom from '../custom/DropDownCustom';

import { Modal} from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import NoFound from '../NoFound';
import StaticsTaskModal from './StaticsScreen/StaticsTaskModal';

const StatisticsData = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const { workers } = useSelector((state) => state.workers);

  const [worker, setWorker] = useState({
    dni: null,
    name: ''
  });
  const [number, setnumber] = useState();
  const [visible, setVisible] = useState(false);

  const [riskList, setRiskList] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [indicatorPerson, setIndicatorsPerson] = useState([]);
  const [dataPersonRisk, setDataPersonRisk] = useState([]);
  const [filterRisk, setFilterRisk] = useState([]);
  const [riskModal, setRiskModal] = useState('');

  const porcentFunc = () => {
    let riskPorcent = riskList.map((risk) => {
      let porcent = 0;
      let number;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].type_risk === risk) {
          ++porcent;
        }
      }
      number = porcent;
      porcent = porcent / tasks.length;
      porcent = porcent.toFixed(3);
      return { porcent, risk, number };
    });
    setIndicators(riskPorcent);
  };

  const typeRiskFunc = () => {
    let typeRisk = tasks.map((element) => element.type_risk);
    typeRisk = typeRisk.filter((item, index, self) => {
      return self.indexOf(item) === index;
    });
    setRiskList(typeRisk);
    porcentFunc();
  };

  const renderReportPerson= () => {
      const riskPerson = []
      let porcentAll = 0;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].document_number === worker.dni) {
          riskPerson.push(tasks[i])
          ++porcentAll;
        }
      }

      setDataPersonRisk(riskPerson)

      let riskPorcent = riskList.map((risk) => {
        let porcent = 0;
        let number;
        for (let i = 0; i < riskPerson.length; i++) {
          if (riskPerson[i].type_risk === risk) {
            ++porcent;
          }
        }
        number = porcent;
        porcent = porcent / porcentAll;
        porcent = porcent.toFixed(3);
        if (porcent > 0) {
          return { porcent, risk, number };
        } else {
          return null
        }
      });

      riskPorcent = riskPorcent.filter((risk)=> risk ) 
      setIndicatorsPerson(riskPorcent);
  }

  useEffect(() => {
    typeRiskFunc();
  }, [tasks]);

  useEffect(() => {
    renderReportPerson();
  }, [worker]);


  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showDataModal = () => {
    if (!riskModal) return
  
    showModal();
    let riskFilterPerson = dataPersonRisk.filter((report)=> report.type_risk === riskModal) 
    setFilterRisk(riskFilterPerson)

  }

  const renderItem = ({item}) => {
    return <StaticsTaskModal task={item} />
  }

  useEffect(() => {
    showDataModal();
  }, [riskModal]);

  

  const indicatorsRender = indicators.map((indicator) => (
    <Indicators
      title={indicator.risk}
      porcent={indicator.porcent}
      number={indicator.number}
      color={GLOBALS.COLOR.PRIMARY}
    />
  ));

  const indicatorsPersonRender = indicatorPerson.map((indicator) => (
    <Indicators
      title={indicator.risk}
      porcent={indicator.porcent}
      number={indicator.number}
      color={GLOBALS.COLOR.PRIMARY}
      setRiskModal={setRiskModal}
      showDataModal={showDataModal}
    />
  ));

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const containerStyle = {
    width: '100%',
    marginTop: '5%',
  };

  return (
    <>
       
  
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={styles.container}>
        <View style={styles.indicators}>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={styles.indicatorsTitle}>
              <AntDesign
                name="barschart"
                size={30}
                color={GLOBALS.COLOR.WHITE}
              />
              Total Reportes{' '}
            </Text>
            <Text style={styles.indicatorsTitleNumber}>{tasks.length}</Text>
          </View>
          {indicatorsRender.length > 0  ?
          <ScrollView horizontal={true}>{indicatorsRender}</ScrollView>
          : <NoFound w={0} h={0}/>
          } 
        </View>
      </View>
      <View
        style={{
          width: '95%',
          height: 2,
          top: 128,
          backgroundColor: GLOBALS.COLOR.GREY,
        }}
      ></View>
      <View style={styles.containerPerson}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginTop:20,
          marginBottom:10,
        }}>
          <Text style={styles.indicatorsTitlePerson}><Ionicons name="person-sharp" size={24} color="black" /> Reportes {"\n"} Empleado</Text>
          <Text style={styles.indicatorsTitleNumberPerson}>{indicatorPerson.length}</Text>
          <View style={styles.cotainerDropDownPerson}>
            <DropDownCustom
              dataList={workers}
              label="Empleado"
              isFocus={isFocus}
              setIsFocus={setIsFocus}
              setValue={setValue}
              value={value}
              valueData={worker.name}
              setData={setWorker}
              data={worker}
            />
          </View>
        </View>
        <View style={styles.indicatorsPerson}>
          {indicatorsPersonRender.length > 0  ?
           <ScrollView horizontal={true}>{indicatorsPersonRender}</ScrollView>
           : <NoFound w={0} h={0}/>
          } 
              <View
        style={{
          width: '95%',
          height: 2,
          backgroundColor: GLOBALS.COLOR.GREY,
        }}
      ></View>
        </View>
    
      </View>
    </View>
    <Modal
         contentContainerStyle={containerStyle}
          visible={visible}
          onDismiss={hideModal}
        >
      <FlatList
          style={{ width: '100%' }}
          data={filterRisk}
          keyExtractor={(item) => `${item.id} `}
          renderItem={renderItem}
      />
        </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    top: -60,
    width: '100%',
  },
  cotainerDropDown: {
    alignItems: 'center',
    marginVertical: 20,
    width: '70%',
  },
  indicatorsTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: GLOBALS.COLOR.WHITE,
    fontWeight: GLOBALS.WEIGHT.MEDIUM,
    marginBottom: 5,
  },
  indicatorsTitleNumber: {
    backgroundColor: GLOBALS.COLOR.WHITE,
    color: GLOBALS.COLOR.BLACK,
    borderRadius: 30,
    fontSize: 20,
    paddingHorizontal: 5,
    fontWeight: GLOBALS.WEIGHT.BIG,
    marginBottom: 5,
  },
  indicatorsTitleNumberPerson: {
    backgroundColor: GLOBALS.COLOR.BLACK,
    color: GLOBALS.COLOR.WHITE,
    borderRadius: 30,
    fontSize: 20,
    paddingHorizontal: 5,
    fontWeight: GLOBALS.WEIGHT.BIG,
  },
  indicators: {
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorsPerson: {
    height: 155,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    height: 50,
    width: '80%',
    borderColor: GLOBALS.COLOR.PRIMARY,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    color: 'black',
    marginTop: 10,
  },
  containerPerson: {
    top: 130,
    width: '100%',
  },
  cotainerDropDownPerson: {
    width: '55%',
  },
  indicatorsTitlePerson: {
    textAlign: 'center',
    fontSize: 18,
    color: GLOBALS.COLOR.BLACK,
    fontWeight: GLOBALS.WEIGHT.MEDIUM,
    marginBottom: 5,
  },
});

export default StatisticsData;
