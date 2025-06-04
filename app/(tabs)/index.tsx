import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ThumbsUp, ThumbsDown, RefreshCw, Settings, Info } from 'lucide-react-native';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useAuthStore } from '@store/auth.store';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const { user } = useAuthStore();
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.displayName || 'User'}!</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <View style={styles.calorieCard}>
          <View style={styles.calorieInfo}>
            <Text style={styles.calorieTitle}>Daily Calorie Goal</Text>
            <Text style={styles.calorieValue}>1,850 / 2,200</Text>
          </View>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
          <Text style={styles.calorieRemaining}>350 calories remaining</Text>
        </View>

        <View style={styles.mealSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Meals</Text>
            <Text style={styles.sectionSubtitle}>AI-generated for you</Text>
          </View>

          <MealCard
            image="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
            title="Greek Yogurt with Berries"
            mealType="Breakfast"
            calories={320}
            protein={20}
            carbs={30}
            fat={10}
            cost="8 PLN"
            prepTime="5 min"
          />

          <MealCard
            image="https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg"
            title="Grilled Chicken Salad"
            mealType="Lunch"
            calories={450}
            protein={35}
            carbs={25}
            fat={15}
            cost="18 PLN"
            prepTime="15 min"
          />

          <MealCard
            image="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg"
            title="Salmon with Roasted Vegetables"
            mealType="Dinner"
            calories={550}
            protein={40}
            carbs={30}
            fat={25}
            cost="25 PLN"
            prepTime="25 min"
          />
        </View>

        <View style={styles.nutritionFeedback}>
          <View style={styles.feedbackHeader}>
            <Text style={styles.feedbackTitle}>Smart Nutrition Feedback</Text>
            <TouchableOpacity>
              <Info size={20} color="#4B5563" />
            </TouchableOpacity>
          </View>
          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackText}>
              <Text style={styles.highlightText}>Low in fiber today. </Text>
              We've added more whole grains and legumes to tomorrow\'s suggestions.
            </Text>
          </View>
          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackText}>
              <Text style={styles.highlightText}>Great protein intake! </Text>
              You're on track to meet your muscle maintenance goals.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

interface MealCardProps {
  image: string;
  title: string;
  mealType: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  cost: string;
  prepTime: string;
}

function MealCard({
  image,
  title,
  mealType,
  calories,
  protein,
  carbs,
  fat,
  cost,
  prepTime,
}: MealCardProps) {
  return (
    <View style={styles.mealCard}>
      <Image source={{ uri: image }} style={styles.mealImage} />
      <View style={styles.mealInfo}>
        <Text style={styles.mealType}>{mealType}</Text>
        <Text style={styles.mealTitle}>{title}</Text>
        
        <View style={styles.macrosContainer}>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{calories}</Text>
            <Text style={styles.macroLabel}>kcal</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{protein}g</Text>
            <Text style={styles.macroLabel}>protein</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{carbs}g</Text>
            <Text style={styles.macroLabel}>carbs</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroValue}>{fat}g</Text>
            <Text style={styles.macroLabel}>fat</Text>
          </View>
        </View>
        
        <View style={styles.mealDetails}>
          <Text style={styles.mealDetail}>💰 {cost}</Text>
          <Text style={styles.mealDetail}>⏱️ {prepTime}</Text>
        </View>
        
        <View style={styles.mealActions}>
          <TouchableOpacity style={styles.actionButton}>
            <ThumbsUp size={20} color="#22C55E" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <ThumbsDown size={20} color="#EF4444" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <RefreshCw size={20} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    color: '#111827',
    fontFamily: 'Inter-Bold',
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  calorieCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  calorieInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  calorieTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#4B5563',
  },
  calorieValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
  },
  progressBackground: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22C55E',
    borderRadius: 6,
  },
  calorieRemaining: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#22C55E',
    textAlign: 'right',
  },
  mealSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#111827',
  },
  sectionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  mealImage: {
    width: '100%',
    height: 180,
  },
  mealInfo: {
    padding: 16,
  },
  mealType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#22C55E',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  mealTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 12,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  macroLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  mealDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  mealDetail: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
    marginRight: 16,
  },
  mealActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  nutritionFeedback: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  feedbackTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
  },
  feedbackCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  feedbackText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  highlightText: {
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
});