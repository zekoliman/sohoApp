import {scaledWidth} from '@/theme/Responsive';
import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const AnalyticsSvg = ({
  size = scaledWidth(20),
  color = Colors.bottomTabActive,
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M18 20V10"
        stroke={color}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 20V4"
        stroke={color}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6 20V14"
        stroke={color}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default AnalyticsSvg;
