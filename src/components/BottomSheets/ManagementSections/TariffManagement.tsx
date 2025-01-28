import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import SohoText from '@/components/SohoText';
import Fonts from '@/theme/Fonts';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import ManagementSectionsHeader from '@/components/ManagementSectionsHeader';

const TariffManagement = () => {
  const [tariffMode, setTariffMode] = useState('');
  const [tariffMultiplier, setTariffMultiplier] = useState('');
  const [selectedTariff, setSelectedTariff] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('');
  const [term, setTerm] = useState('');
  const [tariff, setTariff] = useState('');
  const [price, setPrice] = useState('');
  const [tariffName, setTariffName] = useState('');

  const handleTariffModeChange = mode => {
    setTariffMode(mode);
    setSelectedTariff('');
    setSubscriptionType('');
    setTerm('');
    setTariff('');
    setPrice('');
  };

  const calculatePrice = () => {
    return Math.floor(Math.random() * 100) + 10;
  };

  const handleTariffCalculation = () => {
    console.log(tariffName, selectedTariff, subscriptionType, term, tariff);
    const calculatedPrice = calculatePrice();
    setPrice(`${calculatedPrice} TL`);
  };

  return (
    <View style={styles.container}>
      <ManagementSectionsHeader
        headerTitle="Tarife Yönetimi"
        backgroundColor={['#2196F3', '#1976D2']}
        iconName="add"
        iconColor="white"
        iconBackgroundColor="#1976D2"
        onPress={() => null}
      />

      <View style={styles.tarifeSecimi}>
        <TouchableOpacity
          style={[
            styles.tarifeButton,
            tariffMode === 'manuel' && styles.selectedButton,
          ]}
          onPress={() => handleTariffModeChange('manuel')}>
          <Icon
            name="edit"
            size={24}
            color={tariffMode === 'manuel' ? '#FFFFFF' : '#1976D2'}
          />
          <SohoText
            style={[
              styles.buttonText,
              tariffMode === 'manuel' && styles.selectedButtonText,
            ]}>
            Manuel Tarife
          </SohoText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tarifeButton,
            tariffMode === 'otomatik' && styles.selectedButton,
          ]}
          onPress={() => handleTariffModeChange('otomatik')}>
          <Icon
            name="autorenew"
            size={24}
            color={tariffMode === 'otomatik' ? '#FFFFFF' : '#1976D2'}
          />
          <SohoText
            style={[
              styles.buttonText,
              tariffMode === 'otomatik' && styles.selectedButtonText,
            ]}>
            Otomatik Tarife
          </SohoText>
        </TouchableOpacity>
      </View>

      {tariffMode === 'manuel' && (
        <View style={styles.card}>
          <SohoText fontFamily={Fonts.Regular} style={styles.label}>
            Tarife Çarpanı:
          </SohoText>
          <TextInput
            style={styles.input}
            value={tariffMultiplier}
            onChangeText={setTariffMultiplier}
            keyboardType="numeric"
            placeholder="Çarpan değerini girin"
          />
        </View>
      )}

      <View>
        {tariffMode === 'otomatik' && (
          <View style={styles.card}>
            <SohoText fontFamily={Fonts.Regular} style={styles.label}>
              Tarife Adı:
            </SohoText>
            <TextInput
              style={styles.input}
              value={tariffName}
              keyboardType="numeric"
              onChangeText={value => setTariffName(value)}
              placeholder="Tarife adını girin"
            />

            <SohoText fontFamily={Fonts.Semibold} style={styles.cardTitle}>
              Tarife Seçenekleri
            </SohoText>
            <View style={styles.tarifeKutuları}>
              {[
                {id: 1, name: 'Ticarethane', icon: 'store'},
                {id: 2, name: 'Sanayi', icon: 'factory'},
                {id: 3, name: 'Mesken', icon: 'home'},
                {id: 4, name: 'Tarım', icon: 'grass'},
              ].map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.tarifeKutusu,
                    selectedTariff === item.id && styles.selectedKutu,
                  ]}
                  onPress={() => setSelectedTariff(item.id)}>
                  <Icon
                    name={item.icon}
                    size={32}
                    color={selectedTariff === item.id ? '#FFFFFF' : '#1976D2'}
                  />
                  <SohoText
                    style={[
                      styles.kutuText,
                      selectedTariff === item.id && styles.selectedKutuText,
                    ]}>
                    {item.name}
                  </SohoText>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.pickerContainer}>
              <SohoText style={styles.pickerLabel}>Abonelik Tanımı</SohoText>
              <Picker
                selectedValue={subscriptionType}
                onValueChange={itemValue => setSubscriptionType(itemValue)}
                style={styles.picker}>
                <Picker.Item label="Seçiniz" value="" />
                <Picker.Item label="Düşük Gerilim" value="1" />
                <Picker.Item label="Orta Gerilim" value="2" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <SohoText style={styles.pickerLabel}>Terim</SohoText>
              <Picker
                selectedValue={term}
                onValueChange={itemValue => setTerm(itemValue)}
                style={styles.picker}>
                <Picker.Item label="Seçiniz" value="" />
                <Picker.Item label="Tek Terim" value="1" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <SohoText style={styles.pickerLabel}>Tarife</SohoText>
              <Picker
                selectedValue={tariff}
                onValueChange={itemValue => setTariff(itemValue)}
                style={styles.picker}>
                <Picker.Item label="Seçiniz" value="" />
                <Picker.Item label="Tek Zamanlı" value="1" />
                <Picker.Item label="Çok Zamanlı" value="2" />
              </Picker>
            </View>

            <TouchableOpacity
              style={styles.hesaplaButton}
              onPress={handleTariffCalculation}>
              <Icon name="calculate" size={24} color="#FFFFFF" />
              <SohoText style={styles.hesaplaButtonText}>
                Tarife Göster
              </SohoText>
            </TouchableOpacity>

            {price !== '' && (
              <View style={styles.fiyatContainer}>
                <SohoText style={styles.fiyatLabel}>Tarife Fiyatı:</SohoText>
                <SohoText style={styles.fiyat}>{price}</SohoText>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.hesaplaButton,
                {marginTop: scaledHeight(12), backgroundColor: '#243B55'},
              ]}
              onPress={handleTariffCalculation}>
              <Icon name="save" size={24} color="#FFFFFF" />
              <SohoText style={styles.hesaplaButtonText}>Kaydet</SohoText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  header: {
    backgroundColor: '#1976D2',
    paddingVertical: scaledHeight(20),
    paddingHorizontal: scaledWidth(20),
    borderBottomLeftRadius: scaledWidth(20),
    borderBottomRightRadius: scaledWidth(20),
  },
  headerTitle: {
    fontSize: scaledWidth(24),
    color: '#FFFFFF',
    textAlign: 'center',
  },
  tarifeSecimi: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: scaledHeight(20),
  },
  tarifeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: scaledHeight(10),
    paddingHorizontal: scaledWidth(20),
    borderRadius: scaledWidth(10),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedButton: {
    backgroundColor: '#1976D2',
  },
  buttonText: {
    color: '#1976D2',
    fontSize: scaledWidth(16),
    marginLeft: scaledWidth(10),
  },
  selectedButtonText: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaledWidth(15),
    padding: scaledWidth(20),
    marginHorizontal: scaledWidth(20),
    marginBottom: scaledHeight(20),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: scaledWidth(18),
    color: '#1976D2',
    marginBottom: scaledHeight(15),
  },
  label: {
    fontSize: scaledWidth(16),
    color: '#333333',
    marginBottom: scaledHeight(10),
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: scaledWidth(8),
    padding: scaledWidth(12),
    fontSize: scaledWidth(16),
  },
  tarifeKutuları: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: scaledHeight(20),
  },
  tarifeKutusu: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    aspectRatio: 1,
    borderRadius: scaledWidth(10),
    backgroundColor: '#F0F2F5',
    marginBottom: scaledHeight(15),
  },
  selectedKutu: {
    backgroundColor: '#1976D2',
  },
  kutuText: {
    marginTop: scaledHeight(10),
    fontSize: scaledWidth(14),
    color: '#1976D2',
  },
  selectedKutuText: {
    color: '#FFFFFF',
  },
  pickerContainer: {
    marginBottom: scaledHeight(20),
  },
  pickerLabel: {
    fontSize: scaledWidth(16),
    color: '#333333',
    marginBottom: scaledHeight(5),
  },
  picker: {
    backgroundColor: '#F0F2F5',
    borderRadius: scaledWidth(8),
  },
  hesaplaButton: {
    flexDirection: 'row',
    backgroundColor: '#1976D2',
    paddingVertical: scaledHeight(15),
    borderRadius: scaledWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  hesaplaButtonText: {
    color: '#FFFFFF',
    fontSize: scaledWidth(18),
    marginLeft: scaledWidth(10),
  },
  fiyatContainer: {
    marginTop: scaledHeight(20),
    padding: scaledWidth(15),
    backgroundColor: '#F0F2F5',
    borderRadius: scaledWidth(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fiyatLabel: {
    fontSize: scaledWidth(16),
    color: '#333333',
  },
  fiyat: {
    fontSize: scaledWidth(18),
    color: '#1976D2',
  },
});

export default TariffManagement;
