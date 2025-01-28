import {View} from 'react-native';
import React from 'react';
import SohoText from '@/components/SohoText';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import SolarSvg from '@/assets/icons/SolarSvg';
import SohoPieChart from '@/components/Charts/SohoPieChart';

const pieChartData = [
  {
    title: 'Haftalık Elektrik Tüketimi',
    watt: '5',
    prefix: 'kWh',
    colorScale: ['#FF575F', '#2A3C44'],
    chartData: [
      {
        x: 'Charger',
        y: 10,
        color: '#FF575F',
      },
    ],
  },
  {
    title: 'Haftalık Şarj Süresi',
    watt: '30 ',
    prefix: 'Mins',
    colorScale: ['#2A3C44'],

    chartData: [
      {
        x: 'Solar Inverter',
        y: 10,
        color: '#2A3C44',
      },
    ],
  },
  {
    title: 'Haftalık Harcama',
    watt: '15 ',
    prefix: 'TL',
    colorScale: ['#267c8d'],
    chartData: [
      {
        x: 'Solar Inverter',
        y: 10,
        color: '#267c8d',
      },
    ],
  },
];
const EvCharger = () => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          paddingHorizontal: scaledWidth(26),
          paddingTop: scaledHeight(26),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SohoText
            color="black"
            style={{
              flex: 1,
              flexWrap: 'wrap',
              fontSize: scaledHeight(36),
              fontWeight: '600',
            }}>
            Ev Charger
          </SohoText>
          <SolarSvg />
        </View>
      </View>
      <View>
        <SohoPieChart pieChartData={pieChartData} />
      </View>
    </View>
  );
};

export default EvCharger;
