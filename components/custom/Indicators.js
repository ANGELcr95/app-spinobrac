import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import GLOBALS from '../../Globals';

const Indicators = ({ title, porcent, color, number , setRiskModal, showDataModal }) => {
  return (
    
    <TouchableOpacity
    onPress={()=>{
      if (!setRiskModal) return 
      setRiskModal(title)
      showDataModal()
    }}
    activeOpacity={setRiskModal ? 0.97: 1}
  >
    <View
      style={{
        position: 'relative',
      }}
    >
      <View
        style={{
          width: 125,
          height: 120,
          backgroundColor: GLOBALS.COLOR.WHITE,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderRadius: 5,
        }}
      >
        <View
          style={{
            width: '80%',
          }}
        >
          <Text
            style={{
              color: GLOBALS.COLOR_TRANSAPARENT.FIFTH,
              fontWeight: GLOBALS.WEIGHT.MEDIUM,
              marginBottom: 8,
            }}
          >
            {title}
          </Text>
        </View>
        <View
          style={{
            width: 80,
            height: 70,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <View
            style={{
              backgroundColor: color,
              width: 70,
              height: 70,
              borderTopEndRadius: 35,
              borderTopStartRadius: 35,
              borderBottomEndRadius: 35,
              borderBottomStartRadius: 35,
              position: 'absolute',
            }}
          >
            <View
              style={{
                backgroundColor: GLOBALS.COLOR.WHITE,
                width: porcent <= 0.5 ? -140 * porcent + 70 : 0,
                height: 35,
                top: 0,
                right: -1,
                position: 'absolute',
              }}
            ></View>
            <View
              style={{
                backgroundColor: GLOBALS.COLOR.WHITE,
                width: porcent > 0.5 ? -140 * porcent + 140 : 70,
                height: 36,
                bottom: -1,
                position: 'absolute',
              }}
            ></View>
          </View>

          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              position: 'relative',
              borderColor: GLOBALS.COLOR_TRANSAPARENT.SIXTH,
              borderWidth: 1,
            }}
          >
            <View
              style={{
                backgroundColor: GLOBALS.COLOR.WHITE,
                width: 60,
                height: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                position: 'relative',
                borderColor: GLOBALS.COLOR_TRANSAPARENT.SIXTH,
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  color: color,
                  fontSize: 18,
                  fontWeight: GLOBALS.WEIGHT.EXTRA_BIG,
                }}
              >
                {(porcent * 100) % 10
                  ? (porcent * 100).toFixed(1)
                  : (porcent * 100).toFixed(0)}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  marginTop: 5,
                  fontWeight: GLOBALS.WEIGHT.MEDIUM,
                }}
              >
                %
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              color: GLOBALS.COLOR.RED,
              textAlign: 'center',
              fontSize: 12,
            }}
          >
            Reportes{' '}
          </Text>
          <Text
            style={{
              color: GLOBALS.COLOR.BLACK,
              textAlign: 'center',
              fontSize: 15,
              fontWeight: GLOBALS.WEIGHT.EXTRA_BIG,
            }}
          >
            {number}
          </Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default Indicators;
