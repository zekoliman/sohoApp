import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {VictoryPie, VictoryLabel} from 'victory-native';
import Svg from 'react-native-svg';
import SohoText from '@/components/SohoText';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SolarEnergy = ({navigation, params}) => {
  const pieChartData = [
    {
      title: 'Daily Production',
      watt: '10 kWh',
      chartData: [
        {x: 'Solar Inverter', y: 10, color: '#267c8d'},
        {x: 'Grid', y: 5, color: '#FF575F'},
      ],
    },
    {
      title: 'Weekly Production',
      watt: '70 kWh',
      chartData: [
        {x: 'Solar Inverter', y: 70, color: '#267c8d'},
        {x: 'Grid', y: 30, color: '#FF575F'},
      ],
    },
    {
      title: 'Monthly Production',
      watt: '300 kWh',
      chartData: [
        {x: 'Solar Inverter', y: 300, color: '#267c8d'},
        {x: 'Grid', y: 100, color: '#FF575F'},
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {pieChartData.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <SohoText style={styles.cardTitle}>{item.title}</SohoText>
              <View style={styles.wattContainer}>
                <Icon name="bolt" size={20} color="#267c8d" />
                <SohoText style={styles.cardWatt}>{item.watt}</SohoText>
              </View>
            </View>
            <View style={styles.chartContainer}>
              <Svg viewBox="0 0 200 200" width={200} height={200}>
                <VictoryPie
                  standalone={false}
                  width={200}
                  height={200}
                  data={item.chartData}
                  colorScale={item.chartData.map(d => d.color)}
                  innerRadius={70}
                  labelRadius={({innerRadius}) => innerRadius + 30}
                  style={{
                    labels: {fill: 'white', fontSize: 12, fontWeight: 'bold'},
                  }}
                  animate={{duration: 1000}}
                />
                <VictoryLabel
                  textAnchor="middle"
                  style={{fontSize: 16, fontWeight: 'bold'}}
                  x={100}
                  y={100}
                  text={item.watt}
                />
              </Svg>
            </View>
            <View style={styles.legend}>
              {item.chartData.map((dataItem, dataIndex) => (
                <View key={dataIndex} style={styles.legendItem}>
                  <Icon
                    name={
                      dataItem.x === 'Solar Inverter' ? 'wb-sunny' : 'power'
                    }
                    size={16}
                    color={dataItem.color}
                  />
                  <SohoText style={styles.legendText}>{dataItem.x}</SohoText>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  scrollView: {
    padding: scaledWidth(20),
    paddingBottom: scaledHeight(120),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaledHeight(20),
  },

  settingsButton: {
    padding: scaledWidth(10),
  },
  card: {
    backgroundColor: 'white',
    borderRadius: scaledHeight(20),
    padding: scaledWidth(20),
    marginBottom: scaledHeight(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaledHeight(10),
  },
  cardTitle: {
    fontSize: scaledHeight(18),
    fontWeight: '600',
    color: '#333',
  },
  wattContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardWatt: {
    fontSize: scaledHeight(16),
    fontWeight: '500',
    color: '#267c8d',
    marginLeft: scaledWidth(5),
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: scaledHeight(10),
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scaledHeight(10),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scaledWidth(10),
  },
  legendText: {
    fontSize: scaledHeight(12),
    color: '#666',
    marginLeft: scaledWidth(5),
  },
  headerContainer: {
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scaledHeight(60),
    paddingBottom: scaledHeight(16),
    paddingHorizontal: scaledWidth(16),
    backgroundColor: '#267c8d',
  },
  backButton: {
    marginRight: scaledWidth(16),
  },
  headerTitle: {
    fontSize: scaledWidth(20),
    color: '#FFFFFF',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  listButton: {
    marginLeft: scaledWidth(16),
  },
});

export default SolarEnergy;
