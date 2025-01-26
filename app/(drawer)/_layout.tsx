import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { useSelector } from "react-redux";

export default function Layout() {
  const user = useSelector((state) => state.user.user); 
  const subscriptionStatus = useSelector((state) => state.subscription.status);
  const active = subscriptionStatus?.entitlements?.active?.["pro"]?.isActive ?   true : false
  // const active = true

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} user={user} active={active}/>} >

        <Drawer.Screen name="index"         options={{ drawerLabel: 'Profile',      drawerLabelStyle: { fontFamily: 'Kanit', fontWeight: 400 }, title: '',  drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={20} />   )}}/>
        <Drawer.Screen name="pastquestions"       options={{ drawerLabel: 'Past questions',            drawerLabelStyle: { fontFamily: 'Kanit', fontWeight: 400 }, title: '',  drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={20}/>   )}}/>
        <Drawer.Screen name="payment"       options={{ drawerLabel: 'Subscription',       drawerLabelStyle: { fontFamily: 'Kanit', fontWeight: 400 }, title: '',  drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'card' : 'card-outline'} color={color}  size={20}/>   )}}/>
        <Drawer.Screen name="universities"  options={{ drawerLabel: 'Universities in Ghana', drawerLabelStyle: { fontFamily: 'Kanit', fontWeight: 400 }, title: '',  drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'school' : 'school-outline'} color={color} size={20} />   )}}/>
        <Drawer.Screen name="studywitheduzolve" options={{   drawerLabel: 'Study with EduZolve',   drawerLabelStyle: { fontFamily: 'Kanit', fontWeight: 400 }, title: '', drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'book' : 'book-outline'} color={color} size={20} />   )}}/>
        <Drawer.Screen name="settings"      options={{ drawerLabel: 'Settings',           drawerLabelStyle: { fontFamily: 'Kanit', fontWeight: 400 }, title: '',  drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color}  size={20}/>   )}}/>
        <Drawer.Screen name="logout"        options={{   drawerLabel: 'Logout',  drawerLabelStyle: { fontFamily: 'Kanit', fontWeight: 400 },         title: 'Logout',    drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'log-out' : 'log-out-outline'} color={color} size={20} />   )}}/>
      </Drawer>
    </GestureHandlerRootView>
  );
}


const CustomDrawerContent = (props) => {
  const router = useRouter();
  const { user, active } = props;
  return (
    <DrawerContentScrollView {...props}>
        <View  style={{  justifyContent: "center", alignItems: "center", borderBottomColor: "#e4e4e4", borderBottomWidth: 5,   margin: 5, padding: 0,  backgroundColor: "#f4f4f4", borderTopRightRadius: 20}} >
    
    
            <View style={{ flexDirection: "row", marginBottom: 10, }}>
                <Image source={require('@/assets/images/profile-default.png')} style={{ width: "100%", height: 150, borderRadius: 3, borderColor: "black"}} resizeMode="cover" />
                <TouchableOpacity disabled={active} onPress={() => { router.push('/payment') }} style={{ justifyContent: 'center', flexDirection: "row", position: "absolute", bottom: 5,  right: 5, maxHeight: 40,  borderRadius: 10,  backgroundColor: "white", alignItems: "center" }}>
                    <Text style={{ fontSize: 15, paddingVertical: 5, paddingHorizontal: 10, color:  active ? "green" : "red", fontFamily: "Kanit", textTransform: "uppercase" }}>{ active ? "active subscription" : "inactive subscription" }</Text>
                </TouchableOpacity>
            </View>



          <View style={{  marginBottom: 10,  width: "90%" }}>
              <Text style={{ fontSize: 20, color: "black", fontFamily: "Kanit", textTransform: "uppercase"  }}>{ user?.username ? user?.username : "NA" }</Text>
              <Text style={{ fontSize: 12, color: "gray", fontFamily: "Kanit",  }} >{ user?.email ? user?.email : "" } </Text>
          </View>
        </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};