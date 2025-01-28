import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import '@/locales/i18nConfig';
import SohoText from '@/components/SohoText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';

const LanguageSelectionScreen = ({navigation, route}) => {
  const {i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const languages = [
    {code: 'en', label: 'English', icon: 'language'},
    {code: 'tr', label: 'Türkçe', icon: 'language'},
    {code: 'de', label: 'Deutsch', icon: 'language'},
  ];

  const handleLanguageChange = languageCode => {
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode);
  };

  const handleMoveToIntroduction = () => {
    if (!route.params) {
      return navigation.navigate('HomeScreen');
    }
    return navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        {languages.map(language => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageButton,
              language.code === selectedLanguage &&
                styles.selectedLanguageButton,
            ]}
            onPress={() => handleLanguageChange(language.code)}>
            <MaterialIcons name={language.icon} size={30} color="white" />
            <SohoText style={styles.languageText}>{language.label}</SohoText>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.moveToIntroductionButton}
        onPress={handleMoveToIntroduction}>
        <SohoText style={styles.moveToIntroductionButtonText}>
          {i18n.t('moveToIntroduction')}
        </SohoText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scaledHeight(40),
  },
  languageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: scaledWidth(20),
    borderRadius: scaledHeight(10),
    alignItems: 'center',
    marginHorizontal: scaledWidth(10),
  },
  selectedLanguageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  languageText: {
    fontSize: scaledHeight(16),
    color: 'white',
    marginTop: scaledHeight(10),
  },
  moveToIntroductionButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: scaledWidth(30),
    paddingVertical: scaledHeight(15),
    borderRadius: scaledHeight(25),
  },
  moveToIntroductionButtonText: {
    fontSize: scaledHeight(16),
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LanguageSelectionScreen;
