import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const heightMobileUI = 896;
const widthMobileUI = 414;

export const scaledWidth = (scaleWidthVar: number) => {
  return (width * scaleWidthVar) / widthMobileUI;
};

export const scaledHeight = (scaleHeightVar: number) => {
  return (height * scaleHeightVar) / heightMobileUI;
};
