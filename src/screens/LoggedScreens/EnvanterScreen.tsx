import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Platform,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';

const {width} = Dimensions.get('window');

const branches = [
  {
    id: 1,
    name: 'İstanbul Merkez',
    inventory: {
      productInfo: {
        brand: 'Samsung',
        model: 'X2000',
        workingHours: '09:00-18:00',
        serialNumber: 'SN123456',
        warrantyStatus: 'Aktif',
        lastMaintenance: '2024-01-15',
        nextMaintenance: '2024-07-15',
        status: 'Çalışıyor',
        location: 'Kat 1',
      },
      branchInfo: {
        employeeCount: 25,
        floorCount: 3,
        squareMeters: 450,
        buildingType: 'Plaza',
        workingHours: '09:00-18:00',
        parkingSpaces: 30,
        meetingRooms: 5,
        securityLevel: 'Yüksek',
        lastInspection: '2024-02-01',
        certifications: ['ISO 9001', 'ISO 27001'],
      },
      statistics: {
        monthlyMaintenance: 2500,
        yearlyUtilization: '87%',
        efficiencyScore: 92,
        downtime: '2%',
      },
    },
  },
];

const EnvanterScreen = () => {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);
  const [branchModalVisible, setBranchModalVisible] = useState(false);
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [editedData, setEditedData] = useState(null);

  const showToast = (message, type = 'success') => {
    Toast.show({
      type,
      text1: type === 'success' ? 'Başarılı' : 'Bilgi',
      text2: message,
      position: 'top',
    });
  };

  const InputModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={inputModalVisible}
      onRequestClose={() => setInputModalVisible(false)}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {selectedSection === 'product'
                ? 'Ürün Bilgileri'
                : 'Şube Bilgileri'}
            </Text>
            <TouchableOpacity onPress={() => setInputModalVisible(false)}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.formContainer}>
            {selectedSection === 'product' &&
              Object.entries(selectedBranch.inventory.productInfo).map(
                ([key, value]) => (
                  <View key={key} style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={editedData?.[key] || value.toString()}
                      onChangeText={text =>
                        setEditedData(prev => ({...prev, [key]: text}))
                      }
                      placeholder={`${key} giriniz`}
                    />
                  </View>
                ),
              )}
            {selectedSection === 'branch' &&
              Object.entries(selectedBranch.inventory.branchInfo).map(
                ([key, value]) => (
                  <View key={key} style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Text>
                    <TextInput
                      style={styles.input}
                      value={editedData?.[key] || value.toString()}
                      onChangeText={text =>
                        setEditedData(prev => ({...prev, [key]: text}))
                      }
                      placeholder={`${key} giriniz`}
                    />
                  </View>
                ),
              )}
          </ScrollView>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              showToast('Bilgiler kaydedildi');
              setInputModalVisible(false);
            }}>
            <Text style={styles.saveButtonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );

  const StatisticsCard = () => (
    <View style={styles.statisticsCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>İstatistikler</Text>
        <Icon name="chart-bar" size={24} color="#4A90E2" />
      </View>
      <View style={styles.statisticsGrid}>
        {Object.entries(selectedBranch.inventory.statistics).map(
          ([key, value]) => (
            <View key={key} style={styles.statItem}>
              <Text style={styles.statValue}>{value}</Text>
              <Text style={styles.statLabel}>
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, ' $1')}
              </Text>
            </View>
          ),
        )}
      </View>
    </View>
  );

  const QuickActionButton = ({icon, title, onPress}) => (
    <TouchableOpacity style={styles.quickActionButton} onPress={onPress}>
      <Icon name={icon} size={24} color="#4A90E2" />
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  const InventoryCard = ({title, data, icon, onPress}) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <LinearGradient
        colors={['#ffffff', '#f8f9ff']}
        style={styles.cardGradient}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Icon name={icon} size={24} color="#4A90E2" />
        </View>
        <View style={styles.cardContent}>
          {Object.entries(data)
            .slice(0, 5)
            .map(([key, value]) => (
              <View key={key} style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, ' $1')}
                  :
                </Text>
                <Text style={styles.infoValue}>
                  {Array.isArray(value) ? value.join(', ') : value.toString()}
                </Text>
              </View>
            ))}
          {Object.keys(data).length > 5 && (
            <Text style={styles.moreInfo}>
              Daha fazla bilgi için tıklayın...
            </Text>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#4A90E2', '#357ABD']} style={styles.header}>
        <TouchableOpacity
          style={styles.branchSelector}
          onPress={() => setBranchModalVisible(true)}>
          <Text style={styles.branchText}>{selectedBranch.name}</Text>
          <Icon name="chevron-down" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => showToast('QR Kod tarayıcı açılıyor...', 'info')}>
            <Icon name="qrcode-scan" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => showToast('Veriler güncellendi')}>
            <Icon name="refresh" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView}>
        <View style={styles.quickActions}>
          <QuickActionButton
            icon="plus-circle"
            title="Yeni Ekle"
            onPress={() => showToast('Yeni ekleme ekranı açılıyor...')}
          />
          <QuickActionButton
            icon="file-document"
            title="Rapor"
            onPress={() => showToast('Raporlar hazırlanıyor...')}
          />
          <QuickActionButton
            icon="history"
            title="Geçmiş"
            onPress={() => showToast('Geçmiş görüntüleniyor...')}
          />
        </View>

        <View style={styles.inventorySummaryContainer}>
          <InventoryCard
            title="Ürün Envanter Bilgisi"
            data={selectedBranch.inventory.productInfo}
            icon="package-variant"
            onPress={() => {
              setSelectedSection('product');
              setEditedData(null);
              setInputModalVisible(true);
            }}
          />
          <InventoryCard
            title="Şube Envanter Bilgisi"
            data={selectedBranch.inventory.branchInfo}
            icon="office-building"
            onPress={() => {
              setSelectedSection('branch');
              setEditedData(null);
              setInputModalVisible(true);
            }}
          />
          <StatisticsCard />
        </View>
      </ScrollView>

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
                  showToast(`${branch.name} seçildi`);
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

      <InputModal />
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  quickActionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  inventorySummaryContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 16,
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
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  moreInfo: {
    color: '#4A90E2',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  statisticsCard: {
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
  statisticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statItem: {
    width: '48%',
    backgroundColor: '#F8F9FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
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
  formContainer: {
    maxHeight: '70%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EnvanterScreen;
