import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

interface Props {
  onPress: () => void;
}

const GoogleLoginButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image
        source={{
          uri: 'https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png',
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default GoogleLoginButton;

const styles = StyleSheet.create({
  button: { marginTop: 20, alignItems: 'center' },
  image: { width: 192, height: 48 },
});
