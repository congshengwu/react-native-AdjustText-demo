import React, { useState } from 'react';
import type {Node} from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

export interface AdjustTextProps {
  children: any;
  initFontSize: number;
  numberOfLines: number;
}

const AdjustText: () => Node = (props: AdjustTextProps) => {
  const {
    children, numberOfLines, initFontSize,
  } = props;
  const [currentFontSize, setCurrentFontSize] = useState(initFontSize);

  AdjustText.defaultProps = {
    numberOfLines: 1,
  };

  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    const { lines } = e.nativeEvent;
    if (lines.length > numberOfLines) {
      setCurrentFontSize(currentFontSize - 0.5);
    }
  };

  return (
      <Text
          {...props}
          style={[props?.style, { fontSize: currentFontSize }]}
          numberOfLines={numberOfLines}
          adjustsFontSizeToFit={Platform.OS === 'ios'}
          onTextLayout={Platform.OS === 'ios' ? null : onTextLayout}
      >
        {children}
      </Text>
  );
};

const App: () => Node = () => {
  const [text, setText] = useState('Hello World.');

  return (
      <SafeAreaView style={{ height: '100%', justifyContent: 'center', backgroundColor: Colors.darker }}>
        <AdjustText
            initFontSize={20}
            numberOfLines={1}
            style={{ color: 'black', backgroundColor: 'pink', marginBottom: 20 }}
        >
          {text}
        </AdjustText>
        <Button
            title={'Append Text'}
            onPress={() => setText(`${text} Hello World.`)}
        />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
