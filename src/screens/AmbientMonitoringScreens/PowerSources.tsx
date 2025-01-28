import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import SohoText from '@/components/SohoText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';

const PowerSources = () => {
  const {t} = useTranslation();
  const powerData = [
    {
      name: 'Jan',
      generator: 80.5,
      ups: 70.2,
    },
    {
      name: 'Feb',
      generator: 85.3,
      ups: 75.1,
    },
    {
      name: 'Mar',
      generator: 82.9,
      ups: 72.4,
    },
    {
      name: 'Apr',
      generator: 88.1,
      ups: 78.3,
    },
    {
      name: 'May',
      generator: 84.6,
      ups: 74.0,
    },
    {
      name: 'Jun',
      generator: 90.2,
      ups: 80.1,
    },
  ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <SohoText style={styles.cardTitle}>{t('powerDashboard')}</SohoText>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.metricContainer}>
            <View style={styles.metricItem}>
              <Icon name="power" size={28} color="#4CAF50" />
              <SohoText style={styles.metricLabel}>{t('generator')}</SohoText>
              <SohoText style={styles.metricValue}>
                {powerData[powerData.length - 1].generator.toFixed(2)} kW
              </SohoText>
            </View>
            <View style={styles.metricItem}>
              <Icon name="battery-full" size={28} color="#F44336" />
              <SohoText style={styles.metricLabel}>{t('ups')}</SohoText>
              <SohoText style={styles.metricValue}>
                {powerData[powerData.length - 1].ups.toFixed(2)} kW
              </SohoText>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PowerSources;

const styles = StyleSheet.create({
  container: {
    paddingVertical: scaledHeight(24),
    backgroundColor: '#f8fafc',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: scaledHeight(16),
    marginHorizontal: scaledWidth(20),
    paddingVertical: scaledHeight(14),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardHeader: {
    backgroundColor: '#F44336',
    paddingVertical: scaledHeight(16),
    paddingHorizontal: scaledWidth(24),
    borderTopLeftRadius: scaledHeight(16),
    borderTopRightRadius: scaledHeight(16),
  },
  cardTitle: {
    fontSize: scaledHeight(20),
    fontWeight: '700',
    color: '#ffffff',
  },
  cardContent: {
    paddingHorizontal: scaledWidth(24),
    paddingVertical: scaledHeight(16),
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: scaledHeight(24),
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: scaledHeight(15),
    color: '#37474f',
    marginTop: scaledHeight(8),
  },
  metricValue: {
    fontSize: scaledHeight(18),
    fontWeight: '600',
    color: '#37474f',
    marginTop: scaledHeight(4),
  },
});
