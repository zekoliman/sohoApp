import {scaledWidth} from '@/theme/Responsive';
import React from 'react';
import {Path, Rect, Svg} from 'react-native-svg';

const BatteryIconSvg = ({
  size = scaledWidth(20),
  color = '#75A7F7',
  ...props
}) => {
  return (
    <Svg width="39" height="19" viewBox="0 0 39 19" fill="none">
      <Rect
        opacity="0.35"
        x="0.5"
        y="0.5"
        width="34.0974"
        height="17.0805"
        rx="2.16667"
        stroke={color}
      />
      <Path
        opacity="0.4"
        d="M36.6926 5.84961V12.231C37.9764 11.6905 38.8113 10.4332 38.8113 9.04028C38.8113 7.64734 37.9764 6.39007 36.6926 5.84961Z"
        fill={color}
      />
      <Rect
        x="3.19043"
        y="3.19061"
        width="28.716"
        height="11.6991"
        rx="1.33333"
        fill={color}
      />
    </Svg>
  );
};

export default BatteryIconSvg;
