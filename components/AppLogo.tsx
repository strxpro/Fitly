import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AppLogoProps {
  size?: number;
  color?: string;
}

export function AppLogo({ size = 100, color = '#4F46E5' }: AppLogoProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="fitness-outline" size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 