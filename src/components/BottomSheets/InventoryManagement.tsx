import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import SohoText from '@/components/SohoText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import Fonts from '@/theme/Fonts';
import {Picker} from '@react-native-picker/picker';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {FlashList} from '@shopify/flash-list';
import ManagementSectionsHeader from '../ManagementSectionsHeader';

const InventoryManagement = () => {
  const [selectedInventory, setSelectedInventory] = useState('');
  const [selectedDeviceType, setSelectedDeviceType] = useState('');
  const [selectedDailyWorkingTime, setSelectedDailyWorkingTime] = useState('');
  const [inventoryFields, setInventoryFields] = useState([
    {
      type: '',
      quantity: '',
      brand: '',
      model: '',
      dailyWorkingTime: '',
    },
  ]);
  const [inventorys, setInventory] = useState([
    {
      id: '1',
      name: 'Kadıköy Şube',
      devices: ['Klima, Buzdolabı'],
    },
  ]);

  const bottomSheetRef = useRef(null);

  const handleAddInputField = () => {
    setInventoryFields([
      ...inventoryFields,
      {
        type: '',
        quantity: '',
        brand: '',
        model: '',
        dailyWorkingTime: '',
      },
    ]);
  };

  const handleRemoveInputField = index => {
    const updatedFields = inventoryFields.filter((_, i) => i !== index);
    setInventoryFields(updatedFields);
  };

  const handleInputChange = (field, value, index) => {
    const updatedFields = inventoryFields.map((item, i) =>
      i === index ? {...item, [field]: value} : item,
    );
    setInventoryFields(updatedFields);
  };

  const handleSaveDatapoints = () => {
    if (selectedInventory) {
      const newDatapoints = inventoryFields
        .filter(
          dp =>
            dp.type &&
            dp.quantity.trim() &&
            dp.brand.trim() &&
            dp.model.trim() &&
            dp.dailyWorkingTime,
        )
        .map(dp => ({
          id: (datapoints.length + 1).toString(),
          name: `${dp.type} - ${dp.brand} (${dp.model})`,
          devices: [
            `${selectedInventory} - ${dp.quantity} adet, Günlük Çalışma Süresi: ${dp.dailyWorkingTime}`,
          ],
        }));

      setInventory([...inventorys, ...newInventorys]);
      setInventoryFields([
        {
          type: '',
          quantity: '',
          brand: '',
          model: '',
          dailyWorkingTime: '',
        },
      ]);
      bottomSheetRef.current?.close();
    } else {
      alert('Lütfen bir şube seçin.');
    }
  };

  const renderInventoryItems = ({item}) => (
    <View style={styles.datapointItem}>
      <SohoText fontFamily={Fonts.Semibold} style={styles.datapointName}>
        {item.name}
      </SohoText>
      {item.devices.map((device, index) => (
        <View key={index} style={styles.deviceContainer}>
          <Icon name="business" size={20} color="#3F51B5" />
          <SohoText style={styles.branchName}>{device}</SohoText>
        </View>
      ))}
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <ManagementSectionsHeader
          headerTitle="Envanter Yönetimi"
          backgroundColor={['#5C6BC0', '#3F51B5']}
          iconName="add"
          iconColor="white"
          iconBackgroundColor="#3F51B5"
          onPress={() => bottomSheetRef.current?.expand()}
        />

        <FlashList
          data={inventorys}
          renderItem={renderInventoryItems}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.datapointList}
          estimatedItemSize={300}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['90%']}
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheetBackground}>
        <BottomSheetScrollView
          contentContainerStyle={{paddingBottom: 140}}
          style={styles.bottomSheetContent}>
          <SohoText fontFamily={Fonts.Bold} style={styles.bottomSheetTitle}>
            Envantere Cihaz Ekle
          </SohoText>
          <View style={styles.pickerContainer}>
            <SohoText fontFamily={Fonts.Semibold} style={styles.pickerLabel}>
              Şube Seçin
            </SohoText>
            <Picker
              selectedValue={selectedInventory}
              onValueChange={itemValue => setSelectedInventory(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Şube Seçin" value="" />
              <Picker.Item label="Merkez Şube" value="Merkez Şube" />
              <Picker.Item label="Kadıköy Şube" value="Kadıköy Şube" />
              <Picker.Item label="Beşiktaş Şube" value="Beşiktaş Şube" />
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <SohoText fontFamily={Fonts.Semibold} style={styles.pickerLabel}>
              Günlük Çalışma Süresi
            </SohoText>
            <Picker
              selectedValue={selectedDailyWorkingTime}
              onValueChange={itemValue =>
                setSelectedDailyWorkingTime(itemValue)
              }
              style={styles.picker}>
              <Picker.Item label="Günlük Çalışma Süresi Seçin" value="" />
              {Array.from(
                {length: 25},
                (_, i) => `${i.toString().padStart(2, '0')}:00`,
              ).map(time => (
                <Picker.Item key={time} label={time} value={time} />
              ))}
            </Picker>
          </View>

          {inventoryFields.map((field, index) => (
            <View key={index} style={styles.inputContainer}>
              <View style={styles.inputGroup}>
                <SohoText fontFamily={Fonts.Semibold} style={styles.inputLabel}>
                  Cihaz Tipi
                </SohoText>
                <Picker
                  selectedValue={field.type}
                  onValueChange={itemValue =>
                    handleInputChange('type', itemValue, index)
                  }
                  style={styles.picker}>
                  <Picker.Item label="Cihaz Tipi Seçin" value="" />
                  <Picker.Item label="Klima" value="Klima" />
                  <Picker.Item label="Buzdolabı" value="Buzdolabı" />
                  <Picker.Item label="Bilgisayar" value="Bilgisayar" />
                  <Picker.Item label="Yazıcı" value="Yazıcı" />
                </Picker>
              </View>
              <View style={styles.inputGroup}>
                <SohoText fontFamily={Fonts.Semibold} style={styles.inputLabel}>
                  Adet
                </SohoText>
                <TextInput
                  style={styles.input}
                  placeholder="Adet"
                  value={field.quantity}
                  onChangeText={text =>
                    handleInputChange('quantity', text, index)
                  }
                />
              </View>
              <View style={styles.inputGroup}>
                <SohoText fontFamily={Fonts.Semibold} style={styles.inputLabel}>
                  Marka
                </SohoText>
                <TextInput
                  style={styles.input}
                  placeholder="Marka"
                  value={field.brand}
                  onChangeText={text => handleInputChange('brand', text, index)}
                />
              </View>
              <View style={styles.inputGroup}>
                <SohoText fontFamily={Fonts.Semibold} style={styles.inputLabel}>
                  Model
                </SohoText>
                <TextInput
                  style={styles.input}
                  placeholder="Model"
                  value={field.model}
                  onChangeText={text => handleInputChange('model', text, index)}
                />
              </View>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveInputField(index)}>
                <Icon name="remove" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addFieldButton}
            onPress={handleAddInputField}>
            <Icon name="add" size={24} color="#FFFFFF" />
            <SohoText style={styles.addButtonText}>Yeni Alan Ekle</SohoText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveDatapoints}>
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
    backgroundColor: '#3F51B5',
    borderRadius: scaledWidth(20),
    padding: scaledWidth(10),
  },
  datapointList: {
    paddingHorizontal: scaledWidth(20),
    paddingBottom: scaledHeight(20),
  },
  datapointItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaledWidth(12),
    padding: scaledWidth(15),
    marginTop: scaledHeight(15),
    elevation: 3,
  },
  datapointName: {
    fontSize: scaledWidth(18),
    color: '#3F51B5',
    marginBottom: scaledHeight(10),
  },
  deviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaledHeight(5),
  },
  branchName: {
    fontSize: scaledWidth(16),
    color: '#495057',
    marginLeft: scaledWidth(10),
  },
  bottomSheetBackground: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scaledWidth(20),
    borderTopRightRadius: scaledWidth(20),
  },
  bottomSheetContent: {
    padding: scaledWidth(20),
    paddingBottom: scaledHeight(200),
  },
  bottomSheetTitle: {
    fontSize: scaledWidth(20),
    color: '#1C1C1E',
    marginBottom: scaledHeight(20),
    textAlign: 'center',
  },
  pickerLabel: {
    fontSize: scaledWidth(16),
    color: '#1C1C1E',
    marginBottom: scaledHeight(10),
  },
  pickerContainer: {
    marginBottom: scaledHeight(20),
  },
  picker: {
    backgroundColor: '#F8F9FA',
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: scaledWidth(12),
    height: scaledHeight(50),
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
  removeButton: {
    backgroundColor: '#d9534f',
    borderRadius: scaledWidth(12),
    padding: scaledWidth(10),
    marginLeft: scaledWidth(10),
  },
  addFieldButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: scaledWidth(12),
    paddingVertical: scaledHeight(12),
    paddingHorizontal: scaledWidth(15),
    marginTop: scaledHeight(10),
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: scaledWidth(16),
    marginLeft: scaledWidth(5),
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
  inputContainer: {
    marginBottom: scaledHeight(20),
  },
  inputGroup: {
    marginBottom: scaledHeight(10),
  },
  inputLabel: {
    fontSize: scaledWidth(16),
    color: '#1C1C1E',
    marginBottom: scaledHeight(5),
  },
});

export default InventoryManagement;
