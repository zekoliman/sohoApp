import Colors from '@/theme/Colors';
import Fonts from '@/theme/Fonts';
import {scaledWidth} from '@/theme/Responsive';
import React, {forwardRef, LegacyRef} from 'react';
import {Text, TextProps} from 'react-native';

type SohoTextProps = {
  fontFamily?: string;
  color?: string;
} & TextProps;

const SohoText = forwardRef((props: SohoTextProps, ref: LegacyRef<Text>) => {
  const {fontFamily = Fonts.Regular, color = Colors.black, style} = props;

  return (
    <Text
      allowFontScaling={false}
      {...props}
      style={[{fontFamily, fontSize: scaledWidth(16), color}, style]}
      ref={ref}>
      {props.children}
    </Text>
  );
});

export default SohoText;
