import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AppLogoProps {
  size?: number;
  color?: string;
}

export default function AppLogo({ size = 32, color = '#4F46E5' }: AppLogoProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.logo, { fontSize: size, color }]}>Fitly</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
  },
}); 