import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigator/MainNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/stores';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator></MainNavigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
