import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ProgressBarAndroid,
  ProgressViewIOS,
} from 'react-native';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const TimerIndicator = ({maxValue, onTimeOver, shouldRefresh, onRefreshed}) => {
  const [timer, setTimer] = useState(maxValue);

  useInterval(
    () => {
      if (shouldRefresh) {
        setTimer(maxValue);
        onRefreshed();
      } else {
        decrementTimer();
        if (timer === 0) {
          setTimer(maxValue);
          onTimeOver();
        }
      }
    },
    timer >= 0 ? 1000 : null,
  );

  const decrementTimer = () => setTimer(() => timer - 1);

  const convertTimerToProgress = () => timer / maxValue;

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' ? (
        <ProgressBarAndroid
          styleAttr="Horizontal"
          progress={convertTimerToProgress()}
          indeterminate={false}
          color="dodgerblue"
        />
      ) : (
        <ProgressViewIOS progress={convertTimerToProgress()} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default TimerIndicator;
