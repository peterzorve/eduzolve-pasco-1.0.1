import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLocalSearchParams } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { universityInformation } = useLocalSearchParams();
  return (
    <Tabs screenOptions={{   tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,   headerShown: false, }}>
      <Tabs.Screen name="index"    initialParams={{universityInformation: universityInformation }} options={{   title: 'B.Sc.',   tabBarLabelStyle: { fontFamily: 'Kanit', fontWeight: 300, fontSize: 14 },    tabBarIcon: ({ color, focused }) => (     <TabBarIcon name={focused ? 'school' : 'school-outline'} color={focused ? 'black' : 'black'} />   ), }} />
      <Tabs.Screen name="masters"  initialParams={{universityInformation: universityInformation }} options={{   title: 'M.Sc.',   tabBarLabelStyle: { fontFamily: 'Kanit', fontWeight: 300, fontSize: 14 },    tabBarIcon: ({ color, focused }) => (     <TabBarIcon name={focused ? 'book' : 'book-outline'} color={focused ? 'black' : 'black'} />   ), }}/>
      <Tabs.Screen name="doctoral" initialParams={{universityInformation: universityInformation }} options={{   title: 'Ph.D..',   tabBarLabelStyle: { fontFamily: 'Kanit', fontWeight: 300, fontSize: 14 },    tabBarIcon: ({ color, focused }) => (     <TabBarIcon name={focused ? 'trophy' : 'trophy-outline'} color={focused ? 'black' : 'black'} />   ), }}/>
      <Tabs.Screen name="diploma"  initialParams={{universityInformation: universityInformation }} options={{   title: 'Diploma',   tabBarLabelStyle: { fontFamily: 'Kanit', fontWeight: 300, fontSize: 14 },    tabBarIcon: ({ color, focused }) => (     <TabBarIcon name={focused ? 'ribbon' : 'ribbon-outline'} color={focused ? 'black' : 'black'} />   ), }}/>
    </Tabs>
  );
}
