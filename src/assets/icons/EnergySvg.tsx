import Colors from '@/theme/Colors';
import {scaledWidth} from '@/theme/Responsive';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

const EnergySvg = ({
  size = scaledWidth(20),
  color = Colors.bottomTabActiveColor,
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
        stroke={color}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default EnergySvg;
