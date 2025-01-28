import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SolarEnergy from '@/screens/AnalyticsScreens/SolarEnergy';
import EvCharger from '@/screens/AnalyticsScreens/EvCharger';
import Inventory from '@/screens/AnalyticsScreens/Inventory';
import SohoCustomTopBar from '@/components/SohoCustomTopBar';

const AnalyticsScreensWrapper = ({route: {params}}: any) => {
  const AnalyticsStack = createMaterialTopTabNavigator();

  return (
    <AnalyticsStack.Navigator
      tabBar={props => <SohoCustomTopBar {...props} />}
      initialRouteName={'SolarEnergyScreen'}>
      <AnalyticsStack.Screen
        name="SolarEnergyScreen"
        component={SolarEnergy}
        options={{title: 'Solar Energy'}}
        initialParams={params}
      />
      <AnalyticsStack.Screen
        name="EvChargerScreen"
        component={EvCharger}
        options={{title: 'EV Charger'}}
      />
      <AnalyticsStack.Screen
        name="InventoryScreen"
        component={Inventory}
        options={{title: 'Inventory'}}
      />
    </AnalyticsStack.Navigator>
  );
};

export default AnalyticsScreensWrapper;
