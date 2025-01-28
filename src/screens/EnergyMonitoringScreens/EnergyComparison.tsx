import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import SohoText from '@/components/SohoText';

const {width} = Dimensions.get('window');

const EnergyComparison = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartType, setChartType] = useState('line');
  const [forecastPeriod, setForecastPeriod] = useState('daily');
  const [consumptionType, setConsumptionType] = useState('kwh');
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
    strokeWidth: 2,
  };

  const sectorData = {
    labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const GaugeComponent = ({value, maxValue, title, unit}) => (
    <View style={styles.gaugeContainer}>
      <SohoText style={styles.gaugeTitle}>{title}</SohoText>
      <View style={styles.gauge}>
        <View
          style={[
            styles.gaugeProgress,
            {transform: [{rotate: `${(value / maxValue) * 180}deg`}]},
          ]}
        />
        <SohoText style={styles.gaugeValue}>
          {value} {unit}
        </SohoText>
      </View>
    </View>
  );

  const PeriodSelector = () => (
    <View style={styles.periodContainer}>
      {['Günlük', 'Aylık', 'Yıllık'].map(period => (
        <TouchableOpacity
          key={period}
          style={[
            styles.periodButton,
            selectedPeriod === period.toLowerCase() && styles.selectedPeriod,
          ]}
          onPress={() => setSelectedPeriod(period.toLowerCase())}>
          <SohoText
            style={[
              styles.periodText,
              selectedPeriod === period.toLowerCase() &&
                styles.selectedPeriodText,
            ]}>
            {period}
          </SohoText>
        </TouchableOpacity>
      ))}
    </View>
  );

  const AnalysisCard = ({title, children}) => (
    <View style={styles.card}>
      <LinearGradient
        colors={['#ffffff', '#f8f9ff']}
        style={styles.cardGradient}>
        <SohoText style={styles.cardTitle}>{title}</SohoText>
        {children}
      </LinearGradient>
    </View>
  );
  const energyData = {
    labels: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
    datasets: [
      {
        data: [65, 75, 70, 80, 60, 85, 75],
        color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
      },
      {
        data: [70, 80, 75, 85, 65, 90, 80],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
      },
    ],
  };

  const ChartTypeSelector = ({onSelect, selected}) => (
    <View style={styles.chartTypeContainer}>
      <TouchableOpacity
        style={[
          styles.chartTypeButton,
          selected === 'line' && styles.selectedType,
        ]}
        onPress={() => onSelect('line')}>
        <Icon
          name="show-chart"
          size={24}
          color={selected === 'line' ? '#fff' : '#4A90E2'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.chartTypeButton,
          selected === 'bar' && styles.selectedType,
        ]}
        onPress={() => onSelect('bar')}>
        <Icon
          name="bar-chart"
          size={24}
          color={selected === 'bar' ? '#fff' : '#4A90E2'}
        />
      </TouchableOpacity>
    </View>
  );

  const renderChart = (data, type) => {
    const ChartComponent = type === 'line' ? LineChart : BarChart;
    return (
      <ChartComponent
        data={data}
        width={width - 40}
        height={220}
        chartConfig={{
          ...chartConfig,
          fillShadowGradient: type === 'bar' ? '#4A90E2' : 'transparent',
          fillShadowGradientOpacity: 1,
        }}
        bezier={type === 'line'}
        style={styles.chart}
        showBarTops={type === 'bar'}
        fromZero
      />
    );
  };

  const EnergyForecastSection = () => (
    <AnalysisCard title="Enerji Tüketim Tahminleme">
      <View style={styles.consumptionTypeContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            consumptionType === 'kwh' && styles.selectedTypeButton,
          ]}
          onPress={() => setConsumptionType('kwh')}>
          <SohoText
            style={[
              styles.typeText,
              consumptionType === 'kwh' && styles.selectedTypeText,
            ]}>
            kWh
          </SohoText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.typeButton,
            consumptionType === 'tl' && styles.selectedTypeButton,
          ]}
          onPress={() => setConsumptionType('tl')}>
          <SohoText
            style={[
              styles.typeText,
              consumptionType === 'tl' && styles.selectedTypeText,
            ]}>
            TL
          </SohoText>
        </TouchableOpacity>
      </View>

      <View style={styles.forecastPeriodContainer}>
        {['Günlük', 'Aylık', 'Yıllık'].map(period => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              forecastPeriod === period.toLowerCase() && styles.selectedPeriod,
            ]}
            onPress={() => setForecastPeriod(period.toLowerCase())}>
            <SohoText
              style={[
                styles.periodText,
                forecastPeriod === period.toLowerCase() &&
                  styles.selectedPeriodText,
              ]}>
              {period}
            </SohoText>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.gaugeRow}>
        <GaugeComponent
          value={75}
          maxValue={100}
          title="Mevcut Tüketim"
          unit={consumptionType === 'kwh' ? 'kWh' : 'TL'}
        />
        <GaugeComponent
          value={85}
          maxValue={100}
          title="Tahmini Tüketim"
          unit={consumptionType === 'kwh' ? 'kWh' : 'TL'}
        />
      </View>

      <ChartTypeSelector onSelect={setChartType} selected={chartType} />

      {renderChart(
        {
          labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
          datasets: [
            {
              data: [30, 45, 80, 90, 70, 40],
              color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
              label: 'Mevcut',
            },
            {
              data: [35, 50, 85, 95, 75, 45],
              color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
              label: 'Tahmin',
            },
          ],
        },
        chartType,
      )}

      <View style={styles.forecastDetails}>
        <View style={styles.detailRow}>
          <SohoText style={styles.detailLabel}>Ortalama Sapma:</SohoText>
          <SohoText style={styles.detailValue}>±5%</SohoText>
        </View>
        <View style={styles.detailRow}>
          <SohoText style={styles.detailLabel}>Tahmin Doğruluğu:</SohoText>
          <SohoText style={styles.detailValue}>92%</SohoText>
        </View>
        <View style={styles.detailRow}>
          <SohoText style={styles.detailLabel}>Trend:</SohoText>
          <SohoText style={[styles.detailValue, {color: '#4CAF50'}]}>
            Artış
          </SohoText>
        </View>
      </View>
    </AnalysisCard>
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.dateSelector}
          onPress={() => setDatePickerVisible(true)}>
          <Icon name="calendar-today" size={24} color="#4A90E2" />
          <SohoText style={styles.dateText}>
            {selectedDate.toLocaleDateString()}
          </SohoText>
        </TouchableOpacity>

        <PeriodSelector />

        <AnalysisCard title="Sektörel Analiz">
          <LineChart
            data={sectorData}
            width={width - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </AnalysisCard>

        <AnalysisCard title="Enerji Tüketimi">
          <LineChart
            data={{
              labels: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={width - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </AnalysisCard>

        <AnalysisCard title="Tüketim Tahminleme">
          <View style={styles.gaugeRow}>
            <GaugeComponent
              value={75}
              maxValue={100}
              title="Mevcut Tüketim"
              unit="kWh"
            />
            <GaugeComponent
              value={85}
              maxValue={100}
              title="Tahmini Tüketim"
              unit="kWh"
            />
          </View>
        </AnalysisCard>

        <AnalysisCard title="Envanter Tahminleme">
          <LineChart
            data={{
              labels: ['1H', '2H', '3H', '4H', '5H', '6H'],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                },
              ],
            }}
            width={width - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </AnalysisCard>

        <AnalysisCard title="Tasarruf Miktarı">
          <View style={styles.savingsContainer}>
            <View style={styles.savingsRow}>
              <SohoText style={styles.savingsLabel}>Anlık:</SohoText>
              <SohoText style={styles.savingsValue}>250 kWh</SohoText>
            </View>
            <View style={styles.savingsRow}>
              <SohoText style={styles.savingsLabel}>Geçmiş Dönem:</SohoText>
              <SohoText style={styles.savingsValue}>220 kWh</SohoText>
            </View>
          </View>
        </AnalysisCard>

        <AnalysisCard title="Enerji Isı Haritası">
          <View style={styles.heatmapContainer}>
            {Array(7)
              .fill(0)
              .map((_, rowIndex) => (
                <View key={rowIndex} style={styles.heatmapRow}>
                  {Array(24)
                    .fill(0)
                    .map((_, colIndex) => (
                      <View
                        key={colIndex}
                        style={[
                          styles.heatmapCell,
                          {
                            backgroundColor: `rgba(74, 144, 226, ${Math.random().toFixed(
                              2,
                            )})`,
                          },
                        ]}
                      />
                    ))}
                </View>
              ))}
          </View>
        </AnalysisCard>
        <EnergyForecastSection />
      </ScrollView>

      {datePickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setDatePickerVisible(false);
            if (selectedDate) {
              setSelectedDate(selectedDate);
            }
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  dateText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F5F6FA',
  },
  selectedPeriod: {
    backgroundColor: '#4A90E2',
  },
  periodText: {
    color: '#666',
  },
  selectedPeriodText: {
    color: '#FFF',
  },
  card: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#FFF',
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 12,
  },
  gaugeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  gaugeContainer: {
    alignItems: 'center',
  },
  gauge: {
    width: 120,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#F5F6FA',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeProgress: {
    position: 'absolute',
    width: 60,
    height: 120,
    backgroundColor: '#4A90E2',
    transformOrigin: '0 0',
  },
  gaugeTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  gaugeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  savingsContainer: {
    padding: 16,
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  savingsLabel: {
    color: '#666',
  },
  savingsValue: {
    color: '#333',
    fontWeight: 'bold',
  },
  heatmapContainer: {
    padding: 8,
  },
  heatmapRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  heatmapCell: {
    width: (width - 80) / 24,
    height: 20,
    marginHorizontal: 1,
  },
  chartTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 16,
  },
  chartTypeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F5F6FA',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: '#4A90E2',
  },
  consumptionTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 16,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F6FA',
  },
  selectedTypeButton: {
    backgroundColor: '#4A90E2',
  },
  typeText: {
    color: '#666',
  },
  selectedTypeText: {
    color: '#FFF',
  },
  forecastPeriodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  forecastDetails: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F5F6FA',
    borderRadius: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#666',
  },
  detailValue: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default EnergyComparison;
