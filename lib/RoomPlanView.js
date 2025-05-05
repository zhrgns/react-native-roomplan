import React, { useCallback, useEffect, useState } from 'react';
import { Button, requireNativeComponent, StyleSheet, View } from 'react-native';
import { addRoomScanListener, removeRoomScanListener, startRoomScan, stopRoomScan } from '.';
const NativeARView = requireNativeComponent('ARView');
const RoomPlanView = ({ style, buttonStyle, onScanComplete }) => {
    const [isScanning, setIsScanning] = useState(false);
    useEffect(() => {
        const listener = addRoomScanListener((event) => {
            if (event.error) {
                console.error(event.error);
            }
            else if (onScanComplete) {
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
    return (React.createElement(View, { style: [styles.container, style] },
        React.createElement(NativeARView, { style: styles.arView }),
        React.createElement(Button, { title: isScanning ? 'Stop Scan' : 'Start Scan', onPress: isScanning ? handleStopScan : handleStartScan, ...buttonStyle })));
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
