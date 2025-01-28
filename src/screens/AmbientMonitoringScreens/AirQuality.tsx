import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import SohoText from '@/components/SohoText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {PieChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';

const {width} = Dimensions.get('window');

const AirQualityReport = ({navigation}) => {
  const {t} = useTranslation();
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 8,
      tension: 45,
      useNativeDriver: true,
    }).start();
  }, []);

  const airQualityData = {
    voc: 45.2,
    pm: 23.7,
    co2: 865,
    ozone: 0.045,
    airFlowSpeed: 2.4,
    ammonia: 0.8,
  };

  const getAirQualityStatus = () => {
    const average =
      (airQualityData.voc +
        airQualityData.pm +
        airQualityData.co2 +
        airQualityData.ammonia) /
      4;
    if (average < 50)
      return {
        text: 'Mükemmel',
        color: '#4CAF50',
        gradient: ['#43cea2', '#185a9d'],
        description: 'Hava kalitesi ideal seviyede',
        icon: 'sentiment-very-satisfied',
      };
    if (average >= 50)
      return {
        text: 'Normal',
        color: '#FFC107',
        gradient: ['#ff9966', '#ff5e62'],
        description: 'Hava kalitesi kabul edilebilir seviyede',
        icon: 'sentiment-satisfied',
      };
    return {
      text: 'Dikkat',
      color: '#F44336',
      gradient: ['#cb2d3e', '#ef473a'],
      description: 'Hava kalitesi düşük, önlem alınmalı',
      icon: 'warning',
    };
  };

  const status = getAirQualityStatus();

  const metrics = [
    {
      icon: 'air',
      label: 'Hava Akışı',
      value: `${airQualityData.airFlowSpeed.toFixed(1)}`,
      unit: 'm/s',
      direction: 'Normal',
      gradient: ['#2193b0', '#6dd5ed'],
    },
    {
      icon: 'science',
      label: 'VOC',
      value: `${airQualityData.voc.toFixed(1)}`,
      unit: 'ppm',
      gradient: ['#ee0979', '#ff6a00'],
      direction: 'Yüksek',
    },
    {
      icon: 'cloud',
      label: 'PM',
      value: `${airQualityData.pm.toFixed(1)}`,
      unit: 'μg/m³',
      gradient: ['#834d9b', '#d04ed6'],
      direction: 'Düşük',
    },
    {
      icon: 'co2',
      label: 'CO₂',
      value: `${airQualityData.co2}`,
      unit: 'ppm',
      gradient: ['#11998e', '#38ef7d'],
      direction: 'Yüksek',
    },
    {
      icon: 'cloud-queue',
      label: 'Ozon',
      value: `${(airQualityData.ozone * 1000).toFixed(2)}`,
      unit: 'ppb',
      gradient: ['#F7971E', '#FFD200'],
      direction: 'Normal',
    },
    {
      icon: 'local-fire-department',
      label: 'Amonyak',
      value: `${airQualityData.ammonia.toFixed(2)}`,
      unit: 'ppm',
      gradient: ['#fc4a1a', '#f7b733'],
      direction: 'Normal',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={status.gradient} style={styles.header}>
        <Animated.View
          style={[
            styles.statusContainer,
            {
              transform: [
                {
                  scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}>
          <Icon name={status.icon} size={scaledHeight(50)} color="#fff" />
          <SohoText style={styles.statusTitle}>{status.text}</SohoText>
          <SohoText style={styles.statusDescription}>
            {status.description}
          </SohoText>
        </Animated.View>
      </LinearGradient>

      <View style={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <Animated.View
            key={index}
            style={[
              styles.metricCard,
              {
                transform: [
                  {
                    translateY: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50 * (index + 1), 0],
                    }),
                  },
                ],
                opacity: animatedValue,
              },
            ]}>
            <LinearGradient
              colors={metric.gradient}
              style={styles.metricGradient}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AirQualityDetailScreen', {
                    sensorType: 'airFlow',
                    navigation: navigation,
                  })
                }
                style={styles.metricContent}>
                <View style={styles.metricIconContainer}>
                  <Icon
                    name={metric.icon}
                    size={scaledHeight(24)}
                    color="#fff"
                  />
                </View>
                <View style={styles.metricTextContainer}>
                  <SohoText style={styles.metricLabel}>{metric.label}</SohoText>
                  <View style={styles.metricValueContainer}>
                    <SohoText style={styles.metricValue}>
                      {metric.value}
                    </SohoText>
                    <SohoText style={styles.metricUnit}>{metric.unit}</SohoText>
                  </View>
                </View>
              </TouchableOpacity>
              {metric.direction && (
                <View style={styles.directionBadge}>
                  <SohoText style={styles.directionText}>
                    {metric.direction}
                  </SohoText>
                </View>
              )}
            </LinearGradient>
          </Animated.View>
        ))}
      </View>

      <View style={styles.chartCard}>
        <SohoText style={styles.chartTitle}>Hava Kalitesi Analizi</SohoText>
        <View style={styles.chartDescription}>
          <Icon name="info-outline" size={scaledHeight(20)} color="#666" />
          <SohoText style={styles.chartDescriptionText}>
            Hava kalitesi parametrelerinin dağılımı
          </SohoText>
        </View>
        <PieChart
          data={metrics.map(m => ({
            name: m.label,
            population: parseFloat(m.value),
            color: m.gradient[0],
            legendFontColor: '#666',
            legendFontSize: scaledHeight(12),
          }))}
          width={width - scaledHeight(32)}
          height={scaledHeight(220)}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
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
    borderBottomLeftRadius: scaledHeight(30),
    borderBottomRightRadius: scaledHeight(30),
  },
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaledHeight(20),
  },
  statusTitle: {
    fontSize: scaledHeight(24),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: scaledHeight(10),
  },
  statusDescription: {
    fontSize: scaledHeight(16),
    color: '#fff',
    opacity: 0.8,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: scaledHeight(8),
    marginTop: scaledHeight(20),
  },
  metricCard: {
    width: '50%',
    padding: scaledHeight(8),
    marginBottom: scaledHeight(16),
  },
  metricGradient: {
    borderRadius: scaledHeight(20),
    padding: scaledHeight(15),
    height: scaledHeight(120),
  },
  metricContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaledHeight(10),
  },
  metricIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaledWidth(10),
  },
  metricTextContainer: {
    flex: 1,
  },
  metricLabel: {
    color: '#fff',
    fontSize: scaledHeight(16),
    fontWeight: '600',
  },
  metricValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  metricValue: {
    color: '#fff',
    fontSize: scaledHeight(18),
    fontWeight: 'bold',
  },
  metricUnit: {
    color: '#fff',
    fontSize: scaledHeight(14),
    marginLeft: scaledHeight(4),
  },
  directionBadge: {
    backgroundColor: '#fff',
    borderRadius: scaledHeight(10),
    padding: scaledHeight(4),
    paddingHorizontal: scaledHeight(8),
    marginTop: scaledHeight(2),
  },
  directionText: {
    fontSize: scaledHeight(14),
    color: '#333',
    textAlign: 'center',
    fontWeight: '700',
  },
  chartCard: {
    backgroundColor: '#fff',
    margin: scaledHeight(16),
    padding: scaledHeight(16),
    borderRadius: scaledHeight(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    fontSize: scaledHeight(18),
    fontWeight: '600',
    color: '#333',
    marginBottom: scaledHeight(10),
  },
  chartDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaledHeight(10),
  },
  chartDescriptionText: {
    fontSize: scaledHeight(14),
    color: '#666',
    marginLeft: scaledHeight(8),
  },
});

export default AirQualityReport;
