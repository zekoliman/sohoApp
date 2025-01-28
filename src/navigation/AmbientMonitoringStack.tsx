import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SohoCustomTopBar from '@/components/SohoCustomTopBar';
import AirQualityReport from '@/screens/AmbientMonitoringScreens/AirQuality';
import SecurityReport from '@/screens/AmbientMonitoringScreens/SecurityReport';
import PowerSources from '@/screens/AmbientMonitoringScreens/PowerSources';

const AmbientMonitoringScreensWrapper = ({route: {params}}: any) => {
  const AirMonitoringStack = createMaterialTopTabNavigator();

  return (
    <AirMonitoringStack.Navigator
      tabBar={props => (
        <SohoCustomTopBar
          colors={['#4CAF50', '#45a049']}
          title="Ortam İzleme"
          {...props}
        />
      )}
      initialRouteName={'AirQualityReportScreen'}>
      <AirMonitoringStack.Screen
        name="AirQualityReportScreen"
        component={AirQualityReport}
        options={{title: 'Hava Kalitesi'}}
        initialParams={params}
      />
      <AirMonitoringStack.Screen
        name="SecurityReportScreen"
        component={SecurityReport}
        options={{title: 'Güvenlik'}}
        initialParams={params}
      />
      <AirMonitoringStack.Screen
        name="PowerSourcesScreen"
        component={PowerSources}
        options={{title: 'Güç Kaynakları'}}
        initialParams={params}
      />
    </AirMonitoringStack.Navigator>
  );
};

export default AmbientMonitoringScreensWrapper;
