import React, {useCallback, useRef, useState} from 'react';
import MainNavigationWrapper from '@/navigation/MainStack';
import store from '@/redux/store';
import Colors from '@/theme/Colors';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import SohoLoader from '@/components/SohoLoader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import 'react-native-gesture-handler';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const BUTTON_WIDTH = 120;
const BUTTON_HEIGHT = 44;

const branches = [
  {id: 1, name: 'Şube 1'},
  {id: 2, name: 'Şube 2'},
  {id: 3, name: 'Şube 3'},
  {id: 4, name: 'Şube 4'},
];

const Checkbox = ({isChecked, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialIcons
      name={isChecked ? 'check-box' : 'check-box-outline-blank'}
      size={24}
      color="#007bff"
    />
  </TouchableOpacity>
);

const App = () => {
  const [selectedBranches, setSelectedBranches] = useState([]);
  const bottomSheetRef = useRef(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(WINDOW_HEIGHT - BUTTON_HEIGHT - 100);

  const handleBranchSelection = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const toggleBranch = branchId => {
    setSelectedBranches(prev =>
      prev.includes(branchId)
        ? prev.filter(id => id !== branchId)
        : [...prev, branchId],
    );
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = Math.max(
        0,
        Math.min(
          context.startX + event.translationX,
          WINDOW_WIDTH - BUTTON_WIDTH,
        ),
      );
      translateY.value = Math.max(
        0,
        Math.min(
          context.startY + event.translationY,
          WINDOW_HEIGHT - BUTTON_HEIGHT,
        ),
      );
    },
    onEnd: () => {
      const SNAP_THRESHOLD = 50;

      let finalX = translateX.value;
      let finalY = translateY.value;

      if (finalX < SNAP_THRESHOLD) finalX = 0;
      else if (finalX > WINDOW_WIDTH - BUTTON_WIDTH - SNAP_THRESHOLD)
        finalX = WINDOW_WIDTH - BUTTON_WIDTH;

      if (finalY < SNAP_THRESHOLD) finalY = 0;
      else if (finalY > WINDOW_HEIGHT - BUTTON_HEIGHT - SNAP_THRESHOLD)
        finalY = WINDOW_HEIGHT - BUTTON_HEIGHT;

      translateX.value = withSpring(finalX);
      translateY.value = withSpring(finalY);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  if (__DEV__) {
    require('./ReactotronConfig');
  }

  return (
    <>
      <GestureHandlerRootView>
        <View style={{zIndex: 9999}}>
          <Toast />
        </View>
        <SafeAreaProvider>
          <Provider store={store}>
            <StatusBar backgroundColor={Colors.background} />
            <SohoLoader />
            <MainNavigationWrapper />

            <PanGestureHandler onGestureEvent={gestureHandler} minDist={10}>
              <Animated.View style={[styles.branchButton, animatedStyle]}>
                <TouchableOpacity onPress={handleBranchSelection}>
                  <View style={styles.buttonContent}>
                    <MaterialIcons name="business" size={24} color="white" />
                    <Text style={styles.buttonText}>Şube Seç</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </PanGestureHandler>

            <BottomSheet
              ref={bottomSheetRef}
              index={-1}
              snapPoints={['50%']}
              enablePanDownToClose={true}
              backgroundStyle={styles.bottomSheetBackground}>
              <View style={styles.bottomSheetContent}>
                <Text style={styles.bottomSheetTitle}>Şube Seçimi</Text>
                <ScrollView>
                  {branches.map(branch => (
                    <TouchableOpacity
                      key={branch.id}
                      style={styles.branchItem}
                      onPress={() => toggleBranch(branch.id)}>
                      <Text style={styles.branchName}>{branch.name}</Text>
                      <Checkbox
                        isChecked={selectedBranches.includes(branch.id)}
                        onPress={() => toggleBranch(branch.id)}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </BottomSheet>
          </Provider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  branchButton: {
    position: 'absolute',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  bottomSheetBackground: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetContent: {
    flex: 1,
    padding: 16,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  branchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  branchName: {
    fontSize: 16,
    color: '#333',
  },
});

export default App;
