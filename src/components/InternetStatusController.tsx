import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import Colors from '@/theme/Colors';
import SohoText from './SohoText';

const Contents = {
  title: 'Bağlantı Yok',
  description: 'İnternete bağlı olduğundan emin ol',
  buttonText: 'Tekrar Dene',
};

const INTERNET_CONNECTION_TIMEOUT = 500;

const InternetStatusController: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [status, setStatus] = useState<boolean>(false);
  const [internetConnection, setinternetConnection] = useState<boolean>(false);

  const backAction = () => {
    return true;
  };

  BackHandler.addEventListener('hardwareBackPress', backAction);

  NetInfo.addEventListener(() => {
    const unsubscribe = NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Keyboard.dismiss();
        setStatus(true);
        setinternetConnection(true);
        setTimeout(() => {}, INTERNET_CONNECTION_TIMEOUT);
      }
      if (state.isConnected && status) {
        setTimeout(() => {
          setinternetConnection(false);
          return unsubscribe;
        }, INTERNET_CONNECTION_TIMEOUT);
      }
    });
  });

  const onPress = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setinternetConnection(false);
        return;
      }
    });
  };

  if (!internetConnection) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SohoText style={styles.title}>{Contents.title}</SohoText>
        <SohoText color={Colors.gray4} style={styles.description}>
          {Contents.description}
        </SohoText>
        <View
          style={[
            styles.buttonContainer,
            {bottom: insets.bottom + scaledHeight(20)},
          ]}>
          <TouchableOpacity onPress={onPress}>
            <SohoText>Tekrar Dene</SohoText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InternetStatusController;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: scaledWidth(20),
    marginTop: scaledHeight(30),
  },
  images: {
    marginTop: scaledHeight(150),
  },
  description: {
    fontSize: scaledWidth(16),
    marginTop: scaledHeight(6),
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    paddingHorizontal: scaledWidth(20),
  },
});
