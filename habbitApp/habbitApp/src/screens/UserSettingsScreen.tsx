// src/screens/UserSettingsScreen.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const UserSettingsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>User Settings Page</Text>
      {/* 실제 유저 설정 페이지 내용은 나중에 추가 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default UserSettingsScreen;
