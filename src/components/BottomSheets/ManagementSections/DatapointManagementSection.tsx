import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import SohoText from '@/components/SohoText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import Fonts from '@/theme/Fonts';
import {Picker} from '@react-native-picker/picker';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {FlashList} from '@shopify/flash-list';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import ListEmptyManagementSection from '@/components/ListEmptyManagementSection';
import ManagementSectionsHeader from '@/components/ManagementSectionsHeader';
import {addDatapoint} from '@/redux/slices/DatapointSlices/addDatapointSlice';
import {
  Datapoint,
  getDatapoint,
} from '@/redux/slices/DatapointSlices/getDatapointSlice';
import {setGlobalLoadState} from '@/redux/slices/globalLoadSlice';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';

const DatapointManagementSection = () => {
  const dispatch = useAppDispatch();
  const [selectedBranch, setSelectedBranch] = useState();
  const [datapointFields, setDatapointFields] = useState(['']);
  const {data} = useAppSelector(state => state.getDatapoint);
  const {data: branches} = useAppSelector(state => state.getBranch);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleAddInputField = () => {
    setDatapointFields([...datapointFields, '']);
  };

  const [_, setExpandedItems] = useState({});
  const animatedValues = useRef({});

  const toggleExpand = useCallback(id => {
    setExpandedItems(prev => {
      const newState = {...prev, [id]: !prev[id]};
      if (!animatedValues.current[id]) {
        animatedValues.current[id] = new Animated.Value(newState[id] ? 1 : 0);
      }
      Animated.timing(animatedValues.current[id], {
        toValue: newState[id] ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      return newState;
    });
  }, []);

  const handleRemoveInputField = (index: number) => {
    const updatedFields = datapointFields.filter((_, i) => i !== index);
    setDatapointFields(updatedFields);
  };

  const handleInputChange = (text, index) => {
    const updatedFields = datapointFields.map((field, i) =>
      i === index ? text : field,
    );
    setDatapointFields(updatedFields);
  };

  const handleSaveDatapoints = async () => {
    dispatch(setGlobalLoadState(true));

    if (!selectedBranch || !datapointFields.length) {
      dispatch(setGlobalLoadState(false));
      return;
    }

    const datapoints = datapointFields.map(field => ({
      BranchId: selectedBranch,
      name: field,
    }));

    try {
      const resultAction = await dispatch(addDatapoint(datapoints));

      if (addDatapoint.fulfilled.match(resultAction)) {
        const {status, message} = resultAction.payload;
        if (status) {
          await dispatch(getDatapoint());
          Toast.show({
            type: 'success',
            text1: 'İşlem Başarılı',
            text2: message,
            position: 'top',
          });
          bottomSheetRef.current?.close();
        }
      } else {
        const {status, message} = resultAction.payload;
        console.log(`Error: ${status}, Message: ${message}`);
      }
    } catch (error) {
      dispatch(setGlobalLoadState(false));
    } finally {
      dispatch(setGlobalLoadState(false));
    }
  };

  const handleEditDatapoint = (id: number) => {
    console.log(id);
  };

  const handleDeleteDatapoint = (id: number) => {
    console.log(id);
  };
  const renderDatapointItem = useCallback(
    ({item}: {item: Datapoint}) => {
      if (!animatedValues.current[item.id]) {
        animatedValues.current[item.id] = new Animated.Value(0);
      }

      const rotateAnimation = animatedValues.current[item.id].interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
      });

      const actionHeight = animatedValues.current[item.id].interpolate({
        inputRange: [0, 1],
        outputRange: [0, 70],
      });

      return (
        <View style={styles.cardContainer}>
          <LinearGradient
            colors={['#FFA726', '#FB8C00']}
            style={styles.cardHeader}>
            <SohoText fontFamily={Fonts.Bold} style={styles.cardTitle}>
              {item.name}
            </SohoText>
            <View style={styles.cardIdContainer}>
              <SohoText style={styles.cardIdText}>#{item.id}</SohoText>
            </View>
          </LinearGradient>
          <View style={styles.cardDetails}>
            <View style={styles.detailRow}>
              <Icon name="business" size={18} color="#FFA726" />
              <SohoText style={styles.detailText}>{item.branchName}</SohoText>
              <TouchableOpacity
                onPress={() => toggleExpand(item.id)}
                style={styles.expandButton}>
                <Animated.View style={{transform: [{rotate: rotateAnimation}]}}>
                  <Icon name="expand-more" size={28} color="#FFA726" />
                </Animated.View>
              </TouchableOpacity>
            </View>
            <View style={styles.detailRow}>
              <Icon name="event" size={18} color="#FFA726" />
              <SohoText style={styles.detailText}>
                {item.createdAt}19/10/2024
              </SohoText>
            </View>
          </View>
          <Animated.View
            style={[
              styles.cardActions,
              {
                maxHeight: actionHeight,
                overflow: 'hidden',
                padding: toggleExpand ? scaledHeight(2) : scaledHeight(20),
              },
            ]}>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => handleEditDatapoint(item.id)}>
              <Icon name="edit" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDeleteDatapoint(item.id)}>
              <Icon name="delete" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      );
    },
    [toggleExpand],
  );

  return (
    <>
      <View style={styles.container}>
        <ManagementSectionsHeader
          backgroundColor={['#FFA726', '#FB8C00']}
          headerTitle="Veri Noktalarım"
          iconBackgroundColor="#FB8C00"
          iconColor="white"
          iconName="add"
          onPress={() => bottomSheetRef.current?.expand()}
        />

        <FlashList
          data={data}
          renderItem={renderDatapointItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            paddingHorizontal: scaledWidth(10),
            paddingBottom: scaledHeight(120),
          }}
          estimatedItemSize={300}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <ListEmptyManagementSection
              descriptionText="Daha önce eklenmiş datapoint bulunamadı"
              buttonText="İlk Datapointini Ekle"
              iconName="data-usage"
              color="#FB8C00"
              onPress={() => bottomSheetRef.current?.expand()}
            />
          }
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['97%']}
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheetBackground}>
        <BottomSheetScrollView style={styles.bottomSheetContent}>
          <SohoText fontFamily={Fonts.Bold} style={styles.bottomSheetTitle}>
            Yeni Veri Noktası Ekle
          </SohoText>
          <View style={styles.pickerContainer}>
            <SohoText fontFamily={Fonts.Semibold} style={styles.pickerLabel}>
              Şube Seçin
            </SohoText>
            <Picker
              selectedValue={selectedBranch}
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

          {datapointFields.map((field, index) => (
            <View key={index} style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={`Veri Noktası ${index + 1}`}
                value={field}
                onChangeText={text => handleInputChange(text, index)}
              />
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
            onPress={item => handleSaveDatapoints(item)}>
            <SohoText style={styles.saveButtonText}>Kaydet</SohoText>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaledWidth(12),
    marginVertical: scaledHeight(8),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: scaledWidth(16),
    marginVertical: scaledHeight(8),
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scaledWidth(8),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  cardTitle: {
    fontSize: scaledWidth(18),
    color: 'white',
  },
  cardIdContainer: {
    backgroundColor: '#FB8C00',
    borderRadius: scaledWidth(10),
    paddingHorizontal: scaledWidth(8),
    paddingVertical: scaledHeight(2),
  },
  cardIdText: {
    fontSize: scaledWidth(14),
    color: 'white',
    fontWeight: 'bold',
  },
  cardDetails: {
    padding: scaledWidth(16),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaledHeight(8),
  },
  detailText: {
    fontSize: scaledWidth(16),
    color: '#555555',
    marginLeft: scaledWidth(10),
  },
  cardActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    borderTopColor: '#efefef',
    borderTopWidth: 1,
  },
  actionButton: {
    width: scaledWidth(40),
    height: scaledWidth(40),
    borderRadius: scaledWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scaledWidth(8),
  },
  editButton: {
    backgroundColor: '#03DAC6',
  },
  deleteButton: {
    backgroundColor: '#CF6679',
  },
  branchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaledHeight(5),
  },
  branchName: {
    fontSize: scaledWidth(16),
    color: '#495057',
    marginLeft: scaledWidth(10),
  },
  expandButton: {
    marginLeft: 'auto',
    padding: scaledWidth(5),
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
    flex: 1,

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
    backgroundColor: '#FB8C00',
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
});

export default DatapointManagementSection;
