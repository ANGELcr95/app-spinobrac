import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import GLOBALS from '../../Globals';

//Styles
import { Dropdown } from 'react-native-element-dropdown';

const DropDownCustom = ({
  dataList,
  label,
  isFocus,
  setIsFocus,
  value,
  setValue,
  valueData,
  setData,
  data,
}) => {
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: GLOBALS.COLOR.BLACK }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <>
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {
            borderColor: GLOBALS.COLOR.RED,
            borderWidth: 2,
          },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dataList}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Selecionar Empleado' : '...'}
        searchPlaceholder="Buscar..."
        value={valueData}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setData({
            ['name']: item.value,
            ['dni']: item.document_number,
          });

          setIsFocus(false);
          setValue(null);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 45,
    borderColor: GLOBALS.COLOR.BLUE,
    borderWidth: 1.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    color: 'black',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 0,
    top: -17,
    zIndex: 999,
    fontSize: 12,
    paddingHorizontal: 7,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default DropDownCustom;
