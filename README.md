# React Native RoomPlan

A React Native module for integrating Apple's RoomPlan API.

This module allows you to create immersive augmented reality experiences by scanning and mapping indoor spaces.

Supported on iOS 16.0+ & iPadOS 16.0+ devices with LiDAR.

See more about [RoomPlan](https://developer.apple.com/documentation/roomplan).

## Code Quality

This project uses ESLint and Prettier for code quality and formatting. Before committing, linting and formatting checks are automatically run using `lint-staged` and `husky`.

### Running Linting Manually

```bash
npm run lint
```

## Installation

```bash
npm install react-native-roomplan
cd ios && pod install
```

## Usage

```javascript
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ARView from 'react-native-roomplan';

const App = () => {
  const handleScanComplete = (result) => {
    console.log('Room scanned:', result);
  };

  return (
    <View style={styles.container}>
      <ARView style={styles.arView} onScanComplete={handleScanComplete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arView: {
    flex: 1,
  },
});

export default App;
```
