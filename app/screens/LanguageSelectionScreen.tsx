import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@app/config/i18n';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polski' },
];

export default function LanguageSelectionScreen() {
  const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.locale);

  const handleLanguageSelect = async (languageCode: string) => {
    try {
      await AsyncStorage.setItem('userLanguage', languageCode);
      i18n.locale = languageCode;
      setSelectedLanguage(languageCode);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Language</Text>
      {LANGUAGES.map((language) => (
        <TouchableOpacity
          key={language.code}
          style={[
            styles.languageButton,
            selectedLanguage === language.code && styles.selectedLanguage,
          ]}
          onPress={() => handleLanguageSelect(language.code)}
        >
          <Text
            style={[
              styles.languageText,
              selectedLanguage === language.code && styles.selectedLanguageText,
            ]}
          >
            {language.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },
  languageButton: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedLanguage: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  languageText: {
    fontSize: 16,
    color: '#111827',
  },
  selectedLanguageText: {
    color: '#FFFFFF',
  },
}); 