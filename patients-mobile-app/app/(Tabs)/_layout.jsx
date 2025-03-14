import { Tabs } from 'expo-router';
import { Platform, Image } from 'react-native';
import FrameActive from '../Assets/images/frame-active.svg';
import Frame from '../Assets/images/Frame.svg';
import HomeActive from '../Assets/images/Home Active.svg';
import Home from '../Assets/images/Home.svg';
import Frame02Active from '../Assets/images/Frame02 Active.svg';
import Frame02 from '../Assets/images/Frame02.svg';
import Frame03Active from '../Assets/images/Frame03 Active.svg';
import Frame03 from '../Assets/images/Frame03.svg';


export default function TabLayout() {
  return (
    
    <Tabs  
    screenOptions={{headerShown: false,
      tabBarActiveTintColor: '#C9E4F3',headrerShown: false,
      tabBarStyle: { backgroundColor: '#295567',height: 90,padding:10,paddingTop:10}, 
      tabBarLabelStyle: {
        fontSize: 16, // Adjusts label text size
      },tabBarShowLabel: false, // 
      }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => focused ? <HomeActive width={30} height={30} /> : <Home width={30} height={30} />,
        }}
      />
      <Tabs.Screen
        name="panel01"
        options={{
          title: 'Panel 01',
          tabBarIcon: ({ focused }) => focused ? <FrameActive width={30} height={30} /> : <Frame width={30} height={30} />,
        }}
      />
      <Tabs.Screen
        name="panel02"
        options={{
          title: 'Panel 02',
          tabBarIcon: ({ focused }) => focused ? <Frame02Active width={30} height={30} /> : <Frame02 width={30} height={30} />,
           }}
      />
      <Tabs.Screen
        name="users"
        options={{
          tabBarIcon: ({ focused }) => focused ? <Frame03Active width={30} height={30} /> : <Frame03 width={30} height={30} />,
        }}
      />
    </Tabs>
  );
}