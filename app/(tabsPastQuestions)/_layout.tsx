import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { useLocalSearchParams } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { subjectInfoObj } = useLocalSearchParams();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen name="index"    initialParams={{subjectInfoObj: subjectInfoObj }}  options={{   title: 'Section A', tabBarLabelStyle: { fontFamily: 'Kanit', fontWeight: 400, fontSize: 18 },   tabBarIcon: ({ color, focused }) => (     <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />   ),}} />
      <Tabs.Screen name="sectionB" initialParams={{subjectInfoObj: subjectInfoObj }}  options={{   title: 'Section B', tabBarLabelStyle: { fontFamily: 'Kanit', fontWeight: 400, fontSize: 18 },  tabBarIcon: ({ color, focused }) => (     <TabBarIcon name={focused ? 'pencil' : 'pencil-outline'} color={color} />   ), }}/>
    </Tabs>
  );
}
