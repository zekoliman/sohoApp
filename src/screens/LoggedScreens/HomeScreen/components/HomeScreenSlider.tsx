import React, {useState, useRef, useEffect} from 'react';
import {Dimensions, StyleSheet, View, FlatList, Animated} from 'react-native';
import SohoText from '@/components/SohoText';
import {scaledHeight, scaledWidth} from '@/theme/Responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('screen');

const sliderData = [
  {
    id: '1',
    title: 'Tasarruf Edilen Enerji',
    value: '+35%',
    subtext: '23.5 kWh',
    backgroundColor: '#267c8d',
    icon: 'bolt',
  },
  {
    id: '2',
    title: 'Tasarruf Edilen Zaman',
    value: '+15%',
    subtext: '12 Saat',
    backgroundColor: '#1e4f63',
    icon: 'schedule',
  },
  {
    id: '3',
    title: 'Tasarruf Edilen Maliyet',
    value: '+20%',
    subtext: '₺ 1500',
    backgroundColor: '#0e3445',
    icon: 'money',
  },
];

const HomeScreenSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef<FlatList>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % sliderData.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollToIndex({index: currentIndex, animated: true});
    }
  }, [currentIndex]);

  const renderItem = ({item}) => (
    <View style={[styles.container, {backgroundColor: item.backgroundColor}]}>
      <View style={styles.textContainer}>
        <SohoText style={styles.title}>{item.title}</SohoText>
        <SohoText style={styles.value}>{item.value}</SohoText>
        <SohoText style={styles.subtext}>{item.subtext}</SohoText>
      </View>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={50} color="#ffffff" />
      </View>
    </View>
  );

  const keyExtractor = item => item.id;

  const getItemLayout = (_, index) => ({
    length: width - scaledWidth(40),
    offset: (width - scaledWidth(40)) * index,
    index,
  });

  return (
    <View>
      <FlatList
        data={sliderData}
        horizontal
        ref={sliderRef}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
      />
      <View style={styles.paginationContainer}>
        {sliderData.map((_, index) => {
          const scale = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index.toString()}
              style={[styles.dot, {transform: [{scale}]}]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scaledWidth(24),
    borderRadius: scaledHeight(12),
    width: width - scaledWidth(50),
    marginRight: scaledWidth(8),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '500',
    color: '#ffffff',
    fontSize: scaledHeight(16),
  },
  value: {
    fontWeight: '700',
    fontSize: scaledHeight(28),
    color: '#ffffff',
    marginVertical: scaledHeight(4),
  },
  subtext: {
    fontSize: scaledHeight(14),
    color: '#dddddd',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scaledHeight(10),
  },
  dot: {
    width: scaledHeight(8),
    height: scaledHeight(8),
    borderRadius: scaledHeight(4),
    backgroundColor: '#267c8d',
    marginHorizontal: scaledWidth(4),
  },
});

export default HomeScreenSlider;
