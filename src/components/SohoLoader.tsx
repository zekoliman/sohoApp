import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Animation from 'lottie-react-native';
import LottieAnimations from '@/assets/animations/LottieAnimations';
import {scaledWidth} from '@/theme/Responsive';
import Colors from '@/theme/Colors';
import {useAppSelector} from '@/redux/hooks';

const SohoLoader: React.FC = () => {
  const {isLoading} = useAppSelector(state => state.globalLoad);
  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animation
        style={styles.lottie}
        source={LottieAnimations.Loader}
        speed={1.5}
        autoPlay
        loop
      />
    </View>
  );
};

export default SohoLoader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.background,
    justifyContent: 'center',
    zIndex: 99999,
  },
  lottie: {
    width: scaledWidth(550),
    height: scaledWidth(250),
    alignSelf: 'center',
  },
});
