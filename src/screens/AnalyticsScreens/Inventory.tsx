import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import SohoText from '@/components/SohoText';
import DegreeMeterBackgroundSvg from '@/assets/icons/DegreeMeterBackgroundSvg';
import BatteryIconSvg from '@/assets/icons/BatterySvg';
import DegreeMeterIcon from '@/assets/icons/DegreeMeter.svg';
import BulbIconSvg from '@/assets/icons/BulbIcon.svg';
import WaterIconSvg from '@/assets/icons/WaterIconSvg.svg';
import AirCondSvg from '@/assets/icons/AirCondIcon.svg';
import SohoCustomSwitch from '@/components/SohoCustomSwitch';
import Slider from '@react-native-community/slider';

interface PrintedValue {
  degreeValue: number;
}

const Inventory = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [airConditionValues, setAirConditionValues] = useState({
    minValue: 14,
    maxValue: 30,
    value: 22,
  });
  const [printedValues, setPrintedValues] = useState<PrintedValue[]>([]);

  const printValues = () => {
    const {minValue, maxValue} = airConditionValues;
    const values = [];

    for (let i = minValue; i <= maxValue; i += 4) {
      values.push(i);
    }
    const newPrintedValues = values.map(value => ({degreeValue: value}));

    setPrintedValues(newPrintedValues);
  };

  useEffect(() => {
    printValues();
  }, [airConditionValues]);

  const temperatureCard = () => {
    return (
      <View style={styles.shadow}>
        <View style={styles.infoRow}>
          <View style={styles.leftInfo}>
            <DegreeMeterBackgroundSvg />
            <SohoText style={styles.infoText}>
              Temperature and humidity
            </SohoText>
          </View>
          <View style={styles.rightInfo}>
            <BatteryIconSvg />
          </View>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.temperatureInfo}>
            <DegreeMeterIcon />
            <SohoText style={styles.temperatureText}>29 °</SohoText>
          </View>
          <View style={styles.humidityInfo}>
            <WaterIconSvg />
            <SohoText style={styles.humidityText}>72%</SohoText>
          </View>
          <View style={styles.areaInfo}>
            <View style={styles.areaBox}>
              <SohoText style={styles.areaText}>#Area1</SohoText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const entranceCard = () => {
    return (
      <View style={styles.shadow}>
        <View style={styles.infoRow}>
          <View style={styles.leftInfo}>
            <BulbIconSvg />
            <SohoText style={styles.infoText}>Main Entrance</SohoText>
          </View>
          <View style={styles.rightInfo}>
            <SohoCustomSwitch value={isEnabled} onChange={toggleSwitch} />
          </View>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.areaInfo}>
            <View style={styles.areaBox}>
              <SohoText style={styles.areaText}>#Area1</SohoText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SohoText style={styles.headerText}>Inventory</SohoText>
        {temperatureCard()}
        {entranceCard()}
        <View style={styles.shadow}>
          <View style={styles.infoRow}>
            <View style={styles.leftInfo}>
              <BulbIconSvg />
              <SohoText style={styles.infoText}>Air Conditioning</SohoText>
            </View>
            <View style={styles.rightInfo}>
              <SohoCustomSwitch value={isEnabled} onChange={toggleSwitch} />
            </View>
          </View>
          <View style={{paddingHorizontal: scaledWidth(24)}}>
            <View style={styles.degreeContainer}>
              {printedValues?.map((item, index) => (
                <View
                  key={index}
                  style={{
                    alignItems: 'center',
                  }}>
                  <SohoText
                    color="#9A9B9E"
                    style={{fontWeight: '700', fontSize: scaledHeight(15)}}>
                    {item.degreeValue}°
                  </SohoText>
                  <View style={styles.degreeSeperator} />
                </View>
              ))}
            </View>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={airConditionValues.minValue}
              maximumValue={airConditionValues.maxValue}
              value={airConditionValues.value}
              minimumTrackTintColor="#75A7F7"
              maximumTrackTintColor="#75A7F7"
              thumbTintColor="#75A7F7"
            />
          </View>
          <View style={styles.detailsRow}>
            <View style={styles.temperatureInfo}>
              <DegreeMeterIcon />
              <SohoText style={styles.temperatureText}>29 °</SohoText>
            </View>
            <View style={styles.humidityInfo}>
              <DegreeMeterIcon />
              <SohoText style={styles.humidityText}>72%</SohoText>
            </View>
            <View style={styles.areaInfo}>
              <View style={styles.areaBox}>
                <SohoText style={styles.areaText}>#Area1</SohoText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: scaledWidth(26),
    paddingTop: scaledHeight(24),
  },
  headerText: {
    fontWeight: '700',
    fontSize: scaledHeight(36),
  },
  shadow: {
    marginTop: scaledHeight(24),
    backgroundColor: 'white',
    borderRadius: scaledHeight(24),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    paddingHorizontal: scaledWidth(24),
    paddingVertical: scaledHeight(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftInfo: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  infoText: {
    paddingRight: scaledWidth(63),
    paddingLeft: scaledWidth(12),
  },
  detailsRow: {
    paddingHorizontal: scaledWidth(30),
    paddingBottom: scaledWidth(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperatureInfo: {
    flexDirection: 'row',
  },
  humidityInfo: {
    flexDirection: 'row',
  },
  temperatureText: {
    color: '#75A7F7',
    fontSize: scaledHeight(16),
    fontWeight: '700',
    paddingHorizontal: scaledHeight(10),
  },
  humidityText: {
    fontWeight: '700',
    color: '#75A7F7',
    fontSize: scaledHeight(16),
    paddingHorizontal: scaledHeight(10),
  },
  areaInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  areaBox: {
    backgroundColor: '#F7F7F9',
    borderRadius: scaledHeight(24),
  },
  areaText: {
    paddingHorizontal: scaledWidth(12),
    paddingVertical: scaledHeight(6),
  },
  degreeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  degreeSeperator: {
    width: scaledWidth(2),
    height: scaledHeight(8),
    backgroundColor: '#9A9B9E',
    marginRight: scaledWidth(4),
  },
});

export default Inventory;
