import { View, Text, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ListItem from '../../components/ListItem'
import { listAllCodes } from '../../lib/api'
import { router, useFocusEffect } from 'expo-router'
 const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false)	
  const [items, setItems] = React.useState([])

  const onRefresh = async () => {
    setRefreshing(true);
    const response = await listAllCodes()
    setItems(response)
    setRefreshing(false);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await listAllCodes()
        setItems(response)
      }catch{
        setItems([])
      
      }
    }
    fetchData()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await listAllCodes();
          setItems(response);
        } catch (error) {
          console.error('Erro ao buscar códigos:', error);
          setItems([]);
        }
      };
      fetchData();
    }, [])
  );

  function handleButtonPress(codigo){
    router.push(`../item?value=${codigo}`)
  }

   return (  
     <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={items}
        keyExtractor={(item) => item.codigo}
        renderItem={({item}) => (
          <ListItem code={item.codigo} status={item.status} handlePress={() => (handleButtonPress(item.codigo)) }/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 border-b-2 border-grayb">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-light text-sm text-gray-100">
                  Bem vindo!
                </Text>
                <Text className="text-2xl text-white text-thin">
                  veja suas ordens abaixo
                </Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="justify-center items-start px-4 mb-6">
            <Text className="text-sm text-gray-50 mt-2 text-center font-thin">Nenhum item encontrado, cadastre novos itens para prosseguir</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
     </SafeAreaView>
   )
 }
 
 export default Home