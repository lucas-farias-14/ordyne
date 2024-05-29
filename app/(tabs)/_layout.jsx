import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused}) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h6"
            />
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#E4AC1C',
                tabBarStyle: {
                    backgroundColor: '#1E1F28',
                    borderTopWidth: 1,
                    borderTopColor: "#232533",
                 }
            }}
        >
            <Tabs.Screen name="home" 
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ color, focused}) => (
                    <TabIcon 
                        icon={icons.truck} 
                        color={color} 
                        name="" 
                        focused={focused}
                    />
                )
            }}/>
            <Tabs.Screen name="create" 
            options={{
                title: 'Create',
                headerShown: false,
                tabBarIcon: ({ color, focused}) => (
                    <TabIcon 
                        icon={icons.plus} 
                        color={color} 
                        name="" 
                        focused={focused}
                    />
                )
            }}/>
        </Tabs>
    </>
  )
}

export default TabsLayout