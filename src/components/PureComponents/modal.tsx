import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useSelector } from "react-redux";
import { BlurView } from "expo-blur";
import { Loading } from "../../components/PureComponents/Loading";
import Colors from "../../constants/Colors";

interface ModalType {
  children: ReactNode;
  visible: boolean;
  onRequestClose: Function;
}

export const MyModal = ({ children, visible, onRequestClose }: ModalType) => {
  const loading = useSelector((state: any) => state.commonReducers.loading);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={() => onRequestClose()}
    >
      <Loading status={loading} />
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
          intensity={10}
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
    height: "50%",
    width: "80%",
    margin: 20,
    backgroundColor: Colors.DarkGray,
    borderRadius: 20,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
