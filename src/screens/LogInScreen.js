import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    try {
      const response = await axios.post('https://api.onsocloud.com/api/auth/login', {
        email,
        password,
      });

      // Yanıtı kontrol et
      console.log('Response:', response.data);

      const { KiboApp } = response.data;
      const { kiboType, errorCode, data, kiboMessage } = KiboApp.Response;

      if (kiboType === 'success') {
        if (errorCode === 'AU10001') {
          const token = data.authorization.access_token;
          await AsyncStorage.setItem('accessToken', token);

          Alert.alert('Başarılı', 'Giriş başarılı');
          //Başarılı giriş sonrası Home Screen yönlendirme
          navigation.navigate('Home Screen');
        } else {
          handleErrorCode(errorCode, kiboMessage);
        }
      } else {
        Alert.alert('Hata', 'Beklenmeyen bir hata oluştu.');
      }
    } catch (error) {
      // Hata mesajını kontrol et
      console.log('Error:', error.response?.data);

      const errorMessage = error.response?.data?.message || 'Bir hata oluştu.';
      Alert.alert('Hata', errorMessage);
    }
  };

  const handleErrorCode = (errorCode, kiboMessage) => {
    let errorMessage;

    switch (errorCode) {
      case 'AU10000':
        errorMessage = 'Geçersiz erişim anahtarı veya sonlanmış bir oturum anahtarı kullanıyorsunuz.';
        break;
      case 'AU10001':
        errorMessage = 'Giriş başarılı.';
        break;
      case 'AU10002':
        errorMessage = 'Mail adresi veya şifre yanlış.';
        break;
      case 'AU10003':
        errorMessage = 'Kullanıcı pasif.';
        break;
      case 'AU10004':
        errorMessage = 'Yazılım lisans süreniz bitmiş.';
        break;
      default:
        errorMessage = kiboMessage || 'Bilinmeyen bir hata oluştu.';
    }

    // Hata mesajını kontrol et
    console.log('Error Message:', errorMessage);

    Alert.alert('Hata', errorMessage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogIn}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Sign Up Screen')}>
        <Text style={styles.link}>Hesabınız yok mu? Kayıt Olun</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  button: {
    height: 50,
    backgroundColor: '#1e90ff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    color: '#1e90ff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LogInScreen;
