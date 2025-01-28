import React, {useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import SohoText from '@/components/SohoText';
import Fonts from '@/theme/Fonts';
import {FlashList} from '@shopify/flash-list';

const Header = ({title}: string) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const openList = () => {
    //bottomSheetRef.current?.expand();
  };

  return (
    <LinearGradient
      colors={['#E74C3C', '#C0392B']}
      style={styles.headerContainer}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <SohoText fontFamily={Fonts.Bold} style={styles.headerTitle}>
        {title}
      </SohoText>
      <TouchableOpacity onPress={openList} style={styles.listButton}>
        <Icon name="refresh" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export const AlarmScreen = () => {
  const data = [
    {
      id: '1',
      title: 'Kritik Sıcaklık',
      desc: 'Klimanın sıcaklığı 50 dereceyi aştı',
      severity: 'high',
    },
    {
      id: '2',
      title: 'Nem Seviyesi Yüksek',
      desc: 'Nem oranı %80 üzerine çıktı',
      severity: 'medium',
    },
    {
      id: '3',
      title: 'Sıcaklık Normal',
      desc: 'Klimanın sıcaklığı normal',
      severity: 'low',
    },
  ];

  const renderItem = ({item, index}) => <AlarmItem item={item} index={index} />;

  return (
    <View style={styles.container}>
      <Header title="Alarmlar" />
      <ScrollView style={styles.scrollView}>
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          estimatedItemSize={300}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
};

const AlarmItem = ({item, index}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      delay: index * 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [slideAnim, opacityAnim, index]);

  const backgroundColor = getBackgroundColor(item.severity);

  return (
    <Animated.View
      style={[
        styles.alarmCard,
        {
          transform: [{translateY: slideAnim}],
          opacity: opacityAnim,
          backgroundColor: backgroundColor,
        },
      ]}>
      <View style={[styles.iconContainer, {backgroundColor: backgroundColor}]}>
        <Icon name="warning" size={28} color="#FFFFFF" />
      </View>
      <View style={styles.alarmContent}>
        <SohoText fontFamily={Fonts.Bold} style={styles.alarmTitle}>
          {item.title}
        </SohoText>
        <SohoText fontFamily={Fonts.Regular} style={styles.alarmDesc}>
          {item.desc}
        </SohoText>
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="chevron-right" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const getBackgroundColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return '#FF4C4C';
    case 'medium':
      return '#FFA726';
    case 'low':
      return '#66BB6A';
    default:
      return '#FFFFFF';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  headerContainer: {
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#267c8d',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  listButton: {
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  alarmCard: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  alarmContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alarmTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  alarmDesc: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

export default AlarmScreen;
