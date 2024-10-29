import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { useSelector } from "react-redux";

export default function Layout() {
  // const user = {username: "Peter Zorve"}
  const user = useSelector((state) => state.user.user); 

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} user={user} />} >

        <Drawer.Screen name="index"           options={{   drawerLabel: 'Past Question',  drawerLabelStyle: { fontFamily: 'Kanit', fontWeight: 400 },        title: '',  drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={20} />   )}}/>
        <Drawer.Screen name="profile"  options={{   drawerLabel: 'Profile',  drawerLabelStyle: { fontFamily: 'Kanit', fontWeight: 400 },             title: '',  drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={20}/>   )}}/>
        <Drawer.Screen name="changepassword"  options={{   drawerLabel: 'Settings',  drawerLabelStyle: { fontFamily: 'Kanit', fontWeight: 400 },             title: '',  drawerIcon: ({ color, focused }) => ( <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color}  size={20}/>   )}}/>
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
  const { user } = props;
  const profileURL = user?.profileURL
  return (
    <DrawerContentScrollView {...props}>

            {/* <View  style={{ justifyContent: "center", alignItems: "center", borderBottomColor: "#f4f4f4", borderBottomWidth: 5,  margin: 5}} >
                <View style={{flexDirection: "row",  width: "90%",}}>
                    <View style={{  marginBottom: 10,   marginVertical: 10, flexGrow: 1}}>
                        <Text style={{ fontSize: 18, marginVertical: 3, fontWeight: "bold" }}>{ user?.username }</Text>
                        <Text style={{ fontSize: 14,  }} >{ user?.email } </Text>
                    </View>
                    <TouchableOpacity onPress={() => { router.push('/profile') }} style={{ justifyContent: "center", margin: 10, backgroundColor: "#f4f4f4", padding: 10, borderRadius: 20 }}>
                            <Ionicons name={'pencil'}  size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View> */}

            <View  style={{ height: 150, justifyContent: "center", alignItems: "center", borderBottomColor: "#f4f4f4", borderBottomWidth: 5,  margin: 5,  backgroundColor: "#f4f4f4",}} >
                <View style={{ flexDirection: "row", marginBottom: 10, }}>

                    <View style={{ }}>
                        <Image source={require('@/assets/images/splash/splash6.png')} style={{ width: 80, height: 80, borderRadius: 60, borderWidth: 2, borderColor: "black"}} resizeMode="cover" />
                    </View>

                    <TouchableOpacity onPress={() => { router.push('/profile') }} style={{ justifyContent: 'center', marginLeft: -30, borderColor: "white", borderWidth: 2, maxHeight: 40, maxWidth: 40, minWidth: 40, borderRadius: 22, bottom: -45, backgroundColor: "#272727", alignItems: "center" }}>
                        <View >
                            <Ionicons name={'pencil'}  size={20} color="white" />
                        </View>
                    </TouchableOpacity>

                </View>
                <Text style={{ fontSize: 18, marginVertical: 3, color: "black", }}>{ user?.username ? user?.username : "NA" }</Text>
                <Text style={{ fontSize: 12, color: "gray", }} >{ user?.email ? user?.email : "" } </Text>
            </View>



      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};