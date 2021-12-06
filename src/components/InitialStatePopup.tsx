import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../data/store";
import { initialStateActions } from "../data/Slices/initialState-slice";

interface myProps {
  visible: boolean;
  restoreInitialState: () => void;
}

const InitialStatePopup: React.FC<myProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleCancel = () => {
    dispatch(initialStateActions.toggle());
  };

  return (
    <Modal
      title="Confirmation"
      visible={props.visible}
      onOk={props.restoreInitialState}
      onCancel={handleCancel}
    >
      <p>Are you sure you want to restore initial state?</p>
    </Modal>
  );
};

export default InitialStatePopup;
