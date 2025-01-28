import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SohoCustomTopBar from '@/components/SohoCustomTopBar';
import EnergyMonitoring from '@/screens/EnergyMonitoringScreens/EnergyMonitoring';
import EnergyComparison from '@/screens/EnergyMonitoringScreens/EnergyComparison';
import CarbonFootprint from '@/screens/EnergyMonitoringScreens/CarbonFootprint';
import EvStationMonitoring from '@/screens/EnergyMonitoringScreens/EvStationMonitoring';

const EnergyMonitoringScreensWrapper = ({route: {params}}: any) => {
  const EnergyMonitoringStack = createMaterialTopTabNavigator();

  return (
    <EnergyMonitoringStack.Navigator
      tabBar={props => (
        <SohoCustomTopBar
          colors={['#4CAF50', '#45a049']}
          title="Enerji İzleme"
          {...props}
        />
      )}
      initialRouteName={'EnergyMonitoring'}>
      <EnergyMonitoringStack.Screen
        name="EnergyMonitoring"
        component={EnergyMonitoring}
        options={{title: 'Enerji İzleme'}}
        initialParams={params}
      />
      <EnergyMonitoringStack.Screen
        name="EnergyComparison"
        component={EnergyComparison}
        options={{title: 'Enerji Karşılaştırma'}}
        initialParams={params}
      />
      <EnergyMonitoringStack.Screen
        name="CarbonFootprint"
        component={CarbonFootprint}
        options={{title: 'Karbon Ayak İzi'}}
        initialParams={params}
      />
      <EnergyMonitoringStack.Screen
        name="EvStationMonitoring"
        component={EvStationMonitoring}
        options={{title: 'EV İstasyon İzleme'}}
        initialParams={params}
      />
    </EnergyMonitoringStack.Navigator>
  );
};

export default EnergyMonitoringScreensWrapper;
