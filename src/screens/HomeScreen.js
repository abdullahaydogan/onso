import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';

const HomeScreen = ({ navigation }) => {
  const [term, setTerm] = useState('');

  const handleTermChange = (newTerm) => {
    setTerm(newTerm);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        term={term}
        onTermChange={handleTermChange}
        onTermSubmit={() => {}}
      />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
});

export default HomeScreen;
