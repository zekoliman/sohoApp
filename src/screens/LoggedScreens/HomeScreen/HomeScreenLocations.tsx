import React, {useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {FlashList} from '@shopify/flash-list';
import SohoText from '@/components/SohoText';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Fonts from '@/theme/Fonts';
import {useNavigation} from '@react-navigation/native';

const locationData = [
  {
    id: '1',
    title: 'Tek Fazlı Sistem',
    date: '14 / 10 / 2024',
    info: [
      {label: 'Harcanan Enerji', value: '120.05 W'},
      {label: 'Haftalık Enerji', value: '840.35 W'},
      {label: 'Aylık Enerji', value: '3,601.50 W'},
    ],
  },
  {
    id: '2',
    title: 'Üç Fazlı Sistem',
    date: '15 / 10 / 2024',
    info: [
      {label: 'Harcanan Enerji', value: '250.75 W'},
      {label: 'Haftalık Enerji', value: '1,000.60 W'},
      {label: 'Aylık Enerji', value: '4,201.20 W'},
    ],
  },
];

const LocationCard = ({item, index, navigation}) => {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    opacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, [translateY, opacity, index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.locationCard, animatedStyle]}>
      <View style={styles.locationHeader}>
        <View style={styles.locationIconContainer}>
          <Icon name="place" size={30} color="#fff" />
        </View>
        <View style={styles.locationDetailsContainer}>
          <SohoText style={styles.locationTitle} fontFamily={Fonts.Bold}>
            {item.title}
          </SohoText>
          <SohoText style={styles.locationDate}>{item.date}</SohoText>
        </View>
      </View>
      <View style={styles.locationInfoContainer}>
        {item.info.map((infoItem, index) => (
          <View key={index} style={styles.infoItem}>
            <SohoText style={styles.infoLabel}>{infoItem.label}</SohoText>
            <SohoText style={styles.infoValue} fontFamily={Fonts.Bold}>
              {infoItem.value}
            </SohoText>
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('AnalyticsStack')}
        style={styles.detailsButton}>
        <SohoText fontFamily={Fonts.Bold} style={styles.detailsButtonText}>
          Detayları Gör
        </SohoText>
      </TouchableOpacity>
    </Animated.View>
  );
};

const HomeScreenLocations = () => {
  const navigation = useNavigation();
  const renderItem = ({item, index}) => (
    <LocationCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.locationsContainer}>
      <FlashList
        data={locationData}
        renderItem={renderItem}
        estimatedItemSize={300}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flashListContentContainer}
      />
    </View>
  );
};

export default HomeScreenLocations;

const styles = {
  locationsContainer: {
    flex: 1,
    paddingHorizontal: scaledWidth(16),
    paddingTop: scaledHeight(16),
  },
  flashListContentContainer: {
    paddingBottom: 100,
  },
  locationCard: {
    backgroundColor: '#267c8d',
    borderRadius: scaledHeight(16),
    padding: scaledWidth(16),
    marginBottom: scaledHeight(20),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaledHeight(16),
  },
  locationIconContainer: {
    backgroundColor: '#1e4f63',
    borderRadius: scaledHeight(16),
    padding: scaledHeight(10),
    marginRight: scaledWidth(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationDetailsContainer: {
    flex: 1,
  },
  locationTitle: {
    fontSize: scaledHeight(18),
    color: '#fff',
  },
  locationDate: {
    fontSize: scaledHeight(14),
    color: '#ddd',
    marginTop: scaledHeight(4),
  },
  locationInfoContainer: {
    marginBottom: scaledHeight(16),
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaledHeight(8),
  },
  infoLabel: {
    fontSize: scaledHeight(14),
    color: '#ccc',
  },
  infoValue: {
    fontSize: scaledHeight(14),

    color: '#fff',
  },
  detailsButton: {
    backgroundColor: '#fff',
    paddingVertical: scaledHeight(12),
    borderRadius: scaledHeight(8),
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: scaledHeight(16),
    color: '#267c8d',
  },
};
