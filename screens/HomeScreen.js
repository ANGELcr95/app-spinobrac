import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const HomeScreen = (props) => {
  // const [text, setText] = useState('');
  const startingHeight = 160;
  const [expander, setExpander] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState(startingHeight);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // expanded?setText(props.text): setText(props.text.substring(0, 40));
    Animated.spring(animatedHeight, {
      toValue: expanded ? fullHeight : startingHeight,
      friction: 1,
      useNativeDriver: false,
    }).start();
  }, [animatedHeight, expanded]);

  const onTextLayout = (e) => {
    let { x, y, width, height } = e.nativeEvent.layout;
    height = Math.floor(height) + 40;
    if (height > startingHeight) {
      setFullHeight(height);
      setExpander(true);
    }
  };

//    return (
//       <View style={styles.container}>
//               <View
//           style={styles.textBox}
//           onLayout={(e) => {
//             onTextLayout(e);
//           }}>
//           <Text style={styles.text}>{props.text}</Text>
//         </View>
//     </View>
//   );
// };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.viewPort, { height: animatedHeight }]}>
        <View
          style={styles.textBox}
          onLayout={(e) => {
            onTextLayout(e);
          }}>
          <Text style={styles.text}>{props.text}</Text>
        </View>
      </Animated.View>

      {expander && (
        <React.Fragment>
          <TouchableWithoutFeedback
            onPress={() => {
              setExpanded(!expanded);
            }}>
            <Text style={styles.readBtn}>
              {expanded ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableWithoutFeedback>
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    height: 60,
    left: 0,
    bottom: 20,
    right: 0,
  },
  container: {
    flex: 1,
  },
  viewPort: {
    flex: 1,
    overflow: 'hidden',
    top: 12,
    marginBottom: 20,
    backgroundColor: 'lightgray'
  },
  textBox: {
    flex: 1,
    position: 'absolute',
    flexWrap: 'wrap',
  },
  text: {
    color: 'black',
    alignSelf: 'flex-start',
    textAlign: 'justify',
    fontSize: 14,
    fontFamily: 'Avenir',

  },
  gradient: {
    backgroundColor: 'transparent', // required for gradient
    height: 40,
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  readBtn: {
    flex: 1,
    color: 'blue',
    alignSelf: 'flex-end',
  },
});

export default HomeScreen;
