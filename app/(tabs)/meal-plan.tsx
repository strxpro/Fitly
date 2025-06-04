import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { CalendarDays, ChevronLeft, ChevronRight, BookOpen, ChevronDown } from 'lucide-react-native';

export default function MealPlanScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meal Plan</Text>
      </View>

      <View style={styles.dateSelector}>
        <TouchableOpacity style={styles.dateButton}>
          <ChevronLeft size={20} color="#6B7280" />
        </TouchableOpacity>
        <View style={styles.dateContainer}>
          <CalendarDays size={18} color="#22C55E" style={styles.calendarIcon} />
          <Text style={styles.dateText}>May 28 - June 3</Text>
          <ChevronDown size={16} color="#6B7280" />
        </View>
        <TouchableOpacity style={styles.dateButton}>
          <ChevronRight size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <DayMealPlan
          date="Wednesday, May 31"
          isToday={true}
          meals={[
            {
              id: '1',
              type: 'Breakfast',
              title: 'Greek Yogurt with Berries',
              image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
              calories: 320,
              time: '7:30 AM',
            },
            {
              id: '2',
              type: 'Lunch',
              title: 'Grilled Chicken Salad',
              image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
              calories: 450,
              time: '12:30 PM',
            },
            {
              id: '3',
              type: 'Snack',
              title: 'Apple with Almond Butter',
              image: 'https://images.pexels.com/photos/209439/pexels-photo-209439.jpeg',
              calories: 180,
              time: '3:00 PM',
            },
            {
              id: '4',
              type: 'Dinner',
              title: 'Salmon with Roasted Vegetables',
              image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
              calories: 550,
              time: '7:00 PM',
            },
          ]}
        />

        <DayMealPlan
          date="Thursday, June 1"
          isToday={false}
          meals={[
            {
              id: '5',
              type: 'Breakfast',
              title: 'Avocado Toast with Egg',
              image: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg',
              calories: 350,
              time: '7:30 AM',
            },
            {
              id: '6',
              type: 'Lunch',
              title: 'Quinoa Bowl with Veggies',
              image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
              calories: 420,
              time: '12:30 PM',
            },
            {
              id: '7',
              type: 'Snack',
              title: 'Greek Yogurt with Honey',
              image: 'https://images.pexels.com/photos/612804/pexels-photo-612804.jpeg',
              calories: 150,
              time: '3:00 PM',
            },
            {
              id: '8',
              type: 'Dinner',
              title: 'Stir-fried Tofu with Vegetables',
              image: 'https://images.pexels.com/photos/1093837/pexels-photo-1093837.jpeg',
              calories: 480,
              time: '7:00 PM',
            },
          ]}
        />
      </ScrollView>

      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <BookOpen size={18} color="#22C55E" />
          <Text style={styles.summaryTitle}>Weekly Summary</Text>
        </View>
        <View style={styles.summaryStats}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>14,250</Text>
            <Text style={styles.summaryLabel}>Total Calories</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>112 PLN</Text>
            <Text style={styles.summaryLabel}>Total Cost</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>28</Text>
            <Text style={styles.summaryLabel}>Meals</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

interface DayMealPlanProps {
  date: string;
  isToday: boolean;
  meals: {
    id: string;
    type: string;
    title: string;
    image: string;
    calories: number;
    time: string;
  }[];
}

function DayMealPlan({ date, isToday, meals }: DayMealPlanProps) {
  return (
    <View style={styles.dayContainer}>
      <View style={styles.dayHeader}>
        <Text style={[styles.dayText, isToday && styles.todayText]}>
          {date} {isToday && <Text style={styles.todayBadge}>TODAY</Text>}
        </Text>
        <Text style={styles.dayCalories}>
          {meals.reduce((sum, meal) => sum + meal.calories, 0)} kcal
        </Text>
      </View>

      {meals.map((meal) => (
        <TouchableOpacity key={meal.id} style={styles.mealItem}>
          <View style={styles.mealTimeContainer}>
            <Text style={styles.mealTime}>{meal.time}</Text>
            <Text style={styles.mealType}>{meal.type}</Text>
          </View>
          <View style={styles.mealContent}>
            <Image source={{ uri: meal.image }} style={styles.mealImage} />
            <View style={styles.mealInfo}>
              <Text style={styles.mealTitle}>{meal.title}</Text>
              <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  dateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#111827',
    marginRight: 8,
  },
  dayContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#4B5563',
  },
  todayText: {
    color: '#111827',
  },
  todayBadge: {
    backgroundColor: '#22C55E',
    color: '#FFFFFF',
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  dayCalories: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B7280',
  },
  mealItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    overflow: 'hidden',
  },
  mealTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  mealTime: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  mealType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#22C55E',
  },
  mealContent: {
    flexDirection: 'row',
    padding: 12,
  },
  mealImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  mealInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  mealTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  mealCalories: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginLeft: 8,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 4,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
});