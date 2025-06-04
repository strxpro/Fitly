import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

interface PhysicalDataProps {
  onComplete: () => void;
}

type Gender = 'male' | 'female' | 'other';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

const activityLabels = {
  sedentary: 'Sedentary (office job)',
  light: 'Light Exercise (1-2 days/week)',
  moderate: 'Moderate Exercise (3-5 days/week)',
  active: 'Active (6-7 days/week)',
  very_active: 'Very Active (2x per day)',
};

export default function PhysicalData({ onComplete }: PhysicalDataProps) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | null>(null);

  // Check if all fields are filled
  const isComplete = !!age && !!gender && !!height && !!weight && !!activityLevel;

  // Update completion status when all fields are filled
  React.useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [age, gender, height, weight, activityLevel, onComplete, isComplete]);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Please provide your physical information to help us calculate your nutritional needs.
      </Text>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Age</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Your age"
          value={age}
          onChangeText={setAge}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Gender</Text>
        <View style={styles.genderOptions}>
          <TouchableOpacity 
            style={[styles.genderOption, gender === 'male' && styles.selectedOption]}
            onPress={() => setGender('male')}
          >
            <Text style={[styles.genderText, gender === 'male' && styles.selectedOptionText]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.genderOption, gender === 'female' && styles.selectedOption]}
            onPress={() => setGender('female')}
          >
            <Text style={[styles.genderText, gender === 'female' && styles.selectedOptionText]}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.genderOption, gender === 'other' && styles.selectedOption]}
            onPress={() => setGender('other')}
          >
            <Text style={[styles.genderText, gender === 'other' && styles.selectedOptionText]}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Your height in centimeters"
          value={height}
          onChangeText={setHeight}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          placeholder="Your weight in kilograms"
          value={weight}
          onChangeText={setWeight}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Activity Level</Text>
        <View style={styles.activityOptions}>
          {(Object.keys(activityLabels) as ActivityLevel[]).map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.activityOption, activityLevel === level && styles.selectedOption]}
              onPress={() => setActivityLevel(level)}
            >
              <Text 
                style={[styles.activityText, activityLevel === level && styles.selectedOptionText]}
              >
                {activityLabels[level]}
              </Text>
            </TouchableOpacity>
          ))}
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
  formSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
  },
  genderText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#374151',
  },
  activityOptions: {
    gap: 8,
  },
  activityOption: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  activityText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
  },
  selectedOption: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
  },
  selectedOptionText: {
    color: '#166534',
  },
});