import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ListItem from '../../components/ListItem'
import { listAllCodes, updateItem } from '../../lib/api'
import { router, useFocusEffect } from 'expo-router'
 const Home = () => {
  const [loadingOrders, setLoadingOrders] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)	
  const [items, setItems] = React.useState([])

  const onRefresh = async () => {
    setRefreshing(true);
    
    if (items.length === 0) {
      const response = await listAllCodes();
      setItems(response);
    } else {
      const newItems = [...items]; 
      for (let i = 0; i < items.length; i++) {
        newItems[i].loading = true;
      }
      setItems(newItems);
      loadAllItens();
    }
    setRefreshing(false);
  }

  const loadAllItens = async () => {
    newItens = [...items];
    for (let i = 0; i < items.length; i++) {
      setTimeout(async () => {
        const response = await updateItem(items[i].codigo);
        newItens[i] = response;
        setItems(newItens);
      }, 2000);
    }
  }

  React.useEffect(() => {
    setLoadingOrders(true)
    const fetchData = async () => {
      
      try{
        const response = await listAllCodes()
        setItems(response)
      }catch{
        setItems([])
      }
    }
    fetchData()
    setLoadingOrders(false)
  }, [])

  useFocusEffect(

    React.useCallback(() => {
      setLoadingOrders(true)
      const fetchData = async () => {
        try {
          const response = await listAllCodes();
          setItems(response);
        } catch (error) {
          console.error('Erro ao buscar códigos:', error);
          setItems([]);
        }
        setLoadingOrders(false) 
      };
      fetchData();
   
    }, [])
  );

  function handleButtonPress(codigo, loading){
    if(loading === false) {
    router.push(`../item?value=${codigo}`)
    }
  }

   return (  
     <SafeAreaView className="bg-primary h-full">
      {loadingOrders ? (
        <View classaName ="items-center justify-center flex h-full">
          <ActivityIndicator animating={loadingOrders} color="#fff" size="large" className="mt-10" />
        </View>
      ): (
      <FlatList 
        data={items}
        keyExtractor={(item) => item.codigo}
        renderItem={({item}) => (
          <ListItem code={item.codigo} status={item.status} handlePress={() => (handleButtonPress(item.codigo, item.loading))} isLoading={item.loading} />
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
            {!loadingOrders ? (
            <Text className="text-sm text-gray-50 mt-2 text-center font-thin">Nenhum item encontrado, cadastre novos itens para prosseguir</Text>
            ) : ''}
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />)}
     </SafeAreaView>
   )
 }
 
 export default Home