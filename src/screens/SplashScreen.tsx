import React, {useEffect} from 'react';
import {StyleSheet, Animated, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useAppDispatch} from '@/redux/hooks';
import {setGlobalLoadState} from '@/redux/slices/globalLoadSlice';
import VodofoneIcon from '@/assets/icons/VodofoneIcon.svg';

const SplashScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    animateIcon();
    checkToken();
  }, []);

  const animateIcon = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const checkToken = () => {
    setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 2000);
  };

  return (
    <>
      <StatusBar translucent hidden backgroundColor="transparent" />
      <LinearGradient colors={['#141E30', '#243B55']} style={styles.container}>
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
          <VodofoneIcon width={100} height={100} />
        </Animated.View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
