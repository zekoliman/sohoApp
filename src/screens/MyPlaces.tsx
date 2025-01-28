import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import SohoText from '@/components/SohoText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {Picker} from '@react-native-picker/picker';
import {useAppSelector} from '@/redux/hooks';
import ManagementSectionsHeader from '@/components/ManagementSectionsHeader';
import {FlashList} from '@shopify/flash-list';

const {width, height} = Dimensions.get('window');
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

const MyPlaces = ({currentSection}) => {
  const {data} = useAppSelector(state => state.getBranch);
  const [isAddingBranch, setIsAddingBranch] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState({
    latitude: 41.0082,
    longitude: 28.9784,
  });
  const [isFullScreenMap, setIsFullScreenMap] = useState(false);
  const [isAddressInputFullScreen, setIsAddressInputFullScreen] =
    useState(false);
  const googlePlacesRef = useRef(null);

  const bottomSheetRef = useRef(null);
  const mapRef = useRef(null);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const validationSchema = Yup.object().shape({
    newBranchName: Yup.string().required('Şube adı zorunludur'),
    newBranchAddress: Yup.string().required('Şube adresi zorunludur'),
    newBranchOpeningTime: Yup.string().required('Açılış saati zorunludur'),
    newBranchClosingTime: Yup.string().required('Kapanış saati zorunludur'),
    newBranchType: Yup.string().required('Şube türü zorunludur'),
    selectedCountry: Yup.string().required('Ülke seçimi zorunludur'),
    selectedCity: Yup.string().required('Şehir seçimi zorunludur'),
  });

  const handleAddBranch = () => {
    setIsAddingBranch(true);
    bottomSheetRef.current?.expand();
  };

  const handleCloseAddBranch = () => {
    setIsAddingBranch(false);
    bottomSheetRef.current?.close();
  };

  const handleMarkerDragEnd = e => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setSelectedCoordinates({latitude, longitude});
  };

  const renderBranchType = type_id => {
    switch (type_id) {
      case 1:
        return 'Bireysel';
      case 2:
        return 'Kurumsal';
    }
  };

  const BranchList = () => (
    <SafeAreaView style={styles.container}>
      <ManagementSectionsHeader
        backgroundColor={['#4CAF50', '#45a049']}
        headerTitle="Şubelerim"
        iconName="add"
        iconColor="white"
        onPress={handleAddBranch}
        iconBackgroundColor="#45a049"
      />
      <FlashList
        data={data}
        renderItem={renderBranchItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.branchList}
        estimatedItemSize={300}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );

  const renderBranchItem = ({item}) => (
    <TouchableOpacity
      style={styles.branchItem}
      onPress={() => handleShowFullScreenMap()}>
      <Icon name="store" size={24} color="#45a049" style={styles.branchIcon} />
      <View style={styles.branchInfo}>
        <SohoText fontFamily="Semibold" style={styles.branchName}>
          {item.name}
        </SohoText>
        <SohoText fontFamily="Regular" style={styles.branchAddress}>
          {renderBranchType(item.type_id)}
        </SohoText>
      </View>
      <TouchableOpacity onPress={() => handleEditBranch(item.id)}>
        <Icon
          name="edit"
          size={24}
          color="#45a049"
          style={styles.branchActionIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteBranch(item.id)}>
        <Icon
          name="delete"
          size={24}
          color="#d9534f"
          style={styles.branchActionIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleShowFullScreenMap = () => {
    setIsFullScreenMap(true);
    bottomSheetRef.current?.close();
  };

  const handleCloseFullScreenMap = () => {
    setIsFullScreenMap(false);
    bottomSheetRef.current?.expand();
  };

  const animateOpen = () => {
    setIsAddressInputFullScreen(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const animateClose = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsAddressInputFullScreen(false));
  };

  const FullScreenAddressPicker = ({onClose, formikProps}) => (
    <Animated.View style={[styles.fullScreenModal, {opacity: animatedValue}]}>
      <GooglePlacesAutocomplete
        placeholder="Şube Adresi"
        fetchDetails={true}
        onPress={(data, details = null) => {
          formikProps.setFieldValue('newBranchAddress', data.description);
          setSelectedCoordinates({
            latitude: details?.geometry.location.lat,
            longitude: details?.geometry.location.lng,
          });
          const addressComponents = details.address_components;
          const country = addressComponents.find(component =>
            component.types.includes('country'),
          )?.long_name;
          const city = addressComponents.find(component =>
            component.types.includes('administrative_area_level_1'),
          )?.long_name;
          formikProps.setFieldValue('selectedCountry', country);
          formikProps.setFieldValue('selectedCity', city);

          animateClose();
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'tr',
          nearbyPlacesAPI: 'GooglePlacesSearch',
          components: 'country:tr',
        }}
        enablePoweredByContainer={false}
        styles={{
          container: styles.googlePlacesContainer,
          textInputContainer: styles.googlePlacesInputContainer,
          textInput: styles.googlePlacesTextInput,
        }}
      />
      <TouchableOpacity style={styles.closeFullScreenButton} onPress={onClose}>
        <Icon name="close" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </Animated.View>
  );

  const AddBranchForm = () => (
    <Formik
      initialValues={{
        newBranchName: '',
        newBranchAddress: '',
        newBranchOpeningTime: '',
        newBranchClosingTime: '',
        newBranchType: '1',
        selectedCountry: '',
        selectedCity: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        const newBranch = {
          ...values,
          longitude: selectedCoordinates.longitude.toString(),
          latitude: selectedCoordinates.latitude.toString(),
        };
        handleCloseAddBranch();
      }}>
      {formikProps => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.formContainer}>
          <View style={{paddingBottom: 122}}>
            <View style={styles.formHeader}>
              <SohoText style={styles.formTitle}>Yeni Şube Ekle</SohoText>
              <TouchableOpacity onPress={handleCloseAddBranch}>
                <Icon name="close" size={24} color="#1C1C1E" />
              </TouchableOpacity>
            </View>
            <InputField
              icon="store"
              placeholder="Şube Adı"
              value={formikProps.values.newBranchName}
              onChangeText={formikProps.handleChange('newBranchName')}
              error={
                formikProps.errors.newBranchName &&
                formikProps.touched.newBranchName
                  ? formikProps.errors.newBranchName
                  : null
              }
            />

            <InputField
              icon="access-time"
              placeholder="Açılış Saati"
              value={formikProps.values.newBranchOpeningTime}
              onChangeText={formikProps.handleChange('newBranchOpeningTime')}
              error={
                formikProps.errors.newBranchOpeningTime &&
                formikProps.touched.newBranchOpeningTime
                  ? formikProps.errors.newBranchOpeningTime
                  : null
              }
            />
            <InputField
              icon="access-time"
              placeholder="Kapanış Saati"
              value={formikProps.values.newBranchClosingTime}
              onChangeText={formikProps.handleChange('newBranchClosingTime')}
              error={
                formikProps.errors.newBranchClosingTime &&
                formikProps.touched.newBranchClosingTime
                  ? formikProps.errors.newBranchClosingTime
                  : null
              }
            />
            <View style={styles.pickerContainer}>
              <Icon
                name="business"
                size={24}
                color="#45a049"
                style={styles.inputIcon}
              />
              <Picker
                selectedValue={formikProps.values.newBranchType}
                style={styles.picker}
                onValueChange={itemValue =>
                  formikProps.setFieldValue('newBranchType', itemValue)
                }>
                <Picker.Item label="Bireysel" value="1" />
                <Picker.Item label="Kurumsal" value="2" />
              </Picker>
            </View>
            {formikProps.errors.newBranchType &&
              formikProps.touched.newBranchType && (
                <SohoText style={styles.errorText}>
                  {formikProps.errors.newBranchType}
                </SohoText>
              )}
            <InputField
              icon="location-on"
              placeholder="Şube Adresi"
              value={formikProps.values.newBranchAddress}
              onChangeText={formikProps.handleChange('newBranchAddress')}
              error={
                formikProps.errors.newBranchAddress &&
                formikProps.touched.newBranchAddress
                  ? formikProps.errors.newBranchAddress
                  : null
              }
              isAddressInput={true}
              onPress={() => animateOpen()}
            />
            <View
              style={[
                styles.mapContainer,
                isFullScreenMap && styles.fullScreenMap,
              ]}>
              <MapView
                ref={mapRef}
                style={[styles.map, isFullScreenMap && styles.fullScreenMap]}
                initialRegion={{
                  ...selectedCoordinates,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}>
                <Marker
                  coordinate={selectedCoordinates}
                  draggable
                  onDragEnd={handleMarkerDragEnd}
                />
              </MapView>
              {isFullScreenMap && (
                <TouchableOpacity
                  style={styles.closeFullScreenButton}
                  onPress={handleCloseFullScreenMap}>
                  <Icon name="close" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.coordinatesContainer}>
              <SohoText style={styles.coordinatesText}>
                Enlem: {selectedCoordinates.latitude.toFixed(4)}
              </SohoText>
              <SohoText style={styles.coordinatesText}>
                Boylam: {selectedCoordinates.longitude.toFixed(4)}
              </SohoText>
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={formikProps.handleSubmit}>
              <SohoText style={styles.submitButtonText}>Şube Ekle</SohoText>
            </TouchableOpacity>

            {isAddressInputFullScreen && (
              <FullScreenAddressPicker
                onClose={animateClose}
                formikProps={formikProps}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );

  const InputField = ({
    icon,
    placeholder,
    value,
    onChangeText,
    error,
    isAddressInput,
    onPress,
  }) => (
    <TouchableOpacity
      onPress={isAddressInput ? onPress : undefined}
      style={styles.inputContainer}>
      <Icon name={icon} size={24} color="#45a049" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        editable={!isAddressInput} // Adres alanı için tıklanabilir yapalım
      />
      {error && <SohoText style={styles.errorText}>{error}</SohoText>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {currentSection === 'branch' && <BranchList />}
      <BottomSheet
        ref={bottomSheetRef}
        index={isFullScreenMap ? -1 : 0}
        snapPoints={['50%', '75%', '95%']}
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheetBg}>
        <BottomSheetScrollView>
          {isFullScreenMap ? (
            <View style={styles.fullScreenMapContainer}>
              <MapView
                ref={mapRef}
                style={styles.fullScreenMap}
                initialRegion={{
                  ...selectedCoordinates,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}>
                <Marker
                  coordinate={selectedCoordinates}
                  draggable
                  onDragEnd={handleMarkerDragEnd}
                />
              </MapView>
              <TouchableOpacity
                style={styles.closeFullScreenButton}
                onPress={handleCloseFullScreenMap}>
                <Icon name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <AddBranchForm />
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  branchList: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  branchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  branchIcon: {
    marginRight: 20,
  },
  branchInfo: {
    flex: 1,
  },
  branchName: {
    fontSize: 18,
    color: '#1C1C1E',
    marginBottom: 5,
  },
  branchAddress: {
    fontSize: 14,
    color: '#8E8E93',
  },

  bottomSheetBg: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    fontSize: 22,
    color: '#1C1C1E',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#1C1C1E',
  },
  mapContainer: {
    height: 200,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  fullScreenMap: {
    height: height,
    width: width,
  },
  fullScreenMapContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  submitButton: {
    backgroundColor: '#45a049',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  googlePlacesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  googlePlacesInputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  googlePlacesTextInput: {
    height: 50,
    fontSize: 16,
    color: '#1C1C1E',
  },
  branchActionIcon: {
    marginHorizontal: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  picker: {
    flex: 1,
  },
  errorText: {
    color: '#d9534f',
    fontSize: 14,
    marginTop: 5,
  },
  coordinatesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  coordinatesText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  closeFullScreenButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 50,
  },
  fullScreenModal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    zIndex: 9999,
  },
});

export default MyPlaces;
