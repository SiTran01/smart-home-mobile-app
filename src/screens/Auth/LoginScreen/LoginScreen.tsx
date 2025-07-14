import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

import InputField from './components/InputField';
import GoogleLoginButton from './components/GoogleLoginButton';
import useUserStore from '../../../store/useUserStore';
import { loginUser, loginGoogleUser } from '../../../services/api/authApi';

import socket from '../../../services/socket/socket';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserStore(state => state.setUser);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1078806341508-9kmi0bvogdtv7g8uokpm4bv9bmpdusck.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    try {
      const user = await loginUser(email, password);
      console.log('✅ Login success:', user);

      await AsyncStorage.setItem('token', user.token);
      setUser(user);

    } catch (error: any) {
      console.error('❌ handleLogin error:', error);
      Alert.alert('Lỗi', error.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const googleUser = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      const idToken = tokens.idToken;

      console.log('✅ Google ID Token:', idToken);

      const user = await loginGoogleUser(idToken);
      console.log('✅ Google login success:', user);

      await AsyncStorage.setItem('token', user.token);
      setUser(user);

      // 🔌 Connect socket sau khi login Google thành công
      socket.auth = { token: user.token };
      socket.connect();
      console.log('🔌 [handleGoogleLogin] Socket connect called');

    } catch (error: any) {
      console.error('❌ handleGoogleLogin error:', error);
      Alert.alert('Lỗi', 'Đăng nhập Google thất bại');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <InputField
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Đăng nhập" onPress={handleLogin} />

      <GoogleLoginButton onPress={handleGoogleLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
  },
});
