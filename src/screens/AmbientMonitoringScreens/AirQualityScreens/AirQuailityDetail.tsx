import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import SohoText from '@/components/SohoText';
import {useRoute} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const AirQualityDetail = ({navigation}) => {
  const route = useRoute();
  const [selectedTimeRange, setSelectedTimeRange] = useState('custom');
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedSensors, setSelectedSensors] = useState([]);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const fadeAnim = new Animated.Value(0);

  const sensorType = route.params?.sensorType || 'airFlow';

  const sensorConfig = {
    airFlow: {
      title: 'Hava Akışı',
      unit: 'm/s',
      gradient: ['#2193b0', '#6dd5ed'],
      icon: 'air',
    },
    voc: {
      title: 'VOC',
      unit: 'ppm',
      gradient: ['#ee0979', '#ff6a00'],
      icon: 'science',
    },
  };

  const currentConfig = sensorConfig[sensorType];

  // Şube ve sensör verileri
  const branchSensorMap = {
    branch1: [
      {id: 'sensor1_1', name: 'Sensör 1'},
      {id: 'sensor1_2', name: 'Sensör 2'},
    ],
    branch2: [
      {id: 'sensor2_1', name: 'Sensör 1'},
      {id: 'sensor2_2', name: 'Sensör 2'},
    ],
    branch3: [
      {id: 'sensor3_1', name: 'Sensör 1'},
      {id: 'sensor3_2', name: 'Sensör 2'},
      {id: 'sensor3_3', name: 'Sensör 3'},
      {id: 'sensor3_4', name: 'Sensör 4'},
    ],
  };

  const branches = [
    {id: 'branch1', name: 'Şube 1'},
    {id: 'branch2', name: 'Şube 2'},
    {id: 'branch3', name: 'Şube 3'},
  ];

  // Seçili şubelere göre sensör listesini oluştur
  const getAvailableSensors = () => {
    let sensors = [];
    selectedBranches.forEach(branchId => {
      sensors = [...sensors, ...branchSensorMap[branchId]];
    });
    return sensors;
  };

  // Örnek veri oluşturma fonksiyonu
  const generateData = () => {
    const getDates = () => {
      const dates = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    };

    const dates = getDates();
    const datasets = selectedSensors.map((sensorId, index) => ({
      data: dates.map(() => Math.random() * 100),
      color: (opacity = 1) =>
        `rgba(${33 + index * 50}, ${147 + index * 20}, ${
          176 + index * 20
        }, ${opacity})`,
      strokeWidth: 2,
      legend: `Sensör ${sensorId.split('_')[1]}`,
    }));

    return {
      labels: dates.map(date => date.getDate().toString()),
      datasets:
        datasets.length > 0
          ? datasets
          : [
              {
                data: [0],
                color: () => currentConfig.gradient[0],
                strokeWidth: 2,
              },
            ],
    };
  };

  const timeRanges = [
    {id: 'today', name: 'Bugün'},
    {id: 'week', name: 'Bu Hafta'},
    {id: 'month', name: 'Bu Ay'},
    {id: 'custom', name: 'Özel'},
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleBranchSelect = branchId => {
    const newSelection = selectedBranches.includes(branchId)
      ? selectedBranches.filter(id => id !== branchId)
      : [...selectedBranches, branchId];

    setSelectedBranches(newSelection);
    // Şube değiştiğinde seçili sensörleri sıfırla
    setSelectedSensors([]);
  };

  const handleSensorSelect = sensorId => {
    setSelectedSensors(
      selectedSensors.includes(sensorId)
        ? selectedSensors.filter(id => id !== sensorId)
        : [...selectedSensors, sensorId],
    );
  };

  const handleDateChange = (event, selectedDate, isStart) => {
    if (selectedDate) {
      if (isStart) {
        setStartDate(selectedDate);
        setShowStartDate(false);
      } else {
        setEndDate(selectedDate);
        setShowEndDate(false);
      }
    }
  };

  const renderMultiSelectChips = (items, selectedValues, onSelect) => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chipsContainer}>
          {items.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => onSelect(item.id)}
              style={[
                styles.chip,
                selectedValues.includes(item.id) && styles.selectedChip,
              ]}>
              <SohoText
                style={[
                  styles.chipText,
                  selectedValues.includes(item.id) && styles.selectedChipText,
                ]}>
                {item.name}
              </SohoText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={currentConfig.gradient} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name={'arrow-back'} size={40} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Icon name={currentConfig.icon} size={40} color="#fff" />
            <View>
              <SohoText style={styles.headerTitle}>
                {currentConfig.title}
              </SohoText>
              <SohoText style={styles.headerSubtitle}>Detaylı Analiz</SohoText>
            </View>
          </View>
        </View>
      </LinearGradient>

      <Animated.View style={[styles.chartCard, {opacity: fadeAnim}]}>
        <View style={styles.dateFilterContainer}>
          <View style={styles.timeRangeContainer}>
            <SohoText style={styles.filterTitle}>Zaman Aralığı</SohoText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.chipsContainer}>
                {timeRanges.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => setSelectedTimeRange(item.id)}
                    style={[
                      styles.chip,
                      selectedTimeRange === item.id && styles.selectedChip,
                    ]}>
                    <SohoText
                      style={[
                        styles.chipText,
                        selectedTimeRange === item.id &&
                          styles.selectedChipText,
                      ]}>
                      {item.name}
                    </SohoText>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {selectedTimeRange === 'custom' && (
            <View style={styles.datePickerContainer}>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowStartDate(true)}>
                <Icon name="calendar-today" size={20} color="#666" />
                <SohoText style={styles.dateButtonText}>
                  {startDate.toLocaleDateString()}
                </SohoText>
              </TouchableOpacity>

              <SohoText style={styles.dateSeperator}>-</SohoText>

              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowEndDate(true)}>
                <Icon name="calendar-today" size={20} color="#666" />
                <SohoText style={styles.dateButtonText}>
                  {endDate.toLocaleDateString()}
                </SohoText>
              </TouchableOpacity>
            </View>
          )}

          {showStartDate && (
            <DateTimePicker
              value={startDate}
              mode="date"
              onChange={(event, date) => handleDateChange(event, date, true)}
            />
          )}

          {showEndDate && (
            <DateTimePicker
              value={endDate}
              mode="date"
              onChange={(event, date) => handleDateChange(event, date, false)}
            />
          )}
        </View>

        <View style={styles.chartContainer}>
          <LineChart
            data={generateData()}
            width={width - 32}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
                marginVertical: 8,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: currentConfig.gradient[1],
              },
            }}
            bezier
            style={styles.chart}
            legend={true}
          />
        </View>
      </Animated.View>

      <View style={styles.filtersContainer}>
        <View style={styles.filterSection}>
          <SohoText style={styles.filterTitle}>Şube Seçimi</SohoText>
          {renderMultiSelectChips(
            branches,
            selectedBranches,
            handleBranchSelect,
          )}
        </View>

        {selectedBranches.length > 0 && (
          <View style={styles.filterSection}>
            <SohoText style={styles.filterTitle}>Sensör Seçimi</SohoText>
            {renderMultiSelectChips(
              getAvailableSensors(),
              selectedSensors,
              handleSensorSelect,
            )}
          </View>
        )}
      </View>

      <View style={styles.statsCard}>
        <SohoText style={styles.statsTitle}>İstatistikler</SohoText>
        <View style={styles.statsGrid}>
          {selectedSensors.length > 0 ? (
            selectedSensors.map((sensorId, index) => (
              <View key={sensorId} style={styles.sensorStatsContainer}>
                <SohoText style={styles.sensorTitle}>
                  Sensör {sensorId.split('_')[1]}
                </SohoText>
                <View style={styles.sensorStats}>
                  {[
                    {label: 'Ortalama', value: (45.2 + index).toFixed(1)},
                    {label: 'En Yüksek', value: (78.9 + index).toFixed(1)},
                    {label: 'En Düşük', value: (12.3 + index).toFixed(1)},
                    {label: 'Standart Sapma', value: (8.7 + index).toFixed(1)},
                  ].map((stat, statIndex) => (
                    <View key={statIndex} style={styles.statItem}>
                      <SohoText style={styles.statLabel}>{stat.label}</SohoText>
                      <SohoText style={styles.statValue}>
                        {stat.value}
                        <SohoText style={styles.statUnit}>
                          {' '}
                          {currentConfig.unit}
                        </SohoText>
                      </SohoText>
                    </View>
                  ))}
                </View>
              </View>
            ))
          ) : (
            <SohoText style={styles.noDataText}>
              Lütfen sensör seçimi yapın
            </SohoText>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextContainer: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  chartCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateFilterContainer: {
    marginBottom: 20,
  },
  timeRangeContainer: {
    marginBottom: 15,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    minWidth: 120,
    justifyContent: 'center',
  },
  dateButtonText: {
    marginLeft: 8,
    color: '#666',
  },
  dateSeperator: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 18,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chipsContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  chip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedChip: {
    backgroundColor: '#2193b0',
  },
  chipText: {
    color: '#666',
    fontSize: 14,
  },
  selectedChipText: {
    color: '#fff',
  },
  filtersContainer: {
    padding: 16,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  statsCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    width: '100%',
  },
  sensorStatsContainer: {
    marginBottom: 20,
    backgroundColor: '#f5f6fa',
    borderRadius: 15,
    padding: 15,
  },
  sensorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  sensorStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statUnit: {
    fontSize: 12,
    color: '#666',
  },
  noDataText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 10,
  },
  chartContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default AirQualityDetail;
