import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '@/screens/AuthScreens/LoginScreen';
import SplashScreen from '@/screens/SplashScreen';
import LoggedUserNavigationWrapper from './LoggedUserStack';
import AnalyticsScreensWrapper from './AnalyticsStack';
import MyPlaces from '@/screens/MyPlaces';
import Notifications from '@/screens/LoggedScreens/FastMenu/Notifications';
import Branches from '@/screens/LoggedScreens/FastMenu/Branches';
import EnergyTips from '@/screens/EnergyTips';
import IntroductionScreen from '@/screens/IntroductionScreen';
import ProfileDetailScreen from '@/screens/SettingsScreens.tsx/ProfileDetailScreen';
import AlarmScreen from '@/screens/LoggedScreens/FastMenu/AlarmsScreen';
import EnergyMonitoringScreensWrapper from './EnergyMonitoringStack';
import LanguageSelectionScreen from '@/screens/LanguageSelectionScreen';
import AmbientMonitoringScreensWrapper from './AmbientMonitoringStack';
import AirQuailityDetail from '@/screens/AmbientMonitoringScreens/AirQualityScreens/AirQuailityDetail';
import EnvanterScreen from '@/screens/LoggedScreens/EnvanterScreen';

const MainStack = createNativeStackNavigator();

const MainNavigationWrapper: React.FC = () => {
  const transitionSpecConfig = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 100,
      mass: 5,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const forFade = ({current}: any) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="SplashScreen"
          component={SplashScreen}
        />
        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="LoginScreen"
          component={LoginScreen}
        />
        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="LanguageSelectionScreen"
          component={LanguageSelectionScreen}
        />
        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="MyPlaces"
          component={MyPlaces}
        />
        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="LoggedUserNavigationWrapper"
          component={LoggedUserNavigationWrapper}
        />
        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="AmbientMonitoringScreensWrapper"
          component={AmbientMonitoringScreensWrapper}
        />

        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="AnalyticsStack"
          component={AnalyticsScreensWrapper}
        />
        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="EnergyMonitoringStack"
          component={EnergyMonitoringScreensWrapper}
        />
        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="AlarmsScreen"
          component={AlarmScreen}
        />
        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="NotificationsScreen"
          component={Notifications}
        />
        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="BranchesScreen"
          component={Branches}
        />
        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="EnvanterScreen"
          component={EnvanterScreen}
        />

        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="EnergyTips"
          component={EnergyTips}
        />
        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="IntroductionScreen"
          component={IntroductionScreen}
        />
        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="ProfileDetailScreen"
          component={ProfileDetailScreen}
        />
        <MainStack.Screen
          options={() => ({
            cardStyleInterpolator: forFade,
            transitionSpec: {
              close: transitionSpecConfig,
              open: transitionSpecConfig,
            },
          })}
          name="AirQualityDetailScreen"
          component={AirQuailityDetail}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigationWrapper;
