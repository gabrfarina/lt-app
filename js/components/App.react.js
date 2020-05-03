import 'react-native-gesture-handler';

import React, {useEffect, useContext, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LanguageSelector from './LanguageSelector/LanguageSelector.react';
import LanguageHome from './LanguageHome/LanguageHome.react';
import Listen from './Listen/Listen.react';
import {genMostRecentListenedCourse} from '../persistence';

import languageData from '../../languageData';

const Stack = createStackNavigator();

const App = () => {
  // one day, the Suspense page won't have a bunch of red warnings at the top
  const [recentCourse, setRecentCourse] = useState(null);

  useEffect(() => {
    (async () => {
      const course = await genMostRecentListenedCourse();
      setRecentCourse({course});
    })();
  }, []);

  if (recentCourse === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          // look at this FORESIGHT to check for it in languageData
          !recentCourse.course || !languageData[recentCourse.course]
            ? 'Language Selector'
            : 'Language Home'
        }>
        <Stack.Screen
          name="Language Selector"
          component={LanguageSelector}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Language Home"
          component={LanguageHome}
          options={{
            headerShown: false,
          }}
          initialParams={{course: recentCourse.course}}
        />
        <Stack.Screen
          name="Listen"
          component={Listen}
          options={{
            headerShown: false,
            // headerTitle: 'Spanish',
            // headerStatusBarHeight: 16,
            // headerStyle: {
            //   elevation: 0,
            // },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
