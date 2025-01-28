import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type TProps = {
  value: boolean;
  onChange: () => void;
  onColor?: string;
  offColor?: string;
  label?: string;
  labelStyle?: any;
};

const SohoCustomSwitch: React.FC<TProps> = ({
  value,
  onChange,
  onColor = '#464646',
  offColor = '#F7F7F9',
  label = '',
  labelStyle,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    value && setIsEnabled(value);
  }, [value]);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    onChange();
  };

  const animatedValue = new Animated.Value(0);

  const moveToggle = animatedValue.interpolate({
    inputRange: [-0.2, 0.9],
    outputRange: [0, 20],
  });

  const color = value ? onColor : offColor;

  animatedValue.setValue(value ? 0 : 1);

  Animated.timing(animatedValue, {
    toValue: value ? 1 : 0,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();

  return (
    <View style={styles.container}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <TouchableOpacity onPress={toggleSwitch} activeOpacity={1}>
        <View style={[styles.toggleContainer, {backgroundColor: color}]}>
          <Animated.View
            style={[styles.toggleWheelStyle, {marginLeft: moveToggle}]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default SohoCustomSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleContainer: {
    width: scaledWidth(50),
    height: scaledHeight(30),
    marginLeft: scaledWidth(3),
    borderRadius: scaledHeight(15),
    justifyContent: 'center',
  },
  label: {
    marginRight: scaledWidth(2),
  },
  toggleWheelStyle: {
    width: scaledWidth(25),
    height: scaledHeight(25),
    backgroundColor: 'white',
    borderRadius: scaledHeight(12.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});
