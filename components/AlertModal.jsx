import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from './CustomButton';

const AlertModal = ({ isVisible, onClose, title, message, color }) => (
  <Modal isVisible={isVisible} onBackdropPress={onClose}>
    <View className="bg-primary p-10 rounded-md items-center">
      <Text className="text-2xl font-semibold text-white mb-5" >{title}</Text>
      <Text className="text-sm text-white mb-5 font-thin">{message}</Text>
      <CustomButton title="Fechar" containerStyles="w-80" color={color} handlePress={onClose} />
    </View>
  </Modal>
);

export default AlertModal;
