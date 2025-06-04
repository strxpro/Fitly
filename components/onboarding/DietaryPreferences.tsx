import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';

type DietType = 'no_restrictions' | 'vegetarian' | 'vegan' | 'lactose_free' | 'gluten_free';

interface DietaryPreferencesProps {
  onComplete: () => void;
}

export default function DietaryPreferences({ onComplete }: DietaryPreferencesProps) {
  const [selectedDiet, setSelectedDiet] = useState<DietType | null>(null);

  const handleDietSelection = (diet: DietType) => {
    setSelectedDiet(diet);
    onComplete();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Select your dietary preference to help us customize your meal plan.
      </Text>

      <View style={styles.optionsContainer}>
        <DietOption
          title="No Restrictions"
          description="I eat everything"
          isSelected={selectedDiet === 'no_restrictions'}
          onSelect={() => handleDietSelection('no_restrictions')}
        />
        
        <DietOption
          title="Vegetarian"
          description="No meat, but dairy and eggs are fine"
          isSelected={selectedDiet === 'vegetarian'}
          onSelect={() => handleDietSelection('vegetarian')}
        />
        
        <DietOption
          title="Vegan"
          description="No animal products whatsoever"
          isSelected={selectedDiet === 'vegan'}
          onSelect={() => handleDietSelection('vegan')}
        />
        
        <DietOption
          title="Lactose-Free"
          description="No dairy products"
          isSelected={selectedDiet === 'lactose_free'}
          onSelect={() => handleDietSelection('lactose_free')}
        />
        
        <DietOption
          title="Gluten-Free"
          description="No wheat, barley, rye"
          isSelected={selectedDiet === 'gluten_free'}
          onSelect={() => handleDietSelection('gluten_free')}
        />
      </View>
    </View>
  );
}

interface DietOptionProps {
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
}

function DietOption({ title, description, isSelected, onSelect }: DietOptionProps) {
  return (
    <TouchableOpacity 
      style={[styles.option, isSelected && styles.selectedOption]} 
      onPress={onSelect}
    >
      <View style={styles.optionTextContainer}>
        <Text style={[styles.optionTitle, isSelected && styles.selectedOptionText]}>
          {title}
        </Text>
        <Text style={[styles.optionDescription, isSelected && styles.selectedOptionText]}>
          {description}
        </Text>
      </View>
      
      <View style={[styles.checkboxContainer, isSelected && styles.selectedCheckboxContainer]}>
        {isSelected && <Check size={16} color="#FFFFFF" />}
      </View>
    </TouchableOpacity>
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
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  optionTextContainer: {
    flex: 1,
    marginRight: 12,
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
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheckboxContainer: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
});