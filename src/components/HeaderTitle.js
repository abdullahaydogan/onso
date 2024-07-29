import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const HeaderTitle = () => {
  const iconSize = Math.min(width * 0.2, 100); // Maksimum 100px olarak sınırlandır

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={[styles.logo, { width: iconSize, height: iconSize }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
  },
});

export default HeaderTitle;
