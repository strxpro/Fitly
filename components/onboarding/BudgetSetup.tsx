import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Slider } from '@/components/ui/Slider';

interface BudgetSetupProps {
  onComplete: () => void;
}

type BudgetFrequency = 'daily' | 'weekly';

export default function BudgetSetup({ onComplete }: BudgetSetupProps) {
  const [budgetAmount, setBudgetAmount] = useState('100');
  const [frequency, setFrequency] = useState<BudgetFrequency>('daily');
  const [sliderValue, setSliderValue] = useState(100);

  // Handle budget changes
  const handleBudgetChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setBudgetAmount(numericValue);
    if (numericValue) {
      setSliderValue(parseInt(numericValue, 10));
    }
  };

  // Handle slider changes
  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    setBudgetAmount(value.toString());
  };

  // Toggle frequency
  const toggleFrequency = () => {
    setFrequency(prev => prev === 'daily' ? 'weekly' : 'daily');
  };

  // Mark as complete when budget is set
  React.useEffect(() => {
    if (budgetAmount) {
      onComplete();
    }
  }, [budgetAmount, onComplete]);

  // Calculate limits based on frequency
  const minValue = frequency === 'daily' ? 20 : 100;
  const maxValue = frequency === 'daily' ? 200 : 1000;
  const step = frequency === 'daily' ? 5 : 50;

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Set your food budget to help us create meal plans that fit your financial goals.
      </Text>

      <View style={styles.budgetContainer}>
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>PLN</Text>
          <TextInput
            style={styles.amountInput}
            keyboardType="number-pad"
            value={budgetAmount}
            onChangeText={handleBudgetChange}
          />
          <Text 
            style={styles.frequencyToggle}
            onPress={toggleFrequency}
          >
            {frequency === 'daily' ? 'per day' : 'per week'}
          </Text>
        </View>

        <View style={styles.sliderContainer}>
          <Slider
            minimumValue={minValue}
            maximumValue={maxValue}
            step={step}
            value={sliderValue}
            onValueChange={handleSliderChange}
            minimumTrackTintColor="#22C55E"
            maximumTrackTintColor="#E5E7EB"
            thumbTintColor="#22C55E"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>{minValue} PLN</Text>
            <Text style={styles.sliderLabel}>{maxValue} PLN</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>What does this mean?</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Average meal cost:</Text>
          <Text style={styles.infoValue}>
            ~{frequency === 'daily' 
              ? `${Math.round(parseInt(budgetAmount, 10) / 3)} PLN` 
              : `${Math.round(parseInt(budgetAmount, 10) / 21)} PLN`} per meal
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Monthly budget:</Text>
          <Text style={styles.infoValue}>
            ~{frequency === 'daily'
              ? `${Math.round(parseInt(budgetAmount, 10) * 30)} PLN`
              : `${Math.round(parseInt(budgetAmount, 10) * 4)} PLN`} per month
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 24,
    lineHeight: 24,
  },
  budgetContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 24,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  currencySymbol: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    color: '#6B7280',
    marginRight: 8,
  },
  amountInput: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: '#111827',
    textAlign: 'center',
    minWidth: 100,
  },
  frequencyToggle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#22C55E',
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
  sliderContainer: {
    marginBottom: 8,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  sliderLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  infoContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#111827',
  },
});