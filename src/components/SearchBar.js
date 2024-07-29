import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchBar({term,onTermChange,onTermSubmit}) {
  return (
    <View style={styles.backgroundStyle}>
      <Icon name="search" size={24} color="#007BFF" style={styles.iconStyle} />
      <TextInput
        style={styles.inputStyle}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search"
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
        value={term}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flexDirection: 'row',
    margin: 10,
    height: 50,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: 15,
  },
  iconStyle: {
    marginRight: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
});