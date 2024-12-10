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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} user={user} active={active}/>} >

        <Drawer.Screen name="index"           options={{   drawerLabel: 'Past Question',  drawerLabelStyle: { fontFamily: 'Kanit', fontWeight: 400 },        title: '',  drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={20} />   )}}/>
        <Drawer.Screen name="profile"  options={{   drawerLabel: 'Profile',  drawerLabelStyle: { fontFamily: 'Kanit', fontWeight: 400 },             title: '',  drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={20}/>   )}}/>
        <Drawer.Screen name="changepassword"  options={{   drawerLabel: 'Settings',  drawerLabelStyle: { fontFamily: 'Kanit', fontWeight: 400 },             title: '',  drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color}  size={20}/>   )}}/>
        <Drawer.Screen name="payment"  options={{   drawerLabel: 'Make Payment',  drawerLabelStyle: { fontFamily: 'Kanit', fontWeight: 400 },             title: '',  drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'card' : 'card-outline'} color={color}  size={20}/>   )}}/>
        {/* <Drawer.Screen name="support"       options={{   drawerLabel: 'Contact Support', title: '',  drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'home' : 'home-outline'} color={color} />   )}}/> */}
        {/* <Drawer.Screen name="payment"       options={{   drawerLabel: 'Make Payment',      title: 'Ask Kwame', drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'home' : 'home-outline'} color={color} />   )}}/> */}
        {/* <Drawer.Screen name="socialmedia"   options={{   drawerLabel: 'Social Media',   title: '',          drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'home' : 'home-outline'} color={color} />   )}}/> */}
        {/* <Drawer.Screen name="mentors"       options={{   drawerLabel: 'Mentors',        title: "Mentors' Details",   drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'home' : 'home-outline'} color={color} />   )}}/> */}
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
        <View  style={{  justifyContent: "center", alignItems: "center", borderBottomColor: "#e4e4e4", borderBottomWidth: 5,   margin: 5, padding: 15,  backgroundColor: "#f4f4f4", borderTopRightRadius: 20}} >
            <View style={{ flexDirection: "row", marginBottom: 10, }}>
                <Image source={require('@/assets/images/splash/splash6.png')} style={{ width: 80, height: 80, borderRadius: 60, borderWidth: 2, borderColor: "black"}} resizeMode="cover" />
                <TouchableOpacity disabled={active} onPress={() => { router.push('/payment') }} style={{ justifyContent: 'center', flexDirection: "row", marginLeft: -30, borderColor: "white", borderWidth: 3, maxHeight: 40,  borderRadius: 15, bottom: -45, backgroundColor: active ? "green" : "red", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 10, color: "white", fontFamily: "Kanit", }}>{ active ? "Paid" : "Unpaid" }</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 20, color: "black", fontFamily: "Kanit",  }}>{ user?.username ? user?.username : "NA" }</Text>
            <Text style={{ fontSize: 12, color: "gray", fontFamily: "Kanit",  }} >{ user?.email ? user?.email : "" } </Text>
        </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};