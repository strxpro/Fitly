import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react-native';

// Onboarding components
import GoalSelection from '@/components/onboarding/GoalSelection';
import DietaryPreferences from '@/components/onboarding/DietaryPreferences';
import PhysicalData from '@/components/onboarding/PhysicalData';
import FoodPreferences from '@/components/onboarding/FoodPreferences';
import StorePreferences from '@/components/onboarding/StorePreferences';
import BudgetSetup from '@/components/onboarding/BudgetSetup';
import AllergiesSetup from '@/components/onboarding/AllergiesSetup';

const steps = [
  'goal',
  'dietary',
  'physical',
  'food',
  'stores',
  'budget',
  'allergies'
];

const stepTitles = {
  goal: 'Your Goal',
  dietary: 'Dietary Preferences',
  physical: 'Physical Data',
  food: 'Food Preferences',
  stores: 'Store Preferences',
  budget: 'Budget Setup',
  allergies: 'Allergies & Intolerances'
};

export default function OnboardingScreen() {
  const { step } = useLocalSearchParams<{ step: string }>();
  const router = useRouter();
  const currentStepIndex = steps.indexOf(step as string);
  const [stepCompleted, setStepCompleted] = useState(false);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      router.push(`/onboarding/${steps[currentStepIndex + 1]}`);
      setStepCompleted(false);
    } else {
      // Onboarding completed, go to main app
      router.replace('/(tabs)');
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      router.push(`/onboarding/${steps[currentStepIndex - 1]}`);
    } else {
      // If we're on the first step, go back to the welcome screen
      router.replace('/');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'goal':
        return <GoalSelection onComplete={() => setStepCompleted(true)} />;
      case 'dietary':
        return <DietaryPreferences onComplete={() => setStepCompleted(true)} />;
      case 'physical':
        return <PhysicalData onComplete={() => setStepCompleted(true)} />;
      case 'food':
        return <FoodPreferences onComplete={() => setStepCompleted(true)} />;
      case 'stores':
        return <StorePreferences onComplete={() => setStepCompleted(true)} />;
      case 'budget':
        return <BudgetSetup onComplete={() => setStepCompleted(true)} />;
      case 'allergies':
        return <AllergiesSetup onComplete={() => setStepCompleted(true)} />;
      default:
        return <Text>Unknown step</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.title}>{stepTitles[step as keyof typeof stepTitles]}</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.progressContainer}>
        {steps.map((s, index) => (
          <View 
            key={s} 
            style={[
              styles.progressDot, 
              index <= currentStepIndex ? styles.activeDot : {},
            ]} 
          />
        ))}
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderStepContent()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.nextButton, !stepCompleted && styles.nextButtonDisabled]} 
          onPress={handleNext}
          disabled={!stepCompleted}
        >
          <Text style={styles.nextButtonText}>
            {currentStepIndex === steps.length - 1 ? 'Complete' : 'Continue'}
          </Text>
          {currentStepIndex === steps.length - 1 ? (
            <Check size={20} color="#FFFFFF" />
          ) : (
            <ArrowRight size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#22C55E',
    width: 16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  nextButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  nextButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 8,
  },
});