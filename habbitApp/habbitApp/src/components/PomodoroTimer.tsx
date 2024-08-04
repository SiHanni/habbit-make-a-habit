import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const PomodoroTimer: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(1800); // 30분 (1800초)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleStartStop = () => {
    if (isActive) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIsActive(false);
    } else {
      const id = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            clearInterval(id);
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
      setIsActive(true);
    }
  };

  const handleReset = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setSeconds(1800);
    setIsActive(false);
  };

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const radius = 90; // 반지름
  const strokeWidth = 20; // 선의 두께
  const strokeDashoffset = ((1800 - seconds) / 1800) * (2 * Math.PI * radius);

  return (
    <View style={styles.container}>
      <Svg height="220" width="220">
        {/* 배경 원 */}
        <Circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#d0e7f9"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* 진행 원 */}
        <Circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#00aaff"
          strokeWidth={strokeWidth}
          strokeDasharray={`${2 * Math.PI * radius}`}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          rotation="-90"
          originX="110"
          originY="110"
        />
      </Svg>
      <Text style={styles.timer}>
        {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={styles.buttonText}>{isActive ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset} style={styles.button}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  timer: {
    fontSize: 48,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#00aaff',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PomodoroTimer;
