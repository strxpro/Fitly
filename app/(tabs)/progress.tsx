import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { ChartBar as BarChart, Calendar, Award, ArrowUp, ArrowDown, ChevronRight } from 'lucide-react-native';

export default function ProgressScreen() {
  const [activeTab, setActiveTab] = useState('nutrition');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'nutrition' && styles.activeTab]}
          onPress={() => setActiveTab('nutrition')}
        >
          <BarChart size={20} color={activeTab === 'nutrition' ? '#22C55E' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'nutrition' && styles.activeTabText]}>
            Nutrition
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'weight' && styles.activeTab]}
          onPress={() => setActiveTab('weight')}
        >
          <Calendar size={20} color={activeTab === 'weight' ? '#22C55E' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'weight' && styles.activeTabText]}>
            Weight
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'achievements' && styles.activeTab]}
          onPress={() => setActiveTab('achievements')}
        >
          <Award size={20} color={activeTab === 'achievements' ? '#22C55E' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'achievements' && styles.activeTabText]}>
            Achievements
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {activeTab === 'nutrition' && (
          <NutritionTab />
        )}
        
        {activeTab === 'weight' && (
          <WeightTab />
        )}
        
        {activeTab === 'achievements' && (
          <AchievementsTab />
        )}
      </ScrollView>
    </View>
  );
}

function NutritionTab() {
  return (
    <View style={styles.tabContent}>
      <View style={styles.periodSelector}>
        <TouchableOpacity style={[styles.periodOption, styles.activePeriodOption]}>
          <Text style={[styles.periodText, styles.activePeriodText]}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.periodOption}>
          <Text style={styles.periodText}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.periodOption}>
          <Text style={styles.periodText}>3 Months</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Calorie Intake</Text>
          <Text style={styles.chartPeriod}>May 25 - 31</Text>
        </View>
        <View style={styles.chartPlaceholder}>
          <View style={styles.barChart}>
            {[65, 80, 90, 75, 85, 70, 60].map((value, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={[styles.bar, { height: `${value}%` }]} />
                <Text style={styles.barLabel}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#22C55E' }]} />
              <Text style={styles.legendText}>Daily intake</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#E5E7EB' }]} />
              <Text style={styles.legendText}>Goal (2200 kcal)</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Average Daily</Text>
          <Text style={styles.statValue}>2,108</Text>
          <Text style={styles.statUnit}>calories</Text>
          <View style={styles.statTrend}>
            <ArrowDown size={14} color="#22C55E" />
            <Text style={[styles.statTrendText, styles.statTrendDown]}>4% from last week</Text>
          </View>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Protein</Text>
          <Text style={styles.statValue}>112g</Text>
          <Text style={styles.statUnit}>daily avg</Text>
          <View style={styles.statTrend}>
            <ArrowUp size={14} color="#22C55E" />
            <Text style={[styles.statTrendText, styles.statTrendUp]}>8% from last week</Text>
          </View>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Carbs</Text>
          <Text style={styles.statValue}>226g</Text>
          <Text style={styles.statUnit}>daily avg</Text>
          <View style={styles.statTrend}>
            <ArrowDown size={14} color="#22C55E" />
            <Text style={[styles.statTrendText, styles.statTrendDown]}>2% from last week</Text>
          </View>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Fat</Text>
          <Text style={styles.statValue}>76g</Text>
          <Text style={styles.statUnit}>daily avg</Text>
          <View style={styles.statTrend}>
            <ArrowDown size={14} color="#22C55E" />
            <Text style={[styles.statTrendText, styles.statTrendDown]}>6% from last week</Text>
          </View>
        </View>
      </View>

      <View style={styles.insightsCard}>
        <Text style={styles.insightsTitle}>Nutritional Insights</Text>
        <View style={styles.insightItem}>
          <View style={styles.insightIcon}>
            <Award size={20} color="#22C55E" />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightText}>
              Your protein intake is on target for your muscle maintenance goals.
            </Text>
          </View>
          <ChevronRight size={20} color="#9CA3AF" />
        </View>
        <View style={styles.insightItem}>
          <View style={styles.insightIcon}>
            <Award size={20} color="#22C55E" />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightText}>
              Your fiber intake has improved by 15% this week.
            </Text>
          </View>
          <ChevronRight size={20} color="#9CA3AF" />
        </View>
      </View>
    </View>
  );
}

function WeightTab() {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.comingSoonText}>Weight tracking coming soon</Text>
    </View>
  );
}

function AchievementsTab() {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.comingSoonText}>Achievements coming soon</Text>
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#F0FDF4',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#22C55E',
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  periodOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  activePeriodOption: {
    backgroundColor: '#F0FDF4',
  },
  periodText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  activePeriodText: {
    color: '#22C55E',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  chartPeriod: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  chartPlaceholder: {
    height: 200,
  },
  barChart: {
    height: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  barContainer: {
    alignItems: 'center',
    width: 30,
  },
  bar: {
    width: 12,
    backgroundColor: '#22C55E',
    borderRadius: 6,
  },
  barLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
  },
  statUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statTrendText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  statTrendDown: {
    color: '#22C55E',
  },
  statTrendUp: {
    color: '#22C55E',
  },
  insightsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  insightsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  insightIcon: {
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  comingSoonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 40,
  },
});