import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ArrowDown, ArrowUp, Dumbbell } from 'lucide-react-native';

type Goal = 'lose_weight' | 'gain_weight' | 'maintain';

interface GoalSelectionProps {
  onComplete: () => void;
}

export default function GoalSelection({ onComplete }: GoalSelectionProps) {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const handleGoalSelection = (goal: Goal) => {
    setSelectedGoal(goal);
    onComplete();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        What's your primary goal? This helps us create the perfect meal plan for you.
      </Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[
            styles.option, 
            selectedGoal === 'lose_weight' && styles.selectedOption
          ]}
          onPress={() => handleGoalSelection('lose_weight')}
        >
          <View style={[styles.iconContainer, selectedGoal === 'lose_weight' && styles.selectedIconContainer]}>
            <ArrowDown 
              size={24} 
              color={selectedGoal === 'lose_weight' ? '#FFFFFF' : '#22C55E'} 
            />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={[styles.optionTitle, selectedGoal === 'lose_weight' && styles.selectedOptionText]}>
              Lose Weight
            </Text>
            <Text style={[styles.optionDescription, selectedGoal === 'lose_weight' && styles.selectedOptionText]}>
              Calorie deficit with proper nutrition
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.option, 
            selectedGoal === 'gain_weight' && styles.selectedOption
          ]}
          onPress={() => handleGoalSelection('gain_weight')}
        >
          <View style={[styles.iconContainer, selectedGoal === 'gain_weight' && styles.selectedIconContainer]}>
            <ArrowUp 
              size={24} 
              color={selectedGoal === 'gain_weight' ? '#FFFFFF' : '#22C55E'} 
            />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={[styles.optionTitle, selectedGoal === 'gain_weight' && styles.selectedOptionText]}>
              Gain Weight
            </Text>
            <Text style={[styles.optionDescription, selectedGoal === 'gain_weight' && styles.selectedOptionText]}>
              Calorie surplus with balanced nutrition
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.option, 
            selectedGoal === 'maintain' && styles.selectedOption
          ]}
          onPress={() => handleGoalSelection('maintain')}
        >
          <View style={[styles.iconContainer, selectedGoal === 'maintain' && styles.selectedIconContainer]}>
            <Dumbbell 
              size={24} 
              color={selectedGoal === 'maintain' ? '#FFFFFF' : '#22C55E'} 
            />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={[styles.optionTitle, selectedGoal === 'maintain' && styles.selectedOptionText]}>
              Maintain
            </Text>
            <Text style={[styles.optionDescription, selectedGoal === 'maintain' && styles.selectedOptionText]}>
              Balanced nutrition with current weight
            </Text>
          </View>
        </TouchableOpacity>
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
  optionsContainer: {
    gap: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  selectedOption: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  selectedIconContainer: {
    backgroundColor: '#22C55E',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  optionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  selectedOptionText: {
    color: '#166534',
  },
});