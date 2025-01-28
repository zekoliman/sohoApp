import React, {useState, useCallback, useRef, useMemo} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SohoText from '@/components/SohoText';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const DraggableCard = ({item, drag, isActive, isEditMode, onRemove}) => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isActive ? 1.1 : 1,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <ScaleDecorator>
      <Animated.View style={{transform: [{scale: scaleAnim}]}}>
        <TouchableOpacity
          onLongPress={isEditMode ? drag : null}
          onPress={() => !isEditMode && navigation.navigate(item.navigateTo)}
          disabled={isActive}
          style={[styles.cardContainer, isActive && styles.activeItem]}
          activeOpacity={0.7}>
          <LinearGradient colors={item.colors} style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Icon name={item.icon} size={40} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <SohoText style={styles.title}>{item.title}</SohoText>
              <SohoText style={styles.subtitle}>{item.subtitle}</SohoText>
            </View>
            {!isEditMode && (
              <Icon name="chevron-right" size={30} color="#fff" />
            )}
            {isEditMode && (
              <TouchableOpacity
                onPress={() => onRemove(item.id)}
                style={styles.removeButton}>
                <Icon name="remove-circle" size={30} color="#fff" />
              </TouchableOpacity>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </ScaleDecorator>
  );
};

const DraggableCardList = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const [data, setData] = useState([
    {
      id: '1',
      title: 'Aylık Tüketim Tasarruf',
      subtitle: '150.5 kWh / 50$',
      icon: 'flash-on',
      colors: ['#2196F3', '#1976D2'],
      navigateTo: 'AnalyticsStack',
    },
    {
      id: '2',
      title: 'Alarmlar',
      subtitle: '3 Aktif Alarm Mevcut',
      icon: 'warning',
      colors: ['#E74C3C', '#C0392B'],
      navigateTo: 'AlarmsScreen',
    },
    {
      id: '3',
      title: 'Haritalar',
      subtitle: 'Haritaları Görüntüle',
      icon: 'map',
      colors: ['#2196F3', '#1976D2'],
      navigateTo: 'BranchesScreen',
    },
    {
      id: '4',
      title: 'Enerji Tasarruf Önerileri',
      subtitle: 'Tasarruf için ipuçları alın',
      icon: 'lightbulb',
      colors: ['#FFA726', '#FB8C00'],
      navigateTo: 'EnergyTips',
    },
    {
      id: '5',
      title: 'Enerji Tasarruf Önerileri',
      subtitle: 'Tasarruf için ipuçları alın',
      icon: 'lightbulb',
      colors: ['#FFA726', '#FB8C00'],
      navigateTo: 'EnergyTips',
    },
  ]);

  const [availableWidgets, setAvailableWidgets] = useState([
    {
      id: '5',
      title: 'Hava Durumu',
      subtitle: 'Güncel hava durumu',
      icon: 'wb-sunny',
      colors: ['#4CAF50', '#45A049'],
      navigateTo: 'WeatherScreen',
    },
    {
      id: '6',
      title: 'Faturalar',
      subtitle: 'Ödenmemiş faturalar',
      icon: 'receipt',
      colors: ['#9C27B0', '#7B1FA2'],
      navigateTo: 'BillsScreen',
    },
  ]);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '80%'], []);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  const onDragEnd = useCallback(({data: newData}) => {
    setData(newData);
  }, []);

  const removeWidget = useCallback(
    id => {
      const removedWidget = data.find(item => item.id === id);
      setData(prevData => prevData.filter(item => item.id !== id));
      setAvailableWidgets(prevWidgets => [...prevWidgets, removedWidget]);
    },
    [data],
  );

  const addWidget = useCallback(() => {
    Alert.alert(
      'Widget Ekle',
      "Eklemek istediğiniz widget'ı seçin",
      availableWidgets.map(widget => ({
        text: widget.title,
        onPress: () => {
          setData(prevData => [...prevData, widget]);
          setAvailableWidgets(prevWidgets =>
            prevWidgets.filter(w => w.id !== widget.id),
          );
        },
      })),
      {cancelable: true},
    );
  }, [availableWidgets]);

  const renderItem = useCallback(
    ({item, drag, isActive}) => (
      <DraggableCard
        key={item.id}
        item={item}
        drag={drag}
        isActive={isActive}
        isEditMode={isEditMode}
        onRemove={removeWidget}
      />
    ),
    [isEditMode, removeWidget],
  );

  return (
    <BottomSheetModalProvider style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
          <Icon name={isEditMode ? 'done' : 'edit'} size={24} color="#fff" />
          <SohoText style={styles.editButtonText}>
            {isEditMode ? 'Düzenlemeyi Bitir' : 'Widget Düzenle'}
          </SohoText>
        </TouchableOpacity>
        {isEditMode && (
          <TouchableOpacity onPress={openBottomSheet} style={styles.editButton}>
            <Icon name="add-circle" size={24} color="#fff" />
            <SohoText style={styles.editButtonText}>Widget Ekle</SohoText>
          </TouchableOpacity>
        )}
      </View>

      <DraggableFlatList
        data={data}
        onDragEnd={onDragEnd}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        containerStyle={styles.listContainer}
        dragItemOverflow={true}
        activationDistance={20}
      />

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.bottomSheetIndicator}
        backgroundStyle={styles.bottomSheetBackground}>
        <View style={styles.bottomSheetContent}>
          <SohoText style={styles.modalTitle}>Yeni Widget Ekle</SohoText>
          <ScrollView contentContainerStyle={styles.availableWidgets}>
            {availableWidgets.map(widget => (
              <TouchableOpacity
                key={widget.id}
                style={styles.widgetOption}
                onPress={() => {
                  setData(prevData => [...prevData, widget]);
                  setAvailableWidgets(prevWidgets =>
                    prevWidgets.filter(w => w.id !== widget.id),
                  );
                  closeBottomSheet();
                }}>
                <LinearGradient
                  colors={widget.colors}
                  style={styles.widgetOptionGradient}>
                  <Icon name={widget.icon} size={30} color="#fff" />
                  <View style={styles.widgetOptionText}>
                    <SohoText style={styles.widgetOptionTitle}>
                      {widget.title}
                    </SohoText>
                    <SohoText style={styles.widgetOptionSubtitle}>
                      {widget.subtitle}
                    </SohoText>
                  </View>
                  <Icon name="add-circle-outline" size={24} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 16,
    borderRadius: 5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 16,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    marginLeft: 10,
  },
  cardContainer: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  activeItem: {
    opacity: 0.9,
    elevation: 8,
    shadowOpacity: 0.4,
    transform: [{scale: 1.05}],
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    height: 100,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    padding: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  removeButton: {
    padding: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 5,
    padding: 10,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 16,
  },
  bottomSheetBackground: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetIndicator: {
    backgroundColor: '#A0A0A0',
    width: 40,
  },
  availableWidgets: {
    paddingVertical: 10,
    gap: 12,
  },
  widgetOption: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  widgetOptionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  widgetOptionText: {
    flex: 1,
    marginLeft: 12,
  },
  widgetOptionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  widgetOptionSubtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default DraggableCardList;
