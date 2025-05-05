import Foundation
import RoomPlan
import React
import ARKit

// React Native tarafında RoomPlan ile etkileşim kurabilmek için, React Native'in EventEmitter sınıfından türemek gerekiyor.
@objc(RoomPlanModule)
class RoomPlanModule: RCTEventEmitter, RoomCaptureSessionDelegate {

  // RoomCaptureSession, odanın tarama işlemi için kullanılan sınıf.
  private var session: RoomCaptureSession?
  private var config: RoomCaptureSession.Configuration?

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func supportedEvents() -> [String]! {
    return ["onRoomScanned"]
  }

@objc func startScan() {
  guard ARWorldTrackingConfiguration.supportsFrameSemantics(.sceneDepth) else {
    sendEvent(withName: "onRoomScanned", body: ["error": "LiDAR not available on this device."])
    return
  }

  DispatchQueue.main.async {
    if self.session == nil {
      self.config = RoomCaptureSession.Configuration()
      self.session = RoomCaptureSession()
      self.session?.delegate = self
    }

    if let config = self.config {
      self.session?.run(configuration: config)
    }
  }
}

  @objc func stopScan() {
    DispatchQueue.main.async {
      self.session?.stop()
    }
  }
  func captureSession(_ session: RoomCaptureSession, didEndWith data: CapturedRoom) {
    do {

      let jsonData = try JSONEncoder().encode(data)
      let jsonString = String(data: jsonData, encoding: .utf8)

      sendEvent(withName: "onRoomScanned", body: ["result": jsonString ?? ""])
    } catch {

      sendEvent(withName: "onRoomScanned", body: ["error": "Failed to encode room data"])
    }
  }
}
