import React, {useRef, useState, useMemo, useCallback} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SohoText from '@/components/SohoText';
import Fonts from '@/theme/Fonts';

const Branches = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const bottomSheetRef = useRef(null);
  const mapRef = useRef<MapView>(null);

  const branches = useMemo(
    () => [
      {
        id: 1,
        name: 'Tek Fazlı Sistem 1',
        coordinate: {latitude: 41.0082, longitude: 28.9784},
        voltage: 220,
        current: 10,
        power: 2.2,
      },
      {
        id: 2,
        name: 'Tek Fazlı Sistem 2',
        coordinate: {latitude: 41.0151, longitude: 28.9795},
        voltage: 220,
        current: 12,
        power: 2.64,
      },
      {
        id: 3,
        name: 'Tek Fazlı Sistem 3',
        coordinate: {latitude: 41.0136, longitude: 28.984},
        voltage: 220,
        current: 9,
        power: 1.98,
      },
      {
        id: 4,
        name: 'Tek Fazlı Sistem 4',
        coordinate: {latitude: 41.016, longitude: 28.976},
        voltage: 220,
        current: 11,
        power: 2.42,
      },
      {
        id: 5,
        name: 'Tek Fazlı Sistem 5',
        coordinate: {latitude: 41.012, longitude: 28.975},
        voltage: 220,
        current: 8,
        power: 1.76,
      },
    ],
    [],
  );

  const handleBranchPress = useCallback(branch => {
    setSelectedBranch(branch);
    bottomSheetRef.current?.close();
    mapRef.current?.animateToRegion({
      latitude: branch.coordinate.latitude,
      longitude: branch.coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, []);

  const Header = ({title}) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
      navigation.goBack();
    };

    const openList = () => {
      bottomSheetRef.current?.expand();
    };

    return (
      <LinearGradient
        colors={['#2196F3', '#1976D2']}
        style={styles.headerContainer}>
        <TouchableOpacity
          onPress={handleGoBack}
          activeOpacity={0.75}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <SohoText style={styles.headerTitle}>{title}</SohoText>
        <TouchableOpacity onPress={openList} style={styles.listButton}>
          <Icon name="list" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  const renderBranchItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleBranchPress(item)}
      style={styles.listItemContainer}>
      <LinearGradient colors={['#2196F3', '#1976D2']} style={styles.branchCard}>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Icon name="power" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.titleContainer}>
            <SohoText style={styles.titleText}>{item.name}</SohoText>
            <SohoText style={styles.dateText}>Son Güncelleme: Bugün</SohoText>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <SohoText style={styles.infoLabel}>Gerilim:</SohoText>
            <SohoText style={styles.infoValue}>{item.voltage} V</SohoText>
          </View>
          <View style={styles.infoRow}>
            <SohoText style={styles.infoLabel}>Akım:</SohoText>
            <SohoText style={styles.infoValue}>{item.current} A</SohoText>
          </View>
          <View style={styles.infoRow}>
            <SohoText style={styles.infoLabel}>Güç:</SohoText>
            <SohoText style={styles.infoValue}>{item.power} kW</SohoText>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={'Konumlar'} />
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 41.0082,
          longitude: 28.9784,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {branches.map(branch => (
          <Marker
            key={branch.id}
            coordinate={branch.coordinate}
            title={branch.name}
          />
        ))}
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%']}
        enablePanDownToClose
        initialSnapIndex={1}>
        <BottomSheetFlatList
          data={branches}
          keyExtractor={item => item.id.toString()}
          renderItem={renderBranchItem}
          contentContainerStyle={styles.listContainer}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scaledHeight(60),
    paddingBottom: scaledHeight(16),
    paddingHorizontal: scaledWidth(16),
  },
  backButton: {
    marginRight: scaledWidth(16),
  },
  headerTitle: {
    fontSize: scaledWidth(20),
    color: '#FFFFFF',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  listButton: {
    marginLeft: scaledWidth(16),
  },
  listContainer: {
    paddingVertical: scaledHeight(16),
    paddingHorizontal: scaledWidth(16),
  },
  listItemContainer: {
    marginBottom: scaledHeight(12),
  },
  branchCard: {
    borderRadius: scaledHeight(12),
    padding: scaledHeight(16),
    elevation: 3,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: scaledHeight(12),
    borderRadius: 12,
  },
  titleContainer: {
    marginLeft: scaledWidth(16),
  },
  titleText: {
    fontFamily: Fonts.Semibold,
    fontSize: scaledHeight(16),
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: scaledHeight(12),
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: scaledHeight(4),
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  infoLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: scaledHeight(14),
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: scaledHeight(14),
    fontFamily: Fonts.Semibold,
  },
});

export default Branches;
