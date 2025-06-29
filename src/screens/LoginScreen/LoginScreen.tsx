import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from './components/InputField';
import GoogleLoginButton from './components/GoogleLoginButton';
import useUserStore from '../../store/useUserStore';

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

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }
    console.log('Đăng nhập với:', email, password);
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      const idToken = tokens.idToken;

      console.log('✅ Google ID Token:', idToken);

      const res = await fetch('http://192.168.0.104:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const text = await res.text();
      console.log('✅ Response text:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('❌ JSON parse error:', err);
        Alert.alert('Lỗi', 'Phản hồi server không đúng định dạng JSON');
        return;
      }

      if (res.ok) {
        console.log('✅ Login success:', data);
        await AsyncStorage.setItem('token', data.token);
        setUser(data);
      } else {
        console.log('❌ Login failed:', data);
        Alert.alert('Login failed', data.message || 'Unknown error');
      }
    } catch (error) {
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
