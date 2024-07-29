import React from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LogoutButton = ({ navigation }) => {
  const handleLogout = async () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinizden emin misiniz?',
      [
        { text: 'Hayır', style: 'cancel' },
        { text: 'Evet', onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) {
              Alert.alert('Hata', 'Giriş yapmamışsınız.');
              return;
            }

            const response = await axios.get(
              'https://api.onsocloud.com/api/auth/logout',
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log('Logout Response:', response.data);
            await AsyncStorage.removeItem('accessToken');
            navigation.navigate('Log In Screen');
          } catch (error) {
            console.log('Logout error:', error.response ? error.response.data : error.message);
            Alert.alert('Hata', 'Çıkış yaparken bir hata oluştu.');
          }
        }},
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Icon name="log-out-outline" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1e90ff',
    borderRadius: 25,
    padding: 10,
    elevation: 5,
    zIndex: 1,
  },
});

export default LogoutButton;
