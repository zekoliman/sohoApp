import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as echarts from 'echarts/core';
import {LineChart} from 'echarts/charts';
import {
  GridComponent,
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components';
import {SVGRenderer, SvgChart} from '@wuba/react-native-echarts';

echarts.use([
  SVGRenderer,
  LineChart,
  GridComponent,
  ToolboxComponent,
  LegendComponent,
  TooltipComponent,
]);

const screenWidth = Dimensions.get('window').width;

const SubeBazliEnerjiKarsilastirmasiEkrani = () => {
  const skiaRef = useRef(null);
  const chartInstance = useRef(null);
  const [startDate, setStartDate] = useState(new Date(2024, 0, 1));
  const [endDate, setEndDate] = useState(new Date(2024, 11, 31));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const months = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];

  const branchData = {
    'Şube 1': [
      4500, 4200, 4800, 5100, 5400, 5700, 6000, 6200, 5900, 5600, 5300, 5000,
    ],
    'Şube 2': [
      3200, 3000, 2800, 2600, 2400, 2600, 2800, 3000, 2900, 3100, 3300, 3500,
    ],
    'Şube 3': [
      2800, 2700, 2900, 3100, 3300, 3500, 3700, 3800, 3600, 3400, 3200, 3000,
    ],
    'Şube 4': [
      1500, 1400, 1600, 1800, 2000, 2200, 2400, 2500, 2300, 2100, 1900, 1700,
    ],
    'Şube 5': [
      2000, 1900, 2100, 2300, 2500, 2700, 2900, 3000, 2800, 2600, 2400, 2200,
    ],
    'Toplam Maliyet': [
      28000, 26400, 28400, 29800, 31200, 33400, 35600, 37000, 35000, 33600,
      32200, 30800,
    ],
  };

  const filterDataByDateRange = () => {
    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();
    const filteredMonths = months.slice(startMonth, endMonth + 1);

    const filteredData = {};
    Object.entries(branchData).forEach(([branch, data]) => {
      filteredData[branch] = data.slice(startMonth, endMonth + 1);
    });

    return {filteredMonths, filteredData};
  };

  const getChartOption = (selectedMonth = -1) => {
    const {filteredMonths, filteredData} = filterDataByDateRange();
    const xAxisData =
      selectedMonth === -1 ? filteredMonths : [filteredMonths[selectedMonth]];

    const series = Object.entries(filteredData).map(([name, data]) => {
      const seriesData = selectedMonth === -1 ? data : [data[selectedMonth]];

      return {
        name,
        type: 'line',
        smooth: true,
        emphasis: {focus: 'series'},
        areaStyle: {
          opacity: 0.8,
          color:
            name === 'Toplam Maliyet'
              ? undefined
              : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: getRandomColor(0.7)},
                  {offset: 1, color: getRandomColor(0.1)},
                ]),
        },
        yAxisIndex: name === 'Toplam Maliyet' ? 1 : 0,
        data: seriesData,
      };
    });

    return {
      title: {
        text: 'Şube Bazlı Enerji Tüketimi Karşılaştırması',
        subtext:
          selectedMonth === -1
            ? 'Aylık kWh ve TL cinsinden'
            : `${xAxisData[0]} ayı kWh ve TL cinsinden`,
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: Object.keys(filteredData),
        top: 'bottom',
      },
      toolbox: {
        feature: {
          saveAsImage: {title: 'Grafiği Kaydet'},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: xAxisData,
          axisLabel: {
            color: '#333',
            fontSize: 12,
            clickable: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Tüketim (kWh)',
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#5470C6',
            },
          },
          axisLabel: {
            formatter: '{value} kWh',
          },
        },
        {
          type: 'value',
          name: 'Maliyet (TL)',
          position: 'right',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#91CC75',
            },
          },
          axisLabel: {
            formatter: '{value} TL',
          },
        },
      ],
      series,
    };
  };

  const getRandomColor = (opacity = 1) => {
    const letters = '0123456789ABCDEF';
    let color = 'rgba(';
    for (let i = 0; i < 3; i++) {
      color += Math.floor(Math.random() * 256) + ',';
    }
    color += opacity + ')';
    return color;
  };

  useEffect(() => {
    if (skiaRef.current) {
      chartInstance.current = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: screenWidth - 32,
        height: 400,
      });

      chartInstance.current.setOption(getChartOption());

      chartInstance.current.on('click', params => {
        if (params.componentType === 'xAxis') {
          const monthIndex = months.indexOf(params.value);
          if (monthIndex !== -1) {
            chartInstance.current.setOption(getChartOption(monthIndex));
          }
        }
      });
    }
    return () => chartInstance.current?.dispose();
  }, [startDate, endDate]);

  const onStartDateChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      chartInstance.current?.setOption(getChartOption());
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
      chartInstance.current?.setOption(getChartOption());
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.datePickerContainer}>
        <View style={styles.datePickerRow}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowStartPicker(true)}>
            <Text>{`Başlangıç Tarihi: ${startDate.toLocaleDateString()}`}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowEndPicker(true)}>
            <Text>{`Bitiş Tarihi: ${endDate.toLocaleDateString()}`}</Text>
          </TouchableOpacity>
        </View>

        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
          />
        )}

        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
            minimumDate={startDate}
          />
        )}
      </View>

      <SvgChart ref={skiaRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  datePickerContainer: {
    marginBottom: 16,
  },
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
});

export default SubeBazliEnerjiKarsilastirmasiEkrani;
