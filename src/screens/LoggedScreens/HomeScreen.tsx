import {
  Animated,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SohoText from '@/components/SohoText';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreenFastMenu from './HomeScreen/components/HomeScreenFastMenu';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '@/theme/Fonts';
import BottomSheet from '@gorhom/bottom-sheet';
import {useAppDispatch} from '@/redux/hooks';
import {getBranch} from '@/redux/slices/getBranchSlice';
import {getDatapoint} from '@/redux/slices/DatapointSlices/getDatapointSlice';
import {getDevice} from '@/redux/slices/DeviceSlices/getDeviceSlice';
import DraggableCardList from '@/components/DraggableCardComponents/DraggableCardList';

const HomeScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const blinkingAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    dispatch(getBranch());
    dispatch(getDatapoint());
    dispatch(getDevice());
  }, []);

  const insets = useSafeAreaInsets();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  useEffect(() => {
    const blink = () => {
      Animated.sequence([
        Animated.timing(blinkingAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkingAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => blink());
    };

    blink();
  }, [blinkingAnim]);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    setIsBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setIsBottomSheetVisible(false);
  };
  const homeScreenHeader = () => {
    return (
      <LinearGradient
        colors={['#5d7bd5', '#56d1dc']}
        style={styles.headerGradientContainer}>
        <Image
          style={styles.headerBackgroundTexture}
          resizeMode="stretch"
          source={require('@/assets/images/slidertexture.png')}
        />
        <View
          style={{
            flex: 1,
            width: '100%',
            paddingTop: insets.top + scaledHeight(12),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <View style={styles.headerWelcomeContainer}>
            <SohoText
              fontFamily={Fonts.Regular}
              color="white"
              style={styles.headerWelcomeText}>
              Merhaba, Hoş Geldin
            </SohoText>
            <SohoText
              color="white"
              fontFamily={Fonts.Bold}
              style={styles.headerNameText}>
              Ali SELEK
            </SohoText>
          </View>
          <View style={styles.headerIconContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('NotificationsScreen')}
              style={styles.notificationButton}>
              <Icon name="notifications" size={48} color="white" />
              <View style={styles.notificationBadge}>
                <SohoText style={styles.badgeText}>3</SohoText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: scaledHeight(10),
            zIndex: 9,
            bottom: -insets.top + scaledHeight(10),
            position: 'absolute',
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}>
          <HomeScreenFastMenu />
        </View>
      </LinearGradient>
    );
  };

  const energyOverviewSection = () => {
    return (
      <View style={styles.overviewContainer}>
        <SohoText style={styles.overviewTitle}>Enerji Genel Bakış</SohoText>
        <View style={styles.overviewGrid}>
          {renderOverviewItem('Anlık Tüketim', '3.2 kW', 'flash-on', '#FF9800')}
          {renderOverviewItem('Günlük Tüketim', '24.5 kWh', 'today', '#4CAF50')}
          {renderOverviewItem(
            'Aylık Tasarruf',
            '150 kWh',
            'trending-down',
            '#2196F3',
          )}
          {renderOverviewItem(
            'Verimlilik Skoru',
            '85%',
            'emoji-events',
            '#9C27B0',
          )}
        </View>
      </View>
    );
  };

  const renderOverviewItem = (title, value, iconName, color) => {
    return (
      <View style={styles.overviewItem}>
        <Icon name={iconName} size={30} color={color} />
        <SohoText style={styles.overviewItemTitle}>{title}</SohoText>
        <SohoText style={[styles.overviewItemValue, {color}]}>{value}</SohoText>
      </View>
    );
  };

  const carbonFootprintSection = () => {
    return (
      <View style={styles.sectionContainer}>
        <LinearGradient
          colors={['#4CAF50', '#45a049']}
          style={styles.sectionGradient}>
          <Icon name="eco" size={40} color="#fff" />
          <View style={styles.sectionTextContainer}>
            <SohoText style={styles.sectionTitle}>
              Tasarruf Edilen Karbon Ayak İzi
            </SohoText>
            <SohoText style={styles.sectionValue}>2.5 ton CO2e</SohoText>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const alarmsSection = () => (
    <View style={styles.sectionContainer}>
      <LinearGradient
        colors={['#E74C3C', '#C0392B']}
        style={styles.sectionGradient}>
        <TouchableOpacity
          style={styles.tipsSectionContent}
          onPress={() => navigation.navigate('AlarmsScreen')}>
          <View style={styles.tipsIconContainer}>
            <Icon name="warning" size={40} color="#fff" />
          </View>
          <View style={styles.tipsTextContainer}>
            <SohoText style={styles.sectionTitle}>Alarmlar</SohoText>
            <SohoText style={styles.tipsSubtitle}>
              3 Aktif Alarm Mevcut
            </SohoText>
          </View>
          <Icon name="chevron-right" size={30} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  const mapsSection = () => (
    <View style={styles.sectionContainer}>
      <LinearGradient
        colors={['#2196F3', '#1976D2']}
        style={styles.sectionGradient}>
        <TouchableOpacity
          style={styles.tipsSectionContent}
          onPress={() => navigation.navigate('BranchesScreen')}>
          <View style={styles.tipsIconContainer}>
            <Icon name="map" size={40} color="#fff" />
          </View>
          <View style={styles.tipsTextContainer}>
            <SohoText style={styles.sectionTitle}>Haritalar</SohoText>
            <SohoText style={styles.tipsSubtitle}>
              Haritaları Görüntüle
            </SohoText>
          </View>
          <Icon name="chevron-right" size={30} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  const energySavingsSection = () => {
    return (
      <View style={styles.sectionContainer}>
        <LinearGradient
          colors={['#2196F3', '#1976D2']}
          style={styles.sectionGradient}>
          <TouchableOpacity
            style={styles.tipsSectionContent}
            onPress={() => navigation.navigate('AnalyticsStack')}>
            <View style={styles.tipsIconContainer}>
              <Icon name="flash-on" size={40} color="#fff" />
            </View>
            <View style={styles.tipsTextContainer}>
              <SohoText style={styles.sectionTitle}>
                Aylık Tüketim Tasarruf
              </SohoText>
              <SohoText style={styles.tipsSubtitle}>150.5 kWh / 50$</SohoText>
            </View>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  const energySavingTipsSection = () => {
    return (
      <View style={styles.sectionContainer}>
        <LinearGradient
          colors={['#FFA726', '#FB8C00']}
          style={styles.sectionGradient}>
          <TouchableOpacity
            style={styles.tipsSectionContent}
            onPress={() => navigation.navigate('EnergyTips')}>
            <View style={styles.tipsIconContainer}>
              <Icon name="lightbulb" size={40} color="#fff" />
            </View>
            <View style={styles.tipsTextContainer}>
              <SohoText style={styles.sectionTitle}>
                Enerji Tasarruf Önerileri
              </SohoText>
              <SohoText style={styles.tipsSubtitle}>
                Tasarruf için ipuçları alın
              </SohoText>
            </View>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };
  const renderSystemSection = (title, data, icon, colors) => {
    return (
      <View style={styles.sectionContainer}>
        <LinearGradient colors={colors} style={styles.sectionGradient}>
          <View style={styles.systemIconContainer}>
            <Icon name={icon} size={40} color="#fff" />
          </View>
          <View style={styles.systemTextContainer}>
            <SohoText style={styles.sectionTitle}>{title}</SohoText>
            <View style={styles.systemDataContainer}>
              <View style={styles.dataItem}>
                <SohoText style={styles.dataLabel}>Gerilim:</SohoText>
                <SohoText style={styles.dataValue}>{data.voltage} V</SohoText>
              </View>
              <View style={styles.dataItem}>
                <SohoText style={styles.dataLabel}>Akım:</SohoText>
                <SohoText style={styles.dataValue}>{data.current} A</SohoText>
              </View>
              <View style={styles.dataItem}>
                <SohoText style={styles.dataLabel}>Güç:</SohoText>
                <SohoText style={styles.dataValue}>{data.power} kW</SohoText>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <>
      <StatusBar translucent hidden backgroundColor="transparent" />
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {homeScreenHeader()}

        <View
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            paddingTop: scaledHeight(12),
            backgroundColor: 'white',
            marginTop: 40,
          }}
          contentContainerStyle={{paddingBottom: scaledHeight(140)}}>
          <StatusBar backgroundColor={'white'} />
          <DraggableCardList />
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['40%']}
        enablePanDownToClose={true}
        onClose={() => setIsBottomSheetVisible(false)}>
        <View style={styles.bottomSheetContent}>
          <SohoText style={styles.bottomSheetTitle}>
            Sıralama Seçenekleri
          </SohoText>
          {[
            'En Yeniler',
            'En Eskiler',
            'Enerji Tüketimine Göre',
            'İsme Göre',
          ].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.sortOption}
              onPress={closeBottomSheet}>
              <SohoText style={styles.sortOptionText}>{option}</SohoText>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  placesContainer: {
    flex: 4,
    paddingHorizontal: scaledWidth(20),
    paddingTop: scaledHeight(12),
  },
  headerGradient: {
    paddingVertical: scaledHeight(16),
    borderRadius: scaledHeight(12),
    marginBottom: scaledHeight(16),
  },
  headerText: {
    fontSize: scaledHeight(18),
    textAlign: 'center',
  },
  placeCard: {
    borderRadius: scaledHeight(12),
    padding: scaledHeight(16),
    backgroundColor: 'white',
    marginTop: scaledHeight(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#1C274C',
    padding: scaledHeight(12),
    borderRadius: 12,
  },
  titleContainer: {
    marginLeft: scaledWidth(16),
  },
  titleText: {
    fontFamily: Fonts.Semibold,
    fontSize: scaledHeight(16),
  },
  dateText: {
    fontSize: scaledHeight(12),
    color: '#8696BB',
    marginTop: scaledHeight(4),
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(134, 150, 187, 0.2)',
    marginVertical: scaledHeight(16),
  },
  infoContainer: {
    marginTop: scaledHeight(8),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaledHeight(8),
  },

  headerGradientContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaledWidth(20),
  },
  headerBackgroundTexture: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerWelcomeContainer: {
    flex: 1,
  },
  headerWelcomeText: {
    fontSize: scaledHeight(16),
    marginBottom: scaledHeight(6),
  },
  headerNameText: {
    fontSize: scaledHeight(22),
  },
  headerIconContainer: {
    marginLeft: scaledWidth(16),
    position: 'relative',
  },
  notificationButton: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    width: scaledWidth(20),
    height: scaledWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: 'white',
    fontSize: scaledHeight(12),
    fontWeight: 'bold',
  },
  locationsContainer: {
    flex: 1,
    padding: scaledWidth(16),
  },
  locationsHeader: {
    padding: scaledHeight(16),
    borderRadius: scaledHeight(12),
    marginBottom: scaledHeight(16),
  },
  locationsHeaderText: {
    fontSize: scaledHeight(18),
    fontFamily: Fonts.Bold,
    color: '#fff',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaledHeight(16),
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: scaledHeight(25),
    paddingHorizontal: scaledWidth(16),
    height: scaledHeight(50),
    marginRight: scaledWidth(12),
  },
  searchIcon: {
    marginRight: scaledWidth(8),
  },
  searchInput: {
    flex: 1,
    fontSize: scaledHeight(16),
    color: '#666',
  },
  sortButton: {
    backgroundColor: '#267c8d',
    borderRadius: scaledHeight(25),
    width: scaledWidth(50),
    height: scaledHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationCard: {
    backgroundColor: '#fff',
    borderRadius: scaledHeight(12),
    padding: scaledWidth(16),

    marginBottom: scaledHeight(16),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaledHeight(16),
  },
  locationIconContainer: {
    backgroundColor: '#267c8d',
    borderRadius: scaledHeight(25),
    width: scaledWidth(50),
    height: scaledHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaledWidth(16),
  },
  locationTitleContainer: {
    flex: 1,
  },
  locationTitle: {
    fontSize: scaledHeight(18),
    fontFamily: Fonts.Semibold,
    color: '#333',
  },
  locationDate: {
    fontSize: scaledHeight(14),
    color: '#666',
    marginTop: scaledHeight(4),
  },
  locationInfoContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: scaledHeight(16),
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaledHeight(8),
  },
  infoLabel: {
    fontSize: scaledHeight(14),
    color: '#666',
  },
  infoValue: {
    fontSize: scaledHeight(14),
    fontFamily: Fonts.Semibold,
    color: '#333',
  },
  bottomSheetContent: {
    padding: scaledWidth(16),
  },
  bottomSheetTitle: {
    fontSize: scaledHeight(18),
    fontFamily: Fonts.Bold,
    color: '#333',
    marginBottom: scaledHeight(16),
    textAlign: 'center',
  },
  sortOption: {
    paddingVertical: scaledHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sortOptionText: {
    fontSize: scaledHeight(16),
    color: '#333',
  },
  tipButton: {
    backgroundColor: '#267c8d',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scaledHeight(16),
    borderRadius: scaledHeight(12),
    marginHorizontal: scaledWidth(16),
    marginTop: scaledHeight(10),
  },
  tipButtonText: {
    color: '#ffffff',
    fontSize: scaledHeight(16),
    marginLeft: scaledWidth(10),
  },

  sectionTextContainer: {
    marginLeft: scaledWidth(16),
  },

  sectionValue: {
    color: '#fff',
    fontSize: scaledHeight(24),
    fontFamily: Fonts.Bold,
    marginTop: scaledHeight(4),
  },
  overviewContainer: {
    marginTop: 40,
    margin: scaledWidth(16),
    backgroundColor: '#fff',
    borderRadius: scaledHeight(12),
    padding: scaledWidth(16),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  overviewTitle: {
    fontSize: scaledHeight(18),
    fontFamily: Fonts.Bold,
    marginBottom: scaledHeight(16),
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  overviewItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: scaledHeight(16),
  },
  overviewItemTitle: {
    fontSize: scaledHeight(14),
    fontFamily: Fonts.Regular,
    textAlign: 'center',
    marginTop: scaledHeight(8),
  },
  overviewItemValue: {
    fontSize: scaledHeight(18),
    fontFamily: Fonts.Bold,
    marginTop: scaledHeight(4),
  },
  comparisonContainer: {
    margin: scaledWidth(16),
    backgroundColor: '#fff',
    borderRadius: scaledHeight(12),
    padding: scaledWidth(16),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  comparisonTitle: {
    fontSize: scaledHeight(18),
    fontFamily: Fonts.Bold,
    marginBottom: scaledHeight(16),
  },
  comparisonChart: {
    height: scaledHeight(40),
    marginBottom: scaledHeight(16),
  },
  comparisonBar: {
    height: scaledHeight(20),
    borderRadius: scaledHeight(10),
    marginBottom: scaledHeight(8),
  },
  comparisonLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: scaledWidth(16),
    height: scaledWidth(16),
    borderRadius: scaledWidth(8),
    marginRight: scaledWidth(8),
  },
  legendText: {
    fontSize: scaledHeight(14),
    fontFamily: Fonts.Regular,
  },
  tipsSectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  tipsIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: scaledHeight(30),
    padding: scaledHeight(10),
  },
  tipsTextContainer: {
    flex: 1,
    marginLeft: scaledWidth(16),
  },
  tipsSubtitle: {
    color: '#fff',
    fontSize: scaledHeight(14),
    fontFamily: Fonts.Regular,
    marginTop: scaledHeight(4),
  },
  systemSectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  systemSubtitle: {
    color: '#fff',
    fontSize: scaledHeight(14),
    fontFamily: Fonts.Regular,
    marginTop: scaledHeight(4),
  },
  sectionContainer: {
    marginHorizontal: scaledWidth(16),
    marginVertical: scaledHeight(10),
  },
  sectionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaledHeight(16),
    borderRadius: scaledHeight(12),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  systemIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: scaledHeight(30),
    padding: scaledHeight(10),
    marginRight: scaledWidth(16),
  },
  systemTextContainer: {
    flex: 1,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: scaledHeight(18),
    fontFamily: Fonts.Semibold,
    marginBottom: scaledHeight(8),
  },
  systemDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataItem: {
    alignItems: 'center',
  },
  dataLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: scaledHeight(12),
    fontFamily: Fonts.Regular,
  },
  dataValue: {
    color: '#fff',
    fontSize: scaledHeight(16),
    fontFamily: Fonts.Bold,
    marginTop: scaledHeight(4),
  },
});
