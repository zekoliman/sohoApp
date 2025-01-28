import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import SohoText from '@/components/SohoText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import Fonts from '@/theme/Fonts';
import {Picker} from '@react-native-picker/picker';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {launchCamera} from 'react-native-image-picker';
import {FlashList} from '@shopify/flash-list';
import ManagementSectionsHeader from '../ManagementSectionsHeader';
import {useAppSelector} from '@/redux/hooks';
import {getDatapointByBranch} from '@/services/api/getDatapointByBranch';

const DeviceManagementSection = () => {
  const {data: branches} = useAppSelector(state => state.getBranch);
  const {data: devices} = useAppSelector(state => state.getDevice);
  const [datapoints, setDatapoints] = useState([]);
  const [selectedDatapoint, setSelectedDatapoint] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>();

  const [deviceName, setDeviceName] = useState('');
  const [deviceBarcode, setDeviceBarcode] = useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (selectedBranch) {
      getDatapoint();
    }
  }, [selectedBranch]);

  const getDatapoint = async () => {
    if (!selectedBranch) {
      return console.log('branch secilmedi');
    }

    const response = await getDatapointByBranch(selectedBranch);

    if (response) {
      return setDatapoints(response.data);
    }
    return Alert.alert('Datapoint getirilirken bir hata olustu');
  };

  const handleAddDevice = () => {
    if (deviceName && deviceBarcode && selectedDatapoint && selectedBranch) {
      const newDevice = {
        id: (devices.length + 1).toString(),
        name: deviceName,
        barcode: deviceBarcode,
        datapoint: selectedDatapoint,
      };
      setDevices([...devices, newDevice]);
      resetForm();
      bottomSheetRef.current?.close();
      return;
    }
    return alert('Lütfen tüm alanları doldurun.');
  };

  const resetForm = () => {
    setDeviceName('');
    setDeviceBarcode('');
    setSelectedDatapoint('');
  };

  const handleBarcodeScan = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('Kullanıcı iptal etti');
      } else if (response.errorCode) {
        console.log('Hata:', response.errorMessage);
      } else {
        const barcode = 'A1B2C3D4';
        setDeviceBarcode(barcode);
      }
    });
  };

  const handleEditDevice = id => {
    console.log(`Edit device with ID: ${id}`);
  };

  const handleDeleteDevice = id => {
    const updatedDevices = devices.filter(device => device.id !== id);
    setDevices(updatedDevices);
  };

  const renderDeviceItem = ({item, key}) => (
    <View key={key} style={styles.deviceItem}>
      <View style={styles.deviceHeader}>
        <View style={styles.deviceInfoContainer}>
          <Icon name="devices" size={24} color="#00897B" />
          <SohoText fontFamily={Fonts.Semibold} style={styles.deviceName}>
            {item.name}
          </SohoText>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditDevice(item.id)}
            accessibilityLabel="Edit">
            <Icon name="edit" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteDevice(item.id)}
            accessibilityLabel="Delete">
            <Icon name="delete" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.deviceInfo}>
        <Icon name="data-usage" size={20} color="#495057" />
        <SohoText style={styles.deviceDatapoint}>
          {item.datapoint.name}
        </SohoText>
      </View>
      <View style={styles.deviceInfo}>
        <Icon name="qr-code" size={20} color="#495057" />
        <SohoText style={styles.deviceBarcode}>{item.imei_number}</SohoText>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <ManagementSectionsHeader
          headerTitle="Cihaz Yönetimi"
          backgroundColor={['#26A69A', '#00897B']}
          iconName="add"
          iconColor="white"
          iconBackgroundColor="#00897B"
          onPress={() => bottomSheetRef.current.expand()}
        />

        <FlashList
          data={devices}
          renderItem={renderDeviceItem}
          keyExtractor={item => item.id}
          estimatedItemSize={300}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.deviceList}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['90%']}
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheetBackground}>
        <BottomSheetScrollView style={styles.bottomSheetContent}>
          <SohoText fontFamily={Fonts.Bold} style={styles.bottomSheetTitle}>
            Yeni Cihaz Ekle
          </SohoText>
          <View style={styles.pickerContainer}>
            <SohoText fontFamily={Fonts.Semibold} style={styles.pickerLabel}>
              Şube Seçin
            </SohoText>
            <Picker
              selectedValue={selectedDatapoint}
              onValueChange={itemValue => setSelectedBranch(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Şube Seçin" value="" />
              {branches?.map((branch, index) => (
                <Picker.Item
                  key={index}
                  label={branch.name}
                  value={branch.id}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <SohoText fontFamily={Fonts.Semibold} style={styles.pickerLabel}>
              Datapoint Seçin
            </SohoText>
            <Picker
              selectedValue={selectedDatapoint}
              onValueChange={itemValue => setSelectedDatapoint(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Datapoint Seçin" value="" />
              {datapoints?.map((datapoint, index) => (
                <Picker.Item
                  key={index}
                  label={datapoint.name}
                  value={datapoint.id}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Cihaz İsmi"
              value={deviceName}
              onChangeText={setDeviceName}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Cihaz Barkodu"
              value={deviceBarcode}
              onChangeText={setDeviceBarcode}
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={handleBarcodeScan}>
              <Icon name="qr-code-scanner" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleAddDevice}>
            <SohoText style={styles.saveButtonText}>Kaydet</SohoText>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('screen').height,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaledWidth(20),
    paddingVertical: scaledHeight(15),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
  },
  headerTitle: {
    fontSize: scaledWidth(24),
    color: '#1C1C1E',
  },
  addButton: {
    backgroundColor: '#00897B',
    borderRadius: scaledWidth(20),
    padding: scaledWidth(10),
  },
  deviceList: {
    paddingHorizontal: scaledWidth(20),
    paddingBottom: scaledHeight(20),
  },
  deviceItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaledWidth(12),
    padding: scaledWidth(15),
    marginTop: scaledHeight(15),
    elevation: 3,
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaledHeight(10),
  },
  deviceInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceName: {
    fontSize: scaledWidth(18),
    color: '#00897B',
    marginLeft: scaledWidth(10),
  },
  actionButtons: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#FFC107',
    borderRadius: scaledWidth(8),
    padding: scaledWidth(8),
    marginRight: scaledWidth(8),
  },
  deleteButton: {
    backgroundColor: '#DC3545',
    borderRadius: scaledWidth(8),
    padding: scaledWidth(8),
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaledHeight(5),
  },
  deviceDatapoint: {
    fontSize: scaledWidth(16),
    color: '#495057',
    marginLeft: scaledWidth(10),
  },
  deviceBarcode: {
    fontSize: scaledWidth(16),
    color: '#495057',
    marginLeft: scaledWidth(10),
  },
  bottomSheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scaledWidth(20),
    borderTopRightRadius: scaledWidth(20),
  },
  bottomSheetContent: {
    flex: 1,
    padding: scaledWidth(20),
  },
  bottomSheetTitle: {
    fontSize: scaledWidth(20),
    color: '#1C1C1E',
    marginBottom: scaledHeight(20),
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: scaledHeight(20),
  },
  pickerLabel: {
    fontSize: scaledWidth(16),
    color: '#1C1C1E',
    marginBottom: scaledHeight(10),
  },
  picker: {
    backgroundColor: '#F8F9FA',
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: scaledWidth(12),
    height: scaledHeight(50),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaledHeight(10),
  },
  input: {
    flex: 1,
    height: scaledHeight(50),
    borderRadius: scaledWidth(12),
    paddingHorizontal: scaledWidth(15),
    backgroundColor: '#F8F9FA',
    borderColor: '#CED4DA',
    borderWidth: 1,
    fontSize: scaledWidth(16),
    color: '#1C1C1E',
  },
  scanButton: {
    backgroundColor: '#007BFF',
    borderRadius: scaledWidth(12),
    padding: scaledWidth(10),
    marginLeft: scaledWidth(10),
  },
  saveButton: {
    backgroundColor: '#28A745',
    borderRadius: scaledWidth(12),
    paddingVertical: scaledHeight(15),
    paddingHorizontal: scaledWidth(20),
    alignItems: 'center',
    marginTop: scaledHeight(20),
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: scaledWidth(16),
  },
});

export default DeviceManagementSection;
