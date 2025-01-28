import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/LoggedScreens/HomeScreen';
import SohoTabBar from '@/components/SohoTabBar';
import EnergyScreen from '@/screens/LoggedScreens/EnergyScreen';
import AnalyticsScreen from '@/screens/LoggedScreens/AnalyticsScreen';
import ProfileScreen from '@/screens/LoggedScreens/ProfileScreen';
import {Dimensions, View} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const LoggedStack = createBottomTabNavigator();

const LoggedUserNavigationWrapper: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('screen').height - 20,
      }}>
      <LoggedStack.Navigator
        tabBar={({state, descriptors, navigation, insets}) => (
          <SohoTabBar
            state={state}
            descriptors={descriptors}
            navigation={navigation}
            insets={insets}
          />
        )}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        <LoggedStack.Screen name="HomeScreen" component={HomeScreen} />
        <LoggedStack.Screen name="EnergyScreen" component={EnergyScreen} />
        <LoggedStack.Screen
          name="AnalyticsScreen"
          component={AnalyticsScreen}
        />
        <LoggedStack.Screen name="ProfileScreen" component={ProfileScreen} />
 
      </LoggedStack.Navigator>
    </View>
  );
};

export default LoggedUserNavigationWrapper;
