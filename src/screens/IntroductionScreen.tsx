import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SohoText from '@/components/SohoText';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import '@/locales/i18nConfig';
const {width} = Dimensions.get('window');

export const IntroductionScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const {t, i18n} = useTranslation();
  const introData = [
    {
      id: '1',
      title: t('addBranch'),
      description: t('addBranchDescription'),
      icon: 'add-business',
      colors: ['#26A69A', '#00897B'],
    },
    {
      id: '2',
      title: 'Enerji Analizi',
      description: 'Detaylı enerji tüketim analizleri yapın ve tasarruf edin.',
      icon: 'insert-chart',
      colors: ['#2196F3', '#1976D2'],
    },
    {
      id: '3',
      title: 'Cihaz Yönetimi',
      description: 'Tüm cihazlarınızı tek bir yerden kontrol edin.',
      icon: 'devices',
      colors: ['#FFA000', '#FF6F00'],
    },
    {
      id: '4',
      title: 'Raporlama',
      description: 'Özelleştirilebilir raporlar oluşturun ve paylaşın.',
      icon: 'assessment',
      colors: ['#7B1FA2', '#4A148C'],
    },
  ];
  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
  };
  const renderItem = ({item}) => (
    <LinearGradient colors={item.colors} style={styles.slide}>
      <MaterialIcons name={item.icon} size={100} color="white" />
      <SohoText style={styles.title}>{item.title}</SohoText>
      <SohoText style={styles.description}>{item.description}</SohoText>
    </LinearGradient>
  );

  const handleNext = () => {
    if (currentIndex < introData.length - 1) {
      flatListRef.current.scrollToIndex({index: currentIndex + 1});
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  const handleSkip = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={introData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onMomentumScrollEnd={event => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / width,
          );
          setCurrentIndex(newIndex);
        }}
      />
      <View style={styles.pagination}>
        {introData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => changeLanguage('en')}
          style={styles.button}>
          <SohoText style={styles.buttonText}>Atla</SohoText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.button, styles.nextButton]}>
          <SohoText style={[styles.buttonText, styles.nextButtonText]}>
            {currentIndex === introData.length - 1 ? 'Başla' : 'İleri'}
          </SohoText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: scaledWidth(20),
  },
  title: {
    fontSize: scaledHeight(24),
    fontWeight: 'bold',
    color: 'white',
    marginTop: scaledHeight(20),
    marginBottom: scaledHeight(10),
  },
  description: {
    fontSize: scaledHeight(16),
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: scaledWidth(20),
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaledHeight(20),
    position: 'absolute',
    bottom: scaledHeight(60),
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: scaledWidth(10),
    height: scaledWidth(10),
    borderRadius: scaledWidth(5),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: scaledWidth(5),
  },
  paginationDotActive: {
    backgroundColor: 'white',
    width: scaledWidth(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaledWidth(20),
    marginBottom: scaledHeight(20),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    padding: scaledWidth(15),
  },
  buttonText: {
    fontSize: scaledHeight(16),
    color: 'white',
  },
  nextButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: scaledHeight(25),
    paddingHorizontal: scaledWidth(30),
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default IntroductionScreen;
