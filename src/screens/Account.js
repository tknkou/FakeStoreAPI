import { View, Text, StyleSheet } from 'react-native';

export default function Account () {
  return (
    <View style={styles.container}>
      <Text>Hello, this is Account page. Account management function will be introduced soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
