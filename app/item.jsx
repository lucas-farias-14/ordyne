import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useGlobalSearchParams } from 'expo-router';
import { icons } from '../constants';	
import { listCode } from '../lib/api'
import ItemStatus from '../components/ItemStatus'
import ConfirmModal from '../components/ConfirmModal';
import { deleteCode } from '../lib/api';

const Item = () => {
  const { value } = useGlobalSearchParams();
  const [data, setData] = React.useState([])
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalMessage, setModalMessage] = React.useState('');


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


  useEffect(() => {
    const fetchData = async () => {
      const response = await listCode(value)
      if (response.length == 0) {
        setData([])
        router.push('/home')
      }else{
        setData(response)
      }
    }
    fetchData()
  }, [value])

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <ConfirmModal
           isVisible={isModalVisible}
           onClose={() => setModalVisible(false)}
           title={modalTitle}
           message={modalMessage}
           onConfirm={handleConfirm}
        />
        <View className="w-full justify-between items-center px-10 flex-row  py-5  border-b-2 border-secondary border-spacing-10">
          <View className="flex flex-row gap-4">
            <TouchableOpacity onPress={handleReturn}>
              <Image
                source={icons.arrowback}
                className="w-8 h-8"
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Text className="text-2xl text-white font-semibold">{value}</Text>
          </View>
     
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={icons.trash}
              className="w-8 h-8"
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <View className= "w-full justify-center items-center p-5">
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
                    <View className="flex justify-center flex-1 ml-3 ">
                        <Text
                            className="font-psemibold text-2xl text-white"
                            numberOfLines={1}
                        >
                          Correios
                        </Text>
                    </View>
                </View>
            
            </View>
            <View className="flex flex-row items-start">
                <View className="w-[46px] h-[46px] flex justify-center items-center">
                    <View className='h-[46px] w-[2px] bg-white'>

                    </View>
                </View>
            </View>
        </View>
          { data.map((item, index) => (
            // status must be data + hora + local
            <ItemStatus key={index} status={item.status} data={item.data} hora={item.hora} local={item.local} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Item