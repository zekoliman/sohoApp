import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';


const branches = [
  {
    id: 1,
    name: 'Ankara Şube',
    devices: {
      airConditioners: [
        {id: 1, name: 'Klima 1', isActive: false, temp: 24},
        {id: 2, name: 'Klima 2', isActive: true, temp: 22},
        {id: 3, name: 'Klima 3', isActive: false, temp: 23},
      ],
      lights: [
        {id: 1, name: 'Aydınlatma 1', isActive: true},
        {id: 2, name: 'Aydınlatma 2', isActive: false},
      ],
      airCurtains: null, 
      
  },
  {
    id: 2,
    name: 'İstanbul Şube',
    devices: {
      airConditioners: [{id: 1, name: 'Klima 1', isActive: true, temp: 23}],
      lights: null, 
      airCurtains: [
        {id: 1, name: 'Hava Perdesi 1', isActive: true},
        {id: 2, name: 'Hava Perdesi 2', isActive: false},
      ],
    },
  },
  {
    id: 3,
    name: 'İzmir Şube',
    devices: {
      airConditioners: null,
      lights: [
        {id: 1, name: 'Aydınlatma 1', isActive: true},
        {id: 2, name: 'Aydınlatma 2', isActive: false},
        {id: 3, name: 'Aydınlatma 3', isActive: true},
      ],
      airCurtains: [{id: 1, name: 'Hava Perdesi 1', isActive: false}],
    },
  },
];

const DashboardScreen = () => {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);
  const [branchModalVisible, setBranchModalVisible] = useState(false);
  const [deviceModalVisible, setDeviceModalVisible] = useState(false);
  const [selectedDeviceType, setSelectedDeviceType] = useState(null);

  const getActiveDeviceCount = devices => {
    if (!devices) return 0;
    return devices.filter(device => device.isActive).length;
  };

  const showToast = (deviceName, action) => {
    Toast.show({
      type: 'success',
      text1: `${deviceName} ${action ? 'açıldı' : 'kapandı'}`,
      text2: `İşlem başarıyla tamamlandı 👍`,
      position: 'top',
    });
  };

  const toggleDevice = (deviceType, deviceId) => {
    setSelectedBranch(prevBranch => {
      const newBranch = {...prevBranch};
      const device = newBranch.devices[deviceType].find(d => d.id === deviceId);
      if (device) {
        device.isActive = !device.isActive;
        showToast(device.name, device.isActive);
      }
      return newBranch;
    });
  };

  const updateTemperature = (deviceId, newTemp) => {
    setSelectedBranch(prevBranch => {
      const newBranch = {...prevBranch};
      const device = newBranch.devices.airConditioners.find(
        d => d.id === deviceId,
      );
      if (device) {
        device.temp = newTemp;
        Toast.show({
          type: 'success',
          text1: `${device.name} sıcaklığı güncellendi`,
          text2: `Yeni sıcaklık: ${newTemp}°C 🌡️`,
          position: 'top',
        });
      }
      return newBranch;
    });
  };

  const DeviceControlModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={deviceModalVisible}
      onRequestClose={() => setDeviceModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {selectedDeviceType === 'airConditioners'
                ? 'Klimalar'
                : selectedDeviceType === 'lights'
                ? 'Aydınlatmalar'
                : 'Hava Perdeleri'}
            </Text>
            <TouchableOpacity onPress={() => setDeviceModalVisible(false)}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView>
            {selectedDeviceType &&
            selectedBranch.devices[selectedDeviceType] ? (
              selectedBranch.devices[selectedDeviceType].map(device => (
                <View key={device.id} style={styles.deviceControlItem}>
                  <Text style={styles.deviceName}>{device.name}</Text>
                  {selectedDeviceType === 'airConditioners' && (
                    <View style={styles.tempControl}>
                      <Text style={styles.tempText}>{device.temp}°C</Text>
                      <View style={styles.tempButtons}>
                        <TouchableOpacity
                          style={styles.tempButton}
                          onPress={() =>
                            updateTemperature(device.id, device.temp + 1)
                          }>
                          <Icon name="plus" size={20} color="#4A90E2" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.tempButton}
                          onPress={() =>
                            updateTemperature(device.id, device.temp - 1)
                          }>
                          <Icon name="minus" size={20} color="#4A90E2" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      device.isActive && styles.toggleButtonActive,
                    ]}
                    onPress={() => toggleDevice(selectedDeviceType, device.id)}>
                    <Text
                      style={[
                        styles.toggleButtonText,
                        device.isActive && styles.toggleButtonTextActive,
                      ]}>
                      {device.isActive ? 'Açık' : 'Kapalı'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.noDeviceContainer}>
                <Icon name="alert-circle-outline" size={48} color="#999" />
                <Text style={styles.noDeviceText}>
                  Bu şubede{' '}
                  {selectedDeviceType === 'airConditioners'
                    ? 'klima'
                    : selectedDeviceType === 'lights'
                    ? 'aydınlatma'
                    : 'hava perdesi'}{' '}
                  bulunmamaktadır.
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const BranchSelectionModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={branchModalVisible}
      onRequestClose={() => setBranchModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Şube Seçimi</Text>
            <TouchableOpacity onPress={() => setBranchModalVisible(false)}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          {branches.map(branch => (
            <TouchableOpacity
              key={branch.id}
              style={styles.branchItem}
              onPress={() => {
                setSelectedBranch(branch);
                setBranchModalVisible(false);
                Toast.show({
                  type: 'success',
                  text1: 'Şube değiştirildi',
                  text2: `${branch.name} seçildi 🏢`,
                  position: 'top',
                });
              }}>
              <Text style={styles.branchName}>{branch.name}</Text>
              {selectedBranch.id === branch.id && (
                <Icon name="check" size={24} color="#4A90E2" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  const DeviceSummaryCard = ({title, devices, icon, type}) => {
    if (!devices) return null; 

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setSelectedDeviceType(type);
          setDeviceModalVisible(true);
        }}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Icon name={icon} size={24} color="#4A90E2" />
        </View>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.numberText}>
              {getActiveDeviceCount(devices)}
            </Text>
            <Text style={styles.labelText}>Aktif Cihaz</Text>
          </View>
          <View>
            <Text style={styles.numberText}>{devices.length}</Text>
            <Text style={styles.labelText}>Toplam Cihaz</Text>
          </View>
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>
              {Math.round(
                (getActiveDeviceCount(devices) / devices.length) * 100,
              )}
              %
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#4A90E2', '#357ABD']} style={styles.header}>
        <TouchableOpacity
          style={styles.branchSelector}
          onPress={() => setBranchModalVisible(true)}>
          <Text style={styles.branchText}>{selectedBranch.name}</Text>
          <Icon name="chevron-down" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => {
            Toast.show({
              type: 'info',
              text1: 'Yenileniyor',
              text2: 'Veriler güncelleniyor... 🔄',
              position: 'top',
            });
          }}>
          <Icon name="refresh" size={24} color="#FFF" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.scrollView}>
        <View style={styles.deviceSummaryContainer}>
          <DeviceSummaryCard
            title="Klimalar"
            devices={selectedBranch.devices.airConditioners}
            icon="air-conditioner"
            type="airConditioners"
          />
          <DeviceSummaryCard
            title="Aydınlatma"
            devices={selectedBranch.devices.lights}
            icon="lightbulb"
            type="lights"
          />
          <DeviceSummaryCard
            title="Hava Perdesi"
            devices={selectedBranch.devices.airCurtains}
            icon="fan"
            type="airCurtains"
          />
        </View>
      </ScrollView>

      <BranchSelectionModal />
      <DeviceControlModal />
      <Toast />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
  },
  branchSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 8,
  },
  refreshButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  deviceSummaryContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  labelText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  percentageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  branchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  branchName: {
    fontSize: 16,
    color: '#333',
  },
  deviceControlItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  deviceName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  tempControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  tempText: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  tempButtons: {
    flexDirection: 'row',
  },
  tempButton: {
    padding: 4,
    marginHorizontal: 4,
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EEE',
  },
  toggleButtonActive: {
    backgroundColor: '#4A90E2',
  },
  toggleButtonText: {
    color: '#666',
  },
  toggleButtonTextActive: {
    color: '#FFF',
  },
});

export default DashboardScreen;
