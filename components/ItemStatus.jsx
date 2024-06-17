import { View, Text, Image } from 'react-native';
import React from 'react';
import { icons } from "../constants";

const ItemStatus = ({ status, data, hora, local }) => {
    return (
        
        <View className="flex flex-col items-start">
             <View className="flex flex-row items-start">
                <View className="w-[46px] h-[46px] flex justify-center items-center">
                    <View className='h-[46px] w-[2px] bg-white'>

                    </View>
                </View>
            </View>
            <View className="flex flex-row items-start">
                <View className="flex justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg flex justify-center items-center ">
                    {status === 'Objeto entregue ao destinatário' ?
                     (   <Image
                        source={icons.posted}
                        className="w-full h-full rounded-lg"
                        resizeMode="cover" />
                    ) : status == 'Objeto encaminhado' ? (
                        <Image
                        source={icons.truckRoundBack}
                        className="w-full h-full rounded-lg"
                        resizeMode="cover" />
                    ) : status == 'Objeto saiu para entrega ao destinatário' ? (
                        <Image
                        source={icons.cube}
                        className="w-full h-full rounded-lg"
                        resizeMode="cover" />
                    ) : status == 'Objeto postado' ? (
                        <Image
                        source={icons.world}
                        className="w-full h-full rounded-lg"
                        resizeMode="cover" />
                    ) : (
                        <Image
                        source={icons.cube}
                        className="w-full h-full rounded-lg"
                        resizeMode="cover" />
                    
                    )} 
                     
                    </View>
                    <View className="flex justify-center flex-1 ml-3 ">
                        <Text
                            className="font-psemibold text-sm text-white"
                            numberOfLines={1}
                        >
                            {status}
                        </Text>
                        <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}
                        >
                            {data} as {hora}
                        </Text>
                        <Text
                            className="text-xs text-gray-100 font-pregular"
                            numberOfLines={1}
                        >
                            {local}
                        </Text>
                    </View>
                </View>
            
            </View>
           
        </View>
     
    );
};

export default ItemStatus;