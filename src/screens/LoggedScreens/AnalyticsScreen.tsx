import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import * as echarts from 'echarts/core';
import {SVGRenderer, SkiaChart} from '@wuba/react-native-echarts';
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

echarts.use([
  SVGRenderer,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
]);

const {width} = Dimensions.get('window');
const E_HEIGHT = 300;
const E_WIDTH = width - 32;

const Tab = createMaterialTopTabNavigator();

const AnimatedCard = ({children, colors}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{opacity: fadeAnim}}>
      <LinearGradient colors={colors} style={styles.card}>
        {children}
      </LinearGradient>
    </Animated.View>
  );
};

const CustomProgressBar = ({percentage, color}) => (
  <View style={styles.progressBarContainer}>
    <View
      style={[
        styles.progressBar,
        {width: `${percentage}%`, backgroundColor: color},
      ]}
    />
  </View>
);

const renderChart = (data, title, color, type = 'line') => {
  const chartRef = useRef(null);

  React.useEffect(() => {
    const option = {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 16,
        },
      },
      backgroundColor: 'transparent',
      grid: {
        top: 60,
        bottom: 60,
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.date),
        axisLabel: {
          color: '#FFFFFF',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#FFFFFF',
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          data: data.map(item => Object.values(item)[1]),
          type: type,
          smooth: true,
          symbolSize: 8,
          itemStyle: {
            color: color,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: color},
              {offset: 1, color: 'rgba(255, 255, 255, 0.1)'},
            ]),
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        textStyle: {
          color: '#333',
        },
      },
    };

    let chart;
    if (chartRef.current) {
      chart = echarts.init(chartRef.current, 'dark', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [data, title, color, type]);

  return (
    <View style={styles.chartContainer}>
      <SkiaChart ref={chartRef} />
    </View>
  );
};

const TarifeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <AnimatedCard colors={['#4c669f', '#3b5998', '#192f6a']}>
        <Text style={styles.cardTitle}>Tarife Bilgileri</Text>
        <View style={styles.tarifeBadge}>
          <Text style={styles.badgeText}>Aktif</Text>
        </View>

        <View style={styles.tariffDetailsContainer}>
          <View style={styles.tariffDetail}>
            <MaterialIcons name="assignment" size={24} color="#FFFFFF" />
            <Text style={styles.detailLabel}>Mevcut Tarife</Text>
            <Text style={styles.detailValue}>Standart Konut</Text>
          </View>

          <View style={styles.tariffDetail}>
            <MaterialIcons name="attach-money" size={24} color="#FFFFFF" />
            <Text style={styles.detailLabel}>Birim Fiyat</Text>
            <Text style={styles.detailValue}>0.75 TL/kWh</Text>
          </View>
        </View>

        <View style={styles.usageStats}>
          <Text style={styles.usageTitle}>Kullanım İstatistikleri</Text>
          <View style={styles.usageRow}>
            <Text style={styles.usageLabel}>Gündüz (06:00-22:00)</Text>
            <CustomProgressBar percentage={75} color="#4CAF50" />
            <Text style={styles.usageValue}>75%</Text>
          </View>
          <View style={styles.usageRow}>
            <Text style={styles.usageLabel}>Gece (22:00-06:00)</Text>
            <CustomProgressBar percentage={25} color="#2196F3" />
            <Text style={styles.usageValue}>25%</Text>
          </View>
        </View>

        <View style={styles.monthlyComparison}>
          <Text style={styles.comparisonTitle}>Aylık Karşılaştırma</Text>
          {renderChart(
            [
              {date: 'Ocak', usage: 450},
              {date: 'Şubat', usage: 420},
              {date: 'Mart', usage: 480},
              {date: 'Nisan', usage: 400},
              {date: 'Mayıs', usage: 350},
            ],
            'Aylık Tüketim (kWh)',
            '#64B5F6',
          )}
        </View>
      </AnimatedCard>
    </ScrollView>
  );
};

const DurumScreen = () => {
  const [powerUsage, setPowerUsage] = useState(2.5);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPowerUsage(prev =>
        (parseFloat(prev) + (Math.random() - 0.5) * 0.2).toFixed(2),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
      }>
      <AnimatedCard colors={['#43a047', '#388e3c', '#2e7d32']}>
        <Text style={styles.cardTitle}>Anlık Güç Tüketimi</Text>

        <View style={styles.powerMeterContainer}>
          <AnimatedCircularProgress
            size={200}
            width={15}
            fill={(powerUsage / 5) * 100}
            tintColor="#4CAF50"
            backgroundColor="#1b5e20"
            rotation={0}>
            {fill => (
              <View style={styles.powerMeterCenter}>
                <Text style={styles.powerValue}>{powerUsage} kW</Text>
                <Text style={styles.powerLabel}>Anlık Tüketim</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <MaterialIcons name="trending-up" size={24} color="#FFFFFF" />
            <Text style={styles.statLabel}>Pik Tüketim</Text>
            <Text style={styles.statValue}>4.2 kW</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons name="trending-down" size={24} color="#FFFFFF" />
            <Text style={styles.statLabel}>Min Tüketim</Text>
            <Text style={styles.statValue}>0.8 kW</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons name="speed" size={24} color="#FFFFFF" />
            <Text style={styles.statLabel}>Ortalama</Text>
            <Text style={styles.statValue}>2.1 kW</Text>
          </View>
        </View>
      </AnimatedCard>

      <AnimatedCard colors={['#2196F3', '#1976D2', '#0D47A1']}>
        <Text style={styles.cardTitle}>Şebeke Durumu</Text>
        <View style={styles.gridStatusContainer}>
          <View style={styles.statusIndicator}>
            <View style={[styles.indicator, {backgroundColor: '#4CAF50'}]} />
            <Text style={styles.statusText}>Şebeke Bağlantısı Aktif</Text>
          </View>
          <View style={styles.voltageContainer}>
            <Text style={styles.voltageLabel}>Şebeke Gerilimi</Text>
            <Text style={styles.voltageValue}>230V</Text>
            <Text style={styles.voltageQuality}>Kalite: Mükemmel</Text>
          </View>
        </View>
      </AnimatedCard>

      <AnimatedCard colors={['#FF7043', '#F4511E', '#D84315']}>
        <Text style={styles.cardTitle}>Yük Dağılımı</Text>
        <View style={styles.loadDistribution}>
          <View style={styles.loadItem}>
            <Text style={styles.loadLabel}>Aydınlatma</Text>
            <CustomProgressBar percentage={30} color="#FFB74D" />
            <Text style={styles.loadValue}>30%</Text>
          </View>
          <View style={styles.loadItem}>
            <Text style={styles.loadLabel}>Klimalar</Text>
            <CustomProgressBar percentage={45} color="#FFB74D" />
            <Text style={styles.loadValue}>45%</Text>
          </View>
          <View style={styles.loadItem}>
            <Text style={styles.loadLabel}>Diğer Cihazlar</Text>
            <CustomProgressBar percentage={25} color="#FFB74D" />
            <Text style={styles.loadValue}>25%</Text>
          </View>
        </View>
      </AnimatedCard>
    </ScrollView>
  );
};

const EnerjiKarbonScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const emissionsData = [
    {date: '2024-01', emissions: 100, reduction: 20},
    {date: '2024-02', emissions: 90, reduction: 25},
    {date: '2024-03', emissions: 120, reduction: 15},
    {date: '2024-04', emissions: 110, reduction: 18},
    {date: '2024-05', emissions: 85, reduction: 30},
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
      }>
      <AnimatedCard colors={['#00897b', '#00796b', '#00695c']}>
        <Text style={styles.cardTitle}>Karbon Ayak İzi Analizi</Text>

        {renderChart(
          emissionsData,
          'Karbon Emisyonu Trendi (kg CO2)',
          '#4DB6AC',
        )}

        <View style={styles.carbonStatsContainer}>
          <View style={styles.carbonStat}>
            <MaterialIcons name="trending-down" size={32} color="#4CAF50" />
            <View>
              <Text style={styles.carbonStatLabel}>Toplam Azaltım</Text>
              <Text style={styles.carbonStatValue}>108 kg CO2</Text>
            </View>
          </View>
          <View style={styles.carbonStat}>
            <MaterialIcons name="eco" size={32} color="#4CAF50" />
            <View>
              <Text style={styles.carbonStatLabel}>Ağaç Eşdeğeri</Text>
              <Text style={styles.carbonStatValue}>5 Ağaç</Text>
            </View>
          </View>
        </View>

        <View style={styles.carbonCalculator}>
          <Text style={styles.calculatorTitle}>Karbon Tasarruf Hedefleri</Text>
          <View style={styles.targetContainer}>
            <Text style={styles.targetLabel}>Aylık Hedef</Text>
            <CustomProgressBar percentage={75} color="#4DB6AC" />
            <Text style={styles.targetValue}>75% Tamamlandı</Text>
          </View>

          <View style={styles.yearlyTarget}>
            <Text style={styles.targetLabel}>Yıllık Hedef</Text>
            <CustomProgressBar percentage={45} color="#4DB6AC" />
            <Text style={styles.targetValue}>45% Tamamlandı</Text>
          </View>
        </View>
      </AnimatedCard>

      <AnimatedCard colors={['#26A69A', '#00897B', '#00796B']}>
        <Text style={styles.cardTitle}>Yeşil Enerji Katkısı</Text>
        <View style={styles.greenEnergyContainer}>
          <AnimatedCircularProgress
            size={150}
            width={15}
            fill={65}
            tintColor="#4DB6AC"
            backgroundColor="#004D40">
            {fill => (
              <Text style={styles.greenEnergyText}>%{fill.toFixed(0)}</Text>
            )}
          </AnimatedCircularProgress>
          <Text style={styles.greenEnergyLabel}>
            Yenilenebilir Enerji Oranı
          </Text>
        </View>
      </AnimatedCard>
    </ScrollView>
  );
};

const SensorScreen = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 22,
    humidity: 45,
    voltage: 220,
    current: 10,
    power_factor: 0.95,
    frequency: 50,
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        temperature: (
          parseFloat(prev.temperature) +
          (Math.random() - 0.5)
        ).toFixed(1),
        humidity: (parseFloat(prev.humidity) + (Math.random() - 0.5)).toFixed(
          1,
        ),
        voltage: (220 + (Math.random() - 0.5) * 2).toFixed(1),
        current: (parseFloat(prev.current) + (Math.random() - 0.5)).toFixed(1),
        power_factor: (0.95 + (Math.random() - 0.5) * 0.01).toFixed(2),
        frequency: (50 + (Math.random() - 0.5) * 0.1).toFixed(1),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const tempData = Array.from({length: 20}, (_, i) => ({
    date: i.toString(),
    value: parseFloat(sensorData.temperature) + (Math.random() - 0.5) * 2,
  }));

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
      }>
      <AnimatedCard colors={['#7b1fa2', '#6a1b9a', '#4a148c']}>
        <Text style={styles.cardTitle}>Gerçek Zamanlı Sensör Verileri</Text>

        {renderChart(tempData, 'Sıcaklık Trendi (°C)', '#CE93D8', 'line')}

        <View style={styles.sensorGrid}>
          <View style={styles.sensorItem}>
            <MaterialIcons name="thermostat" size={32} color="#FFFFFF" />
            <Text style={styles.sensorLabel}>Sıcaklık</Text>
            <Text style={styles.sensorValue}>{sensorData.temperature}°C</Text>
          </View>
          <View style={styles.sensorItem}>
            <MaterialIcons name="opacity" size={32} color="#FFFFFF" />
            <Text style={styles.sensorLabel}>Nem</Text>
            <Text style={styles.sensorValue}>%{sensorData.humidity}</Text>
          </View>
          <View style={styles.sensorItem}>
            <MaterialIcons name="bolt" size={32} color="#FFFFFF" />
            <Text style={styles.sensorLabel}>Voltaj</Text>
            <Text style={styles.sensorValue}>{sensorData.voltage}V</Text>
          </View>
          <View style={styles.sensorItem}>
            <MaterialIcons name="speed" size={32} color="#FFFFFF" />
            <Text style={styles.sensorLabel}>Akım</Text>
            <Text style={styles.sensorValue}>{sensorData.current}A</Text>
          </View>
        </View>

        <View style={styles.advancedSensorData}>
          <View style={styles.advancedDataRow}>
            <Text style={styles.advancedDataLabel}>Güç Faktörü</Text>
            <Text style={styles.advancedDataValue}>
              {sensorData.power_factor}
            </Text>
          </View>
          <View style={styles.advancedDataRow}>
            <Text style={styles.advancedDataLabel}>Frekans</Text>
            <Text style={styles.advancedDataValue}>
              {sensorData.frequency} Hz
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.calibrationButton}>
          <MaterialIcons name="speed" size={24} color="#FFFFFF" />
          <Text style={styles.calibrationText}>Sensör Kalibrasyonu</Text>
        </TouchableOpacity>
      </AnimatedCard>

      <AnimatedCard colors={['#6a1b9a', '#4a148c', '#38006b']}>
        <Text style={styles.cardTitle}>Sensör Durumu</Text>
        <View style={styles.sensorStatus}>
          {['Sıcaklık', 'Nem', 'Voltaj', 'Akım'].map(sensor => (
            <View key={sensor} style={styles.statusRow}>
              <View
                style={[styles.statusIndicator, {backgroundColor: '#4CAF50'}]}
              />
              <Text style={styles.statusLabel}>{sensor} Sensörü</Text>
              <Text style={styles.statusValue}>Çalışıyor</Text>
            </View>
          ))}
        </View>
      </AnimatedCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  card: {
    borderRadius: 20,
    padding: 20,
    margin: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  tarifeBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tariffDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tariffDetail: {
    alignItems: 'center',
  },
  detailLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 8,
    opacity: 0.8,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  usageStats: {
    marginTop: 20,
  },
  usageTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  usageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  usageLabel: {
    color: '#FFFFFF',
    width: 150,
    fontSize: 14,
  },
  usageValue: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontSize: 14,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  powerMeterContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  powerMeterCenter: {
    alignItems: 'center',
  },
  powerValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  powerLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  sensorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sensorItem: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  sensorLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
    opacity: 0.8,
  },
  sensorValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  advancedSensorData: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  advancedDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  advancedDataLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  advancedDataValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calibrationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  calibrationText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  sensorStatus: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statusLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
  statusValue: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
  },
  powerMeterContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  powerMeterCenter: {
    alignItems: 'center',
  },
  powerValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  powerLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 5,
    opacity: 0.8,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gridStatusContainer: {
    marginTop: 20,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  voltageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  voltageLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  voltageValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  carbonStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  carbonStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carbonStatLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 10,
    opacity: 0.8,
  },
  carbonStatValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  carbonCalculator: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
  calculatorTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  targetContainer: {
    marginTop: 10,
  },
  targetLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 5,
  },
  targetValue: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'right',
  },
});

export default () => (
  <NavigationContainer independent>
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: '#EFEF'},
        tabBarLabelStyle: {fontSize: 12},
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#888888',
        tabBarIndicatorStyle: {backgroundColor: '#4c669f'},
      }}>
      <Tab.Screen name="Tarife" component={TarifeScreen} />
      <Tab.Screen name="Durum" component={DurumScreen} />
      <Tab.Screen name="Enerji Karbon" component={EnerjiKarbonScreen} />
      <Tab.Screen name="Sensör" component={SensorScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
