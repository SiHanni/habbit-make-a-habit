import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
//import BackButtonHeader from '../../components/BackButtonHeader';

const PointsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* <BackButtonHeader /> */}
      <Text>point page will open soon</Text>
      <Text>La page des points va bientôt s'ouvrir</Text>
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

export default PointsScreen;
