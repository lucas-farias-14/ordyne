import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../constants';
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView  contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-center min-h-[85vh] items-center px-4">
          <Image 
            source={icons.ordyneicon} 
            className="w-40 h-40"
            resizeMode="contain"
          />
          <Text className="text-3xl text-golden font-bold">Ordyne</Text>
          <Text className="text-sm text-gray-50 mt-2 text-center font-thin">um aplicativo para consultar suas ordens do correio.</Text>

          <CustomButton
            title="Entrar"
            color="bg-golden"
            handlePress={() => { router.push('/home')}}
            containerStyles="w-full mt-10"  
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
