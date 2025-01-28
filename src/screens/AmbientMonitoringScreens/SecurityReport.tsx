import React from 'react';
import {View, ScrollView, StyleSheet, Dimensions, Animated} from 'react-native';
import {useTranslation} from 'react-i18next';
import SohoText from '@/components/SohoText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const StatusBadge = ({status}) => {
  const isAvailable = status === 'Var';
  return (
    <View
      style={[
        styles.badge,
        {backgroundColor: isAvailable ? '#4CAF50' : '#F44336'},
      ]}>
      <SohoText style={styles.badgeText}>
        {isAvailable ? 'Aktif' : 'Pasif'}
      </SohoText>
    </View>
  );
};

const SecurityReport = () => {
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

  const getRandomStatus = () => (Math.random() > 0.5 ? 'Var' : 'Yok');

  const securityData = {
    doorStatus: getRandomStatus(),
    motionStatus: getRandomStatus(),
    smokeLevel: getRandomStatus(),
    waterLeak: getRandomStatus(),
    powerOutage: getRandomStatus(),
    manholeCover: {
      status: getRandomStatus(),
      level: Math.floor(Math.random() * 101),
    },
  };

  const metrics = [
    {
      icon: 'door-front',
      label: 'Kapı Durumu',
      value: securityData.doorStatus,
      gradient: ['#FF9800', '#F57C00'],
    },
    {
      icon: 'animation',
      label: 'Hareket Algılama',
      value: securityData.motionStatus,
      gradient: ['#2196F3', '#1976D2'],
    },
    {
      icon: 'smoke-free',
      label: 'Duman Seviyesi',
      value: securityData.smokeLevel,
      gradient: ['#9C27B0', '#7B1FA2'],
    },
    {
      icon: 'water',
      label: 'Su Sızıntısı',
      value: securityData.waterLeak,
      gradient: ['#00BCD4', '#0097A7'],
    },
    {
      icon: 'power',
      label: 'Elektrik Kesintisi',
      value: securityData.powerOutage,
      gradient: ['#FFC107', '#FFA000'],
    },
    {
      icon: 'local-fire-department',
      label: 'Rögar Kapağı',
      value: `${securityData.manholeCover.level}% - ${securityData.manholeCover.status}`,
      gradient: ['#FF5722', '#E64A19'],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.header}>
        <SohoText style={styles.headerTitle}>{t('securityReport')}</SohoText>
        <SohoText style={styles.headerSubtitle}>
          Güncel Güvenlik Durumu
        </SohoText>
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
              <View style={styles.metricContent}>
                <View style={styles.metricIconContainer}>
                  <Icon name={metric.icon} size={24} color="#fff" />
                </View>
                <View style={styles.metricTextContainer}>
                  <SohoText style={styles.metricLabel}>{metric.label}</SohoText>
                  <StatusBadge status={metric.value} />
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        ))}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    marginTop: 20,
  },
  metricCard: {
    width: '50%',
    padding: 8,
    marginBottom: 16,
  },
  metricGradient: {
    borderRadius: 20,
    padding: 15,
    height: 100,
  },
  metricContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  metricTextContainer: {
    flex: 1,
  },
  metricLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SecurityReport;
