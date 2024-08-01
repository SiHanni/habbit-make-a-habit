import React, {useEffect, useState} from 'react';
import {Text, Button, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getHabitInfo} from '../services/api';
import {SafeAreaView} from 'react-native-safe-area-context';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getHabitInfo(21); // userId를 쿼리 파라미터로 전송
        setData(result);
      } catch (error) {
        console.error('Failed to fetch habit info', error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      {data ? (
        <Text>Data: {JSON.stringify(data)}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
