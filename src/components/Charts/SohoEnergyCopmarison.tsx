import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SohoText from '@/components/SohoText';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import Fonts from '@/theme/Fonts';

const EnergyComparisonSection = () => {
  const data = {
    labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [30, 55, 58, 70, 89, 63, 70],
        color: (opacity = 1) => `rgba(255, 159, 64, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SohoText style={styles.title}>Enerji Karşılaştırması</SohoText>
        <TouchableOpacity style={styles.infoButton}>
          <Icon name="info-outline" size={24} color="#4A4A4A" />
        </TouchableOpacity>
      </View>

      <LineChart
        data={data}
        width={scaledWidth(340)}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={styles.chart}
      />

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendColor,
              {backgroundColor: 'rgba(134, 65, 244, 1)'},
            ]}
          />
          <SohoText style={styles.legendText}>Sizin Tüketiminiz</SohoText>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendColor,
              {backgroundColor: 'rgba(255, 159, 64, 1)'},
            ]}
          />
          <SohoText style={styles.legendText}>Ortalama Tüketim</SohoText>
        </View>
      </View>

      <TouchableOpacity style={styles.detailButton}>
        <SohoText style={styles.detailButtonText}>Detaylı Analiz</SohoText>
        <Icon name="arrow-forward" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaledHeight(16),
    padding: scaledWidth(16),
    margin: scaledWidth(16),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaledHeight(16),
  },
  title: {
    fontSize: scaledHeight(20),
    fontFamily: Fonts.Bold,
    color: '#4A4A4A',
  },
  infoButton: {
    padding: scaledWidth(4),
  },
  chart: {
    marginVertical: scaledHeight(8),
    borderRadius: scaledHeight(16),
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scaledHeight(16),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: scaledWidth(16),
    height: scaledWidth(16),
    borderRadius: scaledWidth(8),
    marginRight: scaledWidth(8),
  },
  legendText: {
    fontSize: scaledHeight(14),
    fontFamily: Fonts.Regular,
    color: '#4A4A4A',
  },
  detailButton: {
    backgroundColor: '#267c8d',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scaledHeight(12),
    borderRadius: scaledHeight(8),
    marginTop: scaledHeight(16),
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontSize: scaledHeight(16),
    fontFamily: Fonts.Semibold,
    marginRight: scaledWidth(8),
  },
  chartContainer: {
    height: 300,
    flexDirection: 'row',
  },
});

export default EnergyComparisonSection;
