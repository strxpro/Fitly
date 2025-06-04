import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { X, Plus, Search } from 'lucide-react-native';

interface FoodPreferencesProps {
  onComplete: () => void;
}

interface FoodItem {
  id: string;
  name: string;
}

const popularIngredients: FoodItem[] = [
  { id: '1', name: 'Tomatoes' },
  { id: '2', name: 'Spinach' },
  { id: '3', name: 'Chicken' },
  { id: '4', name: 'Rice' },
  { id: '5', name: 'Mushrooms' },
  { id: '6', name: 'Pasta' },
  { id: '7', name: 'Potatoes' },
  { id: '8', name: 'Garlic' },
  { id: '9', name: 'Onions' },
];

export default function FoodPreferences({ onComplete }: FoodPreferencesProps) {
  const [searchText, setSearchText] = useState('');
  const [likedFoods, setLikedFoods] = useState<FoodItem[]>([]);
  const [dislikedFoods, setDislikedFoods] = useState<FoodItem[]>([]);

  // Add custom food item
  const addCustomFood = (type: 'like' | 'dislike') => {
    if (searchText.trim()) {
      const newFood = { id: Date.now().toString(), name: searchText.trim() };
      if (type === 'like') {
        setLikedFoods(prev => [...prev, newFood]);
      } else {
        setDislikedFoods(prev => [...prev, newFood]);
      }
      setSearchText('');
    }
  };

  // Remove food item
  const removeFood = (id: string, type: 'like' | 'dislike') => {
    if (type === 'like') {
      setLikedFoods(prev => prev.filter(item => item.id !== id));
    } else {
      setDislikedFoods(prev => prev.filter(item => item.id !== id));
    }
  };

  // Add popular ingredient
  const addPopularIngredient = (item: FoodItem, type: 'like' | 'dislike') => {
    if (type === 'like') {
      if (!likedFoods.some(food => food.id === item.id)) {
        setLikedFoods(prev => [...prev, item]);
      }
    } else {
      if (!dislikedFoods.some(food => food.id === item.id)) {
        setDislikedFoods(prev => [...prev, item]);
      }
    }
  };

  // Mark as complete when at least one preference is set
  React.useEffect(() => {
    if (likedFoods.length > 0 || dislikedFoods.length > 0) {
      onComplete();
    }
  }, [likedFoods, dislikedFoods, onComplete]);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Tell us about your food preferences so we can tailor your meal suggestions.
      </Text>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search ingredients..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={styles.addButtonsContainer}>
          <TouchableOpacity 
            style={[styles.addButton, styles.likeButton]} 
            onPress={() => addCustomFood('like')}
          >
            <Plus size={16} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.addButton, styles.dislikeButton]} 
            onPress={() => addCustomFood('dislike')}
          >
            <Plus size={16} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Dislike</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.preferencesContainer}>
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Foods You Like</Text>
          <View style={styles.tagsContainer}>
            {likedFoods.map((food) => (
              <View key={food.id} style={[styles.tag, styles.likeTag]}>
                <Text style={styles.tagText}>{food.name}</Text>
                <TouchableOpacity onPress={() => removeFood(food.id, 'like')}>
                  <X size={16} color="#166534" />
                </TouchableOpacity>
              </View>
            ))}
            {likedFoods.length === 0 && (
              <Text style={styles.emptyText}>Add foods you enjoy</Text>
            )}
          </View>
        </View>

        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>Foods You Dislike</Text>
          <View style={styles.tagsContainer}>
            {dislikedFoods.map((food) => (
              <View key={food.id} style={[styles.tag, styles.dislikeTag]}>
                <Text style={styles.tagText}>{food.name}</Text>
                <TouchableOpacity onPress={() => removeFood(food.id, 'dislike')}>
                  <X size={16} color="#9F1239" />
                </TouchableOpacity>
              </View>
            ))}
            {dislikedFoods.length === 0 && (
              <Text style={styles.emptyText}>Add foods you want to avoid</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.popularContainer}>
        <Text style={styles.sectionTitle}>Popular Ingredients</Text>
        <FlatList
          data={popularIngredients}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.popularItem}>
              <Text style={styles.popularItemText}>{item.name}</Text>
              <View style={styles.popularItemButtons}>
                <TouchableOpacity 
                  style={[styles.smallButton, styles.smallLikeButton]}
                  onPress={() => addPopularIngredient(item, 'like')}
                >
                  <Plus size={12} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.smallButton, styles.smallDislikeButton]}
                  onPress={() => addPopularIngredient(item, 'dislike')}
                >
                  <X size={12} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
  searchContainer: {
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  addButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  likeButton: {
    backgroundColor: '#22C55E',
  },
  dislikeButton: {
    backgroundColor: '#EF4444',
  },
  addButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  preferencesContainer: {
    marginBottom: 24,
  },
  preferencesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  likeTag: {
    backgroundColor: '#DCFCE7',
  },
  dislikeTag: {
    backgroundColor: '#FEE2E2',
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginRight: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  popularContainer: {
    marginBottom: 16,
  },
  popularItem: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    width: 120,
  },
  popularItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  popularItemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallLikeButton: {
    backgroundColor: '#22C55E',
  },
  smallDislikeButton: {
    backgroundColor: '#EF4444',
  },
});