import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from './CustomButton';

const ConfirmModal = ({ isVisible, onClose, title, message, onConfirm }) => (
  <Modal isVisible={isVisible} onBackdropPress={onClose}>
    <View className="bg-primary p-10 rounded-md items-center">
      <Text className="text-2xl font-semibold text-white mb-5 text-center" >{title}</Text>
      <Text className="text-sm text-white mb-5 font-thin">{message}</Text>
      <View className="flex flex-row items-center justify-between w-full">
        <CustomButton title="Cancelar" containerStyles="w-[120px]" color='bg-grayb' handlePress={onClose} />
        <CustomButton title="Confirmar" containerStyles="w-[120px]" color='bg-golden' handlePress={onConfirm} />
      </View>
    </View>
  </Modal>
);

export default ConfirmModal;
