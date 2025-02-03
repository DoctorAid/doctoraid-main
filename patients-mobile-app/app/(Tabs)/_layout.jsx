import { Tabs } from 'expo-router';
import { Platform, Image } from 'react-native';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#C9E4F3',headerShown: false,tabBarStyle: { backgroundColor: '#295567',height: 90,padding:10,paddingTop:10}, tabBarLabelStyle: {
        fontSize: 16, // Adjusts label text size
      } }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused}) => <Image source={focused ? require('../Assets/images/Home Active.png') : require('../Assets/images/Home.png')}  />,
        }}
      />
      <Tabs.Screen
        name="panel01"
        options={{
          title: 'Panel 01',
          tabBarIcon: ({ focused}) => <Image source={focused ? require('../Assets/images/Frame Active.png') : require('../Assets/images/Frame.png')}  />,
        }}
      />
      <Tabs.Screen
        name="panel02"
        options={{
          title: 'Panel 02',
          tabBarIcon: ({ focused}) => <Image source={focused ? require('../Assets/images/Frame02 Active.png') : require('../Assets/images/Frame02.png')}  />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Users',
          tabBarIcon: ({ focused}) => <Image source={focused ? require('../Assets/images/Users Active.png') : require('../Assets/images/Users.png')}  />,
        }}
      />
    </Tabs>
  );
}
