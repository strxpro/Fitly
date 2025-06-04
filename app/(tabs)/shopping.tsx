import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Check, ShoppingBag, Share2, Printer, SquareCheck as CheckSquare, Square, Plus, Search, ShoppingCart } from 'lucide-react-native';

export default function ShoppingScreen() {
  const [selectedStore, setSelectedStore] = useState('biedronka');
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping List</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.storeSelector}>
        <Text style={styles.storeSelectorLabel}>Select store for pricing:</Text>
        <View style={styles.storeTabs}>
          <TouchableOpacity 
            style={[styles.storeTab, selectedStore === 'biedronka' && styles.selectedStoreTab]}
            onPress={() => setSelectedStore('biedronka')}
          >
            <Text style={[styles.storeTabText, selectedStore === 'biedronka' && styles.selectedStoreTabText]}>
              Biedronka
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.storeTab, selectedStore === 'lidl' && styles.selectedStoreTab]}
            onPress={() => setSelectedStore('lidl')}
          >
            <Text style={[styles.storeTabText, selectedStore === 'lidl' && styles.selectedStoreTabText]}>
              Lidl
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.storeTab, selectedStore === 'auchan' && styles.selectedStoreTab]}
            onPress={() => setSelectedStore('auchan')}
          >
            <Text style={[styles.storeTabText, selectedStore === 'auchan' && styles.selectedStoreTabText]}>
              Auchan
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search items..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <ScrollView style={styles.listContainer}>
        <ShoppingCategory 
          title="Fruits & Vegetables" 
          items={[
            { id: '1', name: 'Spinach', quantity: '250g', price: '3.99 PLN', checked: false },
            { id: '2', name: 'Apples', quantity: '6 pcs', price: '4.50 PLN', checked: true },
            { id: '3', name: 'Avocados', quantity: '2 pcs', price: '7.99 PLN', checked: false },
            { id: '4', name: 'Carrots', quantity: '500g', price: '2.49 PLN', checked: false },
          ]} 
        />

        <ShoppingCategory 
          title="Dairy & Eggs" 
          items={[
            { id: '5', name: 'Greek Yogurt', quantity: '500g', price: '5.99 PLN', checked: true },
            { id: '6', name: 'Eggs', quantity: '10 pcs', price: '8.99 PLN', checked: false },
            { id: '7', name: 'Milk', quantity: '1L', price: '3.29 PLN', checked: false },
          ]} 
        />

        <ShoppingCategory 
          title="Meat & Fish" 
          items={[
            { id: '8', name: 'Chicken Breast', quantity: '500g', price: '13.99 PLN', checked: false },
            { id: '9', name: 'Salmon Fillet', quantity: '300g', price: '19.99 PLN', checked: false },
          ]} 
        />

        <ShoppingCategory 
          title="Grains & Legumes" 
          items={[
            { id: '10', name: 'Quinoa', quantity: '250g', price: '7.99 PLN', checked: true },
            { id: '11', name: 'Brown Rice', quantity: '1kg', price: '5.49 PLN', checked: false },
            { id: '12', name: 'Lentils', quantity: '500g', price: '4.29 PLN', checked: false },
          ]} 
        />
      </ScrollView>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryContent}>
          <View style={styles.summaryHeader}>
            <ShoppingBag size={20} color="#22C55E" />
            <Text style={styles.summaryTitle}>Shopping Summary</Text>
          </View>
          <View style={styles.summaryDetails}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Items:</Text>
              <Text style={styles.summaryValue}>12 items</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Estimated Cost:</Text>
              <Text style={styles.summaryValueHighlight}>82.99 PLN</Text>
            </View>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionPrintButton}>
              <Printer size={20} color="#4B5563" />
              <Text style={styles.actionPrintText}>Print</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionShopButton}>
              <ShoppingCart size={20} color="#FFFFFF" />
              <Text style={styles.actionShopText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

interface ShoppingCategoryProps {
  title: string;
  items: {
    id: string;
    name: string;
    quantity: string;
    price: string;
    checked: boolean;
  }[];
}

function ShoppingCategory({ title, items }: ShoppingCategoryProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity 
        style={styles.categoryHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.categoryTitle}>{title}</Text>
        <Text style={styles.categoryCount}>{items.length} items</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.categoryItems}>
          {items.map(item => (
            <View key={item.id} style={styles.itemContainer}>
              <TouchableOpacity style={styles.checkboxContainer}>
                {item.checked ? (
                  <CheckSquare size={22} color="#22C55E" />
                ) : (
                  <Square size={22} color="#D1D5DB" />
                )}
              </TouchableOpacity>
              <View style={styles.itemDetails}>
                <Text style={[styles.itemName, item.checked && styles.itemChecked]}>
                  {item.name}
                </Text>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.addItemButton}>
            <Plus size={16} color="#6B7280" />
            <Text style={styles.addItemText}>Add Item</Text>
          </TouchableOpacity>
        </View>
      )}
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
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
  },
  actionButton: {
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
  storeSelector: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  storeSelectorLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  storeTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  storeTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedStoreTab: {
    backgroundColor: '#F0FDF4',
  },
  storeTabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  selectedStoreTabText: {
    color: '#22C55E',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  categoryCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  categoryItems: {
    marginTop: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  itemChecked: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  itemQuantity: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  itemPrice: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 4,
  },
  addItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  summaryContent: {
    paddingTop: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginLeft: 8,
  },
  summaryDetails: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#111827',
  },
  summaryValueHighlight: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#22C55E',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionPrintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginRight: 8,
  },
  actionPrintText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 8,
  },
  actionShopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginLeft: 8,
  },
  actionShopText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});