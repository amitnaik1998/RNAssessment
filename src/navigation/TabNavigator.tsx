import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/colors';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}

type IconName =
  | 'home-outline'
  | 'settings-outline'
  | 'person-outline'
  | 'ellipse-outline';

const ICONS: Record<keyof RootTabParamList, IconName> = {
  Home: 'home-outline',
  Settings: 'settings-outline',
  Profile: 'person-outline',
};

type TabBarIconProps = {
  routeName: string;
  color: string;
  size: number;
};

function TabBarIcon({ routeName, color, size }: TabBarIconProps) {
  const iconName: IconName =
    ICONS[routeName as keyof RootTabParamList] ?? 'ellipse-outline';
  return <Ionicons name={iconName} size={size} color={color} />;
}

function TabBarButton(props: BottomTabBarButtonProps) {
  return <Pressable {...(props as PressableProps)} android_ripple={null} />;
}

const Tab = createBottomTabNavigator<RootTabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.tabActive,
        tabBarInactiveTintColor: COLORS.tabInactive,
        tabBarButton: TabBarButton,
        // Render callback for React Navigation; TabBarIcon is a stable, top-level component.
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => (
          <TabBarIcon routeName={route.name} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
