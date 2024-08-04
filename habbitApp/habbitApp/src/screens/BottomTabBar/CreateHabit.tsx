import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
//import BackButtonHeader from '../../components/BackButtonHeader';

const HabitScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <BackButtonHeader />
      </View> */}
      <View style={styles.content}>
        <Text>Create Habit Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Ensure the container is positioned relatively
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
    zIndex: 1, // Ensure the header is above other content
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, // Adjust this value to provide space for the header
  },
});

export default HabitScreen;
