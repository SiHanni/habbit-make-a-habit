import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const BackButtonHeader: React.FC = () => {
  const navigation = useNavigation<any>(); // Ensure TypeScript understands navigation type

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <MaterialCommunityIcons name="chevron-left" size={40} color="#66CDAA" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 1,
    paddingVertical: 20,
  },
});

export default BackButtonHeader;
