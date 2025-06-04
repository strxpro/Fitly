import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Check } from 'lucide-react-native';

interface StorePreferencesProps {
  onComplete: () => void;
}

interface Store {
  id: string;
  name: string;
  logo: string;
}

const stores: Store[] = [
  {
    id: '1',
    name: 'Biedronka',
    logo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg',
  },
  {
    id: '2',
    name: 'Lidl',
    logo: 'https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg',
  },
  {
    id: '3',
    name: 'Auchan',
    logo: 'https://images.pexels.com/photos/3962294/pexels-photo-3962294.jpeg',
  },
  {
    id: '4',
    name: 'Carrefour',
    logo: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg',
  },
  {
    id: '5',
    name: 'Kaufland',
    logo: 'https://images.pexels.com/photos/3737639/pexels-photo-3737639.jpeg',
  },
  {
    id: '6',
    name: 'Netto',
    logo: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg',
  },
];

export default function StorePreferences({ onComplete }: StorePreferencesProps) {
  const [selectedStores, setSelectedStores] = useState<string[]>([]);

  const toggleStore = (storeId: string) => {
    setSelectedStores(prev => {
      if (prev.includes(storeId)) {
        return prev.filter(id => id !== storeId);
      } else {
        return [...prev, storeId];
      }
    });
  };

  // Mark as complete when at least one store is selected
  React.useEffect(() => {
    if (selectedStores.length > 0) {
      onComplete();
    }
  }, [selectedStores, onComplete]);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Select your preferred grocery stores. We'll prioritize ingredients available at these stores.
      </Text>

      <ScrollView contentContainerStyle={styles.storesContainer}>
        {stores.map((store) => (
          <TouchableOpacity
            key={store.id}
            style={[styles.storeCard, selectedStores.includes(store.id) && styles.selectedStoreCard]}
            onPress={() => toggleStore(store.id)}
          >
            <View style={styles.storeLogoContainer}>
              <Image source={{ uri: store.logo }} style={styles.storeLogo} />
              {selectedStores.includes(store.id) && (
                <View style={styles.checkmarkContainer}>
                  <Check size={16} color="#FFFFFF" />
                </View>
              )}
            </View>
            <Text style={[styles.storeName, selectedStores.includes(store.id) && styles.selectedStoreName]}>
              {store.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flex: 1,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 24,
    lineHeight: 24,
  },
  storesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  storeCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedStoreCard: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
  },
  storeLogoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  storeLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  checkmarkContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },
  selectedStoreName: {
    color: '#166534',
  },
});