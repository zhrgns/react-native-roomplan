// RoomPlanModule.ts (Native modülün implementasyonu)

import { NativeEventEmitter, NativeModules, NativeModules } from 'react-native';

const { RoomPlanModule } = NativeModules;

export type CapturedRoom = {
  roomId: string;
  floorArea: number;
  capturedData: string;
};

export type RoomScanEvent = {
  result: CapturedRoom | null;
  error: string | null;
};

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
export const addRoomScanListener = (
  callback: (event: RoomScanEvent) => void,
) => {
  return roomPlanEventEmitter.addListener('onRoomScanned', callback);
};

// Event listener'ı kaldırma fonksiyonu
export const removeRoomScanListener = (listener: any) => {
  listener.remove();
};
