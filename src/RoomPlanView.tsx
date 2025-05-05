import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  requireNativeComponent,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';
import {
  addRoomScanListener,
  removeRoomScanListener,
  startRoomScan,
  stopRoomScan
} from '.';

const NativeARView = requireNativeComponent<ARViewProps>('ARView');

type ARViewProps = {
  style?: ViewStyle;
  buttonStyle?: ViewStyle;
  onScanComplete?: (result: any) => void;
};

const RoomPlanView: React.FC<ARViewProps> = ({
  style,
  buttonStyle,
  onScanComplete
}) => {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const listener = addRoomScanListener((event) => {
      if (event.error) {
        console.error(event.error);
      } else if (onScanComplete) {
        onScanComplete(event.result);
      }
    });

    return () => {
      removeRoomScanListener(listener);
    };
  }, [onScanComplete]);

  const handleStartScan = useCallback(() => {
    setIsScanning(true);
    startRoomScan();
  }, []);

  const handleStopScan = useCallback(() => {
    setIsScanning(false);
    stopRoomScan();
  }, []);

  return (
    <View style={[styles.container, style]}>
      <NativeARView style={styles.arView} />
      <Button
        title={isScanning ? 'Stop Scan' : 'Start Scan'}
        onPress={isScanning ? handleStopScan : handleStartScan}
        {...buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  arView: {
    flex: 1
  }
});

export default RoomPlanView;
