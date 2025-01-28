import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {VictoryPie} from 'victory-native';
import SohoText from '@/components/SohoText';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';

interface ChartData {
  x: string;
  y: number;
  color: string;
}

interface SohoPieChartProps {
  pieChartData: {
    title: string;
    watt: string;
    prefix: string;
    chartData: ChartData[];
  };
}

const SohoPieChart: React.FC<SohoPieChartProps> = ({pieChartData}) => {
  return (
    <FlatList
      data={pieChartData}
      scrollEnabled={false}
      style={{paddingHorizontal: scaledWidth(26)}}
      renderItem={({item, index}) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            height: scaledHeight(165),
            borderRadius: scaledHeight(25),
            paddingHorizontal: scaledWidth(26),
            marginTop: scaledHeight(20),
          }}>
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <VictoryPie
              width={scaledWidth(125)}
              height={scaledHeight(125)}
              colorScale={item.colorScale}
              data={item.chartData}
              innerRadius={scaledHeight(60)}
              radius={scaledHeight(50)}
              cornerRadius={20}
              style={{
                labels: {display: 'none'},
              }}
              animate={{easing: 'exp'}}
            />

            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <SohoText style={{fontSize: scaledHeight(20), fontWeight: '600'}}>
                {item.watt}
              </SohoText>
              <SohoText style={{fontSize: scaledHeight(24), fontWeight: '600'}}>
                {item.prefix}
              </SohoText>
            </View>
          </View>
          <View
            style={{
              paddingRight: scaledWidth(0),
              paddingTop: scaledHeight(28),
              paddingBottom: scaledHeight(34),
              paddingLeft: scaledWidth(20),
            }}>
            <View style={{paddingRight: scaledWidth(20)}}>
              <SohoText
                style={{
                  fontSize: scaledHeight(18),
                  fontWeight: '500',
                }}>
                {item.title}
              </SohoText>
            </View>
            {item.chartData.map((item, key) => (
              <View
                key={key}
                style={{
                  paddingTop: scaledHeight(12),
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}>
                <View
                  style={{
                    backgroundColor: item.color,
                    width: scaledWidth(16),
                    height: scaledHeight(10),
                    borderRadius: scaledHeight(6),
                    marginTop: scaledHeight(4),
                  }}
                />
                <SohoText color="#96A7AF">{item.x}</SohoText>
              </View>
            ))}
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    height: 200,
    margin: 20,
    borderRadius: scaledHeight(25),
  },
  chartContainer: {
    flex: 1,
  },
  textContainer: {
    paddingRight: scaledWidth(40),
    paddingTop: scaledHeight(28),
    paddingBottom: scaledHeight(34),
  },
  title: {
    fontSize: scaledHeight(18),
    fontWeight: '500',
  },
  legendItem: {
    paddingTop: scaledHeight(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendColor: {
    width: scaledWidth(16),
    height: scaledHeight(10),
    borderRadius: scaledHeight(6),
    marginTop: scaledHeight(4),
  },
});

export default SohoPieChart;
