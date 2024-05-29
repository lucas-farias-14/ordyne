import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, color, isLoadingd}) => {

  return (
    <>
    {isLoadingd ? (
      <ActivityIndicator
      animating={isLoadingd}
      color="#fff"
      size="small"
      className="ml-2"
      />
    ) : (     
      <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`${color} rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}>
          <Text className="text-primary font-semibold text-lg">{title}</Text>
      </TouchableOpacity> 
    )}
 </>

  )
}

export default CustomButton