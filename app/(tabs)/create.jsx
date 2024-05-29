import { View, Text, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'
import { createCode } from '../../lib/api'
import AlertModal from '../../components/AlertModal'

const Create = () => {
  const [form, setForm] = useState({
    code: ''
  })

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalColor , setModalColor] = useState('bg-golden');
  const [uploading, setUploading] = useState(false)

  const submit = async () => {

    if (!form.code) {
      setModalTitle('Erro');
      setModalMessage('Preencha o campo de código');
      setModalVisible(true);
      setModalColor('bg-delete')
      return;
    }
    setUploading(true);
    try {
      await createCode(form);
      setModalTitle('Sucesso');
      setModalMessage('Código cadastrado com sucesso, verifique a listagem para ver mais informações');
      setModalColor('bg-golden')
      setModalVisible(true);
    } catch (error) {
      setModalTitle('Erro');
      setModalMessage(error.message);
      setModalVisible(true);
      setModalColor('bg-delete')
    } finally {
      setForm({ code: '' });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className='px-4 my-6'>
      
        <View className="w-full justify-center items-center py-5">
          <Text className="text-2xl text-white font-semibold">Cadastrar Código</Text>
          <Text className="text-sm text-white font-thin">Digite o código abaixo para cadastrar um novo item</Text>
        </View>

        <View className= "w-full justify-center items-center mb-10">
          <FormField 
            title="Código de rastreio"
            value={form.code}
            placeholder='AA1234567895BR'
            handleChangeText={(e) => setForm({ ...form, code: e })}
            otherStyles="mt-10"
            />
        </View>

        <CustomButton title="Cadastrar" containerStyles="w-full" color='bg-golden' handlePress={submit} isLoadingd={uploading} />
        <AlertModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          title={modalTitle}
          message={modalMessage}
          color={modalColor}
        />
      </ScrollView>
    
    </SafeAreaView>
  )
}

export default Create