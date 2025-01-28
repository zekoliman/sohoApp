import React from 'react';
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import BellSvg from '@/assets/icons/BellSvg.svg';
import ItemSvg from '@/assets/icons/ItemSvg.svg';
import BoltEnergySvg from '@/assets/icons/BoltEnergy.svg';
import MapPointSvg from '@/assets/icons/MapPoint.svg';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import SohoText from '@/components/SohoText';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const FastMenuData = [
  {
    icon: <BoltEnergySvg />,
    title: 'Enerji İzleme',
    screen: 'EnergyMonitoringStack',
    colors: ['#4CAF50', '#45a049'],
  },
  {
    icon: <MapPointSvg />,
    title: 'Konumlar',
    screen: 'BranchesScreen',
    colors: ['#2196F3', '#1976D2'],
  },
  {
    icon: <ItemSvg />,
    title: 'Envanter',
    screen: 'EnvanterScreen',
    colors: ['#EC407A', '#D81B60'],
  },
  {
    icon: <BellSvg />,
    title: 'Ortasm İzleme',
    screen: 'AmbientMonitoringScreensWrapper',
    colors: ['#26A69A', '#00897B'],
  },
];

const HomeScreenFastMenu = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        bounces
        showsHorizontalScrollIndicator={false}
        data={FastMenuData}
        contentContainerStyle={[
          styles.listContainer,
          {
            width: Dimensions.get('screen').width / 2,
            paddingHorizontal: scaledWidth(24),
          },
        ]}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(item.screen)}
            style={styles.itemContainer}>
            <LinearGradient colors={item.colors} style={styles.iconContainer}>
              {item.icon}
            </LinearGradient>
            <SohoText color="#488a7d" style={styles.title}>
              {item.title}
            </SohoText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scaledHeight(12),
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 12,
    zIndex: 999,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemContainer: {
    marginRight: scaledHeight(12),
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#267c8d',
    padding: scaledHeight(24),
    borderRadius: scaledHeight(12),
  },
  title: {
    fontSize: scaledHeight(15),
    marginVertical: scaledHeight(8),
  },
});

export default HomeScreenFastMenu;
