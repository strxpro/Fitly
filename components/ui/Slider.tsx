import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import ReactNativeSlider from '@react-native-community/slider';

interface SliderProps {
  minimumValue: number;
  maximumValue: number;
  step: number;
  value: number;
  onValueChange: (value: number) => void;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
}

export const Slider = React.memo(({
  minimumValue,
  maximumValue,
  step,
  value,
  onValueChange,
  minimumTrackTintColor = '#22C55E',
  maximumTrackTintColor = '#E5E7EB',
  thumbTintColor = '#22C55E',
}: SliderProps) => {
  const handleValueChange = useCallback((newValue: number) => {
    onValueChange(newValue);
  }, [onValueChange]);

  return (
    <View style={styles.container}>
      <ReactNativeSlider
        style={styles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
        onValueChange={handleValueChange}
        minimumTrackTintColor={minimumTrackTintColor}
        maximumTrackTintColor={maximumTrackTintColor}
        thumbTintColor={thumbTintColor}
      />
    </View>
  );
});

Slider.displayName = 'Slider';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});