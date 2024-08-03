import React from 'react';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';

const ConfirmDeleteModal = ({ visible, onClose, onConfirm, title, message }) => (
  <Modal
    animationType="none"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={[styles.modalContent, { alignItems: 'center' }]}>
        <Text style={styles.modalTitle}>
          Deletar {title}
        </Text>

        <View style={{ width: '70%' }}>
          <Text style={styles.modalText}>
            Você tem certeza que deseja excluir {message}?
          </Text>
          <Text style={styles.modalText}>
            Esta ação é irreversível.
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 14, marginTop: 10 }}>
          <Pressable
            style={[styles.modalButton, { backgroundColor: 'rgb(220 38 38)', flex: 1 }]}
            onPress={onConfirm}
          >
            <Text style={styles.modalButtonText}>Confirmar</Text>
          </Pressable>
          <Pressable
            style={[styles.modalButton, { backgroundColor: '#e1e1e1', flex: 1 }]}
            onPress={onClose}
          >
            <Text style={[styles.modalButtonText, { color: "#505050" }]}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16
  },
});

export default ConfirmDeleteModal;
