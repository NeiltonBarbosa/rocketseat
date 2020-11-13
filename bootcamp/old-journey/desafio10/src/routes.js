import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Subscription from '~/pages/Subscription';
import Profile from '~/pages/Profile';

import logo from '~/assets/logo.png';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createStackNavigator(
          {
            screen: createBottomTabNavigator(
              {
                Dashboard,
                Subscription,
                Profile,
              },
              {
                resetOnBlur: true,
                tabBarOptions: {
                  keyboardHidesTabBar: true,
                  activeTintColor: '#FFF',
                  inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
                  style: {
                    backgroundColor: '#2B1A2F',
                    borderTopColor: '#2B1A2F',
                  },
                },
              },
            ),
          },
          {
            defaultNavigationOptions: {
              headerTransparent: true,
              headerTitle: (
                <Image source={logo} style={{ width: 32, height: 32 }} />
              ),
              headerTitleContainerStyle: {
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                height: 64,
              },
              headerTitleStyle: {
                width: 32,
                height: 32,
              },
            },
          },
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      },
    ),
  );
