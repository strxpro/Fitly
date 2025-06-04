import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { X, Plus, CircleAlert as AlertCircle } from 'lucide-react-native';

interface AllergiesSetupProps {
  onComplete: () => void;
}

interface Allergen {
  id: string;
  name: string;
}

const commonAllergens: Allergen[] = [
  { id: '1', name: 'Peanuts' },
  { id: '2', name: 'Tree nuts' },
  { id: '3', name: 'Milk' },
  { id: '4', name: 'Eggs' },
  { id: '5', name: 'Wheat' },
  { id: '6', name: 'Soy' },
  { id: '7', name: 'Fish' },
  { id: '8', name: 'Shellfish' },
];

export default function AllergiesSetup({ onComplete }: AllergiesSetupProps) {
  const [searchText, setSearchText] = useState('');
  const [allergies, setAllergies] = useState<Allergen[]>([]);

  // Add custom allergen
  const addCustomAllergen = () => {
    if (searchText.trim()) {
      const newAllergen = { id: Date.now().toString(), name: searchText.trim() };
      setAllergies(prev => [...prev, newAllergen]);
      setSearchText('');
    }
  };

  // Add common allergen
  const addCommonAllergen = (allergen: Allergen) => {
    if (!allergies.some(item => item.id === allergen.id)) {
      setAllergies(prev => [...prev, allergen]);
    }
  };

  // Remove allergen
  const removeAllergen = (id: string) => {
    setAllergies(prev => prev.filter(item => item.id !== id));
  };

  // Mark as complete immediately since allergies are optional
  React.useEffect(() => {
    onComplete();
  }, [onComplete]);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Add any allergies or intolerances you have. This is important for your safety.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type an allergy or intolerance..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={addCustomAllergen}
          disabled={!searchText.trim()}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {allergies.length > 0 ? (
        <View style={styles.allergensContainer}>
          <Text style={styles.sectionTitle}>Your Allergies & Intolerances</Text>
          <View style={styles.tagsContainer}>
            {allergies.map((allergen) => (
              <View key={allergen.id} style={styles.allergenTag}>
                <AlertCircle size={16} color="#DC2626" style={styles.allergenIcon} />
                <Text style={styles.allergenText}>{allergen.name}</Text>
                <TouchableOpacity onPress={() => removeAllergen(allergen.id)}>
                  <X size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No allergies or intolerances added yet</Text>
        </View>
      )}

      <View style={styles.commonContainer}>
        <Text style={styles.sectionTitle}>Common Allergens</Text>
        <View style={styles.commonGrid}>
          {commonAllergens.map((allergen) => (
            <TouchableOpacity 
              key={allergen.id} 
              style={styles.commonItem}
              onPress={() => addCommonAllergen(allergen)}
              disabled={allergies.some(item => item.id === allergen.id)}
            >
              <Text style={[
                styles.commonItemText,
                allergies.some(item => item.id === allergen.id) && styles.disabledText
              ]}>
                {allergen.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.noteContainer}>
        <AlertCircle size={20} color="#FACC15" style={styles.noteIcon} />
        <Text style={styles.noteText}>
          We'll strictly exclude these ingredients from all your meal recommendations.
        </Text>
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#22C55E',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: 8,
  },
  allergensContainer: {
    marginBottom: 24,
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
  allergenTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  allergenIcon: {
    marginRight: 4,
  },
  allergenText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#991B1B',
    marginRight: 8,
  },
  emptyContainer: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  commonContainer: {
    marginBottom: 24,
  },
  commonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  commonItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  commonItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
  },
  disabledText: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: '#FEFCE8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  noteIcon: {
    marginRight: 8,
  },
  noteText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#854D0E',
    lineHeight: 20,
  },
});