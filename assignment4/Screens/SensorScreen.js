import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const SensorScreen = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(500);
    const subscription = Accelerometer.addListener(setData);
    return () => subscription.remove();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>X: {data.x.toFixed(2)}</Text>
      <Text>Y: {data.y.toFixed(2)}</Text>
      <Text>Z: {data.z.toFixed(2)}</Text>
    </View>
  );
};

export default SensorScreen;
