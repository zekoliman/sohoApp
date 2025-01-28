import React, {
  useState,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import SohoText from '@/components/SohoText';
import Fonts from '@/theme/Fonts';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import MyPlaces from '@/screens/MyPlaces';
import TariffManagement from './ManagementSections/TariffManagement';
import DatapointManagementSection from './ManagementSections/DatapointManagementSection';
import DeviceManagementSection from './DeviceManagementSection';
import InventoryManagement from './InventoryManagement';

export const ManagementSections = forwardRef((_, ref) => {
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const sectionRefs = {
    branch: useRef<BottomSheet>(null),
    tariff: useRef<BottomSheet>(null),
    datapoint: useRef<BottomSheet>(null),
    device: useRef<BottomSheet>(null),
    inventory: useRef<BottomSheet>(null),
    invoice: useRef<BottomSheet>(null),
  };

  useImperativeHandle(ref, () => ({
    close: () => bottomSheetRef.current?.close(),
    expand: () => bottomSheetRef.current?.expand(),
  }));

  const sections = [
    {
      id: 'branch',
      title: 'Şube Yönetimi',
      icon: 'store',
      color: ['#4CAF50', '#45a049'],
    },
    {
      id: 'tariff',
      title: 'Tarife Yönetimi',
      icon: 'attach-money',
      color: ['#2196F3', '#1976D2'],
    },
    {
      id: 'datapoint',
      title: 'Veri Noktası Yönetimi',
      icon: 'data-usage',
      color: ['#FFA726', '#FB8C00'],
    },
    {
      id: 'device',
      title: 'Cihaz Yönetimi',
      icon: 'devices',
      color: ['#26A69A', '#00897B'],
    },
    {
      id: 'inventory',
      title: 'Envanter Yönetimi',
      icon: 'inventory',
      color: ['#5C6BC0', '#3F51B5'],
    },
    {
      id: 'invoice',
      title: 'Fatura Yönetimi',
      icon: 'receipt',
      color: ['#EC407A', '#D81B60'],
    },
  ];

  const handleSectionSelect = useCallback(
    (sectionId: string) => {
      if (currentSection === sectionId) {
        setCurrentSection(null);
        setTimeout(() => {
          setCurrentSection(sectionId);
        }, 0);
      } else {
        setCurrentSection(sectionId);
      }

      bottomSheetRef.current?.close();
    },
    [currentSection],
  );

  useEffect(() => {
    Object.keys(sectionRefs).forEach(sectionId => {
      if (sectionId === currentSection) {
        sectionRefs[sectionId as keyof typeof sectionRefs].current?.expand();
      } else {
        sectionRefs[sectionId as keyof typeof sectionRefs].current?.close();
      }
    });
  }, [currentSection]);

  const renderSectionItem = ({
    item,
    key,
  }: {
    item: (typeof sections)[0];
    key: number;
  }) => (
    <TouchableOpacity
      key={key}
      style={styles.sectionItem}
      onPress={() => handleSectionSelect(item.id)}
      activeOpacity={0.75}>
      <LinearGradient colors={item.color} style={styles.sectionGradient}>
        <View style={styles.iconContainer}>
          <Icon name={item.icon} size={30} color="#FFFFFF" />
        </View>
        <SohoText style={styles.sectionItemText}>{item.title}</SohoText>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderSection = () => {
    return (
      <>
        <BottomSheet
          ref={sectionRefs.branch}
          snapPoints={['95%']}
          index={-1}
          enablePanDownToClose>
          <MyPlaces currentSection={currentSection} />
        </BottomSheet>

        <BottomSheet
          ref={sectionRefs.tariff}
          snapPoints={['95%']}
          index={-1}
          enablePanDownToClose>
          <BottomSheetScrollView style={styles.sectionContent}>
            <TariffManagement />
          </BottomSheetScrollView>
        </BottomSheet>

        <BottomSheet
          ref={sectionRefs.datapoint}
          snapPoints={['95%']}
          index={-1}
          enablePanDownToClose>
          <BottomSheetScrollView style={styles.sectionContent}>
            <DatapointManagementSection />
          </BottomSheetScrollView>
        </BottomSheet>

        <BottomSheet
          ref={sectionRefs.device}
          snapPoints={['95%']}
          index={-1}
          enablePanDownToClose>
          <BottomSheetScrollView style={styles.sectionContent}>
            <DeviceManagementSection />
          </BottomSheetScrollView>
        </BottomSheet>

        <BottomSheet
          ref={sectionRefs.inventory}
          snapPoints={['95%']}
          index={-1}
          enablePanDownToClose>
          <BottomSheetScrollView style={styles.sectionContent}>
            <InventoryManagement />
          </BottomSheetScrollView>
        </BottomSheet>

        <BottomSheet
          ref={sectionRefs.invoice}
          snapPoints={['95%']}
          index={-1}
          enablePanDownToClose>
          <BottomSheetScrollView style={styles.sectionContent}>
            <SohoText>Fatura Yönetimi</SohoText>
          </BottomSheetScrollView>
        </BottomSheet>
      </>
    );
  };

  return (
    <>
      {renderSection()}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['85%']}
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheetBg}>
        <LinearGradient
          colors={['#2196F3', '#1976D2']}
          style={styles.headerGradient}>
          <SohoText style={styles.bottomSheetTitle} fontFamily={Fonts.Bold}>
            Yönetim Menüsü
          </SohoText>
        </LinearGradient>
        <ScrollView contentContainerStyle={styles.sectionList}>
          {sections.map((item, key) => renderSectionItem({item, key}))}
        </ScrollView>
      </BottomSheet>
    </>
  );
});

const styles = StyleSheet.create({
  bottomSheetBg: {
    backgroundColor: '#F5F5F5',
  },
  headerGradient: {
    paddingVertical: scaledHeight(16),
    borderTopLeftRadius: scaledWidth(20),
    borderTopRightRadius: scaledWidth(20),
  },
  bottomSheetTitle: {
    fontSize: scaledHeight(22),
    color: '#FFFFFF',
    textAlign: 'center',
  },
  sectionList: {
    paddingHorizontal: scaledWidth(16),
    paddingTop: scaledHeight(16),
  },
  sectionItem: {
    marginBottom: scaledHeight(16),
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
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: scaledHeight(25),
    width: scaledWidth(50),
    height: scaledHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaledWidth(16),
  },
  sectionItemText: {
    fontSize: scaledHeight(18),
    fontFamily: Fonts.Semibold,
    color: '#FFFFFF',
  },
  sectionContent: {
    paddingBottom: scaledHeight(85),
  },
});

export default ManagementSections;
