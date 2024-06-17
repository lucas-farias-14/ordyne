import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { icons } from "../constants";

const ListItem = ({ code, status, handlePress, isLoading }) => {
    return (
   
    <TouchableOpacity className='flex flex-col items-center px-4 mb-7 ' onPress={handlePress} activeOpacity={0.7} >
        <View className="flex flex-row gap-3 items-start">
            <View className="flex justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg flex justify-center items-center p-0.5">
                    <Image
                    source={icons.cube}
                    className="w-full h-full rounded-lg"
                    resizeMode="cover"
                    />
                </View>
                <View className="flex justify-center flex-1 ml-3 gap-y-1">
                    <Text
                    className="font-psemibold text-sm text-white"
                    numberOfLines={1}
                    >
                    {code}
                    </Text>
                    <Text
                    className="text-xs text-gray-100 font-pregular"
                    numberOfLines={1}
                    >
                    {status}
                    </Text>
                </View>
                {isLoading ? (
                    <ActivityIndicator
                    animating={isLoading}
                    color="#fff"
                    size="small"
                    className="ml-2"
                    />) : null} 
            </View>
        </View>
    </TouchableOpacity>
    )
}

export default ListItem