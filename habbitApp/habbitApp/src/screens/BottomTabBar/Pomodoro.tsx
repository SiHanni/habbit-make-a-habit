import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackButtonHeader from '../../components/BackButtonHeader';

const PomodoroScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <BackButtonHeader />
      <Text>Pomodoro Timer Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PomodoroScreen;
