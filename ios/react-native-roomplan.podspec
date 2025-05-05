Pod::Spec.new do |s|
    s.name         = "react-native-roomplan"
    s.version      = "1.0.0"
    s.summary      = "RoomPlan module for React Native"
    s.homepage     = "https://github.com/zhrgns/react-native-roomplan"
    s.license      = "MIT"
    s.author       = { "zhrgns" => "fzehragunes@gmail.com" }
    s.source       = { :git => "https://github.com/zhrgns/react-native-roomplan.git", :tag => s.version }
    s.source_files = "RoomPlanModule.swift", "RoomPlanModule.m"
    s.requires_arc = true
    s.platform     = :ios, "15.0"
    s.swift_version = "5.0"
  
    s.dependency "React"
    s.frameworks = "Foundation", "RoomPlan", "ARKit"
  end
  