// RoomPlanModule.ts (Native modülün implementasyonu)
import { NativeEventEmitter, NativeModules } from 'react-native';
const { RoomPlanModule } = NativeModules;
// Native modülün event emitter'ını alıyoruz
const roomPlanEventEmitter = new NativeEventEmitter(RoomPlanModule);
// Tarama başlatma fonksiyonu
export const startRoomScan = () => {
    RoomPlanModule.startScan();
};
// Tarama durdurma fonksiyonu
export const stopRoomScan = () => {
    RoomPlanModule.stopScan();
};
// Tarama sonucu alındığında çağrılacak event listener
export const addRoomScanListener = (callback) => {
    return roomPlanEventEmitter.addListener('onRoomScanned', callback);
};
// Event listener'ı kaldırma fonksiyonu
export const removeRoomScanListener = (listener) => {
    listener.remove();
};
