import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useGlobalSearchParams } from 'expo-router';
import { icons } from '../constants';	
import { deleteCode, listCode, updateItem } from '../lib/api'
import ItemStatus from '../components/ItemStatus'
import ConfirmModal from '../components/ConfirmModal';


const Item = () => {
  const { value } = useGlobalSearchParams();
  const [data, setData] = React.useState([])
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalMessage, setModalMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false)
  const handlePress = () => {
    setModalTitle(`Excluir item ${value}`);
    setModalMessage('Tem certeza que deseja excluir este item?');
    setModalVisible(true);

  }

  const handleReturn = () => {
    router.push('/home')
  }


  const handleConfirm = async () => {
    if(value){
      await deleteCode(String(value))
      router.push('/home')
    }

  }


  const handleReload = async () =>{
    setLoading(true)
    await updateItem(value)
    fetchData()
    setLoading(false)

  }

  const fetchData = async () => {
    const response = await listCode(value)
    if (response.length == 0) {
      setData([])
      router.push('/home')
    }else{
      setData(response)
    }
  }

  useEffect(() => {    
    fetchData()
  }, [value])

  return (
    <SafeAreaView className="h-full bg-primary">

        <ConfirmModal
           isVisible={isModalVisible}
           onClose={() => setModalVisible(false)}
           title={modalTitle}
           message={modalMessage}
           onConfirm={handleConfirm}
        />
        <View className="w-full justify-between items-center px-5 flex-row py-4  border-b-2 border-secondary border-spacing-5">
          <View className="flex flex-row gap-2 items-center justify-left">
            <TouchableOpacity onPress={handleReturn}>
              <Image
                source={icons.arrowback}
                className="w-5 h-5"
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Text className="text-xl text-white font-semibold">{value}</Text>
            
            <TouchableOpacity onPress={handleReload}>
            <Image
              source={icons.reloadWhite}
              className="w-4 h-4"
              resizeMode="cover"
            />
          </TouchableOpacity>
          </View>

          
          
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={icons.trash}
              className="w-6 h-6"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <>
          {loading ? (
            <ActivityIndicator animating={loading} color="#fff" size="large" className="mt-10" />)
            :
          (
          <ScrollView>
            <View className= "w-full justify-center items-center px-5 mt-5">
              <View className="flex flex-col items-start">
                  <View className="flex flex-row items-start">
                      <View className="flex justify-center items-center flex-row flex-1">
                          <View className="w-[46px] h-[46px] rounded-lg flex justify-center items-center ">
                              <Image

                                  source={icons.world}
                                  className="w-full h-full rounded-lg"
                                  resizeMode="cover"
                              />
                          </View>
                          <View className="flex justify-center flex-1 ml-3">
                              <Text
                                  className="font-psemibold text-xl text-white"
                                  numberOfLines={1}
                              >
                                Correios
                              </Text>
                          </View>
                      </View>
                  
                  </View>
                 
              </View>
            </View>
            <View className="px-5">
              { data.map((item, index) => (
                <ItemStatus key={index} status={item.status} data={item.data} hora={item.hora} local={item.local} />
              ))}
                
            </View>
          </ScrollView>
          )}
        </>
      
    </SafeAreaView>
  )
}

export default Item