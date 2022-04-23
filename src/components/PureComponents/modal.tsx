import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, Modal } from "react-native";
import { BlurView } from "expo-blur";

interface ModalType {
  children: ReactNode;
  visible: boolean;
  onRequestClose: Function;
}

export const MyModal = ({ children, visible, onRequestClose }: ModalType) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => onRequestClose()}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={() => {
          onRequestClose();
        }}
      >
        <BlurView
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
          tint="default"
          intensity={50}
        />
        <TouchableOpacity style={styles.modal} activeOpacity={1}>
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    margin: 20,
    backgroundColor: "#333333",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
